"use client"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts"

interface StatsData {
  totalUsers?: number
  totalGuides?: number
  totalCategories?: number
  totalPurchases?: number
  existGuideCount?: number
  existPurchasesCount?: number
  existRejectedCount?: number
}

interface StatsChartsProps {
  stats: StatsData
}

const COLORS = ["#005758", "#11696b", "#1d7072", "#89d3d5"]

export function StatsCharts({ stats }: StatsChartsProps) {
  const isAdmin = "totalUsers" in stats

  if (isAdmin) {
    const data = [
      { name: "Users", value: stats.totalUsers || 0 },
      { name: "Guides", value: stats.totalGuides || 0 },
      { name: "Categories", value: stats.totalCategories || 0 },
      { name: "Purchases", value: stats.totalPurchases || 0 },
    ]

    return (
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main Growth Chart */}
        <div className="lg:col-span-2 overflow-hidden rounded-3xl border border-outline/10 bg-surface-container-low/50 p-8 backdrop-blur-xl dark:bg-surface-container-low/20">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold tracking-tight text-on-surface">Platform Growth</h3>
              <p className="text-xs font-medium text-on-surface-variant/70">Performance metrics over time</p>
            </div>
            <div className="flex gap-2">
              <span className="rounded-full bg-primary/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary">Live</span>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#005758" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#005758" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} strokeOpacity={0.1} />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: 'currentColor', opacity: 0.5, fontSize: 12 }}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: 'currentColor', opacity: 0.5, fontSize: 12 }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'var(--surface-container-high)', 
                    borderColor: 'var(--outline-variant)',
                    borderRadius: '12px',
                    fontSize: '12px',
                    fontWeight: '600'
                  }} 
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#005758" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorValue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Breakdown Chart */}
        <div className="overflow-hidden rounded-3xl border border-outline/10 bg-surface-container-low/50 p-8 backdrop-blur-xl dark:bg-surface-container-low/20">
          <h3 className="mb-6 text-xl font-bold tracking-tight text-on-surface">Distribution</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                   contentStyle={{ 
                    backgroundColor: 'var(--surface-container-high)', 
                    borderColor: 'var(--outline-variant)',
                    borderRadius: '12px',
                    fontSize: '12px',
                    fontWeight: '600'
                  }} 
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 space-y-2">
            {data.map((item, index) => (
              <div key={index} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                  <span className="font-medium text-on-surface-variant">{item.name}</span>
                </div>
                <span className="font-bold text-on-surface">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Member charts
  const memberData = [
    { name: "My Guides", value: stats.existGuideCount || 0 },
    { name: "Purchases", value: stats.existPurchasesCount || 0 },
    { name: "Rejected", value: stats.existRejectedCount || 0 },
  ]

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div className="rounded-3xl border border-outline/10 bg-surface-container-low/50 p-8 backdrop-blur-xl dark:bg-surface-container-low/20">
        <h3 className="mb-6 text-xl font-bold tracking-tight text-on-surface">Activity Score</h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={memberData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} strokeOpacity={0.1} />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, opacity: 0.6 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, opacity: 0.6 }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'var(--surface-container-high)', 
                  borderColor: 'var(--outline-variant)',
                  borderRadius: '12px',
                  fontSize: '12px'
                }} 
              />
              <Bar dataKey="value" fill="#005758" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-3xl border border-outline/10 bg-surface-container-low/50 p-8 backdrop-blur-xl dark:bg-surface-container-low/20">
        <h3 className="mb-6 text-xl font-bold tracking-tight text-on-surface">Breakdown</h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={memberData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                dataKey="value"
                paddingAngle={8}
              >
                {memberData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'var(--surface-container-high)', 
                  borderColor: 'var(--outline-variant)',
                  borderRadius: '12px',
                  fontSize: '12px'
                }} 
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

