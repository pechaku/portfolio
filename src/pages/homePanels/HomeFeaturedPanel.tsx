import { Link } from "react-router-dom";
import { ProjectCard } from "@/components/ProjectCard";
import { Reveal } from "@/components/Reveal";
import { featuredProjects } from "@/data/projects";

export default function HomeFeaturedPanel() {
  return (
    <div className="flex min-h-0 flex-1 flex-col justify-center px-6 py-10 sm:px-8 sm:py-14">
      <div className="min-h-0 flex-1 overflow-y-auto pb-4">
        <div className="mx-auto w-full max-w-6xl">
          <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:items-end sm:justify-between sm:gap-6 sm:text-left">
            <div className="max-w-xl sm:mr-auto">
              <Reveal when="scroll" delay={0} distance="sm">
                <h2
                  id="featured-heading"
                  className="font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
                >
                  Featured work
                </h2>
              </Reveal>
              <Reveal when="scroll" delay={60}>
                <p className="mt-2 text-balance text-muted-foreground">
                  Three recent projects recruiters scan first. Full archive on the Projects page.
                </p>
              </Reveal>
            </div>
            <Reveal when="scroll" delay={40} distance="sm">
              <Link
                to="/projects"
                className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-md border border-border bg-surface px-4 py-2 text-sm font-medium text-foreground transition-colors duration-200 hover:border-accent/45 hover:bg-secondary motion-safe:active:translate-y-px motion-safe:transition-transform motion-safe:duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 sm:self-end"
              >
                View all projects
              </Link>
            </Reveal>
          </div>
          <ul className="mt-10 grid list-none justify-items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
        </div>
      </div>
    </div>
  );
}
