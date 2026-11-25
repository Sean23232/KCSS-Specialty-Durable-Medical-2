import type { ReactNode } from "react";
import { ArrowRight, Compass, HeartHandshake, Mail, MessageSquare, Phone } from "lucide-react";
import { Link } from "../lib/router";
import { business } from "../data/site";
import { specialties, type Specialty } from "../data/catalog";
import { Breadcrumbs, Button, Container, Eyebrow, Img, Reveal, SectionHeading } from "./ui";
import { cn } from "../utils/cn";

/* ------------------------------------------------------------------
   Navy page hero used on inner pages
------------------------------------------------------------------- */
export function PageHero({
  eyebrow,
  title,
  children,
  crumbs,
  extraPadding,
}: {
  eyebrow: string;
  title: ReactNode;
  children?: ReactNode;
  crumbs: { label: string; to?: string }[];
  extraPadding?: boolean;
}) {
  return (
    <section className="relative overflow-hidden bg-navy text-white">
      <div aria-hidden className="pointer-events-none absolute -right-44 -top-56 h-[620px] w-[620px] rounded-full border border-gold/30" />
      <div aria-hidden className="pointer-events-none absolute -right-20 -top-72 h-[620px] w-[620px] rounded-full border border-white/10" />
      <Container className={cn("relative pt-10 lg:pt-14", extraPadding ? "pb-32 lg:pb-40" : "pb-16 lg:pb-24")}>
        <Breadcrumbs tone="light" items={crumbs} />
        <div className="mt-10 max-w-3xl lg:mt-14">
          <Eyebrow tone="light">{eyebrow}</Eyebrow>
          <h1 className="mt-6 font-display text-[40px] font-extrabold leading-[1.04] tracking-[-0.032em] sm:text-[54px] lg:text-[66px]">
            {title}
          </h1>
          {children && <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-white/70 sm:text-[19px]">{children}</p>}
        </div>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------
   Final call-to-action band
------------------------------------------------------------------- */
export function CtaBand({
  eyebrow = "Talk with KCSS",
  title,
  text = "Connect with the KCSS team for assistance with specialty medical products and services.",
}: {
  eyebrow?: string;
  title?: ReactNode;
  text?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-navy text-white">
      <div aria-hidden className="absolute inset-x-0 top-0 h-[3px] bg-gold" />
      <div aria-hidden className="pointer-events-none absolute -bottom-72 -right-40 h-[640px] w-[640px] rounded-full border border-gold/35" />
      <div aria-hidden className="pointer-events-none absolute -bottom-96 -right-10 h-[640px] w-[640px] rounded-full border border-white/10" />
      <Container className="relative grid items-end gap-12 py-20 lg:grid-cols-12 lg:gap-10 lg:py-28">
        <Reveal className="lg:col-span-8">
          <Eyebrow tone="light">{eyebrow}</Eyebrow>
          <h2 className="mt-6 font-display text-[38px] font-extrabold leading-[1.04] tracking-[-0.032em] sm:text-[52px] lg:text-[64px]">
            {title ?? (
              <>
                Let's Find the Right <span className="text-gold">Specialty Medical</span> Solutions.
              </>
            )}
          </h2>
          <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-white/70 sm:text-[19px]">{text}</p>
        </Reveal>

        <Reveal delay={120} className="lg:col-span-4">
          <div className="grid gap-3">
            <Button
              href={business.phoneHref}
              variant="goldOnDark"
              size="lg"
              className="w-full justify-between"
              icon={<Phone className="h-4 w-4" aria-hidden />}
              arrow
            >
              Call KCSS · {business.phone}
            </Button>
            <Button to="/contact" variant="light" size="lg" className="w-full justify-between" arrow>
              Contact Us
            </Button>
          </div>
          <a
            href={business.emailHref}
            className="mt-6 inline-flex items-center gap-2.5 text-[14px] text-white/60 transition-colors hover:text-gold"
          >
            <Mail className="h-4 w-4" aria-hidden /> {business.email}
          </a>
        </Reveal>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------
   Customer journey — three steps
------------------------------------------------------------------- */
const steps = [
  { n: "01", title: "Explore", text: "Discover specialty products and available categories.", icon: Compass },
  { n: "02", title: "Connect", text: "Contact the KCSS team about your needs.", icon: MessageSquare },
  {
    n: "03",
    title: "Get Assistance",
    text: "Discuss product information and appropriate next steps with the team.",
    icon: HeartHandshake,
  },
];

export function Journey({ tone = "soft" }: { tone?: "soft" | "white" }) {
  return (
    <section className={tone === "soft" ? "bg-soft" : "bg-white"}>
      <Container className="py-20 lg:py-28">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <Reveal>
            <SectionHeading eyebrow="How it works" title="Three simple steps, at your pace.">
              No accounts, no checkout, no pressure — just a clear path from browsing to a helpful conversation.
            </SectionHeading>
          </Reveal>
          <Reveal delay={100}>
            <Button to="/shop" variant="outline" arrow>
              Start exploring
            </Button>
          </Reveal>
        </div>

        <ol className="relative mt-14 grid gap-6 lg:mt-20 lg:grid-cols-3 lg:gap-0">
          <span aria-hidden className="absolute left-0 right-0 top-7 hidden h-px bg-navy/15 lg:block" />
          {steps.map((s, i) => (
            <li key={s.n} className="relative">
              <Reveal delay={i * 120}>
                <div className={cn("relative lg:pr-12", i > 0 && "lg:pl-0")}>
                  <span className="relative z-10 grid h-14 w-14 place-items-center rounded-full bg-navy text-white ring-8 ring-soft">
                    <s.icon className="h-5 w-5 text-gold" aria-hidden />
                  </span>
                  <div className="mt-8 flex items-baseline gap-4">
                    <span className="font-display text-[15px] font-extrabold tracking-[0.08em] text-navy/35">{s.n}</span>
                    <h3 className="font-display text-[28px] font-extrabold tracking-[-0.025em] text-navy">{s.title}</h3>
                  </div>
                  <p className="mt-3 max-w-xs text-[16px] leading-relaxed text-muted">{s.text}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------
   Specialty category card (image-led)
------------------------------------------------------------------- */
export function SpecialtyCard({ s, compact }: { s: Specialty; compact?: boolean }) {
  return (
    <Link to={`/specialties/${s.slug}`} className="group flex h-full flex-col">
      <div className={cn("relative overflow-hidden rounded-md bg-sand", compact ? "aspect-[4/3]" : "aspect-square")}>
        <Img
          src={s.cardImage}
          alt={s.cardTitle}
          className="h-full w-full object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-[1.06]"
        />
        <span className="absolute left-4 top-4 rounded-[3px] bg-white/95 px-2.5 py-1.5 font-display text-[12px] font-extrabold leading-none tracking-[0.08em] text-navy shadow-sm">
          {s.index}
        </span>
        <span
          aria-hidden
          className="absolute bottom-4 right-4 grid h-11 w-11 translate-y-2 place-items-center rounded-full bg-gold text-navy opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100"
        >
          <ArrowRight className="h-4.5 w-4.5" />
        </span>
      </div>
      <div className="flex flex-1 flex-col pt-6">
        <h3 className="font-display text-[22px] font-extrabold leading-tight tracking-[-0.02em] text-navy">{s.cardTitle}</h3>
        <p className="mt-2.5 text-[15px] leading-relaxed text-muted">{s.cardText}</p>
        <span className="mt-5 inline-flex items-center gap-2 text-[14px] font-semibold text-navy">
          <span className="link-line pb-0.5">Explore Category</span>
          <ArrowRight className="h-4 w-4 text-gold-600 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
        </span>
        <span aria-hidden className="mt-6 block h-px w-full bg-line">
          <span className="block h-px w-0 bg-gold transition-all duration-700 group-hover:w-full" />
        </span>
      </div>
    </Link>
  );
}

export function SpecialtyGrid({ exclude }: { exclude?: string }) {
  const list = specialties.filter((s) => s.slug !== exclude);
  return (
    <div className={cn("grid gap-x-6 gap-y-12 sm:grid-cols-2", list.length === 4 ? "xl:grid-cols-4" : "lg:grid-cols-3")}>
      {list.map((s, i) => (
        <Reveal key={s.slug} delay={i * 90} className="h-full">
          <SpecialtyCard s={s} compact={list.length !== 4} />
        </Reveal>
      ))}
    </div>
  );
}
