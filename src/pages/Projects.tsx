import { useState, useMemo, useCallback, memo } from "react";
import { useTheme } from "../hooks/useTheme";
import PageLayout, {
  ParallaxBackground,
} from "../components/molecules/PageLayout";
import { useParallaxScroll } from "../logic/hooks/useParallaxScroll";
import { animateProjectsCards } from "./gsap/pagesGsap";
import { GreenCristal } from "../cristals/GreenCristal";
import PROJECTS from "./constants/projects";

// Tipo para los proyectos
interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  link?: string;
}

// Componente ProjectCard memoizado para evitar re-renders
const ProjectCard = memo(function ProjectCard({
  project,
  theme,
}: {
  project: Project;
  theme: string;
}) {
  return (
    <div
      className={`project-card group relative overflow-hidden rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl flex flex-col ${
        theme === "dark"
          ? "bg-gray-900/50 border border-[var(--accent-color)]/20 backdrop-blur-sm"
          : "bg-white/80 border border-slate-200 backdrop-blur-sm shadow-lg"
      }`}
      style={{
        willChange: "transform, box-shadow", // Optimización para hover
        backfaceVisibility: "hidden", // Evitar flickering
        transform: "translateZ(0)", // Crear capa de composición
      }}
    >
      {/* Project Image */}
      <div className="relative overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
          style={{
            willChange: "transform", // Optimización para hover
            backfaceVisibility: "hidden", // Evitar flickering
          }}
          loading="lazy" // Carga diferida para mejor rendimiento
        />
        <div
          className={`absolute inset-0 transition-opacity duration-300 ${
            theme === "dark"
              ? "bg-gradient-to-t from-[var(--accent-color)]/60 to-transparent opacity-0 group-hover:opacity-100"
              : "bg-gradient-to-t from-[var(--accent-color)]/40 to-transparent opacity-0 group-hover:opacity-100"
          }`}
        />
      </div>

      {/* Project Content */}
      <div className="p-6 flex flex-col flex-1">
        <div className="flex-1">
          <h3
            className={`text-xl font-bold mb-3 transition-colors duration-300 ${
              theme === "dark"
                ? "text-white group-hover:text-[var(--accent-color)]"
                : "text-slate-900 group-hover:text-[var(--accent-color)]"
            }`}
          >
            {project.title}
          </h3>
          <p
            className={`text-sm mb-4 leading-relaxed ${
              theme === "dark" ? "text-gray-300" : "text-slate-600"
            }`}
          >
            {project.description}
          </p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className={`px-3 py-1 text-xs font-medium rounded-full transition-colors duration-300 ${
                  theme === "dark"
                    ? "bg-[var(--accent-color)]/20 text-[var(--accent-color)] border border-[var(--accent-color)]/30"
                    : "bg-[var(--accent-color)]/10 text-[var(--accent-color)] border border-[var(--accent-color)]/20"
                }`}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* View Project Button */}
        {project.link && (
          <div className="mt-auto pt-4 flex justify-end">
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`group/btn inline-flex items-center px-6 py-2.5 text-sm font-medium rounded-lg transition-all duration-300 transform hover:scale-105 min-w-[140px] ${
                theme === "dark"
                  ? "bg-gradient-to-r from-[var(--accent-color)] to-[var(--accent-color)]/80 hover:from-[var(--accent-color)]/90 hover:to-[var(--accent-color)]/70 text-white shadow-lg hover:shadow-[var(--accent-color)]/25"
                  : "bg-gradient-to-r from-[var(--accent-color)] to-[var(--accent-color)]/80 hover:from-[var(--accent-color)]/90 hover:to-[var(--accent-color)]/70 text-white shadow-lg hover:shadow-[var(--accent-color)]/25"
              }`}
            >
              <span className="mr-2">View Project</span>
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </a>
          </div>
        )}
      </div>
    </div>
  );
});

export default function Projects() {
  const { theme } = useTheme();
  const [, setIsReady] = useState(false);
  const { scrollY } = useParallaxScroll();

  // Memoizar elementos de fondo parallax para evitar re-creación
  const parallaxElements = useMemo(
    () => [
      {
        component: (
          <div className="absolute -top-20 -right-32 opacity-30">
            <GreenCristal
              size="800px"
              duration={2}
              color={theme === "dark" ? "#6B7280" : "#9CA3AF"}
              glow={0}
              enableRandomGeneration={false}
              className="transform rotate-12"
            />
          </div>
        ),
        factor: 0.3,
      },
      {
        component: (
          <div className="absolute top-1/2 -left-40 opacity-20">
            <GreenCristal
              size="600px"
              duration={2}
              color={theme === "dark" ? "#4B5563" : "#D1D5DB"}
              glow={0}
              enableRandomGeneration={false}
              className="transform -rotate-45"
            />
          </div>
        ),
        factor: 0.2,
      },
    ],
    [theme]
  ); // Solo re-crear cuando cambie el tema

  // Memoizar función de animación para evitar re-creación
  const handleAnimationComplete = useCallback((container: HTMLElement) => {
    animateProjectsCards(container);
    setIsReady(true);
  }, []);

  return (
    <PageLayout
      animationFn={handleAnimationComplete}
      className="pt-20 pb-16 px-4 sm:px-6 lg:px-8"
      backgroundElements={
        <ParallaxBackground elements={parallaxElements} scrollY={scrollY} />
      }
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1
            className={`text-5xl md:text-7xl font-bold mb-6 transition-colors duration-500 ${
              theme === "dark" ? "text-white" : "text-slate-900"
            }`}
          >
            My Projects
          </h1>
          <p
            className={`text-xl md:text-2xl max-w-3xl mx-auto transition-colors duration-500 text-[var(--accent-color)]`}
          >
            A showcase of my latest work & Collaborations
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS.map((project) => (
            <ProjectCard key={project.id} project={project} theme={theme} />
          ))}
        </div>
      </div>
    </PageLayout>
  );
}
