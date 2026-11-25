import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { ArrowRight, Camera, ChevronRight, ImageOff } from "lucide-react";
import { Link } from "../lib/router";
import { cn } from "../utils/cn";

/* ------------------------------------------------------------------
   Layout
------------------------------------------------------------------- */
export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("mx-auto w-full max-w-[1320px] px-5 sm:px-8 lg:px-12", className)}>{children}</div>;
}

/* ------------------------------------------------------------------
   Logo
   NOTE: stand-in wordmark. The official KCSS logo artwork was not
   available to the prototype — swap this single component for the
   supplied logo file and it updates everywhere (header, footer, menus).
------------------------------------------------------------------- */
export function Logo({ tone = "dark", className }: { tone?: "dark" | "light"; className?: string }) {
  const light = tone === "light";
  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <span
        aria-hidden
        className={cn(
          "grid h-11 w-11 shrink-0 grid-cols-2 grid-rows-2 place-items-center rounded-[5px] p-[7px] font-display text-[13px] font-extrabold leading-none",
          light ? "bg-white/[0.06] ring-1 ring-white/20" : "bg-navy",
        )}
      >
        <span className="text-white">K</span>
        <span className="text-white">C</span>
        <span className="text-gold">S</span>
        <span className="text-gold">S</span>
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-[23px] font-extrabold tracking-[-0.03em]",
            light ? "text-white" : "text-navy",
          )}
        >
          KCSS
        </span>
        <span
          className={cn(
            "mt-[5px] text-[9.5px] font-semibold uppercase tracking-[0.17em]",
            light ? "text-white/60" : "text-muted",
          )}
        >
          Specialty Durable Medical
        </span>
      </span>
    </span>
  );
}

/* ------------------------------------------------------------------
   Button
------------------------------------------------------------------- */
type Variant = "gold" | "goldOnDark" | "navy" | "outline" | "light";
type Size = "sm" | "md" | "lg";

const variantClass: Record<Variant, string> = {
  gold: "bg-gold text-navy hover:bg-navy hover:text-white",
  goldOnDark: "bg-gold text-navy hover:bg-white",
  navy: "bg-navy text-white hover:bg-navy-700",
  outline: "border border-navy/20 bg-transparent text-navy hover:border-navy hover:bg-navy hover:text-white",
  light: "border border-white/30 bg-transparent text-white hover:border-white hover:bg-white hover:text-navy",
};
const sizeClass: Record<Size, string> = {
  sm: "h-10 px-4 text-[13.5px]",
  md: "h-12 px-6 text-[15px]",
  lg: "h-14 px-7 text-[15.5px]",
};

type ButtonProps = {
  children: ReactNode;
  to?: string;
  href?: string;
  external?: boolean;
  onClick?: () => void;
  variant?: Variant;
  size?: Size;
  arrow?: boolean;
  icon?: ReactNode;
  type?: "button" | "submit";
  className?: string;
  ariaLabel?: string;
};

