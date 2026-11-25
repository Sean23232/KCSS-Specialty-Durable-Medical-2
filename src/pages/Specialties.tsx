import { ArrowRight, Info } from "lucide-react";
import { Link } from "../lib/router";
import { useUI } from "../lib/ui";
import { cn } from "../utils/cn";
import {
  getCategory,
  getSpecialty,
  productsInCategory,
  productsInSpecialty,
  specialties,
  type Category,
} from "../data/catalog";
import { Breadcrumbs, Button, Container, Eyebrow, Img, Reveal, SectionHeading } from "../components/ui";
import { ProductGrid } from "../components/Product";
import { CtaBand, PageHero, SpecialtyGrid } from "../components/sections";

/* ------------------------------------------------------------------
   Specialties overview
------------------------------------------------------------------- */
export function SpecialtiesIndex() {
  return (
    <>
      <PageHero
        eyebrow="Specialties"
        title={
          <>
            Focused on what we <span className="text-gold">know best.</span>
          </>
        }
        crumbs={[{ label: "Home", to: "/" }, { label: "Specialties" }]}
      >
        KCSS concentrates on a small number of specialty categories — so every one of them gets real attention.
      </PageHero>

      <section className="bg-white">
        <Container className="grid gap-20 py-20 lg:gap-28 lg:py-28">
          {specialties.map((s, i) => {
            const flip = i % 2 === 1;
            return (
              <Reveal key={s.slug}>
                <article className="grid items-center gap-8 lg:grid-cols-12 lg:gap-10">
                  <Link
                    to={`/specialties/${s.slug}`}
                    aria-label={s.title}
                    className={cn(
                      "group relative block aspect-[4/3] overflow-hidden rounded-md bg-sand lg:col-span-7",
                      flip && "lg:order-2 lg:col-start-6",
                    )}
                  >
                    <Img
                      src={s.heroImage}
                      alt={s.heroAlt}
                      className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
                    />
                    <span className="absolute left-5 top-5 rounded-[3px] bg-white/95 px-3 py-2 font-display text-[13px] font-extrabold leading-none tracking-[0.08em] text-navy shadow-sm">
                      {s.index} / 04
                    </span>
                  </Link>
                  <div className={cn("lg:col-span-4", flip ? "lg:order-1 lg:col-start-1" : "lg:col-start-9")}>
                    <Eyebrow>Specialty {s.index}</Eyebrow>
                    <h2 className="mt-5 font-display text-[32px] font-extrabold leading-[1.08] tracking-[-0.028em] text-navy sm:text-[40px]">
                      {s.title}
                    </h2>
                    <p className="mt-5 text-[16.5px] leading-relaxed text-muted">{s.intro}</p>
                    <ul className="mt-6 flex flex-wrap gap-2">
                      {s.categoryIds.map((id) => (
                        <li key={id}>
                          <Link
                            to={`/shop?category=${id}`}
                            className="inline-flex rounded-full border border-navy/15 px-3.5 py-1.5 text-[12.5px] font-medium text-navy transition-colors hover:border-navy hover:bg-navy hover:text-white"
                          >
                            {getCategory(id)?.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-8">
                      <Button to={`/specialties/${s.slug}`} variant="navy" arrow>
                        Explore specialty
                      </Button>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </Container>
      </section>

      <CtaBand />
    </>
  );
}

/* ------------------------------------------------------------------
   Collection card
------------------------------------------------------------------- */
function CollectionCard({ c, wide }: { c: Category; wide?: boolean }) {
  const count = productsInCategory(c.id).length;
  return (
    <Link
      to={`/shop?category=${c.id}`}
      className={cn(
        "group grid h-full overflow-hidden rounded-md border border-line bg-white transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_30px_60px_-34px_rgba(8,8,62,0.4)]",
        wide && "md:grid-cols-2",
      )}
    >
      <div className={cn("overflow-hidden bg-sand", wide ? "aspect-[4/3] md:aspect-auto md:min-h-[340px]" : "aspect-[4/3]")}>
        <Img src={c.image} alt={c.name} className="h-full w-full object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-[1.05]" />
      </div>
      <div className={cn("flex flex-col p-6", wide && "justify-center md:p-12")}>
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
          Collection · {count} sample {count === 1 ? "listing" : "listings"}
        </p>
        <h3 className={cn("mt-3 font-display font-extrabold leading-tight tracking-[-0.02em] text-navy", wide ? "text-[30px]" : "text-[22px]")}>
          {c.name}
        </h3>
        <p className="mt-2.5 text-[15px] leading-relaxed text-muted">{c.description}</p>
        <span className="mt-6 inline-flex items-center gap-2 text-[14px] font-semibold text-navy">
          <span className="link-line pb-0.5">View collection</span>
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
        </span>
      </div>
    </Link>
  );
}

/* ------------------------------------------------------------------
   Specialty landing page
------------------------------------------------------------------- */
export function SpecialtyPage({ slug }: { slug?: string }) {
  const { openInquiry } = useUI();
  const s = getSpecialty(slug);

  if (!s) return <SpecialtiesIndex />;

  const cats = s.categoryIds.map((id) => getCategory(id)!).filter(Boolean);
  const items = productsInSpecialty(s.slug);
  const shopLink = cats.length === 1 ? `/shop?category=${cats[0].id}` : `/shop?specialty=${s.slug}`;

  return (
    <>
      {/* Hero */}
      <section className="overflow-hidden bg-soft">
        <Container className="pb-16 pt-8 lg:pb-24 lg:pt-10">
          <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Specialties", to: "/specialties" }, { label: s.title }]} />
          <div className="mt-10 grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="page-enter">
              <Eyebrow>Specialty {s.index}</Eyebrow>
              <h1 className="mt-6 font-display text-[42px] font-extrabold leading-[1.03] tracking-[-0.034em] text-navy sm:text-[56px] xl:text-[68px]">
                {s.title}
              </h1>
              <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-muted sm:text-[19px]">{s.intro}</p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Button to={shopLink} size="lg" arrow className="w-full sm:w-auto">
                  Browse Products
                </Button>
                <Button variant="outline" size="lg" className="w-full sm:w-auto" onClick={() => openInquiry(s.title)}>
                  Ask a Question
                </Button>
              </div>
              <ul className="mt-10 flex flex-wrap gap-2 border-t border-navy/10 pt-7">
                {cats.map((c) => (
                  <li key={c.id}>
                    <Link
                      to={`/shop?category=${c.id}`}
                      className="inline-flex items-center gap-2 rounded-full border border-navy/15 bg-white px-3.5 py-1.5 text-[12.5px] font-medium text-navy transition-colors hover:border-navy"
                    >
                      <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-gold" />
                      {c.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className={cn("page-enter relative", s.heroPortrait && "mx-auto w-full max-w-[500px] lg:mr-0")} style={{ animationDelay: "120ms" }}>
              <div aria-hidden className="absolute -right-4 -top-4 hidden h-full w-full rounded-md border border-gold lg:block" />
              <div className={cn("relative overflow-hidden rounded-md bg-sand", s.heroPortrait ? "aspect-[3/4]" : "aspect-[4/3] lg:aspect-[5/4]")}>
                <Img eager src={s.heroImage} alt={s.heroAlt} className="h-full w-full object-cover" />
              </div>
              <span className="absolute bottom-5 left-5 rounded-[3px] bg-navy px-3.5 py-2.5 font-display text-[12px] font-extrabold leading-none tracking-[0.1em] text-white">
                {s.index} <span className="text-gold">/</span> {s.title.toUpperCase()}
              </span>
            </div>
          </div>
        </Container>
      </section>

      {/* Editorial introduction */}
      <section className="bg-white">
        <Container className="grid gap-12 py-20 lg:grid-cols-12 lg:gap-10 lg:py-28">
          <Reveal className="lg:col-span-6">
            <Eyebrow>About this category</Eyebrow>
            <h2 className="mt-6 font-display text-[32px] font-extrabold leading-[1.1] tracking-[-0.028em] text-navy sm:text-[42px]">
              {s.headline}
            </h2>
            <p className="mt-8 border-l-2 border-gold pl-6 font-display text-[21px] font-semibold leading-snug tracking-[-0.01em] text-navy/85">
              {s.statement}
            </p>
          </Reveal>
          <Reveal delay={120} className="lg:col-span-5 lg:col-start-8">
            <div className="grid gap-4 text-[16.5px] leading-relaxed text-muted">
              {s.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <ol className="mt-9 divide-y divide-line border-y border-line">
              {s.points.map((p, i) => (
                <li key={p.title} className="grid grid-cols-[44px_1fr] gap-2 py-5">
                  <span className="font-display text-[13px] font-extrabold leading-7 tracking-[0.08em] text-navy/35">0{i + 1}</span>
                  <div>
                    <h3 className="font-display text-[18px] font-bold tracking-[-0.01em] text-navy">{p.title}</h3>
                    <p className="mt-1 text-[15px] leading-relaxed text-muted">{p.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
        </Container>
      </section>

      {/* Collections */}
      <section className="bg-soft">
        <Container className="py-20 lg:py-28">
          <Reveal>
            <SectionHeading
              eyebrow={cats.length > 1 ? "Collections" : "Collection"}
              title={cats.length > 1 ? "Explore by collection." : "Browse the collection."}
            >
              Each collection opens in the KCSS store, filtered and ready to browse.
            </SectionHeading>
          </Reveal>
          <div className={cn("mt-12 grid gap-6", cats.length > 1 && "md:grid-cols-3")}>
            {cats.map((c, i) => (
              <Reveal key={c.id} delay={i * 90} className="h-full">
                <CollectionCard c={c} wide={cats.length === 1} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Products */}
      <section className="bg-white">
        <Container className="py-20 lg:py-28">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <Reveal>
              <SectionHeading eyebrow="Sample products" title={`${s.title} in the store.`}>
                Representative listings for this specialty. Request information on any product to start a
                conversation.
              </SectionHeading>
            </Reveal>
            <Reveal delay={100}>
              <Button to={shopLink} variant="navy" arrow>
                View in store
              </Button>
            </Reveal>
          </div>
          <ProductGrid items={items.slice(0, 8)} className="mt-12 lg:mt-14" />
        </Container>
      </section>

      {/* Good to know */}
      <section className="bg-white">
        <Container className="pb-20 lg:pb-28">
          <Reveal>
            <div className="grid overflow-hidden rounded-md bg-navy text-white lg:grid-cols-2">
              <div className="relative min-h-[280px] bg-navy-800 lg:min-h-[420px]">
                <Img src={s.sideImage} alt={s.sideAlt} className="absolute inset-0 h-full w-full object-cover" />
              </div>
              <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-16">
                <Eyebrow tone="light">Good to know</Eyebrow>
                <h2 className="mt-6 font-display text-[30px] font-extrabold leading-[1.1] tracking-[-0.025em] sm:text-[38px]">
                  The best next step is a conversation.
                </h2>
                <p className="mt-5 flex gap-3 text-[15px] leading-relaxed text-white/70">
                  <Info className="mt-1 h-4 w-4 shrink-0 text-gold" aria-hidden />
                  <span>{s.note}</span>
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Button variant="goldOnDark" arrow onClick={() => openInquiry(s.title)}>
                    Request Information
                  </Button>
                  <Button to="/contact" variant="light">
                    Contact KCSS
                  </Button>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Other specialties */}
      <section className="border-t border-line bg-white">
        <Container className="py-20 lg:py-28">
          <Reveal>
            <SectionHeading eyebrow="Keep exploring" title="Other KCSS specialties." />
          </Reveal>
          <div className="mt-12">
            <SpecialtyGrid exclude={s.slug} />
          </div>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
