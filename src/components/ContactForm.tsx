import { useEffect, useId, useState, type FormEvent } from "react";
import { site } from "@/config/site";

export function ContactForm() {
  const nameId = useId();
  const emailId = useId();
  const messageId = useId();
  const honeypotId = useId();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [info, setInfo] = useState<string | null>(null);

  useEffect(() => {
    if (!info) return;
    const t = window.setTimeout(() => setInfo(null), 8000);
    return () => window.clearTimeout(t);
  }, [info]);

  function validate() {
    const next: typeof errors = {};
    if (!name.trim()) next.name = "Add your name.";
    if (!email.trim()) next.email = "Add a valid email.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "Email looks invalid.";
    if (!message.trim()) next.message = "Add a short message.";
    else if (message.trim().length < 10) next.message = "A bit more detail helps (10+ characters).";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setInfo(null);
    if (honeypot) return;
    if (!validate()) return;

    const subject = encodeURIComponent(`Portfolio inquiry from ${name.trim()}`);
    const body = encodeURIComponent(`${message.trim()}\n\n${name.trim()} (${email.trim()})`);
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
    setInfo(
      "If your mail app did not open, copy the email address below or retry from a desktop browser.",
    );
  }

  return (
    <form onSubmit={onSubmit} className="relative space-y-6" noValidate>
      {/* Honeypot: hidden from interactive tab order */}
      <div className="absolute left-[-9999px] top-auto h-0 w-0 overflow-hidden" aria-hidden>
        <label htmlFor={honeypotId}>Company website</label>
        <input
          id={honeypotId}
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor={nameId} className="block text-sm font-medium text-foreground">
          Name
        </label>
        <input
          id={nameId}
          name="name"
          autoComplete="name"
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? `${nameId}-err` : undefined}
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-2 block w-full min-h-11 rounded-md border border-border bg-surface px-3 py-2 text-base text-foreground outline-none ring-ring transition-colors focus:border-accent focus:ring-2 focus:ring-accent/35"
        />
        {errors.name ? (
          <p id={`${nameId}-err`} className="mt-2 text-sm text-destructive" role="alert">
            {errors.name}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor={emailId} className="block text-sm font-medium text-foreground">
          Email
        </label>
        <input
          id={emailId}
          name="email"
          type="email"
          autoComplete="email"
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? `${emailId}-err` : undefined}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-2 block w-full min-h-11 rounded-md border border-border bg-surface px-3 py-2 text-base text-foreground outline-none ring-ring transition-colors focus:border-accent focus:ring-2 focus:ring-accent/35"
        />
        {errors.email ? (
          <p id={`${emailId}-err`} className="mt-2 text-sm text-destructive" role="alert">
            {errors.email}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor={messageId} className="block text-sm font-medium text-foreground">
          Message
        </label>
        <textarea
          id={messageId}
          name="message"
          rows={5}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? `${messageId}-err` : undefined}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="mt-2 block w-full rounded-md border border-border bg-surface px-3 py-2 text-base text-foreground outline-none ring-ring transition-colors focus:border-accent focus:ring-2 focus:ring-accent/35"
        />
        {errors.message ? (
          <p id={`${messageId}-err`} className="mt-2 text-sm text-destructive" role="alert">
            {errors.message}
          </p>
        ) : null}
      </div>

      <button
        type="submit"
        className="inline-flex min-h-11 cursor-pointer items-center justify-center rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors duration-200 hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
      >
        Open email draft
      </button>

      {info ? (
        <p className="text-sm text-success" role="status">
          {info}
        </p>
      ) : null}
    </form>
  );
}
