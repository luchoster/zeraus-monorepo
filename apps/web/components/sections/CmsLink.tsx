import AnimatedButton from "@/components/animation/AnimatedButton";
import { linkTarget, resolveHref, type QueriedLink } from "@/lib/links";

/** A `link` object rendered as one of Rayo's animated buttons. Renders nothing without a target. */
export function CmsButton({ link, className, icon = "ph-bold ph-arrow-up-right" }: { link: QueriedLink; className: string; icon?: string }) {
  const href = resolveHref(link);
  if (!href || !link?.label) return null;
  return (
    <AnimatedButton text={link.label} className={className} href={href} target={linkTarget(link)}>
      <i className={icon} />
    </AnimatedButton>
  );
}
