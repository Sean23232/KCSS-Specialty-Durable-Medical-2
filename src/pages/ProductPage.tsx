import type { ReactNode } from "react";
import { ArrowLeft, Check, Info, Phone } from "lucide-react";
import { Link } from "../lib/router";
import { useUI } from "../lib/ui";
import { business } from "../data/site";
import { getCategory, getProduct, relatedProducts, specialtyOfProduct } from "../data/catalog";
import { Breadcrumbs, Button, Container, Img, Reveal, SectionHeading } from "../components/ui";
import { Gallery, ProductGrid } from "../components/Product";
import { CtaBand } from "../components/sections";

export default function ProductPage({ id }: { id?: string }) {
  const { openInquiry } = useUI();
  const product = getProduct(id);

  if (!product) {
    return (
      <section className="bg-soft">
        <Container className="py-28 text-center">
          <h1 className="font-display text-[40px] font-extrabold tracking-[-0.03em] text-navy">Product not found</h1>
          <p className="mx-auto mt-4 max-w-md text-[17px] text-muted">
            This sample listing does not exist. Head back to the store to keep browsing.
          </p>
          <div className="mt-8 flex justify-center">
            <Button to="/shop" variant="navy" arrow>
              Back to the store
            </Button>
          </div>
        </Container>
      </section>
    );
  }

  const category = getCategory(product.categoryId)!;
  const specialty = specialtyOfProduct(product);
  const related = relatedProducts(product, 4);
  const extraShots = product.gallery.slice(1);

  const rows: { label: string; value: ReactNode }[] = [
    {
      label: "Category",
      value: (
        <Link to={`/shop?category=${category.id}`} className="font-semibold text-navy underline decoration-gold decoration-2 underline-offset-4">
          {category.name}
        </Link>
      ),
    },
    {
      label: "Specialty",
      value: specialty ? (
        <Link to={`/specialties/${specialty.slug}`} className="font-semibold text-navy underline decoration-gold decoration-2 underline-offset-4">
          {specialty.title}
        </Link>
      ) : (
        "—"
      ),
    },
    { label: "Listing", value: `${product.ref} — placeholder for the design concept` },
    { label: "Pricing", value: "Not shown online. Please contact KCSS." },
    { label: "Availability", value: "To be confirmed by the KCSS team." },
  ];

  return (
    <>
      <section className="bg-white">
        <Container className="pb-16 pt-8 lg:pb-24 lg:pt-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Breadcrumbs
              items={[
                { label: "Home", to: "/" },
                { label: "Shop", to: "/shop" },
                { label: category.name, to: `/shop?category=${category.id}` },
                { label: product.name },
              ]}
            />
            <Link to="/shop" className="group inline-flex items-center gap-2 text-[13.5px] font-semibold text-navy">
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" aria-hidden />
              <span className="link-line pb-0.5">Back to all products</span>
            </Link>
          </div>

          <div className="mt-8 grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16">
            <div className="page-enter">
              <Gallery key={product.id} shots={product.gallery} />
            </div>

            <div className="page-enter lg:sticky lg:top-28 lg:self-start" style={{ animationDelay: "100ms" }}>
              <div className="flex flex-wrap items-center gap-2">
                <Link
                  to={`/shop?category=${category.id}`}
                  className="rounded-[3px] bg-navy px-2.5 py-1.5 text-[11px] font-semibold leading-none text-white transition-colors hover:bg-navy-700"
                >
                  {category.name}
                </Link>
                <span className="rounded-[3px] bg-gold-100 px-2.5 py-1.5 text-[11px] font-semibold leading-none text-navy">
                  {product.ref} · Placeholder listing
                </span>
              </div>

              <h1 className="mt-6 font-display text-[36px] font-extrabold leading-[1.06] tracking-[-0.03em] text-navy sm:text-[46px]">
                {product.name}
              </h1>
              <p className="mt-5 text-[18px] leading-relaxed text-navy/80">{product.short}</p>
              <p className="mt-4 text-[15px] leading-relaxed text-muted">{product.detail}</p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button size="lg" arrow className="w-full sm:flex-1" onClick={() => openInquiry(product.name)}>
                  Request Information
                </Button>
                <Button
                  href={business.phoneHref}
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto"
                  icon={<Phone className="h-4 w-4" aria-hidden />}
                >
                  {business.phone}
                </Button>
              </div>
              <p className="mt-4 flex items-start gap-2.5 text-[13px] leading-relaxed text-muted">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-navy" aria-hidden />
                This product cannot be purchased online. Send an inquiry or call and the team will help with next
                steps.
              </p>

              <dl className="mt-9 divide-y divide-line border-y border-line text-[14.5px]">
                {rows.map((r) => (
                  <div key={r.label} className="grid grid-cols-[110px_1fr] gap-4 py-3.5">
                    <dt className="text-[11.5px] font-semibold uppercase leading-6 tracking-[0.14em] text-muted">{r.label}</dt>
                    <dd className="text-navy/85">{r.value}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-8 rounded-md bg-soft p-6">
                <h2 className="font-display text-[16px] font-extrabold text-navy">Helpful things to ask the team</h2>
                <ul className="mt-4 grid gap-3 text-[14.5px] text-navy/85">
                  {category.ask.map((a) => (
                    <li key={a} className="flex items-center gap-3">
                      <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-navy text-gold">
                        <Check className="h-3 w-3" strokeWidth={3} aria-hidden />
                      </span>
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Additional imagery + category information */}
      <section className="bg-soft">
        <Container className="grid gap-12 py-16 lg:grid-cols-12 lg:gap-10 lg:py-24">
          <Reveal className="lg:col-span-4">
            <SectionHeading eyebrow="About this category" title={category.name}>
              {category.description}
            </SectionHeading>
            {specialty && (
              <>
                <p className="mt-4 text-[15.5px] leading-relaxed text-muted">{specialty.intro}</p>
                <div className="mt-8">
                  <Button to={`/specialties/${specialty.slug}`} variant="outline" arrow>
                    Explore {specialty.title}
                  </Button>
                </div>
              </>
            )}
          </Reveal>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:col-span-7 lg:col-start-6">
            {extraShots.map((s, i) => (
              <Reveal key={`${s.label}-${i}`} delay={i * 90} className={i === 2 ? "col-span-2 sm:col-span-1" : ""}>
                <figure>
                  <div className={`overflow-hidden rounded-md bg-sand ${i === 2 ? "aspect-[2/1] sm:aspect-[3/4]" : "aspect-[3/4]"}`}>
                    <Img
                      src={s.src}
                      alt={s.alt}
                      className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out hover:scale-105"
                      style={s.zoom ? { transform: `scale(${s.zoom})`, transformOrigin: s.origin } : undefined}
                    />
                  </div>
                  <figcaption className="mt-3 text-[11.5px] font-semibold uppercase tracking-[0.14em] text-muted">{s.label}</figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Related products */}
      <section className="bg-white">
        <Container className="py-16 lg:py-24">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading eyebrow="Related products" title="You may also want to see" />
            <Button to={`/shop?category=${category.id}`} variant="outline" arrow>
              More in {category.name}
            </Button>
          </div>
          <ProductGrid items={related} className="mt-12" />
        </Container>
      </section>

      <CtaBand
        eyebrow="Questions about this product?"
        title={
          <>
            Talk it through with <span className="text-gold">the KCSS team.</span>
          </>
        }
        text="Call or send an inquiry to discuss product information and appropriate next steps."
      />
    </>
  );
}
