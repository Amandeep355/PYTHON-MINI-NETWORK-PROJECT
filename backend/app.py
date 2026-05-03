"""
Static data backend for the Mini Network Monitor project.

Instead of exposing an API we provide helper functions that the Streamlit
frontend can import directly. This keeps the demo lightweight while still
showing a separation of concerns between data (backend) and UI (frontend).
"""

from __future__ import annotations

import math
import random
from dataclasses import dataclass, asdict
from datetime import datetime, timedelta
from typing import Dict, List, Tuple


# ---------------------------------------------------------------------------
# Data models
# ---------------------------------------------------------------------------

@dataclass(frozen=True)
class Device:
    device_id: str
    name: str
    device_type: str          # switch | firewall | access_point | server | router
    location: str
    status: str               # healthy | degraded | down
    last_check: datetime
    uptime_pct: float


@dataclass(frozen=True)
class Alert:
    alert_id: str
    device_id: str
    level: str                # info | warning | critical
    message: str
    opened_at: datetime


# ---------------------------------------------------------------------------
# Static sample data  (timestamps are relative to "now" for freshness)
# ---------------------------------------------------------------------------

_NOW = datetime.now()


def _ago(**kwargs) -> datetime:
    """Return a datetime *kwargs* before now, rounded to the minute."""
    dt = _NOW - timedelta(**kwargs)
    return dt.replace(second=0, microsecond=0)


_DEVICES: Dict[str, Device] = {
    "sw-001": Device("sw-001", "Core Switch",          "switch",       "New York",    "healthy",  _ago(minutes=5),   99.95),
    "fw-014": Device("fw-014", "Edge Firewall",        "firewall",     "London",      "degraded", _ago(minutes=18),  98.73),
    "ap-207": Device("ap-207", "Lobby Access Point",   "access_point", "Singapore",   "degraded", _ago(minutes=12),  95.84),
    "srv-552": Device("srv-552", "Telemetry Server",   "server",       "Remote DC",   "healthy",  _ago(minutes=2),   99.99),
    "rtr-100": Device("rtr-100", "WAN Router",         "router",       "Frankfurt",   "healthy",  _ago(minutes=8),   99.87),
    "sw-045": Device("sw-045", "Floor-2 Switch",       "switch",       "New York",    "healthy",  _ago(minutes=6),   99.62),
    "srv-801": Device("srv-801", "Log Collector",      "server",       "Remote DC",   "down",     _ago(hours=1),     87.40),
    "ap-310": Device("ap-310", "Conf-Room AP",         "access_point", "London",      "healthy",  _ago(minutes=3),   99.10),
}


_ALERTS: List[Alert] = [
    Alert("ALR-001", "fw-014",  "critical", "Packet drop above 10 % threshold",              _ago(minutes=45)),
    Alert("ALR-002", "ap-207",  "warning",  'SSID "Guest" reporting slow throughput',         _ago(minutes=30)),
    Alert("ALR-003", "srv-801", "critical", "Service unreachable - health-check failed x3",   _ago(minutes=55)),
    Alert("ALR-004", "fw-014",  "warning",  "TLS certificate expires in 7 days",              _ago(hours=2)),
    Alert("ALR-005", "sw-045",  "info",     "Firmware update available (v4.2.1)",             _ago(hours=3)),
]


# ---------------------------------------------------------------------------
# Public helpers — consumed by the Streamlit frontend
# ---------------------------------------------------------------------------

def get_devices() -> List[Dict]:
    """Return devices as list of serializable dicts."""
    payload = []
    for device in _DEVICES.values():
        entry = asdict(device)
        entry["last_check"] = device.last_check.strftime("%Y-%m-%d %H:%M")
        payload.append(entry)
    return payload


def get_alerts() -> List[Dict]:
    """Return current alerts as serializable dicts (newest first)."""
    sorted_alerts = sorted(_ALERTS, key=lambda a: a.opened_at, reverse=True)
    payload = []
    for alert in sorted_alerts:
        entry = asdict(alert)
        entry["opened_at"] = alert.opened_at.strftime("%Y-%m-%d %H:%M")
        entry["device_name"] = _DEVICES[alert.device_id].name
        payload.append(entry)
    return payload


