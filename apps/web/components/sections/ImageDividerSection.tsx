import BackgroundParallax from "@/components/animation/BackgroundParallax";
import { backgroundUrl } from "@/sanity/image";
import { sectionAttrs, type SectionOf } from "./types";

export default function ImageDividerSection({ section }: { section: SectionOf<"imageDividerSection"> }) {
  const url = backgroundUrl(section.image, 2400);
  if (!url) return null;
  return (
    <div className="mxd-section padding-pre-title" {...sectionAttrs(section)}>
      <div className="mxd-container">
        <div className="mxd-divider">
          <BackgroundParallax
            scale={section.parallaxScale ?? 1.5}
            className="mxd-divider__image parallax-img"
            style={{ backgroundImage: `url(${url})` }}
            role="img"
            aria-label={section.image?.alt ?? undefined}
          />
        </div>
      </div>
    </div>
  );
}
