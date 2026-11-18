import Link from "next/link";
import RevealText from "@/components/animation/RevealText";
import BackgroundParallax from "@/components/animation/BackgroundParallax";
import { backgroundUrl } from "@/sanity/image";
import { CmsButton } from "./CmsLink";
import { SimpleText } from "./Text";
import { sectionAttrs, type SectionOf } from "./types";

export default function CaseStudiesSection({ section }: { section: SectionOf<"caseStudiesSection"> }) {
  const items = (section.caseStudies ?? []).filter(Boolean).slice(0, 6);
  if (items.length === 0) return null;

  return (
    <div className="mxd-section padding-pre-grid mobile-grid-title" {...sectionAttrs(section)}>
      <div className="mxd-container grid-container">
        <div className="mxd-block">
          <div className="mxd-pinned-projects">
            <div className="container-fluid px-0">
              <div className="row gx-0">
                <div className="col-12 col-xl-5 mxd-pinned-projects__static">
                  <div className="mxd-pinned-projects__static-inner no-margin">
                    <div className="mxd-section-title no-margin-desktop">
                      <div className="container-fluid p-0">
                        <div className="row g-0">
                          <div className="col-12 mxd-grid-item no-margin">
                            <div className="mxd-section-title__title">
                              <RevealText as="h2" className="reveal-type">
                                {section.heading}
                              </RevealText>
                            </div>
                          </div>
                          {section.description && (
                            <div className="col-12 mxd-grid-item no-margin">
                              <div className="mxd-section-title__descr">
                                <SimpleText value={section.description} className="anim-uni-in-up" />
                              </div>
                            </div>
                          )}
                          {section.cta && (
                            <div className="col-12 mxd-grid-item no-margin">
                              <div className="mxd-section-title__controls anim-uni-in-up">
                                <CmsButton link={section.cta} className="btn btn-anim btn-default btn-outline slide-right-up" />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-xl-7 mxd-pinned-projects__scroll">
                  <div className="mxd-pinned-projects__scroll-inner mxd-grid-item no-margin">
                    {items.map((p) => {
                      const href = `/our-work/${p.slug ?? ""}`;
                      const bg = backgroundUrl(p.previewImage, 1600);
                      return (
                        <div key={p._id} className="mxd-project-item">
                          <Link className="mxd-project-item__media anim-uni-in-up" href={href}>
                            <BackgroundParallax className="mxd-project-item__preview parallax-img-small" style={bg ? { backgroundImage: `url(${bg})` } : undefined} />
                            {p.tags && p.tags.length > 0 && (
                              <div className="mxd-project-item__tags">
                                {p.tags.map((tag) => (
                                  <span key={tag} className="tag tag-default tag-permanent">
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            )}
                          </Link>
                          <div className="mxd-project-item__promo">
                            <div className="mxd-project-item__name">
                              <Link className="anim-uni-in-up" href={href}>
                                <span>{p.title}</span> {p.tagline}
                              </Link>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
