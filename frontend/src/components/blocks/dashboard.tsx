"use client"

import React, { useState } from 'react'
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Activity, AlertTriangle, CheckCircle, Server, Shield, Wifi, Router, HardDrive, Info } from 'lucide-react'

export function Dashboard({ summary, devices, alerts, uptime, traffic }: any) {
  const [selectedDevices, setSelectedDevices] = useState<string[]>(
    devices.slice(0, 4).map((d: any) => d.name)
  )

  // Format uptime data for recharts
  const uptimeData = []
  if (Object.keys(uptime).length > 0) {
    const devIdToName = devices.reduce((acc: any, d: any) => ({ ...acc, [d.device_id]: d.name }), {})
    const sampleDeviceIds = Object.keys(uptime)
    const timestamps = uptime[sampleDeviceIds[0]].map((p: any) => p[0])

    for (let i = 0; i < timestamps.length; i++) {
      const row: any = { time: timestamps[i].split('T')[1].substring(0, 5) }
      sampleDeviceIds.forEach((did) => {
        const name = devIdToName[did] || did
        if (selectedDevices.includes(name)) {
          row[name] = uptime[did][i][1]
        }
      })
      uptimeData.push(row)
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'switch': return <Router className="w-4 h-4 text-blue-400" />
      case 'firewall': return <Shield className="w-4 h-4 text-red-400" />
      case 'access_point': return <Wifi className="w-4 h-4 text-green-400" />
      case 'server': return <Server className="w-4 h-4 text-purple-400" />
      case 'router': return <Activity className="w-4 h-4 text-orange-400" />
      default: return <HardDrive className="w-4 h-4" />
    }
  }

  return (
    <div className="space-y-12">
      {/* KPIs */}
      <section id="dashboard" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-12">
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <p className="text-sm text-zinc-400 font-medium tracking-wide uppercase">Total Devices</p>
          <p className="text-4xl font-bold mt-2">{summary.total_devices}</p>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <p className="text-sm text-zinc-400 font-medium tracking-wide uppercase">Healthy</p>
          <p className="text-4xl font-bold mt-2 text-green-400">{summary.healthy_devices} <span className="text-lg text-zinc-600">/ {summary.total_devices}</span></p>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <p className="text-sm text-zinc-400 font-medium tracking-wide uppercase">Open Alerts</p>
          <p className="text-4xl font-bold mt-2 text-red-400">{summary.open_alerts} <span className="text-lg text-zinc-600 font-normal">({summary.critical_alerts} critical)</span></p>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <p className="text-sm text-zinc-400 font-medium tracking-wide uppercase">Avg Uptime</p>
          <p className="text-4xl font-bold mt-2">{summary.average_uptime}%</p>
        </div>
      </section>

      {/* Inventory */}
      <section id="inventory" className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center">📋</div>
          <h2 className="text-xl font-semibold">Device Inventory</h2>
        </div>
        <div className="border border-zinc-800 rounded-xl overflow-hidden">
          <table className="w-full text-sm text-left">
            <thead className="bg-zinc-900 text-zinc-400 uppercase text-xs">
              <tr>
                <th className="px-6 py-4 font-medium">Device</th>
                <th className="px-6 py-4 font-medium">Type</th>
                <th className="px-6 py-4 font-medium">Location</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Uptime</th>
                <th className="px-6 py-4 font-medium">Last Check</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800 bg-zinc-900/50">
              {devices.map((d: any) => (
                <tr key={d.device_id} className="hover:bg-zinc-800/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-white flex items-center gap-3">
                    <span className="text-xs text-zinc-500 font-mono">{d.device_id}</span>
                    {d.name}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 capitalize">
                      {getTypeIcon(d.device_type)}
                      {d.device_type.replace('_', ' ')}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-zinc-300">{d.location}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 capitalize">
                      {d.status === 'healthy' && <span className="w-2 h-2 rounded-full bg-green-500"></span>}
                      {d.status === 'degraded' && <span className="w-2 h-2 rounded-full bg-yellow-500"></span>}
                      {d.status === 'down' && <span className="w-2 h-2 rounded-full bg-red-500"></span>}
                      {d.status}
                    </div>
                  </td>
                  <td className="px-6 py-4 font-mono">{d.uptime_pct}%</td>
                  <td className="px-6 py-4 text-zinc-400">{d.last_check}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Charts */}
      <section id="trends" className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center">📈</div>
            <h2 className="text-xl font-semibold">Uptime Trends</h2>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={uptimeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                <XAxis dataKey="time" stroke="#52525b" fontSize={12} tickMargin={10} />
                <YAxis domain={['auto', 100]} stroke="#52525b" fontSize={12} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '8px' }}
                  itemStyle={{ color: '#fafafa' }}
                />
                {selectedDevices.map((name, i) => (
                  <Line 
                    key={name} 
                    type="monotone" 
                    dataKey={name} 
                    stroke={`hsl(${210 + i * 40}, 100%, 70%)`} 
                    strokeWidth={2} 
                    dot={false}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center">🔄</div>
            <h2 className="text-xl font-semibold">Network Traffic</h2>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={traffic}>
                <defs>
                  <linearGradient id="colorIngress" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorEgress" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#22d3ee" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                <XAxis dataKey="time" stroke="#52525b" fontSize={12} tickMargin={10} />
                <YAxis stroke="#52525b" fontSize={12} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '8px' }}
                  itemStyle={{ color: '#fafafa' }}
                />
                <Area type="monotone" dataKey="Ingress Mbps" stroke="#6366f1" fillOpacity={1} fill="url(#colorIngress)" />
                <Area type="monotone" dataKey="Egress Mbps" stroke="#22d3ee" fillOpacity={1} fill="url(#colorEgress)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* Alerts */}
      <section id="alerts" className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center">🚨</div>
          <h2 className="text-xl font-semibold">Alert Timeline</h2>
        </div>
        <div className="space-y-3">
          {alerts.length === 0 ? (
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-green-400 flex items-center gap-3">
              <CheckCircle className="w-5 h-5" />
              <span>No active alerts 🎉</span>
            </div>
          ) : (
            alerts.map((a: any) => {
              const isCritical = a.level === 'critical';
              const isWarning = a.level === 'warning';
              
              return (
                <div 
                  key={a.alert_id} 
                  className={`border rounded-xl p-4 flex items-start gap-4 ${
                    isCritical ? 'bg-red-500/10 border-red-500/20 text-red-200' : 
                    isWarning ? 'bg-yellow-500/10 border-yellow-500/20 text-yellow-200' : 
                    'bg-blue-500/10 border-blue-500/20 text-blue-200'
                  }`}
                >
                  <div className="mt-0.5">
                    {isCritical ? <AlertTriangle className="w-5 h-5 text-red-500" /> : 
                     isWarning ? <AlertTriangle className="w-5 h-5 text-yellow-500" /> : 
                     <Info className="w-5 h-5 text-blue-500" />}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold uppercase text-xs tracking-wider opacity-80">[{a.level}]</span>
                      <span className="font-semibold">{a.device_name}</span>
                    </div>
                    <p className="mt-1 opacity-90">{a.message}</p>
                    <p className="mt-2 text-xs opacity-60 font-mono flex items-center gap-1">
                      <span>⏱️</span> {a.opened_at}
                    </p>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </section>
    </div>
  )
}
