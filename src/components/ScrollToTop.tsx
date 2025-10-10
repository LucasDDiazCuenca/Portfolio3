import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface ScrollToTopProps {
  smooth?: boolean;
}

export const ScrollToTop: React.FC<ScrollToTopProps> = ({ smooth = true }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll al inicio de la página cuando cambie la ruta
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: smooth ? "smooth" : "instant",
    });
  }, [pathname, smooth]);

  return null; // Este componente no renderiza nada
};
