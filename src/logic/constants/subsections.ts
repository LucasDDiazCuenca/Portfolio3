// Configuración de contenido para las subsecciones
export const SUBSECTION_CONTENT = {
  experience: {
    title: "Experience",
    subtitle: "Professional Journey",
    description:
      "Discover my professional background, skills, and the path that led me to become a frontend specialist.",
    buttonText: "Explore Experience",
    navigationRoute: "/about",
  },
  projects: {
    title: "Projects",
    subtitle: "Creative Solutions",
    description:
      "Explore my latest work and innovative digital experiences that push the boundaries of modern web development.",
    buttonText: "Explore Projects",
    navigationRoute: "/projects",
  },
  contact: {
    title: "Let's Talk",
    subtitle: "Get in Touch",
    description:
      "Feel free to reach out if you'd like to connect, discuss ideas, or just say hello.",
    buttonText: "Explore Let's Talk",
    navigationRoute: "/contact",
  },
} as const;

// Mapeo de tipos de subsección a tipos de cristal
export const SUBSECTION_CRYSTAL_TYPES = {
  experience: "golden" as const,
  projects: "green" as const,
  contact: "blue" as const,
} as const;

// Configuración de layout para cada subsección
export const SUBSECTION_LAYOUTS = {
  experience: { reversed: false },
  projects: { reversed: false },
  contact: { reversed: true }, // Contact tiene layout invertido
} as const;
