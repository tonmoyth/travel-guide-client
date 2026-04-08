import React from "react";
import Image from "next/image";
import Link from "next/link";

interface SidebarProps {
  author: {
    name: string;
    description?: string;
    profilePhoto?: string;
    guidesCount?: number;
    followersCount?: string;
  };
  recommendedGear?: string[];
  relatedGuides?: Array<{
    id: string;
    title: string;
    coverImage: string;
  }>;
  isLocked?: boolean;
  price?: number;
}

export default function Sidebar({
  author,
  recommendedGear = ["All-terrain Sandal", "Polarized Lenses", "10L Dry Bag"],
  relatedGuides,
  isLocked,
  price,
}: SidebarProps) {
  return (
    <aside className="lg:col-span-4 space-y-8">
      {/* Author Card */}
      <div className="bg-white dark:bg-surface-container p-8 rounded-3xl shadow-[0_40px_60px_-15px_rgba(0,87,88,0.08)] border border-primary/5 text-center">
        <div className="relative inline-block mb-6">
          <div className="absolute -inset-2 bg-gradient-to-tr from-secondary-container to-transparent rounded-full opacity-50"></div>
          <div className="relative w-24 h-24 rounded-full border-4 border-white dark:border-surface overflow-hidden mx-auto">
            {author.profilePhoto ? (
              <Image
                src={author.profilePhoto}
                alt={author.name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-primary/10 flex items-center justify-center text-primary font-bold text-2xl">
                {author.name.charAt(0)}
              </div>
            )}
          </div>
        </div>
        <h3 className="text-xl font-bold text-primary font-heading">
          {author.name}
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 font-sans mb-6">
          {author.description ||
            "Editorial Traveler & Marine Biologist. Mapping the world's most fragile coastal ecosystems."}
        </p>
        <div className="flex justify-center gap-4 border-t border-slate-100 dark:border-white/5 pt-6">
          <div className="text-center">
            <div className="font-bold text-primary">{author.guidesCount || 124}</div>
            <div className="text-[10px] uppercase tracking-tighter text-slate-400">
              Guides
            </div>
          </div>
          <div className="w-px h-8 bg-slate-100 dark:bg-white/5"></div>
          <div className="text-center">
            <div className="font-bold text-primary">
              {author.followersCount || "45k"}
            </div>
            <div className="text-[10px] uppercase tracking-tighter text-slate-400">
              Followers
            </div>
          </div>
        </div>
      </div>

      {/* Expedition Gear */}
      <div className="bg-surface-container-high dark:bg-surface-container-highest p-8 rounded-3xl">
        <h4 className="font-bold text-primary mb-6 flex items-center gap-2">
          <span className="material-symbols-outlined text-secondary">
            backpack
          </span>
          Recommended Gear
        </h4>
        <ul className="space-y-4">
          {recommendedGear.map((item, index) => (
            <li
              key={index}
              className="flex items-center gap-3 text-on-surface-variant"
            >
              <span className="material-symbols-outlined text-secondary-fixed-dim text-sm">
                check_circle
              </span>
              <span className="text-sm font-medium">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Related Guides */}
      {relatedGuides && relatedGuides.length > 0 && (
        <div className="space-y-6">
          <h4 className="font-bold text-primary flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary">
              collections_bookmark
            </span>
            Continue the Journey
          </h4>
          {relatedGuides.map((guide) => (
            <Link key={guide.id} href={`/travel-guides/${guide.id}`} className="group block">
              <div className="flex gap-4 items-center bg-white dark:bg-surface-container p-3 rounded-2xl shadow-sm border border-primary/5 group-hover:scale-[1.02] transition-transform">
                <div className="w-20 h-20 rounded-xl overflow-hidden relative">
                  <Image
                    src={guide.coverImage}
                    alt={guide.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="text-xs font-bold text-secondary uppercase mb-1">
                    Guide
                  </div>
                  <h5 className="text-sm font-bold text-primary leading-tight">
                    {guide.title}
                  </h5>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Locked Content UI */}
      {isLocked && (
        <div className="relative rounded-3xl overflow-hidden bg-slate-900 h-64 p-8 flex flex-col justify-end group">
          <div className="relative z-10 text-white">
            <div className="material-symbols-outlined mb-2 text-secondary-fixed">
              lock
            </div>
            <h5 className="font-bold text-lg mb-1">Exclusive Content</h5>
            <p className="text-xs text-slate-300 mb-4">
              Unlock the full coordinates for Pro Curators only.
            </p>
            <Link
              href={`/payment?price=${price}`}
              className="bg-secondary-fixed text-on-secondary-fixed px-4 py-2 rounded-lg text-xs font-bold w-full uppercase tracking-widest text-center"
            >
              Upgrade Access
            </Link>
          </div>
        </div>
      )}
    </aside>
  );
}
