import Image from "next/image";
import AnimatedButton from "@/components/animation/AnimatedButton";
import Counter from "@/components/common/Counter";
import { Lines, sectionAttrs } from "../types";
import { Mark, Tags, ctaHref, heroImages, type HeroData } from "./shared";

/** Rayo hero 09 — caption, oversized name, tag cloud, floating image with counters and mark. */
export default function HeroPersonal({ section }: { section: HeroData }) {
  const [img] = heroImages(section.media, 915);
  const stats = (section.stats ?? []).slice(0, 2);
  const tags = [...(section.valuesLeft ?? []), ...(section.valuesRight ?? [])];

  return (
    <div className="mxd-section" {...sectionAttrs(section)}>
      <div className="mxd-hero-09">
        <div className="mxd-hero-09__wrap loading-wrap">
          <div className="mxd-hero-09__headline">
            {section.caption && (
              <div className="hero-09-headline__caption loading__item">
                <p>
                  <Lines text={section.caption} />
                </p>
              </div>
            )}
            <div className="hero-09-headline__title loading__item">
              {/* Rayo ships this title as an SVG wordmark; we render live text with the same hooks. */}
              <h1 className="hero-09-headline__text" style={{ fontSize: "clamp(3rem, 12vw, 14rem)", lineHeight: 0.9, letterSpacing: "-0.03em" }}>
                <Lines text={section.title} />
              </h1>
            </div>
            {tags.length > 0 && (
              <div className="hero-09-headline__tags loading__fade">
                <Tags items={tags} />
              </div>
            )}
          </div>
          <div className="mxd-hero-09__objects">
            {img && (
              <div className="hero-09-objects__image loading__item">
                <Image className={img.idle || "mxd-move"} {...img.img} priority sizes="(max-width: 768px) 70vw, 35vw" />
              </div>
            )}
            {stats.map((s, i) => (
              <div key={s._key} className={`hero-09-objects__item item-0${i + 1} loading__item`}>
                <div className="mxd-counter horizontal">
                  <p className="mxd-counter__number mxd-stats-number xsmall">
                    <Counter max={s.value ?? 0} />
                    {s.suffix}
                  </p>
                  <p className="mxd-counter__descr t-140 t-bright t-small">
                    <Lines text={s.label} />
                  </p>
                </div>
              </div>
            ))}
            {section.availabilityMark && (
              <div className="hero-09-objects__item item-03 loading__item">
                <Mark text={section.availabilityMark} />
              </div>
            )}
          </div>
          <div className="mxd-hero-09__more loading__fade">
            <AnimatedButton text={section.cta?.label || "Scroll for more"} as="a" className="btn btn-line-default btn-anim slide-down" href={ctaHref(section.cta, "#work")}>
              <i className="ph-bold ph-arrow-elbow-right-down" />
            </AnimatedButton>
          </div>
        </div>
      </div>
    </div>
  );
}
