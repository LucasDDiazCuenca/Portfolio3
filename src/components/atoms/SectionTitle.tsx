import { useTheme } from "../../hooks/useTheme";

export interface SectionTitleProps {
  /** Título principal */
  title: string;
  /** Subtítulo */
  subtitle: string;
  /** Descripción */
  description: string;
  /** Clases CSS adicionales */
  className?: string;
}

export default function SectionTitle({
  title,
  subtitle,
  description,
  className = "",
}: SectionTitleProps) {
  const { theme } = useTheme();

  return (
    <div className={`flex-1 space-y-8 p-10 ${className}`}>
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <div>
            <h3
              className={`text-5xl md:text-7xl font-bold transition-colors duration-500 ${
                theme === "dark" ? "text-white" : "text-slate-900"
              } group-hover:text-[var(--accent-color)]`}
            >
              {title}
            </h3>
            <p
              className={`text-xl md:text-2xl font-medium transition-colors duration-500 ${
                theme === "dark" ? "text-gray-400" : "text-slate-500"
              }`}
            >
              {subtitle}
            </p>
          </div>
        </div>
      </div>

      <p
        className={`text-lg md:text-xl leading-relaxed max-w-2xl transition-colors duration-500 ${
          theme === "dark" ? "text-gray-300" : "text-slate-600"
        }`}
      >
        {description}
      </p>
    </div>
  );
}
