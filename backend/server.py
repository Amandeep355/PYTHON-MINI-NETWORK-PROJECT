"""
FastAPI REST server for the Mini Network Monitor backend.

Run with:
    uvicorn backend.server:app --reload --port 8000
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.app import (
    get_devices,
    get_alerts,
    get_network_summary,
    get_uptime_history,
    get_traffic_data,
    get_topology,
)

app = FastAPI(title="Mini Network Monitor API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/summary")
def api_summary():
    return get_network_summary()


@app.get("/api/devices")
def api_devices():
    return get_devices()


@app.get("/api/alerts")
def api_alerts():
    return get_alerts()


@app.get("/api/uptime")
def api_uptime():
    return get_uptime_history()


@app.get("/api/traffic")
def api_traffic():
    return get_traffic_data()


@app.get("/api/topology")
def api_topology():
    return get_topology()