def get_network_summary() -> Dict[str, float]:
    """Provide aggregates used by the dashboard.

    *healthy_devices* is computed by counting unique device IDs that have
    at least one open alert and subtracting from the total — this avoids
    the earlier bug where two alerts on the same device were double‑counted.
    """
    total = len(_DEVICES)
    alerted_device_ids = {a.device_id for a in _ALERTS}
    healthy = total - len(alerted_device_ids)
    avg_uptime = round(sum(d.uptime_pct for d in _DEVICES.values()) / total, 2)
    critical_count = sum(1 for a in _ALERTS if a.level == "critical")
    return {
        "total_devices": total,
        "healthy_devices": healthy,
        "open_alerts": len(_ALERTS),
        "critical_alerts": critical_count,
        "average_uptime": avg_uptime,
    }


# ---------------------------------------------------------------------------
# Chart / trend data generators
# ---------------------------------------------------------------------------

def get_uptime_history(hours: int = 24) -> Dict[str, List[Tuple[str, float]]]:
    """Return per‑device uptime samples over the last *hours* hours.

    Each entry maps ``device_id`` → list of ``(iso_timestamp, uptime_pct)``
    tuples (one per hour).  Data is deterministic per device (seeded RNG).
    """
    history: Dict[str, List[Tuple[str, float]]] = {}
    for dev in _DEVICES.values():
        rng = random.Random(dev.device_id)  # repeatable per device
        base = dev.uptime_pct
        points: List[Tuple[str, float]] = []
        for h in range(hours, 0, -1):
            ts = (_NOW - timedelta(hours=h)).replace(minute=0, second=0, microsecond=0)
            # gentle sine wobble + small noise
            wobble = 0.3 * math.sin(h / 4)
            noise = rng.uniform(-0.15, 0.15)
            value = round(max(0.0, min(100.0, base + wobble + noise)), 2)
            points.append((ts.isoformat(), value))
        history[dev.device_id] = points
    return history


def get_traffic_data(hours: int = 24) -> List[Dict]:
    """Return aggregate network traffic (ingress / egress Mbps) per hour.

    Uses a deterministic sinusoidal pattern to simulate realistic traffic.
    """
    rng = random.Random("traffic-seed")
    data: List[Dict] = []
    for h in range(hours, 0, -1):
        ts = (_NOW - timedelta(hours=h)).replace(minute=0, second=0, microsecond=0)
        hour_of_day = ts.hour
        # Traffic peaks during business hours (9‑17)
        base = 120 + 80 * math.sin(math.pi * (hour_of_day - 6) / 12)
        ingress = round(max(10, base + rng.uniform(-15, 15)), 1)
        egress = round(max(10, ingress * rng.uniform(0.55, 0.75)), 1)
        data.append({
            "time": ts.strftime("%H:%M"),
            "Ingress Mbps": ingress,
            "Egress Mbps": egress,
        })
    return data


def get_topology() -> List[Dict[str, str]]:
    """Return network edges as ``{source, target}`` dicts for graphviz."""
    return [
        {"source": "rtr-100", "target": "fw-014"},
        {"source": "rtr-100", "target": "sw-001"},
        {"source": "fw-014", "target": "srv-552"},
        {"source": "fw-014", "target": "srv-801"},
        {"source": "sw-001", "target": "sw-045"},
        {"source": "sw-001", "target": "ap-207"},
        {"source": "sw-045", "target": "ap-310"},
    ]


# ---------------------------------------------------------------------------
# CLI quick‑check
# ---------------------------------------------------------------------------

if __name__ == "__main__":
    summary = get_network_summary()
    print("Mini Network Backend (static data)")
    print(f"Devices: {summary['total_devices']} | Healthy: {summary['healthy_devices']}")
    print(f"Open alerts: {summary['open_alerts']} | Critical: {summary['critical_alerts']}")
    print(f"Avg uptime: {summary['average_uptime']}%")
    print()
    print("Topology edges:")
    for edge in get_topology():
        dev_src = _DEVICES[edge["source"]].name
        dev_tgt = _DEVICES[edge["target"]].name
        print(f"  {dev_src} -> {dev_tgt}")
