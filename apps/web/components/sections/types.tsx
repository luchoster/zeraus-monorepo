import type { HOME_PAGE_QUERY_RESULT } from "@/sanity/types.generated";

export type HomePage = NonNullable<HOME_PAGE_QUERY_RESULT>;
export type Section = NonNullable<HomePage["sections"]>[number];
export type SectionOf<T extends Section["_type"]> = Extract<Section, { _type: T }>;
export type PageSettings = HomePage["settings"];

/** `id` + theme hook shared by every section wrapper. */
export function sectionAttrs(section: Pick<Section, "anchor" | "theme">) {
  return {
    id: section.anchor ?? undefined,
    "data-theme": section.theme && section.theme !== "default" ? section.theme : undefined,
  };
}

/** "ZERAUS" → Zera<em>us</em> like the brand wordmark; other strings render as-is. */
export function Wordmark({ text }: { text: string }) {
  const m = /^(.*?)(us)$/i.exec(text.trim());
  if (!m) return <>{text}</>;
  return (
    <>
      {m[1]}
      <em>{m[2]}</em>
    </>
  );
}

/** Renders "\n" as <br /> (hero caption, stat labels). */
export function Lines({ text }: { text?: string | null }) {
  if (!text) return null;
  const parts = text.split("\n");
  return (
    <>
      {parts.map((line, i) => (
        <span key={i}>
          {line}
          {i < parts.length - 1 && <br />}
        </span>
      ))}
    </>
  );
}
