import { ArrowRight, Check, Footprints, HeartHandshake, Info, Layers, MapPin, Users } from "lucide-react";
import { business } from "../data/site";
import { homeFeatured } from "../data/catalog";
import { img } from "../data/images";
import { Button, Container, Eyebrow, Img, PortraitPlaceholder, Reveal, SectionHeading } from "../components/ui";
import { ProductGrid } from "../components/Product";
import { CtaBand, Journey, SpecialtyGrid } from "../components/sections";

/* Shared "formerly → today" identity block (also used on the About page) */
export function NameTransition() {
  return (
    <div className="grid items-stretch gap-3 sm:grid-cols-[1fr_auto_1fr]">
      <div className="rounded-md border border-line bg-white p-5 sm:p-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">Formerly</p>
        <p className="mt-2 font-display text-[22px] font-extrabold leading-tight tracking-[-0.02em] text-navy">
          {business.former}
        </p>
      </div>
      <div className="hidden place-items-center px-1 sm:grid" aria-hidden>
        <span className="grid h-10 w-10 place-items-center rounded-full bg-gold text-navy">
          <ArrowRight className="h-4 w-4" />
        </span>
      </div>
      <div className="rounded-md bg-navy p-5 text-white sm:p-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-gold">Today</p>
        <p className="mt-2 font-display text-[22px] font-extrabold leading-tight tracking-[-0.02em]">
          KCSS Specialty Durable Medical
        </p>
      </div>
    </div>
  );
}

const reasons = [
  {
    icon: Layers,
    title: "Specialty-focused selection",
    text: "A product range centered on diabetic footwear and supplies, functional orthotics and lymphedema compression.",
  },
  {
    icon: HeartHandshake,
    title: "Personalized assistance",
    text: "Real conversations with a team that listens first, then helps you understand your options.",
  },
  {
    icon: Footprints,
    title: "Orthotic expertise",
    text: "Functional orthotics are a core KCSS specialty — given the attention to detail the category deserves.",
  },
  {
    icon: Users,
    title: "Customer-centered service",
    text: "From your first question to your next step, the focus stays on you and what you need.",
  },
];

