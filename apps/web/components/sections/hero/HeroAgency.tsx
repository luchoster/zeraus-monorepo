import Image from "next/image";
import VideoModalButton from "@/components/common/VideoModalButton";
import { sectionAttrs, type PageSettings } from "../types";
import { SimpleText } from "../Text";
import { HeroVideo, RotatingButton, Star80, TitleRows, WordMarquee, ctaHref, heroImages, type HeroData } from "./shared";

/** Rayo hero 01 — floating images, word marquee, rotating button, socials, video card. */
export default function HeroAgency({ section, settings }: { section: HeroData; settings: PageSettings }) {
  const images = heroImages(section.media, 700).slice(0, 3);
  const defaultIdle = ["mxd-pulse", "mxd-move", "mxd-rotate"];
  const socials = settings?.socialLinks ?? [];

  return (
    <div className="mxd-section mxd-hero-section mxd-hero-fullheight" {...sectionAttrs(section)}>
      <div className="mxd-hero-01">
        <div className="mxd-hero-01__wrap loading-wrap">
          <div className="mxd-hero-01__top">
            <div className="mxd-hero-01__title-wrap">
              {images.length > 0 && (
                <div className="mxd-hero-01__images mxd-floating-img">
                  {images.map((m, i) => (
                    <div key={m.key} className={`hero-01-image image-0${i + 1} mxd-floating-img__item loading__fade`}>
                      <Image className={m.idle || defaultIdle[i]} {...m.img} priority sizes="(max-width: 768px) 40vw, 20vw" />
                    </div>
                  ))}
                </div>
              )}
              {section.marqueeItems && section.marqueeItems.length > 0 && (
                <div className="mxd-hero-01__marquee loading__item">
                  <WordMarquee items={section.marqueeItems} oneLine={false} />
                </div>
              )}
              <h1 className="hero-01-title">
                <TitleRows text={section.title} prefix="hero-01-title" starBeforeLast />
              </h1>
            </div>
          </div>
          <div className="mxd-hero-01__bottom">
            <div className="mxd-hero-01__data-wrap">
              <div className="mxd-hero-01__dash-line dash-line loading__fade" />
              {section.cta?.label && (
                <div className="mxd-hero-01__data-btn loading__fade">
                  <RotatingButton text={section.cta.label} href={ctaHref(section.cta)} className="btn-rotating btn-rotating-120-160" image={section.media?.[3]?.image}>
                    <Star80 className="btn-rotating__image" />
                  </RotatingButton>
                </div>
              )}
              {section.description && (
                <div className="mxd-hero-01__data-descr loading__fade">
                  <SimpleText value={section.description} className="t-bright" />
                </div>
              )}
              {socials.length > 0 && (
                <div className="mxd-hero-01__data-socials loading__fade">
                  <ul>
                    {socials.slice(0, 4).map((s) => (
                      <li key={s._key}>
                        <Star80 />
                        <a href={s.url ?? "#"} target="_blank" rel="noopener noreferrer">
                          {s.label || s.platform}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            {(section.dividerVideo?.video || section.dividerVideo?.poster) && (
              <div className="mxd-hero-01__video-wrap loading__item">
                <HeroVideo video={section.dividerVideo} className="mxd-hero-01__video" />
                {section.videoModalUrl && (
                  <div className="mxd-hero-01__video-btn">
                    <VideoModalButton videoSrc={section.videoModalUrl} />
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
