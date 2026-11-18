import RevealText from "@/components/animation/RevealText";
import { sectionAttrs, type SectionOf } from "./types";

export default function CreditsSection({ section }: { section: SectionOf<"creditsSection"> }) {
  const items = section.items ?? [];
  if (items.length === 0) return null;
  return (
    <div className="mxd-section padding-default" {...sectionAttrs(section)}>
      <div className="mxd-container grid-container">
        <div className="mxd-block">
          <div className="container-fluid px-0">
            <div className="row gx-0">
              <div className="col-12 col-xl-5 mxd-grid-item no-margin">
                <div className="mxd-block__name">
                  <RevealText as="h2" className="reveal-type anim-uni-in-up">
                    {section.heading ?? "Credits"}
                  </RevealText>
                </div>
              </div>
              <div className="col-12 col-xl-6 mxd-grid-item no-margin">
                <div className="mxd-block__content">
                  <ul className="mxd-data-list">
                    {items.map((c) => (
                      <li key={c._key} className="anim-uni-in-up">
                        {c.url ? (
                          <a href={c.url} target="_blank" rel="noopener noreferrer" className="link-small-underline">
                            {c.name}
                          </a>
                        ) : (
                          c.name
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
