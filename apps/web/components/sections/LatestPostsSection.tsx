import Image from "next/image";
import Link from "next/link";
import RevealText from "@/components/animation/RevealText";
import BackgroundParallax from "@/components/animation/BackgroundParallax";
import { backgroundUrl } from "@/sanity/image";
import { CmsButton } from "./CmsLink";
import { SimpleText } from "./Text";
import { sectionAttrs, type SectionOf } from "./types";

export default function LatestPostsSection({ section }: { section: SectionOf<"latestPostsSection"> }) {
  const posts = (section.posts ?? []).filter(Boolean).slice(0, 3);
  if (posts.length === 0) return null;

  return (
    <div className="mxd-section padding-blog" {...sectionAttrs(section)}>
      <div className="mxd-container grid-container">
        <div className="mxd-block">
          <div className="mxd-section-title pre-grid">
            <div className="container-fluid p-0">
              <div className="row g-0">
                <div className="col-12 col-xl-5 mxd-grid-item no-margin">
                  <div className="mxd-section-title__hrtitle">
                    <RevealText as="h2" className="reveal-type anim-uni-in-up">
                      {section.heading}
                    </RevealText>
                  </div>
                </div>
                <div className="col-12 col-xl-4 mxd-grid-item no-margin">
                  <div className="mxd-section-title__hrdescr">
                    <SimpleText value={section.description} className="anim-uni-in-up" />
                  </div>
                </div>
                <div className="col-12 col-xl-3 mxd-grid-item no-margin">
                  {section.cta && (
                    <div className="mxd-section-title__hrcontrols anim-uni-in-up">
                      <CmsButton link={section.cta} className="btn btn-anim btn-default btn-outline slide-right-up" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mxd-block">
          <div className="mxd-blog-preview">
            <div className="container-fluid p-0">
              <div className="row g-0">
                {posts.map((post) => {
                  const href = `/insights/${post.slug ?? ""}`;
                  const bg = backgroundUrl(post.coverImage, 1000);
                  return (
                    <div key={post._id} className="col-12 col-xl-4 mxd-blog-preview__item mxd-grid-item animate-card-3">
                      <Link className="mxd-blog-preview__media" href={href}>
                        <BackgroundParallax className="mxd-blog-preview__image parallax-img-small" style={bg ? { backgroundImage: `url(${bg})` } : undefined} />
                        <div className="mxd-preview-hover">
                          <i className="mxd-preview-hover__icon">
                            <Image alt="" src="/img/icons/icon-eye.svg" width={38} height={21} />
                          </i>
                        </div>
                        {post.categories && post.categories.length > 0 && (
                          <div className="mxd-blog-preview__tags">
                            {post.categories.map((c) => (
                              <span key={c} className="tag tag-default tag-permanent">
                                {c}
                              </span>
                            ))}
                          </div>
                        )}
                      </Link>
                      <div className="mxd-blog-preview__data">
                        <Link className="anim-uni-in-up" href={href}>
                          {post.title}
                        </Link>
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
  );
}
