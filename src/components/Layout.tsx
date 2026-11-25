import { useEffect, useState } from "react";
import { ArrowRight, ArrowUpRight, ChevronDown, Mail, MapPin, Menu, Phone, Printer, X } from "lucide-react";
import { Link, useRoute } from "../lib/router";
import { cn } from "../utils/cn";
import { business, navLinks } from "../data/site";
import { specialties } from "../data/catalog";
import { Button, Container, Img, Logo, SocialLinks } from "./ui";

/* ------------------------------------------------------------------
   Header
------------------------------------------------------------------- */
export function Header() {
  const route = useRoute();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 44);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [route.path, route.search]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (to: string) => {
    if (to === "/") return route.path === "/";
    if (to === "/shop") return route.path.startsWith("/shop") || route.path.startsWith("/product");
    return route.path.startsWith(to);
  };

  return (
    <>
      {/* Utility bar */}
      <div className="hidden bg-navy text-white/75 lg:block">
        <Container className="flex h-10 items-center justify-between text-[12.5px]">
          <p className="flex items-center gap-3">
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-gold" />
            <span>
              Formerly <span className="font-semibold text-white">{business.former}</span>
            </span>
            <span aria-hidden className="text-white/25">
              /
            </span>
            <span>Diabetic Supplies · Functional Orthotics · Lymphedema Compressions</span>
          </p>
          <div className="flex items-center gap-7">
            <a href={business.emailHref} className="inline-flex items-center gap-2 transition-colors hover:text-gold">
              <Mail className="h-3.5 w-3.5" aria-hidden /> {business.email}
            </a>
            <a
              href={business.directions}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 transition-colors hover:text-gold"
            >
              <MapPin className="h-3.5 w-3.5" aria-hidden /> Shawnee, Kansas
            </a>
          </div>
        </Container>
      </div>

      {/* Main navigation */}
      <header
        className={cn(
          "sticky top-0 z-50 border-b bg-white/90 backdrop-blur-md transition-[box-shadow,border-color] duration-300",
          scrolled || open ? "border-line shadow-[0_10px_30px_-20px_rgba(8,8,62,0.4)]" : "border-transparent",
        )}
      >
        <Container
          className={cn(
            "flex items-center justify-between gap-6 transition-[height] duration-300",
            scrolled ? "h-[68px]" : "h-[68px] lg:h-[86px]",
          )}
        >
          <Link to="/" aria-label="KCSS Specialty Durable Medical — home" className="shrink-0">
            <Logo />
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex xl:gap-10">
            {navLinks.map((l) => {
              const active = isActive(l.to);
              const linkCls = cn(
                "relative inline-flex items-center gap-1 py-2 text-[14.5px] font-medium transition-colors duration-200",
                active ? "text-navy" : "text-navy/65 hover:text-navy",
              );
              const underline = (
                <span
                  aria-hidden
                  className={cn(
                    "absolute inset-x-0 -bottom-0.5 h-[2px] origin-left bg-gold transition-transform duration-300",
                    active ? "scale-x-100" : "scale-x-0 group-hover/nav:scale-x-100",
                  )}
                />
              );
              if (l.to !== "/specialties") {
                return (
                  <Link key={l.to} to={l.to} className={cn(linkCls, "group/nav")} aria-current={active ? "page" : undefined}>
                    {l.label}
                    {underline}
                  </Link>
                );
              }
              return (
                <div key={l.to} className="group/menu relative">
                  <Link to={l.to} className={cn(linkCls, "group/nav")} aria-current={active ? "page" : undefined} aria-haspopup="true">
                    {l.label}
                    <ChevronDown className="h-3.5 w-3.5 transition-transform duration-300 group-hover/menu:rotate-180" aria-hidden />
                    {underline}
                  </Link>
                  <div className="invisible absolute left-1/2 top-full w-[600px] -translate-x-1/2 translate-y-2 pt-4 opacity-0 transition-all duration-300 group-focus-within/menu:visible group-focus-within/menu:translate-y-0 group-focus-within/menu:opacity-100 group-hover/menu:visible group-hover/menu:translate-y-0 group-hover/menu:opacity-100">
                    <div className="overflow-hidden rounded-md border border-line bg-white shadow-[0_30px_80px_-30px_rgba(8,8,62,0.45)]">
                      <div className="grid grid-cols-2 gap-1 p-3">
                        {specialties.map((s) => (
                          <Link
                            key={s.slug}
                            to={`/specialties/${s.slug}`}
                            className="group/item flex items-center gap-4 rounded-[4px] p-3 transition-colors hover:bg-soft"
                          >
                            <span className="h-14 w-14 shrink-0 overflow-hidden rounded-[4px] bg-sand">
                              <Img src={s.cardImage} alt="" className="h-full w-full object-cover transition-transform duration-500 group-hover/item:scale-110" />
                            </span>
                            <span>
                              <span className="block text-[10.5px] font-semibold tracking-[0.16em] text-muted">{s.index}</span>
                              <span className="mt-0.5 block font-display text-[15px] font-bold leading-tight text-navy">
                                {s.title}
                              </span>
                            </span>
                          </Link>
                        ))}
                      </div>
                      <Link
                        to="/specialties"
                        className="group/all flex items-center justify-between border-t border-line bg-soft px-6 py-3.5 text-[13.5px] font-semibold text-navy transition-colors hover:bg-gold"
                      >
                        View all specialties
                        <ArrowRight className="h-4 w-4 transition-transform group-hover/all:translate-x-1" aria-hidden />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </nav>

          <div className="flex items-center gap-2 lg:gap-5">
            <a
              href={business.phoneHref}
              className="hidden items-center gap-2.5 text-[14.5px] font-semibold text-navy transition-colors hover:text-navy-700 lg:inline-flex"
            >
              <span className="grid h-8 w-8 place-items-center rounded-full bg-gold-100">
                <Phone className="h-3.5 w-3.5" aria-hidden />
              </span>
              {business.phone}
            </a>
            <Button to="/contact" variant="gold" size="sm" className="hidden px-5 sm:inline-flex">
              Contact Us
            </Button>
            <a
              href={business.phoneHref}
              aria-label={`Call KCSS at ${business.phone}`}
              className="grid h-10 w-10 place-items-center rounded-[4px] border border-line text-navy transition-colors hover:border-navy lg:hidden"
            >
              <Phone className="h-4 w-4" aria-hidden />
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="grid h-10 w-10 place-items-center rounded-[4px] bg-navy text-white transition-colors hover:bg-navy-700 lg:hidden"
            >
              {open ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
            </button>
          </div>
        </Container>
      </header>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={cn(
          "fixed inset-x-0 bottom-0 top-[68px] z-40 overflow-y-auto bg-white transition-all duration-300 lg:hidden",
          open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-3 opacity-0",
        )}
      >
        <Container className="flex min-h-full flex-col py-6">
          <nav aria-label="Mobile">
            <ul className="divide-y divide-line border-y border-line">
              {navLinks.map((l, i) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between py-4"
                    aria-current={isActive(l.to) ? "page" : undefined}
                  >
                    <span className="flex items-baseline gap-4">
                      <span className="w-5 text-[11px] font-semibold tracking-[0.14em] text-muted">0{i + 1}</span>
                      <span
                        className={cn(
                          "font-display text-[26px] font-extrabold tracking-[-0.025em] text-navy",
                          isActive(l.to) && "mark-gold",
                        )}
                      >
                        {l.label}
                      </span>
                    </span>
                    <ArrowUpRight className="h-5 w-5 text-navy/40" aria-hidden />
                  </Link>
                  {l.to === "/specialties" && (
                    <ul className="grid gap-1 pb-4 pl-9">
                      {specialties.map((s) => (
                        <li key={s.slug}>
                          <Link
                            to={`/specialties/${s.slug}`}
                            onClick={() => setOpen(false)}
                            className="flex items-center gap-3 py-2 text-[15px] font-medium text-navy/75"
                          >
                            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-gold" /> {s.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-8 grid gap-3">
            <Button href={business.phoneHref} variant="navy" size="lg" className="w-full" icon={<Phone className="h-4 w-4" aria-hidden />}>
              Call {business.phone}
            </Button>
            <Button to="/contact" variant="gold" size="lg" className="w-full" arrow onClick={() => setOpen(false)}>
              Contact Us
            </Button>
          </div>

          <div className="mt-auto pt-10 text-[13.5px] leading-relaxed text-muted">
            <p className="font-semibold text-navy">{business.name}</p>
            <p>{business.address.line1}</p>
            <p>{business.address.line2}</p>
            <div className="mt-5">
              <SocialLinks links={business.social} />
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}

/* ------------------------------------------------------------------
   Footer
------------------------------------------------------------------- */
export function Footer() {
  const headCls = "text-[11.5px] font-semibold uppercase tracking-[0.18em] text-gold";
  const linkCls = "text-[14.5px] text-white/70 transition-colors duration-200 hover:text-white";

  return (
    <footer className="bg-navy-950 text-white">
      <Container className="pb-10 pt-16 lg:pt-24">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <Link to="/" aria-label="KCSS home">
              <Logo tone="light" />
            </Link>
            <p className="mt-6 max-w-sm text-[14.5px] leading-relaxed text-white/65">
              {business.name}, formerly {business.former}, is a specialty durable medical equipment business in
              Shawnee, Kansas — focused on diabetic supplies, functional orthotics and lymphedema compressions.
            </p>
            <div className="mt-7">
              <SocialLinks links={business.social} tone="light" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10 lg:col-span-4 lg:col-start-6">
            <div>
              <h3 className={headCls}>Navigate</h3>
              <ul className="mt-5 grid gap-3">
                {navLinks.map((l) => (
                  <li key={l.to}>
                    <Link to={l.to} className={linkCls}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className={headCls}>Specialties</h3>
              <ul className="mt-5 grid gap-3">
                {specialties.map((s) => (
                  <li key={s.slug}>
                    <Link to={`/specialties/${s.slug}`} className={linkCls}>
                      {s.cardTitle}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-3">
            <h3 className={headCls}>Contact</h3>
            <ul className="mt-5 grid gap-4 text-[14.5px]">
              <li>
                <a href={business.phoneHref} className="group flex items-start gap-3 text-white/70 hover:text-white">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden />
                  <span>
                    <span className="block text-[11px] uppercase tracking-[0.14em] text-white/40">Phone</span>
                    <span className="font-display text-[17px] font-bold text-white">{business.phone}</span>
                  </span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-white/70">
                <Printer className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden />
                <span>
                  <span className="block text-[11px] uppercase tracking-[0.14em] text-white/40">Fax</span>
                  {business.fax}
                </span>
              </li>
              <li>
                <a href={business.emailHref} className="flex items-start gap-3 text-white/70 hover:text-white">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden />
                  <span>
                    <span className="block text-[11px] uppercase tracking-[0.14em] text-white/40">Email</span>
                    {business.email}
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={business.directions}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex items-start gap-3 text-white/70 hover:text-white"
                >
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden />
                  <span>
                    <span className="block text-[11px] uppercase tracking-[0.14em] text-white/40">Address</span>
                    {business.address.line1}
                    <br />
                    {business.address.line2}
                    <br />
                    {business.address.country}
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-7 text-[12.5px] text-white/45 lg:flex-row lg:items-center lg:justify-between">
          <p>
            © {new Date().getFullYear()} {business.name}. Formerly {business.former}.
          </p>
          <p className="max-w-2xl lg:text-right">
            Website redesign concept. Product listings are sample placeholders and photography is representative —
            actual products and availability to be confirmed by KCSS.
          </p>
        </div>
      </Container>
    </footer>
  );
}
