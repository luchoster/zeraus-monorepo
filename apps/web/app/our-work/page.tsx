import type { Metadata } from "next";
import { pageMetadata, SanityPage } from "@/components/pages/SanityPage";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata("our-work");
}

/** Our work index — Sanity `page` with slug "our-work". */
export default function OurWorkPage() {
  return <SanityPage slug="our-work" />;
}
