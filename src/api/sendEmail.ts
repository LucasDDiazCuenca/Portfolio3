import emailjs from "@emailjs/browser";

// Configuración de EmailJS usando variables de entorno
const EMAILJS_CONFIG = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
};

// Email de destino desde variables de entorno
const TO_EMAIL = import.meta.env.VITE_EMAIL_TO || "lucasdamian30@gmail.com";

// Tipos para el formulario de contacto
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Parámetros que se envían al template de EmailJS
interface EmailTemplateParams {
  from_name: string;
  from_email: string;
  subject: string;
  message: string;
  to_email: string;
  reply_to: string; // Email para Reply-To
  [key: string]: string; // Permitir propiedades adicionales
}

/**
 * Envía un email usando EmailJS
 * @param formData - Datos del formulario de contacto
 * @returns Promise que resuelve cuando el email se envía exitosamente
 */
export const sendContactEmail = async (
  formData: ContactFormData
): Promise<void> => {
  try {
    // Validar que las credenciales estén configuradas
    if (
      !EMAILJS_CONFIG.serviceId ||
      !EMAILJS_CONFIG.templateId ||
      !EMAILJS_CONFIG.publicKey
    ) {
      throw new Error(
        "EmailJS is not configured correctly. Please check environment variables."
      );
    }

    // Validar que los datos requeridos estén presentes
    if (!formData.name || !formData.email || !formData.message) {
      throw new Error("All fields are required");
    }

    // Validar formato de email básico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      throw new Error("Invalid email format");
    }

    // Preparar parámetros del template
    const templateParams: EmailTemplateParams = {
      from_name: formData.name.trim(),
      from_email: formData.email.trim(),
      subject: formData.subject.trim() || "Message from portfolio",
      message: formData.message.trim(),
      to_email: TO_EMAIL,
      reply_to: formData.email.trim(), // Para que puedas responder directamente
    };

    // Enviar email usando EmailJS
    const response = await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.templateId,
      templateParams,
      EMAILJS_CONFIG.publicKey
    );

    // Verificar que la respuesta sea exitosa
    if (response.status !== 200) {
      throw new Error(`Error del servidor: ${response.status}`);
    }

    console.log("Email enviado exitosamente:", response);
  } catch (error) {
    console.error("Error al enviar email:", error);

    // Re-lanzar el error con un mensaje más amigable
    if (error instanceof Error) {
      throw new Error(`Error sending message: ${error.message}`);
    } else {
      throw new Error("Unknown error sending message. Please try again.");
    }
  }
};

/**
 * Configurar las credenciales de EmailJS
 * Útil para cambiar las credenciales dinámicamente si es necesario
 */
export const updateEmailJSConfig = (config: Partial<typeof EMAILJS_CONFIG>) => {
  Object.assign(EMAILJS_CONFIG, config);
};

/**
 * Obtener la configuración actual (sin exponer las claves)
 */
export const getEmailJSStatus = () => {
  return {
    isConfigured: !!(
      EMAILJS_CONFIG.serviceId &&
      EMAILJS_CONFIG.templateId &&
      EMAILJS_CONFIG.publicKey &&
      EMAILJS_CONFIG.serviceId !== "YOUR_SERVICE_ID" &&
      EMAILJS_CONFIG.templateId !== "YOUR_TEMPLATE_ID" &&
      EMAILJS_CONFIG.publicKey !== "YOUR_PUBLIC_KEY"
    ),
    serviceId: EMAILJS_CONFIG.serviceId,
    templateId: EMAILJS_CONFIG.templateId,
    toEmail: TO_EMAIL,
  };
};
