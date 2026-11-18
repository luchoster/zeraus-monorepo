import type { Metadata } from "next";
import { pageMetadata, SanityPage } from "@/components/pages/SanityPage";
import { sanityFetch } from "@/sanity/live";
import { PAGE_SLUGS_QUERY } from "@/sanity/queries";

/** Slugs that already have dedicated App Router trees — leave them alone. */
const RESERVED = new Set([
  "our-work",
  "services",
  "contact",
  "about-us",
  "preview",
  "hero-gallery",
  "api",
]);

export async function generateStaticParams() {
  try {
    const { data } = await sanityFetch({
      query: PAGE_SLUGS_QUERY,
      stega: false,
    });
    const slugs = Array.isArray(data) ? data : [];
    return slugs
      .map((row) => row?.slug)
      .filter((slug): slug is string => Boolean(slug) && !RESERVED.has(slug))
      .map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (RESERVED.has(slug)) return {};
  return pageMetadata(slug);
}

export default async function PageBySlug({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (RESERVED.has(slug)) {
    const { notFound } = await import("next/navigation");
    notFound();
  }
  return <SanityPage slug={slug} />;
}
