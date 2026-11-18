import type { PageSettings, SectionOf } from "./types";
import HeroSoftware from "./hero/HeroSoftware";
import HeroAgency from "./hero/HeroAgency";
import HeroPinned from "./hero/HeroPinned";
import HeroStudio from "./hero/HeroStudio";
import HeroWebAgency from "./hero/HeroWebAgency";
import HeroFreelancer from "./hero/HeroFreelancer";
import HeroCreativeDeveloper from "./hero/HeroCreativeDeveloper";
import HeroDesigner from "./hero/HeroDesigner";
import HeroPersonal from "./hero/HeroPersonal";

/**
 * `heroSection.variant` → one of the nine Rayo hero layouts (see HERO_VARIANTS in
 * apps/studio/schemas/web/sections/heroSection.ts). Defaults to the software layout.
 */
export default function HeroSection({ section, settings }: { section: SectionOf<"heroSection">; settings: PageSettings }) {
  switch (section.variant) {
    case "agency":
      return <HeroAgency section={section} settings={settings} />;
    case "pinned":
      return <HeroPinned section={section} />;
    case "studio":
      return <HeroStudio section={section} />;
    case "webAgency":
      return <HeroWebAgency section={section} />;
    case "freelancer":
      return <HeroFreelancer section={section} />;
    case "creativeDeveloper":
      return <HeroCreativeDeveloper section={section} />;
    case "designer":
      return <HeroDesigner section={section} />;
    case "personal":
      return <HeroPersonal section={section} />;
    case "software":
    default:
      return <HeroSoftware section={section} settings={settings} />;
  }
}
