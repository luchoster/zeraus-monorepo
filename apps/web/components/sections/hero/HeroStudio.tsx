import Image from "next/image";
import Link from "next/link";
import { sectionAttrs } from "../types";
import { SimpleText } from "../Text";
import { AvatarsGroup, TitleRows, ValueLists, WordMarquee, ctaHref, heroImages, type HeroData } from "./shared";

/** Rayo hero 04 — image block + about, avatars, two-row headline, lists, word marquee. */
export default function HeroStudio({ section }: { section: HeroData }) {
  const [main, bg] = heroImages(section.media, 800);

  return (
    <>
      <div className="mxd-section mxd-hero-section padding-pre-stack" {...sectionAttrs(section)}>
        <div className="mxd-hero-04">
          <div className="mxd-hero-04__wrap overflow-hidden loading-wrap">
            <div className="container-fluid p-0">
              <div className="row g-0 flex-column flex-xl-row">
                <div className="col-12 col-xl-3 order-2 order-xl-1 mxd-hero-04__left mxd-grid-item no-margin">
                  <div className="mxd-hero-04__imageblock loading__item">
                    {section.cta && (
                      <div className="hero-04-imageblock__btn">
                        <Link className="btn btn-round btn-round-medium btn-base slide-right-up anim-no-delay" href={ctaHref(section.cta)} aria-label={section.cta.label ?? undefined}>
                          <i className="ph-bold ph-arrow-up-right" />
                        </Link>
                      </div>
                    )}
                    {main && <Image className={main.idle || "mxd-rotate-slow"} {...main.img} priority sizes="(max-width: 1200px) 50vw, 25vw" />}
                    {section.tagline && <p>{section.tagline}</p>}
                  </div>
                  {section.description && (
                    <div className="mxd-hero-04__aboutblock loading__item">
                      <SimpleText value={section.description} />
                    </div>
                  )}
                </div>
                <div className="col-12 col-xl-9 order-1 order-xl-2 mxd-hero-04__right mxd-grid-item no-margin">
                  <div className="mxd-hero-04__headline">
                    <div className="hero-04-headline__avatars loading__item">
                      <AvatarsGroup avatars={section.trustAvatars} text={section.trustText} />
                    </div>
                    <h1 className="hero-04-title">
                      <TitleRows text={section.title} prefix="hero-04-title" starBeforeLast starClass="mxd-pulse" />
                    </h1>
                  </div>
                  <div className="mxd-hero-04__descr">
                    <ValueLists left={section.valuesLeft} right={section.valuesRight} />
                  </div>
                </div>
                {section.marqueeItems && section.marqueeItems.length > 0 && (
                  <div className="col-12 order-3 mxd-hero-04__marquee mxd-grid-item">
                    <div className="hero-04-marquee">
                      <WordMarquee items={section.marqueeItems} oneLine={false} small />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {bg && (
        <div className="mxd-page-bg hero-04-bg loading__fade">
          <div className="hero-04-bg__obj-01" data-speed="0.5">
            <Image className="mxd-move" {...bg.img} sizes="400px" />
          </div>
          <div className="hero-04-bg__obj-02" data-speed="0.7">
            <Image className="mxd-move" {...bg.img} sizes="400px" />
          </div>
        </div>
      )}
    </>
  );
}
