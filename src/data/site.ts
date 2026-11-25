/**
 * Confirmed business information for KCSS Specialty Durable Medical.
 * Nothing in this file is invented — opening hours, credentials, history
 * dates etc. are intentionally absent until supplied by the business.
 */
const mapQuery = "10820+West+64th+Street+Suite+200,+Shawnee,+KS+66203";

export const business = {
  name: "KCSS Specialty Durable Medical",
  short: "KCSS",
  former: "KC Shoe Stop",
  founder: "Natasha Belcher",
  founderRole: "Founder & Proprietor",
  phone: "913-486-1190",
  phoneHref: "tel:+19134861190",
  fax: "913-300-9624",
  email: "natasha@kcssdme.com",
  emailHref: "mailto:natasha@kcssdme.com",
  website: "https://kcssdme.com/",
  address: {
    line1: "10820 West 64th Street, Suite 200",
    line2: "Shawnee, KS 66203",
    country: "United States",
  },
  mapEmbed: `https://www.google.com/maps?q=${mapQuery}&z=15&output=embed`,
  directions: `https://www.google.com/maps/dir/?api=1&destination=${mapQuery}`,
  social: {
    instagram: "https://www.instagram.com/kcshoestop/",
    facebook: "https://www.facebook.com/natasha.belcher",
    linkedin: "https://www.linkedin.com/in/natasha-belcher-hess-7b063234",
  },
  positioning: [
    "Diabetic Supplies",
    "Functional Orthotics",
    "Lymphedema Compressions",
    "Specialty Durable Medical Equipment",
  ],
} as const;

export const navLinks = [
  { label: "Home", to: "/" },
  { label: "Shop", to: "/shop" },
  { label: "Specialties", to: "/specialties" },
  { label: "About Us", to: "/about" },
  { label: "Contact", to: "/contact" },
] as const;
