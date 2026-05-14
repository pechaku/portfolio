import { Link } from "react-router-dom";
import { Reveal } from "@/components/Reveal";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export function NotFoundPage() {
  useDocumentTitle("404 · Karlo Val Pecha");

  return (
    <div className="mx-auto max-w-6xl px-4 py-24 text-center sm:px-6">
      <Reveal when="mount" delay={40} distance="sm">
        <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">404</p>
      </Reveal>
      <Reveal when="mount" delay={90}>
        <h1 className="font-heading mt-2 text-3xl font-semibold tracking-tight text-foreground">Page not found</h1>
      </Reveal>
      <Reveal when="mount" delay={140}>
        <p className="mx-auto mt-3 max-w-md text-muted-foreground">
          The route you requested does not exist. Try the homepage or jump straight to projects.
        </p>
      </Reveal>
      <Reveal when="mount" delay={200} className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          to="/"
          className="motion-safe:active:translate-y-px motion-safe:active:brightness-95 inline-flex min-h-11 cursor-pointer items-center justify-center rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground motion-safe:transition-transform motion-safe:duration-150 transition-colors duration-200 hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
        >
          Home
        </Link>
        <Link
          to="/projects"
          className="motion-safe:active:translate-y-px motion-safe:active:brightness-95 inline-flex min-h-11 cursor-pointer items-center justify-center rounded-md border border-border bg-surface px-5 py-2.5 text-sm font-medium text-foreground motion-safe:transition-transform motion-safe:duration-150 transition-colors duration-200 hover:border-accent/45 hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
        >
          Projects
        </Link>
      </Reveal>
    </div>
  );
}
