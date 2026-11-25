import type { ReactNode } from "react";
import { ArrowUpRight, Info, Mail, MapPin, Navigation, Phone, Printer } from "lucide-react";
import { business } from "../data/site";
import { Button, Container, Eyebrow, Reveal, SectionHeading, SocialLinks } from "../components/ui";
import { InquiryForm } from "../components/Overlays";
import { PageHero } from "../components/sections";

type Card = { icon: ReactNode; label: string; value: ReactNode; action?: { text: string; href: string; external?: boolean } };

const cards: Card[] = [
  {
    icon: <Phone className="h-5 w-5" aria-hidden />,
    label: "Phone",
    value: business.phone,
    action: { text: "Call KCSS", href: business.phoneHref },
  },
  {
    icon: <Printer className="h-5 w-5" aria-hidden />,
    label: "Fax",
    value: business.fax,
  },
  {
    icon: <Mail className="h-5 w-5" aria-hidden />,
    label: "Email",
    value: <span className="break-all">{business.email}</span>,
    action: { text: "Send an email", href: business.emailHref },
  },
  {
    icon: <MapPin className="h-5 w-5" aria-hidden />,
    label: "Address",
    value: (
      <>
        {business.address.line1}
        <br />
        {business.address.line2}
      </>
    ),
    action: { text: "Get directions", href: business.directions, external: true },
  },
];

