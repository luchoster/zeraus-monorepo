import Image from "next/image";
import VelocityMarquee from "@/components/animation/VelocityMarquee";
import AnimateRotation from "@/components/animation/AnimateRotation";
import { imageProps, type QueriedImage } from "@/sanity/image";
import { resolveHref, type QueriedLink } from "@/lib/links";
import type { SectionOf } from "../types";

export type HeroData = SectionOf<"heroSection">;
export type HeroMediaItem = NonNullable<HeroData["media"]>[number];

export const IDLE_CLASS: Record<string, string> = {
  move: "mxd-move",
  pulse: "mxd-pulse",
  "pulse-small": "mxd-pulse-small",
  rotate: "mxd-rotate",
  "rotate-slow": "mxd-rotate-slow",
};

/** Rayo's 80×80 star used inside marquees. */
export function Star80({ className }: { className?: string }) {
  return (
    <svg className={className} version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" fill="currentColor">
      <path
        fill="currentColor"
        d="M78.4,38.4c0,0-11.8,0-15.8,0c-1.6,0-4.8-0.2-7.1-0.8c-2.3-0.6-4.3-0.8-6.3-2.4c-2-1.2-3.5-3.2-4.7-4.8c-1.2-1.6-1.6-3.6-2-5.5c-0.3-1.5-0.7-4.3-0.8-5.9c-0.2-4.3,0-17.4,0-17.4C41.8,0.8,41,0,40.2,0s-1.6,0.8-1.6,1.6c0,0,0,13.1,0,17.4c0,1.6-0.6,4.3-0.8,5.9c-0.3,2-0.8,4-2,5.5c-1.2,2-2.8,3.6-4.7,4.8s-4,1.8-6.3,2.4c-1.9,0.5-4.7,0.6-6.7,0.8c-3.9,0.4-16.6,0-16.6,0C0.8,38.4,0,39.2,0,40c0,0.8,0.8,1.6,1.6,1.6c0,0,12.2,0,16.6,0c1.6,0,4.8,0.3,6.7,0.8c2.3,0.6,4.3,0.8,6.3,2.4c1.6,1.2,3.2,2.8,4.3,4.4c1.2,2,2.1,3.9,2.4,6.3c0.2,1.7,0.7,4.7,0.8,6.7c0.2,4,0,16.2,0,16.2c0,0.8,0.8,1.6,1.6,1.6s1.6-0.8,1.6-1.6c0,0,0-12.3,0-16.2c0-1.6,0.5-5.1,0.8-6.7c0.5-2.3,0.8-4.4,2.4-6.3c1.2-1.6,2.8-3.2,4.3-4.4c2-1.2,3.9-2,6.3-2.4c1.8-0.3,5.1-0.7,7.1-0.8c3.5-0.2,15.8,0,15.8,0c0.8,0,1.6-0.8,1.6-1.6C80,39.2,79.2,38.4,78.4,38.4C78.4,38.4,78.4,38.4,78.4,38.4z"
      />
    </svg>
  );
}

/** Rayo's 20×20 star used inside headlines. */
export function Star20({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 20 20">
      <path d="M19.6,9.6h-3.9c-.4,0-1.8-.2-1.8-.2-.6,0-1.1-.2-1.6-.6-.5-.3-.9-.8-1.2-1.2-.3-.4-.4-.9-.5-1.4,0,0,0-1.1-.2-1.5V.4c0-.2-.2-.4-.4-.4s-.4.2-.4.4v4.4c0,.4-.2,1.5-.2,1.5,0,.5-.2,1-.5,1.4-.3.5-.7.9-1.2,1.2s-1,.5-1.6.6c0,0-1.2,0-1.7.2H.4c-.2,0-.4.2-.4.4s.2.4.4.4h4.1c.4,0,1.7.2,1.7.2.6,0,1.1.2,1.6.6.4.3.8.7,1.1,1.1.3.5.5,1,.6,1.6,0,0,0,1.3.2,1.7v4.1c0,.2.2.4.4.4s.4-.2.4-.4v-4.1c0-.4.2-1.7.2-1.7,0-.6.2-1.1.6-1.6.3-.4.7-.8,1.1-1.1.5-.3,1-.5,1.6-.6,0,0,1.3,0,1.8-.2h3.9c.2,0,.4-.2.4-.4s-.2-.4-.4-.4h0Z" />
    </svg>
  );
}

