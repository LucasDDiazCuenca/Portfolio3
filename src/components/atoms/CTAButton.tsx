import { useTheme } from "../../hooks/useTheme";

export interface CTAButtonProps {
  /** Texto del botón */
  text: string;
  /** Función a ejecutar al hacer click */
  onClick: () => void;
  /** Clases CSS adicionales */
  className?: string;
}

export default function CTAButton({
  text,
  onClick,
  className = "",
}: CTAButtonProps) {
  const { theme } = useTheme();

  return (
    <div className={`p-10 ${className}`}>
      <div
        className={`inline-flex cursor-pointer items-center gap-3 px-8 py-4 rounded-2xl border-2 transition-all duration-500 ${
          theme === "dark"
            ? "border-gray-600 group-hover:border-[var(--accent-color)] group-hover:bg-[var(--accent-color)]/10"
            : "border-slate-300 group-hover:border-[var(--accent-color)] group-hover:bg-[var(--accent-color)]/5"
        }`}
        onClick={onClick}
      >
        <span
          className={`text-lg font-semibold transition-colors duration-500 ${
            theme === "dark" ? "text-white" : "text-slate-900"
          } group-hover:text-[var(--accent-color)]`}
        >
          {text}
        </span>
        <svg
          className={`w-6 h-6 transition-all duration-500 transform group-hover:translate-x-2 ${
            theme === "dark" ? "text-gray-400" : "text-slate-500"
          } group-hover:text-[var(--accent-color)]`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 8l4 4m0 0l-4 4m4-4H3"
          />
        </svg>
      </div>
    </div>
  );
}
