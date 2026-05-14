import { ProjectCard } from "@/components/ProjectCard";
import { Reveal } from "@/components/Reveal";
import { projects } from "@/data/projects";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export function ProjectsPage() {
  useDocumentTitle("Projects · Karlo Val Pecha");

  return (
    <section className="px-4 py-12 sm:px-6 sm:py-16" aria-labelledby="projects-page-heading">
      <div className="mx-auto max-w-6xl">
        <Reveal when="scroll" delay={0} distance="sm">
          <h1 id="projects-page-heading" className="font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Projects
          </h1>
        </Reveal>
        <Reveal when="scroll" delay={70}>
          <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
            Case studies across SaaS CRMs, civic/education tooling, IoT backends, aviation kiosks, and enterprise Blazor suites.
          </p>
        </Reveal>
        <ul className="mt-12 grid list-none gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <li key={p.slug} className="h-full">
              <Reveal when="scroll" delay={i * 90 + 50} distance="md">
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
    </section>
  );
}
