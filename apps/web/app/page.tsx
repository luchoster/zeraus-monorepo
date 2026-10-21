import Cta from "@/components/common/Cta";
import Footer2 from "@/components/footers/Footer2";

import About from "@/components/homes/home-software-development-company/About";
import Capabilities from "@/components/homes/home-software-development-company/Capabilities";
import Facts from "@/components/homes/home-software-development-company/Facts";
import Hero from "@/components/homes/home-software-development-company/Hero";
import MarqueeSlider from "@/components/homes/home-software-development-company/MarqueeSlider";
import MarqueeSlider2 from "@/components/homes/home-software-development-company/MarqueeSlider2";
import ParallaxBanner from "@/components/homes/home-software-development-company/ParallaxBanner";
import ParallaxDivider from "@/components/homes/home-software-development-company/ParallaxDivider";
import Projects from "@/components/homes/home-software-development-company/Projects";
import Services from "@/components/homes/home-software-development-company/Services";
import TechStacks from "@/components/homes/home-software-development-company/TechStacks";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ZERAus | Digital Studio",
  description:
    "Websites, software, integrations and brands — built in Las Vegas by ZERAus.",
};

/**
 * Home — the Rayo "software development company" layout.
 *
 * Section order is intentionally the template's. Each section still reads
 * from the template's JSON/hard-coded copy; the Sanity wiring happens
 * section-by-section per docs/SCHEMA_PLAN.md (homePage.sections[]).
 */
export default function HomePage() {
  return (
    <>
      <main id="mxd-page-content" className="mxd-page-content">
        <Hero />
        <MarqueeSlider />
        <Services />
        <About />
        <ParallaxBanner />
        <Capabilities />
        <Projects />
        <TechStacks />
        <MarqueeSlider2 />
        <Facts />
        <ParallaxDivider />
        <Cta />
      </main>
      <Footer2 />
    </>
  );
}
