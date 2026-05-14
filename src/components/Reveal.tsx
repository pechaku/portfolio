import { type CSSProperties, type ReactNode, useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type RevealWhen = "scroll" | "mount";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  distance?: "sm" | "md";
  when?: RevealWhen;
};

const offset = { sm: "translate-y-3", md: "translate-y-6" } as const;

export function Reveal({
  children,
  className = "",
  delay = 0,
  distance = "md",
  when = "scroll",
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = usePrefersReducedMotion();
  const [shown, setShown] = useState(false);

  /** Motion-reduced viewers see content immediately (no observers or timers needed). */
  const enter = reduceMotion || shown;

  useEffect(() => {
    if (reduceMotion) return;

    if (when === "mount") {
      const id = window.setTimeout(() => setShown(true), 16 + delay);
      return () => window.clearTimeout(id);
    }

    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          setShown(true);
          obs.disconnect();
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -8% 0px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [when, delay, reduceMotion]);

  const style: CSSProperties | undefined =
    delay > 0 && !reduceMotion && enter ? { transitionDelay: `${delay}ms` } : undefined;

  return (
    <div
      ref={ref}
      className={`motion-safe:transition-[transform,opacity] motion-safe:duration-[520ms] motion-safe:ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transform-none motion-reduce:transition-none ${
        enter ? "translate-y-0 opacity-100" : `${offset[distance]} opacity-0`
      } ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}
