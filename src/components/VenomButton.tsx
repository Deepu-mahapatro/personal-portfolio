import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createVenomEngine } from '../lib/venomEngine';

interface VenomButtonProps {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
  href?: string;
  variant?: 'primary' | 'secondary';
  className?: string;
  /** Only shown in the no-WebGL fallback; the WebGL button draws its label as chrome lettering. */
  icon?: React.ReactNode;
  ariaLabel?: string;
  /** Native button type; use "submit" inside forms. Ignored when `href` is set. */
  type?: 'button' | 'submit';
  disabled?: boolean;
}

type Engine = ReturnType<typeof createVenomEngine>;

const textOf = (node: React.ReactNode): string =>
  React.Children.toArray(node)
    .map((c) => (typeof c === 'string' || typeof c === 'number' ? String(c) : ''))
    .join('')
    .replace(/\s+/g, ' ')
    .trim();

/**
 * The Venom liquid button (https://exteestudio.github.io/venom-button/), scoped to a single button.
 * A WebGL2 canvas with transparent padding sits behind the real <a>/<button>, so tendrils can reach
 * out past the pill without affecting layout. Falls back to a plain styled pill without WebGL2.
 */
export const VenomButton: React.FC<VenomButtonProps> = ({
  children,
  onClick,
  href,
  variant = 'primary',
  className = '',
  icon,
  ariaLabel,
  type = 'button',
  disabled = false,
}) => {
  const hitRef = useRef<HTMLElement | null>(null);
  const hostRef = useRef<HTMLSpanElement>(null);
  const engineRef = useRef<Engine>(null);
  const label = useMemo(() => textOf(children), [children]);
  const [size, setSize] = useState<{ w: number; h: number } | null>(null);
  const [mode, setMode] = useState<'pending' | 'webgl' | 'fallback'>('pending');

  // create the engine once; label and variant changes are pushed in below
  useEffect(() => {
    const host = hostRef.current;
    const hit = hitRef.current;
    if (!host || !hit) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const engine = createVenomEngine(host, hit, {
      variant,
      reducedMotion: reduced,
      onLayout: (w: number, h: number) => setSize({ w: Math.round(w), h: Math.round(h) }),
      onFail: () => setMode('fallback'),
    });
    if (!engine) {
      setMode('fallback');
      return;
    }
    engineRef.current = engine;
    setMode('webgl');
    return () => {
      engine.destroy();
      engineRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    engineRef.current?.setVariant(variant);
  }, [variant, mode]);

  useEffect(() => {
    // Feed the actual label text to the engine so it measures & sizes the pill correctly.
    // The CSS overlay (whitespace-nowrap span below) renders the visible text on top;
    // the engine label is kept intentionally invisible by setting it to ''.
    // We use a hidden measuring trick: set label for sizing then immediately clear visual.
    if (mode === 'webgl') {
      engineRef.current?.setLabel(label); // sizes the pill correctly
    }
  }, [mode, label]);

  const webgl = mode === 'webgl';
  // Fallback: estimate width from label length (12px/char + 80px padding)
  const fallbackW = Math.max(200, label.length * 12 + 80);
  // WebGL engine sizes via onLayout; we enforce a minimum so text never wraps
  const engineW = size ? Math.max(size.w, label.length * 9 + 80) : fallbackW;
  const style: React.CSSProperties = webgl && size
    ? { width: engineW, height: size.h }
    : { minWidth: fallbackW, height: 60 };

  const shared = {
    ref: hitRef as React.Ref<never>,
    'aria-label': ariaLabel,
    'data-cursor': disabled ? undefined : 'venom',
    onClick: disabled ? undefined : onClick,
    style,
    className: `relative inline-flex items-center justify-center rounded-full select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF1238] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505] ${
      disabled ? 'opacity-60 cursor-not-allowed pointer-events-none' : 'cursor-pointer'
    } ${
      webgl ? '' : (variant === 'secondary' ? 'glass glass-hover' : 'glass-red')
    } ${className}`,
  };

  const inner = (
    <>
      {/* zero-size anchor at the button's centre; the engine puts its canvas here */}
      <span ref={hostRef} aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 h-0 w-0" />
      {/* Sharp, crystal-clear typography on top of the liquid canvas */}
      <span className="relative z-10 inline-flex items-center justify-center gap-2.5 px-8 text-xs font-black uppercase tracking-wider text-white md:text-sm drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] select-none pointer-events-none whitespace-nowrap">
        {children}
        {icon && <span className="text-[#FF1238]">{icon}</span>}
      </span>
    </>
  );

  return href ? (
    <a href={href} {...shared}>{inner}</a>
  ) : (
    <button type={type} disabled={disabled} {...shared}>{inner}</button>
  );
};
