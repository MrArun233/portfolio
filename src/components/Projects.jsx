import React, { useRef, useEffect, useState } from "react";
import { FiGithub, FiExternalLink, FiChevronLeft, FiChevronRight, FiX } from "react-icons/fi";
import "../App.css";

const PROJECTS = [
  {
    title: "Weather App",
    desc: "Real-time weather app with city search, geolocation and clean responsive UI.",
    tech: ["React", "API", "CSS"],
    demo: "https://weatharap.netlify.app/",
    code: "https://github.com/MrArun233/Weathar.git",
    image: "https://s.wordpress.com/mshots/v1/https://weatharap.netlify.app/?w=1200",
  },
    {
    title: "Task Tide",
    desc: "Smooth task management app with modern UI and persistent storage.",
    tech: ["React", "Vite", "CSS"],
    demo: "https://tasktidemrarun233.netlify.app/",
    code: "https://github.com/MrArun233/TaskTide.git",
    image: "https://s.wordpress.com/mshots/v1/https://tasktidemrarun233.netlify.app/?w=1200",
  },
  {
    title: "CRUD Task Manager",
    desc: "Full CRUD app to add, edit, delete and manage daily tasks efficiently.",
    tech: ["React", "Context", "CSS"],
    demo: "https://crudtaskapp.netlify.app/",
    code: "hhttps://github.com/MrArun233/crudTaskApp.git",
    image: "https://s.wordpress.com/mshots/v1/https://crudtaskapp.netlify.app/?w=1200",
  },

];

