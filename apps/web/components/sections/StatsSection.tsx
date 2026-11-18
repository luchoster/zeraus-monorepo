import Image from "next/image";
import Counter from "@/components/common/Counter";
import { imageProps } from "@/sanity/image";
import { Lines, sectionAttrs, type SectionOf } from "./types";

export default function StatsSection({ section }: { section: SectionOf<"statsSection"> }) {
  const stats = section.stats ?? [];
  if (stats.length === 0) return null;
  const col = stats.length >= 4 ? 3 : stats.length === 3 ? 4 : 6;

  return (
    <div className="mxd-section padding-default" {...sectionAttrs(section)}>
      <div className="mxd-container grid-container">
        <div className="mxd-block">
          <div className="mxd-stats-simple">
            <div className="container-fluid p-0">
              <div className="row g-0 mxd-stats-simple">
                {stats.map((stat) => {
                  const icon = imageProps(stat.icon, 320, { alt: "" });
                  return (
                    <div key={stat._key} className={`col-12 col-lg-${col} mxd-stats-simple__item mxd-grid-item`}>
                      <div className="mxd-stats-simple__inner animate-card-4">
                        <div className="mxd-counter">
                          <p className="mxd-stats-number mxd-stats-simple__counter">
                            <Counter max={stat.value ?? 0} />
                            {stat.suffix}
                          </p>
                        </div>
                        {icon && <Image className="mxd-stats-simple__image" {...icon} sizes="160px" />}
                        <p className="mxd-stats-simple__descr t-140 t-bright">
                          <Lines text={stat.label} />
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