/** Rayo's 60×60 star icon (avatar group + rotating buttons). `fill` is a CSS variable name. */
export function Star60({ className, fill = "--additional" }: { className?: string; fill?: string }) {
  return (
    <svg className={className} version="1.1" xmlns="http://www.w3.org/2000/svg" width="60px" height="60px" viewBox="0 0 60 60">
      <path
        style={{ fill: `var(${fill})` }}
        d="M58.9,28.9c0,0-9.1,0.1-12.1,0c-1.3,0-5.3-0.5-5.3-0.5c-1.7-0.2-3.4-0.7-4.8-1.7c-1.4-1-2.7-2.3-3.6-3.7c-0.8-1.3-1.3-2.7-1.5-4.2c0,0-0.4-3.3-0.5-4.4c-0.2-3.3,0-13.1,0-13.1c0-0.6-0.5-1.1-1.1-1.1s-1.1,0.5-1.1,1.1c0,0,0.2,9.8,0,13.1c0,1.1-0.5,4.4-0.5,4.4c-0.2,1.5-0.6,3-1.5,4.2c-0.9,1.5-2.2,2.7-3.6,3.7s-3,1.5-4.7,1.7c0,0-3.7,0.4-5,0.5c-3.1,0.2-12.5,0-12.5,0C0.5,28.9,0,29.4,0,30s0.5,1.1,1.1,1.1c0,0,9.4-0.2,12.5,0c1.2,0,5,0.5,5,0.5c1.7,0.2,3.3,0.7,4.7,1.7c1.3,0.9,2.4,2,3.3,3.3c1,1.4,1.5,3.1,1.7,4.8c0,0,0.4,3.9,0.5,5.2c0.1,3,0,12.2,0,12.2c0,0.6,0.5,1.1,1.1,1.1s1.1-0.5,1.1-1.1c0,0-0.1-9.2,0-12.2c0-1.3,0.5-5.2,0.5-5.2c0.2-1.7,0.7-3.4,1.7-4.8c0.9-1.3,2-2.4,3.3-3.3c1.4-1,3.1-1.5,4.8-1.7c0,0,3.9-0.4,5.3-0.5c3-0.1,12.1,0,12.1,0c0.6,0,1.1-0.5,1.1-1.1s-0.5-1.1-1.1-1.1l0,0L58.9,28.9z"
      />
    </svg>
  );
}

/** Headline rows from a multi-line string; `starBeforeLast` inserts Rayo's star in the last row. */
export function TitleRows({ text, prefix, starBeforeLast = false, starClass }: { text?: string | null; prefix: string; starBeforeLast?: boolean; starClass?: string }) {
  const rows = (text ?? "").split("\n").map((r) => r.trim()).filter(Boolean);
  return (
    <>
      {rows.map((row, i) => {
        const last = i === rows.length - 1;
        return (
          <span key={i} className={`${prefix}__row loading__item`}>
            {starBeforeLast && last && rows.length > 1 && (
              <em className={`${prefix}__item title-item-image`}>
                <Star20 className={starClass} />
              </em>
            )}
            <em className={`${prefix}__item`}>{row}</em>
          </span>
        );
      })}
    </>
  );
}

/** Word marquee with the star divider. `oneLine` matches the "one-line item-regular" variant. */
export function WordMarquee({ items, className, direction = "right", oneLine = true, small = false }: { items?: string[] | null; className?: string; direction?: "left" | "right"; oneLine?: boolean; small?: boolean }) {
  const words = (items ?? []).filter(Boolean);
  if (words.length === 0) return null;
  const list = words.length < 3 ? [...words, ...words, ...words] : words;
  return (
    <VelocityMarquee direction={direction} className={className ?? `marquee marquee-${direction}--gsap`}>
      {list.map((w, i) =>
        oneLine ? (
          <div key={i} className="marquee__item one-line item-regular text">
            <p className="marquee__text">{w}</p>
            <div className="marquee__image">
              <Star80 />
            </div>
          </div>
        ) : (
          <div key={i} className="marquee__item item-regular text">
            <p>{w}</p>
            {small ? <Star20 /> : <Star80 />}
          </div>
        ),
      )}
    </VelocityMarquee>
  );
}

