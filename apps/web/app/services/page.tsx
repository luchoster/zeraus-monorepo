import type { Metadata } from "next";
import { pageMetadata, SanityPage } from "@/components/pages/SanityPage";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata("services");
}

/** Services index — Sanity `page` with slug "services" (page builder sections). */
export default function ServicesPage() {
  return <SanityPage slug="services" />;
}
