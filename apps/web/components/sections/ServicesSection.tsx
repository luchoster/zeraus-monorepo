import Image from "next/image";
import Link from "next/link";
import RevealText from "@/components/animation/RevealText";
import { imageProps } from "@/sanity/image";
import { SimpleText } from "./Text";
import { sectionAttrs, type SectionOf } from "./types";

const BG: Record<string, { card: string; opposite: boolean }> = {
  tint: { card: "bg-base-tint", opposite: false },
  accent: { card: "bg-accent", opposite: true },
  additional: { card: "bg-additional", opposite: false },
  opposite: { card: "bg-base-opp", opposite: true },
};
// Rayo's five cards, in order: image placement, idle animation and reveal direction.
const IMAGE_POS: Record<string, string> = {
  right: "image-right",
  "top-right": "image-top-right",
  bottom: "image-bottom",
  "bottom-low": "image-bottom image-bottom-2",
  top: "image-top",
};
const DEFAULT_POS = ["right", "top-right", "bottom", "bottom-low", "top"];
const DEFAULT_ANIM = ["none", "move", "rotate-slow", "none", "none"];
const ANIM_CLASS: Record<string, string> = { move: "mxd-move", "rotate-slow": "mxd-rotate-slow", "pulse-small": "mxd-pulse-small" };
const SCALE_IN = ["anim-uni-scale-in-right", "anim-uni-scale-in-left", "anim-uni-scale-in-right", "anim-uni-scale-in", "anim-uni-scale-in-left"];

export default function ServicesSection({ section }: { section: SectionOf<"servicesSection"> }) {
  const cards = (section.cards ?? []).filter((c) => c.service);
  if (cards.length === 0) return null;

  return (
    <div className="mxd-section overflow-hidden padding-pre-title" {...sectionAttrs(section)}>
      <div className="mxd-container grid-container">
        {section.heading && (
          <div className="mxd-block">
            <div className="mxd-section-title">
              <div className="mxd-section-title__title">
                <RevealText as="h2" className="reveal-type">
                  {section.heading}
                </RevealText>
              </div>
            </div>
          </div>
        )}
        <div className="mxd-block">
          <div className="mxd-services-cards-s">
            <div className="container-fluid px-0">
              <div className="row gx-0">
                {cards.map((card, i) => {
                  const s = card.service!;
                  const wide = card.size === "wide";
                  const theme = BG[card.theme ?? "tint"] ?? BG.tint;
                  const img = imageProps(s.illustration, 1200);
                  const title = s.shortTitle || s.title;
                  const pos = IMAGE_POS[card.imagePosition ?? ""] ?? IMAGE_POS[wide ? "right" : DEFAULT_POS[i] ?? "top"];
                  const anim = ANIM_CLASS[card.imageAnimation && card.imageAnimation !== "none" ? card.imageAnimation : DEFAULT_ANIM[i] ?? "none"];
                  return (
                    <div key={card._key} className={`col-12 col-xl-${wide ? 8 : 4} mxd-services-cards-s__item mxd-grid-item ${SCALE_IN[i % SCALE_IN.length]}`}>
                      <div className={`mxd-services-cards-s__inner ${wide ? "justify-between" : "justify-end"} ${theme.card} radius-l padding-4`}>
                        <div className="mxd-services-cards-s__title">
                          <h3 className={`anim-uni-in-up ${theme.opposite ? "opposite" : ""}`}>
                            <Link href={`/services/${s.slug ?? ""}`}>{title}</Link>
                          </h3>
                        </div>
                        <div className={`mxd-services-cards-s__info ${wide ? "width-50" : ""}`}>
                          {s.tags && s.tags.length > 0 && (
                            <div className="mxd-services-cards-s__tags">
                              {s.tags.map((tag) => (
                                <span key={tag} className={`tag tag-default ${theme.opposite ? "tag-outline-opposite" : "tag-outline"} anim-uni-in-up`}>
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                          <SimpleText value={s.excerpt} className={`anim-uni-in-up ${theme.opposite ? "t-opposite" : theme.card === "bg-additional" ? "t-bright" : ""}`} />
                        </div>
                        {img && (
                          <div className={`mxd-services-cards-s__image ${pos}`}>
                            <Image className={anim} {...img} sizes="(max-width: 1200px) 60vw, 30vw" />
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
