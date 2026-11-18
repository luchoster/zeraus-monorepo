import RevealText from "@/components/animation/RevealText";
import { CmsButton } from "./CmsLink";
import { SimpleText } from "./Text";
import { sectionAttrs, type SectionOf } from "./types";

function List({ items }: { items?: string[] | null }) {
  if (!items?.length) return null;
  return (
    <div className="col-6 col-xl-5">
      <ul>
        {items.map((v) => (
          <li key={v}>
            <p className="anim-uni-in-up">{v}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function AboutSection({ section }: { section: SectionOf<"aboutSection"> }) {
  return (
    <div className="mxd-section padding-default" {...sectionAttrs(section)}>
      <div className="mxd-container grid-container">
        <div className="mxd-block">
          <div className="container-fluid px-0">
            <div className="row gx-0">
              <div className="col-12 col-xl-5 mxd-grid-item no-margin">
                <div className="mxd-block__name">
                  <RevealText as="h2" className="reveal-type anim-uni-in-up">
                    {section.heading}
                  </RevealText>
                </div>
              </div>
              <div className="col-12 col-xl-6 mxd-grid-item no-margin">
                <div className="mxd-block__content">
                  <div className="mxd-block__paragraph">
                    <SimpleText value={section.body} className="t-large t-bright anim-uni-in-up" />
                    {(section.valuesLeft?.length || section.valuesRight?.length) && (
                      <div className="mxd-paragraph__lists">
                        <div className="container-fluid p-0">
                          <div className="row g-0">
                            <List items={section.valuesLeft} />
                            <List items={section.valuesRight} />
                          </div>
                        </div>
                      </div>
                    )}
                    {section.cta && (
                      <div className="mxd-paragraph__controls anim-uni-in-up">
                        <CmsButton link={section.cta} className="btn btn-anim btn-default btn-outline slide-right-up" />
                      </div>
                    )}
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
