import { useTheme } from "../../hooks/useTheme";

export default function Footer() {
  const { theme } = useTheme();
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={`w-full py-12 px-4 sm:px-6 lg:px-8 transition-all duration-500 ${
        theme === "dark"
          ? "bg-gray-900 border-t border-gray-800"
          : "bg-slate-100 border-t border-slate-200"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="col-span-1 lg:col-span-2">
            <h3
              className={`text-2xl font-bold mb-4 transition-colors duration-500 ${
                theme === "dark" ? "text-white" : "text-slate-900"
              }`}
            >
              Studio Cristal
            </h3>
            <p
              className={`text-base mb-4 max-w-md transition-colors duration-500 ${
                theme === "dark" ? "text-gray-300" : "text-slate-600"
              }`}
            >
              Frontend engineer passionate about creating beautiful and
              functional digital experiences with modern web technologies.
            </p>
            <div className="flex space-x-4">
              {/* Social Links */}
              <a
                href="https://www.linkedin.com/in/lucas-diaz-cuenca/"
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2 rounded-lg transition-all duration-300 hover:scale-110 ${
                  theme === "dark"
                    ? "bg-gray-800 hover:bg-[var(--accent-color)] text-gray-300 hover:text-white"
                    : "bg-white hover:bg-[var(--accent-color)] text-slate-600 hover:text-white shadow-sm"
                }`}
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href="https://github.com/LucasDDiazCuenca/"
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2 rounded-lg transition-all duration-300 hover:scale-110 ${
                  theme === "dark"
                    ? "bg-gray-800 hover:bg-[var(--accent-color)] text-gray-300 hover:text-white"
                    : "bg-white hover:bg-[var(--accent-color)] text-slate-600 hover:text-white shadow-sm"
                }`}
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              className={`text-lg font-semibold mb-4 transition-colors duration-500 ${
                theme === "dark" ? "text-white" : "text-slate-900"
              }`}
            >
              Quick Links
            </h4>
            <ul className="space-y-2">
              {["Home", "About", "Projects", "Contact"].map((link) => (
                <li key={link}>
                  <a
                    href={`/${
                      link.toLowerCase() === "home" ? "" : link.toLowerCase()
                    }`}
                    className={`transition-colors duration-300 hover:text-[var(--accent-color)] ${
                      theme === "dark" ? "text-gray-300" : "text-slate-600"
                    }`}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div
          className={`pt-8 border-t flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 transition-colors duration-500 ${
            theme === "dark" ? "border-gray-800" : "border-slate-200"
          }`}
        >
          <p
            className={`text-sm transition-colors duration-500 ${
              theme === "dark" ? "text-gray-400" : "text-slate-500"
            }`}
          >
            © {currentYear} Studio Cristal. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm">
            <a
              href="#"
              className={`transition-colors duration-300 hover:text-[var(--accent-color)] ${
                theme === "dark" ? "text-gray-400" : "text-slate-500"
              }`}
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className={`transition-colors duration-300 hover:text-[var(--accent-color)] ${
                theme === "dark" ? "text-gray-400" : "text-slate-500"
              }`}
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
