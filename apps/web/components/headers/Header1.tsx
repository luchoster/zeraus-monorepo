"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import AnimatedButton from "../animation/AnimatedButton";
import ThemeSwitcherButton from "./ColorSwitcher";

export type HeaderCta = {
  label: string;
  href: string;
  target?: string;
} | null;

export default function Header1({ headerCta = null }: { headerCta?: HeaderCta }) {
  const [isHidden, setIsHidden] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setIsHidden(currentScrollPos > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const ctaLabel = headerCta?.label || "Book a Call";
  const ctaHref = headerCta?.href || "/book-a-call";
  const ctaTarget = headerCta?.target;

  return (
    <header id="header" className={`mxd-header ${isHidden ? "is-hidden" : ""}`}>
      {/* header logo */}
      <div className="mxd-header__logo loading__fade">
        <Link href="/" className="mxd-logo" aria-label="ZERAus home">
          <Image
            className="zr-logo-img"
            src="/img/brand/zeraus-logo.svg"
            alt="ZERAus"
            width={314}
            height={126}
            priority
          />
        </Link>
      </div>
      {/* header controls */}
      <div className="mxd-header__controls loading__fade">
        <ThemeSwitcherButton />

        <AnimatedButton
          text={ctaLabel}
          className="btn btn-anim btn-default btn-mobile-icon btn-outline slide-right"
          href={ctaHref}
          target={ctaTarget}
        >
          <i className="ph-bold ph-arrow-up-right" />
        </AnimatedButton>
      </div>
    </header>
  );
}
