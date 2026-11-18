import createImageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { sanityConfig } from "@zeraus/sanity-config";

const builder = createImageUrlBuilder({
  projectId: sanityConfig.projectId,
  dataset: sanityConfig.dataset,
});

export const urlFor = (source: SanityImageSource) => builder.image(source).auto("format");

/** The shape every `image ${IMAGE}` projection in sanity/queries.ts returns. */
export type QueriedImage = {
  asset?: {
    _id?: string;
    url?: string | null;
    metadata?: {
      lqip?: string | null;
      dimensions?: { width?: number | null; height?: number | null; aspectRatio?: number | null } | null;
    } | null;
  } | null;
  alt?: string | null;
  hotspot?: unknown;
  crop?: unknown;
} | null | undefined;

export type ImageProps = {
  src: string;
  width: number;
  height: number;
  alt: string;
  blurDataURL?: string;
};

/**
 * Turns a queried Sanity image into `next/image` props.
 * `width` caps the rendered width; height follows the asset's aspect ratio
 * (or `aspect` when given, which also crops via hotspot).
 */
export function imageProps(
  image: QueriedImage,
  width = 1200,
  opts: { aspect?: number; alt?: string } = {},
): ImageProps | null {
  if (!image?.asset) return null;
  const dims = image.asset.metadata?.dimensions;
  const isSvg = image.asset._id?.endsWith("-svg") || image.asset.url?.endsWith(".svg");
  // SVGs scale losslessly, so never cap them at their intrinsic (often tiny) size.
  const naturalWidth = isSvg ? width : (dims?.width ?? width);
  const w = Math.round(Math.min(width, naturalWidth));
  const ratio = opts.aspect ?? dims?.aspectRatio ?? 1;
  const h = Math.round(w / ratio);

  let src: string;
  if (isSvg) {
    src = image.asset.url ?? urlFor(image as SanityImageSource).url();
  } else {
    let b = urlFor(image as SanityImageSource).width(w);
    if (opts.aspect) b = b.height(h).fit("crop");
    src = b.url();
  }

  return {
    src,
    width: w,
    height: h,
    alt: opts.alt ?? image.alt ?? "",
    blurDataURL: isSvg ? undefined : (image.asset.metadata?.lqip ?? undefined),
  };
}

/** A URL for CSS `background-image`. */
export function backgroundUrl(image: QueriedImage, width = 1920): string | undefined {
  if (!image?.asset) return undefined;
  return urlFor(image as SanityImageSource).width(width).url();
}
