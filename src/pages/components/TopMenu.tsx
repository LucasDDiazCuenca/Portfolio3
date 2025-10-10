import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Cristal } from "../../cristals/YellowCristal";
import { ThemeToggleButton } from "../../components/themes/ThemeToggle";
import cvPdf from "../../assets/cv/Lucas_CV.pdf";

export default function TopMenu() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", path: "/main" },
    { name: "Projects", path: "/projects" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[var(--bg-primary)]/95 backdrop-blur-md shadow-lg border-b border-[var(--border-color)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center space-x-2 group focus:outline-none"
            >
              <div className="transform group-hover:scale-110 transition-transform duration-200 mt-16 mb-1">
                <Cristal
                  size={60}
                  duration={2}
                  glow={4}
                  pauseOnHover={true}
                  color="#9333EA"
                  className="opacity-90 group-hover:opacity-100"
                />
              </div>
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 relative group ${
                    location.pathname === item.path
                      ? "text-[var(--accent-color)]"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  }`}
                >
                  {item.name}
                  <span
                    className={`absolute bottom-0 left-0 w-full h-0.5 bg-[var(--accent-color)] transform origin-left transition-transform duration-200 ${
                      location.pathname === item.path
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </Link>
              ))}

              {/* CV Icon */}
              <button
                onClick={() => {
                  window.open(cvPdf, "_blank");
                }}
                className="w-12 h-12 rounded-full border-2 border-[var(--border-color)] bg-[var(--bg-secondary)] text-[var(--text-primary)] hover:text-[var(--accent-color)] cursor-pointer flex items-center justify-center transition-all duration-300 shadow-lg hover:scale-110 hover:shadow-xl active:scale-95 group"
                title="Descargar CV"
              >
                <svg
                  className="w-6 h-6 transform group-hover:scale-110 transition-transform duration-200"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                  <path d="M8,12V14H16V12H8M8,16V18H13V16H8Z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center">
            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="w-10 h-10 rounded-md border border-[var(--border-color)] bg-[var(--bg-secondary)] text-[var(--text-primary)] flex items-center justify-center transition-all duration-200 hover:bg-[var(--bg-primary)]"
                aria-label="Open mobile menu"
              >
                <svg
                  className={`w-5 h-5 transform transition-transform duration-200 ${
                    isMobileMenuOpen ? "rotate-90" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {isMobileMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen
            ? "max-h-80 opacity-100"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 bg-[var(--bg-primary)]/95 backdrop-blur-md border-t border-[var(--border-color)]">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`block px-3 py-2 rounded-md text-base font-medium transition-all duration-200 ${
                location.pathname === item.path
                  ? "text-[var(--accent-color)] bg-[var(--bg-secondary)]"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]"
              }`}
            >
              {item.name}
            </Link>
          ))}

          {/* CV Button for Mobile */}
          <button
            onClick={() => {
              window.open(cvPdf, "_blank");
              setIsMobileMenuOpen(false);
            }}
            className="flex items-center px-3 py-2 rounded-md text-base font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] transition-all duration-200"
          >
            <svg
              className="w-5 h-5 mr-3"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
              <path d="M8,12V14H16V12H8M8,16V18H13V16H8Z" />
            </svg>
            Download CV
          </button>

          {/* Theme Toggle for Mobile */}
          <div className="px-3 py-2 border-t border-[var(--border-color)] mt-2 pt-3">
            <div className="flex items-center justify-between">
              <span className="text-[var(--text-secondary)] text-base font-medium">
                Theme
              </span>
              <ThemeToggleButton
                className="w-10 h-10 rounded-md border border-[var(--border-color)] bg-[var(--bg-secondary)] text-[var(--text-primary)] flex items-center justify-center transition-all duration-200 hover:bg-[var(--bg-primary)]"
                size={20}
                onClick={() => setIsMobileMenuOpen(false)}
              />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
