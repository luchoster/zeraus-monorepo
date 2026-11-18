import type { ReactNode } from "react";
import type { QueriedImage } from "@/sanity/image";
import type { QueriedLink } from "@/lib/links";
import { Lines } from "../types";

export type InnerHeroVariant =
  | "services"
  | "team"
  | "aboutMe"
  | "aboutStudio"
  | "contact"
  | "blog"
  | "pricing"
  | "faq"
  | "project";

export type InnerHeroBreadcrumb = {
  _key?: string;
  label?: string | null;
  href?: string | null;
};

/** Shape returned by the GROQ projection for `innerHeroSection`. */
export type InnerHeroData = {
  _key: string;
  _type: "innerHeroSection";
  variant?: InnerHeroVariant | null;
  eyebrow?: string | null;
  title?: string | null;
  text?: string | null;
  titleDecoration?: string | null;
  typedLines?: string[] | null;
  mailtoLabel?: string | null;
  mailtoEmail?: string | null;
  tags?: string[] | null;
  breadcrumbs?: InnerHeroBreadcrumb[] | null;
  showDivider?: boolean | null;
  dividerImage?: QueriedImage;
  rotatingCtaText?: string | null;
  rotatingCtaLink?: QueriedLink;
  rotatingCtaImage?: QueriedImage;
  valuesLeft?: string[] | null;
  valuesRight?: string[] | null;
  imageLeft?: QueriedImage;
  imageRight?: QueriedImage;
  description?: string | null;
  projectLinkLabel?: string | null;
  projectUrl?: string | null;
  client?: string | null;
  servicesLabel?: string | null;
  industries?: string | null;
  date?: string | null;
  paddingClass?: string | null;
  anchor?: string | null;
  theme?: "default" | "accent" | "additional" | "opposite" | null;
};

const DEFAULT_PADDING: Record<InnerHeroVariant, string> = {
  services: "padding-s-headline-pre-grid",
  team: "padding-text-pre-block",
  aboutMe: "padding-text-pre-block",
  aboutStudio: "padding-headline-pre-block",
  contact: "padding-s-text-pre-form overflow-hidden",
  blog: "padding-blog-default-pre-grid",
  pricing: "padding-headline-pre-grid",
  faq: "padding-s-text-pre-block",
  project: "padding-default",
};

export function sectionPadding(variant: InnerHeroVariant, override?: string | null) {
  return override?.trim() || DEFAULT_PADDING[variant];
}

/** Maps titleDecoration field → Rayo H1 classes. */
export function titleDecorationClass(decoration?: string | null) {
  if (!decoration || decoration === "none") return "";
  const after = decoration === "03";
  return `headline-img-${after ? "after" : "before"} headline-img-${decoration}`;
}

/** 20×20 star used in `mxd-point-subtitle`. */
export function PointStar() {
  return (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width="20px"
      height="20px"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fill="currentColor"
        d="M19.6,9.6c0,0-3,0-4,0c-0.4,0-1.8-0.2-1.8-0.2c-0.6-0.1-1.1-0.2-1.6-0.6c-0.5-0.3-0.9-0.8-1.2-1.2
                    c-0.3-0.4-0.4-0.9-0.5-1.4c0,0-0.1-1.1-0.2-1.5c-0.1-1.1,0-4.4,0-4.4C10.4,0.2,10.2,0,10,0S9.6,0.2,9.6,0.4c0,0,0.1,3.3,0,4.4
                    c0,0.4-0.2,1.5-0.2,1.5C9.4,6.7,9.2,7.2,9,7.6C8.7,8.1,8.2,8.5,7.8,8.9c-0.5,0.3-1,0.5-1.6,0.6c0,0-1.2,0.1-1.7,0.2
                    c-1,0.1-4.2,0-4.2,0C0.2,9.6,0,9.8,0,10c0,0.2,0.2,0.4,0.4,0.4c0,0,3.1-0.1,4.2,0c0.4,0,1.7,0.2,1.7,0.2c0.6,0.1,1.1,0.2,1.6,0.6
                    c0.4,0.3,0.8,0.7,1.1,1.1c0.3,0.5,0.5,1,0.6,1.6c0,0,0.1,1.3,0.2,1.7c0,1,0,4.1,0,4.1c0,0.2,0.2,0.4,0.4,0.4s0.4-0.2,0.4-0.4
                    c0,0,0-3.1,0-4.1c0-0.4,0.2-1.7,0.2-1.7c0.1-0.6,0.2-1.1,0.6-1.6c0.3-0.4,0.7-0.8,1.1-1.1c0.5-0.3,1-0.5,1.6-0.6
                    c0,0,1.3-0.1,1.8-0.2c1,0,4,0,4,0c0.2,0,0.4-0.2,0.4-0.4C20,9.8,19.8,9.6,19.6,9.6L19.6,9.6z"
      />
    </svg>
  );
}

export function Eyebrow({ label, loading = true }: { label?: string | null; loading?: boolean }) {
  if (!label) return null;
  return (
    <div className={`mxd-block__name name-inner-headline${loading ? " loading__item" : ""}`}>
      <p className="mxd-point-subtitle">
        <PointStar />
        <span>{label}</span>
      </p>
    </div>
  );
}

export function HeadlineTitle({
  title,
  decoration,
  className = "",
  asTyped,
}: {
  title?: string | null;
  decoration?: string | null;
  className?: string;
  asTyped?: ReactNode;
}) {
  const deco = titleDecorationClass(decoration);
  const classes = ["inner-headline__title", deco, className].filter(Boolean).join(" ");
  if (asTyped) {
    return <h1 className={classes}>{asTyped}</h1>;
  }
  if (!title) return null;
  return (
    <h1 className={classes}>
      <Lines text={title} />
    </h1>
  );
}

export function HeadlineText({ text, className = "loading__item" }: { text?: string | null; className?: string }) {
  if (!text) return null;
  return (
    <p className={`inner-headline__text t-large t-bright ${className}`.trim()}>
      <Lines text={text} />
    </p>
  );
}

/** Wide (xl-10) vs standard (xl-8) content column. */
export function contentCol(variant: InnerHeroVariant) {
  if (variant === "services" || variant === "aboutStudio" || variant === "project") return "col-12 col-xl-10";
  if (variant === "blog") return "col-12 col-xl-10";
  return "col-12 col-xl-8";
}
