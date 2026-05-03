import { HeroSection } from '@/components/blocks/hero-section'
import { Dashboard } from '@/components/blocks/dashboard'
import { fetchSummary, fetchDevices, fetchAlerts, fetchUptime, fetchTraffic } from '@/lib/api'

export const dynamic = 'force-dynamic';

export default async function Home() {
  const [summary, devices, alerts, uptime, traffic] = await Promise.all([
    fetchSummary().catch(() => null),
    fetchDevices().catch(() => []),
    fetchAlerts().catch(() => []),
    fetchUptime().catch(() => ({})),
    fetchTraffic().catch(() => [])
  ]);

  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <div className="mx-auto max-w-5xl px-6 pb-24">
        {summary ? (
          <Dashboard
            summary={summary}
            devices={devices}
            alerts={alerts}
            uptime={uptime}
            traffic={traffic}
          />
        ) : (
          <div className="text-center py-20 text-muted-foreground">
            <p>Failed to connect to backend API.</p>
            <p>Ensure `uvicorn backend.server:app --port 8000` is running.</p>
          </div>
        )}
      </div>
    </div>
  )
}
