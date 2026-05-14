import { Link } from "react-router-dom";
import { Reveal } from "@/components/Reveal";
import { site } from "@/config/site";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

const skillGroups = [
  {
    title: "Languages & frameworks",
    items: [
      "C#, .NET Framework 4.8 / .NET 6+ / Core",
      "ASP.NET, Blazor, Entity Framework, LINQ",
      "HTML, CSS (Bootstrap), JavaScript, React",
      "Python",
    ],
  },
  {
    title: "Cloud & delivery",
    items: ["Azure App Services, Azure Functions, Azure AD", "CI/CD, GitHub, Azure DevOps, Bitbucket, TFS"],
  },
  {
    title: "Data",
    items: ["SQL Server, Azure SQL Elastic Pool, MySQL", "MongoDB"],
  },
  {
    title: "Tools & methods",
    items: [
      "Visual Studio, JIRA, Confluence, Swagger, Postman, Zapier",
      "AI-assisted development (Cursor, Copilot, Claude-class tooling)",
      "Agile delivery, test-driven collaboration",
    ],
  },
];

const howIWork = [
  "Pair with product, hardware, or IT early so requirements match production constraints.",
  "Break initiatives into shippable slices with visible demos for stakeholders.",
  "Use AI tooling to accelerate boilerplate while keeping human review on architecture and security.",
  "Default to explicit tests when the team agrees on TDD, especially around money-moving or compliance flows.",
  "Communicate risk with options, not blockers: scope, timeline, and quality trade-offs stated upfront.",
  "Own follow-through from merge to deployment handoff, including observability hooks when possible.",
];

export function AboutPage() {
  useDocumentTitle("About · Karlo Val Pecha");

  return (
    <section className="px-4 py-12 sm:px-6 sm:py-16" aria-labelledby="about-heading">
      <div className="mx-auto max-w-3xl">
        <Reveal when="scroll" delay={0} distance="sm">
          <h1 id="about-heading" className="font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            About
          </h1>
        </Reveal>
        <Reveal when="scroll" delay={70}>
          <div className="prose prose-stone prose-headings:font-heading prose-p:text-muted-foreground prose-strong:text-foreground mt-8 max-w-none">
            <p>
              I&apos;m {site.name}, a software developer with more than seven years of experience building scalable SaaS and project
              management platforms. At the University of Lethbridge I focus on a wireless mesh cattle tracking system that couples RFID
              hardware with Flask services and MongoDB, translating barn-and-export realities into operator-friendly software.
            </p>
            <p>
              Previously I led delivery of an insurance CRM SaaS for the New Zealand market (The Adviser Platform), managed distributed
              squads, and stayed close to Azure-hosted .NET services. Earlier work spanned Blazor-based civic applications, enterprise
              trailer manufacturing systems, and aviation kiosk accessibility programs for Delta Air Lines.
            </p>
            <p>
              I lean on AI-assisted workflows (Cursor, Copilot-class assistants) to compress delivery time without lowering the bar on
              architecture, compliance, or code review.
            </p>
          </div>
        </Reveal>

        <Reveal when="scroll" delay={100} distance="sm">
          <h2 className="font-heading mt-14 text-2xl font-semibold text-foreground">Skills & stack</h2>
        </Reveal>
        <div className="mt-6 space-y-8">
          {skillGroups.map((g, i) => (
            <Reveal key={g.title} when="scroll" delay={i * 70 + 120} distance="sm">
              <div>
                <h3 className="font-heading text-base font-semibold text-foreground">{g.title}</h3>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
                  {g.items.map((item) => (
                    <li key={item}>
                      <span className="font-mono text-foreground/90">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal when="scroll" delay={140} distance="sm">
          <h2 className="font-heading mt-14 text-2xl font-semibold text-foreground">How I work</h2>
        </Reveal>
        <Reveal when="scroll" delay={180}>
          <ul className="mt-4 list-disc space-y-3 pl-5 text-sm text-muted-foreground">
            {howIWork.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Reveal>

        <Reveal when="scroll" delay={200} distance="sm">
          <div className="mt-14 rounded-xl border border-border bg-surface-muted/50 p-6 transition-shadow hover:shadow-md hover:shadow-primary/10 motion-safe:active:translate-y-px">
            <p className="text-sm font-medium text-foreground">Education & credentials</p>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
              <li>Computer Information Technology, Lethbridge Polytechnic (2023 to 2025)</li>
              <li>B.Sc. Electronics Engineering, Technological University of the Philippines Visayas (2005 to 2010)</li>
              <li>Dean&apos;s List, Lethbridge Polytechnic (2023 to 2025)</li>
              <li>Licensed Electronics Engineer (Philippines, 2011)</li>
              <li>Member, Association of Information Technology Professionals / CIPS</li>
            </ul>
          </div>
        </Reveal>

        <Reveal when="scroll" delay={220}>
          <p className="mt-10 text-center text-sm text-muted-foreground">
            Want specifics on a shipment?{" "}
            <Link
              to="/projects"
              className="motion-safe:active:brightness-[0.97] font-medium text-primary underline decoration-primary/30 underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            >
              Browse case studies
            </Link>{" "}
            or{" "}
            <Link
              to="/contact"
              className="motion-safe:active:brightness-[0.97] font-medium text-primary underline decoration-primary/30 underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            >
              reach out directly
            </Link>
            .
          </p>
        </Reveal>
      </div>
    </section>
  );
}
