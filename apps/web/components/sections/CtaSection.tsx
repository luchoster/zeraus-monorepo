import Image from "next/image";
import RevealText from "@/components/animation/RevealText";
import { backgroundUrl, imageProps } from "@/sanity/image";
import { CmsButton } from "./CmsLink";
import { sectionAttrs, type SectionOf } from "./types";

export default function CtaSection({ section }: { section: SectionOf<"ctaSection"> }) {
  const icon = imageProps(section.icon, 300, { alt: "" });
  const bg = backgroundUrl(section.backgroundImage, 1600);
  const images = (section.images ?? []).map((img) => imageProps(img, 800)).filter(Boolean) as NonNullable<ReturnType<typeof imageProps>>[];

  return (
    <div className="mxd-section overflow-hidden" {...sectionAttrs(section)}>
      <div className="mxd-container">
        <div className="mxd-block">
          <div className="mxd-promo">
            <div className="mxd-promo__inner anim-zoom-out-container">
              <div className="mxd-promo__bg" style={bg ? { backgroundImage: `url(${bg})` } : undefined} />
              <div className="mxd-promo__content">
                <p className="mxd-promo__title anim-uni-in-up">
                  {icon && (
                    <span className="mxd-promo__icon">
                      <Image {...icon} sizes="150px" />
                    </span>
                  )}
                  <RevealText as="span" className="mxd-promo__caption reveal-type">
                    {section.caption}
                  </RevealText>
                </p>
                {section.cta && (
                  <div className="mxd-promo__controls anim-uni-in-up">
                    <CmsButton link={section.cta} className="btn btn-anim btn-default btn-large btn-additional slide-right-up" />
                  </div>
                )}
              </div>
              {images.length > 0 && (
                <div className="mxd-promo__images">
                  {images.map((img, i) => (
                    <Image key={i} className={`promo-image promo-image-${i + 1}`} {...img} sizes="(max-width: 768px) 40vw, 400px" />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
