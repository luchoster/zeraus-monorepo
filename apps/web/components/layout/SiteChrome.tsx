import ClientLayout from "@/components/layout/ClientLayout";
import { resolveHref, linkTarget, type QueriedLink } from "@/lib/links";
import { sanityFetch } from "@/sanity/live";
import { NAVIGATION_QUERY, SITE_SETTINGS_QUERY } from "@/sanity/queries";
import type { MenuItem } from "@/types/menu";

function navToMenuItems(
  mainMenu:
    | Array<{
        _key?: string | null;
        link?: QueriedLink;
        children?: Array<{ _key?: string | null; link?: QueriedLink }> | null;
      }>
    | null
    | undefined,
): MenuItem[] {
  if (!Array.isArray(mainMenu)) return [];
  const items: MenuItem[] = [];
  for (const item of mainMenu) {
    const label = item.link?.label?.trim();
    if (!label) continue;
    const children: { label: string; href: string }[] = [];
    for (const child of item.children ?? []) {
      const href = resolveHref(child.link);
      const childLabel = child.link?.label?.trim();
      if (href && childLabel) children.push({ label: childLabel, href });
    }
    if (children.length > 0) {
      items.push({ title: label, submenu: children });
      continue;
    }
    const href = resolveHref(item.link);
    if (href) items.push({ title: label, href });
  }
  return items;
}

/** Server wrapper: loads navigation + header CTA/promo, passes them into the client chrome. */
export default async function SiteChrome({ children }: { children: React.ReactNode }) {
  const [{ data: navigation }, { data: settings }] = await Promise.all([
    sanityFetch({ query: NAVIGATION_QUERY }),
    sanityFetch({ query: SITE_SETTINGS_QUERY }),
  ]);

  const menuItems = navToMenuItems(navigation?.mainMenu);
  const headerCta = settings?.headerCta
    ? {
        label: settings.headerCta.label ?? "Book a Call",
        href: resolveHref(settings.headerCta as QueriedLink) ?? "/book-a-call",
        target: linkTarget(settings.headerCta as QueriedLink),
      }
    : null;

  const menuPromo = settings?.menuPromo
    ? {
        caption: settings.menuPromo.caption ?? null,
        video: settings.menuPromo.video ?? null,
        poster: settings.menuPromo.poster ?? null,
      }
    : null;

  return (
    <ClientLayout
      menuItems={menuItems}
      headerCta={headerCta}
      menuPromo={menuPromo}
      copyright={settings?.copyright ?? null}
      wordmark={settings?.wordmark ?? settings?.title ?? null}
    >
      {children}
    </ClientLayout>
  );
}
