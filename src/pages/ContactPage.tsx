import { useState } from "react";
import { ContactForm } from "@/components/ContactForm";
import { Reveal } from "@/components/Reveal";
import { site } from "@/config/site";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export function ContactPage() {
  useDocumentTitle("Contact · Karlo Val Pecha");

  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <section className="px-4 py-12 sm:px-6 sm:py-16" aria-labelledby="contact-heading">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal when="scroll" delay={0} distance="md">
          <div>
            <h1 id="contact-heading" className="font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Contact
            </h1>
            <p className="mt-3 text-lg text-muted-foreground">
              Prefer email? Reach me directly. The button below opens your mail client with a draft (no backend on this site).
            </p>
            <dl className="mt-8 space-y-4 text-sm">
              <div>
                <dt className="font-medium text-foreground">Email</dt>
                <dd className="mt-1 flex flex-wrap items-center gap-3">
                  <a
                    href={`mailto:${site.email}`}
                    className="break-all text-primary underline decoration-primary/30 underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                  >
                    {site.email}
                  </a>
                  <button
                    type="button"
                    onClick={() => void copyEmail()}
                    aria-label={copied ? "Email copied to clipboard" : "Copy email address to clipboard"}
                    className="motion-safe:active:translate-y-px inline-flex min-h-9 cursor-pointer shrink-0 items-center rounded-md border border-border bg-surface px-3 text-xs font-medium text-foreground motion-safe:transition-transform motion-safe:duration-150 transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                  >
                    {copied ? "Copied" : "Copy"}
                  </button>
                </dd>
              </div>
              <div>
                <dt className="font-medium text-foreground">Phone</dt>
                <dd className="mt-1 text-muted-foreground">{site.phone}</dd>
              </div>
              <div>
                <dt className="font-medium text-foreground">Location</dt>
                <dd className="mt-1 text-muted-foreground">{site.location}</dd>
              </div>
              <div>
                <dt className="font-medium text-foreground">Availability</dt>
                <dd className="mt-1 text-muted-foreground">{site.availabilityNote}</dd>
              </div>
            </dl>
          </div>
        </Reveal>
        <Reveal when="scroll" delay={110} distance="md">
          <div className="rounded-xl border border-border bg-surface p-6 shadow-sm transition-shadow hover:border-accent/35 hover:shadow-lg hover:shadow-primary/15 sm:p-8">
            <h2 className="font-heading text-lg font-semibold text-foreground">Project inquiry</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Share context in a few lines. I respond to hiring managers, tech leads, and founders within a business day when possible.
            </p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
