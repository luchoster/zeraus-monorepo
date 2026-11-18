import Image from "next/image";
import RevealText from "@/components/animation/RevealText";
import VelocityMarquee from "@/components/animation/VelocityMarquee";
import { imageProps } from "@/sanity/image";
import { sectionAttrs, type SectionOf } from "./types";

type Partner = NonNullable<SectionOf<"partnersSection">["partners"]>[number];

function Row({ items, direction }: { items: Partner[]; direction: "left" | "right" }) {
  return (
    <VelocityMarquee direction={direction} className="marquee marquee--gsap">
      {items.map((p) => {
        const logo = imageProps(p.logo, 700, { alt: `${p.name} logo` });
        if (!logo) return null;
        const inner = <Image {...logo} sizes="200px" />;
        return p.url ? (
          <a key={p._id} className="marquee__item item-partners" href={p.url} target="_blank" rel="noopener noreferrer">
            {inner}
          </a>
        ) : (
          <span key={p._id} className="marquee__item item-partners">
            {inner}
          </span>
        );
      })}
    </VelocityMarquee>
  );
}

export default function PartnersSection({ section }: { section: SectionOf<"partnersSection"> }) {
  const partners = (section.partners ?? []).filter(Boolean);
  if (partners.length === 0) return null;
  // Two counter-scrolling rows once there are enough logos, like Rayo's Partners block.
  const split = partners.length >= 6 ? Math.ceil(partners.length / 2) : partners.length;
  const top = partners.slice(0, split);
  const bottom = partners.slice(split);

  return (
    <div className="mxd-section padding-pre-title" {...sectionAttrs(section)}>
      {section.heading && (
        <div className="mxd-container grid-container">
          <div className="mxd-block">
            <div className="mxd-section-title">
              <div className="mxd-section-title__title">
                <RevealText as="h2" className="reveal-type">
                  {section.heading}
                </RevealText>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="mxd-container fullwidth-container">
        <div className="mxd-block">
          <Row items={top} direction="left" />
          {bottom.length > 0 && <Row items={bottom} direction="right" />}
        </div>
      </div>
    </div>
  );
}
