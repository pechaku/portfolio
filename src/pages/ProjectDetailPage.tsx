import type { ReactNode } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ProjectCaseStudyLayout } from "@/components/ProjectCaseStudyLayout";
import { Reveal } from "@/components/Reveal";
import {
  DEFAULT_CASE_STUDY_SECTION_ORDER,
  DEFAULT_CASE_STUDY_SECTION_TITLES,
  type CaseStudySectionKey,
  getProjectBySlug,
} from "@/data/projects";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

function Chip({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">{children}</span>
  );
}

export function ProjectDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const project = slug ? getProjectBySlug(slug) : undefined;

  useDocumentTitle(project ? `${project.title} · Case study` : "Project not found");

  if (!project) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-20 text-center sm:px-6">
        <Reveal when="mount" delay={40}>
          <h1 className="font-heading text-2xl font-semibold text-foreground">Project not found</h1>
        </Reveal>
        <Reveal when="mount" delay={90}>
          <p className="mt-2 text-muted-foreground">That slug does not match a published case study.</p>
        </Reveal>
        <Reveal when="mount" delay={130} className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="motion-safe:active:translate-y-px inline-flex min-h-11 cursor-pointer items-center rounded-md border border-border bg-surface px-4 text-sm font-medium text-foreground motion-safe:transition-transform motion-safe:duration-150 hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
          >
            Go back
          </button>
          <Link
            to="/projects"
            className="block text-sm font-medium text-primary underline decoration-primary/30 underline-offset-4 motion-safe:active:brightness-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 sm:inline"
          >
            Browse all projects
          </Link>
        </Reveal>
      </div>
    );
  }

  const { sections } = project;
  const hidden = new Set(project.hiddenSections ?? []);
  const order = project.sectionOrder ?? DEFAULT_CASE_STUDY_SECTION_ORDER;
  const titles: Record<CaseStudySectionKey, string> = {
    ...DEFAULT_CASE_STUDY_SECTION_TITLES,
    ...project.sectionTitles,
  };

  const sectionBodies: Record<CaseStudySectionKey, { id: string; body: ReactNode }> = {
    problem: { id: "problem-heading", body: <p>{sections.problem}</p> },
    approach: { id: "approach-heading", body: <p>{sections.approach}</p> },
    techStack: {
      id: "stack-heading",
      body: (
        <div className="not-prose space-y-6">
          {sections.techStack.map((group) => (
            <div key={group.category}>
              <h3 className="font-heading text-base font-semibold text-foreground">{group.category}</h3>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                {group.items.map((item) => (
                  <li key={item}>
                    <span className="font-mono text-foreground/90">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ),
    },
    challenges: { id: "challenges-heading", body: <p>{sections.challenges}</p> },
    results: { id: "results-heading", body: <p>{sections.results}</p> },
    improvements: { id: "improve-heading", body: <p>{sections.improvements}</p> },
  };

  const blocks = order
    .filter((key) => !hidden.has(key))
    .map((key, i) => ({
      id: sectionBodies[key].id,
      title: titles[key],
      body: sectionBodies[key].body,
      delay: i * 90,
    }));

  return (
    <ProjectCaseStudyLayout
      title={project.title}
      meta={
        <>
          <Reveal when="scroll" delay={0} distance="sm" className="inline-flex flex-wrap gap-2">
            <Chip>{project.period}</Chip>
            <Chip>{project.role}</Chip>
          </Reveal>
        </>
      }
    >
      {blocks.map(({ id, title, body, delay }) => (
        <Reveal key={id} when="scroll" delay={delay} distance="md">
          <section aria-labelledby={id}>
            <h2 id={id} className="font-heading text-2xl font-semibold text-foreground">
              {title}
            </h2>
            {body}
          </section>
        </Reveal>
      ))}
    </ProjectCaseStudyLayout>
  );
}
