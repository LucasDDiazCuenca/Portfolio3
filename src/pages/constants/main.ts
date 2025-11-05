interface SubSection {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  route: string;
  icon: string;
  gradient: {
    dark: string;
    light: string;
  };
}

const SUB_SECTIONS: SubSection[] = [
  {
    id: "projects",
    title: "Projects",
    subtitle: "Creative Solutions",
    description:
      "Explore my latest work and innovative digital experiences that push the boundaries of modern web development.",
    route: "/projects",
    icon: "🚀",
    gradient: {
      dark: "from-green-400/20 via-emerald-500/10 to-lime-400/15",
      light: "from-green-200/30 via-emerald-200/20 to-lime-200/25",
    },
  },
  {
    id: "contact",
    title: "Let's Talk",
    subtitle: "Get in Touch",
    description:
      "Feel free to reach out if you'd like to connect, discuss ideas, or just say hello.",
    route: "/contact",
    icon: "💬",
    gradient: {
      dark: "from-emerald-500/20 via-transparent to-[var(--accent-color)]/10",
      light: "from-emerald-100/30 via-transparent to-[var(--accent-color)]/5",
    },
  },
  {
    id: "experience",
    title: "Experience",
    subtitle: "Professional Journey",
    description:
      "Discover my professional background, skills, and the path that led me to become a frontend specialist.",
    route: "/about",
    icon: "⭐",
    gradient: {
      dark: "from-orange-500/20 via-transparent to-[var(--accent-color)]/10",
      light: "from-orange-100/30 via-transparent to-[var(--accent-color)]/5",
    },
  },
];

export { SUB_SECTIONS };
