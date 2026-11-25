import { useMemo, useState } from "react";
import { Check, ChevronDown, Grip, Info, LayoutGrid, Phone, Search, SlidersHorizontal, X } from "lucide-react";
import { navigate, useRoute } from "../lib/router";
import { cn } from "../utils/cn";
import { business } from "../data/site";
import { categories, getCategory, products, productsInSpecialty, specialties } from "../data/catalog";
import { Breadcrumbs, Button, Container, Eyebrow } from "../components/ui";
import { ProductCard } from "../components/Product";
import { CtaBand } from "../components/sections";

type SortKey = "featured" | "az" | "za" | "category";
const sortLabels: Record<SortKey, string> = {
  featured: "Featured first",
  az: "Name: A to Z",
  za: "Name: Z to A",
  category: "Category",
};
const suggestions = ["shoe", "insert", "orthotic", "compression", "glucose"];

/* ------------------------------------------------------------------
   Filter panel (shared by desktop sidebar + mobile drawer)
------------------------------------------------------------------- */
function FilterPanel({
  activeSpecs,
  toggleSpec,
  featuredOnly,
  setFeaturedOnly,
}: {
  activeSpecs: string[];
  toggleSpec: (slug: string) => void;
  featuredOnly: boolean;
  setFeaturedOnly: (v: boolean) => void;
}) {
  return (
    <div className="grid gap-8">
      <fieldset>
        <legend className="text-[11.5px] font-semibold uppercase tracking-[0.18em] text-navy">Specialty</legend>
        <div className="mt-4 grid gap-1">
          {specialties.map((s) => {
            const checked = activeSpecs.includes(s.slug);
            return (
              <button
                key={s.slug}
                type="button"
                role="checkbox"
                aria-checked={checked}
                onClick={() => toggleSpec(s.slug)}
                className="group flex items-center gap-3 rounded-[4px] px-2 py-2.5 text-left transition-colors hover:bg-soft"
              >
                <span
                  className={cn(
                    "grid h-5 w-5 shrink-0 place-items-center rounded-[3px] border transition-all duration-200",
                    checked ? "border-navy bg-navy text-gold" : "border-navy/25 bg-white group-hover:border-navy",
                  )}
                >
                  {checked && <Check className="h-3 w-3" strokeWidth={3.5} aria-hidden />}
                </span>
                <span className="flex-1 text-[14.5px] font-medium text-navy">{s.title}</span>
                <span className="text-[12px] tabular-nums text-muted">{productsInSpecialty(s.slug).length}</span>
              </button>
            );
          })}
        </div>
      </fieldset>

      <fieldset className="border-t border-line pt-7">
        <legend className="sr-only">Show</legend>
        <button
          type="button"
          role="switch"
          aria-checked={featuredOnly}
          onClick={() => setFeaturedOnly(!featuredOnly)}
          className="flex w-full items-center justify-between gap-4 px-2 text-left"
        >
          <span>
            <span className="block text-[14.5px] font-medium text-navy">Featured only</span>
            <span className="block text-[12.5px] text-muted">Show highlighted sample listings</span>
          </span>
          <span
            className={cn(
              "relative h-6 w-11 shrink-0 rounded-full transition-colors duration-300",
              featuredOnly ? "bg-navy" : "bg-navy/15",
            )}
          >
            <span
              className={cn(
                "absolute top-1 h-4 w-4 rounded-full transition-all duration-300",
                featuredOnly ? "left-6 bg-gold" : "left-1 bg-white",
              )}
            />
          </span>
        </button>
      </fieldset>

      <div className="rounded-md bg-soft p-5">
        <p className="flex items-center gap-2 font-display text-[14px] font-bold text-navy">
          <Info className="h-4 w-4" aria-hidden /> Sample catalog
        </p>
        <p className="mt-2 text-[13px] leading-relaxed text-muted">
          These categories are the starting point for the catalog. Actual inventory will be confirmed before
          publication.
        </p>
      </div>

      <div className="rounded-md bg-navy p-5 text-white">
        <p className="font-display text-[16px] font-bold">Prefer to talk it through?</p>
        <p className="mt-1.5 text-[13px] leading-relaxed text-white/65">The KCSS team is happy to help by phone.</p>
        <a
          href={business.phoneHref}
          className="mt-4 inline-flex items-center gap-2.5 font-display text-[17px] font-extrabold text-gold transition-colors hover:text-white"
        >
          <Phone className="h-4 w-4" aria-hidden /> {business.phone}
        </a>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------
   Shop page
------------------------------------------------------------------- */
export default function Shop() {
  const route = useRoute();
  const category = route.query.get("category") && getCategory(route.query.get("category")!) ? route.query.get("category")! : "all";
  const specParam = route.query.get("specialty") ?? "";
  const activeSpecs = useMemo(
    () => specParam.split(",").filter((s) => specialties.some((x) => x.slug === s)),
    [specParam],
  );

  const [q, setQ] = useState("");
  const [sort, setSort] = useState<SortKey>("featured");
  const [featuredOnly, setFeaturedOnly] = useState(false);
  const [dense, setDense] = useState(false);
  const [drawer, setDrawer] = useState(false);

  const pushParams = (cat: string, specs: string[]) => {
    const p = new URLSearchParams();
    if (cat !== "all") p.set("category", cat);
    if (specs.length) p.set("specialty", specs.join(","));
    const qs = p.toString();
    navigate(`/shop${qs ? `?${qs}` : ""}`);
  };
  // Choosing a category tab clears specialty filters (and vice-versa) so results never contradict each other.
  const setCategory = (id: string) => pushParams(id, []);
  const toggleSpec = (slug: string) =>
    pushParams("all", activeSpecs.includes(slug) ? activeSpecs.filter((s) => s !== slug) : [...activeSpecs, slug]);

  const results = useMemo(() => {
    const terms = q.trim().toLowerCase().split(/\s+/).filter(Boolean);
    const list = products.filter((p) => {
      const cat = getCategory(p.categoryId)!;
      if (category !== "all" && p.categoryId !== category) return false;
      if (activeSpecs.length && !activeSpecs.includes(cat.specialty)) return false;
      if (featuredOnly && !p.featured) return false;
      if (terms.length) {
        const hay = `${p.name} ${cat.name} ${p.short}`.toLowerCase();
        if (!terms.every((t) => hay.includes(t))) return false;
      }
      return true;
    });
    const order = (id: string) => categories.findIndex((c) => c.id === id);
    const sorted = [...list];
    if (sort === "az") sorted.sort((a, b) => a.name.localeCompare(b.name));
    if (sort === "za") sorted.sort((a, b) => b.name.localeCompare(a.name));
    if (sort === "category")
      sorted.sort((a, b) => order(a.categoryId) - order(b.categoryId) || a.name.localeCompare(b.name));
    if (sort === "featured") sorted.sort((a, b) => Number(b.featured) - Number(a.featured));
    return sorted;
  }, [q, sort, featuredOnly, category, activeSpecs]);

  const hasFilters = category !== "all" || activeSpecs.length > 0 || featuredOnly || q.trim().length > 0;
  const filterCount = activeSpecs.length + (featuredOnly ? 1 : 0);
  const reset = () => {
    setQ("");
    setFeaturedOnly(false);
    pushParams("all", []);
  };
  const signature = `${category}|${specParam}|${featuredOnly}|${sort}|${q.trim().toLowerCase()}`;

  const chipCls =
    "inline-flex h-8 items-center gap-1.5 rounded-full border border-navy/15 bg-white pl-3 pr-2 text-[12.5px] font-medium text-navy transition-colors hover:border-navy";

  return (
    <>
      {/* Store header */}
      <section className="bg-soft">
        <Container className="pb-12 pt-8 lg:pb-16 lg:pt-10">
          <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Shop" }]} />
          <div className="mt-9 grid items-end gap-10 lg:grid-cols-12">
            <div className="page-enter lg:col-span-7">
              <Eyebrow>The KCSS store · Sample catalog</Eyebrow>
              <h1 className="mt-6 font-display text-[40px] font-extrabold leading-[1.04] tracking-[-0.032em] text-navy sm:text-[54px] lg:text-[62px]">
                Explore Our Specialty Products
              </h1>
              <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-muted sm:text-[18px]">
                Browse specialty medical products and discover solutions across our key product categories.
              </p>
            </div>

            <div className="lg:col-span-5">
              <label htmlFor="shop-search" className="sr-only">
                Search products
              </label>
              <div className="group relative">
                <Search className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-navy/50 transition-colors group-focus-within:text-navy" aria-hidden />
                <input
                  id="shop-search"
                  type="search"
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search products or categories"
                  className="h-[60px] w-full rounded-[4px] border border-navy/15 bg-white pl-14 pr-14 text-[16px] text-navy shadow-[0_18px_40px_-28px_rgba(8,8,62,0.45)] outline-none transition-all placeholder:text-muted/70 focus:border-navy focus:ring-4 focus:ring-gold/30 [&::-webkit-search-cancel-button]:hidden"
                />
                {q && (
                  <button
                    type="button"
                    onClick={() => setQ("")}
                    aria-label="Clear search"
                    className="absolute right-3 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-soft text-navy transition-colors hover:bg-navy hover:text-white"
                  >
                    <X className="h-4 w-4" aria-hidden />
                  </button>
                )}
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-2 text-[12.5px] text-muted">
                <span>Try:</span>
                {suggestions.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setQ(s)}
                    className={cn(
                      "rounded-full border px-3 py-1 font-medium capitalize transition-colors",
                      q.trim().toLowerCase() === s
                        ? "border-navy bg-navy text-white"
                        : "border-navy/15 bg-white text-navy hover:border-navy",
                    )}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Category navigation */}
      <div className="sticky top-[68px] z-30 border-y border-line bg-white/95 backdrop-blur">
        <Container>
          <div className="no-scrollbar -mx-5 flex gap-1 overflow-x-auto px-5 sm:-mx-8 sm:px-8 lg:mx-0 lg:px-0" role="tablist" aria-label="Product categories">
            {[{ id: "all", name: "All Products", count: products.length }, ...categories.map((c) => ({
              id: c.id,
              name: c.name,
              count: products.filter((p) => p.categoryId === c.id).length,
            }))].map((c) => {
              const active = category === c.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setCategory(c.id)}
                  className={cn(
                    "relative flex shrink-0 items-center gap-2 whitespace-nowrap px-3.5 py-[18px] text-[14px] transition-colors first:pl-0",
                    active ? "font-semibold text-navy" : "font-medium text-muted hover:text-navy",
                  )}
                >
                  {c.name}
                  <span
                    className={cn(
                      "rounded-full px-1.5 py-0.5 text-[11px] font-semibold tabular-nums leading-none transition-colors",
                      active ? "bg-gold text-navy" : "bg-soft text-muted",
                    )}
                  >
                    {c.count}
                  </span>
                  <span
                    aria-hidden
                    className={cn(
                      "absolute inset-x-3.5 bottom-0 h-[2px] origin-left bg-navy transition-transform duration-300",
                      c.id === "all" && "left-0",
                      active ? "scale-x-100" : "scale-x-0",
                    )}
                  />
                </button>
              );
            })}
          </div>
        </Container>
      </div>

      {/* Catalog */}
      <section className="bg-white">
        <Container className="grid gap-10 py-10 lg:grid-cols-[250px_1fr] lg:gap-12 lg:py-14">
          <aside className="hidden lg:block" aria-label="Filters">
            <div className="sticky top-[150px]">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="flex items-center gap-2.5 font-display text-[18px] font-extrabold text-navy">
                  <SlidersHorizontal className="h-4 w-4" aria-hidden /> Filters
                </h2>
                {hasFilters && (
                  <button type="button" onClick={reset} className="text-[13px] font-semibold text-navy underline decoration-gold decoration-2 underline-offset-4">
                    Reset
                  </button>
                )}
              </div>
              <FilterPanel activeSpecs={activeSpecs} toggleSpec={toggleSpec} featuredOnly={featuredOnly} setFeaturedOnly={setFeaturedOnly} />
            </div>
          </aside>

          <div className="min-w-0">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-5">
              <p className="text-[14.5px] text-muted" aria-live="polite">
                Showing{" "}
                <strong className="font-display text-[20px] font-extrabold tabular-nums text-navy">{results.length}</strong>{" "}
                of {products.length} sample products
              </p>
              <div className="flex w-full items-center gap-2 sm:w-auto">
                <button
                  type="button"
                  onClick={() => setDrawer(true)}
                  className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-[4px] border border-navy/20 px-4 text-[14px] font-semibold text-navy transition-colors hover:border-navy sm:flex-none lg:hidden"
                >
                  <SlidersHorizontal className="h-4 w-4" aria-hidden /> Filters
                  {filterCount > 0 && (
                    <span className="grid h-5 min-w-5 place-items-center rounded-full bg-gold px-1 text-[11px] font-bold">{filterCount}</span>
                  )}
                </button>
                <div className="relative flex-1 sm:flex-none">
                  <label htmlFor="shop-sort" className="sr-only">
                    Sort products
                  </label>
                  <select
                    id="shop-sort"
                    value={sort}
                    onChange={(e) => setSort(e.target.value as SortKey)}
                    className="h-11 w-full appearance-none rounded-[4px] border border-navy/20 bg-white pl-4 pr-10 text-[14px] font-semibold text-navy outline-none transition-colors hover:border-navy focus:border-navy focus:ring-4 focus:ring-gold/30 sm:w-[190px]"
                  >
                    {(Object.keys(sortLabels) as SortKey[]).map((k) => (
                      <option key={k} value={k}>
                        {sortLabels[k]}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-navy" aria-hidden />
                </div>
                <div className="hidden rounded-[4px] border border-navy/20 p-1 xl:flex" role="group" aria-label="Grid density">
                  <button
                    type="button"
                    aria-pressed={!dense}
                    aria-label="Comfortable grid"
                    onClick={() => setDense(false)}
                    className={cn("grid h-9 w-9 place-items-center rounded-[3px] transition-colors", !dense ? "bg-navy text-white" : "text-navy hover:bg-soft")}
                  >
                    <LayoutGrid className="h-4 w-4" aria-hidden />
                  </button>
                  <button
                    type="button"
                    aria-pressed={dense}
                    aria-label="Compact grid"
                    onClick={() => setDense(true)}
                    className={cn("grid h-9 w-9 place-items-center rounded-[3px] transition-colors", dense ? "bg-navy text-white" : "text-navy hover:bg-soft")}
                  >
                    <Grip className="h-4 w-4" aria-hidden />
                  </button>
                </div>
              </div>
            </div>

            {/* Active filters */}
            {hasFilters && (
              <div className="animate-fade flex flex-wrap items-center gap-2 pt-5">
                <span className="mr-1 text-[12.5px] font-medium text-muted">Active:</span>
                {category !== "all" && (
                  <button type="button" className={chipCls} onClick={() => setCategory("all")}>
                    {getCategory(category)?.name} <X className="h-3.5 w-3.5" aria-label="Remove" />
                  </button>
                )}
                {activeSpecs.map((s) => (
                  <button key={s} type="button" className={chipCls} onClick={() => toggleSpec(s)}>
                    {specialties.find((x) => x.slug === s)?.title} <X className="h-3.5 w-3.5" aria-label="Remove" />
                  </button>
                ))}
                {featuredOnly && (
                  <button type="button" className={chipCls} onClick={() => setFeaturedOnly(false)}>
                    Featured only <X className="h-3.5 w-3.5" aria-label="Remove" />
                  </button>
                )}
                {q.trim() && (
                  <button type="button" className={chipCls} onClick={() => setQ("")}>
                    “{q.trim()}” <X className="h-3.5 w-3.5" aria-label="Remove" />
                  </button>
                )}
                <button type="button" onClick={reset} className="ml-1 text-[12.5px] font-semibold text-navy underline decoration-gold decoration-2 underline-offset-4">
                  Clear all
                </button>
              </div>
            )}

            {/* Grid */}
            {results.length > 0 ? (
              <div className={cn("mt-7 grid gap-5 sm:grid-cols-2 sm:gap-6", dense ? "xl:grid-cols-4" : "xl:grid-cols-3")}>
                {results.map((p, i) => (
                  <div key={`${p.id}-${signature}`} className="animate-rise h-full" style={{ animationDelay: `${Math.min(i, 9) * 45}ms` }}>
                    <ProductCard product={p} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="animate-rise mt-7 rounded-md border border-dashed border-navy/20 bg-soft px-6 py-20 text-center">
                <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-white text-navy ring-1 ring-line">
                  <Search className="h-5 w-5" aria-hidden />
                </span>
                <h3 className="mt-6 font-display text-[24px] font-extrabold tracking-[-0.02em] text-navy">No sample products match</h3>
                <p className="mx-auto mt-2 max-w-sm text-[15px] leading-relaxed text-muted">
                  Try a different search or clear your filters. You can also ask the KCSS team directly.
                </p>
                <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
                  <Button variant="navy" onClick={reset}>
                    Clear all filters
                  </Button>
                  <Button to="/contact" variant="outline">
                    Contact KCSS
                  </Button>
                </div>
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* Mobile filter drawer */}
      {drawer && (
        <div className="fixed inset-0 z-[90] lg:hidden" role="dialog" aria-modal="true" aria-label="Filters">
          <button type="button" aria-label="Close filters" onClick={() => setDrawer(false)} className="animate-fade absolute inset-0 cursor-default bg-navy/60 backdrop-blur-sm" />
          <div className="animate-slide-in absolute inset-y-0 right-0 flex w-[90%] max-w-sm flex-col bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              <h2 className="flex items-center gap-2.5 font-display text-[18px] font-extrabold text-navy">
                <SlidersHorizontal className="h-4 w-4" aria-hidden /> Filters
              </h2>
              <button type="button" onClick={() => setDrawer(false)} aria-label="Close filters" className="grid h-10 w-10 place-items-center rounded-full bg-soft text-navy">
                <X className="h-4.5 w-4.5" aria-hidden />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-5">
              <FilterPanel activeSpecs={activeSpecs} toggleSpec={toggleSpec} featuredOnly={featuredOnly} setFeaturedOnly={setFeaturedOnly} />
            </div>
            <div className="grid grid-cols-[auto_1fr] gap-3 border-t border-line p-5">
              <Button variant="outline" onClick={reset}>
                Reset
              </Button>
              <Button variant="navy" onClick={() => setDrawer(false)}>
                Show {results.length} {results.length === 1 ? "product" : "products"}
              </Button>
            </div>
          </div>
        </div>
      )}

      <CtaBand
        eyebrow="Can't find what you need?"
        title={
          <>
            Ask the team. <span className="text-gold">We're glad to help.</span>
          </>
        }
        text="The online catalog is a starting point. Contact KCSS to ask about specific products and current availability."
      />
    </>
  );
}
