import Image from "next/image";
import VelocityMarquee from "@/components/animation/VelocityMarquee";
import VideoParallax from "@/components/animation/VideoParallax";
import { imageProps } from "@/sanity/image";
import { Lines, Wordmark, sectionAttrs, type PageSettings } from "../types";
import { IDLE_CLASS, type HeroData } from "./shared";

/** Rayo hero 03 — the software-development-company layout. */
export default function HeroSoftware({ section, settings }: { section: HeroData; settings: PageSettings }) {
  const wordmark = section.wordmark || settings?.wordmark || settings?.title || "zera.us";
  const media = section.media ?? [];

  return (
    <div className="mxd-section mxd-hero-section padding-grid-pre-mtext" {...sectionAttrs(section)}>
      <div className="mxd-hero-03">
        <div className="mxd-hero-03__wrap loading-wrap">
          <div className="mxd-hero-03__top">
            {media.length > 0 && (
              <div className="mxd-hero-03__marquee loading__item">
                <VelocityMarquee className="marquee marquee-right--gsap">
                  {media.map((item) => {
                    if (item.kind === "video" && item.video) {
                      return (
                        <div key={item._key} className="marquee__item one-line">
                          <div className="hero-03-marquee__video">
                            <video preload="auto" autoPlay loop muted playsInline poster={item.poster ?? undefined}>
                              <source src={item.video} />
                            </video>
                          </div>
                        </div>
                      );
                    }
                    const img = imageProps(item.image, 1400);
                    if (!img) return null;
                    return (
                      <div key={item._key} className="marquee__item one-line">
                        <div className="hero-03-marquee__image">
                          <Image className={IDLE_CLASS[item.animation ?? ""] || undefined} {...img} priority sizes="(max-width: 768px) 60vw, 30vw" />
                        </div>
                      </div>
                    );
                  })}
                </VelocityMarquee>
              </div>
            )}
            <div className="mxd-hero-03__headline">
              <p className="hero-03-headline__caption loading__item">
                <Lines text={section.caption} />
              </p>
              <h1 className="hero-03-headline__title loading__item">
                <span className="zr-hero-wordmark">
                  <Wordmark text={wordmark} />
                </span>
              </h1>
            </div>
          </div>
          {(section.dividerVideo?.video || section.dividerVideo?.poster) && (
            <div className="mxd-hero-03__bottom">
              <div className="mxd-container">
                <div className="mxd-divider">
                  <div className="mxd-divider__video">
                    {section.dividerVideo.video ? (
                      <VideoParallax className="video parallax-video" src={section.dividerVideo.video} poster={section.dividerVideo.poster ?? undefined} />
                    ) : (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img className="video" src={section.dividerVideo.poster ?? undefined} alt="" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