export default function Home() {
  return (
    <>
      {/* A — Hero */}
      <section className="relative overflow-hidden bg-soft">
        <Container className="grid items-center gap-12 pb-24 pt-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 lg:pb-28 lg:pt-14">
          <div className="page-enter">
            <Eyebrow>Formerly {business.former} · Shawnee, Kansas</Eyebrow>
            <h1 className="mt-7 font-display text-[38px] font-extrabold leading-[1.04] tracking-[-0.035em] text-navy sm:text-[56px] lg:text-[52px] xl:text-[64px]">
              <span className="block">Specialty Medical Products.</span>{" "}
              <span className="block">
                <span className="mark-gold">Personal Attention.</span>
              </span>
            </h1>
            <p className="mt-7 max-w-xl text-[17px] leading-relaxed text-muted sm:text-[19px]">
              Explore specialty medical supplies, diabetic footwear, orthotic solutions, and compression products with
              a team focused on your needs.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button to="/shop" size="lg" arrow className="w-full sm:w-auto">
                Explore Our Products
              </Button>
              <Button to="/contact" variant="outline" size="lg" className="w-full sm:w-auto">
                Contact Our Team
              </Button>
            </div>
            <ul className="mt-11 grid gap-x-6 gap-y-3 border-t border-navy/10 pt-7 text-[14px] font-medium text-navy sm:grid-cols-3">
              {business.positioning.slice(0, 3).map((p) => (
                <li key={p} className="flex items-center gap-2.5">
                  <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-navy text-gold">
                    <Check className="h-3 w-3" strokeWidth={3} aria-hidden />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </div>

          <div className="page-enter relative" style={{ animationDelay: "120ms" }}>
            <div aria-hidden className="absolute -right-4 -top-4 hidden h-full w-full rounded-md border border-gold lg:block" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-md bg-navy sm:aspect-[16/11] lg:aspect-auto lg:h-[640px]">
              <Img
                eager
                src={img.hero}
                alt="Comfort footwear, orthotic insoles and compression stockings arranged in warm natural light"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-8 left-4 right-4 flex items-center gap-4 rounded-md bg-white p-4 shadow-[0_30px_70px_-30px_rgba(8,8,62,0.5)] sm:left-8 sm:right-auto sm:w-[350px] lg:-left-12">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-[4px] bg-navy text-gold">
                <MapPin className="h-5 w-5" aria-hidden />
              </span>
              <div className="min-w-0">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">Visit KCSS</p>
                <p className="mt-1 text-[14px] font-semibold leading-snug text-navy">
                  {business.address.line1}
                  <br />
                  {business.address.line2}
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Brand positioning strip */}
      <section className="border-y border-line bg-white" aria-label="What we specialize in">
        <Container>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-line">
            {business.positioning.map((p, i) => (
              <li key={p} className="flex items-center gap-4 border-b border-line py-5 last:border-b-0 sm:[&:nth-last-child(-n+2)]:border-b-0 lg:border-b-0 lg:px-7 lg:py-7 lg:first:pl-0">
                <span className="font-display text-[12px] font-extrabold tracking-[0.1em] text-navy/35">0{i + 1}</span>
                <span className="font-display text-[15px] font-bold leading-tight tracking-[-0.01em] text-navy">{p}</span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* B — Specialty categories */}
      <section className="bg-white">
        <Container className="py-20 lg:py-28">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <Reveal>
              <SectionHeading eyebrow="Our specialties" title="Four specialties. One attentive team.">
                Each category is presented simply, so it is easy to find what you are looking for — and easy to ask
                when you would like a hand.
              </SectionHeading>
            </Reveal>
            <Reveal delay={100}>
              <Button to="/specialties" variant="outline" arrow>
                View all specialties
              </Button>
            </Reveal>
          </div>
          <div className="mt-14 lg:mt-16">
            <SpecialtyGrid />
          </div>
        </Container>
      </section>

      {/* C — Featured products */}
      <section className="bg-soft">
        <Container className="py-20 lg:py-28">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <Reveal>
              <SectionHeading eyebrow="Featured products" title="A closer look at the catalog.">
                A selection of sample listings from across our specialty categories. Contact KCSS for current products
                and availability.
              </SectionHeading>
            </Reveal>
            <Reveal delay={100}>
              <Button to="/shop" variant="navy" arrow>
                View all products
              </Button>
            </Reveal>
          </div>
          <ProductGrid items={homeFeatured} className="mt-14 lg:mt-16" />
          <p className="mt-10 flex items-start gap-3 text-[13px] leading-relaxed text-muted">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-navy" aria-hidden />
            Listings are sample placeholders for this design concept. No prices are shown and nothing can be purchased
            online — product details will be confirmed by KCSS.
          </p>
        </Container>
      </section>

      {/* D — Why choose KCSS */}
      <section className="relative overflow-hidden bg-navy text-white">
        <div aria-hidden className="pointer-events-none absolute -left-56 -top-56 h-[560px] w-[560px] rounded-full border border-white/10" />
        <Container className="relative grid gap-14 py-20 lg:grid-cols-12 lg:gap-10 lg:py-28">
          <Reveal className="lg:col-span-5">
            <SectionHeading
              tone="light"
              eyebrow="Why choose KCSS"
              title={
                <>
                  Specialty focus, delivered <span className="text-gold">personally.</span>
                </>
              }
            >
              KCSS is a specialty business by design. That means a focused range of products — and time for the people
              who need them.
            </SectionHeading>
            <div className="mt-10 overflow-hidden rounded-md">
              <Img
                src={img.interior}
                alt="A bright specialty footwear and medical supply boutique with a fitting bench (concept imagery)"
                className="aspect-[16/10] w-full object-cover"
              />
            </div>
            <p className="mt-3 text-[12px] text-white/40">Concept imagery — store photography to be supplied.</p>
          </Reveal>

          <Reveal delay={120} className="lg:col-span-6 lg:col-start-7">
            <ul className="grid gap-px overflow-hidden rounded-md border border-white/12 bg-white/12 sm:grid-cols-2">
              {reasons.map((r, i) => (
                <li key={r.title} className="group bg-navy p-7 transition-colors duration-500 hover:bg-navy-800 lg:p-9">
                  <div className="flex items-center justify-between">
                    <span className="grid h-12 w-12 place-items-center rounded-[4px] border border-gold/50 text-gold transition-colors duration-500 group-hover:bg-gold group-hover:text-navy">
                      <r.icon className="h-5 w-5" aria-hidden />
                    </span>
                    <span className="font-display text-[13px] font-extrabold tracking-[0.1em] text-white/30">0{i + 1}</span>
                  </div>
                  <h3 className="mt-9 font-display text-[21px] font-bold leading-tight tracking-[-0.015em]">{r.title}</h3>
                  <p className="mt-3 text-[14.5px] leading-relaxed text-white/65">{r.text}</p>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Button to="/about" variant="light" arrow>
                More about KCSS
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* E — About the business */}
      <section className="bg-white">
        <Container className="grid items-center gap-16 py-20 lg:grid-cols-12 lg:gap-10 lg:py-28">
          <Reveal className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <PortraitPlaceholder className="aspect-[4/5]" />
              <div className="absolute -bottom-6 right-4 rounded-md bg-gold px-5 py-4 text-navy shadow-[0_24px_50px_-24px_rgba(8,8,62,0.5)] sm:-right-5">
                <p className="font-display text-[18px] font-extrabold leading-tight tracking-[-0.015em]">{business.founder}</p>
                <p className="mt-0.5 text-[12.5px] font-medium text-navy/75">{business.founderRole}</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120} className="lg:col-span-6 lg:col-start-7">
            <SectionHeading eyebrow="About the business" title="From KC Shoe Stop to KCSS Specialty Durable Medical." />
            <div className="mt-6 grid gap-4 text-[16.5px] leading-relaxed text-muted">
              <p>
                KCSS Specialty Durable Medical is a specialty durable medical equipment business based in Shawnee,
                Kansas. Many customers first came to know us as {business.former}.
              </p>
              <p>
                Today, the KCSS name reflects the full focus of the business: diabetic supplies, functional orthotics,
                lymphedema compressions and specialty durable medical equipment.
              </p>
              <p>
                Founder and proprietor <strong className="font-semibold text-navy">{business.founder}</strong> leads
                KCSS with one clear priority — personal attention for every customer.
              </p>
            </div>
            <div className="mt-8">
              <NameTransition />
            </div>
            <div className="mt-9">
              <Button to="/about" variant="navy" arrow>
                Read our story
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* F — Customer journey */}
      <Journey />

      {/* G — Final CTA */}
      <CtaBand />
    </>
  );
}
