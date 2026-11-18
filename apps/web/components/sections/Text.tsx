import Image from "next/image";
import Link from "next/link";
import { PortableText, type PortableTextComponents } from "next-sanity";
import { imageProps } from "@/sanity/image";
import { pathFor } from "@/lib/links";

type Blocks = Parameters<typeof PortableText>[0]["value"];

function youtubeId(url?: string) {
  const m = url?.match(/(?:youtu\.be\/|v=|\/embed\/)([\w-]{11})/);
  return m?.[1];
}

const marks: PortableTextComponents["marks"] = {
  link: ({ children, value }) => (
    <a href={value?.href} target={value?.blank ? "_blank" : undefined} rel={value?.blank ? "noopener noreferrer" : undefined}>
      {children}
    </a>
  ),
  internalLink: ({ children, value }) => {
    const ref = value?.reference as { _type?: string; slug?: { current?: string } } | undefined;
    return <Link href={pathFor(ref?._type, ref?.slug?.current)}>{children}</Link>;
  },
};

/**
 * `simplePortableText`: paragraphs only. `className` goes on every <p> so the
 * section can keep Rayo's typography classes (e.g. "t-large t-bright anim-uni-in-up").
 */
export function SimpleText({ value, className }: { value?: Blocks | null; className?: string }) {
  if (!value) return null;
  return (
    <PortableText
      value={value}
      components={{
        marks,
        block: {
          normal: ({ children }) => <p className={className}>{children}</p>,
        },
      }}
    />
  );
}

/** Plain-text version of a simplePortableText value (meta descriptions, alt text). */
export function toPlainText(value?: Blocks | null): string {
  if (!Array.isArray(value)) return "";
  return (value as Array<{ _type: string; children?: Array<{ text?: string }> }>)
    .map((b) => (b._type === "block" && Array.isArray(b.children) ? b.children.map((c) => c.text ?? "").join("") : ""))
    .filter(Boolean)
    .join("\n\n");
}

const richComponents: PortableTextComponents = {
  marks,
  block: {
    h2: ({ children }) => <h2 className="anim-uni-in-up">{children}</h2>,
    h3: ({ children }) => <h3 className="anim-uni-in-up">{children}</h3>,
    h4: ({ children }) => <h4 className="anim-uni-in-up">{children}</h4>,
    blockquote: ({ children }) => <blockquote className="anim-uni-in-up">{children}</blockquote>,
    normal: ({ children }) => <p className="anim-uni-in-up">{children}</p>,
  },
  types: {
    imageWithAlt: ({ value }) => {
      const img = imageProps(value, 1400);
      if (!img) return null;
      return (
        <figure className="mxd-article__image anim-uni-in-up">
          <Image {...img} sizes="(max-width: 1200px) 100vw, 1200px" />
        </figure>
      );
    },
    youtube: ({ value }) => {
      const id = youtubeId(value?.url);
      if (!id) return null;
      return (
        <div className="mxd-article__video anim-uni-in-up" style={{ aspectRatio: "16 / 9" }}>
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${id}`}
            title="YouTube video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ width: "100%", height: "100%", border: 0 }}
          />
        </div>
      );
    },
    urlEmbed: ({ value }) => (
      <div className="mxd-article__embed anim-uni-in-up" style={{ aspectRatio: "16 / 9" }}>
        <iframe src={value?.url} title={value?.title ?? "Embedded content"} style={{ width: "100%", height: "100%", border: 0 }} />
      </div>
    ),
    codeBlock: ({ value }) => (
      <pre className="mxd-article__code anim-uni-in-up" data-language={value?.language}>
        {value?.filename && <span className="mxd-article__code-filename">{value.filename}</span>}
        <code>{value?.code}</code>
      </pre>
    ),
    file: ({ value }) => {
      const url = value?.asset?.url as string | undefined;
      if (!url) return null;
      return (
        <p className="anim-uni-in-up">
          <a href={url} target="_blank" rel="noopener noreferrer" className="btn btn-anim btn-default btn-outline slide-right-up">
            Download file <i className="ph-bold ph-arrow-down" />
          </a>
        </p>
      );
    },
  },
};

/** `portableText`: full rich text (headings, lists, images, embeds, code). */
export function RichText({ value }: { value?: Blocks | null }) {
  if (!value) return null;
  return <PortableText value={value} components={richComponents} />;
}
