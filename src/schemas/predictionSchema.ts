import { z } from "zod";

export const housePricePredictionSchema = z.object({
  grLivArea: z
    .number({
      invalid_type_error: "Área habitable sobre el suelo debe ser un número",
      required_error: "Área habitable sobre el suelo es requerida",
    })
    .min(0, {
      message: "Área habitable sobre el suelo no puede ser negativa",
    }),
  garageCars: z
    .number({
      invalid_type_error: "Número de autos en el garaje debe ser un número",
      required_error: "Número de autos en el garaje es requerido",
    })
    .min(0, { message: "Número de autos en el garaje no puede ser negativo" }),
  totalBsmtSF: z
    .number({
      invalid_type_error: "Área total del sótano debe ser un número",
      required_error: "Área total del sótano es requerida",
    })
    .min(0, {
      message: "Área total del sótano no puede ser negativa",
    }),
  yearBuilt: z
    .number({
      invalid_type_error: "Año de construcción debe ser un número",
      required_error: "Año de construcción es requerido",
    })
    .min(1800, {
      message: "Año de construcción debe ser mayor a 1800",
    }),
  overallQual: z.object(
    {
      value: z.number({
        invalid_type_error: "Calidad general de la vivienda debe ser un número",
        required_error: "Calidad general de la vivienda es requerida",
      }),
      label: z.string(),
    },
    { required_error: "Calidad general de la vivienda es requerida" }
  ),
  neighborhood: z.object(
    {
      value: z.string({
        invalid_type_error: "Barrio debe ser una cadena de texto",
        required_error: "Barrio es requerido",
      }),
      label: z.string(),
    },
    {
      required_error: "Barrio es requerido",
    }
  ),
});

export const multipleHomePricePrediction = z.object({
  excelFile: z
    .custom<File>()
    .refine(
      (file) =>
        file &&
        [
          "application/vnd.ms-excel",
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        ].includes(file.type),
      { message: "Solo se permiten archivos .xls o .xlsx" }
    ),
});

export type MultipleHomePricePrediction = z.infer<
  typeof multipleHomePricePrediction
>;

export type HousePricePredictionForm = z.infer<
  typeof housePricePredictionSchema
>;
