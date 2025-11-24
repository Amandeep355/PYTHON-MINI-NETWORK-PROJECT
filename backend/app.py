"""
Static data backend for the Mini Network Monitor project.

Instead of exposing an API we provide helper functions that the Streamlit
frontend can import directly. This keeps the demo lightweight while still
showing a separation of concerns between data (backend) and UI (frontend).
"""

from __future__ import annotations

from dataclasses import dataclass, asdict
from datetime import datetime
from typing import Dict, List


@dataclass(frozen=True)
class Device:
    device_id: str
    name: str
    location: str
    last_check: datetime
    uptime_pct: float


@dataclass(frozen=True)
class Alert:
    device_id: str
    level: str
    message: str
    opened_at: datetime


_DEVICES: Dict[str, Device] = {
    "sw-001": Device("sw-001", "Core Switch", "New York", datetime(2025, 11, 1, 10, 15), 99.95),
    "fw-014": Device("fw-014", "Edge Firewall", "London", datetime(2025, 11, 1, 9, 45), 98.73),
    "ap-207": Device("ap-207", "Lobby Access Point", "Singapore", datetime(2025, 11, 1, 11, 5), 95.84),
    "srv-552": Device("srv-552", "Telemetry Server", "Remote DC", datetime(2025, 11, 1, 8, 30), 99.99),
}

_ALERTS: List[Alert] = [
    Alert("fw-014", "critical", "Packet drop above 10% threshold", datetime(2025, 11, 1, 9, 0)),
    Alert("ap-207", "warning", "SSID \"Guest\" reporting slow throughput", datetime(2025, 11, 1, 10, 20)),
]


def get_devices() -> List[Dict[str, str]]:
    """Return devices as list of serializable dicts."""
    payload = []
    for device in _DEVICES.values():
        entry = asdict(device)
        entry["last_check"] = device.last_check.isoformat()
        payload.append(entry)
    return payload


def get_alerts() -> List[Dict[str, str]]:
    """Return current alerts as serializable dicts."""
    payload = []
    for alert in _ALERTS:
        entry = asdict(alert)
        entry["opened_at"] = alert.opened_at.isoformat()
        entry["device_name"] = _DEVICES[alert.device_id].name
        payload.append(entry)
    return payload


def get_network_summary() -> Dict[str, float]:
    """Provide aggregates used by the dashboard."""
    total = len(_DEVICES)
    healthy = total - len(_ALERTS)
    avg_uptime = round(sum(device.uptime_pct for device in _DEVICES.values()) / total, 2)
    return {
        "total_devices": total,
        "healthy_devices": healthy,
        "open_alerts": len(_ALERTS),
        "average_uptime": avg_uptime,
    }


if __name__ == "__main__":
    summary = get_network_summary()
    print("Mini Network Backend (static data)")
    print(f"Devices: {summary['total_devices']} | Healthy: {summary['healthy_devices']}")
    print(f"Open alerts: {summary['open_alerts']} | Avg uptime: {summary['average_uptime']}%")

