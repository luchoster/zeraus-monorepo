import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import AnimatedButton from "@/components/animation/AnimatedButton";
import { HeadlineTitle } from "@/components/sections/inner-hero/shared";
import { RichText, SimpleText } from "@/components/sections/Text";
import { imageProps, urlFor } from "@/sanity/image";
import { sanityFetch } from "@/sanity/live";
import { CASE_STUDY_BY_SLUG_QUERY, CASE_STUDY_SLUGS_QUERY } from "@/sanity/queries";

export async function generateStaticParams() {
  try {
    const { data } = await sanityFetch({ query: CASE_STUDY_SLUGS_QUERY, stega: false });
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
    query: CASE_STUDY_BY_SLUG_QUERY,
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

export default async function CaseStudyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { data } = await sanityFetch({
    query: CASE_STUDY_BY_SLUG_QUERY,
    params: { slug },
  });
  if (!data) notFound();

  const hero = imageProps(data.heroImage ?? data.previewImage, 1600);
  const serviceNames = (data.services ?? [])
    .map((s: { shortTitle?: string | null; title?: string | null } | null) => s?.shortTitle || s?.title)
    .filter((v: string | null | undefined): v is string => Boolean(v));
  const servicesLabel = serviceNames.join(", ");
  const industriesLabel = (data.industries ?? []).filter(Boolean).join(", ");
  const dateLabel = data.year ? String(data.year) : null;
  const tags = (data.tags ?? []).filter(Boolean);
  const hasMeta = Boolean(data.client || servicesLabel || industriesLabel || dateLabel);

  return (
    <main id="mxd-page-content" className="mxd-page-content">
      <div className="mxd-section mxd-section-inner-headline padding-default">
        <div className="mxd-container grid-container">
          <div className="mxd-block loading-wrap">
            <div className="container-fluid px-0">
              <div className="row gx-0">
                <div className="col-12 col-xl-2 mxd-grid-item no-margin">
                  {data.url ? (
                    <div className="mxd-block__name name-project-link loading__fade">
                      <AnimatedButton
                        text="Project Page"
                        as={"a"}
                        className="btn btn-anim btn-line-small btn-muted slide-right-up"
                        href={data.url}
                      >
                        <i className="ph ph-arrow-up-right" />
                      </AnimatedButton>
                    </div>
                  ) : null}
                </div>
                <div className="col-12 col-xl-10 mxd-grid-item no-margin">
                  <div className="mxd-block__content">
                    <div className="mxd-block__inner-headline loading__item">
                      <HeadlineTitle title={data.title} />
                      {data.tagline && (
                        <p className="inner-headline__text t-large t-bright" style={{ marginTop: 12 }}>
                          {data.tagline}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="col-12" />
              </div>
              <div className="row g-0">
                <div className="col-12 col-xl-2" />
                <div className="col-12 col-xl-6 mxd-grid-item no-margin">
                  <div className="inner-headline__paragraph loading__item">
                    <SimpleText value={data.excerpt} />
                  </div>
                  {hasMeta && (
                    <div className="inner-headline__data">
                      <div className="mxd-data-list">
                        <div className="container-fluid p-0">
                          <div className="row g-0">
                            <div className="col-12 col-md-6 col-xl-5 mxd-data-list__column loading__item">
                              {data.client && (
                                <div className="mxd-data-list__item">
                                  <p className="mxd-data-list__name">Client</p>
                                  <p className="mxd-data-list__content">{data.client}</p>
                                </div>
                              )}
                              {servicesLabel && (
                                <div className="mxd-data-list__item">
                                  <p className="mxd-data-list__name">Services</p>
                                  <p className="mxd-data-list__content">{servicesLabel}</p>
                                </div>
                              )}
                            </div>
                            <div className="col-12 col-md-6 col-xl-5 mxd-data-list__column loading__item">
                              {industriesLabel && (
                                <div className="mxd-data-list__item">
                                  <p className="mxd-data-list__name">Industries</p>
                                  <p className="mxd-data-list__content">{industriesLabel}</p>
                                </div>
                              )}
                              {dateLabel && (
                                <div className="mxd-data-list__item">
                                  <p className="mxd-data-list__name">Date</p>
                                  <p className="mxd-data-list__content">{dateLabel}</p>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                {tags.length > 0 && (
                  <div className="col-12 col-xl-4 mxd-grid-item no-margin">
                    <div className="inner-headline__tags loading__fade">
                      {tags.map((t: string) => (
                        <span key={t} className="tag tag-default tag-outline-medium">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mxd-section padding-default">
        <div className="mxd-container grid-container">
          <div className="mxd-block">
            <div className="container-fluid px-0">
              <div className="row gx-0">
                <div className="col-12 col-xl-2 mxd-grid-item no-margin" />
                <div className="col-12 col-xl-8 mxd-grid-item no-margin">
                  <div className="mxd-block__content">
                    <div className="mxd-block__paragraph mxd-article">
                      {data.challenge && (
                        <>
                          <h2 className="anim-uni-in-up">Challenge</h2>
                          <RichText value={data.challenge} />
                        </>
                      )}
                      {data.solution && (
                        <>
                          <h2 className="anim-uni-in-up">Solution</h2>
                          <RichText value={data.solution} />
                        </>
                      )}
                      {data.results && (
                        <>
                          <h2 className="anim-uni-in-up">Results</h2>
                          <RichText value={data.results} />
                        </>
                      )}
                      {data.testimonial?.quote && (
                        <blockquote className="anim-uni-in-up" style={{ marginTop: 32 }}>
                          <SimpleText value={data.testimonial.quote} />
                          {(data.testimonial.author || data.testimonial.company) && (
                            <footer>
                              {[data.testimonial.author, data.testimonial.role, data.testimonial.company]
                                .filter(Boolean)
                                .join(" · ")}
                            </footer>
                          )}
                        </blockquote>
                      )}
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
              {Array.isArray(data.gallery) && data.gallery.length > 0 && (
                <div className="row gx-3 gy-3" style={{ marginTop: 32 }}>
                  {data.gallery.map((img: Parameters<typeof imageProps>[0], i: number) => {
                    const props = imageProps(img, 900);
                    if (!props) return null;
                    return (
                      <div key={i} className="col-12 col-md-6">
                        <Image {...props} sizes="(max-width: 768px) 100vw, 50vw" style={{ width: "100%", height: "auto" }} />
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
