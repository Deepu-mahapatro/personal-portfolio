import React from 'react';
import { TECH_ICONS } from './techIcons';
import { TECH_STACK } from '../data/portfolioData';

interface ToolItem {
  label: string;
  color: string;
  logoUrl: string;
  fallbackUrl?: string;
}

const TOOLS: ToolItem[] = TECH_STACK.map((label) => {
  const icon = TECH_ICONS.find(
    (i) => i.label.toLowerCase() === label.toLowerCase()
  );
  return {
    label,
    color: icon?.color ?? '#ff2a3b',
    logoUrl: icon?.logoUrl ?? '',
    fallbackUrl: icon?.fallbackUrl,
  };
});

/**
 * Interactive Software & Tools strip featuring authentic, recognizable brand logos
 * with continuous horizontal marquee scrolling, pause-on-hover, and sleek glassmorphism.
 * Renders exactly 12 unique technology cards without duplicates.
 */
export const SoftwareStrip: React.FC = () => {
  return (
    <div className="relative w-full max-w-7xl mt-24 z-10 flex flex-col items-center overflow-hidden">
      <div className="red-halo" aria-hidden="true" />

      <span className="relative text-[#a31515] font-bold uppercase text-sm md:text-base tracking-[0.2em] mb-3">
        Languages &amp; Tools
      </span>
      <h3 className="relative text-4xl md:text-6xl font-black tracking-tight uppercase text-white mb-10 text-center">
        MY TECH STACK.
      </h3>

      {/* Marquee Carousel Container with side fade gradients */}
      <div className="relative w-full overflow-hidden py-4 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="flex w-max gap-4 md:gap-6 animate-marquee hover:[animation-play-state:paused]">
          {TOOLS.map((tool) => (
            <div
              key={tool.label}
              className="matrix-item glass glass-grid-card group shrink-0 w-[124px] h-[168px] sm:w-[136px] sm:h-[185px] md:w-[150px] md:h-[200px] rounded-3xl flex flex-col items-center justify-center p-3 transition-all duration-300 hover:scale-105 hover:border-red-500/50 hover:bg-white/[0.06]"
              style={{ '--tool-color': tool.color } as React.CSSProperties}
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                <img
                  src={tool.logoUrl}
                  alt={tool.label}
                  title={tool.label}
                  loading="lazy"
                  className="w-full h-full object-contain filter drop-shadow-md group-hover:drop-shadow-[0_0_12px_rgba(255,42,59,0.4)] transition-all"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (tool.fallbackUrl && target.src !== tool.fallbackUrl) {
                      target.src = tool.fallbackUrl;
                      return;
                    }
                    target.style.display = 'none';
                    const fallback = target.nextElementSibling as HTMLElement;
                    if (fallback) fallback.style.display = 'flex';
                  }}
                />
                {/* Fallback shown only if img fails to load */}
                <span
                  style={{ display: 'none', color: tool.color }}
                  className="w-full h-full items-center justify-center text-xl font-black"
                >
                  {tool.label.slice(0, 2).toUpperCase()}
                </span>
              </div>
              <span className="text-xs md:text-sm font-bold text-gray-300 group-hover:text-white transition-colors text-center leading-tight mt-3 select-none">
                {tool.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
