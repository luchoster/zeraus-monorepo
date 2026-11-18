"use client";
import Link from "next/link";
import type { MenuItem } from "@/types/menu";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

import gsap from "gsap";
import Flip from "gsap/Flip";
import { usePathname } from "next/navigation";
import AnimatedButton from "../animation/AnimatedButton";

gsap.registerPlugin(Flip);

export type MenuPromo = {
  caption?: string | null;
  video?: string | null;
  poster?: string | null;
} | null;

type MobileMenuProps = {
  menuItems?: MenuItem[];
  menuPromo?: MenuPromo;
  copyright?: string | null;
  wordmark?: string | null;
};

export default function MobileMenu({
  menuItems = [],
  menuPromo = null,
  copyright = null,
  wordmark = null,
}: MobileMenuProps) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(-1);
  const submenuRefs = useRef<(HTMLUListElement | null)[]>([]);
  const hamburgerBtnRef = useRef<HTMLAnchorElement | null>(null);
  const menuContainRef = useRef<HTMLDivElement | null>(null);
  const flipBaseRef = useRef<HTMLDivElement | null>(null);

  const [submenuHeights, setSubmenuHeights] = useState<number[]>([]);
  const handleToggle = () => {
    if (isActive) {
      setIsActive(false);
      setTimeout(() => {
        setIsMenuOpen(false);
      }, 800);
    } else {
      setIsMenuOpen(true);
      setTimeout(() => {
        setIsActive(true);
      }, 600);
    }
  };
  const isMenuActive = (link?: string) =>
    link?.split("/")[1] == pathname.split("/")[1];

  useEffect(() => {
    const heights = submenuRefs.current.map((submenu) =>
      submenu ? submenu.scrollHeight : 0,
    );
    setSubmenuHeights(heights);
  }, [menuItems]);

  useEffect(() => {
    setActiveSubmenu(-1);
    if (isActive) {
      handleToggle();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useLayoutEffect(() => {
    const flipEl = flipBaseRef.current;
    const toMenu = isMenuOpen;

    if (!flipEl || !hamburgerBtnRef.current || !menuContainRef.current) return;

    const state = Flip.getState(flipEl);

    if (toMenu) {
      menuContainRef.current.appendChild(flipEl);
    } else {
      hamburgerBtnRef.current.appendChild(flipEl);
    }

    Flip.from(state, {
      duration: 0.8,
      ease: "power4.inOut",
    });
  }, [isMenuOpen]);

  const promoCaption = menuPromo?.caption?.trim() || null;
  const promoVideo = menuPromo?.video || null;
  const promoPoster = menuPromo?.poster || null;
  const hasPromoMedia = Boolean(promoVideo);
  const year = new Date().getFullYear();
  const rights = copyright?.trim() || `${wordmark || "ZERAUS"}. All rights reserved.`;

  return (
    <nav
      className={`mxd-nav__wrap  ${isActive ? "active_menu" : ""} `}
      data-lenis-prevent=""
    >
      <div className="mxd-nav__contain loading__fade">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            handleToggle();
          }}
          className={`mxd-nav__hamburger ${isMenuOpen ? "nav-open" : ""}`}
          ref={hamburgerBtnRef}
        >
          <div className="hamburger__base" ref={flipBaseRef} />
          <div className="hamburger__line" />
          <div className="hamburger__line" />
        </a>
      </div>
      <div className={`mxd-menu__wrapper ${isActive ? "active_menu" : ""} `}>
        <div className="mxd-menu__base" />
        <div className="mxd-menu__contain" ref={menuContainRef}>
          <div className="mxd-menu__inner">
            <div className="mxd-menu__left">
              {promoCaption ? (
                <p
                  className="mxd-menu__caption fade-in-elm"
                  style={{ transitionDelay: "0.4s", whiteSpace: "pre-line" }}
                >
                  {promoCaption}
                </p>
              ) : null}
              <div className="main-menu">
                <nav className="main-menu__content">
                  <ul id="main-menu" className="main-menu__accordion">
                    {menuItems.map((item, index) => (
                      <li
                        key={`${item.title}-${index}`}
                        className="main-menu__item fade-in-up-elm"
                        style={{ transitionDelay: `${index * 0.1}s` }}
                      >
                        {item.submenu ? (
                          <>
                            <div
                              className="main-menu__toggle"
                              onClick={() =>
                                setActiveSubmenu((pre) =>
                                  pre == index ? -1 : index,
                                )
                              }
                            >
                              <AnimatedButton
                                text={item.title}
                                as="span"
                                className="main-menu__link btn btn-anim"
                              ></AnimatedButton>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={20}
                                height={20}
                                viewBox="0 0 20 20"
                              >
                                <path d="M19.6,9.6h-3.9c-.4,0-1.8-.2-1.8-.2-.6,0-1.1-.2-1.6-.6-.5-.3-.9-.8-1.2-1.2-.3-.4-.4-.9-.5-1.4,0,0,0-1.1-.2-1.5V.4c0-.2-.2-.4-.4-.4s-.4.2-.4.4v4.4c0,.4-.2,1.5-.2,1.5,0,.5-.2,1-.5,1.4-.3.5-.7.9-1.2,1.2s-1,.5-1.6.6c0,0-1.2,0-1.7.2H.4c-.2,0-.4.2-.4.4s.2.4.4.4h4.1c.4,0,1.7.2,1.7.2.6,0,1.1.2,1.6.6.4.3.8.7,1.1,1.1.3.5.5,1,.6,1.6,0,0,0,1.3.2,1.7v4.1c0,.2.2.4.4.4s.4-.2.4-.4v-4.1c0-.4.2-1.7.2-1.7,0-.6.2-1.1.6-1.6.3-.4.7-.8,1.1-1.1.5-.3,1-.5,1.6-.6,0,0,1.3,0,1.8-.2h3.9c.2,0,.4-.2.4-.4s-.2-.4-.4-.4Z" />
                              </svg>
                            </div>
                            <ul
                              className="submenu"
                              style={{
                                height:
                                  activeSubmenu === index
                                    ? `calc(${submenuHeights[index]}px + 2rem)`
                                    : 0,
                                paddingTop:
                                  activeSubmenu === index ? "2rem" : 0,
                                transition: "all 0.3s ease",
                              }}
                              ref={(el) => {
                                submenuRefs.current[index] = el;
                              }}
                            >
                              {item.submenu.map((sub, i) => (
                                <li
                                  key={i}
                                  className={`submenu__item ${
                                    isMenuActive(sub.href) ? "active" : ""
                                  }`}
                                >
                                  <Link href={sub.href}>{sub.label}</Link>
                                </li>
                              ))}
                            </ul>
                          </>
                        ) : item.href ? (
                          <AnimatedButton
                            text={item.title}
                            className="main-menu__link btn btn-anim"
                            href={item.href}
                          ></AnimatedButton>
                        ) : null}
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </div>
            {(promoCaption || hasPromoMedia) && (
              <div className="mxd-menu__right">
                <div className="menu-promo">
                  <div className="menu-promo__content">
                    {promoCaption && (
                      <p
                        className="menu-promo__caption fade-in-elm"
                        style={{ transitionDelay: "0.4s", whiteSpace: "pre-line" }}
                      >
                        {promoCaption}
                      </p>
                    )}
                    {hasPromoMedia && promoVideo && (
                      <div
                        className="menu-promo__video fade-in-up-elm"
                        style={{ transitionDelay: "0.3s" }}
                      >
                        <video
                          className="menu-video"
                          id="inner-video"
                          preload="auto"
                          autoPlay
                          loop
                          muted
                          poster={promoPoster ?? undefined}
                        >
                          <source type="video/mp4" src={promoVideo} />
                        </video>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
            <div
              className="mxd-menu__data fade-in-up-elm"
              style={{ transitionDelay: "0.4s" }}
            >
              <p className="t-xsmall">{year} </p>
              <p className="t-xsmall">
                <i className="ph ph-copyright" />
                {rights}
              </p>
            </div>
          </div>
          <div className="hamburger__parking-slot" />
        </div>
      </div>
    </nav>
  );
}
