"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import VideoModalButton from "@/components/common/VideoModalButton";
import { Lines, sectionAttrs } from "../types";
import { SimpleText } from "../Text";
import { HeroVideo, Mark, heroImages, type HeroData } from "./shared";

gsap.registerPlugin(ScrollTrigger);

/** Rayo hero 08 — rotating image behind a headline, status mark, description, video card. */
export default function HeroDesigner({ section }: { section: HeroData }) {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!rootRef.current) return;
    const ctx = gsap.context(() => {
      const trigger = ".mxd-hero-08__tl-trigger";
      gsap.utils.toArray<HTMLElement>(".hero-08-slide-out-scroll").forEach((el) => {
        gsap.timeline({ scrollTrigger: { trigger, start: "top 80%", end: "top 40%", scrub: true } }).fromTo(el, { y: 0, opacity: 1 }, { y: "-5rem", opacity: 0 });
      });
      gsap.utils.toArray<HTMLElement>(".hero-08-scale-out-scroll").forEach((el) => {
        gsap.timeline({ scrollTrigger: { trigger, start: "top 40%", end: "top 10%", scrub: true } }).fromTo(el, { y: 0, scaleY: 1, opacity: 1 }, { y: "-5rem", scaleY: 1.2, opacity: 0 });
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  const [img] = heroImages(section.media, 800);
  const hasVideo = Boolean(section.dividerVideo?.video || section.dividerVideo?.poster);

  return (
    <div className="mxd-section" ref={rootRef} {...sectionAttrs(section)}>
      <div className="mxd-hero-08">
        <div className="mxd-hero-08__wrap loading-wrap">
          <div className="mxd-hero-08__center">
            <div className="mxd-hero-08__headline">
              <div className="mxd-container">
                {img && (
                  <div className="hero-08-headline__image">
                    <Image className={img.idle || "mxd-rotate-slow"} {...img.img} priority sizes="(max-width: 768px) 70vw, 40vw" />
                  </div>
                )}
                <div className="hero-08-headline__title hero-08-slide-out-scroll loading__item">
                  <h1>
                    <Lines text={section.title} />
                  </h1>
                </div>
              </div>
            </div>
          </div>
          <div className="mxd-hero-08__bottom">
            <div className="mxd-hero-08__data-wrap hero-08-scale-out-scroll">
              <Mark text={section.availabilityMark} className="loading__item" />
              {section.description && (
                <div className="mxd-hero-08__descr loading__item">
                  <SimpleText value={section.description} className="t-large t-bright t-medium t-120" />
                </div>
              )}
            </div>
            {hasVideo && (
              <div className="mxd-hero-08__video-wrap hero-08-scale-out-scroll loading__item">
                <HeroVideo video={section.dividerVideo} className="mxd-hero-08__video" />
                {section.videoModalUrl && (
                  <div className="mxd-hero-08__video-btn">
                    <VideoModalButton videoSrc={section.videoModalUrl} iconClassName="ph-fill ph-play" buttonClassName="btn btn-round btn-round-medium btn-accent slide-right anim-no-delay showreel-trigger" />
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="mxd-hero-08__tl-trigger" />
        </div>
      </div>
    </div>
  );
}
