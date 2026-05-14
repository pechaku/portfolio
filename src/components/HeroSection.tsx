import { Link } from "react-router-dom";
import { Reveal } from "@/components/Reveal";
import { site } from "@/config/site";

const btnPrimary =
  "inline-flex min-h-11 cursor-pointer items-center justify-center rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors duration-200 hover:bg-primary/90 motion-safe:active:translate-y-px motion-safe:active:brightness-95 motion-safe:transition-[transform,filter] motion-safe:duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2";

const btnGhost =
  "inline-flex min-h-11 cursor-pointer items-center justify-center rounded-md border border-border bg-surface px-5 py-2.5 text-sm font-medium text-foreground transition-colors duration-200 hover:border-accent/45 hover:bg-secondary motion-safe:active:translate-y-px motion-safe:transition-transform motion-safe:duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2";

export function HeroSection() {
  return (
    <section className="border-b border-border bg-surface/60 px-4 py-16 backdrop-blur-sm sm:py-24 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal when="mount" delay={0} distance="sm">
          <div className="flex items-center gap-3">
            <span className="hero-accent-bar h-1.5 w-14 shrink-0 rounded-full bg-accent/90" aria-hidden />
            <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
              Full-stack software developer · {site.location.split(" · ")[0]}
            </p>
          </div>
        </Reveal>

        <Reveal when="mount" delay={90} distance="md">
          <h1 className="mt-3 font-heading text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            {site.name}
          </h1>
        </Reveal>

        <Reveal when="mount" delay={170} distance="md">
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            I build SaaS, integrations, and hardware-adjacent systems. Strong on{" "}
            <span className="font-medium text-foreground">.NET/Azure</span>, React/Blazor-class SPAs, and Python/Flask, with
            a bias for shipping clarity in small agile teams.
          </p>
        </Reveal>

        <Reveal when="mount" delay={240} distance="sm">
          <p className="mt-4 text-sm font-medium text-foreground">{site.availabilityNote}</p>
        </Reveal>

        <Reveal when="mount" delay={300} distance="sm" className="mt-8 flex flex-wrap gap-3">
          <Link to="/projects" className={btnPrimary}>
            View projects
          </Link>
          <Link to="/contact" className={btnGhost}>
            Contact
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
