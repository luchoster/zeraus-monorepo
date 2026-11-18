import type { Metadata } from "next";
import { pageMetadata, SanityPage } from "@/components/pages/SanityPage";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata("contact");
}

export default function ContactPage() {
  return <SanityPage slug="contact" />;
}