export function Button({
  children,
  to,
  href,
  external,
  onClick,
  variant = "gold",
  size = "md",
  arrow,
  icon,
  type = "button",
  className,
  ariaLabel,
}: ButtonProps) {
  const cls = cn(
    "group/btn inline-flex select-none items-center justify-center gap-2.5 whitespace-nowrap rounded-[4px] font-semibold tracking-[-0.005em] transition-all duration-300 active:scale-[0.985]",
    variantClass[variant],
    sizeClass[size],
    className,
  );
  const inner = (
    <>
      {icon}
      <span>{children}</span>
      {arrow && (
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" aria-hidden />
      )}
    </>
  );
  if (to)
    return (
      <Link to={to} className={cls} onClick={onClick} aria-label={ariaLabel}>
        {inner}
      </Link>
    );
  if (href)
    return (
      <a
        href={href}
        className={cls}
        onClick={onClick}
        aria-label={ariaLabel}
        {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
      >
        {inner}
      </a>
    );
  return (
    <button type={type} className={cls} onClick={onClick} aria-label={ariaLabel}>
      {inner}
    </button>
  );
}

/* ------------------------------------------------------------------
   Typography helpers
------------------------------------------------------------------- */
export function Eyebrow({
  children,
  tone = "dark",
  className,
}: {
  children: ReactNode;
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <p
      className={cn(
        "flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.18em]",
        tone === "light" ? "text-gold" : "text-navy",
        className,
      )}
    >
      <span aria-hidden className="h-px w-8 shrink-0 bg-gold" />
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  children,
  tone = "dark",
  className,
}: {
  eyebrow: string;
  title: ReactNode;
  children?: ReactNode;
  tone?: "dark" | "light";
  className?: string;
}) {
  const light = tone === "light";
  return (
    <div className={cn("max-w-2xl", className)}>
      <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
      <h2
        className={cn(
          "mt-5 font-display text-[32px] font-extrabold leading-[1.08] tracking-[-0.028em] sm:text-[40px] lg:text-[46px]",
          light ? "text-white" : "text-navy",
        )}
      >
        {title}
      </h2>
      {children && (
        <p className={cn("mt-5 text-[17px] leading-relaxed", light ? "text-white/70" : "text-muted")}>{children}</p>
      )}
    </div>
  );
}

export function Breadcrumbs({
  items,
  tone = "dark",
}: {
  items: { label: string; to?: string }[];
  tone?: "dark" | "light";
}) {
  const light = tone === "light";
  return (
    <nav aria-label="Breadcrumb">
      <ol className={cn("flex flex-wrap items-center gap-1.5 text-[13px]", light ? "text-white/60" : "text-muted")}>
        {items.map((item, i) => (
          <li key={item.label} className="flex items-center gap-1.5">
            {i > 0 && <ChevronRight className="h-3.5 w-3.5 opacity-50" aria-hidden />}
            {item.to ? (
              <Link to={item.to} className={cn("transition-colors", light ? "hover:text-gold" : "hover:text-navy")}>
                {item.label}
              </Link>
            ) : (
              <span className={cn("font-medium", light ? "text-white" : "text-navy")} aria-current="page">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/* ------------------------------------------------------------------
   Reveal on scroll (subtle fade-up, respects reduced motion)
------------------------------------------------------------------- */
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.05, rootMargin: "0px 0px -6% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn("reveal", shown && "is-visible", className)}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------
   Image with graceful fallback
------------------------------------------------------------------- */
export function Img({
  src,
  alt,
  className,
  style,
  eager,
}: {
  src: string;
  alt: string;
  className?: string;
  style?: CSSProperties;
  eager?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <div role="img" aria-label={alt} className={cn("flex items-center justify-center bg-sand text-navy/30", className)}>
        <ImageOff className="h-6 w-6" aria-hidden />
      </div>
    );
  }
  return (
    <img
      src={src}
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      onError={() => setFailed(true)}
      className={className}
      style={style}
    />
  );
}

/* ------------------------------------------------------------------
   Placeholders — used wherever authentic photography is still to come
------------------------------------------------------------------- */
export function PortraitPlaceholder({ className }: { className?: string }) {
  return (
    <div
      role="img"
      aria-label="Portrait placeholder for Natasha Belcher — photograph to be supplied"
      className={cn("relative overflow-hidden rounded-md bg-navy text-white", className)}
    >
      <div aria-hidden className="absolute inset-4 rounded-[3px] border border-gold/35" />
      <div aria-hidden className="absolute -right-24 -top-24 h-72 w-72 rounded-full border border-white/10" />
      <div aria-hidden className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full border border-white/10" />
      <div className="relative flex h-full flex-col items-center justify-center px-8 text-center">
        <span className="font-display text-[88px] font-extrabold leading-none tracking-[-0.05em] text-white">
          N<span className="text-gold">B</span>
        </span>
        <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/20 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/80">
          <Camera className="h-3.5 w-3.5 text-gold" aria-hidden /> Portrait placeholder
        </span>
        <span className="mt-3 max-w-[220px] text-[13px] leading-relaxed text-white/55">
          An authentic photograph of Natasha will be placed here.
        </span>
      </div>
    </div>
  );
}

export function PhotoPlaceholder({ label, className }: { label: string; className?: string }) {
  return (
    <div
      role="img"
      aria-label={`${label} — photograph to be supplied`}
      className={cn(
        "flex flex-col items-center justify-center rounded-md border border-dashed border-navy/25 bg-soft px-6 text-center",
        className,
      )}
    >
      <span className="grid h-11 w-11 place-items-center rounded-full bg-white text-navy shadow-sm ring-1 ring-line">
        <Camera className="h-4.5 w-4.5" aria-hidden />
      </span>
      <span className="mt-4 font-display text-[15px] font-bold text-navy">{label}</span>
      <span className="mt-1 text-[12.5px] text-muted">Photography placeholder</span>
    </div>
  );
}

/* ------------------------------------------------------------------
   Social icons (inline SVG — brand marks)
------------------------------------------------------------------- */
const svgProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg {...svgProps} className={className} aria-hidden>
      <rect x="2.5" y="2.5" width="19" height="19" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.4" cy="6.6" r="0.6" fill="currentColor" />
    </svg>
  );
}
export function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg {...svgProps} className={className} aria-hidden>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}
export function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg {...svgProps} className={className} aria-hidden>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export function SocialLinks({
  links,
  tone = "dark",
}: {
  links: { instagram: string; facebook: string; linkedin: string };
  tone?: "dark" | "light";
}) {
  const cls = cn(
    "grid h-11 w-11 place-items-center rounded-full border transition-all duration-300",
    tone === "light"
      ? "border-white/20 text-white hover:border-gold hover:bg-gold hover:text-navy"
      : "border-navy/15 text-navy hover:border-navy hover:bg-navy hover:text-white",
  );
  return (
    <div className="flex items-center gap-2.5">
      <a href={links.instagram} target="_blank" rel="noreferrer noopener" aria-label="KCSS on Instagram" className={cls}>
        <InstagramIcon className="h-[18px] w-[18px]" />
      </a>
      <a href={links.facebook} target="_blank" rel="noreferrer noopener" aria-label="KCSS on Facebook" className={cls}>
        <FacebookIcon className="h-[18px] w-[18px]" />
      </a>
      <a href={links.linkedin} target="_blank" rel="noreferrer noopener" aria-label="Natasha Belcher on LinkedIn" className={cls}>
        <LinkedinIcon className="h-[18px] w-[18px]" />
      </a>
    </div>
  );
}
