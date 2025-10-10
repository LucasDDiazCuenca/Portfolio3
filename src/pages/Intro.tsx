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
    }, 5000); // 5 segundos

    return () => clearTimeout(timer);
  }, []);

  const handleLetsGo = () => {
    navigate("/main");
  };

  return (
    <div
      className={`min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] transition-all duration-300 ${theme}`}
    >
      <main className="flex flex-col items-center justify-center min-h-screen p-8">
        <div className="mb-8">
          <Cristal1 />
        </div>

        <div className="text-center mb-8">
          <SplitText
            text="Cristal Studio"
            className="text-4xl font-bold mb-2 text-[var(--text-primary)]"
            delay={0.5}
            duration={0.8}
            staggerDelay={0.1}
            animationType="fadeUp"
          />
          <SplitText
            text="By Lucas Diaz"
            className="text-xl text-[var(--accent-color)] mb-4"
            delay={2.5}
            duration={0.6}
            staggerDelay={0.05}
            animationType="slideUp"
          />
        </div>

        <div className="h-[60px] flex items-center justify-center">
          <FadeContent show={showButton} delay={0} duration={1000}>
            <GlareHover className="inline-block" intensity={0.3} speed={300}>
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
