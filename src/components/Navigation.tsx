import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { site } from "@/config/site";
import { useScrolledPast } from "@/hooks/useScrolledPast";

const navLinkBase =
  "rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2";

function navClass(isActive: boolean) {
  return `${navLinkBase} ${isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"}`;
}

export function Navigation() {
  const [open, setOpen] = useState(false);
  const elevated = useScrolledPast(10);

  return (
    <header
      className={`sticky top-0 z-50 border-b border-border bg-surface/95 backdrop-blur supports-[backdrop-filter]:bg-surface/80 motion-safe:transition-[box-shadow,background-color] motion-safe:duration-300 ${
        elevated ? "shadow-md shadow-black/10" : "shadow-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link
          to="/"
          className="font-heading text-base font-semibold tracking-tight text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
        >
          {site.name.split(" ")[0]} <span className="text-muted-foreground">Pecha</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          <NavLink to="/" className={({ isActive }) => navClass(isActive)} end>
            Home
          </NavLink>
          <NavLink to="/projects" className={({ isActive }) => navClass(isActive)}>
            Projects
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => navClass(isActive)}>
            About
          </NavLink>
          <NavLink to="/contact" className={({ isActive }) => navClass(isActive)}>
            Contact
          </NavLink>
          <Link
            to="/contact"
            className="ml-2 inline-flex min-h-11 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground motion-safe:active:translate-y-px motion-safe:active:brightness-95 motion-safe:transition-transform motion-safe:duration-150 transition-colors duration-200 hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
          >
            Hire me
          </Link>
        </nav>

        <button
          type="button"
          className="inline-flex min-h-11 min-w-11 cursor-pointer items-center justify-center rounded-md border border-border text-foreground md:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
            {open ? (
              <path strokeWidth="2" strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path strokeWidth="2" strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </div>

      {open ? (
        <div
          id="mobile-nav"
          className="menu-panel-motion border-t border-border bg-surface px-4 py-3 md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          <div className="flex flex-col gap-1">
            <NavLink
              to="/"
              className={({ isActive }) => `${navClass(isActive)} min-h-11`}
              end
              onClick={() => setOpen(false)}
            >
              Home
            </NavLink>
            <NavLink
              to="/projects"
              className={({ isActive }) => `${navClass(isActive)} min-h-11`}
              onClick={() => setOpen(false)}
            >
              Projects
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) => `${navClass(isActive)} min-h-11`}
              onClick={() => setOpen(false)}
            >
              About
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) => `${navClass(isActive)} min-h-11`}
              onClick={() => setOpen(false)}
            >
              Contact
            </NavLink>
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex min-h-11 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground motion-safe:active:translate-y-px motion-safe:active:brightness-95 motion-safe:transition-transform motion-safe:duration-150"
            >
              Hire me
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
