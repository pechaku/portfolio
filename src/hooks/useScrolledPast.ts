import { useEffect, useState } from "react";

/** True when viewport has scrolled more than threshold px (sticky header elevate, etc.). */
export function useScrolledPast(thresholdPx: number) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > thresholdPx);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [thresholdPx]);

  return scrolled;
}
