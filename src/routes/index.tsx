import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, ArrowRight, Sparkles, Workflow, Shield, Building2, GraduationCap, HeartPulse } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export const Route = createFileRoute("/")({
  component: Index,
});

const NAV = [
  { label: "Services", href: "#services" },
  { label: "How it works", href: "#how" },
  { label: "Use cases", href: "#use-cases" },
  { label: "Contact", href: "#contact" },
];

function Nav() {
  const [open, setOpen] = useState(false);

  const handleClick = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 lg:px-10">
        <a href="#top" className="flex items-center gap-2 text-lg font-medium tracking-tight">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-primary" />
          <span className="font-display">ZeroUI</span>
        </a>

        <nav className="hidden items-center gap-10 md:flex">
          {NAV.map((item) => (
            <button
              key={item.href}
              onClick={() => handleClick(item.href)}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button onClick={() => handleClick("#contact")} className="rounded-full px-5">
            Get in touch
          </Button>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-md text-foreground md:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border/60 bg-background md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col px-6 py-4">
            {NAV.map((item) => (
              <button
                key={item.href}
                onClick={() => handleClick(item.href)}
                className="border-b border-border/40 py-4 text-left text-base text-foreground last:border-0"
              >
                {item.label}
              </button>
            ))}
            <Button onClick={() => handleClick("#contact")} className="mt-4 rounded-full">
              Get in touch
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="mx-auto max-w-6xl px-6 pb-24 pt-20 lg:px-10 lg:pb-40 lg:pt-32">
        <p className="mb-8 text-sm uppercase tracking-[0.2em] text-muted-foreground">
          Applied AI, built for business
        </p>
        <h1 className="font-display text-5xl leading-[1.05] tracking-tight text-foreground sm:text-6xl lg:text-7xl xl:text-8xl">
          AI solutions for<br />
          <span className="italic text-primary">modern businesses</span>
        </h1>
        <p className="mt-10 max-w-2xl text-lg leading-relaxed text-muted-foreground lg:text-xl">
          We help teams move faster with practical AI — from automating routine work to surfacing insights buried in your data. Thoughtful, measurable, deployed in weeks not quarters.
        </p>
        <div className="mt-12 flex flex-col gap-3 sm:flex-row">
          <Button size="lg" className="rounded-full px-7" onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}>
            Start a project <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
          <Button size="lg" variant="ghost" className="rounded-full px-7" onClick={() => document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" })}>
            Explore services
          </Button>
        </div>
      </div>
    </section>
  );
}

const SERVICES = [
  {
    icon: Sparkles,
    title: "AI Strategy",
    body: "Identify the highest-leverage opportunities for AI in your organization, with a clear roadmap and measurable outcomes.",
  },
  {
    icon: Workflow,
    title: "Custom Solutions",
    body: "Bespoke AI applications — assistants, agents, document pipelines — built around your workflows and data.",
  },
  {
    icon: Shield,
    title: "Safe Deployment",
    body: "Production-grade systems with evaluation, monitoring, and guardrails so AI works reliably at scale.",
  },
];

function Services() {
  return (
    <section id="services" className="border-t border-border/60">
      <div className="mx-auto max-w-6xl px-6 py-24 lg:px-10 lg:py-32">
        <div className="grid gap-16 lg:grid-cols-[1fr_2fr] lg:gap-24">
          <div>
            <p className="mb-4 text-sm uppercase tracking-[0.2em] text-muted-foreground">Services</p>
            <h2 className="font-display text-4xl leading-tight tracking-tight lg:text-5xl">
              What we do
            </h2>
          </div>
          <div className="grid gap-12 sm:grid-cols-1 lg:grid-cols-1">
            {SERVICES.map((s) => (
              <div key={s.title} className="border-t border-border pt-8">
                <s.icon className="mb-6 h-6 w-6 text-primary" strokeWidth={1.5} />
                <h3 className="font-display text-2xl">{s.title}</h3>
                <p className="mt-3 max-w-xl leading-relaxed text-muted-foreground">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const STEPS = [
  { n: "01", title: "Discover", body: "We map your workflows, data, and goals to find where AI delivers real value." },
  { n: "02", title: "Build", body: "We design and ship a focused solution, integrated with your existing systems." },
  { n: "03", title: "Scale", body: "We measure, refine, and expand — turning early wins into lasting capability." },
];

function HowItWorks() {
  return (
    <section id="how" className="border-t border-border/60 bg-accent/40">
      <div className="mx-auto max-w-6xl px-6 py-24 lg:px-10 lg:py-32">
        <p className="mb-4 text-sm uppercase tracking-[0.2em] text-muted-foreground">How it works</p>
        <h2 className="mb-16 max-w-2xl font-display text-4xl leading-tight tracking-tight lg:text-5xl">
          Three simple steps from idea to impact.
        </h2>
        <div className="grid gap-12 md:grid-cols-3 md:gap-10">
          {STEPS.map((step) => (
            <div key={step.n}>
              <div className="font-display text-5xl text-primary lg:text-6xl">{step.n}</div>
              <h3 className="mt-6 font-display text-2xl">{step.title}</h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">{step.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const USE_CASES = [
  {
    icon: Building2,
    tag: "Business",
    title: "Operations that run themselves",
    body: "Automate document processing, customer support triage, and reporting so teams focus on judgment, not busywork.",
  },
  {
    icon: GraduationCap,
    tag: "Education",
    title: "Personalized at every level",
    body: "Adaptive tutoring, content generation, and assessment tools that scale individual attention to every learner.",
  },
  {
    icon: HeartPulse,
    tag: "Healthcare",
    title: "More time with patients",
    body: "Clinical documentation, intake, and decision support that reduce admin load while keeping clinicians in control.",
  },
];

function UseCases() {
  return (
    <section id="use-cases" className="border-t border-border/60">
      <div className="mx-auto max-w-6xl px-6 py-24 lg:px-10 lg:py-32">
        <p className="mb-4 text-sm uppercase tracking-[0.2em] text-muted-foreground">Use cases</p>
        <h2 className="mb-16 max-w-2xl font-display text-4xl leading-tight tracking-tight lg:text-5xl">
          Built for the work that matters.
        </h2>
        <div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-3">
          {USE_CASES.map((u) => (
            <article key={u.tag} className="flex flex-col gap-6 bg-background p-8 lg:p-10">
              <u.icon className="h-7 w-7 text-primary" strokeWidth={1.5} />
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{u.tag}</p>
                <h3 className="mt-3 font-display text-2xl leading-snug">{u.title}</h3>
              </div>
              <p className="leading-relaxed text-muted-foreground">{u.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      (e.target as HTMLFormElement).reset();
      toast.success("Thanks — we'll be in touch within a day.");
    }, 700);
  };

  return (
    <section id="contact" className="border-t border-border/60 bg-accent/40">
      <div className="mx-auto max-w-6xl px-6 py-24 lg:px-10 lg:py-32">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          <div>
            <p className="mb-4 text-sm uppercase tracking-[0.2em] text-muted-foreground">Contact</p>
            <h2 className="font-display text-4xl leading-tight tracking-tight lg:text-5xl">
              Let's build something useful.
            </h2>
            <p className="mt-6 max-w-md leading-relaxed text-muted-foreground">
              Tell us a little about your team and what you're trying to solve. We'll reply within one business day.
            </p>
            <div className="mt-10 space-y-2 text-sm">
              <p className="text-muted-foreground">hello@zeroui.com</p>
              <p className="text-muted-foreground">San Francisco · Remote</p>
            </div>
          </div>

          <form onSubmit={onSubmit} className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-medium">Name</label>
                <Input id="name" name="name" required className="h-12 rounded-lg bg-background" />
              </div>
              <div>
                <label htmlFor="company" className="mb-2 block text-sm font-medium">Company</label>
                <Input id="company" name="company" className="h-12 rounded-lg bg-background" />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium">Email</label>
              <Input id="email" name="email" type="email" required className="h-12 rounded-lg bg-background" />
            </div>
            <div>
              <label htmlFor="message" className="mb-2 block text-sm font-medium">How can we help?</label>
              <Textarea id="message" name="message" required rows={5} className="rounded-lg bg-background" />
            </div>
            <Button type="submit" size="lg" disabled={submitting} className="rounded-full px-7">
              {submitting ? "Sending…" : "Send message"}
              {!submitting && <ArrowRight className="ml-1 h-4 w-4" />}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-12 lg:flex-row lg:items-center lg:justify-between lg:px-10">
        <div className="flex items-center gap-2 text-sm">
          <span className="inline-block h-2 w-2 rounded-full bg-primary" />
          <span className="font-display text-base">ZeroUI</span>
          <span className="ml-3 text-muted-foreground">© {new Date().getFullYear()}</span>
        </div>
        <nav className="flex flex-wrap gap-x-8 gap-y-2 text-sm text-muted-foreground">
          <a href="#services" className="hover:text-foreground">Services</a>
          <a href="#how" className="hover:text-foreground">How it works</a>
          <a href="#use-cases" className="hover:text-foreground">Use cases</a>
          <a href="#contact" className="hover:text-foreground">Contact</a>
        </nav>
      </div>
    </footer>
  );
}

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <main>
        <Hero />
        <Services />
        <HowItWorks />
        <UseCases />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
