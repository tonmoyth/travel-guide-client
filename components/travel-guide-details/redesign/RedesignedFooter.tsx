import React from "react";

export default function RedesignedFooter() {
  return (
    <footer className="bg-slate-50 dark:bg-surface-container-low w-full py-12 px-8 mt-20 border-t border-primary/5">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 max-w-7xl mx-auto">
        <div className="flex flex-col items-center md:items-start gap-2">
          <span className="font-heading font-bold text-lg text-primary">
            Digital Curator
          </span>
          <p className="font-sans text-xs uppercase tracking-[0.05em] text-slate-400">
            © {new Date().getFullYear()} Digital Curator. Editorial Travel Guides.
          </p>
        </div>
        <div className="flex gap-8">
          <a
            className="font-sans text-xs uppercase tracking-[0.05em] text-slate-400 hover:text-secondary transition-all"
            href="#"
          >
            Privacy Policy
          </a>
          <a
            className="font-sans text-xs uppercase tracking-[0.05em] text-slate-400 hover:text-secondary transition-all"
            href="#"
          >
            Terms of Service
          </a>
          <a
            className="font-sans text-xs uppercase tracking-[0.05em] text-primary underline transition-all"
            href="#"
          >
            Contact Curator
          </a>
        </div>
      </div>
    </footer>
  );
}
