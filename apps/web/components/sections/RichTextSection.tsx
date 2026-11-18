import RevealText from "@/components/animation/RevealText";
import { RichText } from "./Text";
import { sectionAttrs, type SectionOf } from "./types";

export default function RichTextSection({ section }: { section: SectionOf<"richTextSection"> }) {
  return (
    <div className="mxd-section padding-default" {...sectionAttrs(section)}>
      <div className="mxd-container grid-container">
        <div className="mxd-block">
          <div className="container-fluid px-0">
            <div className="row gx-0">
              <div className="col-12 col-xl-5 mxd-grid-item no-margin">
                {section.heading && (
                  <div className="mxd-block__name">
                    <RevealText as="h2" className="reveal-type anim-uni-in-up">
                      {section.heading}
                    </RevealText>
                  </div>
                )}
              </div>
              <div className="col-12 col-xl-6 mxd-grid-item no-margin">
                <div className="mxd-block__content">
                  <div className="mxd-block__paragraph mxd-article">
                    <RichText value={section.body} />
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
