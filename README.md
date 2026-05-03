## 🌐 Mini Network Monitor

A Python-only mini project featuring a **static-data backend** module and a **polished Streamlit dashboard**. The backend maintains sample network inventory, alerts, traffic, and topology data, while the frontend renders everything as an interactive, dark-themed monitoring console — perfect for a GitHub-ready portfolio piece without managing APIs or databases.

---

### ✨ Features

| Feature | Description |
|---------|-------------|
| **KPI Cards** | Total devices, healthy count, open alerts (with critical count), average uptime |
| **Device Inventory** | Sortable table with status indicators (🟢🟡🔴) and device-type icons |
| **Uptime Trends** | 24-hour line chart per device with interactive multi-select filter |
| **Network Traffic** | Ingress vs. egress area chart with realistic diurnal pattern |
| **Network Topology** | Graphviz-rendered directed graph with colour-coded health status |
| **Alert Timeline** | Severity-coloured (critical / warning / info) alert cards sorted newest-first |
| **Auto-Refresh** | Optional 5-second auto-reload toggle in the sidebar |
| **Dark Theme CSS** | Custom gradient cards, Inter font, glassmorphism-inspired styling |

---

### 📁 File Structure

```
python mini network/
├── backend/
│   ├── __init__.py        # Re-exports all public helpers
│   └── app.py             # Data models + helper functions
├── frontend/
│   └── app.py             # Streamlit dashboard
├── requirements.txt       # Python dependencies
└── README.md
```

---

### 🛠️ Prerequisites

- **Python 3.10+**
- **pip**
- **Graphviz** system binary — install via `winget install Graphviz` (Windows) or `brew install graphviz` (macOS)

---

### ⚡ Setup

```bash
python -m venv .venv
.venv\Scripts\activate          # Windows PowerShell / cmd
pip install -r requirements.txt
```

---

### ▶️ Run Backend (static data preview)

```bash
python backend/app.py
```

Prints summary stats and topology edges so you can verify the data source before wiring it to the UI.

---

### ▶️ Run Streamlit Frontend

In a new terminal (with the same virtual environment active), **from the project root**:

```bash
streamlit run frontend/app.py
```

Streamlit launches at `http://localhost:8501` and displays the full dashboard:

- 📊 KPI snapshot cards
- 📋 Device inventory table
- 📈 Uptime trend chart
- 🔄 Traffic area chart
- 🗺️ Network topology graph
- 🚨 Alert timeline

---

### 🔧 Extending the Project

Because the project relies on deterministic static data, it's easy to iterate:

- **Live collectors** — swap the backend helpers with SNMP / API calls.
- **Database** — persist metrics in SQLite or InfluxDB.
- **Authentication** — add Streamlit authenticator for role-based access.
- **Notifications** — send Slack / email alerts on critical events.

---

### 📜 License

Open-source — use however you like.
