import React from 'react';
import { SITE, SOCIALS } from '../data/portfolioData';

const CURRENT_YEAR = new Date().getFullYear();

export const Footer: React.FC = () => {
  return (
    <footer className="glass-bar w-full text-white py-14 px-6 md:px-16 border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex flex-col items-center md:items-start gap-1">
          <a href="/" className="text-2xl font-black tracking-tight uppercase flex items-center">
            <span className="text-red-600 drop-shadow-[0_0_10px_rgba(220,38,38,0.8)]">{SITE.name.charAt(0)}</span>
            <span>{SITE.name.slice(1)}.</span>
          </a>
          <p className="text-[11px] text-gray-400 font-mono tracking-widest uppercase">
            {SITE.role}
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          {SOCIALS.map((social) => (
            <a
              key={social.id}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-chip px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider text-gray-300 hover:text-white transition-all hover:scale-105 flex items-center gap-2"
            >
              {social.id === 'leetcode' && (
                <svg className="w-3.5 h-3.5 fill-[#FFA116]" viewBox="0 0 24 24">
                  <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.247 2.198 5.864 2.198 8.111 0l3.666-3.588a1.378 1.378 0 0 0-.965-2.355 1.37 1.37 0 0 0-.965.405l-3.667 3.589a3.912 3.912 0 0 1-5.517 0l-4.28-4.196a3.957 3.957 0 0 1-.861-1.246 3.84 3.84 0 0 1-.228-.68 3.726 3.726 0 0 1 .006-1.579 3.89 3.89 0 0 1 .84-1.437l3.855-4.126 5.404-5.787a1.377 1.377 0 0 0-.964-2.354zm-2.88 7.378a1.376 1.376 0 0 0-.967 2.354l3.123 3.057-3.123 3.057a1.376 1.376 0 0 0 1.934 1.954l4.09-4.004a1.376 1.376 0 0 0 0-1.954l-4.09-4.004a1.37 1.37 0 0 0-.967-.46z" />
                </svg>
              )}
              {social.id === 'github' && (
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
              )}
              {social.id === 'linkedin' && (
                <svg className="w-3.5 h-3.5 fill-[#0A66C2]" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              )}
              <span>{social.label}</span>
            </a>
          ))}
        </div>

        <div className="flex flex-col items-center md:items-end gap-3">
          <div className="flex flex-wrap items-center justify-center gap-5 text-xs text-gray-400 uppercase tracking-widest font-bold">
            <a href="#about" className="hover:text-red-500 transition-colors">About</a>
            <a href="#skills" className="hover:text-red-500 transition-colors">Skills</a>
            <a href="#projects" className="hover:text-red-500 transition-colors">Projects</a>
            <a href="#contact" className="hover:text-red-500 transition-colors">Contact</a>
          </div>
          <div className="text-[11px] text-gray-500 font-mono uppercase tracking-wider">
            &copy; {CURRENT_YEAR} {SITE.name}. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};
