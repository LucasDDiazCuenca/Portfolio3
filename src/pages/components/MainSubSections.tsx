import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTheme } from "../../hooks/useTheme";
import SubSectionProjects from "./SubSectionProjects";
import SubSectionContact from "./SubSectionContact";
import SubSectionExperience from "./SubSectionExperience";

gsap.registerPlugin(ScrollTrigger);

export default function MainSubSections() {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const sections = sectionsRef.current;

    // Animación inicial de las secciones (sin escalado para evitar expansión)
    gsap.fromTo(
      sections,
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const handleSectionClick = (route: string) => {
    // Animación de salida antes de navegar
    gsap.to(containerRef.current, {
      opacity: 0,
      duration: 0.5,
      ease: "power2.inOut",
      onComplete: () => {
        navigate(route);
      },
    });
  };

  return (
    <div ref={containerRef} className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Sections Grid */}
        <div className="space-y-32">
          {/* Projects Section */}
          <div
            ref={(el) => {
              if (el) sectionsRef.current[0] = el;
            }}
          >
            <SubSectionProjects />
          </div>

          {/* Contact Section */}
          <div
            ref={(el) => {
              if (el) sectionsRef.current[1] = el;
            }}
          >
            <SubSectionContact />
          </div>

          {/* Experience Section */}
          <div
            ref={(el) => {
              if (el) sectionsRef.current[2] = el;
            }}
          >
            <SubSectionExperience />
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-32 pt-20 border-t border-gray-200 dark:border-gray-700">
          <h3
            className={`text-3xl md:text-4xl font-bold mb-6 transition-colors duration-500 ${
              theme === "dark" ? "text-white" : "text-slate-900"
            }`}
          >
            Ready to Start?
          </h3>
          <p
            className={`text-lg md:text-xl mb-8 transition-colors duration-500 ${
              theme === "dark" ? "text-gray-300" : "text-slate-600"
            }`}
          >
            Let's create something amazing together
          </p>
          <button
            onClick={() => handleSectionClick("/contact")}
            className={`px-12 py-4 cursor-pointer text-lg font-semibold rounded-2xl transition-all duration-500 transform hover:scale-105 ${
              theme === "dark"
                ? "bg-[var(--accent-color)] hover:bg-[var(--accent-color)]/90 text-white shadow-lg hover:shadow-[var(--accent-color)]/25"
                : "bg-[var(--accent-color)] hover:bg-[var(--accent-color)]/90 text-white shadow-lg hover:shadow-[var(--accent-color)]/25"
            }`}
          >
            Get In Touch
          </button>
        </div>
      </div>
    </div>
  );
}
