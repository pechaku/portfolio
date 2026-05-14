import { lazy, Suspense, useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { useHomeHorizontalKeys } from "@/hooks/useHomeHorizontalKeys";
import { useHorizontalWheelRedirect } from "@/hooks/useHorizontalWheelRedirect";
import type { RootLayoutOutletContext } from "@/layouts/rootLayoutContext";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const PANEL_COUNT = 4;

const panelShell =
  "box-border flex h-full min-h-[calc(100dvh-4.75rem)] w-screen shrink-0 snap-start snap-always flex-col md:min-h-0";

const LazyHero = lazy(() => import("@/pages/homePanels/HomeHeroPanel"));
const LazySkills = lazy(() => import("@/pages/homePanels/HomeSkillsPanel"));
const LazyFeatured = lazy(() => import("@/pages/homePanels/HomeFeaturedPanel"));
const LazyClosing = lazy(() => import("@/pages/homePanels/HomeClosingPanel"));

const lazyPanels = [LazyHero, LazySkills, LazyFeatured, LazyClosing] as const;

function PanelSkeleton() {
  return (
    <div className="flex min-h-0 flex-1 flex-col items-center justify-center px-4 py-16" aria-hidden>
      <div className="h-2 w-40 max-w-[50%] rounded-full bg-surface-muted motion-safe:animate-pulse" />
      <div className="mt-4 h-2 w-64 max-w-[70%] rounded-full bg-surface-muted/80 motion-safe:animate-pulse motion-safe:[animation-delay:120ms]" />
      <div className="mt-3 h-2 w-48 max-w-[60%] rounded-full bg-surface-muted/70 motion-safe:animate-pulse motion-safe:[animation-delay:240ms]" />
    </div>
  );
}

function HomePanelCargo({ index }: { index: number }) {
  const Lazy = lazyPanels[index];
  return (
    <Suspense fallback={<PanelSkeleton />}>
      <Lazy />
    </Suspense>
  );
}

type ChevronNavProps = {
  side: "left" | "right";
  label: string;
  disabled: boolean;
  onClick: () => void;
  glyph: "<" | ">";
};

function ChevronNavButton({ side, label, disabled, onClick, glyph }: ChevronNavProps) {
  const animClass = side === "left" ? "animate-home-chevron-left" : "animate-home-chevron-right";

  return (
    <button
      type="button"
      aria-label={label}
      aria-disabled={disabled}
      disabled={disabled}
      onClick={onClick}
      className={`pointer-events-auto absolute top-1/2 z-30 flex -translate-y-1/2 ${
        side === "left" ? "left-2 sm:left-4" : "right-2 sm:right-4"
      } h-11 w-11 items-center justify-center rounded-full border border-border bg-surface/90 text-base font-semibold text-foreground shadow-md shadow-black/10 backdrop-blur-sm transition-[opacity,transform,background-color] duration-200 hover:bg-surface hover:text-primary sm:h-12 sm:w-12 sm:text-lg enabled:motion-safe:hover:scale-105 disabled:pointer-events-none disabled:opacity-35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2`}
    >
      <span className={`inline-block ${animClass}`} aria-hidden>
        {glyph}
      </span>
    </button>
  );
}

export function HomePage() {
  useDocumentTitle("Karlo Val Pecha · Software Developer");
  const { setHomeScrollLeft } = useOutletContext<RootLayoutOutletContext>();
  const reducedMotion = usePrefersReducedMotion();
  const scrollerRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const pendingLeftRef = useRef(0);
  const [loadedBits, setLoadedBits] = useState(1);
  const [panelIndex, setPanelIndex] = useState(0);

  const markPanelsToLoad = useCallback((indices: Iterable<number>) => {
    setLoadedBits((bits) => {
      let next = bits;
      for (const i of indices) {
        if (i >= 0 && i < PANEL_COUNT) next |= 1 << i;
      }
      return next;
    });
  }, []);

  const isPanelLoaded = (i: number) => ((loadedBits >> i) & 1) === 1;

  useHorizontalWheelRedirect(scrollerRef, true, reducedMotion);
  useHomeHorizontalKeys(scrollerRef, true);

  useLayoutEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollTo({ left: 0 });
    setHomeScrollLeft(0);
    setPanelIndex(0);
    setLoadedBits(1);
    if (parallaxRef.current) parallaxRef.current.style.transform = "translate3d(0,0,0)";
  }, [setHomeScrollLeft]);

  const syncFromScrollLeft = useCallback(
    (left: number) => {
      const el = scrollerRef.current;
      const w = el?.clientWidth ?? 0;
      if (w <= 0) return;
      const i = Math.min(PANEL_COUNT - 1, Math.max(0, Math.round(left / w)));
      setPanelIndex(i);
      markPanelsToLoad([i]);
    },
    [markPanelsToLoad],
  );

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const onScroll = () => {
      pendingLeftRef.current = el.scrollLeft;
      if (rafRef.current) return;
      rafRef.current = window.requestAnimationFrame(() => {
        rafRef.current = 0;
        const left = pendingLeftRef.current;
        setHomeScrollLeft(left);
        syncFromScrollLeft(left);
        if (parallaxRef.current && !reducedMotion) {
          parallaxRef.current.style.transform = `translate3d(${left * -0.045}px, 0, 0)`;
        }
      });
    };

    onScroll();
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
      window.cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
    };
  }, [reducedMotion, setHomeScrollLeft, syncFromScrollLeft]);

  const goBySection = useCallback(
    (delta: number) => {
      const el = scrollerRef.current;
      if (!el) return;
      const w = el.clientWidth;
      if (w <= 0) return;
      const current = Math.min(PANEL_COUNT - 1, Math.max(0, Math.round(el.scrollLeft / w)));
      const next = Math.min(PANEL_COUNT - 1, Math.max(0, current + delta));
      markPanelsToLoad([next]);
      el.scrollTo({ left: next * w, behavior: "smooth" });
    },
    [markPanelsToLoad],
  );

  return (
    <div className="relative h-full min-h-[calc(100dvh-4.75rem)] min-w-0 flex-1 md:min-h-0">
      <div ref={parallaxRef} className="pointer-events-none absolute inset-0 z-0 overflow-hidden will-change-transform">
        <div className="home-panels-aurora absolute inset-[-18%]" aria-hidden />
      </div>

      <ChevronNavButton
        side="left"
        glyph="<"
        label="Previous section"
        disabled={panelIndex <= 0}
        onClick={() => goBySection(-1)}
      />
      <ChevronNavButton
        side="right"
        glyph=">"
        label="Next section"
        disabled={panelIndex >= PANEL_COUNT - 1}
        onClick={() => goBySection(1)}
      />

      <div
        ref={scrollerRef}
        tabIndex={0}
        role="region"
        aria-label="Home page sections. Use the arrow buttons, horizontal scroll, swipe, or keyboard arrows to move between sections."
        className="scrollbar-none relative z-10 flex h-full min-h-[calc(100dvh-4.75rem)] scroll-smooth snap-x snap-mandatory overflow-x-auto overflow-y-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background md:min-h-0"
      >
        <section id="home-panel-hero" className={panelShell}>
          {isPanelLoaded(0) ? <HomePanelCargo index={0} /> : <PanelSkeleton />}
        </section>

        <section id="home-panel-skills" className={panelShell}>
          {isPanelLoaded(1) ? <HomePanelCargo index={1} /> : <PanelSkeleton />}
        </section>

        <section id="home-panel-featured" className={panelShell} aria-labelledby="featured-heading">
          {isPanelLoaded(2) ? <HomePanelCargo index={2} /> : <PanelSkeleton />}
        </section>

        <section id="home-panel-closing" className={panelShell} aria-labelledby="closing-heading">
          {isPanelLoaded(3) ? <HomePanelCargo index={3} /> : <PanelSkeleton />}
        </section>
      </div>
    </div>
  );
}
