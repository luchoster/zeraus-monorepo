import Footer2, { type Footer2Settings } from "@/components/footers/Footer2";
import { sanityFetch } from "@/sanity/live";
import { SITE_SETTINGS_QUERY } from "@/sanity/queries";

/** Server footer: loads siteSettings and renders Footer2 for every page. */
export default async function SiteFooter() {
  const { data } = await sanityFetch({ query: SITE_SETTINGS_QUERY });

  return <Footer2 settings={data as Footer2Settings | null} />;
}
