import type { Metadata } from "next";
import { pageMetadata, SanityPage } from "@/components/pages/SanityPage";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata("about-us");
}

export default function AboutUsPage() {
  return <SanityPage slug="about-us" />;
}
