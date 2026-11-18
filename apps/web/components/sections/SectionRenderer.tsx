import type { PageSettings, Section } from "./types";
import HeroSection from "./HeroSection";
import InnerHeroSection from "./InnerHeroSection";
import MarqueeSection from "./MarqueeSection";
import ServicesSection from "./ServicesSection";
import AboutSection from "./AboutSection";
import ImageDividerSection from "./ImageDividerSection";
import CapabilitiesSection from "./CapabilitiesSection";
import CaseStudiesSection from "./CaseStudiesSection";
import TechStackSection from "./TechStackSection";
import StatsSection from "./StatsSection";
import PartnersSection from "./PartnersSection";
import TestimonialsSection from "./TestimonialsSection";
import LatestPostsSection from "./LatestPostsSection";
import FaqSection from "./FaqSection";
import CtaSection from "./CtaSection";
import RichTextSection from "./RichTextSection";
import FormSection from "./FormSection";
import CreditsSection from "./CreditsSection";

/** `sections[]` → Rayo blocks. One case per type in apps/studio/schemas/web/sections. */
export function SectionRenderer({ sections, settings }: { sections?: Section[] | null; settings: PageSettings }) {
  if (!Array.isArray(sections) || sections.length === 0) return null;
  return (
    <>
      {sections.map((section) => {
        switch (section._type) {
          case "heroSection":
            return <HeroSection key={section._key} section={section} settings={settings} />;
          case "innerHeroSection":
            return <InnerHeroSection key={section._key} section={section} />;
          case "marqueeSection":
            return <MarqueeSection key={section._key} section={section} />;
          case "servicesSection":
            return <ServicesSection key={section._key} section={section} />;
          case "aboutSection":
            return <AboutSection key={section._key} section={section} />;
          case "imageDividerSection":
            return <ImageDividerSection key={section._key} section={section} />;
          case "capabilitiesSection":
            return <CapabilitiesSection key={section._key} section={section} />;
          case "caseStudiesSection":
            return <CaseStudiesSection key={section._key} section={section} />;
          case "techStackSection":
            return <TechStackSection key={section._key} section={section} />;
          case "statsSection":
            return <StatsSection key={section._key} section={section} />;
          case "partnersSection":
            return <PartnersSection key={section._key} section={section} />;
          case "testimonialsSection":
            return <TestimonialsSection key={section._key} section={section} />;
          case "latestPostsSection":
            return <LatestPostsSection key={section._key} section={section} />;
          case "faqSection":
            return <FaqSection key={section._key} section={section} />;
          case "ctaSection":
            return <CtaSection key={section._key} section={section} />;
          case "richTextSection":
            return <RichTextSection key={section._key} section={section} />;
          case "formSection":
            return <FormSection key={section._key} section={section} />;
          case "creditsSection":
            return <CreditsSection key={section._key} section={section} />;
          default: {
            const unknown = section as { _key: string; _type: string };
            if (process.env.NODE_ENV === "development") {
              return (
                <div key={unknown._key} className="mxd-section" style={{ padding: 40, textAlign: "center", opacity: 0.6 }}>
                  Unknown section type: {unknown._type}
                </div>
              );
            }
            return null;
          }
        }
      })}
    </>
  );
}
