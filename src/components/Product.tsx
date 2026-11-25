import { useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, Eye } from "lucide-react";
import { Link } from "../lib/router";
import { useUI } from "../lib/ui";
import { cn } from "../utils/cn";
import { getCategory, type Product, type Shot } from "../data/catalog";
import { Img, Reveal } from "./ui";

/* ------------------------------------------------------------------
   Product card
------------------------------------------------------------------- */
export function ProductCard({ product }: { product: Product }) {
  const { openInquiry, openQuickView } = useUI();
  const category = getCategory(product.categoryId);

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-md border border-line bg-white transition-all duration-500 hover:-translate-y-1 hover:border-navy/15 hover:shadow-[0_30px_60px_-34px_rgba(8,8,62,0.4)]">
      <div className="relative aspect-square overflow-hidden bg-sand">
        <Link to={`/product/${product.id}`} aria-label={`View details: ${product.name}`} className="block h-full w-full">
          <Img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.05]"
          />
        </Link>

        <span className="pointer-events-none absolute left-3 top-3 max-w-[calc(100%-4.5rem)] truncate rounded-[3px] bg-white/95 px-2.5 py-1.5 text-[11px] font-semibold leading-none text-navy shadow-[0_1px_2px_rgba(8,8,62,0.12)]">
          {category?.name}
        </span>

        {/* Touch devices: always-visible preview button */}
        <button
          type="button"
          onClick={() => openQuickView(product.id)}
          aria-label={`Quick preview: ${product.name}`}
          className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/95 text-navy shadow-[0_1px_2px_rgba(8,8,62,0.12)] transition-colors hover:bg-navy hover:text-white lg:hidden"
        >
          <Eye className="h-4 w-4" aria-hidden />
        </button>

        {/* Pointer devices: preview bar revealed on hover */}
        <button
          type="button"
          onClick={() => openQuickView(product.id)}
          className="absolute inset-x-3 bottom-3 hidden h-11 translate-y-3 items-center justify-center gap-2 rounded-[4px] bg-navy/95 text-[13px] font-semibold text-white opacity-0 backdrop-blur transition-all duration-300 hover:bg-navy focus-visible:translate-y-0 focus-visible:opacity-100 group-hover:translate-y-0 group-hover:opacity-100 lg:flex"
        >
          <Eye className="h-4 w-4 text-gold" aria-hidden /> Quick preview
        </button>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
          <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-gold" />
          {product.ref} · Placeholder listing
        </p>
        <h3 className="mt-2.5 font-display text-[18px] font-bold leading-snug tracking-[-0.015em] text-navy">
          <Link to={`/product/${product.id}`} className="transition-colors hover:text-navy-700">
            {product.name}
          </Link>
        </h3>
        <p className="mt-2 text-[14px] leading-relaxed text-muted">{product.short}</p>

        <div className="mt-auto flex flex-wrap gap-2 pt-5">
          <Link
            to={`/product/${product.id}`}
            className="group/a inline-flex h-10 min-w-[118px] flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-[4px] bg-navy px-3 text-[13px] font-semibold text-white transition-colors duration-300 hover:bg-navy-700"
          >
            View Details
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/a:translate-x-0.5" aria-hidden />
          </Link>
          <button
            type="button"
            onClick={() => openInquiry(product.name)}
            className="inline-flex h-10 min-w-[158px] flex-1 items-center justify-center whitespace-nowrap rounded-[4px] border border-navy/20 px-3 text-[13px] font-semibold text-navy transition-colors duration-300 hover:border-gold hover:bg-gold"
          >
            Request Information
          </button>
        </div>
      </div>
    </article>
  );
}

export function ProductGrid({ items, className }: { items: Product[]; className?: string }) {
  return (
    <div className={cn("grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4", className)}>
      {items.map((p, i) => (
        <Reveal key={p.id} delay={(i % 4) * 70} className="h-full">
          <ProductCard product={p} />
        </Reveal>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------
   Image gallery with cross-fade transitions
------------------------------------------------------------------- */
function shotStyle(s: Shot) {
  return s.zoom ? { transform: `scale(${s.zoom})`, transformOrigin: s.origin ?? "50% 50%" } : undefined;
}

export function Gallery({ shots, compact }: { shots: Shot[]; compact?: boolean }) {
  const [index, setIndex] = useState(0);
  const total = shots.length;
  const go = (d: number) => setIndex((p) => (p + d + total) % total);

  return (
    <div>
      <div
        className="relative aspect-square overflow-hidden rounded-md bg-sand"
        tabIndex={0}
        role="group"
        aria-roledescription="image gallery"
        aria-label={`Image ${index + 1} of ${total}`}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") go(1);
          if (e.key === "ArrowLeft") go(-1);
        }}
      >
        {shots.map((s, i) => (
          <div
            key={`${s.label}-${i}`}
            aria-hidden={i !== index}
            className={cn(
              "absolute inset-0 transition-all duration-700 ease-out",
              i === index ? "scale-100 opacity-100" : "pointer-events-none scale-[1.04] opacity-0",
            )}
          >
            <Img src={s.src} alt={s.alt} eager className="h-full w-full object-cover" style={shotStyle(s)} />
          </div>
        ))}

        <span className="absolute left-4 top-4 rounded-[3px] bg-white/95 px-2.5 py-1.5 text-[11px] font-semibold uppercase leading-none tracking-[0.12em] text-navy shadow-sm">
          {shots[index].label}
        </span>

        <div className="absolute inset-x-4 bottom-4 flex items-center justify-between">
          <span className="rounded-[3px] bg-navy/90 px-2.5 py-1.5 font-display text-[12px] font-bold leading-none tracking-wider text-white backdrop-blur">
            {String(index + 1).padStart(2, "0")} <span className="text-white/50">/ {String(total).padStart(2, "0")}</span>
          </span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous image"
              className="grid h-10 w-10 place-items-center rounded-full bg-white text-navy shadow-md transition-colors hover:bg-gold"
            >
              <ChevronLeft className="h-4.5 w-4.5" aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next image"
              className="grid h-10 w-10 place-items-center rounded-full bg-white text-navy shadow-md transition-colors hover:bg-gold"
            >
              <ChevronRight className="h-4.5 w-4.5" aria-hidden />
            </button>
          </div>
        </div>
      </div>

      <div className={cn("mt-3 grid grid-cols-4", compact ? "gap-2" : "gap-3")}>
        {shots.map((s, i) => (
          <button
            key={`thumb-${i}`}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Show image ${i + 1}: ${s.label}`}
            aria-pressed={i === index}
            className={cn(
              "relative aspect-square overflow-hidden rounded-[4px] bg-sand transition-all duration-300",
              i === index
                ? "ring-2 ring-navy ring-offset-2 ring-offset-white"
                : "opacity-70 ring-1 ring-line hover:opacity-100",
            )}
          >
            <Img src={s.src} alt="" className="h-full w-full object-cover" style={shotStyle(s)} />
          </button>
        ))}
      </div>
    </div>
  );
}
