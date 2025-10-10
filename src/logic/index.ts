// Exportaciones de hooks
export { useSubSectionInteraction } from "./hooks/useSubSectionInteraction";
export {
  usePageAnimation,
  useElementsAnimation,
} from "./hooks/usePageAnimation";
export { useParallaxScroll, useMultiParallax } from "./hooks/useParallaxScroll";
export {
  useFormValidation,
  commonValidationRules,
} from "./hooks/useFormValidation";

// Exportaciones de constantes
export {
  SUBSECTION_CONTENT,
  SUBSECTION_CRYSTAL_TYPES,
  SUBSECTION_LAYOUTS,
} from "./constants/subsections";

// Exportar tipos
export type {
  UseSubSectionInteractionProps,
  UseSubSectionInteractionReturn,
} from "./hooks/useSubSectionInteraction";
export type { UsePageAnimationProps } from "./hooks/usePageAnimation";
export type { UseParallaxScrollReturn } from "./hooks/useParallaxScroll";
export type {
  ValidationRule,
  FieldConfig,
  UseFormValidationProps,
  UseFormValidationReturn,
} from "./hooks/useFormValidation";
