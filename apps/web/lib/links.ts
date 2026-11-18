/** Matches the `link ${LINK}` projection in sanity/queries.ts. */
export type QueriedLink = {
  label?: string | null;
  kind?: string | null;
  external?: string | null;
  anchor?: string | null;
  newTab?: boolean | null;
  internal?: { _type: string; slug?: string | null } | null;
} | null | undefined;

/** Route per document type (docs/SCHEMA_PLAN.md §1). */
export function pathFor(type: string | undefined, slug: string | null | undefined): string {
  const s = slug ?? "";
  switch (type) {
    case "homePage":
      return "/";
    case "caseStudy":
      return `/our-work/${s}`;
    case "service":
      return `/services/${s}`;
    case "post":
      return `/insights/${s}`;
    case "page":
    default:
      return `/${s}`;
  }
}

export function resolveHref(link: QueriedLink): string | undefined {
  if (!link) return undefined;
  switch (link.kind) {
    case "external":
      return link.external ?? undefined;
    case "anchor":
      return link.anchor ? `#${link.anchor}` : undefined;
    case "internal":
    default:
      return link.internal ? pathFor(link.internal._type, link.internal.slug) : undefined;
  }
}

export function linkTarget(link: QueriedLink): string | undefined {
  return link?.newTab || link?.kind === "external" ? "_blank" : undefined;
}
