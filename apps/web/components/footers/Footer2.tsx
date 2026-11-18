import AnimatedButton from "../animation/AnimatedButton";
import { linkTarget, resolveHref, type QueriedLink } from "@/lib/links";

const PLATFORM_LABELS: Record<string, string> = {
  x: "X / Twitter",
  instagram: "Instagram",
  linkedin: "LinkedIn",
  github: "GitHub",
  dribbble: "Dribbble",
  behance: "Behance",
  youtube: "YouTube",
  facebook: "Facebook",
  tiktok: "TikTok",
  other: "Other",
};

type FooterLink = NonNullable<QueriedLink> & { _key?: string };

export type Footer2Settings = {
  wordmark?: string | null;
  title?: string | null;
  tagline?: string | null;
  contactEmail?: string | null;
  phone?: string | null;
  address?: string | null;
  copyright?: string | null;
  socialLinks?: Array<{
    _key?: string;
    platform?: string | null;
    label?: string | null;
    url?: string | null;
  }> | null;
  legalLinks?: Array<FooterLink | null> | null;
  footerNavGroups?: Array<{
    _key?: string;
    title?: string | null;
    links?: Array<FooterLink | null> | null;
  }> | null;
};

function PointIcon() {
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
      aria-hidden
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

function socialLabel(item: {
  platform?: string | null;
  label?: string | null;
}): string {
  if (item.label) return item.label;
  const platform = item.platform ?? "";
  return PLATFORM_LABELS[platform] || platform || "Social";
}

export default function Footer2({
  settings,
  text,
}: {
  settings?: Footer2Settings | null;
  /** @deprecated Prefer settings.wordmark */
  text?: string;
}) {
  const wordmark = settings?.wordmark || text || "zera.us";
  const title = settings?.title || "ZERAus";
  const groups = (settings?.footerNavGroups ?? []).filter(Boolean);
  const legalLinks = (settings?.legalLinks ?? []).filter(Boolean) as FooterLink[];
  const socialLinks = (settings?.socialLinks ?? []).filter(
    (s): s is NonNullable<typeof s> & { url: string } => Boolean(s?.url)
  );
  const email = settings?.contactEmail?.trim() || "";
  const phone = settings?.phone?.trim() || "";
  const address = settings?.address?.trim() || "";
  const tagline = settings?.tagline?.trim() || "";
  const copyrightLine = settings?.copyright?.trim() || title;
  const year = new Date().getFullYear();

  const showGroupTitles =
    groups.length > 1 || groups.some((g) => Boolean(g?.title?.trim()));

  return (
    <footer id="mxd-footer" className="mxd-footer">
      <div className="mxd-footer__text-wrap">
        <div className="fullwidth-text__tl-trigger" />
        <div className="mxd-footer__fullwidth-text anim-top-to-bottom">
          <span className="zr-footer-wordmark">{wordmark}</span>
        </div>
      </div>

      <div className="mxd-footer__footer-blocks">
        <div className="footer-blocks__column animate-card-3">
          <div className="footer-blocks__card fullheight-card">
            <div className="footer-blocks__nav">
              {groups.map((group, groupIdx) => {
                const links = (group?.links ?? []).filter(Boolean) as FooterLink[];
                if (!links.length) return null;
                return (
                  <div key={group?._key || `group-${groupIdx}`}>
                    {showGroupTitles && group?.title?.trim() ? (
                      <div className="footer-blocks__title anim-uni-in-up">
                        <p className="footer-blocks__title-m">{group.title}</p>
                      </div>
                    ) : null}
                    <ul className="footer-nav">
                      {links.map((item, idx) => {
                        const href = resolveHref(item);
                        if (!href) return null;
                        const label = item.label || "Link";
                        const target = linkTarget(item);
                        return (
                          <li
                            className="footer-nav__item anim-uni-in-up"
                            key={item._key || `${groupIdx}-${idx}`}
                          >
                            <AnimatedButton
                              href={href}
                              text={label}
                              target={target}
                              className="footer-nav__link btn-anim"
                            />
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                );
              })}
            </div>
            {legalLinks.length > 0 ? (
              <div className="footer-blocks__links anim-uni-in-up">
                {legalLinks.map((item, idx) => {
                  const href = resolveHref(item);
                  if (!href) return null;
                  const label = item.label || "Link";
                  const target = linkTarget(item);
                  return (
                    <AnimatedButton
                      key={item._key || `legal-${idx}`}
                      text={label}
                      as={"a"}
                      className="btn btn-line-xsmall btn-muted slide-right anim-no-delay"
                      href={href}
                      target={target}
                    >
                      <i className="ph ph-arrow-right" />
                    </AnimatedButton>
                  );
                })}
              </div>
            ) : null}
          </div>
        </div>

        <div className="footer-blocks__column animate-card-3">
          {email ? (
            <div className="footer-blocks__card">
              <p className="mxd-point-subtitle anim-uni-in-up">
                <PointIcon />
                <a href={`mailto:${email}`}>{email}</a>
              </p>
            </div>
          ) : null}
          {phone ? (
            <div className="footer-blocks__card">
              <p className="mxd-point-subtitle anim-uni-in-up">
                <PointIcon />
                <a href={`tel:${phone.replace(/[^\d+]/g, "")}`}>{phone}</a>
              </p>
            </div>
          ) : null}
          {address ? (
            <div className="footer-blocks__card">
              <p className="mxd-point-subtitle anim-uni-in-up">
                <PointIcon />
                <span style={{ whiteSpace: "pre-line" }}>{address}</span>
              </p>
            </div>
          ) : null}
          {!email && !phone && !address && tagline ? (
            <div className="footer-blocks__card">
              <p className="mxd-point-subtitle anim-uni-in-up">
                <PointIcon />
                <span>{tagline}</span>
              </p>
            </div>
          ) : null}
        </div>

        <div className="footer-blocks__column animate-card-3">
          <div className="footer-blocks__card fullheight-card">
            {socialLinks.length > 0 ? (
              <div className="footer-blocks__block">
                <div className="footer-blocks__title anim-uni-in-up">
                  <p className="footer-blocks__title-l">Follow us</p>
                </div>
                <div className="footer-blocks__socials">
                  <ul className="footer-socials">
                    {socialLinks.map((social, i) => (
                      <li
                        key={social._key || i}
                        className="footer-socials__item anim-uni-in-up"
                      >
                        <a
                          href={social.url}
                          className="footer-socials__link"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {socialLabel(social)}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : null}
            <div className="footer-blocks__links anim-uni-in-up">
              <p className="t-xsmall t-muted">
                <span className="no-effect">{copyrightLine}</span>
                <i className="ph-bold ph-copyright" />
                {year}
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
