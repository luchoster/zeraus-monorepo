import RevealText from "@/components/animation/RevealText";
import ContactForm from "@/components/other-pages/contact/ContactForm";
import { SimpleText } from "./Text";
import { sectionAttrs, type SectionOf } from "./types";

/**
 * Phase 3 (docs/SCHEMA_PLAN.md §5.5) replaces these with API routes writing to Sanity.
 * Until then: `contact` renders the existing form; the other kinds show the intro only.
 */
export default function FormSection({ section }: { section: SectionOf<"formSection"> }) {
  return (
    <>
      {(section.heading || section.intro) && (
        <div className="mxd-section padding-pre-title" {...sectionAttrs(section)}>
          <div className="mxd-container grid-container">
            <div className="mxd-block">
              <div className="container-fluid px-0">
                <div className="row gx-0">
                  <div className="col-12 col-xl-2 mxd-grid-item no-margin" />
                  <div className="col-12 col-xl-8 mxd-grid-item no-margin">
                    <div className="mxd-block__paragraph">
                      {section.heading && (
                        <RevealText as="h2" className="reveal-type anim-uni-in-up">
                          {section.heading}
                        </RevealText>
                      )}
                      <SimpleText value={section.intro} className="t-large t-bright anim-uni-in-up" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {section.form === "contact" && <ContactForm />}
      {section.form !== "contact" && process.env.NODE_ENV === "development" && (
        <div className="mxd-section padding-default" style={{ textAlign: "center", opacity: 0.6 }}>
          <p className="t-small">[{section.form} form — wired in phase 3]</p>
        </div>
      )}
    </>
  );
}
