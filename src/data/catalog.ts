import { img } from "./images";

/* ------------------------------------------------------------------
   Types
------------------------------------------------------------------- */
export type Shot = { src: string; alt: string; label: string; zoom?: number; origin?: string };

export type Category = {
  id: string;
  name: string;
  specialty: string;
  description: string;
  image: string;
  ask: string[];
};

export type Product = {
  id: string;
  ref: string;
  name: string;
  categoryId: string;
  short: string;
  detail: string;
  image: string;
  gallery: Shot[];
  featured: boolean;
};

export type Specialty = {
  slug: string;
  index: string;
  title: string;
  cardTitle: string;
  cardText: string;
  headline: string;
  intro: string;
  statement: string;
  body: string[];
  points: { title: string; text: string }[];
  note: string;
  heroImage: string;
  heroAlt: string;
  heroPortrait?: boolean;
  cardImage: string;
  sideImage: string;
  sideAlt: string;
  categoryIds: string[];
};

/* ------------------------------------------------------------------
   Categories — the six confirmed starting categories for the catalog
------------------------------------------------------------------- */
export const categories: Category[] = [
  {
    id: "diabetic-shoes",
    name: "Diabetic Shoes",
    specialty: "diabetic-footwear",
    description: "Everyday diabetic footwear styles, presented for easy browsing.",
    image: img.pShoeBlack,
    ask: ["Styles currently available", "Sizes and widths", "Fitting and next steps"],
  },
  {
    id: "diabetic-inserts",
    name: "Diabetic Inserts",
    specialty: "diabetic-footwear",
    description: "Inserts intended to be paired with diabetic footwear.",
    image: img.pInsoles,
    ask: ["Insert options available", "Pairing inserts with footwear", "How to get started"],
  },
  {
    id: "custom-diabetic",
    name: "Custom Diabetic Shoes & Inserts",
    specialty: "diabetic-footwear",
    description: "Custom-made shoes and inserts, discussed one-to-one with the KCSS team.",
    image: img.pCustomInsert,
    ask: ["How the custom process works", "What information is helpful to bring", "Expected next steps"],
  },
  {
    id: "functional-orthotics",
    name: "Functional Orthotics",
    specialty: "functional-orthotics",
    description: "Functional orthotic products — a core KCSS specialty.",
    image: img.pOrthotic,
    ask: ["Orthotic options available", "How orthotics are selected", "Fitting and follow-up"],
  },
  {
    id: "lymphedema-compression",
    name: "Lymphedema Compression",
    specialty: "lymphedema-compression",
    description: "Compression stockings, sleeves and related garments.",
    image: img.pStockings,
    ask: ["Garment types available", "Sizing and measurement", "Ordering and next steps"],
  },
  {
    id: "glucose-monitoring",
    name: "Blood Glucose Monitors & Supplies",
    specialty: "diabetic-supplies",
    description: "Blood glucose monitors and the everyday supplies that go with them.",
    image: img.glucoseMeter,
    ask: ["Monitors and supplies available", "Compatible supplies", "How to request products"],
  },
];

/* ------------------------------------------------------------------
   Sample products — clearly identified placeholders.
   No brands, prices, availability or medical specifications are invented.
------------------------------------------------------------------- */
const STANDARD_DETAIL =
  "This is a sample listing created for the website concept. Final product names, options and availability will be confirmed by KCSS before publication.";

type Seed = Omit<Product, "gallery" | "detail" | "ref"> & {
  detail?: string;
  focus: [string, string];
  context: { src: string; alt: string };
};

