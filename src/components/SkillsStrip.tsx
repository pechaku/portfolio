import { Reveal } from "@/components/Reveal";

const skills = [
  {
    title: ".NET / Azure",
    body: "Production services on .NET Framework & Core, Entity Framework, Azure App Services, Functions, AD, and SQL Elastic Pool patterns.",
  },
  {
    title: "React / Blazor / SPAs",
    body: "Modern frontends with Blazor and React-class architectures: component-driven UI, accessible forms, and pragmatic state management.",
  },
  {
    title: "Python / Flask",
    body: "APIs and ops tooling in Flask with MongoDB when the problem calls for fast iteration next to hardware or research workflows.",
  },
  {
    title: "Agile delivery",
    body: "Cross-functional rituals, tight feedback loops, and AI-assisted development (Cursor, Copilot-class tools) without skipping review or tests.",
  },
];

export function SkillsStrip() {
  return (
    <section className="border-b border-border bg-surface-muted/50 px-4 py-14 sm:py-16" aria-labelledby="skills-heading">
      <div className="mx-auto max-w-6xl">
        <Reveal when="scroll" delay={0} distance="sm">
          <h2 id="skills-heading" className="font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            What I ship
          </h2>
        </Reveal>
        <Reveal when="scroll" delay={70} distance="sm">
          <p className="mt-2 max-w-2xl text-muted-foreground">
            Focused stacks for teams who optimize for shipping and owning production.
          </p>
        </Reveal>
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {skills.map((s, i) => (
            <li key={s.title} className="h-full">
              <Reveal when="scroll" delay={i * 80} distance="sm" className="h-full">
                <div className="motion-safe:active:translate-y-px h-full rounded-xl border border-border bg-surface p-5 shadow-sm transition-colors duration-200 hover:border-accent/35 motion-safe:[transition:border-color_.2s,transform_.26s_cubic-bezier(.22,1,.36,1),box-shadow_.26s] hover:shadow-md hover:shadow-primary/10 motion-safe:hover:-translate-y-px">
                  <h3 className="font-heading text-base font-semibold text-foreground">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
