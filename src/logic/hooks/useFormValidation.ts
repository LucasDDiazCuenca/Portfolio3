import { useState, useCallback } from "react";

export interface ValidationRule {
  /** Función de validación que retorna true si es válido */
  validate: (value: string) => boolean;
  /** Mensaje de error si la validación falla */
  message: string;
}

export interface FieldConfig {
  /** Reglas de validación para el campo */
  rules: ValidationRule[];
  /** Si el campo es requerido */
  required?: boolean;
}

export interface UseFormValidationProps<T> {
  /** Configuración de validación por campo */
  validationConfig: Record<keyof T, FieldConfig>;
  /** Valores iniciales del formulario */
  initialValues: T;
}

export interface UseFormValidationReturn<T> {
  /** Valores actuales del formulario */
  values: T;
  /** Errores de validación por campo */
  errors: Partial<Record<keyof T, string>>;
  /** Si el formulario es válido */
  isValid: boolean;
  /** Si algún campo ha sido tocado */
  touched: Partial<Record<keyof T, boolean>>;
  /** Función para actualizar un campo */
  setValue: (field: keyof T, value: string) => void;
  /** Función para manejar cambios de input */
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  /** Función para validar un campo específico */
  validateField: (field: keyof T) => void;
  /** Función para validar todo el formulario */
  validateForm: () => boolean;
  /** Función para resetear el formulario */
  reset: () => void;
  /** Función para marcar un campo como tocado */
  setTouched: (field: keyof T) => void;
}

/**
 * Hook personalizado para validación de formularios
 */
export function useFormValidation<T extends Record<string, string>>({
  validationConfig,
  initialValues,
}: UseFormValidationProps<T>): UseFormValidationReturn<T> {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [touched, setTouchedState] = useState<
    Partial<Record<keyof T, boolean>>
  >({});

  const validateField = useCallback(
    (field: keyof T) => {
      const value = values[field];
      const config = validationConfig[field];

      // Verificar si es requerido
      if (config.required && (!value || value.trim() === "")) {
        setErrors((prev) => ({ ...prev, [field]: "This field is required" }));
        return false;
      }

      // Si no es requerido y está vacío, no validar reglas adicionales
      if (!config.required && (!value || value.trim() === "")) {
        setErrors((prev) => ({ ...prev, [field]: undefined }));
        return true;
      }

      // Validar reglas específicas
      for (const rule of config.rules) {
        if (!rule.validate(value)) {
          setErrors((prev) => ({ ...prev, [field]: rule.message }));
          return false;
        }
      }

      // Si pasa todas las validaciones
      setErrors((prev) => ({ ...prev, [field]: undefined }));
      return true;
    },
    [values, validationConfig]
  );

  const setValue = useCallback(
    (field: keyof T, value: string) => {
      setValues((prev) => ({ ...prev, [field]: value }));

      // Validar automáticamente si el campo ya fue tocado
      if (touched[field]) {
        setTimeout(() => validateField(field), 0);
      }
    },
    [touched, validateField]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setValue(name as keyof T, value);
    },
    [setValue]
  );

  const setTouched = useCallback(
    (field: keyof T) => {
      setTouchedState((prev) => ({ ...prev, [field]: true }));
      validateField(field);
    },
    [validateField]
  );

  const validateForm = useCallback(() => {
    let isFormValid = true;

    for (const field in validationConfig) {
      const isFieldValid = validateField(field);
      if (!isFieldValid) {
        isFormValid = false;
      }
      setTouchedState((prev) => ({ ...prev, [field]: true }));
    }

    return isFormValid;
  }, [validationConfig, validateField]);

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouchedState({});
  }, [initialValues]);

  // Calcular si el formulario es válido
  const isValid = Object.keys(validationConfig).every(
    (field) => !errors[field as keyof T]
  );

  return {
    values,
    errors,
    isValid,
    touched,
    setValue,
    handleChange,
    validateField,
    validateForm,
    reset,
    setTouched,
  };
}

// Reglas de validación comunes
export const commonValidationRules = {
  email: {
    validate: (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    message: "Please enter a valid email address",
  },
  minLength: (length: number) => ({
    validate: (value: string) => value.length >= length,
    message: `Must be at least ${length} characters long`,
  }),
  maxLength: (length: number) => ({
    validate: (value: string) => value.length <= length,
    message: `Must be no more than ${length} characters long`,
  }),
  noEmptySpaces: {
    validate: (value: string) => value.trim().length > 0,
    message: "Field cannot be empty or contain only spaces",
  },
};
