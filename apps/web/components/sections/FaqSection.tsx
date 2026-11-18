"use client";
import { useEffect, useRef, useState } from "react";
import RevealText from "@/components/animation/RevealText";
import { RichText, SimpleText } from "./Text";
import { sectionAttrs, type SectionOf } from "./types";

export default function FaqSection({ section }: { section: SectionOf<"faqSection"> }) {
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  const [heights, setHeights] = useState<number[]>([]);
  const [active, setActive] = useState(-1);
  const faqs = (section.faqs ?? []).filter(Boolean);

  useEffect(() => {
    setHeights(refs.current.map((el) => el?.scrollHeight ?? 0));
  }, [faqs.length]);

  if (faqs.length === 0) return null;

  return (
    <div className="mxd-section mxd-section-inner-form padding-default" {...sectionAttrs(section)}>
      <div className="mxd-container grid-container">
        <div className="mxd-block">
          <div className="container-fluid px-0">
            <div className="row gx-0">
              <div className="col-12 col-xl-2 mxd-grid-item no-margin" />
              <div className="col-12 col-xl-8 mxd-grid-item no-margin">
                <div className="mxd-block__content">
                  {(section.heading || section.intro) && (
                    <div className="mxd-block__paragraph">
                      <RevealText as="h2" className="reveal-type anim-uni-in-up">
                        {section.heading}
                      </RevealText>
                      <SimpleText value={section.intro} className="t-large t-bright anim-uni-in-up" />
                    </div>
                  )}
                  <div className="mxd-accordion loading__fade">
                    {faqs.map((f, idx) => (
                      <div key={f._id} className="mxd-accordion__item">
                        <div className="mxd-accordion__divider anim-uni-in-up" />
                        <div onClick={() => setActive((p) => (p === idx ? -1 : idx))} className="mxd-accordion__title anim-uni-in-up" role="button" aria-expanded={active === idx}>
                          <h6>{f.question}</h6>
                          <div className={`mxd-accordion__arrow ${idx === active ? "accordion-rotate" : ""}`}>
                            <i className="ph ph-plus" />
                          </div>
                        </div>
                        <div
                          className="mxd-accordion__content"
                          style={{
                            display: "block",
                            height: active === idx ? `calc(${heights[idx] ?? 0}px + 3.4rem)` : 0,
                            paddingBottom: active === idx ? "3.4rem" : 0,
                            overflow: "hidden",
                            transition: "all 0.3s ease",
                          }}
                          ref={(el) => {
                            refs.current[idx] = el;
                          }}
                        >
                          <div className="mxd-accordion__text">
                            <RichText value={f.answer} />
                          </div>
                        </div>
                        <div className="mxd-accordion__divider anim-uni-in-up" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
