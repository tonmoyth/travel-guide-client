import Button from "@/components/shared/Button"

export default function BlogPage() {
  const blogPosts = [
    {
      id: 1,
      title: "10 Hidden Gems in Southeast Asia",
      excerpt:
        "Discover lesser-known destinations that offer authentic cultural experiences and breathtaking natural beauty. From secret beaches to ancient temples, these spots will make your trip unforgettable.",
      date: "March 15, 2024",
      author: "Sarah Chen",
      category: "Destinations",
    },
    {
      id: 2,
      title: "Sustainable Travel: Making a Positive Impact",
      excerpt:
        "Learn how to travel responsibly while minimizing your environmental footprint. Tips for eco-friendly accommodations, transportation, and supporting local communities.",
      date: "March 10, 2024",
      author: "Mike Rodriguez",
      category: "Travel Tips",
    },
    {
      id: 3,
      title: "A Foodie's Guide to Street Markets in Europe",
      excerpt:
        "Explore the vibrant street food scenes across European cities. From Barcelona's La Boqueria to Istanbul's Grand Bazaar, discover the best local flavors and hidden culinary treasures.",
      date: "March 5, 2024",
      author: "Emma Thompson",
      category: "Food & Culture",
    },
    {
      id: 4,
      title: "Adventure Travel: Conquering the Inca Trail",
      excerpt:
        "A comprehensive guide to hiking the legendary Inca Trail to Machu Picchu. Preparation tips, what to expect, and how to make the most of this life-changing adventure.",
      date: "February 28, 2024",
      author: "David Kim",
      category: "Adventure",
    },
    {
      id: 5,
      title: "Budget Travel Hacks for Long-Term Trips",
      excerpt:
        "Maximize your travel budget with these proven strategies. From house sitting to work exchanges, learn how to extend your adventures without breaking the bank.",
      date: "February 20, 2024",
      author: "Lisa Park",
      category: "Budget Travel",
    },
    {
      id: 6,
      title: "Photography Tips for Travel Enthusiasts",
      excerpt:
        "Capture stunning travel photos with these professional techniques. Learn about composition, lighting, and editing to create memorable visual stories of your journeys.",
      date: "February 15, 2024",
      author: "Alex Johnson",
      category: "Photography",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground">
            TravelGuide Blog
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Latest stories, insights, and travel inspiration from our community
          </p>
        </div>

        {/* <div className="mb-8 flex flex-wrap justify-center gap-2">
          {["All", "Destinations", "Travel Tips", "Food & Culture", "Adventure", "Budget Travel", "Photography"].map(
            (category) => (
              <button
                key={category}
                className="rounded-full border border-slate-300 px-4 py-2 text-sm text-muted-foreground transition hover:bg-slate-100 hover:text-foreground"
              >
                {category}
              </button>
            )
          )}
        </div> */}

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="rounded-xl border bg-card p-6 shadow-sm transition hover:shadow-lg"
            >
              <div className="mb-3">
                <span className="inline-block rounded-full bg-muted/20 px-2 py-1 text-xs font-medium text-muted-foreground">
                  {post.category}
                </span>
              </div>
              <h2 className="mb-3 text-xl font-semibold text-foreground">
                {post.title}
              </h2>
              <p className="mb-4 line-clamp-3 text-sm text-muted-foreground">
                {post.excerpt}
              </p>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>By {post.author}</span>
                <span>{post.date}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