const seeds: Seed[] = [
  {
    id: "lace-up-walking-shoe",
    name: "Lace-Up Walking Shoe",
    categoryId: "diabetic-shoes",
    short: "A classic lace-up style representing the everyday diabetic shoe range.",
    image: img.pShoeBlack,
    featured: true,
    focus: ["32% 52%", "74% 62%"],
    context: { src: img.hero, alt: "Still life of comfort shoes, insoles and compression stockings" },
  },
  {
    id: "adjustable-strap-knit-shoe",
    name: "Adjustable Strap Knit Shoe",
    categoryId: "diabetic-shoes",
    short: "A soft knit style with an adjustable strap closure, shown as a sample listing.",
    image: img.pShoeStrap,
    featured: true,
    focus: ["40% 55%", "72% 48%"],
    context: { src: img.hero, alt: "Still life of comfort shoes, insoles and compression stockings" },
  },
  {
    id: "slip-on-leather-shoe",
    name: "Slip-On Leather Shoe",
    categoryId: "diabetic-shoes",
    short: "An easy slip-on style in navy, representing dressier everyday options.",
    image: img.pShoeNavy,
    featured: false,
    focus: ["36% 50%", "70% 58%"],
    context: { src: img.hero, alt: "Still life of comfort shoes, insoles and compression stockings" },
  },
  {
    id: "cushioned-full-length-insert",
    name: "Cushioned Full-Length Insert",
    categoryId: "diabetic-inserts",
    short: "A full-length insert shown to represent the diabetic insert range.",
    image: img.pInsoles,
    featured: true,
    focus: ["36% 30%", "66% 72%"],
    context: { src: img.pInsolesGrey, alt: "A pair of contoured inserts displayed upright" },
  },
  {
    id: "contoured-insert",
    name: "Contoured Insert",
    categoryId: "diabetic-inserts",
    short: "A contoured insert profile, presented as a sample of this category.",
    image: img.pInsolesGrey,
    featured: false,
    focus: ["42% 34%", "58% 72%"],
    context: { src: img.pInsoles, alt: "A pair of full-length inserts photographed from above" },
  },
  {
    id: "custom-molded-insert",
    name: "Custom-Molded Insert",
    categoryId: "custom-diabetic",
    short: "An insert made to an individual impression. Ask KCSS how the custom process works.",
    image: img.pCustomInsert,
    featured: true,
    focus: ["26% 66%", "62% 38%"],
    context: { src: img.shoeLasts, alt: "Rows of shoe lasts in a custom footwear workshop" },
  },
  {
    id: "custom-diabetic-shoe",
    name: "Custom Diabetic Shoe",
    categoryId: "custom-diabetic",
    short: "Custom footwear that begins with an individual foot impression.",
    image: img.pCustomImpression,
    featured: false,
    focus: ["46% 46%", "78% 80%"],
    context: { src: img.wCustom, alt: "Workbench with a foot impression, shoe last and molded insert" },
  },
  {
    id: "functional-orthotic",
    name: "Functional Orthotic",
    categoryId: "functional-orthotics",
    short: "A contoured functional orthotic, shown as a sample of the orthotics range.",
    image: img.pOrthotic,
    featured: true,
    focus: ["34% 54%", "70% 44%"],
    context: { src: img.interior, alt: "Bright specialty footwear boutique with a fitting bench" },
  },
  {
    id: "low-profile-orthotic",
    name: "Low-Profile Orthotic",
    categoryId: "functional-orthotics",
    short: "A slimmer orthotic profile, presented as a second sample style.",
    image: img.pOrthoticSingle,
    featured: false,
    focus: ["30% 60%", "74% 36%"],
    context: { src: img.pOrthotic, alt: "A pair of functional orthotics on a neutral surface" },
  },
  {
    id: "knee-high-compression-stocking",
    name: "Knee-High Compression Stocking",
    categoryId: "lymphedema-compression",
    short: "A knee-high garment representing the compression stocking range.",
    image: img.pStockings,
    featured: false,
    focus: ["42% 28%", "50% 74%"],
    context: { src: img.knitGarment, alt: "Close-up of a knit compression garment being adjusted" },
  },
  {
    id: "compression-arm-sleeve-gauntlet",
    name: "Compression Arm Sleeve & Gauntlet",
    categoryId: "lymphedema-compression",
    short: "An arm sleeve with matching gauntlet, shown as a sample upper-limb garment.",
    image: img.pSleeve,
    featured: true,
    focus: ["42% 30%", "62% 58%"],
    context: { src: img.pStockings, alt: "Beige knee-high compression stockings laid flat" },
  },
  {
    id: "knit-compression-garment",
    name: "Knit Compression Garment",
    categoryId: "lymphedema-compression",
    short: "A knit garment shown in use, representing additional compression options.",
    image: img.knitGarment,
    featured: true,
    focus: ["50% 55%", "40% 30%"],
    context: { src: img.wStockings, alt: "Beige knee-high compression stockings laid flat" },
  },
  {
    id: "blood-glucose-monitor",
    name: "Blood Glucose Monitor",
    categoryId: "glucose-monitoring",
    short: "A handheld monitor shown as a sample of the blood glucose monitoring range.",
    image: img.glucoseMeter,
    featured: false,
    focus: ["48% 48%", "60% 40%"],
    context: { src: img.glucoseHands, alt: "Hands holding a blood glucose monitor" },
  },
  {
    id: "lancets-lancing-device",
    name: "Lancets & Lancing Device",
    categoryId: "glucose-monitoring",
    short: "Everyday testing supplies, presented as a sample listing.",
    image: img.glucoseLancets,
    featured: true,
    focus: ["30% 60%", "56% 40%"],
    context: { src: img.glucoseHands, alt: "Hands holding a blood glucose monitor" },
  },
  {
    id: "monitoring-supplies-set",
    name: "Monitoring Supplies Set",
    categoryId: "glucose-monitoring",
    short: "Monitoring supplies grouped together to represent this category.",
    image: img.glucoseHands,
    featured: false,
    focus: ["70% 40%", "30% 60%"],
    context: { src: img.glucoseMeter, alt: "Blood glucose monitor with test strip and lancing device" },
  },
];

