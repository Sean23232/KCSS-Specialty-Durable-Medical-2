import { ArrowRight, HeartHandshake, Layers, Mail, MessageSquare, Users } from "lucide-react";
import { Link } from "../lib/router";
import { business } from "../data/site";
import { specialties } from "../data/catalog";
import { img } from "../data/images";
import {
  Button,
  Container,
  Eyebrow,
  Img,
  LinkedinIcon,
  PhotoPlaceholder,
  PortraitPlaceholder,
  Reveal,
  SectionHeading,
} from "../components/ui";
import { CtaBand, PageHero } from "../components/sections";
import { NameTransition } from "./Home";

const values = [
  {
    icon: HeartHandshake,
    title: "Personal attention",
    text: "Every customer is a person first. We take the time to listen before anything else.",
  },
  {
    icon: Layers,
    title: "Specialty focus",
    text: "We concentrate on a small number of categories so we can give each one proper care.",
  },
  {
    icon: MessageSquare,
    title: "Clear communication",
    text: "Plain language, honest answers, and no pressure — so you always know where things stand.",
  },
  {
    icon: Users,
    title: "Respect for every customer",
    text: "Kindness and professionalism, from the first hello to the final follow-up.",
  },
];

export default function About() {
  return (
    <>
      <PageHero
        eyebrow="About KCSS"
        title={
          <>
            A specialty medical business built on <span className="text-gold">personal attention.</span>
          </>
        }
        crumbs={[{ label: "Home", to: "/" }, { label: "About Us" }]}
      >
        KCSS Specialty Durable Medical — formerly {business.former} — serves customers from Shawnee, Kansas with a
        focused range of specialty medical products.
      </PageHero>

      {/* Brand introduction */}
      <section className="bg-white">
        <Container className="grid items-center gap-14 py-20 lg:grid-cols-12 lg:gap-10 lg:py-28">
          <Reveal className="lg:col-span-5">
            <SectionHeading eyebrow="Who we are" title="Specialty products, and the people behind them." />
            <div className="mt-6 grid gap-4 text-[16.5px] leading-relaxed text-muted">
              <p>
                KCSS Specialty Durable Medical is a specialty durable medical equipment business. Our focus is clear
                and deliberately narrow: diabetic supplies, functional orthotics, lymphedema compressions and specialty
                durable medical equipment.
              </p>
              <p>
                We believe specialty products call for a personal approach. That is why the KCSS experience is built
                around conversation — exploring what is available, answering questions, and helping you understand
                appropriate next steps.
              </p>
            </div>
            <ul className="mt-8 grid gap-x-6 gap-y-3 border-t border-line pt-7 sm:grid-cols-2">
              {business.positioning.map((p) => (
                <li key={p} className="flex items-center gap-3 text-[14.5px] font-medium text-navy">
                  <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold" /> {p}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={120} className="lg:col-span-6 lg:col-start-7">
            <figure className="relative">
              <div aria-hidden className="absolute -right-4 -top-4 hidden h-full w-full rounded-md border border-gold lg:block" />
              <div className="relative overflow-hidden rounded-md bg-sand">
                <Img
                  src={img.interior}
                  alt="A bright specialty footwear and medical supply boutique with a fitting bench (concept imagery)"
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>
              <figcaption className="mt-3 text-[12px] text-muted">
                Concept imagery — authentic KCSS store photography to be supplied.
              </figcaption>
            </figure>
          </Reveal>
        </Container>
      </section>

      {/* Formerly KC Shoe Stop */}
      <section className="bg-soft">
        <Container className="grid gap-12 py-20 lg:grid-cols-12 lg:gap-10 lg:py-28">
          <Reveal className="lg:col-span-5">
            <SectionHeading eyebrow="Our name" title="You may know us as KC Shoe Stop.">
              The business has a new name, and the same commitment to the people it serves.
            </SectionHeading>
          </Reveal>
          <Reveal delay={120} className="lg:col-span-6 lg:col-start-7">
            <NameTransition />
            <div className="mt-8 grid gap-4 text-[16.5px] leading-relaxed text-muted">
              <p>
                {business.former} is the name many customers first knew. As the business focused on specialty durable
                medical equipment, the name evolved to match:{" "}
                <strong className="font-semibold text-navy">KCSS Specialty Durable Medical</strong>.
              </p>
              <p>
                The “KCSS” initials keep our original identity close, while “Specialty Durable Medical” says plainly
                what we do today.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Founder */}
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
            <Eyebrow>Meet the founder</Eyebrow>
            <h2 className="mt-5 font-display text-[36px] font-extrabold leading-[1.06] tracking-[-0.03em] text-navy sm:text-[50px]">
              {business.founder}
            </h2>
            <p className="mt-2 font-display text-[17px] font-semibold text-navy/60">{business.founderRole}</p>
            <div className="mt-7 grid gap-4 text-[16.5px] leading-relaxed text-muted">
              <p>
                Natasha Belcher is the founder and proprietor of KCSS Specialty Durable Medical. When you contact
                KCSS, you are reaching a business whose owner is directly involved — and where personal attention is
                the priority.
              </p>
              <p className="rounded-md border border-dashed border-navy/20 bg-soft p-5 text-[14.5px]">
                <strong className="font-semibold text-navy">Content placeholder.</strong> Natasha's own story,
                background and an authentic portrait will be added here once supplied — in her words, not ours.
              </p>
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href={business.emailHref} variant="navy" icon={<Mail className="h-4 w-4" aria-hidden />}>
                {business.email}
              </Button>
              <Button
                href={business.social.linkedin}
                external
                variant="outline"
                icon={<LinkedinIcon className="h-4 w-4" />}
              >
                Connect on LinkedIn
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Specialty focus */}
      <section className="bg-navy text-white">
        <Container className="grid gap-12 py-20 lg:grid-cols-12 lg:gap-10 lg:py-28">
          <Reveal className="lg:col-span-4">
            <SectionHeading tone="light" eyebrow="What we focus on" title="A deliberately focused range.">
              Four specialties make up the KCSS offering. Each has its own page and its own collection in the store.
            </SectionHeading>
          </Reveal>
          <Reveal delay={120} className="lg:col-span-7 lg:col-start-6">
            <ul className="divide-y divide-white/12 border-y border-white/12">
              {specialties.map((s) => (
                <li key={s.slug}>
                  <Link to={`/specialties/${s.slug}`} className="group grid grid-cols-[44px_1fr_auto] items-center gap-4 py-6 sm:py-7">
                    <span className="font-display text-[13px] font-extrabold tracking-[0.08em] text-gold">{s.index}</span>
                    <span>
                      <span className="block font-display text-[22px] font-extrabold tracking-[-0.02em] transition-colors group-hover:text-gold sm:text-[28px]">
                        {s.title}
                      </span>
                      <span className="mt-1 block text-[14.5px] text-white/60">{s.cardText}</span>
                    </span>
                    <span className="grid h-11 w-11 place-items-center rounded-full border border-white/25 transition-all duration-300 group-hover:border-gold group-hover:bg-gold group-hover:text-navy">
                      <ArrowRight className="h-4 w-4" aria-hidden />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </section>

      {/* Values */}
      <section className="bg-white">
        <Container className="py-20 lg:py-28">
          <Reveal>
            <SectionHeading eyebrow="What guides us" title="The values behind every conversation." />
          </Reveal>
          <ul className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <li key={v.title}>
                <Reveal delay={i * 90}>
                  <div className="border-t-2 border-navy pt-7">
                    <span className="grid h-12 w-12 place-items-center rounded-[4px] bg-gold-100 text-navy">
                      <v.icon className="h-5 w-5" aria-hidden />
                    </span>
                    <h3 className="mt-6 font-display text-[21px] font-extrabold tracking-[-0.02em] text-navy">{v.title}</h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-muted">{v.text}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Photography placeholders */}
      <section className="bg-soft">
        <Container className="py-20 lg:py-28">
          <Reveal>
            <SectionHeading eyebrow="Inside KCSS" title="A space for real photography.">
              This gallery is reserved for authentic images of the KCSS location, team and products.
            </SectionHeading>
          </Reveal>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Reveal className="sm:col-span-2 lg:row-span-2">
              <div className="h-full min-h-[300px] overflow-hidden rounded-md bg-sand">
                <Img
                  src={img.hero}
                  alt="Comfort footwear, orthotic insoles and compression stockings (concept imagery)"
                  className="h-full w-full object-cover"
                />
              </div>
            </Reveal>
            <Reveal delay={90}>
              <PhotoPlaceholder label="Storefront" className="aspect-[4/3] bg-white" />
            </Reveal>
            <Reveal delay={150}>
              <PhotoPlaceholder label="Fitting area" className="aspect-[4/3] bg-white" />
            </Reveal>
            <Reveal delay={210}>
              <PhotoPlaceholder label="Natasha with a customer" className="aspect-[4/3] bg-white" />
            </Reveal>
            <Reveal delay={270}>
              <PhotoPlaceholder label="Product displays" className="aspect-[4/3] bg-white" />
            </Reveal>
          </div>
        </Container>
      </section>

      <CtaBand
        eyebrow="Get in touch"
        title={
          <>
            We would love to <span className="text-gold">hear from you.</span>
          </>
        }
        text="Call, email or send an inquiry — the KCSS team is ready to help with specialty medical products and services."
      />
    </>
  );
}
