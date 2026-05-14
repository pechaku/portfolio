import { type RefObject, useEffect } from "react";

/**
 * Maps vertical wheel deltas to horizontal scroll on `scrollerRef` when `enabled`.
 * Skips hijacking when `prefers-reduced-motion: reduce` or when the event target sits
 * inside a nested element that can still scroll vertically in `deltaY`'s direction.
 */
export function useHorizontalWheelRedirect(
  scrollerRef: RefObject<HTMLElement | null>,
  enabled: boolean,
  reducedMotion: boolean,
) {
  useEffect(() => {
    if (!enabled || reducedMotion) return;
    const strip = scrollerRef.current;
    if (!strip) return;

    function verticalOverflowAllowsScroll(node: HTMLElement, dy: number) {
      const style = window.getComputedStyle(node);
      const oy = style.overflowY;
      if (oy !== "auto" && oy !== "scroll" && oy !== "overlay") return false;
      const max = node.scrollHeight - node.clientHeight;
      if (max <= 1) return false;
      if (dy > 0) return node.scrollTop < max - 1;
      return node.scrollTop > 0;
    }

    function onWheel(e: WheelEvent) {
      const node = scrollerRef.current;
      if (!node) return;
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;

      const path = e.composedPath();
      for (const item of path) {
        if (!(item instanceof HTMLElement)) continue;
        if (item === node) break;
        if (node.contains(item) && verticalOverflowAllowsScroll(item, e.deltaY)) {
          return;
        }
      }

      e.preventDefault();
      node.scrollLeft += e.deltaY;
    }

    strip.addEventListener("wheel", onWheel, { passive: false });
    return () => strip.removeEventListener("wheel", onWheel);
  }, [enabled, reducedMotion, scrollerRef]);
}