export const products: Product[] = seeds.map((s, i) => ({
  id: s.id,
  ref: `Sample ${String(i + 1).padStart(2, "0")}`,
  name: s.name,
  categoryId: s.categoryId,
  short: s.short,
  detail: s.detail ?? STANDARD_DETAIL,
  image: s.image,
  featured: s.featured,
  gallery: [
    { src: s.image, alt: s.name, label: "Overview" },
    { src: s.image, alt: `${s.name} — detail view`, label: "Detail 01", zoom: 1.9, origin: s.focus[0] },
    { src: s.image, alt: `${s.name} — second detail view`, label: "Detail 02", zoom: 1.9, origin: s.focus[1] },
    { src: s.context.src, alt: s.context.alt, label: "Category" },
  ],
}));

/* ------------------------------------------------------------------
   Specialties — four landing pages
------------------------------------------------------------------- */
export const specialties: Specialty[] = [
  {
    slug: "diabetic-footwear",
    index: "01",
    title: "Diabetic Footwear & Inserts",
    cardTitle: "Diabetic Shoes & Inserts",
    cardText: "Diabetic shoes, inserts and custom options, explored with one-to-one attention.",
    headline: "Footwear and inserts, chosen with care.",
    intro:
      "Explore diabetic shoes, inserts and custom options with a team that takes the time to understand what you are looking for.",
    statement: "As the business formerly known as KC Shoe Stop, footwear is a natural part of who we are.",
    body: [
      "Customers who knew us as KC Shoe Stop will find diabetic footwear front and center at KCSS Specialty Durable Medical today.",
      "Browse representative styles below, then talk with the team about what is currently available and what may be right for you.",
    ],
    points: [
      { title: "Diabetic shoes", text: "Everyday styles presented clearly, so it is easy to see what the range looks like." },
      { title: "Diabetic inserts", text: "Inserts intended to be paired with diabetic footwear — ask about the options." },
      { title: "Custom shoes & inserts", text: "Custom-made options, discussed directly with the KCSS team." },
    ],
    note:
      "Product selection, sizing and suitability are discussed directly with the KCSS team. Information on this page is general and is not medical advice.",
    heroImage: img.wShoeNavy,
    heroAlt: "A pair of navy leather slip-on comfort shoes",
    cardImage: img.pShoeNavy,
    sideImage: img.wCustom,
    sideAlt: "Workbench with a foot impression, shoe last and molded insert",
    categoryIds: ["diabetic-shoes", "diabetic-inserts", "custom-diabetic"],
  },
  {
    slug: "functional-orthotics",
    index: "02",
    title: "Functional Orthotics",
    cardTitle: "Functional Orthotics",
    cardText: "Functional orthotic products presented with clarity, backed by personal guidance.",
    headline: "Functional orthotics, presented with clarity.",
    intro:
      "Take a closer look at functional orthotic products and talk with KCSS about the options that fit your needs.",
    statement: "A specialty we name on our card — and treat with the attention it deserves.",
    body: [
      "Functional orthotics are one of the specialties KCSS is known for. This page offers a simple, uncluttered look at the category.",
      "Every person is different, so the most useful next step is a conversation. Reach out and the team will walk you through the options.",
    ],
    points: [
      { title: "A core specialty", text: "Functional orthotics sit alongside diabetic supplies and compression as a KCSS focus." },
      { title: "Personal guidance", text: "Talk through your questions with the team before making any decisions." },
      { title: "Clear next steps", text: "We will explain what information is helpful and how to move forward." },
    ],
    note:
      "Orthotic products shown are sample placeholders. Selection and suitability are discussed directly with the KCSS team and your healthcare provider.",
    heroImage: img.wOrthotic,
    heroAlt: "A pair of functional orthotics with contoured shells",
    cardImage: img.pOrthoticSingle,
    sideImage: img.interior,
    sideAlt: "Bright specialty footwear boutique with a fitting bench",
    categoryIds: ["functional-orthotics"],
  },
  {
    slug: "lymphedema-compression",
    index: "03",
    title: "Lymphedema Compression",
    cardTitle: "Lymphedema Compression",
    cardText: "Compression stockings, sleeves and garments, made easier to navigate.",
    headline: "Compression products, made easier to navigate.",
    intro:
      "Browse compression garments at your own pace, then connect with KCSS for help with product information and next steps.",
    statement: "Finding the right garment can feel complicated. Asking about it should not.",
    body: [
      "KCSS offers lymphedema compression products as one of its specialty categories. Here you will find a calm, organized overview of the garment types we present.",
      "If you have questions about types, sizes or how to order, the team is glad to help — simply get in touch.",
    ],
    points: [
      { title: "Garments in one place", text: "Stockings, sleeves and related garments presented side by side." },
      { title: "Unhurried conversations", text: "Take the time you need. We would rather answer a question than have you guess." },
      { title: "Help with next steps", text: "Ask about measuring, ordering and what to expect along the way." },
    ],
    note:
      "KCSS does not make treatment claims or guarantees. Please follow the guidance of your healthcare provider when choosing compression products.",
    heroImage: img.wStockings,
    heroAlt: "Beige knee-high compression stockings laid flat",
    heroPortrait: true,
    cardImage: img.pStockings,
    sideImage: img.knitGarment,
    sideAlt: "Close-up of a knit compression garment being adjusted",
    categoryIds: ["lymphedema-compression"],
  },
  {
    slug: "diabetic-supplies",
    index: "04",
    title: "Diabetic Supplies",
    cardTitle: "Diabetic Supplies",
    cardText: "Blood glucose monitors and everyday supplies, organized and easy to browse.",
    headline: "Diabetic supplies, organized and easy to browse.",
    intro:
      "Blood glucose monitors and related supplies, organized in one place. Contact KCSS to ask what is currently available.",
    statement: "Everyday essentials deserve the same attention as everything else we offer.",
    body: [
      "Diabetic supplies are the first specialty named on the KCSS brand. This page gathers blood glucose monitors and supplies into a single, tidy category.",
      "The listings shown are samples. For current products and how to request them, please contact the team directly.",
    ],
    points: [
      { title: "Monitors", text: "Blood glucose monitors presented as part of the catalog." },
      { title: "Everyday supplies", text: "The supplies that go alongside monitoring, grouped for easy browsing." },
      { title: "Simple to ask", text: "Call or send an inquiry to ask what is currently available." },
    ],
    note:
      "Listings are sample placeholders — no product specifications are stated. Please contact KCSS for current product information.",
    heroImage: img.glucoseLancets,
    heroAlt: "Blood glucose monitor, lancing device and lancets on a blue surface",
    cardImage: img.glucoseMeter,
    sideImage: img.glucoseHands,
    sideAlt: "Hands holding a blood glucose monitor",
    categoryIds: ["glucose-monitoring"],
  },
];

