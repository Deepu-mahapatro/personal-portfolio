import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ExternalLink, Github, Sparkles, CheckCircle2 } from 'lucide-react';
import type { Project } from '../data/portfolioData';

interface VideoModalProps {
  project: Project | null;
  onClose: () => void;
  onNavigate: (direction: 1 | -1) => void;
  onInquire: (project: Project) => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({ project, onClose, onNavigate, onInquire }) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const isOpen = project !== null;

  // Lock scroll, trap focus, handle keys, and return focus to the card that opened the modal
  useEffect(() => {
    if (!isOpen) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNavigate(1);
      if (e.key === 'ArrowLeft') onNavigate(-1);
      if (e.key === 'Tab' && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'button, a[href], video[controls], [tabindex]:not([tabindex="-1"])',
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
  }, [isOpen, onClose, onNavigate]);

  const primaryTech = project?.primaryTech || project?.tags?.slice(0, 5) || [];
  const fullTech = project?.fullTech || project?.tags || [];

  return (
    <AnimatePresence>
      {project && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-2xl"
          />

          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label={project.title}
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.25 }}
            className="glass glass-strong relative z-10 flex max-h-[92dvh] w-full max-w-4xl flex-col overflow-y-auto rounded-3xl border-[#ff334b]/35 shadow-2xl shadow-red-950/60 custom-scrollbar my-auto"
          >
            {/* 2.1 Project modal header */}
            <div className="sticky top-0 z-20 flex items-center justify-between border-b border-white/10 bg-[#0a0a0f]/90 backdrop-blur-xl px-5 py-3.5">
              <div className="flex min-w-0 items-center gap-3">
                <span className="glass-chip-red shrink-0 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
                  {project.category}
                </span>
                <h3 className="truncate text-base font-bold text-white tracking-wide">{project.title}</h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onNavigate(-1)}
                  aria-label="Previous project"
                  className="glass-chip rounded-full p-2 text-gray-200 hover:text-white hover:border-[#ff334b]/50 transition-colors"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate(1)}
                  aria-label="Next project"
                  className="glass-chip rounded-full p-2 text-gray-200 hover:text-white hover:border-[#ff334b]/50 transition-colors"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
                <button
                  ref={closeRef}
                  type="button"
                  onClick={onClose}
                  aria-label="Close project"
                  className="glass-chip rounded-full p-2 text-gray-200 hover:bg-red-600/80 hover:text-white transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* 2.2 Main project visual area */}
            <div className="relative w-full overflow-hidden bg-black/80 border-b border-white/10">
              <div className="relative aspect-[16/9] w-full max-h-[380px] overflow-hidden bg-[#050508]">
                {/* Project Number Watermark */}
                {project.number && (
                  <div className="absolute top-4 left-4 z-10 glass-chip font-mono text-xs sm:text-sm font-black text-red-400 px-3 py-1 rounded-full border border-red-500/30 backdrop-blur-md">
                    PROJECT {project.number}
                  </div>
                )}

                {/* Thumbnail Image */}
                {project.poster ? (
                  <img
                    key={project.id}
                    src={project.poster}
                    alt={`${project.title} preview`}
                    draggable={false}
                    className="h-full w-full object-cover object-top"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center text-gray-400">
                    Preview unavailable
                  </div>
                )}

                {/* Subtle gradient overlay at bottom of visual container */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#08080c] via-transparent to-black/30 pointer-events-none" />
              </div>

              {/* Title, Subtitle, and FIRST ROW OF TECH BADGES */}
              <div className="p-5 sm:p-6 bg-[#08080c]/90">
                <div className="flex flex-col gap-1">
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white uppercase tracking-tight">
                    {project.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-300 font-medium">
                    {project.subtitle}
                  </p>
                </div>

                {/* FIRST TECHNOLOGY ROW — PRIMARY TECHNOLOGIES */}
                <div className="mt-4 flex flex-col gap-1.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-red-400/90 flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-red-400" />
                    Core Architecture & Primary Stack
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {primaryTech.map((tech) => (
                      <span
                        key={tech}
                        className="glass-chip rounded-full px-3 py-1 text-xs font-semibold text-gray-100 border border-red-500/20 bg-red-950/20 hover:border-red-400/50 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 2.3 Project description and architecture details */}
            <div className="p-5 sm:p-6 flex flex-col gap-5 bg-white/[0.02]">
              {/* Comprehensive Description */}
              <div className="flex flex-col gap-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-red-400">
                  Project Overview
                </h4>
                <p className="text-sm leading-relaxed text-gray-200">
                  {project.description}
                </p>
              </div>

              {/* Problem Solved & System Mechanism */}
              {(project.problemSolved || project.howItWorks) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  {project.problemSolved && (
                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 flex flex-col gap-1.5">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
                        Problem Solved & Value
                      </span>
                      <p className="text-xs leading-relaxed text-gray-300">
                        {project.problemSolved}
                      </p>
                    </div>
                  )}
                  {project.howItWorks && (
                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 flex flex-col gap-1.5">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
                        Workflow & Implementation
                      </span>
                      <p className="text-xs leading-relaxed text-gray-300">
                        {project.howItWorks}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Key Features Bullet List */}
              {project.features && project.features.length > 0 && (
                <div className="flex flex-col gap-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-red-400">
                    Key Implemented Features
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-300">
                    {project.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2 bg-white/[0.02] border border-white/5 rounded-xl p-2.5">
                        <CheckCircle2 className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
                        <span className="leading-tight">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* 2.4 SECOND TECHNOLOGY ROW — COMPLETE TECHNOLOGY STACK */}
              <div className="flex flex-col gap-2 pt-2 border-t border-white/10">
                <h4 className="text-xs font-bold uppercase tracking-wider text-red-400">
                  Complete Technology Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {fullTech.map((tech) => (
                    <span
                      key={tech}
                      className="glass-chip rounded-full px-3 py-1 text-xs font-medium text-gray-300 border border-white/10 hover:border-white/20 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* 2.6 Project navigation and actions (Footer) */}
            <div className="sticky bottom-0 z-20 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 bg-[#0a0a0f]/95 backdrop-blur-xl px-5 py-3.5 sm:px-6">
              <div className="flex flex-wrap items-center gap-2.5">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass-chip inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold text-gray-200 hover:text-white hover:border-red-500/50 transition-colors"
                  >
                    <span>View Live</span>
                    <ExternalLink className="h-3.5 w-3.5 text-red-400" />
                  </a>
                )}
                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass-chip inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold text-gray-200 hover:text-white hover:border-red-500/50 transition-colors"
                  >
                    <Github className="h-3.5 w-3.5 text-gray-300" />
                    <span>View Code</span>
                    <ExternalLink className="h-3 w-3 text-red-400" />
                  </a>
                )}
              </div>

              <div className="flex items-center gap-3">
                <a
                  href="#contact"
                  onClick={() => onInquire(project)}
                  className="glass-red inline-flex items-center justify-center rounded-full px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg hover:scale-[1.02] active:scale-95 transition-all"
                >
                  Discuss Project
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
