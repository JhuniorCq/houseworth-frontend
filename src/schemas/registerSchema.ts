import { z } from "zod";

export const registerSchema = z.object({
  username: z
    .string({
      invalid_type_error: "El nombre debe ser una cadena de texto",
      required_error: "El nombre es requerido",
    })
    .min(3, {
      message: "El nombre de usuario debe tener al menos 3 caracteres",
    }),
  email: z
    .string({
      invalid_type_error: "El correo electrónico debe ser una cadena de texto",
      required_error: "El correo electrónico es requerido",
    })
    .email({ message: "El correo electrónico no es válido" }),
  password: z
    .string({
      invalid_type_error: "La contraseña debe ser una cadena de texto",
      required_error: "La contraseña es requerida",
    })
    .min(6, {
      message: "La contraseña debe tener al menos 6 caracteres",
    }),
});

export type RegistrationForm = z.infer<typeof registerSchema>;
