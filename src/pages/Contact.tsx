import { useEffect, useRef, useState } from "react";
import { useTheme } from "../hooks/useTheme";
import TopMenu from "./components/TopMenu";
import Footer from "./components/Footer";
import { animateContactPage } from "./gsap/pagesGsap";
import { CONTACT_METHODS } from "./constants/contact";
import { sendContactEmail, type ContactFormData } from "../api/sendEmail";
import { GoldenCristal } from "../cristals/GoldenCristal";

export default function Contact() {
  const { theme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  useEffect(() => {
    if (!containerRef.current) return;

    // Pequeño delay para asegurar que el DOM esté completamente renderizado
    const timer = setTimeout(() => {
      animateContactPage(containerRef.current!);
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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setSubmitStatus("idle");

    try {
      // Usar el servicio de API para enviar el email
      await sendContactEmail(formData);

      // Si llegamos aquí, el email se envió exitosamente
      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error("Error sending email:", error);
      setSubmitStatus("error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen transition-all duration-500 overflow-hidden ${
        theme === "dark"
          ? "bg-gradient-to-br from-gray-950 via-purple-950 to-gray-950"
          : "bg-gradient-to-br from-slate-100 via-slate-50 to-slate-200"
      }`}
    >
      <div className="relative z-50">
        <TopMenu />
      </div>

      {/* Elementos flotantes decorativos */}
      <div className="fixed inset-0 pointer-events-none">
        <div
          className={`floating-element absolute top-20 left-10 w-4 h-4 rounded-full ${"bg-[var(--accent-color)]/30"}`}
        />
        <div
          className={`floating-element absolute top-40 right-20 w-6 h-6 rounded-full ${"bg-[var(--accent-color)]/20"}`}
        />
        <div
          className={`floating-element absolute bottom-40 left-20 w-3 h-3 rounded-full ${"bg-[var(--accent-color)]/40"}`}
        />
        <div
          className={`floating-element absolute bottom-20 right-10 w-5 h-5 rounded-full ${"bg-[var(--accent-color)]/25"}`}
        />
        <div
          className={`floating-element absolute top-1/2 left-5 w-2 h-2 rounded-full ${"bg-[var(--accent-color)]/35"}`}
        />
        <div
          className={`floating-element absolute top-1/3 right-5 w-4 h-4 rounded-full ${"bg-[var(--accent-color)]/30"}`}
        />
      </div>

      {/* Fondo con patrón sutil */}
      <div
        className={`fixed inset-0 ${
          theme === "dark"
            ? "bg-[radial-gradient(circle_at_30%_70%,rgba(168,85,247,0.05)_0%,transparent_50%)]"
            : "bg-[radial-gradient(circle_at_30%_70%,rgba(0,0,0,0.03)_0%,transparent_50%)]"
        }`}
      />

      {/* Cristales dorados de fondo con efecto parallax vertical */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Cristal 1 - Esquina superior izquierda - Movimiento vertical rápido */}
        <div
          className="absolute top-10 left-8 opacity-25"
          style={{
            transform: `translateY(${scrollY * 0.6}px)`,
          }}
        >
          <GoldenCristal
            size="350px"
            duration={2}
            color={theme === "dark" ? "#6B7280" : "#9CA3AF"}
            glow={0}
            enableRandomGeneration={false}
          />
        </div>

        {/* Cristal 2 - Centro derecha - Movimiento vertical lento hacia arriba */}
        <div
          className="absolute top-1/6 right-10 opacity-20"
          style={{
            transform: `translateY(${scrollY * -0.3}px)`,
          }}
        >
          <GoldenCristal
            size="280px"
            duration={2}
            color={theme === "dark" ? "#4B5563" : "#D1D5DB"}
            glow={0}
            enableRandomGeneration={false}
          />
        </div>

        {/* Cristal 3 - Parte inferior centro - Movimiento vertical medio */}
        <div
          className="absolute bottom-20 left-1/3 opacity-30"
          style={{
            transform: `translateY(${scrollY * 0.4}px)`,
          }}
        >
          <GoldenCristal
            size="320px"
            duration={2}
            color={theme === "dark" ? "#52525B" : "#A1A1AA"}
            glow={0}
            enableRandomGeneration={false}
          />
        </div>

        {/* Cristal 4 - Esquina superior derecha - Movimiento vertical lento */}
        <div
          className="absolute -top-10 right-1/4 opacity-15"
          style={{
            transform: `translateY(${scrollY * 0.2}px)`,
          }}
        >
          <GoldenCristal
            size="250px"
            duration={2}
            color={theme === "dark" ? "#3F3F46" : "#E4E4E7"}
            glow={0}
            enableRandomGeneration={false}
          />
        </div>

        {/* Cristal 5 - Centro izquierda - Movimiento vertical medio */}
        <div
          className="absolute top-1/2 -left-20 opacity-20"
          style={{
            transform: `translateY(${scrollY * 0.35}px)`,
          }}
        >
          <GoldenCristal
            size="300px"
            duration={2}
            color={theme === "dark" ? "#475569" : "#CBD5E1"}
            glow={0}
            enableRandomGeneration={false}
          />
        </div>
      </div>

      <div
        ref={containerRef}
        className="relative z-20 pt-20 pb-16 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          {/* Header con diseño asimétrico */}
          <div className="contact-title mb-5">
            <div className="flex flex-col lg:flex-row items-center justify-center lg:items-end lg:justify-around">
              <div>
                <h1
                  className={`text-6xl md:text-8xl font-bold leading-none transition-colors duration-500 ${
                    theme === "dark" ? "text-white" : "text-slate-900"
                  }`}
                >
                  Let's
                </h1>
                <h1
                  className={`text-6xl md:text-8xl font-bold leading-none ml-8 transition-colors duration-500 ${"text-[var(--accent-color)]"}`}
                >
                  Talk
                </h1>
              </div>
              <p
                className={`text-xl md:text-2xl max-w-md mt-4 lg:mt-0 transition-colors duration-500 ${"text-[var(--accent-color)]"}`}
              >
                Feel free to reach out if you'd like to connect or discuss
                ideas.
              </p>
            </div>
          </div>

          {/* Layout principal asimétrico */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Formulario - ocupa 3 columnas */}
            <div className="contact-form lg:col-span-3">
              <div
                className={`p-8 rounded-3xl backdrop-blur-sm transition-all duration-300 ${
                  theme === "dark"
                    ? "bg-gradient-to-br from-gray-900/60 to-[var(--accent-color)]/30 border border-[var(--accent-color)]/20"
                    : "bg-gradient-to-br from-white/80 to-[var(--accent-color)]/5 border border-slate-200 shadow-xl"
                }`}
              >
                <h2
                  className={`text-3xl font-bold mb-8 ${
                    theme === "dark" ? "text-white" : "text-slate-900"
                  }`}
                >
                  Send me a message
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="group">
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Your Name"
                        className={`w-full px-0 py-4 text-lg bg-transparent border-0 border-b-2 focus:outline-none focus:ring-0 transition-all duration-300 ${
                          theme === "dark"
                            ? "text-white border-gray-600 focus:border-[var(--accent-color)] placeholder-gray-400"
                            : "text-slate-900 border-slate-300 focus:border-[var(--accent-color)] placeholder-slate-500"
                        }`}
                        required
                      />
                    </div>
                    <div className="group">
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Your Email"
                        className={`w-full px-0 py-4 text-lg bg-transparent border-0 border-b-2 focus:outline-none focus:ring-0 transition-all duration-300 ${
                          theme === "dark"
                            ? "text-white border-gray-600 focus:border-[var(--accent-color)] placeholder-gray-400"
                            : "text-slate-900 border-slate-300 focus:border-[var(--accent-color)] placeholder-slate-500"
                        }`}
                        required
                      />
                    </div>
                  </div>

                  <div className="group">
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="Subject"
                      className={`w-full px-0 py-4 text-lg bg-transparent border-0 border-b-2 focus:outline-none focus:ring-0 transition-all duration-300 ${
                        theme === "dark"
                          ? "text-white border-gray-600 focus:border-indigo-400 placeholder-gray-400"
                          : "text-slate-900 border-slate-300 focus:border-indigo-500 placeholder-slate-500"
                      }`}
                      required
                    />
                  </div>

                  <div className="group">
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Your Message"
                      rows={6}
                      className={`w-full px-0 py-4 text-lg bg-transparent border-0 border-b-2 focus:outline-none focus:ring-0 resize-none transition-all duration-300 ${
                        theme === "dark"
                          ? "text-white border-gray-600 focus:border-indigo-400 placeholder-gray-400"
                          : "text-slate-900 border-slate-300 focus:border-indigo-500 placeholder-slate-500"
                      }`}
                      required
                    />
                  </div>

                  {/* Mensaje de estado */}
                  {submitStatus === "success" && (
                    <div
                      className={`p-4 rounded-xl mb-4 ${
                        theme === "dark"
                          ? "bg-green-900/30 border border-green-500/30 text-green-300"
                          : "bg-green-50 border border-green-200 text-green-700"
                      }`}
                    >
                      <div className="flex items-center">
                        <span className="text-xl mr-2">✅</span>
                        <span>
                          Message sent successfully! I'll respond soon.
                        </span>
                      </div>
                    </div>
                  )}

                  {submitStatus === "error" && (
                    <div
                      className={`p-4 rounded-xl mb-4 ${
                        theme === "dark"
                          ? "bg-red-900/30 border border-red-500/30 text-red-300"
                          : "bg-red-50 border border-red-200 text-red-700"
                      }`}
                    >
                      <div className="flex items-center">
                        <span className="text-xl mr-2">❌</span>
                        <span>Error sending message. Please try again.</span>
                      </div>
                    </div>
                  )}

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className={`group relative px-8 py-4 text-lg font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ${
                        theme === "dark"
                          ? "bg-gradient-to-r from-[var(--accent-color)] to-[var(--accent-color)]/80 hover:from-[var(--accent-color)]/90 hover:to-[var(--accent-color)]/70 text-white shadow-lg hover:shadow-[var(--accent-color)]/25"
                          : "bg-gradient-to-r from-[var(--accent-color)] to-[var(--accent-color)]/80 hover:from-[var(--accent-color)]/90 hover:to-[var(--accent-color)]/70 text-white shadow-lg hover:shadow-[var(--accent-color)]/25"
                      }`}
                    >
                      {isLoading ? (
                        <>
                          <span className="inline-block animate-spin mr-2">
                            ⏳
                          </span>
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">
                            →
                          </span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Información de contacto - ocupa 2 columnas */}
            <div className="contact-info lg:col-span-2 space-y-8">
              <div
                className={`p-6 rounded-2xl backdrop-blur-sm ${
                  theme === "dark"
                    ? "bg-gradient-to-br from-[var(--accent-color)]/40 to-gray-900/40 border border-[var(--accent-color)]/20"
                    : "bg-gradient-to-br from-[var(--accent-color)]/5 to-white/80 border border-slate-200 shadow-lg"
                }`}
              >
                <h3
                  className={`text-2xl font-bold mb-6 ${"text-[var(--accent-color)]"}`}
                >
                  Get in Touch
                </h3>

                <div className="space-y-6">
                  {CONTACT_METHODS.map((method, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-4 group"
                    >
                      <div
                        className={`text-2xl p-3 rounded-xl transition-all duration-300 group-hover:scale-110 ${
                          theme === "dark"
                            ? "bg-[var(--accent-color)]/20 group-hover:bg-[var(--accent-color)]/30"
                            : "bg-[var(--accent-color)]/10 group-hover:bg-[var(--accent-color)]/20"
                        }`}
                      >
                        {method.icon}
                      </div>
                      <div>
                        <h4
                          className={`font-semibold text-lg ${
                            theme === "dark" ? "text-white" : "text-slate-900"
                          }`}
                        >
                          {method.title}
                        </h4>
                        <p
                          className={`font-medium ${"text-[var(--accent-color)]"}`}
                        >
                          {method.goesTo ? (
                            <a
                              href={method.goesTo}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {method.value}
                            </a>
                          ) : (
                            method.value
                          )}
                        </p>
                        <p
                          className={`text-sm ${
                            theme === "dark"
                              ? "text-gray-400"
                              : "text-slate-500"
                          }`}
                        >
                          {method.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sección adicional con diseño creativo */}
              <div
                className={`p-6 rounded-2xl backdrop-blur-sm transform rotate-1 hover:rotate-0 transition-all duration-300 ${
                  theme === "dark"
                    ? "bg-gradient-to-br from-gray-900/60 to-[var(--accent-color)]/40 border border-[var(--accent-color)]/20"
                    : "bg-gradient-to-br from-white/80 to-[var(--accent-color)]/5 border border-slate-200 shadow-lg"
                }`}
              >
                <h3
                  className={`text-xl font-bold mb-4 ${
                    theme === "dark" ? "text-white" : "text-slate-900"
                  }`}
                >
                  Quick Response
                </h3>
                <p
                  className={`text-sm leading-relaxed ${
                    theme === "dark" ? "text-gray-300" : "text-slate-600"
                  }`}
                >
                  I typically respond to messages within 24 hours. Feel free to
                  reach out if you'd like to connect or discuss ideas.
                </p>
              </div>
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
