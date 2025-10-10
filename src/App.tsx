import { Routes, Route } from "react-router-dom";
import { ThemeToggle } from "./components/themes/ThemeToggle";
import { ScrollToTop } from "./components/ScrollToTop";
import Intro from "./pages/Intro";
import MainPage from "./pages/MainPage";
import Projects from "./pages/Projects";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <>
      <ThemeToggle />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/gallery" element={<Projects />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
