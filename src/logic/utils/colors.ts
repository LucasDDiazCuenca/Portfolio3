/**
 * Utilidades para manejo de colores temáticos de cristales
 */

export type CrystalType = "golden" | "green" | "blue";
export type Theme = "dark" | "light";

export interface CrystalColors {
  titleColor: string;
  encryptedColor: string;
}

/**
 * Obtiene los colores apropiados para un tipo de cristal según el tema
 * @param crystalType - Tipo de cristal (golden, green, blue)
 * @param theme - Tema actual (dark, light)
 * @returns Objeto con los colores para título y texto encriptado
 */
export function getCrystalColors(
  crystalType: CrystalType | undefined,
  theme: Theme
): CrystalColors {
  if (!crystalType) {
    return {
      titleColor: theme === "dark" ? "text-white" : "text-slate-900",
      encryptedColor: theme === "dark" ? "text-gray-400" : "text-slate-500",
    };
  }

  switch (crystalType) {
    case "green":
      return {
        titleColor:
          theme === "dark"
            ? "text-[var(--cristal-green-500)]"
            : "text-[var(--cristal-green-700)]",
        encryptedColor:
          theme === "dark"
            ? "text-[var(--cristal-green-700)]"
            : "text-[var(--cristal-green-900)]",
      };
    case "blue":
      return {
        titleColor:
          theme === "dark"
            ? "text-[var(--cristal-blue-500)]"
            : "text-[var(--cristal-blue-700)]",
        encryptedColor:
          theme === "dark"
            ? "text-[var(--cristal-blue-700)]"
            : "text-[var(--cristal-blue-900)]",
      };
    case "golden":
      return {
        titleColor:
          theme === "dark"
            ? "text-[var(--cristal-golden-500)]"
            : "text-[var(--cristal-golden-700)]",
        encryptedColor:
          theme === "dark"
            ? "text-[var(--cristal-golden-700)]"
            : "text-[var(--cristal-golden-900)]",
      };
    default:
      return {
        titleColor: theme === "dark" ? "text-white" : "text-slate-900",
        encryptedColor: theme === "dark" ? "text-gray-400" : "text-slate-500",
      };
  }
}
