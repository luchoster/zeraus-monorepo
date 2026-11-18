import Image from "next/image";
import Link from "next/link";
import AnimateRotation from "@/components/animation/AnimateRotation";
import BackgroundParallax from "@/components/animation/BackgroundParallax";
import RevealText from "@/components/animation/RevealText";
import AnimatedButton from "@/components/animation/AnimatedButton";
import TypedText from "@/components/common/TypedText";
import { backgroundUrl, imageProps } from "@/sanity/image";
import { resolveHref, linkTarget } from "@/lib/links";
import { sectionAttrs, type SectionOf } from "./types";
import {
  Eyebrow,
  HeadlineText,
  HeadlineTitle,
  contentCol,
  sectionPadding,
  type InnerHeroVariant,
} from "./inner-hero/shared";

type InnerHeroData = SectionOf<"innerHeroSection">;

function TeamExtras({ section }: { section: InnerHeroData }) {
  const href = resolveHref(section.rotatingCtaLink);
  const img = imageProps(section.rotatingCtaImage, 300);
  const dividerUrl = backgroundUrl(section.dividerImage, 2400);
  const showRotating = Boolean(section.rotatingCtaText && href);
  const showDivider = Boolean(section.showDivider && dividerUrl);

  if (!showRotating && !showDivider) return null;

  return (
    <div className="mxd-section padding-grid-pre-mtext">
      <div className="mxd-container">
        {showRotating && href && (
          <div className="mxd-container__circle loading__fade">
            <Link
              className="btn-rotating btn-rotating-blur-outline ver-02"
              href={href}
              target={linkTarget(section.rotatingCtaLink)}
            >
              <AnimateRotation
                as="svg"
                version="1.1"
                id="scrollDown"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="0 0 160 160"
                enableBackground={"new 0 0 160 160"}
                xmlSpace="preserve"
                className="btn-rotating__text animate-rotation"
                value={360}
              >
                <defs>
                  <path
                    id="textPath"
                    d="M149.7,80c0,38.5-31.2,69.7-69.7,69.7S10.3,118.5,10.3,80S41.5,10.3,80,10.3S149.7,41.5,149.7,80z"
                  />
                </defs>
                <g>
                  <use xlinkHref="#textPath" fill="none" />
                  <text>
                    <textPath xlinkHref="#textPath">{section.rotatingCtaText}</textPath>
                  </text>
                </g>
              </AnimateRotation>
              {img && <Image className="btn-rotating__image" alt={img.alt} width={img.width} height={img.height} src={img.src} />}
            </Link>
          </div>
        )}
        {showDivider && dividerUrl && (
          <div className="mxd-divider loading__fade">
            <BackgroundParallax
              className="mxd-divider__image parallax-img"
              style={{ backgroundImage: `url(${dividerUrl})` }}
              role="img"
              aria-label={section.dividerImage?.alt ?? undefined}
            />
          </div>
        )}
      </div>
    </div>
  );
}

