import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import {
  Menu,
  X,
  ArrowRight,
  Sparkles,
  Workflow,
  Shield,
  Building2,
  GraduationCap,
  HeartPulse,
} from "lucide-react";
import { motion, useScroll, useTransform, useInView, useReducedMotion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { ThemeToggle } from "@/components/theme-toggle";

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
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 lg:px-10">
        <a href="#top" className="flex items-center gap-2.5 text-lg font-medium tracking-tight">
          <span className="pulse-dot inline-block h-2.5 w-2.5 rounded-full bg-primary" />
          <span className="font-display">ZeroUI</span>
        </a>

        <nav className="hidden items-center gap-10 md:flex">
          {NAV.map((item) => (
            <button
              key={item.href}
              onClick={() => handleClick(item.href)}
              className="link-underline text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />
          <Button onClick={() => handleClick("#contact")} className="group rounded-full px-5">
            Get in touch
            <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Button>
        </div>

        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md text-foreground"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <AnimatePresence mode="wait" initial={false}>
              {open ? (
                <motion.span
                  key="x"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="h-5 w-5" />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="h-5 w-5" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden border-t border-border/60 bg-background md:hidden"
          >
            <div className="mx-auto flex max-w-6xl flex-col px-6 py-4">
              {NAV.map((item, i) => (
                <motion.button
                  key={item.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                  onClick={() => handleClick(item.href)}
                  className="border-b border-border/40 py-4 text-left text-base text-foreground last:border-0"
                >
                  {item.label}
                </motion.button>
              ))}
              <Button onClick={() => handleClick("#contact")} className="mt-4 rounded-full">
                Get in touch
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  const words = ["ship.", "deploy.", "merge.", "ship."];
  const [wordIdx, setWordIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setWordIdx((i) => (i + 1) % (words.length - 1)), 2400);
    return () => clearInterval(t);
  }, []);

  return (
    <section
      id="top"
      ref={ref}
      onMouseMove={onMove}
      className="spotlight relative overflow-hidden"
    >
      <div className="aurora" aria-hidden />

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 mx-auto max-w-6xl px-6 pb-24 pt-20 lg:px-10 lg:pb-40 lg:pt-32"
      >
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 flex items-center gap-3 text-sm uppercase tracking-[0.2em] text-muted-foreground"
        >
          <span className="inline-block h-px w-8 bg-muted-foreground/50" />
          Developer-first AI governance
        </motion.p>

        <h1 className="font-display text-5xl leading-[1.05] tracking-tight text-foreground sm:text-6xl lg:text-7xl xl:text-8xl">
          <span className="reveal-line">
            <motion.span
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
              className="block"
            >
              Stop risky changes
            </motion.span>
          </span>
          <br />
          <span className="reveal-line italic">
            <motion.span
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.4, 0, 0.2, 1] }}
              className="gradient-text block"
            >
              before they{" "}
              <AnimatePresence mode="wait">
                <motion.span
                  key={words[wordIdx]}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="inline-block"
                >
                  {words[wordIdx]}
                </motion.span>
              </AnimatePresence>
            </motion.span>
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-10 max-w-2xl text-lg leading-relaxed text-muted-foreground lg:text-xl"
        >
          ZeroUI is a developer-native governance layer that prevents unsafe human and
          AI-generated changes from escaping your IDE, CI, or release pipeline. Built for
          speed, without compromising control.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="mt-12 flex flex-col gap-3 sm:flex-row"
        >
          <MagneticButton onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}>
            <Button size="lg" className="group rounded-full px-7">
              Get started
              <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </MagneticButton>
          <Button
            size="lg"
            variant="ghost"
            className="rounded-full px-7"
            onClick={() => document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" })}
          >
            Explore product
          </Button>
        </motion.div>

        {/* Live status badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-16 inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-3 py-1.5 text-xs text-muted-foreground backdrop-blur"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
          </span>
          Now booking Q3 engagements
        </motion.div>
      </motion.div>

      <Marquee />
    </section>
  );
}

function MagneticButton({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    ref.current.style.transform = `translate(${x * 0.2}px, ${y * 0.3}px)`;
  };
  const handleLeave = () => {
    if (ref.current) ref.current.style.transform = "translate(0,0)";
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onClick={onClick}
      className="inline-block transition-transform duration-300 ease-out"
    >
      {children}
    </div>
  );
}

const LOGOS = ["NORTHWAVE", "ATLAS&CO", "LUMEN", "FIELDNOTE", "PARALLAX", "MERIDIAN", "OUTPOST"];

function Marquee() {
  return (
    <div className="relative z-10 border-y border-border/50 bg-background/40 py-6 backdrop-blur">
      <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
        <div className="marquee-track flex w-max gap-16 whitespace-nowrap pr-16">
          {[...LOGOS, ...LOGOS].map((l, i) => (
            <span
              key={i}
              className="font-display text-lg tracking-[0.18em] text-muted-foreground/70"
            >
              {l}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

const SERVICES = [
  {
    icon: Shield,
    title: "Prevent Unsafe Releases",
    body: "ZeroUI stops risky human and AI-generated changes before they escape the IDE, CI, or release path—shifting control from reactive detection to proactive prevention.",
  },
  {
    icon: Workflow,
    title: "Enforce Governance, Natively",
    body: "Apply consistent policies directly within developer workflows. ZeroUI brings control into the IDE, CI, and release systems—without slowing teams down.",
  },
  {
    icon: Sparkles,
    title: "Prove Every Decision",
    body: "Every change is verified and recorded with clear evidence—what was checked, blocked, or approved—creating full traceability, auditability, and trust.",
  },
];

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.4, 0, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}

function Services() {
  return (
    <section id="services" className="border-t border-border/60">
      <div className="mx-auto max-w-6xl px-6 py-24 lg:px-10 lg:py-32">
        <div className="grid gap-16 lg:grid-cols-[1fr_2fr] lg:gap-24">
          <Reveal>
            <div>
              <p className="mb-4 text-sm uppercase tracking-[0.2em] text-muted-foreground">Product</p>
              <h2 className="font-display text-4xl leading-tight tracking-tight lg:text-5xl">
                What it does
              </h2>
            </div>
          </Reveal>
          <div className="grid gap-12 sm:grid-cols-1 lg:grid-cols-1">
            {SERVICES.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.08}>
                <motion.div
                  whileHover={{ x: 4 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  className="group relative border-t border-border pt-8"
                >
                  <motion.div
                    whileHover={{ rotate: -8, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="mb-6 inline-flex"
                  >
                    <s.icon className="h-6 w-6 text-primary" strokeWidth={1.5} />
                  </motion.div>
                  <h3 className="font-display text-2xl transition-colors group-hover:text-primary">
                    {s.title}
                  </h3>
                  <p className="mt-3 max-w-xl leading-relaxed text-muted-foreground">{s.body}</p>
                  <span className="absolute left-0 top-0 h-px w-0 bg-primary transition-all duration-500 group-hover:w-16" />
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const STEPS = [
  { n: "01", title: "Observe", body: "Every code, config, and AI-generated change is captured at the source—before it moves through the delivery pipeline." },
  { n: "02", title: "Verify", body: "Each change is evaluated against policy, safety rules, and delivery requirements—establishing trust before progress." },
  { n: "03", title: "Enforce", body: "Unsafe changes are blocked before they reach production, while safe changes move forward with full traceability." },
];

function HowItWorks() {
  return (
    <section id="how" className="relative border-t border-border/60 bg-accent/40">
      <div className="mx-auto max-w-6xl px-6 py-24 lg:px-10 lg:py-32">
        <Reveal>
          <p className="mb-4 text-sm uppercase tracking-[0.2em] text-muted-foreground">How it works</p>
          <h2 className="mb-16 max-w-2xl font-display text-4xl leading-tight tracking-tight lg:text-5xl">
            Three steps to control every change.
          </h2>
        </Reveal>
        <div className="relative grid gap-12 md:grid-cols-3 md:gap-10">
          {/* Connecting line */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute left-0 right-0 top-8 hidden h-px origin-left bg-gradient-to-r from-primary/60 via-primary/30 to-transparent md:block"
          />
          {STEPS.map((step, i) => (
            <Reveal key={step.n} delay={i * 0.15}>
              <div className="group relative">
                <motion.div
                  whileHover={{ scale: 1.05, rotate: -2 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="font-display text-5xl text-primary lg:text-6xl"
                >
                  {step.n}
                </motion.div>
                <h3 className="mt-6 font-display text-2xl">{step.title}</h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">{step.body}</p>
              </div>
            </Reveal>
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
        <Reveal>
          <p className="mb-4 text-sm uppercase tracking-[0.2em] text-muted-foreground">Use cases</p>
          <h2 className="mb-16 max-w-2xl font-display text-4xl leading-tight tracking-tight lg:text-5xl">
            Built for the work that matters.
          </h2>
        </Reveal>
        <div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-3">
          {USE_CASES.map((u, i) => (
            <Reveal key={u.tag} delay={i * 0.1}>
              <motion.article
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 200, damping: 22 }}
                className="group relative flex h-full flex-col gap-6 overflow-hidden bg-background p-8 lg:p-10"
              >
                <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/0 to-primary/0 opacity-0 transition-opacity duration-500 group-hover:from-primary/5 group-hover:to-transparent group-hover:opacity-100" />
                <motion.div
                  whileHover={{ rotate: 8, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <u.icon className="h-7 w-7 text-primary" strokeWidth={1.5} />
                </motion.div>
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{u.tag}</p>
                  <h3 className="mt-3 font-display text-2xl leading-snug">{u.title}</h3>
                </div>
                <p className="leading-relaxed text-muted-foreground">{u.body}</p>
                <div className="mt-auto flex items-center gap-2 text-sm text-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  Learn more <ArrowRight className="h-4 w-4" />
                </div>
              </motion.article>
            </Reveal>
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
          <Reveal>
            <div>
              <p className="mb-4 text-sm uppercase tracking-[0.2em] text-muted-foreground">Contact</p>
              <h2 className="font-display text-4xl leading-tight tracking-tight lg:text-5xl">
                Let's build something useful.
              </h2>
              <p className="mt-6 max-w-md leading-relaxed text-muted-foreground">
                Tell us a little about your team and what you're trying to solve. We'll reply
                within one business day.
              </p>
              <div className="mt-10 space-y-2 text-sm">
                <p className="text-muted-foreground">hello@zeroui.com</p>
                <p className="text-muted-foreground">San Francisco · Remote</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <form onSubmit={onSubmit} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-2 block text-sm font-medium">Name</label>
                  <Input id="name" name="name" required className="h-12 rounded-lg bg-background transition-shadow focus-visible:shadow-[0_0_0_4px_color-mix(in_oklab,var(--primary)_15%,transparent)]" />
                </div>
                <div>
                  <label htmlFor="company" className="mb-2 block text-sm font-medium">Company</label>
                  <Input id="company" name="company" className="h-12 rounded-lg bg-background transition-shadow focus-visible:shadow-[0_0_0_4px_color-mix(in_oklab,var(--primary)_15%,transparent)]" />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium">Email</label>
                <Input id="email" name="email" type="email" required className="h-12 rounded-lg bg-background transition-shadow focus-visible:shadow-[0_0_0_4px_color-mix(in_oklab,var(--primary)_15%,transparent)]" />
              </div>
              <div>
                <label htmlFor="message" className="mb-2 block text-sm font-medium">How can we help?</label>
                <Textarea id="message" name="message" required rows={5} className="rounded-lg bg-background transition-shadow focus-visible:shadow-[0_0_0_4px_color-mix(in_oklab,var(--primary)_15%,transparent)]" />
              </div>
              <MagneticButton>
                <Button type="submit" size="lg" disabled={submitting} className="group rounded-full px-7">
                  {submitting ? "Sending…" : "Send message"}
                  {!submitting && <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />}
                </Button>
              </MagneticButton>
            </form>
          </Reveal>
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
          <span className="pulse-dot inline-block h-2 w-2 rounded-full bg-primary" />
          <span className="font-display text-base">ZeroUI</span>
          <span className="ml-3 text-muted-foreground">© {new Date().getFullYear()}</span>
        </div>
        <nav className="flex flex-wrap gap-x-8 gap-y-2 text-sm text-muted-foreground">
          <a href="#services" className="link-underline hover:text-foreground">Services</a>
          <a href="#how" className="link-underline hover:text-foreground">How it works</a>
          <a href="#use-cases" className="link-underline hover:text-foreground">Use cases</a>
          <a href="#contact" className="link-underline hover:text-foreground">Contact</a>
        </nav>
      </div>
    </footer>
  );
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      style={{ scaleX: scrollYProgress }}
      className="fixed left-0 right-0 top-0 z-[60] h-0.5 origin-left bg-primary"
    />
  );
}

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <ScrollProgress />
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
