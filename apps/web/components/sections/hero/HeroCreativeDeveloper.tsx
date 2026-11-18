"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedButton from "@/components/animation/AnimatedButton";
import Counter from "@/components/common/Counter";
import { Lines, sectionAttrs } from "../types";
import { SimpleText } from "../Text";
import { Mark, Tags, WordMarquee, ctaHref, heroImages, type HeroData } from "./shared";

gsap.registerPlugin(ScrollTrigger);

/** Rayo hero 07 — big title, bright marquee, circle image with counters, description + tags. */
export default function HeroCreativeDeveloper({ section }: { section: HeroData }) {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!rootRef.current) return;
    const ctx = gsap.context(() => {
      const trigger = ".mxd-hero-07__tl-trigger";
      gsap.utils.toArray<HTMLElement>(".hero-07-slide-out-scroll").forEach((el) => {
        gsap.timeline({ scrollTrigger: { trigger, start: "top 86%", end: "top 10%", scrub: true } }).fromTo(el, { y: 0, scaleY: 1 }, { y: "-26rem", scaleY: 0.8, ease: "power4.out" });
      });
      gsap.utils.toArray<HTMLElement>(".hero-07-fade-out-scroll").forEach((el) => {
        gsap.timeline({ scrollTrigger: { trigger, start: "top 70%", end: "top 40%", scrub: true } }).fromTo(el, { opacity: 1, y: 0 }, { opacity: 0, y: "-10rem", ease: "elastic.out(1, 0.3)" });
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  const [circle] = heroImages(section.media, 1400);
  const stats = (section.stats ?? []).slice(0, 2);

  return (
    <div className="mxd-section" ref={rootRef} {...sectionAttrs(section)}>
      <div className="mxd-hero-07">
        <div className="mxd-hero-07__wrap loading-wrap">
          <div className="mxd-hero-07__top">
            <h1 className="mxd-hero-07__title">{section.title?.replace(/\n/g, " ")}</h1>
            {section.marqueeItems && section.marqueeItems.length > 0 && (
              <div className="mxd-hero-07__marquee loading__item">
                <WordMarquee items={section.marqueeItems} className="marquee marquee-right--gsap bright" />
              </div>
            )}
          </div>
          <div className="mxd-hero-07__bottom">
            <div className="mxd-hero-07__circle">
              {circle && (
                <div className="hero-07-circle__image hero-07-slide-out-scroll loading__item">
                  <Image className={circle.idle || undefined} {...circle.img} priority sizes="(max-width: 768px) 90vw, 50vw" />
                </div>
              )}
              {section.availabilityMark && (
                <div className="hero-07-circle__container hero-07-fade-out-scroll">
                  <div className="hero-07-circle__item item-01 loading__item">
                    <Mark text={section.availabilityMark} />
                  </div>
                </div>
              )}
              {stats.length > 0 && (
                <div className="hero-07-circle__container mobile-row hero-07-fade-out-scroll">
                  {stats.map((s, i) => (
                    <div key={s._key} className={`hero-07-circle__item item-0${i + 2} loading__item`}>
                      <div className="mxd-counter small">
                        <p className="mxd-counter__number mxd-stats-number small">
                          <Counter max={s.value ?? 0} />
                          {s.suffix}
                        </p>
                        <p className="mxd-counter__descr t-140 t-bright t-small">
                          <Lines text={s.label} />
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="mxd-hero-07__info loading__fade">
              <div className="hero-07-info__container">
                {section.description && (
                  <div className="hero-07-info__descr">
                    <SimpleText value={section.description} className="t-large t-medium t-140 t-bright" />
                  </div>
                )}
                <div className="hero-07-info__tags">
                  <Tags items={section.valuesLeft} className="tag tag-default tag-outline-medium" />
                </div>
              </div>
              <div className="hero-07-info__container">
                <div className="hero-07-info__tags right-align-desktop">
                  <Tags items={section.valuesRight} className="tag tag-default tag-outline-medium" />
                </div>
              </div>
            </div>
          </div>
          <div className="mxd-hero-07__more loading__fade">
            <AnimatedButton text={section.cta?.label || "Scroll for more"} as="a" className="btn btn-line-default btn-anim slide-down" href={ctaHref(section.cta, "#work")}>
              <i className="ph-bold ph-arrow-elbow-right-down" />
            </AnimatedButton>
          </div>
          <div className="mxd-hero-07__tl-trigger" />
        </div>
      </div>
    </div>
  );
}
