import { useEffect, useRef, useState } from "react";
import { useTheme } from "../hooks/useTheme";
import TopMenu from "./components/TopMenu";
import Footer from "./components/Footer";
import {
  WHO_I_AM_TEXT_PARTS,
  WHO_I_AM_TEXT_2,
  SKILLS,
  EXPERIENCES,
} from "./constants/about";
import { animateAboutSections } from "./gsap/pagesGsap";
import { BlueCristal } from "../cristals/BlueCristal";

export default function About() {
  const { theme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const [, setIsReady] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    if (!containerRef.current) return;

    // Pequeño delay para asegurar que el DOM esté completamente renderizado
    const timer = setTimeout(() => {
      animateAboutSections(containerRef.current!);
      setIsReady(true);
    }, 50);

    return () => clearTimeout(timer);
  }, []);

  // Parallax effect for background crystals
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`min-h-screen transition-all duration-500 ${
        theme === "dark"
          ? "bg-gradient-to-br from-gray-950 via-purple-950 to-gray-950"
          : "bg-gradient-to-br from-slate-100 via-slate-50 to-slate-200"
      }`}
    >
      <div className="relative z-50">
        <TopMenu />
      </div>

      {/* Fondo con patrón sutil */}
      <div
        className={`fixed inset-0 ${
          theme === "dark"
            ? "bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.03)_0%,transparent_50%)]"
            : "bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.02)_0%,transparent_50%)]"
        }`}
      />

      {/* Cristales azules de fondo con efecto parallax */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          transform: `translateY(${scrollY * 0.2}px)`,
        }}
      >
        {/* Cristal grande - esquina superior izquierda */}
        <div className="absolute -top-16 -left-20 opacity-25">
          <BlueCristal
            size="500px"
            duration={2}
            color={theme === "dark" ? "#64748B" : "#94A3B8"}
            glow={0}
            enableRandomGeneration={false}
            className="transform rotate-12"
          />
        </div>

        {/* Cristal mediano - centro derecha */}
        <div
          className="absolute top-1/3 -right-16 opacity-20"
          style={{
            transform: `translateY(${scrollY * 0.15}px) rotate(-30deg)`,
          }}
        >
          <BlueCristal
            size="350px"
            duration={2}
            color={theme === "dark" ? "#475569" : "#CBD5E1"}
            glow={0}
            enableRandomGeneration={false}
          />
        </div>

        {/* Cristal pequeño - parte inferior */}
        <div
          className="absolute bottom-20 left-1/4 opacity-30"
          style={{
            transform: `translateY(${scrollY * 0.25}px) rotate(45deg)`,
          }}
        >
          <BlueCristal
            size="250px"
            duration={2}
            color={theme === "dark" ? "#6B7280" : "#9CA3AF"}
            glow={0}
            enableRandomGeneration={false}
          />
        </div>

        {/* Cristal superior derecha */}
        <div
          className="absolute -top-10 right-48 opacity-25"
          style={{
            transform: `translateY(${scrollY * 0.18}px) rotate(-15deg)`,
          }}
        >
          <BlueCristal
            size="300px"
            duration={2}
            color={theme === "dark" ? "#52525B" : "#A1A1AA"}
            glow={0}
            enableRandomGeneration={false}
          />
        </div>

        {/* Cristal centro - muy sutil */}
        <div
          className="absolute top-1/2 left-1/2 opacity-30"
          style={{
            transform: `translate(-50%, -50%) translateY(${
              scrollY * 0.12
            }px) rotate(60deg)`,
          }}
        >
          <BlueCristal
            size="400px"
            duration={2}
            color={theme === "dark" ? "#3F3F46" : "#E4E4E7"}
            glow={0}
            enableRandomGeneration={false}
          />
        </div>
      </div>

      <div
        ref={containerRef}
        className="relative z-20 pt-20 pb-16 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="about-section text-center mb-16">
            <h1
              className={`text-5xl md:text-7xl font-bold mb-6 transition-colors duration-500 ${
                theme === "dark" ? "text-white" : "text-slate-900"
              }`}
            >
              About Me
            </h1>
            <p
              className={`text-xl md:text-2xl max-w-3xl mx-auto transition-colors duration-500 ${"text-[var(--accent-color)]"}`}
            >
              Frontend Engineer & UI/UX Lead creating exceptional digital
              experiences
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Personal Info */}
            <div
              className={`about-section p-8 rounded-2xl transition-all duration-300 ${
                theme === "dark"
                  ? "bg-gray-900/50 border border-[var(--accent-color)]/20 backdrop-blur-sm"
                  : "bg-white/80 border border-slate-200 backdrop-blur-sm shadow-lg"
              }`}
            >
              <h2
                className={`text-3xl font-bold mb-6 transition-colors duration-500 ${"text-[var(--accent-color)]"}`}
              >
                Who I Am
              </h2>
              <p
                className={`text-lg leading-relaxed mb-6 ${
                  theme === "dark" ? "text-gray-300" : "text-slate-600"
                }`}
              >
                {WHO_I_AM_TEXT_PARTS.intro}
                <span className="font-bold">{WHO_I_AM_TEXT_PARTS.role}</span>
                {WHO_I_AM_TEXT_PARTS.continuation}
              </p>
              <p
                className={`text-lg leading-relaxed mb-6 ${
                  theme === "dark" ? "text-gray-300" : "text-slate-600"
                }`}
              >
                {WHO_I_AM_TEXT_2}
              </p>
              <div className="flex flex-wrap gap-4">
                <div
                  className={`px-4 py-2 rounded-lg ${
                    theme === "dark"
                      ? "bg-[var(--accent-color)]/20 text-[var(--accent-color)]"
                      : "bg-[var(--accent-color)]/10 text-[var(--accent-color)]"
                  }`}
                >
                  📍 Based in Madrid & Lanzarote, Spain
                </div>
                <div
                  className={`px-4 py-2 rounded-lg ${
                    theme === "dark"
                      ? "bg-[var(--accent-color)]/20 text-[var(--accent-color)]"
                      : "bg-[var(--accent-color)]/10 text-[var(--accent-color)]"
                  }`}
                >
                  💼 Available
                </div>
              </div>
            </div>

            {/* Skills */}
            <div
              className={`about-section p-8 rounded-2xl transition-all duration-300 ${
                theme === "dark"
                  ? "bg-gray-900/50 border border-[var(--accent-color)]/20 backdrop-blur-sm"
                  : "bg-white/80 border border-slate-200 backdrop-blur-sm shadow-lg"
              }`}
            >
              <h2
                className={`text-3xl font-bold mb-6 transition-colors duration-500 ${"text-[var(--accent-color)]"}`}
              >
                Skills & Technologies
              </h2>
              <div className="space-y-4">
                {SKILLS.map((skill) => (
                  <div key={skill.name} className="skill-item">
                    <div className="flex justify-between mb-2">
                      <span
                        className={`font-medium ${
                          theme === "dark" ? "text-white" : "text-slate-900"
                        }`}
                      >
                        {skill.name}
                      </span>
                      <span
                        className={`text-sm ${
                          theme === "dark" ? "text-gray-400" : "text-slate-500"
                        }`}
                      >
                        {skill.level}%
                      </span>
                    </div>
                    <div
                      className={`w-full h-2 rounded-full ${
                        theme === "dark" ? "bg-gray-700" : "bg-slate-200"
                      }`}
                    >
                      <div
                        className={`h-2 rounded-full transition-all duration-1000 ${
                          theme === "dark"
                            ? "bg-gradient-to-r from-[var(--accent-color)] to-[var(--accent-color)]/80"
                            : "bg-gradient-to-r from-[var(--accent-color)] to-[var(--accent-color)]/80"
                        }`}
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Experience Section */}
          <div className="about-section">
            <h2
              className={`text-4xl font-bold text-center mb-12 transition-colors duration-500 ${
                theme === "dark" ? "text-white" : "text-slate-900"
              }`}
            >
              Experience
            </h2>
            <div className="space-y-8">
              {EXPERIENCES.map((exp, index) => (
                <div
                  key={index}
                  className={`p-6 rounded-xl transition-all duration-300 hover:scale-105 ${
                    theme === "dark"
                      ? "bg-gray-900/30 border border-[var(--accent-color)]/10 backdrop-blur-sm"
                      : "bg-white/60 border border-slate-200 backdrop-blur-sm shadow-md"
                  }`}
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h3
                        className={`text-xl font-bold ${
                          theme === "dark"
                            ? "text-indigo-300"
                            : "text-indigo-600"
                        }`}
                      >
                        {exp.title}
                      </h3>
                      <p
                        className={`text-lg ${
                          theme === "dark" ? "text-white" : "text-slate-900"
                        }`}
                      >
                        {exp.company}
                      </p>
                      {exp.location && (
                        <p
                          className={`text-sm ${
                            theme === "dark"
                              ? "text-gray-400"
                              : "text-slate-500"
                          }`}
                        >
                          📍 {exp.location}
                        </p>
                      )}
                    </div>
                    <span
                      className={`text-sm font-medium px-3 py-1 rounded-full ${
                        theme === "dark"
                          ? "bg-indigo-500/20 text-indigo-300"
                          : "bg-indigo-100 text-indigo-700"
                      }`}
                    >
                      {exp.period}
                    </span>
                  </div>
                  <p
                    className={`leading-relaxed ${
                      theme === "dark" ? "text-gray-300" : "text-slate-600"
                    }`}
                  >
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="relative z-30">
        <Footer />
      </div>
    </div>
  );
}
