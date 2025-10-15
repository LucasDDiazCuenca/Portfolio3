import { useTheme } from "../../hooks/useTheme";
import DecryptedText from "../fonts/DecryptedText";
import { getCrystalColors, type CrystalType } from "../../logic/utils";
import MachineTextType from "../fonts/MachineTextType";

export interface SectionTitleProps {
  /** Título principal */
  title: string;
  /** Subtítulo */
  subtitle: string;
  /** Descripción */
  description: string;
  /** Tipo de cristal para determinar colores temáticos */
  crystalType?: CrystalType;
  /** Clases CSS adicionales */
  className?: string;
}

export default function SectionTitle({
  title,
  subtitle,
  description,
  crystalType,
  className = "",
}: SectionTitleProps) {
  const { theme } = useTheme();

  const colors = getCrystalColors(crystalType, theme);

  return (
    <div className={`flex-1 space-y-8 p-10 ${className}`}>
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="block">
            <DecryptedText
              text={title}
              animateOn="both"
              speed={80}
              maxIterations={20}
              sequential={true}
              className={`inline-block text-5xl md:text-6xl font-bold ${colors.titleColor}`}
              encryptedClassName={`inline-block text-5xl md:text-6xl font-bold ${colors.encryptedColor}`}
              useOriginalCharsOnly={false}
            />
          </div>

          <div className="block">
            <MachineTextType
              text={subtitle}
              className={`block text-xl md:text-2xl font-medium transition-colors duration-500`}
              typingSpeed={80}
              showCursor={true}
              cursorCharacter="_"
              cursorClassName={`text-xl md:text-2xl font-medium ${
                theme === "dark" ? "text-gray-500" : "text-gray-600"
              }`}
              cursorBlinkDuration={0.8}
              loop={false}
              textColors={[theme === "dark" ? "#6b7280" : "#4b5563"]}
              startOnVisible={true}
              resetOnExit={true}
            />
          </div>
        </div>
      </div>

      <p
        className={`text-lg md:text-xl leading-relaxed max-w-2xl transition-colors duration-500 ${
          theme === "dark" ? "text-gray-300" : "text-gray-600"
        }`}
      >
        {description}
      </p>
    </div>
  );
}
