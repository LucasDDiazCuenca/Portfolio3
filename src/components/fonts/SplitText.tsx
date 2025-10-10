import React from "react";
import { motion } from "framer-motion";

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  staggerDelay?: number;
  animationType?: "fadeUp" | "fadeIn" | "slideUp" | "scale";
}

export const SplitText: React.FC<SplitTextProps> = ({
  text,
  className = "",
  delay = 0,
  duration = 0.6,
  staggerDelay = 0.08,
  animationType = "fadeUp",
}) => {
  // Split text into individual characters, preserving spaces
  const characters = text.split("").map((char, index) => ({
    char: char === " " ? "\u00A0" : char, // Non-breaking space for proper spacing
    index,
  }));

  // Animation variants based on type
  const getVariants = () => {
    switch (animationType) {
      case "fadeIn":
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
        };
      case "slideUp":
        return {
          hidden: { opacity: 0, y: 50 },
          visible: { opacity: 1, y: 0 },
        };
      case "scale":
        return {
          hidden: { opacity: 0, scale: 0.8 },
          visible: { opacity: 1, scale: 1 },
        };
      case "fadeUp":
      default:
        return {
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 },
        };
    }
  };

  const variants = getVariants();

  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: delay,
          },
        },
      }}
    >
      {characters.map(({ char, index }) => (
        <motion.span
          key={index}
          variants={variants}
          transition={{
            duration,
            ease: "easeOut",
          }}
          style={{ display: "inline-block" }}
        >
          {char}
        </motion.span>
      ))}
    </motion.div>
  );
};
