import { Link } from "react-router-dom";
import { HeroSection } from "@/components/HeroSection";
import { ProjectCard } from "@/components/ProjectCard";
import { Reveal } from "@/components/Reveal";
import { SkillsStrip } from "@/components/SkillsStrip";
import { featuredProjects } from "@/data/projects";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export function HomePage() {
  useDocumentTitle("Karlo Val Pecha · Software Developer");

  return (
    <>
      <HeroSection />
      <SkillsStrip />

      <section className="px-4 py-14 sm:py-16 lg:py-20" aria-labelledby="featured-heading">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <Reveal when="scroll" delay={0} distance="sm">
                <h2 id="featured-heading" className="font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                  Featured work
                </h2>
              </Reveal>
              <Reveal when="scroll" delay={60}>
                <p className="mt-2 max-w-xl text-muted-foreground">
                  Three recent projects recruiters scan first. Full archive on the Projects page.
                </p>
              </Reveal>
            </div>
            <Reveal when="scroll" delay={40} distance="sm">
              <Link
                to="/projects"
                className="inline-flex min-h-11 shrink-0 items-center justify-self-start rounded-md border border-border bg-surface px-4 py-2 text-sm font-medium text-foreground transition-colors duration-200 hover:border-accent/45 hover:bg-secondary motion-safe:active:translate-y-px motion-safe:transition-transform motion-safe:duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
              >
                View all projects
              </Link>
            </Reveal>
          </div>
          <ul className="mt-10 grid list-none gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((p, i) => (
              <li key={p.slug} className="h-full">
                <Reveal when="scroll" delay={i * 100 + 80} distance="md">
                  <ProjectCard
                    slug={p.slug}
                    title={p.title}
                    outcome={p.outcome}
                    summary={p.summary}
                    stack={p.stack}
                    tags={p.tags}
                  />
                </Reveal>
              </li>
            ))}
          </ul>
          <Reveal when="scroll" delay={120} distance="sm">
            <div className="mt-12 rounded-xl border border-dashed border-border bg-surface-muted/40 p-6 text-center sm:p-8">
              <p className="text-sm font-medium text-foreground">Need a sprint-ready engineer?</p>
              <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground">
                Send constraints, stack, and timeline. I&apos;ll reply with how I&apos;d tackle the build.
              </p>
              <Link
                to="/contact"
                className="motion-safe:active:translate-ypx mt-4 inline-flex min-h-11 cursor-pointer items-center justify-center rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors duration-200 hover:bg-primary/90 motion-safe:transition-transform motion-safe:duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
              >
                Start a conversation
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
