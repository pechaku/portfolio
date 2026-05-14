import type { ReactNode } from "react";
import { Link } from "react-router-dom";

import { Reveal } from "@/components/Reveal";

export function ProjectCaseStudyLayout({
  title,
  meta,
  children,
}: {
  title: string;
  meta: ReactNode;
  children: ReactNode;
}) {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:py-16">
      <header className="border-b border-border pb-10">
        <Reveal when="scroll" delay={0} distance="sm">
          <h1 className="font-heading text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {title}
          </h1>
        </Reveal>
        <div className="mt-4 flex flex-wrap gap-2">{meta}</div>
      </header>
      <div className="prose prose-stone prose-headings:font-heading prose-p:text-muted-foreground prose-li:text-muted-foreground prose-strong:text-foreground mt-10 max-w-none space-y-10">
        {children}
      </div>
      <footer className="mt-14 border-t border-border pt-8">
        <Reveal when="scroll" delay={420} distance="sm">
          <Link
            to="/contact"
            className="inline-flex min-h-11 cursor-pointer items-center justify-center rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors duration-200 hover:bg-primary/90 motion-safe:active:translate-y-px motion-safe:transition-transform motion-safe:duration-150 motion-safe:active:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
          >
            Discuss this project
          </Link>
        </Reveal>
      </footer>
    </article>
  );
}
