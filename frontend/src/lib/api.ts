const API_URL = 'http://127.0.0.1:8000/api';

export async function fetchSummary() {
  const res = await fetch(`${API_URL}/summary`, { cache: 'no-store' });
  return res.json();
}

export async function fetchDevices() {
  const res = await fetch(`${API_URL}/devices`, { cache: 'no-store' });
  return res.json();
}

export async function fetchAlerts() {
  const res = await fetch(`${API_URL}/alerts`, { cache: 'no-store' });
  return res.json();
}

export async function fetchUptime() {
  const res = await fetch(`${API_URL}/uptime`, { cache: 'no-store' });
  return res.json();
}

export async function fetchTraffic() {
  const res = await fetch(`${API_URL}/traffic`, { cache: 'no-store' });
  return res.json();
}

export async function fetchTopology() {
  const res = await fetch(`${API_URL}/topology`, { cache: 'no-store' });
  return res.json();
}
