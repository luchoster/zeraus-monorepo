import AnimatedButton from "@/components/animation/AnimatedButton";
import { sectionAttrs } from "../types";
import { SimpleText } from "../Text";
import { HeroVideo, Mark, RotatingButton, Star60, ValueLists, WordMarquee, ctaHref, type HeroData } from "./shared";

/** Rayo hero 06 — background video, lists, description + rotating button, headline, marquee. */
export default function HeroFreelancer({ section }: { section: HeroData }) {
  const rotating = section.cta?.label ? (
    <RotatingButton text={section.cta.label} href={ctaHref(section.cta)} className="btn-rotating btn-rotating-blur-outline ver-04 permanent-desktop">
      <Star60 className="btn-rotating__image" fill="--accent" />
    </RotatingButton>
  ) : null;

  return (
    <div className="mxd-section" {...sectionAttrs(section)}>
      <div className="mxd-hero-06">
        <div className="mxd-hero-06__wrap loading-wrap">
          <div className="mxd-hero-06__top">
            <div className="mxd-hero-06__content">
              {(section.dividerVideo?.video || section.dividerVideo?.poster) && (
                <div className="mxd-hero-06__video">
                  <HeroVideo video={section.dividerVideo} className="video" />
                  <div className="hero-06-video__cover" />
                </div>
              )}
              <div className="mxd-hero-06__data">
                <div className="mxd-hero-06__list">
                  <ValueLists left={section.valuesLeft} right={section.valuesRight} colClass="col-6 col-lg-4 col-xl-2" />
                </div>
                <div className="mxd-hero-06__headline">
                  <div className="hero-06-headline__descr">
                    {section.description && (
                      <div className="loading__item">
                        <SimpleText value={section.description} />
                      </div>
                    )}
                    {rotating && <div className="hero-06-headline__btn loading__item">{rotating}</div>}
                  </div>
                  <div className="hero-06-headline__content">
                    <h1 className="hero-06-headline__title">{section.title?.replace(/\n/g, " ")}</h1>
                    {section.marqueeItems && section.marqueeItems.length > 0 && (
                      <div className="mxd-hero-06__marquee loading__item">
                        <WordMarquee items={section.marqueeItems} className="marquee marquee-right--gsap permanent-desktop" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mxd-hero-06__bottom loading__fade">
            <div className="mxd-hero-06__mark">
              <Mark text={section.availabilityMark} />
            </div>
            <div className="mxd-hero-06__more">
              <AnimatedButton text="Scroll for more" as="a" className="btn btn-line-medium btn-anim btn-anim-medium slide-down" href={ctaHref(section.cta, "#work")}>
                <i className="ph-bold ph-arrow-elbow-right-down" />
              </AnimatedButton>
            </div>
          </div>
          {rotating && <div className="mxd-hero-06__btn-mobile">{rotating}</div>}
        </div>
      </div>
    </div>
  );
}