function ValuesBlock({ section }: { section: InnerHeroData }) {
  const left = section.valuesLeft?.filter(Boolean) ?? [];
  const right = section.valuesRight?.filter(Boolean) ?? [];
  const leftUrl = backgroundUrl(section.imageLeft, 1200);
  const rightUrl = backgroundUrl(section.imageRight, 1200);
  const hasLists = left.length > 0 || right.length > 0;
  const hasImages = Boolean(leftUrl || rightUrl || section.description);
  if (!hasLists && !hasImages) return null;

  return (
    <div className="mxd-section padding-grid-pre-mtext">
      <div className="mxd-container grid-container">
        <div className="mxd-block">
          <div className="mxd-values loading__fade">
            <div className="container-fluid p-0">
              <div className="row g-0 d-flex">
                {hasLists && (
                  <div className="col-12 col-xl-2 mxd-values__item order-2 order-xl-1 mxd-grid-item no-margin animate-card-2">
                    <div className="mxd-values__lists fullheight-xl">
                      <div className="container-fluid p-0 fullheight-xl">
                        <div className="row g-0 fullheight-xl d-xl-flex flex-xl-column justify-content-xl-between">
                          {left.length > 0 && (
                            <div className="col-12 col-sm-6 col-xl-12 mxd-values__lists-item">
                              <ul>
                                {left.map((item) => (
                                  <li key={item}>
                                    <p className="t-small anim-uni-in-up">{item}</p>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                          {right.length > 0 && (
                            <div className="col-12 col-sm-6 col-xl-12 mxd-values__lists-item">
                              <ul>
                                {right.map((item) => (
                                  <li key={item}>
                                    <p className="t-small anim-uni-in-up">{item}</p>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {leftUrl && (
                  <div className="col-12 col-xl-4 mxd-values__item order-1 order-xl-2 mxd-grid-item no-margin animate-card-2">
                    <BackgroundParallax
                      className="mxd-values__image image-large-desktop parallax-img-small"
                      style={{ backgroundImage: `url(${leftUrl})` }}
                      role="img"
                      aria-label={section.imageLeft?.alt ?? undefined}
                    />
                  </div>
                )}
                {(rightUrl || section.description) && (
                  <div className="col-12 col-xl-6 mxd-values__item order-3 order-xl-3 mobile-reverse mxd-grid-item no-margin animate-card-2">
                    {rightUrl && (
                      <BackgroundParallax
                        className="mxd-values__image image-small-desktop parallax-img-small"
                        style={{ backgroundImage: `url(${rightUrl})` }}
                        role="img"
                        aria-label={section.imageRight?.alt ?? undefined}
                      />
                    )}
                    {section.description && (
                      <div className="mxd-values__descr has-top-list anim-uni-in-up">
                        <RevealText as="p" className="t-bright t-large reveal-type">
                          {section.description}
                        </RevealText>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BlogExtras({ section }: { section: InnerHeroData }) {
  const tags = section.tags?.filter(Boolean) ?? [];
  const crumbs = section.breadcrumbs?.filter((b) => b?.label) ?? [];
  if (tags.length === 0 && crumbs.length === 0) return null;
  return (
    <div className="row g-0">
      <div className="col-12" />
      {tags.length > 0 && (
        <div className="col-12 col-xl-8 mxd-grid-item no-margin">
          <div className="inner-headline__blogtags loading__item">
            {tags.map((t) => (
              <span key={t} className="tag tag-default tag-outline tag-link-outline">
                <span>{t}</span>
              </span>
            ))}
          </div>
        </div>
      )}
      {crumbs.length > 0 && (
        <div className="col-12 col-xl-4 mxd-grid-item no-margin">
          <div className="inner-headline__breadcrumbs loading__fade">
            {crumbs.map((c, i) => (
              <span key={c._key ?? `${c.label}-${i}`}>
                {c.href ? <Link href={c.href}>{c.label}</Link> : <span>{c.label}</span>}
                {i < crumbs.length - 1 ? " / " : null}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function ProjectBody({ section }: { section: InnerHeroData }) {
  const tags = section.tags?.filter(Boolean) ?? [];
  const hasMeta = Boolean(section.client || section.servicesLabel || section.industries || section.date);
  return (
    <div className="row g-0">
      <div className="col-12 col-xl-2" />
      <div className="col-12 col-xl-6 mxd-grid-item no-margin">
        {section.text && (
          <div className="inner-headline__paragraph loading__item">
            <p>{section.text}</p>
          </div>
        )}
        {hasMeta && (
          <div className="inner-headline__data">
            <div className="mxd-data-list">
              <div className="container-fluid p-0">
                <div className="row g-0">
                  <div className="col-12 col-md-6 col-xl-5 mxd-data-list__column loading__item">
                    {section.client && (
                      <div className="mxd-data-list__item">
                        <p className="mxd-data-list__name">Client</p>
                        <p className="mxd-data-list__content">{section.client}</p>
                      </div>
                    )}
                    {section.servicesLabel && (
                      <div className="mxd-data-list__item">
                        <p className="mxd-data-list__name">Services</p>
                        <p className="mxd-data-list__content">{section.servicesLabel}</p>
                      </div>
                    )}
                  </div>
                  <div className="col-12 col-md-6 col-xl-5 mxd-data-list__column loading__item">
                    {section.industries && (
                      <div className="mxd-data-list__item">
                        <p className="mxd-data-list__name">Industries</p>
                        <p className="mxd-data-list__content">{section.industries}</p>
                      </div>
                    )}
                    {section.date && (
                      <div className="mxd-data-list__item">
                        <p className="mxd-data-list__name">Date</p>
                        <p className="mxd-data-list__content">{section.date}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {tags.length > 0 && (
        <div className="col-12 col-xl-4 mxd-grid-item no-margin">
          <div className="inner-headline__tags loading__fade">
            {tags.map((t) => (
              <span key={t} className="tag tag-default tag-outline-medium">
                {t}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function InnerHeroSection({ section }: { section: InnerHeroData }) {
  const variant = (section.variant ?? "services") as InnerHeroVariant;
  const pad = sectionPadding(variant, section.paddingClass);
  const attrs = sectionAttrs(section);
  const typed = (section.typedLines ?? []).filter(Boolean);
  const useTyped = variant === "aboutMe" && typed.length > 0;
  const mailto =
    variant === "contact" && section.mailtoEmail && section.mailtoLabel
      ? `mailto:${section.mailtoEmail}?subject=${encodeURIComponent("Message from your site")}`
      : null;

  const showEyebrowCol = variant !== "blog" && variant !== "project";
  const showProjectLink = variant === "project" && section.projectUrl && section.projectLinkLabel;

  return (
    <>
      <div className={`mxd-section mxd-section-inner-headline ${pad}`.trim()} {...attrs}>
        <div className="mxd-container grid-container">
          <div className="mxd-block loading-wrap">
            <div className="container-fluid px-0">
              <div className="row gx-0">
                {showEyebrowCol && (
                  <div className="col-12 col-xl-2 mxd-grid-item no-margin">
                    <Eyebrow label={section.eyebrow} loading={variant !== "contact"} />
                  </div>
                )}
                {showProjectLink && (
                  <div className="col-12 col-xl-2 mxd-grid-item no-margin">
                    <div className="mxd-block__name name-project-link loading__fade">
                      <AnimatedButton
                        text={section.projectLinkLabel!}
                        as={"a"}
                        className="btn btn-anim btn-line-small btn-muted slide-right-up"
                        href={section.projectUrl!}
                      >
                        <i className="ph ph-arrow-up-right" />
                      </AnimatedButton>
                    </div>
                  </div>
                )}
                {variant === "blog" && <div className="col-12" />}
                <div className={`${contentCol(variant)} mxd-grid-item no-margin`}>
                  <div className="mxd-block__content">
                    <div
                      className={`mxd-block__inner-headline${
                        variant === "contact" || variant === "blog" || variant === "project" ? " loading__item" : ""
                      }`}
                    >
                      <HeadlineTitle
                        title={useTyped ? null : section.title}
                        decoration={section.titleDecoration}
                        className={
                          useTyped
                            ? "animated-type loading__item"
                            : variant === "contact" || variant === "project" || variant === "blog"
                              ? ""
                              : "loading__item"
                        }
                        asTyped={useTyped ? <TypedText strings={typed} /> : undefined}
                      />
                      {mailto && (
                        <a className="btn btn-line-headline slide-right-up anim-no-delay" href={mailto}>
                          <span className="btn-caption">{section.mailtoLabel}</span>
                          <i className="ph-bold ph-arrow-up-right" />
                        </a>
                      )}
                      {variant !== "project" && (
                        <HeadlineText
                          text={section.text}
                          className={variant === "contact" ? "loading__item" : "loading__item"}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
              {variant === "blog" && <BlogExtras section={section} />}
              {variant === "project" && <ProjectBody section={section} />}
            </div>
          </div>
        </div>
      </div>
      {variant === "team" && <TeamExtras section={section} />}
      {variant === "aboutStudio" && <ValuesBlock section={section} />}
    </>
  );
}
