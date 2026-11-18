import type { Metadata } from "next";
import Footer2 from "@/components/footers/Footer2";
import { SectionRenderer } from "@/components/sections/SectionRenderer";
import { sanityFetch } from "@/sanity/live";
import { HOME_PAGE_QUERY } from "@/sanity/queries";
import { urlFor } from "@/sanity/image";

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await sanityFetch({ query: HOME_PAGE_QUERY, stega: false });
  const seo = data?.seo;
  const og = seo?.ogImage?.asset ? urlFor(seo.ogImage).width(1200).height(630).fit("crop").url() : undefined;
  return {
    title: seo?.metaTitle ?? undefined,
    description: seo?.metaDescription ?? undefined,
    keywords: seo?.keywords ?? undefined,
    robots: seo?.noIndex ? { index: false, follow: false } : undefined,
    openGraph: og ? { images: [{ url: og, width: 1200, height: 630 }] } : undefined,
  };
}

/**
 * Home — `homePage.sections[]` from Sanity rendered through the Rayo blocks
 * (docs/SCHEMA_PLAN.md §5). Add or reorder sections in the Studio.
 */
export default async function HomePage() {
  const { data } = await sanityFetch({ query: HOME_PAGE_QUERY });

  return (
    <>
      <main id="mxd-page-content" className="mxd-page-content">
        <SectionRenderer sections={data?.sections} settings={data?.settings ?? null} />
        {process.env.NODE_ENV === "development" && !data && (
          <div className="mxd-section" style={{ padding: "160px 40px", textAlign: "center" }}>
            <p className="t-large">Home page could not be read from Sanity.</p>
            <p className="t-small t-muted">
              The <code>zeraus</code> dataset is private: set <code>SANITY_API_READ_TOKEN</code> (a Viewer token) in <code>apps/web/.env.local</code> and restart <code>pnpm dev:web</code>.
            </p>
          </div>
        )}
        {process.env.NODE_ENV === "development" && data && (!data.sections || data.sections.length === 0) && (
          <div className="mxd-section" style={{ padding: "160px 40px", textAlign: "center" }}>
            <p className="t-large">No sections yet — add them under Website → Home Page in the Studio.</p>
          </div>
        )}
      </main>
      <Footer2 text={data?.settings?.wordmark ?? undefined} />
    </>
  );
}
