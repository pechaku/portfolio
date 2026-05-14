import { Link } from "react-router-dom";

export type ProjectCardProps = {
  slug: string;
  title: string;
  outcome: string;
  summary: string;
  stack: string[];
  tags?: string[];
};

export function ProjectCard({ slug, title, outcome, summary, stack, tags }: ProjectCardProps) {
  return (
    <article className="group h-full">
      <Link
        to={`/projects/${slug}`}
        aria-label={`${title} · Case study`}
        className="motion-safe:active:translate-y-px flex h-full cursor-pointer flex-col rounded-xl border border-border bg-surface p-5 shadow-sm transition-colors duration-200 hover:border-accent/45 motion-safe:[transition:border-color_.2s,transform_.28s_cubic-bezier(.22,1,.36,1),box-shadow_.28s_ease-out] hover:shadow-lg hover:shadow-primary/10 motion-safe:hover:-translate-y-1 motion-safe:active:brightness-[0.997] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
      >
        <p className="text-xs font-medium uppercase tracking-wide text-primary">{outcome}</p>
        <div className="mt-3 flex flex-wrap gap-2 font-mono text-xs text-muted-foreground">
          {stack.map((s) => (
            <span key={s} className="rounded bg-surface-muted px-2 py-0.5 text-foreground">
              {s}
            </span>
          ))}
        </div>
        <h2 className="mt-4 font-heading text-lg font-semibold text-foreground group-hover:text-primary">
          {title}
        </h2>
        <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">{summary}</p>
        {(tags ?? []).length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-2" aria-label="Tags">
            {tags!.map((t) => (
              <li key={t}>
                <span className="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted-foreground">
                  {t}
                </span>
              </li>
            ))}
          </ul>
        )}
        <span className="motion-safe:[transition:transform_0.3s cubic-bezier(.22,1,.36,1)] mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary motion-safe:group-hover:translate-x-1">
          Case study<span aria-hidden>→</span>
        </span>
      </Link>
    </article>
  );
}
