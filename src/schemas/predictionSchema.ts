import { z } from "zod";
import {
  neighborhoodsOptions,
  overallQualOptions,
} from "../utils/selectOptions";

const overallQualValues = overallQualOptions.map((o) => o.value);
const neighborhoodValues = neighborhoodsOptions.map((o) => o.value);

export const housePricePredictionSchema = z.object({
  grLivArea: z
    .number({
      invalid_type_error: "Área habitable sobre el suelo debe ser un número",
      required_error: "Área habitable sobre el suelo es requerida",
    })
    .min(300, {
      message: "Área habitable sobre el suelo no puede ser menor a 300 ft²",
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
    })
    .max(new Date().getFullYear(), {
      message: "Año de construcción no puede ser mayor al año actual",
    }),
  overallQual: z.object(
    {
      value: z
        .number({
          invalid_type_error: "Calidad general inválida",
          required_error: "Calidad general de la vivienda es requerida",
        })
        .refine((val) => overallQualValues.includes(val), {
          message: "Selecciona una calidad general válida",
        }),
      label: z.string(),
    },
    { required_error: "Calidad general de la vivienda es requerida" }
  ),
  neighborhood: z.object(
    {
      value: z
        .string({
          invalid_type_error: "Barrio debe ser una cadena de texto",
          required_error: "Barrio es requerido",
        })
        .refine((val) => neighborhoodValues.includes(val), {
          message: "Selecciona un barrio válido",
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
