import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cristal1 from "../cristals/Crsital1";
import { SplitText } from "../components/fonts/SplitText";
import { FadeContent } from "../components/fonts/FadeContent";
import { GlareHover } from "../components/fonts/GlareHover";
import { useTheme } from "../hooks/useTheme";

export default function Intro() {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 2000); // 2 segundos

    return () => clearTimeout(timer);
  }, []);

  const handleLetsGo = () => {
    navigate("/main");
  };

  return (
    <div
      className={`min-h-screen w-full transition-all duration-500 ${
        theme === "dark"
          ? "bg-gradient-to-br from-black via-purple-950 to-black"
          : "bg-gradient-to-br from-slate-50 via-white to-slate-100"
      } text-[var(--text-primary)]`}
    >
      {/* Patrón de fondo sutil para profundidad */}
      <div
        className={`absolute inset-0 ${
          theme === "dark"
            ? "bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.1)_0%,transparent_50%)]"
            : "bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.03)_0%,transparent_50%)]"
        }`}
      />

      <main className="relative flex flex-col items-center justify-center min-h-screen p-8 z-10">
        <div className="mb-8">
          <Cristal1 />
        </div>

        <div className="text-center mb-8">
          <SplitText
            text="Studio Cristal"
            className="text-4xl font-bold mb-2 text-[var(--text-primary)]"
            delay={0.5}
            duration={0.8}
            staggerDelay={0.1}
            animationType="fadeUp"
          />
          <SplitText
            text="By Lucas Diaz"
            className="text-xl text-[var(--accent-color)] mb-4"
            delay={1.5}
            duration={0.6}
            staggerDelay={0.05}
            animationType="slideUp"
          />
        </div>

        <div className="h-[60px] flex items-center justify-center">
          <FadeContent show={showButton} delay={0} duration={1000}>
            <GlareHover className="inline-block" intensity={0.3} speed={200}>
              <button
                onClick={handleLetsGo}
                className="px-6 py-2 bg-[var(--accent-color)] text-white rounded-lg font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-2xl cursor-pointer"
              >
                Let's go!
              </button>
            </GlareHover>
          </FadeContent>
        </div>
      </main>
    </div>
  );
}
