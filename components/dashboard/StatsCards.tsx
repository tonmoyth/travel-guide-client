interface StatsData {
  totalUsers?: number
  totalGuides?: number
  totalCategories?: number
  totalPurchases?: number
  existGuideCount?: number
  existPurchasesCount?: number
  existRejectedCount?: number
}

interface StatsCardsProps {
  stats: StatsData
}

export function StatsCards({ stats }: StatsCardsProps) {
  const isAdmin = "totalUsers" in stats

  if (isAdmin) {
    const adminCards = [
      {
        label: "Total Users",
        value: stats.totalUsers ?? 0,
        icon: "group",
        gradient: "from-teal-500/20 to-emerald-500/10",
        iconContainer: "bg-teal-500/20 text-teal-600 dark:text-teal-400",
        shadow: "shadow-teal-500/10",
      },
      {
        label: "Total Guides",
        value: stats.totalGuides ?? 0,
        icon: "explore",
        gradient: "from-blue-500/20 to-indigo-500/10",
        iconContainer: "bg-blue-500/20 text-blue-600 dark:text-blue-400",
        shadow: "shadow-blue-500/10",
      },
      {
        label: "Total Categories",
        value: stats.totalCategories ?? 0,
        icon: "category",
        gradient: "from-purple-500/20 to-pink-500/10",
        iconContainer: "bg-purple-500/20 text-purple-600 dark:text-purple-400",
        shadow: "shadow-purple-500/10",
      },
      {
        label: "Total Purchases",
        value: stats.totalPurchases ?? 0,
        icon: "payments",
        gradient: "from-orange-500/20 to-amber-500/10",
        iconContainer: "bg-orange-500/20 text-orange-600 dark:text-orange-400",
        shadow: "shadow-orange-500/10",
      },
    ]

    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {adminCards.map((card, index) => (
          <div
            key={index}
            className={`group relative overflow-hidden rounded-3xl border border-white/20 bg-gradient-to-br ${card.gradient} p-6 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${card.shadow}`}
          >
            {/* Background Abstract Shapes */}
            <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-white/10 blur-2xl transition-all group-hover:scale-150" />
            <div className="absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-primary/5 blur-3xl" />

            <div className="relative z-10">
              <div
                className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl ${card.iconContainer} shadow-sm backdrop-blur-md transition-transform group-hover:scale-110`}
              >
                <span className="material-symbols-outlined text-2xl font-light">
                  {card.icon}
                </span>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-bold uppercase tracking-[0.1em] text-on-surface-variant/70">
                  {card.label}
                </p>
                <h3 className="text-4xl font-black tracking-tight text-on-surface">
                  {card.value}
                </h3>
              </div>
              <div className="mt-4 flex items-center gap-1.5 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <div className="h-1 w-1 rounded-full bg-primary" />
                <p className="text-[10px] font-bold uppercase tracking-widest text-primary">
                  Live Insights
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  // Member stats
  const memberCards = [
    {
      label: "My Guides",
      value: stats.existGuideCount ?? 0,
      icon: "menu_book",
      gradient: "from-teal-500/20 to-emerald-500/10",
      iconContainer: "bg-teal-500/20 text-teal-600 dark:text-teal-400",
      shadow: "shadow-teal-500/10",
    },
    {
      label: "My Purchases",
      value: stats.existPurchasesCount ?? 0,
      icon: "shopping_bag",
      gradient: "from-blue-500/20 to-indigo-500/10",
      iconContainer: "bg-blue-500/20 text-blue-600 dark:text-blue-400",
      shadow: "shadow-blue-500/10",
    },
    {
      label: "Rejected Guides",
      value: stats.existRejectedCount ?? 0,
      icon: "cancel",
      gradient: "from-rose-500/20 to-pink-500/10",
      iconContainer: "bg-rose-500/20 text-rose-600 dark:text-rose-400",
      shadow: "shadow-rose-500/10",
    },
  ]

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {memberCards.map((card, index) => (
        <div
          key={index}
          className={`group relative overflow-hidden rounded-3xl border border-white/20 bg-gradient-to-br ${card.gradient} p-6 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${card.shadow}`}
        >
          <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-white/10 blur-2xl transition-all group-hover:scale-150" />

          <div className="relative z-10">
            <div
              className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl ${card.iconContainer} shadow-sm backdrop-blur-md transition-transform group-hover:scale-110`}
            >
              <span className="material-symbols-outlined text-2xl font-light">
                {card.icon}
              </span>
            </div>
            <div className="space-y-1">
              <p className="text-xs font-bold uppercase tracking-[0.1em] text-on-surface-variant/70">
                {card.label}
              </p>
              <h3 className="text-4xl font-black tracking-tight text-on-surface">
                {card.value}
              </h3>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

