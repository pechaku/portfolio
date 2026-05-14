import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";
import type { RootLayoutOutletContext } from "@/layouts/rootLayoutContext";
import { useScrollToTop } from "@/hooks/useScrollToTop";

export function RootLayout() {
  const { pathname } = useLocation();
  const [homeScrollLeft, setHomeScrollLeft] = useState(0);
  useScrollToTop();

  const isHome = pathname === "/";
  const outletContext: RootLayoutOutletContext = { setHomeScrollLeft };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <Navigation homeScrollLeft={homeScrollLeft} />
      <main
        id="main-content"
        className={`flex-1 ${isHome ? "flex min-h-0 flex-col" : ""}`}
      >
        <div className={isHome ? "flex min-h-0 flex-1 flex-col" : "contents"}>
          <Outlet context={outletContext} />
        </div>
      </main>
      {isHome ? null : <Footer />}
    </div>
  );
}
