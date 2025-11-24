"""
Streamlit frontend for the Mini Network Monitor.

It imports data helpers from the backend module and renders them as a small
dashboard with summary metrics, device inventory table, and alert timeline.
"""

from __future__ import annotations

import sys
from pathlib import Path

import streamlit as st

# Ensure the project root is importable so we can import the backend package
PROJECT_ROOT = Path(__file__).resolve().parents[1]
if str(PROJECT_ROOT) not in sys.path:
    sys.path.append(str(PROJECT_ROOT))

from backend import app as backend_data  # type: ignore  # noqa: E402


st.set_page_config(page_title="Mini Network Monitor", layout="wide")
st.title("Mini Network Monitor")
st.caption("Demo showing how Python backend data can feed a Streamlit UI.")

summary = backend_data.get_network_summary()
devices = backend_data.get_devices()
alerts = backend_data.get_alerts()

with st.container():
    st.subheader("Network Snapshot")
    col1, col2, col3, col4 = st.columns(4)
    col1.metric("Devices", summary["total_devices"])
    col2.metric("Healthy Devices", summary["healthy_devices"])

    alert_delta = f"-{summary['healthy_devices'] - (summary['total_devices'] - summary['open_alerts'])}"
    col3.metric("Open Alerts", summary["open_alerts"], alert_delta)
    col4.metric("Average Uptime", f"{summary['average_uptime']}%", "+0.0%")

st.divider()

st.subheader("Inventory")
st.dataframe(devices, use_container_width=True, hide_index=True)

st.subheader("Recent Alerts")
if alerts:
    for alert in alerts:
        st.warning(
            f"[{alert['level'].upper()}] {alert['device_name']} - {alert['message']} "
            f"({alert['opened_at']})"
        )
else:
    st.success("No active alerts 🎉")

st.caption(
    "Tip: Because the data is static, this project is perfect for GitHub demos. "
    "Expand it with live telemetry or databases when you're ready."
)

