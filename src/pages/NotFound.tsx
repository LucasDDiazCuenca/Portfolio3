import { Link } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";

export default function NotFound() {
  const { theme } = useTheme();

  return (
    <div
      className={`min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] transition-all duration-300 ${theme} flex items-center justify-center`}
    >
      <div className="text-center max-w-md mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-[var(--accent-color)] mb-4">
            404
          </h1>
          <div className="w-24 h-1 bg-[var(--accent-color)] mx-auto mb-8"></div>
        </div>

        <h2 className="text-3xl font-semibold mb-4 text-[var(--text-primary)]">
          Page Not Found
        </h2>

        <p className="text-lg text-[var(--text-secondary)] mb-8">
          Sorry, the page you're looking for doesn't exist or has been moved.
          You may have mistyped the URL or the link might be broken.
        </p>

        <div className="space-y-4">
          <Link
            to="/"
            className="inline-block w-full px-6 py-3 bg-[var(--accent-color)] text-white rounded-lg font-semibold hover:bg-opacity-80 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Back to Home
          </Link>

          <Link
            to="/main"
            className="inline-block w-full px-6 py-3 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition-colors duration-300"
          >
            Go to Main Page
          </Link>
        </div>

        <div className="mt-12">
          <p className="text-sm text-[var(--text-secondary)]">
            Need help?
            <span className="text-[var(--accent-color)] hover:underline cursor-pointer ml-1">
              Contact us
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
