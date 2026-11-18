import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { RichText, SimpleText } from "@/components/sections/Text";
import { imageProps, urlFor } from "@/sanity/image";
import { sanityFetch } from "@/sanity/live";
import { SERVICE_BY_SLUG_QUERY, SERVICE_SLUGS_QUERY } from "@/sanity/queries";

export async function generateStaticParams() {
  try {
    const { data } = await sanityFetch({ query: SERVICE_SLUGS_QUERY, stega: false });
    const rows = Array.isArray(data) ? data : [];
    return rows
      .map((row) => row?.slug)
      .filter((slug): slug is string => Boolean(slug))
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
  const { data } = await sanityFetch({
    query: SERVICE_BY_SLUG_QUERY,
    params: { slug },
    stega: false,
  });
  if (!data) return {};
  const seo = data.seo;
  const og = seo?.ogImage?.asset
    ? urlFor(seo.ogImage).width(1200).height(630).fit("crop").url()
    : undefined;
  return {
    title: seo?.metaTitle ?? data.title ?? undefined,
    description: seo?.metaDescription ?? undefined,
    keywords: seo?.keywords ?? undefined,
    robots: seo?.noIndex ? { index: false, follow: false } : undefined,
    openGraph: og ? { images: [{ url: og, width: 1200, height: 630 }] } : undefined,
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { data } = await sanityFetch({
    query: SERVICE_BY_SLUG_QUERY,
    params: { slug },
  });
  if (!data) notFound();

  const hero = imageProps(data.illustration ?? data.cardImage, 1400);

  return (
    <main id="mxd-page-content" className="mxd-page-content inner-page-content">
      <div className="mxd-section padding-default">
        <div className="mxd-container grid-container">
          <div className="mxd-block">
            <div className="container-fluid px-0">
              <div className="row gx-0">
                <div className="col-12 col-xl-5 mxd-grid-item no-margin">
                  <div className="mxd-block__name">
                    <h1 className="reveal-type anim-uni-in-up">{data.title}</h1>
                    {data.tags && data.tags.length > 0 && (
                      <p className="t-small t-muted anim-uni-in-up" style={{ marginTop: 12 }}>
                        {data.tags.join(" · ")}
                      </p>
                    )}
                  </div>
                </div>
                <div className="col-12 col-xl-6 mxd-grid-item no-margin">
                  <div className="mxd-block__content">
                    <div className="mxd-block__paragraph mxd-article">
                      <SimpleText value={data.excerpt} className="t-large t-bright anim-uni-in-up" />
                      {data.body && <RichText value={data.body} />}
                    </div>
                  </div>
                </div>
              </div>
              {hero && (
                <div className="row gx-0" style={{ marginTop: 48 }}>
                  <div className="col-12">
                    <Image {...hero} sizes="100vw" style={{ width: "100%", height: "auto" }} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
