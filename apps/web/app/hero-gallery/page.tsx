import type { Metadata } from "next";
import Link from "next/link";
import HeroSection from "@/components/sections/HeroSection";
import type { Section } from "@/components/sections/types";
import { sanityFetch } from "@/sanity/live";
import { HERO_GALLERY_QUERY } from "@/sanity/queries";

export const metadata: Metadata = { title: "Hero gallery", robots: { index: false, follow: false } };

type Hero = Extract<Section, { _type: "heroSection" }>;
type Variant = NonNullable<Hero["variant"]>;

const VARIANTS: { value: Variant; label: string }[] = [
  { value: "software", label: "Software company (hero 03)" },
  { value: "agency", label: "Agency (hero 01)" },
  { value: "pinned", label: "Pinned fullscreen (hero 02)" },
  { value: "studio", label: "Design studio (hero 04)" },
  { value: "webAgency", label: "Web agency (hero 05)" },
  { value: "freelancer", label: "Freelancer (hero 06)" },
  { value: "creativeDeveloper", label: "Creative developer (hero 07)" },
  { value: "designer", label: "Designer (hero 08)" },
  { value: "personal", label: "Personal (hero 09)" },
];

const p = (text: string) => [{ _type: "block" as const, _key: "g", style: "normal" as const, markDefs: [], children: [{ _type: "span" as const, _key: "g1", marks: [], text }] }];

/**
 * Every hero layout rendered with the home page's hero content, gaps filled
 * with sample copy so each layout is comparable. Pick one, then set
 * Home Page → Hero → Layout in the Studio. Not indexed.
 */
export default async function HeroGalleryPage() {
  const { data } = await sanityFetch({ query: HERO_GALLERY_QUERY });
  const base = data?.hero;
  if (!base) return <main className="mxd-page-content" style={{ padding: 120 }}>No hero section on the home page yet.</main>;

  const caption = base.caption || "Digital studio\nfor software, integrations\n& brands";
  const sample = {
    title: base.title || "Design, tech\nand some magic",
    tagline: base.tagline || "Digital studio in Las Vegas",
    description: base.description ?? p("We design, build and integrate websites, software and brands end to end, and we stay around to run them."),
    marqueeItems: base.marqueeItems?.length ? base.marqueeItems : ["Websites", "Software", "Integrations", "E-commerce", "AI products", "Brand & design"],
    valuesLeft: base.valuesLeft?.length ? base.valuesLeft : ["Strategy", "Design", "Engineering"],
    valuesRight: base.valuesRight?.length ? base.valuesRight : ["Integrations", "Content", "Support"],
    availabilityMark: base.availabilityMark || "Available for new projects",
    stats: base.stats?.length ? base.stats : [
      { _key: "a", _type: "stat" as const, value: 15, suffix: "+", label: "Years of\nexperience" },
      { _key: "b", _type: "stat" as const, value: 70, suffix: "+", label: "Projects\nshipped" },
    ],
    trustText: base.trustText || "Trusted by\n50+ clients",
    cta: base.cta ?? { label: "Scroll for more", kind: "anchor" as const, anchor: "work", external: null, newTab: false, internal: null },
  };

  return (
    <main id="mxd-page-content" className="mxd-page-content">
      <nav style={{ position: "sticky", top: 0, zIndex: 50, padding: "12px 24px", display: "flex", gap: 12, flexWrap: "wrap", background: "var(--base, #191919)", borderBottom: "1px solid rgba(128,128,128,.3)", fontSize: 13 }}>
        <strong>Hero gallery</strong>
        {VARIANTS.map((v) => (
          <a key={v.value} href={`#hero-${v.value}`}>
            {v.label}
          </a>
        ))}
        <Link href="/" style={{ marginLeft: "auto" }}>
          ← Home
        </Link>
      </nav>
      {VARIANTS.map((v) => {
        const section = { ...base, ...sample, _key: `gallery-${v.value}`, variant: v.value, anchor: `hero-${v.value}` } as unknown as Hero;
        return (
          <section key={v.value} style={{ borderBottom: "2px dashed rgba(128,128,128,.4)", paddingBottom: 40 }}>
            <p style={{ padding: "80px 24px 0", fontSize: 13, opacity: 0.6 }}>
              {v.label} · <code>variant: {v.value}</code>
            </p>
            <HeroSection section={section} settings={data.settings ?? null} />
          </section>
        );
      })}
    </main>
  );
}
