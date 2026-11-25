import { useCallback, useEffect, useId, useMemo, useState, type FormEvent, type ReactNode } from "react";
import { ArrowRight, Check, Info, Mail, Phone, Send, X } from "lucide-react";
import { UIContext } from "../lib/ui";
import { Link } from "../lib/router";
import { cn } from "../utils/cn";
import { business } from "../data/site";
import { categories, getCategory, getProduct } from "../data/catalog";
import { Button } from "./ui";
import { Gallery } from "./Product";

/* ------------------------------------------------------------------
   Modal shell
------------------------------------------------------------------- */
function Modal({
  onClose,
  label,
  wide,
  children,
}: {
  onClose: () => void;
  label: string;
  wide?: boolean;
  children: ReactNode;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={label}
    >
      <button
        type="button"
        aria-label="Close dialog"
        onClick={onClose}
        className="animate-fade absolute inset-0 cursor-default bg-navy/70 backdrop-blur-sm"
      />
      <div
        className={cn(
          "animate-rise relative max-h-[92dvh] w-full overflow-y-auto rounded-t-xl bg-white shadow-[0_40px_120px_-30px_rgba(5,5,43,0.7)] sm:rounded-md",
          wide ? "sm:max-w-[1040px]" : "sm:max-w-[620px]",
        )}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-soft text-navy transition-colors hover:bg-navy hover:text-white"
        >
          <X className="h-4.5 w-4.5" aria-hidden />
        </button>
        {children}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------
   Inquiry form (visual prototype — nothing is transmitted)
------------------------------------------------------------------- */
const fieldCls =
  "h-12 w-full rounded-[4px] border border-line bg-white px-4 text-[15px] text-navy placeholder:text-muted/60 outline-none transition-all duration-200 hover:border-navy/30 focus:border-navy focus:ring-4 focus:ring-gold/25";
const labelCls = "mb-2 block text-[13px] font-semibold text-navy";

export function InquiryForm({ subject, onDone }: { subject?: string; onDone?: () => void }) {
  const uid = useId();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [topic, setTopic] = useState("General question");
  const [method, setMethod] = useState<"Phone" | "Email">("Phone");
  const [message, setMessage] = useState(subject ? `I would like more information about: ${subject}.` : "");
  const [sent, setSent] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  if (sent) {
    return (
      <div className="animate-rise py-4 text-center sm:py-8">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-gold text-navy">
          <Check className="h-6 w-6" strokeWidth={2.5} aria-hidden />
        </span>
        <h3 className="mt-6 font-display text-[26px] font-extrabold tracking-[-0.02em] text-navy">
          Thank you{name ? `, ${name.split(" ")[0]}` : ""}.
        </h3>
        <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-muted">
          This is how the confirmation will look. Because this is a design prototype, your message has{" "}
          <strong className="font-semibold text-navy">not been sent</strong>. To reach KCSS today, please call or email
          directly.
        </p>
        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <Button href={business.phoneHref} variant="navy" icon={<Phone className="h-4 w-4" aria-hidden />}>
            Call {business.phone}
          </Button>
          <Button href={business.emailHref} variant="outline" icon={<Mail className="h-4 w-4" aria-hidden />}>
            Email KCSS
          </Button>
        </div>
        <button
          type="button"
          onClick={() => {
            setSent(false);
            onDone?.();
          }}
          className="mt-6 text-[13.5px] font-semibold text-navy underline decoration-gold decoration-2 underline-offset-4"
        >
          {onDone ? "Close" : "Send another inquiry"}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="grid gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={`${uid}-name`} className={labelCls}>
            Full name <span className="text-gold-600">*</span>
          </label>
          <input
            id={`${uid}-name`}
            required
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className={fieldCls}
          />
        </div>
        <div>
          <label htmlFor={`${uid}-email`} className={labelCls}>
            Email <span className="text-gold-600">*</span>
          </label>
          <input
            id={`${uid}-email`}
            required
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className={fieldCls}
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={`${uid}-phone`} className={labelCls}>
            Phone <span className="font-normal text-muted">(optional)</span>
          </label>
          <input
            id={`${uid}-phone`}
            type="tel"
            autoComplete="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="(000) 000-0000"
            className={fieldCls}
          />
        </div>
        <div>
          <label htmlFor={`${uid}-topic`} className={labelCls}>
            I'm interested in
          </label>
          <select
            id={`${uid}-topic`}
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className={cn(fieldCls, "appearance-none bg-[length:16px] bg-[right_1rem_center] bg-no-repeat pr-10")}
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2308083E' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
            }}
          >
            <option>General question</option>
            {categories.map((c) => (
              <option key={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
      </div>

      <fieldset>
        <legend className={labelCls}>Preferred contact method</legend>
        <div className="grid grid-cols-2 gap-3">
          {(["Phone", "Email"] as const).map((m) => (
            <button
              key={m}
              type="button"
              role="radio"
              aria-checked={method === m}
              onClick={() => setMethod(m)}
              className={cn(
                "flex h-12 items-center justify-center gap-2 rounded-[4px] border text-[14px] font-semibold transition-all duration-200",
                method === m
                  ? "border-navy bg-navy text-white"
                  : "border-line bg-white text-navy hover:border-navy/40",
              )}
            >
              {m === "Phone" ? <Phone className="h-4 w-4" aria-hidden /> : <Mail className="h-4 w-4" aria-hidden />}
              {m}
            </button>
          ))}
        </div>
      </fieldset>

      <div>
        <label htmlFor={`${uid}-msg`} className={labelCls}>
          How can we help? <span className="text-gold-600">*</span>
        </label>
        <textarea
          id={`${uid}-msg`}
          required
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tell us which products or categories you would like to know more about."
          className={cn(fieldCls, "h-auto resize-y py-3 leading-relaxed")}
        />
      </div>

      <p className="flex gap-3 rounded-[4px] bg-soft p-4 text-[13px] leading-relaxed text-muted">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-navy" aria-hidden />
        <span>
          Please do not include personal medical or insurance details in this form. The team will follow up to discuss
          specifics with you directly.
        </span>
      </p>

      <Button type="submit" variant="gold" size="lg" className="w-full" icon={<Send className="h-4 w-4" aria-hidden />}>
        Send Inquiry
      </Button>
    </form>
  );
}

/* ------------------------------------------------------------------
   Quick preview
------------------------------------------------------------------- */
function QuickView({
  productId,
  onClose,
  onInquire,
}: {
  productId: string;
  onClose: () => void;
  onInquire: (subject: string) => void;
}) {
  const product = getProduct(productId);
  if (!product) return null;
  const category = getCategory(product.categoryId);

  return (
    <div className="grid gap-8 p-5 pt-16 sm:p-8 md:grid-cols-2 md:gap-10 md:pt-8">
      <Gallery key={product.id} shots={product.gallery} compact />
      <div className="flex flex-col md:pr-8 md:pt-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-[3px] bg-navy px-2.5 py-1.5 text-[11px] font-semibold leading-none text-white">
            {category?.name}
          </span>
          <span className="rounded-[3px] bg-gold-100 px-2.5 py-1.5 text-[11px] font-semibold leading-none text-navy">
            {product.ref} · Placeholder
          </span>
        </div>
        <h3 className="mt-5 font-display text-[30px] font-extrabold leading-[1.1] tracking-[-0.025em] text-navy">
          {product.name}
        </h3>
        <p className="mt-4 text-[16px] leading-relaxed text-navy/80">{product.short}</p>
        <p className="mt-3 text-[14px] leading-relaxed text-muted">{product.detail}</p>

        <ul className="mt-6 grid gap-2.5 border-t border-line pt-6 text-[14px] text-navy">
          {category?.ask.map((a) => (
            <li key={a} className="flex items-center gap-3">
              <span className="grid h-5 w-5 place-items-center rounded-full bg-gold-100">
                <Check className="h-3 w-3" strokeWidth={3} aria-hidden />
              </span>
              Ask about: {a.charAt(0).toLowerCase() + a.slice(1)}
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-col gap-3 md:mt-auto md:pt-8">
          <Button variant="gold" size="lg" className="w-full" onClick={() => onInquire(product.name)}>
            Request Information
          </Button>
          <Link
            to={`/product/${product.id}`}
            onClick={onClose}
            className="group inline-flex h-12 items-center justify-center gap-2 rounded-[4px] border border-navy/20 text-[15px] font-semibold text-navy transition-colors hover:border-navy hover:bg-navy hover:text-white"
          >
            View full details
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------
   Provider
------------------------------------------------------------------- */
export function UIProvider({ children }: { children: ReactNode }) {
  const [inquiry, setInquiry] = useState<{ open: boolean; subject?: string }>({ open: false });
  const [quickId, setQuickId] = useState<string | null>(null);

  const openInquiry = useCallback((subject?: string) => {
    setQuickId(null);
    setInquiry({ open: true, subject });
  }, []);
  const openQuickView = useCallback((id: string) => setQuickId(id), []);
  const closeInquiry = useCallback(() => setInquiry({ open: false }), []);
  const closeQuick = useCallback(() => setQuickId(null), []);

  const value = useMemo(() => ({ openInquiry, openQuickView }), [openInquiry, openQuickView]);

  return (
    <UIContext.Provider value={value}>
      {children}

      {quickId && (
        <Modal onClose={closeQuick} label="Product quick preview" wide>
          <QuickView productId={quickId} onClose={closeQuick} onInquire={openInquiry} />
        </Modal>
      )}

      {inquiry.open && (
        <Modal onClose={closeInquiry} label="Request information">
          <div className="p-6 pt-8 sm:p-10">
            <p className="flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.18em] text-navy">
              <span aria-hidden className="h-px w-8 bg-gold" /> Request information
            </p>
            <h2 className="mt-4 pr-10 font-display text-[28px] font-extrabold leading-[1.1] tracking-[-0.025em] text-navy sm:text-[32px]">
              {inquiry.subject ? "Ask about this product" : "How can the KCSS team help?"}
            </h2>
            {inquiry.subject ? (
              <p className="mt-4 inline-flex max-w-full items-center gap-2 rounded-[4px] bg-soft px-3 py-2 text-[13.5px] text-navy">
                <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                <span className="truncate font-semibold">{inquiry.subject}</span>
              </p>
            ) : (
              <p className="mt-3 text-[15px] leading-relaxed text-muted">
                Send a short note and the team will follow up, or call {business.phone}.
              </p>
            )}
            <div className="mt-7">
              <InquiryForm key={inquiry.subject ?? "general"} subject={inquiry.subject} onDone={closeInquiry} />
            </div>
          </div>
        </Modal>
      )}
    </UIContext.Provider>
  );
}
