import { type RefObject, useEffect } from "react";

/** Arrow keys move by one viewport width on the home horizontal scroller. */
export function useHomeHorizontalKeys(scrollerRef: RefObject<HTMLElement | null>, enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
      const t = e.target;
      if (t instanceof HTMLInputElement || t instanceof HTMLTextAreaElement || t instanceof HTMLSelectElement) return;
      if (t instanceof HTMLElement && t.isContentEditable) return;

      const strip = scrollerRef.current;
      if (!strip) return;

      e.preventDefault();
      const step = strip.clientWidth;
      strip.scrollBy({ left: e.key === "ArrowRight" ? step : -step, behavior: "smooth" });
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [enabled, scrollerRef]);
}
