## Mini Network Monitor

A Python-only mini project with a static-data backend module and a Streamlit dashboard. The backend keeps sample network inventory/alert data, while the frontend renders it with modern UI components—perfect for a GitHub-ready showcase without managing APIs.

### File Structure

```
python mini network/
├── backend/
│   └── app.py           # Static data helpers + quick CLI preview
├── frontend/
│   └── app.py           # Streamlit dashboard consuming backend helpers
├── requirements.txt     # Python dependencies (Streamlit only)
└── README.md
```

### Prerequisites

- Python 3.10+
- `pip`

### Setup

```bash
python -m venv .venv
.venv\Scripts\activate      # PowerShell / cmd
pip install -r requirements.txt
```

### Run Backend (static data preview)

```bash
cd backend
python app.py
```

This prints summary stats so you can verify the data source before wiring it to the UI.

### Run Streamlit Frontend

In a new terminal (with the same virtual environment active):

```bash
cd frontend
streamlit run app.py
```

Streamlit launches at `http://localhost:8501` and shows:

- Snapshot metrics (device count, healthy count, open alerts, average uptime).
- Device inventory table with location and uptime.
- Alert list highlighting critical/warning items.

Because the project relies on static data, it's easy to extend—replace the backend module with live collectors, add trend charts, or hook up authentication to showcase more advanced skills.
