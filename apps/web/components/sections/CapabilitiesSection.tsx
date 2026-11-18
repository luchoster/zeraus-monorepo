"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import RevealText from "@/components/animation/RevealText";
import { imageProps } from "@/sanity/image";
import { CmsButton } from "./CmsLink";
import { sectionAttrs, type SectionOf } from "./types";

export default function CapabilitiesSection({ section }: { section: SectionOf<"capabilitiesSection"> }) {
  const [hover, setHover] = useState<{ index: number | null; x: number }>({ index: null, x: 0 });
  const services = (section.services ?? []).filter(Boolean);
  if (services.length === 0) return null;

  return (
    <div className="mxd-section overflow-hidden padding-grid-pre-pinned" {...sectionAttrs(section)}>
      <div className="mxd-container grid-container">
        <div className="mxd-block">
          <div className="mxd-section-title">
            <div className="container-fluid p-0">
              <div className="row g-0">
                <div className="col-12 col-xl-6 mxd-grid-item no-margin">
                  <div className="mxd-section-title__hrtitle">
                    <RevealText as="h2" className="reveal-type">
                      {section.heading}
                    </RevealText>
                  </div>
                </div>
                <div className="col-12 col-xl-3 mxd-grid-item no-margin" />
                <div className="col-12 col-xl-3 mxd-grid-item no-margin">
                  {section.cta && (
                    <div className="mxd-section-title__hrcontrols anim-uni-in-up">
                      <CmsButton link={section.cta} className="btn btn-anim btn-default btn-outline slide-right-up" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mxd-block">
          <div className="container-fluid p-0">
            <div className="row g-0">
              <div className="col-12 mxd-grid-item no-margin">
                <div className="mxd-cpb-list">
                  {services.map((s, idx) => {
                    const main = imageProps(s.cardImage, 1200);
                    const hoverImg = imageProps(s.hoverImage, 600);
                    const active = hover.index === idx;
                    return (
                      <div
                        key={s._id}
                        className="mxd-cpb-list__item hover-reveal__item"
                        onMouseMove={(e) => setHover({ index: idx, x: e.clientX })}
                        onMouseLeave={() => setHover((p) => ({ index: null, x: p.x }))}
                      >
                        <div className="mxd-cpb-list__divider anim-uni-in-up" />
                        {hoverImg && (
                          <div
                            className="hover-reveal__content hover-reveal-280x340"
                            style={{ opacity: active ? 1 : 0, transform: "translate(-80%, -50%)", left: hover.x, pointerEvents: "none", transition: "opacity 0.3s ease" }}
                          >
                            <Image className="hover-reveal__image" style={{ transform: active ? "scale(1,1)" : "scale(1,1.4)", transition: "transform 0.3s ease" }} {...hoverImg} sizes="280px" />
                          </div>
                        )}
                        <div className="mxd-cpb-list__content anim-uni-in-up">
                          <h6 className="mxd-cpb-list__title">
                            <Link href={`/services/${s.slug ?? ""}`}>{s.title}</Link>
                          </h6>
                          <div className="mxd-cpb-list__num">
                            <span>/ {String(idx + 1).padStart(2, "0")}</span>
                          </div>
                        </div>
                        {main && (
                          <div className="mxd-cpb-list__image anim-uni-in-up">
                            <Image {...main} sizes="(max-width: 1200px) 50vw, 600px" />
                          </div>
                        )}
                        <div className="mxd-cpb-list__divider anim-uni-in-up" />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
