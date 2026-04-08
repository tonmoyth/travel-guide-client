export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "Travel Guide",
  description:
    "Elevating the art of travel through meticulous curation and storytelling. Your online community portal for sharing travel guides, destination tips, itineraries, and experiences.",
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Guides",
      href: "/travel-guides",
    },
    {
      title: "About",
      href: "/about-us",
    },
    {
      title: "Blog",
      href: "/blog",
    },
    {
      title: "Contact",
      href: "/contact-us",
    },
  ],
  links: {
    twitter: "https://twitter.com/travelguide",
    github: "https://github.com/travelguide",
    docs: "https://travelguide.com/docs",
  },
  keywords: [
    "Travel",
    "Guide",
    "Itinerary",
    "Destinations",
    "Travel Tips",
    "Community",
    "Curation",
    "Explore",
  ],
}
