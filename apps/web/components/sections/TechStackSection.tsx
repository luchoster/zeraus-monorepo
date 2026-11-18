import Image from "next/image";
import RevealText from "@/components/animation/RevealText";
import { imageProps } from "@/sanity/image";
import { sectionAttrs, type SectionOf } from "./types";

export default function TechStackSection({ section }: { section: SectionOf<"techStackSection"> }) {
  const items = (section.items ?? []).filter(Boolean);
  if (items.length === 0) return null;

  return (
    <div className="mxd-section padding-grid-pre-mtext" {...sectionAttrs(section)}>
      <div className="mxd-container grid-container">
        <div className="mxd-block">
          <div className="container-fluid px-0">
            <div className="row gx-0">
              <div className="col-12 col-xl-5 mxd-grid-item">
                <div className="mxd-section-title pre-grid no-margin-desktop">
                  <div className="container-fluid p-0">
                    <div className="row g-0">
                      <div className="col-12">
                        <div className="mxd-section-title__title">
                          <RevealText as="h2" className="reveal-type">
                            {section.heading}
                          </RevealText>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-xl-7">
                <div className="mxd-tech-stack-cards">
                  <div className="container-fluid p-0">
                    <div className="row g-0">
                      {items.map((t) => {
                        const logo = imageProps(t.logo, 256, { alt: `${t.name} logo` });
                        const card = (
                          <div className="mxd-tech-stack-cards__inner">
                            <div className="mxd-tech-stack-cards__logo">{logo && <Image {...logo} sizes="128px" />}</div>
                            <div className="mxd-tech-stack-cards__title">
                              <p className="t-bright t-caption">{t.name}</p>
                            </div>
                          </div>
                        );
                        return (
                          <div key={t._id} className="col-12 col-md-6 col-xxl-4 mxd-tech-stack-cards__item mxd-grid-item animate-card-3">
                            {t.url ? (
                              <a href={t.url} target="_blank" rel="noopener noreferrer">
                                {card}
                              </a>
                            ) : (
                              card
                            )}
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
      </div>
    </div>
  );
}