/** Rayo's rotating-text circle button. */
export function RotatingButton({ text, href, className, image, children }: { text: string; href?: string; className: string; image?: QueriedImage; children?: React.ReactNode }) {
  const img = imageProps(image, 300, { alt: "" });
  const label = `${text} * ${text} * ${text} * `;
  return (
    <a href={href ?? "#"} className={className}>
      <AnimateRotation
        as="svg"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 160 160"
        className="btn-rotating__text animate-rotation"
        value={360}
      >
        <defs>
          <path id="heroTextPath" d="M149.7,80c0,38.5-31.2,69.7-69.7,69.7S10.3,118.5,10.3,80S41.5,10.3,80,10.3S149.7,41.5,149.7,80z" />
        </defs>
        <g>
          <use xlinkHref="#heroTextPath" fill="none" />
          <text>
            <textPath xlinkHref="#heroTextPath">{label}</textPath>
          </text>
        </g>
      </AnimateRotation>
      {img ? <Image className="btn-rotating__image" {...img} sizes="160px" /> : children}
    </a>
  );
}

/** Avatars + "Trusted by …" text (Rayo heroes 04/05). */
export function AvatarsGroup({ avatars, text, alignRight = false }: { avatars?: QueriedImage[] | null; text?: string | null; alignRight?: boolean }) {
  const imgs = (avatars ?? []).map((a) => imageProps(a, 300, { aspect: 1, alt: "" })).filter(Boolean) as NonNullable<ReturnType<typeof imageProps>>[];
  if (imgs.length === 0 && !text) return null;
  const [line1, ...rest] = (text ?? "").split("\n");
  const align = alignRight ? " align-right" : "";
  return (
    <div className={`mxd-avatars-group${align}`}>
      <div className={`mxd-avatars${align}`}>
        {imgs[0] && (
          <div className="mxd-avatars__item small">
            <Image {...imgs[0]} sizes="60px" />
          </div>
        )}
        <div className="mxd-avatars__item small bg-base-opp">
          <Star60 className="mxd-avatars__icon small" />
        </div>
        {imgs[1] && (
          <div className="mxd-avatars__item small">
            <Image {...imgs[1]} sizes="60px" />
          </div>
        )}
      </div>
      {text && (
        <div className="mxd-avatars-group__text">
          <p>
            {line1}
            {rest.length > 0 && (
              <>
                <br />
                <a href="#">{rest.join(" ")}</a>
              </>
            )}
          </p>
        </div>
      )}
    </div>
  );
}

/** Pulsing status badge. */
export function Mark({ text, className }: { text?: string | null; className?: string }) {
  if (!text) return null;
  return (
    <div className={`mxd-hero__mark ${className ?? ""}`}>
      <span className="mark-icon" />
      <span className="mark-text">{text}</span>
    </div>
  );
}

/** Two value lists side by side (Rayo `mxd-paragraph__lists`). */
export function ValueLists({ left, right, colClass = "col-6 col-xl-5", textClass = "t-small" }: { left?: string[] | null; right?: string[] | null; colClass?: string; textClass?: string }) {
  if (!left?.length && !right?.length) return null;
  const col = (items?: string[] | null) =>
    items && items.length > 0 ? (
      <div className={`${colClass} loading__item`}>
        <ul>
          {items.map((v) => (
            <li key={v}>
              <p className={textClass}>{v}</p>
            </li>
          ))}
        </ul>
      </div>
    ) : null;
  return (
    <div className="mxd-paragraph__lists">
      <div className="container-fluid p-0">
        <div className="row g-0">
          {col(left)}
          {col(right)}
        </div>
      </div>
    </div>
  );
}

export function Tags({ items, className }: { items?: string[] | null; className?: string }) {
  if (!items?.length) return null;
  return (
    <>
      {items.map((t) => (
        <span key={t} className={className ?? "tag tag-default tag-outline"}>
          {t}
        </span>
      ))}
    </>
  );
}

/** First N image items of `media` as next/image props. */
export function heroImages(media: HeroData["media"], width: number) {
  return (media ?? [])
    .filter((m) => m.kind !== "video")
    .map((m) => ({ key: m._key, idle: IDLE_CLASS[m.animation ?? ""] ?? "", img: imageProps(m.image, width) }))
    .filter((m) => m.img) as { key: string; idle: string; img: NonNullable<ReturnType<typeof imageProps>> }[];
}

export function ctaHref(link: QueriedLink, fallback = "#") {
  return resolveHref(link) ?? fallback;
}

/** `<video>` from the dividerVideo object; returns null without a source or poster. */
export function HeroVideo({ video, className }: { video: HeroData["dividerVideo"]; className?: string }) {
  if (!video?.video && !video?.poster) return null;
  if (!video.video) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img className={className} src={video.poster ?? undefined} alt="" />;
  }
  return (
    <video className={className} preload="auto" autoPlay loop muted playsInline poster={video.poster ?? undefined}>
      <source src={video.video} />
    </video>
  );
}
