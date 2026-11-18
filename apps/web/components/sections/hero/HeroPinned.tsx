"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { imageProps } from "@/sanity/image";
import { sectionAttrs } from "../types";
import { RotatingButton, Star60, Star80, ValueLists, WordMarquee, ctaHref, heroImages, type HeroData } from "./shared";

gsap.registerPlugin(ScrollTrigger);

/** Rayo hero 02's image wall slots, in order. */
const SLOTS = [
  { row: 1, wrap: "mxd-hero-02-image__portrait portrait-01", inner: "type-01", w: 800 },
  { row: 1, wrap: "mxd-hero-02-image__landscape landscape-01", inner: "type-03", w: 1920 },
  { row: 1, wrap: "mxd-hero-02-image__portrait portrait-02", inner: "type-01", w: 800 },
  { row: 2, wrap: "mxd-hero-02-image__landscape landscape-02", inner: "type-03", w: 1200 },
  { row: 2, wrap: "mxd-hero-02-image__portrait portrait-xl portrait-03", inner: "type-02", w: 1000 },
  { row: 3, wrap: "mxd-hero-02-image__portrait portrait-04", inner: "type-01", w: 800 },
  { row: 3, wrap: "mxd-hero-02-image__landscape landscape-03", inner: "type-03", w: 1200 },
];

/** Rayo hero 02 — pinned fullscreen caption + marquee with a scrolling case-study wall. */
export default function HeroPinned({ section }: { section: HeroData }) {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!rootRef.current) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".hero-02-static-anim-el").forEach((el) => {
        gsap
          .timeline({ scrollTrigger: { trigger: ".hero-02-static__tl-trigger", start: "top 14%", end: "top 0.2%", scrub: true } })
          .fromTo(el, { y: 0, scaleY: 1, opacity: 1 }, { y: "-5rem", scaleY: 1.3, opacity: 0, ease: "sine" });
      });
      gsap.utils.toArray<HTMLElement>(".hero-02-fade-out-scroll").forEach((el) => {
        gsap
          .timeline({ scrollTrigger: { trigger: ".mxd-pinned-fullscreen__tl-trigger", start: "top 80%", end: "top 10%", scrub: true } })
          .fromTo(el, { opacity: 1 }, { opacity: 0, ease: "sine" });
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  const [captionA, ...captionRest] = (section.caption ?? "").split("\n");
  const floating = heroImages(section.media, 700)[0];
  const marqueeItems = section.marqueeItems?.length ? section.marqueeItems : captionA ? [captionA] : [];
  const studies = (section.caseStudies ?? []).slice(0, SLOTS.length);
  const rows = [1, 2, 3].map((r) => SLOTS.map((s, i) => ({ ...s, i })).filter((s) => s.row === r && studies[s.i]));

  return (
    <div className="mxd-section" ref={rootRef} {...sectionAttrs(section)}>
      <div className="mxd-hero-02 mxd-pinned-fullscreen">
        <div className="mxd-pinned-fullscreen__static hero-02-fade-out-scroll loading-wrap">
          <div className="hero-02-static__tl-trigger" />
          <div className="mxd-hero-02-static__top hero-02-static-anim-el">
            <div className="mxd-container fullwidth-container grid-container">
              <div className="container-fluid p-0">
                <div className="row g-0">
                  <div className="col-12 col-xl-6 mxd-grid-item no-margin">
                    <div className="hero-02-static__caption loading__item">
                      {captionA && <p className="t-large t-medium t-120 t-bright">{captionA}</p>}
                      {captionRest.length > 0 && <p className="t-large t-medium t-120 t-muted">{captionRest.join(" ")}</p>}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mxd-hero-02-static__center">
            <div className="mxd-hero-02-marquee">
              {floating && (
                <div className="mxd-hero-02-marquee__image loading__item">
                  <Image className={floating.idle || "mxd-move"} {...floating.img} priority sizes="(max-width: 768px) 40vw, 20vw" />
                </div>
              )}
              <div className="mxd-hero-02-marquee__line loading__item">
                <WordMarquee items={marqueeItems} direction="left" className="marquee marquee-left--gsap" />
              </div>
            </div>
          </div>
          <div className="mxd-hero-02-static__bottom hero-02-static-anim-el">
            <div className="mxd-container fullwidth-container grid-container">
              <div className="container-fluid p-0">
                <div className="row g-0">
                  <div className="col-12 col-md-6 col-xl-4 mxd-grid-item no-margin">
                    <div className="loading__fade">
                      <ValueLists left={section.valuesLeft} right={section.valuesRight} textClass="t-small anim-uni-in-up" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {section.cta?.label && (
            <div className="mxd-hero-02-static__btn hero-02-static-anim-el loading__fade">
              <RotatingButton text={section.cta.label} href={ctaHref(section.cta)} className="btn-rotating btn-rotating-160">
                <Star60 className="btn-rotating__image" fill="--accent" />
              </RotatingButton>
            </div>
          )}
        </div>
        <div className="mxd-pinned-fullscreen__scroll">
          <div className="mxd-hero-02-scroll__wrap">
            <div className="mxd-hero-02-scroll__images">
              {rows.map((row, r) => (
                <div key={r} className={`mxd-hero-02-images__row mxd-hero-02-images__row-0${r + 1}`}>
                  {row.map((slot) => {
                    const cs = studies[slot.i];
                    const img = imageProps(cs.previewImage, slot.w, { alt: cs.title ?? "" });
                    return (
                      <Link key={cs._id} href={`/our-work/${cs.slug ?? ""}`} className={slot.wrap}>
                        <div className={`mxd-hero-02-image__inner ${slot.inner} anim-uni-in-up`}>
                          {img && <Image {...img} sizes="(max-width: 768px) 60vw, 30vw" />}
                          <div className="mxd-preview-hover">
                            <i className="mxd-preview-hover__icon icon-small">
                              <Image alt="" src="/img/icons/icon-eye.svg" width={38} height={21} />
                            </i>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              ))}
              {studies.length === 0 && (
                <p className="t-muted" style={{ padding: "4rem" }}>
                  <Star80 /> Mark some case studies as featured to fill this wall.
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="mxd-pinned-fullscreen__tl-trigger" />
      </div>
    </div>
  );
}
