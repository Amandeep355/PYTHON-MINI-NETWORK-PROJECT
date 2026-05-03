<div align="center">

# 🌐 Mini Network Monitor

**A decoupled full-stack network monitoring dashboard built with a modern architecture, real-time metrics, and realistic static data.**

![Python](https://img.shields.io/badge/Python-3.10+-blue?style=for-the-badge&logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-REST_API-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-Frontend-black?style=for-the-badge&logo=next.js&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-Styling-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Recharts](https://img.shields.io/badge/Recharts-Data_Viz-FF6384?style=for-the-badge)

</div>

---

## 📌 Overview

This project is a decoupled full-stack network monitoring dashboard. Designed as a polished, production-ready portfolio piece, it provides a highly interactive dark-themed console mimicking a real-world NOC (Network Operations Center) without the overhead of live polling engines or complex databases.

> Features a FastAPI REST backend that serves static and procedurally generated network telemetry, paired with a modern, responsive Next.js frontend to visualize the data.

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| **KPI Cards** | Quick overview of total devices, healthy count, open alerts (with critical counts), and average uptime. |
| **Device Inventory** | Clean data table displaying devices with status indicators (🟢🟡🔴) and role-specific icons. |
| **Uptime Trends** | Interactive line charts displaying historical 24-hour uptime across network nodes. |
| **Network Traffic** | Smooth area charts illustrating realistic diurnal ingress/egress network traffic patterns. |
| **Alert Timeline** | Severity-colored (Critical / Warning / Info) alert feed, sorted chronologically. |
| **Modern UI/UX** | Glassmorphism-inspired components, custom gradient styling, and micro-animations via Framer Motion. |

---

## 📁 File Structure

```text
python mini network/
├── backend/
│   ├── __init__.py        # Re-exports backend helpers
│   ├── app.py             # Core data models & static mock generators
│   └── server.py          # FastAPI application & REST endpoints
├── frontend/
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── app/           # Next.js App Router (layout, pages, globals.css)
│   │   ├── components/    # Reusable React UI components
│   │   └── lib/           # API clients and utility functions
│   ├── package.json       # Node.js dependencies
│   └── next.config.ts     # Next.js configuration
├── requirements.txt       # Python backend dependencies
└── README.md              # Project documentation
```

---

## 🛠️ Prerequisites

Before you begin, ensure you have the following installed:
- **Python 3.10+** (For the backend)
- **Node.js 20+** and **npm** (For the frontend)

---

## 🚀 Getting Started

To run the full stack locally, you need to start both the backend and frontend development servers.

### 1. Start the Backend API

Open a terminal in the project root and run:

```bash
# Create and activate a virtual environment (Windows)
python -m venv .venv
.venv\Scripts\activate

# Or on macOS/Linux:
# python3 -m venv .venv
# source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Start the FastAPI server
uvicorn backend.server:app --port 8000 --reload
```
The backend API will be available at `http://localhost:8000`. You can explore the interactive API documentation at `http://localhost:8000/docs`.

### 2. Start the Frontend Application

Open a **new terminal window** in the project root and navigate to the frontend directory:

```bash
cd frontend

# Install Node dependencies
npm install

# Start the Next.js development server
npm run dev
```

The frontend will launch at `http://localhost:3000`. Open this URL in your browser to view the monitoring dashboard.

---

## 🔧 Extending the Project

Because the core data relies on procedural mock generation, it's easy to swap out and extend:

- **Live Data Collectors**: Replace the static generators in `backend/app.py` with actual SNMP polling, Netmiko, or vendor API calls (e.g., Cisco DNA Center, Meraki).
- **Database Integration**: Persist metrics using a time-series database like InfluxDB or Prometheus, and replace the backend state with database queries.
- **Authentication**: Secure the frontend with NextAuth.js or Clerk to implement role-based access control (RBAC).
- **WebSockets**: Upgrade the REST API to WebSockets in FastAPI for true real-time, low-latency telemetry updates.

---

## 📜 License

Open-source — use however you like.
