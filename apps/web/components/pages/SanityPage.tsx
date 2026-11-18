import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SectionRenderer } from "@/components/sections/SectionRenderer";
import { sanityFetch } from "@/sanity/live";
import { PAGE_BY_SLUG_QUERY } from "@/sanity/queries";
import { urlFor } from "@/sanity/image";

type PageData = NonNullable<Awaited<ReturnType<typeof loadPage>>>;

async function loadPage(slug: string) {
  const { data } = await sanityFetch({
    query: PAGE_BY_SLUG_QUERY,
    params: { slug },
  });
  return data;
}

export async function pageMetadata(slug: string): Promise<Metadata> {
  const data = await loadPage(slug);
  const seo = data?.seo;
  const og = seo?.ogImage?.asset
    ? urlFor(seo.ogImage).width(1200).height(630).fit("crop").url()
    : undefined;
  return {
    title: seo?.metaTitle ?? data?.title ?? undefined,
    description: seo?.metaDescription ?? undefined,
    keywords: seo?.keywords ?? undefined,
    robots: seo?.noIndex ? { index: false, follow: false } : undefined,
    openGraph: og ? { images: [{ url: og, width: 1200, height: 630 }] } : undefined,
  };
}

/** Renders a Sanity `page` document (sections[]) by slug. */
export async function SanityPage({
  slug,
  notFoundIfMissing = true,
}: {
  slug: string;
  notFoundIfMissing?: boolean;
}) {
  const data = await loadPage(slug);

  if (!data) {
    if (notFoundIfMissing) notFound();
    return null;
  }

  return (
    <main id="mxd-page-content" className="mxd-page-content">
      <SectionRenderer sections={data.sections} settings={data.settings ?? null} />
      {process.env.NODE_ENV === "development" &&
        (!data.sections || data.sections.length === 0) && (
          <div className="mxd-section" style={{ padding: "160px 40px", textAlign: "center" }}>
            <p className="t-large">No sections yet for “{data.title ?? slug}”.</p>
            <p className="t-small t-muted">Add them under Website → Pages in the Studio.</p>
          </div>
        )}
    </main>
  );
}

export type { PageData };
