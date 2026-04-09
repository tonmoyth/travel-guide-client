import { getStats } from "@/actions/dashboard/getStatsAction"
import { StatsCards } from "@/components/dashboard/StatsCards"
import { StatsCharts } from "@/components/dashboard/StatsCharts"
import { IResponse } from "@/types/api.types"
import {
  Plus,
  ArrowUpRight,
  Users,
  History,
  Activity as ActivityIcon,
  Crown
} from "lucide-react"
import Link from "next/link"

interface StatsData {
  totalUsers?: number
  totalGuides?: number
  totalCategories?: number
  totalPurchases?: number
  existGuideCount?: number
  existPurchasesCount?: number
  existRejectedCount?: number
}

export default async function AdminDashboardPage() {
  const result = await getStats();

  if (!result.success) {
    return (
      <div className="flex h-[60vh] flex-col items-center justify-center p-8 text-center">
        <div className="mb-4 rounded-full bg-error/10 p-4 text-error">
          <ActivityIcon className="h-8 w-8" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-on-surface">System Offline</h1>
        <p className="mt-2 text-on-surface-variant">
          Error loading dashboard insights: {result.message}
        </p>
      </div>
    )
  }

  const stats = (result as IResponse<StatsData>).data || {}

  // Mock Recent Activity Data
  const recentActivity = [
    {
      id: 1,
      user: "Sarah J.",
      action: "purchased",
      target: "Bali Hidden Gems",
      time: "2h ago",
      icon: <ArrowUpRight className="h-4 w-4 text-teal-500" />
    },
    {
      id: 2,
      user: "Alex Travel",
      action: "published",
      target: "Tokyo Nightlife Guide",
      time: "5h ago",
      icon: <Crown className="h-4 w-4 text-amber-500" />
    },
    {
      id: 3,
      user: "Admin",
      action: "added category",
      target: "Sustainable Travel",
      time: "1d ago",
      icon: <Plus className="h-4 w-4 text-blue-500" />
    }
  ]

  return (
    <div className="min-h-screen space-y-12 lg:p-12">
      {/* SaaS Style Header */}
      <header className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-primary/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary">
              Management Portal
            </span>
            <div className="h-1 w-1 rounded-full bg-on-surface-variant/30" />

          </div>
          <h1 className="font-heading text-4xl font-extrabold tracking-tight text-on-surface lg:text-5xl">
            Dashboard <span className="text-primary italic font-light">Overview</span>
          </h1>
          <p className="max-w-md text-sm font-medium leading-relaxed text-on-surface-variant/80">
            Welcome back, Curator. Monitor platform performance, user engagement, and travel guide metrics in real-time.
          </p>
        </div>
        <div className="flex flex-wrap gap-4">
          {/* <button className="flex items-center gap-2 rounded-full border border-outline-variant bg-surface px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-on-surface transition-all hover:bg-surface-container-high">
            Export Analytics
          </button> */}
          <Link href="/dashboard/create-category" className="flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-primary-container px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-on-primary shadow-lg shadow-primary/20 transition-all hover:opacity-90 hover:shadow-primary/30 active:scale-95">
            <Plus className="h-4 w-4" />
            Add Categories
          </Link>
        </div>
      </header>

      {/* Stats Cards Section */}
      <section className="animate-in fade-in slide-in-from-bottom-4 duration-700">
        <StatsCards stats={stats} />
      </section>

      {/* Left: Charts Section */}
      <div className="lg:col-span-8 animate-in fade-in slide-in-from-bottom-6 duration-1000">
        <StatsCharts stats={stats} />
      </div>

      {/* Main Insights Grid - Bento Style */}
      {/* <div className="grid gap-8 lg:grid-cols-12">
       

      
        <aside className="lg:col-span-4 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="h-full rounded-3xl border border-outline/10 bg-surface-container-low/50 p-8 backdrop-blur-xl dark:bg-surface-container-low/20">
            <div className="mb-8 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-primary/10 p-2 text-primary">
                  <History className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold tracking-tight text-on-surface">Recent Activity</h3>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant/60">Real-time Feed</p>
                </div>
              </div>
              <button className="text-[10px] font-black uppercase tracking-widest text-primary hover:underline">
                View All
              </button>
            </div>

            <div className="space-y-6">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="group flex items-start gap-4">
                  <div className="mt-1 rounded-full border border-outline-variant/30 bg-surface p-2 shadow-sm transition-colors group-hover:bg-primary/5">
                    {activity.icon}
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none text-on-surface">
                      <span className="font-bold">{activity.user}</span> {activity.action}
                    </p>
                    <p className="text-xs text-on-surface-variant line-clamp-1">
                      {activity.target}
                    </p>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant/40">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>

     
            <div className="mt-10 rounded-2xl bg-primary/5 p-4 ring-1 ring-primary/10">
              <div className="flex items-center gap-3 mb-2">
                <div className="h-2 w-2 rounded-full bg-teal-500 animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-widest text-teal-700">All Systems Operational</span>
              </div>
              <p className="text-[11px] leading-relaxed text-on-surface-variant">
                Server instance <span className="font-bold text-on-surface">Curator-S1</span> is running at peak efficiency (98.4%).
              </p>
            </div>
          </div>
        </aside>
      </div> */}


    </div>
  )
}