export default function Contact() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={
          <>
            Let's start with a <span className="text-gold">conversation.</span>
          </>
        }
        crumbs={[{ label: "Home", to: "/" }, { label: "Contact" }]}
        extraPadding
      >
        Questions about specialty medical products? Call, email, fax or send a note — the KCSS team is glad to help.
      </PageHero>

      {/* Contact cards */}
      <section className="bg-white">
        <Container className="relative z-10 -mt-20 lg:-mt-24">
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {cards.map((c, i) => (
              <li key={c.label}>
                <Reveal delay={i * 80} className="h-full">
                  <div className="group flex h-full flex-col rounded-md border border-line bg-white p-6 shadow-[0_30px_60px_-40px_rgba(8,8,62,0.45)] transition-all duration-500 hover:-translate-y-1 hover:border-navy/20 lg:p-7">
                    <span className="grid h-12 w-12 place-items-center rounded-[4px] bg-navy text-gold transition-colors duration-500 group-hover:bg-gold group-hover:text-navy">
                      {c.icon}
                    </span>
                    <p className="mt-6 text-[11.5px] font-semibold uppercase tracking-[0.18em] text-muted">{c.label}</p>
                    <p className="mt-2 font-display text-[19px] font-extrabold leading-snug tracking-[-0.015em] text-navy">{c.value}</p>
                    {c.action ? (
                      <a
                        href={c.action.href}
                        {...(c.action.external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
                        className="mt-auto inline-flex items-center gap-1.5 pt-6 text-[14px] font-semibold text-navy"
                      >
                        <span className="link-line pb-0.5">{c.action.text}</span>
                        <ArrowUpRight className="h-4 w-4 text-gold-600" aria-hidden />
                      </a>
                    ) : (
                      <span className="mt-auto pt-6 text-[13px] text-muted">For documents and paperwork</span>
                    )}
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Form + details */}
      <section className="bg-white">
        <Container className="grid gap-14 py-20 lg:grid-cols-12 lg:gap-10 lg:py-28">
          <Reveal className="lg:col-span-7">
            <div className="rounded-md border border-line bg-white p-6 shadow-[0_40px_80px_-60px_rgba(8,8,62,0.5)] sm:p-10">
              <Eyebrow>Send an inquiry</Eyebrow>
              <h2 className="mt-5 font-display text-[30px] font-extrabold leading-[1.1] tracking-[-0.025em] text-navy sm:text-[38px]">
                How can the KCSS team help?
              </h2>
              <p className="mt-3 text-[15.5px] leading-relaxed text-muted">
                Share a little about what you are looking for and how you would like to be contacted.
              </p>
              <div className="mt-8">
                <InquiryForm />
              </div>
            </div>
          </Reveal>

          <Reveal delay={120} className="lg:col-span-4 lg:col-start-9">
            <div className="lg:sticky lg:top-28">
              <SectionHeading eyebrow="Reach us directly" title="Prefer to call?" />
              <a
                href={business.phoneHref}
                className="mt-6 block font-display text-[38px] font-extrabold leading-none tracking-[-0.03em] text-navy transition-colors hover:text-navy-700 sm:text-[44px]"
              >
                <span className="mark-gold">{business.phone}</span>
              </a>

              <dl className="mt-9 divide-y divide-line border-y border-line text-[15px]">
                <div className="grid grid-cols-[84px_1fr] gap-4 py-4">
                  <dt className="text-[11.5px] font-semibold uppercase leading-6 tracking-[0.14em] text-muted">Fax</dt>
                  <dd className="font-medium text-navy">{business.fax}</dd>
                </div>
                <div className="grid grid-cols-[84px_1fr] gap-4 py-4">
                  <dt className="text-[11.5px] font-semibold uppercase leading-6 tracking-[0.14em] text-muted">Email</dt>
                  <dd>
                    <a href={business.emailHref} className="break-all font-medium text-navy underline decoration-gold decoration-2 underline-offset-4">
                      {business.email}
                    </a>
                  </dd>
                </div>
                <div className="grid grid-cols-[84px_1fr] gap-4 py-4">
                  <dt className="text-[11.5px] font-semibold uppercase leading-6 tracking-[0.14em] text-muted">Visit</dt>
                  <dd className="font-medium leading-relaxed text-navy">
                    {business.address.line1}
                    <br />
                    {business.address.line2}
                    <br />
                    {business.address.country}
                  </dd>
                </div>
                <div className="grid grid-cols-[84px_1fr] gap-4 py-4">
                  <dt className="text-[11.5px] font-semibold uppercase leading-6 tracking-[0.14em] text-muted">Hours</dt>
                  <dd className="flex gap-2.5 text-[14px] leading-relaxed text-muted">
                    <Info className="mt-0.5 h-4 w-4 shrink-0 text-navy" aria-hidden />
                    Please call ahead to confirm current hours before visiting.
                  </dd>
                </div>
              </dl>

              <div className="mt-9">
                <p className="text-[11.5px] font-semibold uppercase tracking-[0.18em] text-navy">Follow KCSS</p>
                <div className="mt-4">
                  <SocialLinks links={business.social} />
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Map */}
      <section className="bg-soft">
        <Container className="py-20 lg:py-28">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <Reveal>
              <SectionHeading eyebrow="Location" title="Find us in Shawnee, Kansas.">
                {business.address.line1}, {business.address.line2}.
              </SectionHeading>
            </Reveal>
            <Reveal delay={100}>
              <Button href={business.directions} external variant="navy" icon={<Navigation className="h-4 w-4" aria-hidden />} arrow>
                Get Directions
              </Button>
            </Reveal>
          </div>

          <Reveal>
            <div className="relative mt-12 overflow-hidden rounded-md border border-line bg-white">
              <div
                className="relative h-[380px] sm:h-[520px]"
                style={{
                  backgroundColor: "#eef0f4",
                  backgroundImage:
                    "linear-gradient(#e1e4ea 1px, transparent 1px), linear-gradient(90deg, #e1e4ea 1px, transparent 1px)",
                  backgroundSize: "56px 56px",
                }}
              >
                <div className="absolute inset-0 grid place-items-center" aria-hidden>
                  <span className="grid h-14 w-14 place-items-center rounded-full bg-navy text-gold shadow-xl ring-8 ring-navy/10">
                    <MapPin className="h-6 w-6" />
                  </span>
                </div>
                <iframe
                  title="Map showing the location of KCSS Specialty Durable Medical"
                  src={business.mapEmbed}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 h-full w-full border-0"
                />
              </div>

              <div className="bg-navy p-6 text-white sm:absolute sm:left-6 sm:top-6 sm:w-[340px] sm:rounded-md sm:p-7 sm:shadow-[0_30px_70px_-30px_rgba(5,5,43,0.8)]">
                <p className="text-[11.5px] font-semibold uppercase tracking-[0.18em] text-gold">KCSS Specialty Durable Medical</p>
                <p className="mt-4 font-display text-[21px] font-extrabold leading-snug tracking-[-0.015em]">
                  {business.address.line1}
                  <br />
                  {business.address.line2}
                </p>
                <p className="mt-2 text-[13.5px] text-white/60">{business.address.country}</p>
                <div className="mt-6 grid gap-2.5">
                  <Button href={business.directions} external variant="goldOnDark" className="w-full" icon={<Navigation className="h-4 w-4" aria-hidden />}>
                    Get Directions
                  </Button>
                  <Button href={business.phoneHref} variant="light" className="w-full" icon={<Phone className="h-4 w-4" aria-hidden />}>
                    Call {business.phone}
                  </Button>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
