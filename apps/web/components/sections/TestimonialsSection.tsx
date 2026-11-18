"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Parallax } from "swiper/modules";
import AnimatedButton from "@/components/animation/AnimatedButton";
import { imageProps } from "@/sanity/image";
import { SimpleText } from "./Text";
import { sectionAttrs, type SectionOf } from "./types";

export default function TestimonialsSection({ section }: { section: SectionOf<"testimonialsSection"> }) {
  const items = (section.testimonials ?? []).filter(Boolean);
  if (items.length === 0) return null;

  return (
    <div className="mxd-section overflow-hidden padding-default" {...sectionAttrs(section)}>
      <div className="mxd-container grid-container">
        <div className="mxd-block">
          <div className="testimonials-slider no-padding">
            <Swiper
              slidesPerView="auto"
              grabCursor
              spaceBetween={30}
              speed={1000}
              loop={items.length > 1}
              parallax
              pagination={{ el: ".swiper-pagination", type: "fraction" }}
              navigation={{ nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" }}
              modules={[Navigation, Pagination, Parallax]}
              className="swiper-testimonials no-padding"
            >
              {items.map((t) => {
                const avatar = imageProps(t.avatar, 300, { aspect: 1, alt: t.author ?? "" });
                const photo = imageProps(t.image, 1433);
                return (
                  <SwiperSlide className="swiper-slide mxd-fullwidth-slide" key={t._id}>
                    <div className="mxd-testimonials-photo">
                      <div className="container-fluid p-0 fullheight-l">
                        <div className="row g-0 d-flex align-items-stretch fullheight-l">
                          <div className={`col-12 ${photo ? "col-lg-6" : ""} mxd-testimonials-photo__content mxd-grid-item no-margin`}>
                            <div className="mxd-testimonials-photo__author" data-swiper-parallax-x={-250} data-swiper-parallax-opacity={0}>
                              {avatar && (
                                <div className="mxd-testimonials-photo__avatar">
                                  <Image {...avatar} sizes="80px" />
                                </div>
                              )}
                              <div className="mxd-testimonials-photo__info">
                                <h5 className="mxd-testimonials-photo__name">{t.author}</h5>
                                {(t.role || t.company) && (
                                  <p className="mxd-testimonials-photo__position t-small">
                                    {t.role}
                                    {t.role && t.company ? " at " : ""}
                                    {t.company &&
                                      (t.companyUrl ? (
                                        <a className="link-small-underline" href={t.companyUrl} target="_blank" rel="noopener noreferrer">
                                          {t.company}
                                        </a>
                                      ) : (
                                        t.company
                                      ))}
                                  </p>
                                )}
                                {t.rating ? (
                                  <div className="mxd-testimonials-photo__rating">
                                    {Array.from({ length: t.rating }).map((_, i) => (
                                      <i className="ph-fill ph-star" key={i} />
                                    ))}
                                  </div>
                                ) : null}
                              </div>
                            </div>
                            <div className="mxd-testimonials-photo__text" data-swiper-parallax-x={-300} data-swiper-parallax-opacity={0}>
                              <SimpleText value={t.quote} className="t-large" />
                              {t.caseStudy?.slug && (
                                <AnimatedButton text="Project Page" className="btn btn-anim btn-default btn-small btn-opposite slide-right-up" href={`/our-work/${t.caseStudy.slug}`}>
                                  <i className="ph ph-arrow-up-right" />
                                </AnimatedButton>
                              )}
                            </div>
                          </div>
                          {photo && (
                            <div className="col-12 col-lg-6 mxd-testimonials-photo__image mxd-grid-item no-margin fullheight-l" data-swiper-parallax-x={-450} data-swiper-parallax-opacity={0}>
                              <div className="mxd-testimonials-photo__image-inner radius-l fullheight-l">
                                <Image {...photo} sizes="(max-width: 992px) 100vw, 50vw" />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
              {items.length > 1 && (
                <div className="swiper-testimonials__controls">
                  <div className="swiper-button-prev mxd-slider-btn mxd-slider-btn-round-prev">
                    <span className="btn btn-round btn-round-small btn-outline slide-left anim-no-delay">
                      <i className="ph ph-arrow-left" />
                    </span>
                  </div>
                  <div className="swiper-pagination mxd-swiper-pagination-fraction" />
                  <div className="swiper-button-next mxd-slider-btn mxd-slider-btn-round-next">
                    <span className="btn btn-round btn-round-small btn-outline slide-right anim-no-delay">
                      <i className="ph ph-arrow-right" />
                    </span>
                  </div>
                </div>
              )}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
}
