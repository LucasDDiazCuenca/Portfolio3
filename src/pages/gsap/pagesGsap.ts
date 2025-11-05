import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Animaciones para la página de Projects
export const animateProjectsCards = (container: HTMLElement) => {
  const cards = container.querySelectorAll(".project-card");

  // Agregar clase para indicar que GSAP está listo
  container.classList.add("gsap-ready");

  // Usar .set() para establecer el estado inicial inmediatamente
  gsap.set(cards, {
    opacity: 0,
    y: 50,
    scale: 0.9,
  });

  // Animar desde el estado inicial
  gsap.to(cards, {
    opacity: 1,
    y: 0,
    scale: 1,
    duration: 0.8,
    stagger: 0.2,
    ease: "power2.out",
    delay: 0.1, // Reducir delay para animación más rápida
  });
};

// Animaciones para la página de About
export const animateAboutSections = (container: HTMLElement) => {
  const sections = container.querySelectorAll(".about-section");

  // Agregar clase para indicar que GSAP está listo
  container.classList.add("gsap-ready");

  // Establecer estado inicial
  gsap.set(sections, {
    opacity: 0,
    y: 60,
    scale: 0.95,
  });

  // Animar desde el estado inicial
  gsap.to(sections, {
    opacity: 1,
    y: 0,
    scale: 1,
    duration: 1,
    stagger: 0.3,
    ease: "power2.out",
    delay: 0.1,
  });
};

// Animaciones para la página de Contact
export const animateContactTitle = () => {
  gsap.set(".contact-title", { opacity: 0, y: -50, scale: 0.8 });
  gsap.to(".contact-title", {
    opacity: 1,
    y: 0,
    scale: 1,
    duration: 1,
    ease: "back.out(1.7)",
    delay: 0.1,
  });
};

export const animateContactForm = () => {
  gsap.set(".contact-form", { opacity: 0, x: -100, rotationY: -15 });
  gsap.to(".contact-form", {
    opacity: 1,
    x: 0,
    rotationY: 0,
    duration: 1.2,
    delay: 0.2,
    ease: "power2.out",
  });
};

export const animateContactInfo = () => {
  gsap.set(".contact-info", { opacity: 0, x: 100, rotationY: 15 });
  gsap.to(".contact-info", {
    opacity: 1,
    x: 0,
    rotationY: 0,
    duration: 1.2,
    delay: 0.3,
    ease: "power2.out",
  });
};

export const animateContactFloatingElements = () => {
  // Establecer estado inicial
  gsap.set(".floating-element", { opacity: 0, scale: 0, rotation: 180 });

  // Animación inicial de entrada
  gsap.to(".floating-element", {
    opacity: 1,
    scale: 1,
    rotation: 0,
    duration: 0.8,
    stagger: 0.2,
    delay: 0.5,
    ease: "elastic.out(1, 0.5)",
  });

  // Animación continua de elementos flotantes (después de la entrada)
  gsap.to(".floating-element", {
    y: "random(-20, 20)",
    x: "random(-10, 10)",
    rotation: "random(-5, 5)",
    duration: "random(3, 6)",
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
    delay: 1.5, // Esperar a que termine la animación de entrada
    stagger: {
      each: 0.5,
      from: "random",
    },
  });
};

// Función combinada para todas las animaciones de Contact
export const animateContactPage = (container?: HTMLElement) => {
  // Agregar clase para indicar que GSAP está listo
  if (container) {
    container.classList.add("gsap-ready");
  }

  animateContactTitle();
  animateContactForm();
  animateContactInfo();
  animateContactFloatingElements();
};
