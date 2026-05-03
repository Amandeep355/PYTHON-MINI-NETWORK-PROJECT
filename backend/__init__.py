"""
Backend package exposing static data helpers for the Mini Network Monitor.
"""

from backend.app import (
    get_devices,
    get_alerts,
    get_network_summary,
    get_uptime_history,
    get_traffic_data,
    get_topology,
)

__all__ = [
    "get_devices",
    "get_alerts",
    "get_network_summary",
    "get_uptime_history",
    "get_traffic_data",
    "get_topology",
]
