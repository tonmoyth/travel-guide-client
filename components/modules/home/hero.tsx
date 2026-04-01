import Link from "next/link"

export default function Hero() {
  return (
    <section
      className="relative h-[70vh] min-h-[calc(100vh-64px)] bg-cover bg-center"
      style={{ backgroundImage: "url('/assets/hero.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col items-center justify-center px-4 text-center text-white sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          Unlock Your Next Adventure
        </h1>
        <p className="mt-4 max-w-3xl text-lg text-white/90 sm:text-xl">
          Discover local insights and complete travel guides from a like-minded
          community. Plan trips with confidence and explore the world smarter.
        </p>
        <Link href="/travel-guides" className="mt-8">
          <button className="cursor-pointer rounded-full bg-primary px-8 py-3 text-base font-semibold text-primary-foreground shadow-lg transition hover:scale-[1.02] hover:bg-primary/90">
            See Travel Guides
          </button>
        </Link>
      </div>
    </section>
  )
}
