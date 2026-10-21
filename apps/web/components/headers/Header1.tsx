"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import AnimatedButton from "../animation/AnimatedButton";
import ThemeSwitcherButton from "./ColorSwitcher";

export default function Header1() {
  const [isHidden, setIsHidden] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setIsHidden(currentScrollPos > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
          text="Book a Call"
          className="btn btn-anim btn-default btn-mobile-icon btn-outline slide-right"
          href="/book-a-call"
        >
          <i className="ph-bold ph-arrow-up-right" />
        </AnimatedButton>
      </div>
    </header>
  );
}
