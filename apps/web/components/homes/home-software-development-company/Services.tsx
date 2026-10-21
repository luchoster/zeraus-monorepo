import Image from "next/image";

export default function Services() {
  return (
    <div className="mxd-section overflow-hidden padding-pre-title">
      <div className="mxd-container grid-container">
        {/* Block - Services Cards #02 Start */}
        <div className="mxd-block">
          <div className="mxd-services-cards-s">
            <div className="container-fluid px-0">
              <div className="row gx-0">
                {/* item */}
                <div className="col-12 col-xl-8 mxd-services-cards-s__item mxd-grid-item anim-uni-scale-in-right">
                  <div className="mxd-services-cards-s__inner justify-between bg-base-tint radius-l padding-4">
                    <div className="mxd-services-cards-s__title">
                      <h3 className="anim-uni-in-up">
                        Websites &amp;
                        <br />
                        web apps
                      </h3>
                    </div>
                    <div className="mxd-services-cards-s__info width-50">
                      <div className="mxd-services-cards-s__tags">
                        <span className="tag tag-default tag-outline anim-uni-in-up">
                          Next.js
                        </span>
                        <span className="tag tag-default tag-outline anim-uni-in-up">
                          Sanity
                        </span>
                        <span className="tag tag-default tag-outline anim-uni-in-up">
                          Headless
                        </span>
                        <span className="tag tag-default tag-outline anim-uni-in-up">
                          Performance
                        </span>
                        <span className="tag tag-default tag-outline anim-uni-in-up">
                          SEO
                        </span>
                      </div>
                      <p className="anim-uni-in-up">
                        Fast, content-driven sites and web apps on Next.js and
                        a headless CMS, built to grow with your business.
                      </p>
                    </div>
                    <div className="mxd-services-cards-s__image image-right">
                      <Image
                        alt="Illustration"
                        src="/img/illustrations/1200x1200_service-image-01.webp"
                        width={910}
                        height={1200}
                      />
                    </div>
                  </div>
                </div>
                {/* item */}
                <div className="col-12 col-xl-4 mxd-services-cards-s__item mxd-grid-item anim-uni-scale-in-left">
                  <div className="mxd-services-cards-s__inner justify-end bg-accent radius-l padding-4">
                    <div className="mxd-services-cards-s__title">
                      <h3 className="opposite anim-uni-in-up">Integrations</h3>
                    </div>
                    <div className="mxd-services-cards-s__info">
                      <div className="mxd-services-cards-s__tags">
                        <span className="tag tag-default tag-outline-opposite anim-uni-in-up">
                          APIs
                        </span>
                        <span className="tag tag-default tag-outline-opposite anim-uni-in-up">
                          Automation
                        </span>
                        <span className="tag tag-default tag-outline-opposite anim-uni-in-up">
                          Data sync
                        </span>
                      </div>
                      <p className="t-opposite anim-uni-in-up">
                        We connect your CRM, payments, email and internal tools
                        so your systems talk to each other without manual work.
                      </p>
                    </div>
                    <div className="mxd-services-cards-s__image image-top-right">
                      <Image
                        className="mxd-move"
                        alt="Illustration"
                        src="/img/illustrations/1200x1200_service-image-02.webp"
                        width={1200}
                        height={1200}
                      />
                    </div>
                  </div>
                </div>
                {/* item */}
                <div className="col-12 col-xl-4 mxd-services-cards-s__item mxd-grid-item anim-uni-scale-in-right">
                  <div className="mxd-services-cards-s__inner bg-additional radius-l padding-4">
                    <div className="mxd-services-cards-s__title">
                      <h3 className="anim-uni-in-up">E-commerce</h3>
                    </div>
                    <div className="mxd-services-cards-s__info">
                      <div className="mxd-services-cards-s__tags">
                        <span className="tag tag-default tag-outline anim-uni-in-up">
                          Shopify
                        </span>
                        <span className="tag tag-default tag-outline anim-uni-in-up">
                          Payments
                        </span>
                        <span className="tag tag-default tag-outline anim-uni-in-up">
                          Checkout
                        </span>
                      </div>
                      <p className="t-bright anim-uni-in-up">
                        Storefronts, custom checkouts and payment flows that
                        convert and are a pleasure to run.
                      </p>
                    </div>
                    <div className="mxd-services-cards-s__image image-bottom">
                      <Image
                        className="mxd-rotate-slow"
                        alt="Illustration"
                        src="/img/illustrations/1200x1200_service-image-03.webp"
                        width={1200}
                        height={1200}
                      />
                    </div>
                  </div>
                </div>
                {/* item */}
                <div className="col-12 col-xl-4 mxd-services-cards-s__item mxd-grid-item anim-uni-scale-in">
                  <div className="mxd-services-cards-s__inner bg-base-opp radius-l padding-4">
                    <div className="mxd-services-cards-s__title">
                      <h3 className="opposite anim-uni-in-up">AI products</h3>
                    </div>
                    <div className="mxd-services-cards-s__info">
                      <div className="mxd-services-cards-s__tags">
                        <span className="tag tag-default tag-outline-opposite anim-uni-in-up">
                          LLM apps
                        </span>
                        <span className="tag tag-default tag-outline-opposite anim-uni-in-up">
                          Agents
                        </span>
                        <span className="tag tag-default tag-outline-opposite anim-uni-in-up">
                          RAG
                        </span>
                      </div>
                      <p className="t-opposite anim-uni-in-up">
                        Assistants, automations and content tooling built on
                        modern language models — shipped responsibly.
                      </p>
                    </div>
                    <div className="mxd-services-cards-s__image image-bottom image-bottom-2">
                      <Image
                        alt="Illustration"
                        src="/img/illustrations/1200x1200_service-image-04.webp"
                        width={891}
                        height={1200}
                      />
                    </div>
                  </div>
                </div>
                {/* item */}
                <div className="col-12 col-xl-4 mxd-services-cards-s__item mxd-grid-item anim-uni-scale-in-left">
                  <div className="mxd-services-cards-s__inner justify-end bg-base-tint radius-l padding-4">
                    <div className="mxd-services-cards-s__title">
                      <h3 className="anim-uni-in-up">Brand &amp; design</h3>
                    </div>
                    <div className="mxd-services-cards-s__info">
                      <div className="mxd-services-cards-s__tags">
                        <span className="tag tag-default tag-outline anim-uni-in-up">
                          Identity
                        </span>
                        <span className="tag tag-default tag-outline anim-uni-in-up">
                          UI/UX
                        </span>
                        <span className="tag tag-default tag-outline anim-uni-in-up">
                          Motion
                        </span>
                      </div>
                      <p className="anim-uni-in-up">
                        Identity systems, interfaces and motion that make your
                        product feel as good as it works.
                      </p>
                    </div>
                    <div className="mxd-services-cards-s__image image-top">
                      <Image
                        alt="Illustration"
                        src="/img/illustrations/1200x1200_service-image-05.webp"
                        width={1200}
                        height={996}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Block - Services Cards #02 End */}
      </div>
    </div>
  );
}
