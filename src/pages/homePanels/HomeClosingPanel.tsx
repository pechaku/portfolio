import type { SVGProps } from "react";
import { Link } from "react-router-dom";
import { Reveal } from "@/components/Reveal";
import { site } from "@/config/site";

function GitHubIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"
      />
    </svg>
  );
}

function LinkedInIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function HomeClosingFooter() {
  return (
    <footer className="border-t border-border/80 pt-6 text-xs text-muted-foreground">
      <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
        <div className="text-balance">
          <p className="font-medium text-foreground">{site.name}</p>
          <p className="mt-1">
            <a
              href={`mailto:${site.email}`}
              className="text-primary underline decoration-primary/35 underline-offset-4 transition-colors hover:decoration-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            >
              {site.email}
            </a>
            <span className="mx-2 text-border">·</span>
            {site.phone}
          </p>
        </div>
        <div className="flex shrink-0 items-center justify-center gap-4 sm:justify-end">
          {site.githubUrl ? (
            <a
              href={site.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 min-w-11 cursor-pointer items-center justify-center rounded-md text-foreground transition-[transform,color] duration-200 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 motion-safe:hover:scale-105"
              aria-label="GitHub profile"
            >
              <GitHubIcon className="h-5 w-5" />
            </a>
          ) : null}
          {site.linkedinUrl ? (
            <a
              href={site.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 min-w-11 cursor-pointer items-center justify-center rounded-md text-foreground transition-[transform,color] duration-200 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 motion-safe:hover:scale-105"
              aria-label="LinkedIn profile"
            >
              <LinkedInIcon className="h-5 w-5" />
            </a>
          ) : null}
        </div>
      </div>
      <p className="mt-6 text-center text-[0.65rem] leading-relaxed text-muted-foreground sm:text-left">
        © {new Date().getFullYear()} {site.name}. Built with React, TypeScript, and Tailwind CSS.
      </p>
    </footer>
  );
}

export default function HomeClosingPanel() {
  return (
    <div className="flex min-h-0 flex-1 flex-col justify-center px-6 py-10 sm:px-8 sm:py-14">
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center">
        <h2 id="closing-heading" className="sr-only">
          Get in touch
        </h2>
        <Reveal when="scroll" delay={40} distance="sm" className="w-full">
          <div className="rounded-xl border border-dashed border-border bg-surface-muted/40 p-6 text-center sm:p-8">
            <p className="text-sm font-medium text-foreground">Need a sprint-ready engineer?</p>
            <p className="mx-auto mt-2 max-w-md text-balance text-sm text-muted-foreground">
              Send constraints, stack, and timeline. I&apos;ll reply with how I&apos;d tackle the build.
            </p>
            <Link
              to="/contact"
              className="motion-safe:active:translate-y-px mt-5 inline-flex min-h-11 cursor-pointer items-center justify-center rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors duration-200 hover:bg-primary/90 motion-safe:transition-transform motion-safe:duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            >
              Start a conversation
            </Link>
          </div>
        </Reveal>
        <Reveal when="scroll" delay={100} distance="sm" className="mt-10 w-full">
          <div className="text-center sm:text-left">
            <HomeClosingFooter />
          </div>
        </Reveal>
      </div>
    </div>
  );
}
