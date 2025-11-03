import React, { useEffect, useRef, useState } from "react";
import "./styles.css";
import LazyCarousel from "./components/LazyCarousel";

const LazySection = ({ section, index }) => {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  // Detecta visibilidade da seção
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.01 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`lazy-section ${visible ? "visible" : "lazy-section-placeholder"}`}
    >
      {/* 🔹 Seção visível → renderiza os carrosseis reais */}
      {visible ? (
        <>
          {section.carousels.map((carousel, i) => (
            <LazyCarousel
              key={`${section.id}-${i}`}
              index={i}
              isActive={visible}
              title={carousel.title}
              type={carousel.type}
              fetchFn={carousel.fetchFn}
              fetchParams={carousel.fetchParams}
              top10mode={carousel.top10mode}
              card_size={carousel.card_size}
              component={carousel.component}
              skeleton={carousel.skeleton}
              limit={carousel.limit}
            />
          ))}
        </>
      ) : (
        /* 🔸 Placeholder da seção (com skeletons internos) */
        <div className="lazy-section-skeletons">
          {section.carousels.map((carousel, i) => {
            const Skeleton = carousel.skeleton;
            return (
              <div key={`placeholder-${section.id}-${i}`} className="lazy-section-skeleton-item">
                {Skeleton ? <Skeleton card_size={carousel.card_size} /> : null}
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default React.memo(LazySection);
