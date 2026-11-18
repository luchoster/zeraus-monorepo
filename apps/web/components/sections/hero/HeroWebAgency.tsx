import Image from "next/image";
import AnimatedButton from "@/components/animation/AnimatedButton";
import { sectionAttrs } from "../types";
import { SimpleText } from "../Text";
import { AvatarsGroup, HeroVideo, TitleRows, ctaHref, heroImages, type HeroData } from "./shared";

/** Rayo hero 05 — two-row headline with star, avatars, works block, video block. */
export default function HeroWebAgency({ section }: { section: HeroData }) {
  const [work] = heroImages(section.media, 800);
  const hasVideo = Boolean(section.dividerVideo?.video || section.dividerVideo?.poster);

  return (
    <div className="mxd-section mxd-hero-section padding-grid-pre-mtext" {...sectionAttrs(section)}>
      <div className="mxd-hero-05">
        <div className="mxd-hero-05__wrap loading-wrap">
          <div className="mxd-hero-05__top">
            <div className="mxd-hero-05__headline">
              <div className="container-fluid p-0">
                <div className="row g-0 d-flex flex-column flex-xl-row">
                  <div className="col-12 col-xl-8 col-xxl-10 order-2 order-xl-1 mxd-grid-item no-margin">
                    <h1 className="hero-05-title">
                      <TitleRows text={section.title} prefix="hero-05-title" starBeforeLast starClass="mxd-pulse" />
                    </h1>
                  </div>
                  <div className="col-12 col-xl-4 col-xxl-2 order-1 order-xl-2 mxd-grid-item no-margin">
                    <div className="hero-05-headline__avatars loading__fade">
                      <AvatarsGroup avatars={section.trustAvatars} text={section.trustText} alignRight />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mxd-hero-05__bottom mxd-grid-item no-margin">
            {(work || section.tagline || section.cta) && (
              <div className="mxd-hero-05__worksblock loading__item">
                {work && <Image className={work.idle || "mxd-move"} {...work.img} priority sizes="(max-width: 768px) 60vw, 30vw" />}
                <div className="hero-05-worksblock__descr">
                  {section.tagline && <p className="t-large t-caption t-bright">{section.tagline}</p>}
                  {section.cta?.label && (
                    <AnimatedButton text={section.cta.label} className="btn btn-anim btn-default btn-outline slide-right-up" href={ctaHref(section.cta)}>
                      <i className="ph-bold ph-arrow-up-right" />
                    </AnimatedButton>
                  )}
                </div>
              </div>
            )}
            {(hasVideo || section.description) && (
              <div className="mxd-hero-05__videoblock loading__item">
                {hasVideo && (
                  <div className="mxd-hero-05-videoblock__video">
                    <HeroVideo video={section.dividerVideo} />
                  </div>
                )}
                {section.description && (
                  <div className="mxd-hero-05-videoblock__descr">
                    <SimpleText value={section.description} className="t-large t-caption t-bright" />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
