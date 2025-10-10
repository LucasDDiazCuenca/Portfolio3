import React from "react";
import { useTheme } from "../../hooks/useTheme";

interface ThemeToggleButtonProps {
  className?: string;
  size?: number;
  onClick?: () => void;
}

// Componente reutilizable para el botón de cambio de tema
export const ThemeToggleButton: React.FC<ThemeToggleButtonProps> = ({
  className = "",
  size = 24,
  onClick,
}) => {
  const { theme, toggleTheme } = useTheme();

  const handleClick = () => {
    toggleTheme();
    onClick?.();
  };

  return (
    <button
      onClick={handleClick}
      className={className}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
    >
      {theme === "dark" ? (
        // Sun icon to switch to light theme
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
          <path
            d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      ) : (
        // Moon icon to switch to dark theme
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      )}
    </button>
  );
};

// Componente principal para desktop (fixed position)
export const ThemeToggle: React.FC = () => {
  return (
    <ThemeToggleButton className="hidden md:flex fixed top-5 right-5 w-12 h-12 rounded-full border-2 border-[var(--border-color)] bg-[var(--bg-secondary)] text-[var(--text-primary)] cursor-pointer items-center justify-center transition-all duration-300 z-[1000] shadow-lg hover:scale-110 hover:shadow-xl active:scale-95" />
  );
};