export default function Projects() {
  const containerRef = useRef(null);
  const cardRefs = useRef([]);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const startScroll = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [modalIndex, setModalIndex] = useState(null);

  const scrollStep = () => (containerRef.current ? Math.round(containerRef.current.offsetWidth * 0.8) : 320);
  const handleNext = () => containerRef.current?.scrollBy({ left: scrollStep(), behavior: "smooth" });
  const handlePrev = () => containerRef.current?.scrollBy({ left: -scrollStep(), behavior: "smooth" });

  // drag / swipe
  useEffect(() => {
    const cont = containerRef.current;
    if (!cont) return;

    const onMouseDown = (e) => {
      isDragging.current = true;
      cont.classList.add("dragging");
      startX.current = e.pageX - cont.offsetLeft;
      startScroll.current = cont.scrollLeft;
    };
    const onMouseMove = (e) => {
      if (!isDragging.current) return;
      const x = e.pageX - cont.offsetLeft;
      const walk = (x - startX.current) * 1.2;
      cont.scrollLeft = startScroll.current - walk;
    };
    const onEndDrag = () => {
      isDragging.current = false;
      cont.classList.remove("dragging");
    };

    const onTouchStart = (e) => {
      isDragging.current = true;
      startX.current = e.touches[0].pageX - cont.offsetLeft;
      startScroll.current = cont.scrollLeft;
    };
    const onTouchMove = (e) => {
      if (!isDragging.current) return;
      const x = e.touches[0].pageX - cont.offsetLeft;
      const walk = (x - startX.current) * 1.2;
      cont.scrollLeft = startScroll.current - walk;
    };

    cont.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onEndDrag);
    cont.addEventListener("mouseleave", onEndDrag);

    cont.addEventListener("touchstart", onTouchStart, { passive: true });
    cont.addEventListener("touchmove", onTouchMove, { passive: false });
    cont.addEventListener("touchend", onEndDrag);

    return () => {
      cont.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onEndDrag);
      cont.removeEventListener("mouseleave", onEndDrag);

      cont.removeEventListener("touchstart", onTouchStart);
      cont.removeEventListener("touchmove", onTouchMove);
      cont.removeEventListener("touchend", onEndDrag);
    };
  }, []);

  // intersection observer for active index
  useEffect(() => {
    const cont = containerRef.current;
    if (!cont) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.dataset.index);
            setActiveIndex(idx);
          }
        });
      },
      { root: cont, threshold: 0.6 }
    );

    cardRefs.current.forEach((c) => c && observer.observe(c));
    return () => observer.disconnect();
  }, []);

  // when user clicks a card -> center it and mark selected
  const handleCardClick = (i) => {
    const card = cardRefs.current[i];
    card?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    setActiveIndex(i);
  };

  return (
    <section id="projects" className="projects-section enhanced">
      <div className="projects-header">
        <h2>
          Selected <span className="highlight">Projects</span>
        </h2>
        <div className="proj-controls">
          <button aria-label="Previous" className="nav-btn" onClick={handlePrev}>
            <FiChevronLeft />
          </button>
          <button aria-label="Next" className="nav-btn" onClick={handleNext}>
            <FiChevronRight />
          </button>
        </div>
      </div>

      <div className="projects-scroll-container" ref={containerRef} tabIndex={0} aria-label="Projects carousel">
        <div className="projects-scroll">
          {PROJECTS.map((p, i) => {
            const isCenter = i === activeIndex;
            return (
              <article
                key={p.title}
                className={`project-card ${isCenter ? "is-center" : "is-side"}`}
                data-index={i}
                ref={(el) => (cardRefs.current[i] = el)}
                style={{ animationDelay: `${i * 0.12}s` }}
                onClick={() => handleCardClick(i)}
              >
                {/* Image is now a clickable link opening demo in new tab */}
                <a
                  href={p.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="project-image-link"
                  onClick={(e) => {
                    // stop card click (centering) from firing; allow navigation
                    e.stopPropagation();
                    // note: anchor will open in new tab because of target="_blank"
                  }}
                >
                  <div className="project-image">
                    <img src={p.image} alt={`${p.title} screenshot`} />
                  </div>
                </a>

                <h3>{p.title}</h3>
                <p className="project-desc">{p.desc}</p>

                <ul className="tech-list">
                  {p.tech.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>

                <div className="project-links">
                  <a
                    href={p.code}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-link"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <FiGithub /> Code
                  </a>

                  <button
                    className="btn-view"
                    onClick={(e) => {
                      e.stopPropagation();
                      setModalIndex(i);
                    }}
                    aria-label={`View details of ${p.title}`}
                  >
                    View
                  </button>
                </div>

                {/* demo button moved lower (bottom-right) */}
                <a
                  href={p.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-demo bottom"
                  onClick={(e) => e.stopPropagation()}
                >
                  <FiExternalLink /> Live Demo
                </a>
              </article>
            );
          })}
        </div>
      </div>

      <div className="carousel-dots" role="tablist" aria-label="Project items">
        {PROJECTS.map((_, i) => (
          <button
            key={i}
            className={`dot ${i === activeIndex ? "active" : ""}`}
            aria-label={`Go to project ${i + 1}`}
            onClick={() => {
              const card = cardRefs.current[i];
              card?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
            }}
          />
        ))}
      </div>

      {/* Modal / Lightbox for selected project */}
      {modalIndex !== null && (
        <div className="proj-modal" role="dialog" aria-modal="true" aria-label="Project details">
          <div className="proj-modal-inner" onClick={() => setModalIndex(null)}>
            <button className="modal-close" onClick={() => setModalIndex(null)} aria-label="Close modal">
              <FiX />
            </button>

            <div className="proj-modal-card" onClick={(e) => e.stopPropagation()}>
              <div className="proj-modal-image">
                <img src={PROJECTS[modalIndex].image} alt={`${PROJECTS[modalIndex].title} large`} />
              </div>
              <div className="proj-modal-body">
                <h3>{PROJECTS[modalIndex].title}</h3>
                <p>{PROJECTS[modalIndex].desc}</p>
                <ul className="tech-list modal">
                  {PROJECTS[modalIndex].tech.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
                <div className="proj-modal-links">
                  <a href={PROJECTS[modalIndex].demo} target="_blank" rel="noreferrer" className="btn-link">
                    <FiExternalLink /> Live Demo
                  </a>
                  <a href={PROJECTS[modalIndex].code} target="_blank" rel="noreferrer" className="btn-link">
                    <FiGithub /> Code
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