/* ------------------------------------------------------------------
   Helpers
------------------------------------------------------------------- */
export const getCategory = (id: string) => categories.find((c) => c.id === id);
export const getProduct = (id?: string) => products.find((p) => p.id === id);
export const getSpecialty = (slug?: string) => specialties.find((s) => s.slug === slug);

export const productsInCategory = (id: string) => products.filter((p) => p.categoryId === id);

export const productsInSpecialty = (slug: string) =>
  products.filter((p) => getCategory(p.categoryId)?.specialty === slug);

export const specialtyOfProduct = (p: Product) => getSpecialty(getCategory(p.categoryId)?.specialty);

export function relatedProducts(p: Product, count = 4): Product[] {
  const spec = getCategory(p.categoryId)?.specialty;
  const rest = products.filter((x) => x.id !== p.id);
  const sameCat = rest.filter((x) => x.categoryId === p.categoryId);
  const sameSpec = rest.filter((x) => x.categoryId !== p.categoryId && getCategory(x.categoryId)?.specialty === spec);
  const others = rest.filter((x) => getCategory(x.categoryId)?.specialty !== spec && x.featured);
  return [...sameCat, ...sameSpec, ...others].slice(0, count);
}

/** Hand-picked order for the homepage showcase (one image per card, no repeats with category cards). */
export const homeFeatured: Product[] = [
  "lace-up-walking-shoe",
  "adjustable-strap-knit-shoe",
  "cushioned-full-length-insert",
  "functional-orthotic",
  "custom-molded-insert",
  "compression-arm-sleeve-gauntlet",
  "knit-compression-garment",
  "lancets-lancing-device",
]
  .map((id) => getProduct(id))
  .filter((p): p is Product => Boolean(p));
