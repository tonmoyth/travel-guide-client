import React from "react";
import Image from "next/image";

interface FeatureImageProps {
  src: string;
  alt: string;
  intensity?: number;
}

export default function FeatureImage({
  src,
  alt,
  intensity = 7.5,
}: FeatureImageProps) {
  return (
    <div className="relative group">
      <div className="absolute -inset-4 bg-primary/5 rounded-[2rem] blur-2xl group-hover:bg-primary/10 transition-colors"></div>
      <div className="relative w-full aspect-[16/9] overflow-hidden rounded-3xl shadow-2xl border-4 border-white/50">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 50vw"
        />
      </div>
      {/* <div className="absolute bottom-6 right-6 bg-white/30 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/20 dark:bg-black/30">
        <div className="text-xs font-bold text-white uppercase tracking-tighter mb-1">
          Adventure Intensity
        </div>
        <div className="flex items-center gap-3">
          <div className="h-2 w-32 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-tertiary-fixed transition-all duration-500"
              style={{ width: `${(intensity / 10) * 100}%` }}
            ></div>
          </div>
          <span className="text-white font-bold">{intensity}</span>
        </div>
      </div> */}
    </div>
  );
}
