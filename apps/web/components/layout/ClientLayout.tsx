"use client";

import MobileMenu, { type MenuPromo } from "@/components/headers/MobileMenu";
import Header1, { type HeaderCta } from "@/components/headers/Header1";
import InitScroll from "@/components/scroll/InitScroll";
import LenisSmoothScroll from "@/components/scroll/LenisSmoothScroll";
import ScrollTop from "@/components/scroll/ScrollTop";
import ScrollToTopOnRouteChange from "@/components/scroll/ScrollToTopOnRouteChange";
import type { MenuItem } from "@/types/menu";

interface ClientLayoutProps {
  children: React.ReactNode;
  menuItems?: MenuItem[];
  headerCta?: HeaderCta | null;
  menuPromo?: MenuPromo | null;
  copyright?: string | null;
  wordmark?: string | null;
}

export default function ClientLayout({
  children,
  menuItems = [],
  headerCta = null,
  menuPromo = null,
  copyright = null,
  wordmark = null,
}: ClientLayoutProps) {
  return (
    <>
      <MobileMenu menuItems={menuItems} menuPromo={menuPromo} copyright={copyright} wordmark={wordmark} />
      <Header1 headerCta={headerCta} />
      {children}
      <InitScroll />
      <ScrollTop />
      <LenisSmoothScroll />
      <ScrollToTopOnRouteChange />
    </>
  );
}
