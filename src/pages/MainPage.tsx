import { useTheme } from "../hooks/useTheme";
import TopMenu from "./components/TopMenu";
import MainComponent from "./components/MainComponent";
import MainSubSections from "./components/MainSubSections";
import Footer from "./components/Footer";

export default function MainPage() {
  const { theme } = useTheme();

  return (
    <div className={`${theme}`}>
      <TopMenu />
      <MainComponent />
      <div
        className={`transition-all duration-500 ${
          theme === "dark"
            ? "bg-[#0f0520]"
            : "bg-gradient-to-br from-slate-50 via-white to-slate-100"
        }`}
      >
        <MainSubSections />
      </div>
      <Footer />
    </div>
  );
}
