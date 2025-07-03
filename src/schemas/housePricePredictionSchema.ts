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
  // garageArea: z
  //   .number({
  //     invalid_type_error: "Área del garaje debe ser un número",
  //     required_error: "Área del garaje es requerida",
  //   })
  //   .min(0, {
  //     message: "Área del garaje no puede ser negativa",
  //   }),
  totalBsmtSF: z
    .number({
      invalid_type_error: "Área total del sótano debe ser un número",
      required_error: "Área total del sótano es requerida",
    })
    .min(0, {
      message: "Área total del sótano no puede ser negativa",
    }),
  // firstFlrSF: z
  //   .number({
  //     invalid_type_error: "Área del primer piso debe ser un número",
  //     required_error: "Área del primer piso es requerida",
  //   })
  //   .min(0, {
  //     message: "Área del primer piso no puede ser negativa",
  //   }),
  // secondFlrSF: z
  //   .number({
  //     invalid_type_error: "Área del segundo piso debe ser un número",
  //     required_error: "Área del segundo piso es requerida",
  //   })
  //   .min(0, {
  //     message: "Área del segundo piso no puede ser negativa",
  //   }),
  yearBuilt: z
    .number({
      invalid_type_error: "Año de construcción debe ser un número",
      required_error: "Año de construcción es requerido",
    })
    .min(1800, {
      message: "Año de construcción debe ser mayor a 1800",
    }),
  // yearRemodAdd: z
  //   .number({
  //     invalid_type_error: "Año de última remodelación debe ser un número",
  //     required_error: "Año de última remodelación es requerido",
  //   })
  //   .min(1800, {
  //     message: "Año de última remodelación debe ser mayor a 1800",
  //   }),
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
  // houseStyle: z.object(
  //   {
  //     value: z.string({
  //       invalid_type_error:
  //         "Estilo de la vivienda debe ser una cadena de texto",
  //       required_error: "Estilo de la vivienda es requerido",
  //     }),
  //     label: z.string(),
  //   },
  //   {
  //     required_error: "Estilo de la vivienda es requerido",
  //   }
  // ),
  // exterQual: z.object(
  //   {
  //     value: z.string({
  //       invalid_type_error:
  //         "Calidad del material exterior debe ser una cadena de texto",
  //       required_error: "Calidad del material exterior es requerida",
  //     }),
  //     label: z.string(),
  //   },
  //   {
  //     required_error: "Calidad del material exterior es requerida",
  //   }
  // ),
  // kitchenQual: z.object(
  //   {
  //     value: z.string({
  //       invalid_type_error: "Calidad de la cocina debe ser una cadena de texto",
  //       required_error: "Calidad de la cocina es requerida",
  //     }),
  //     label: z.string(),
  //   },
  //   {
  //     required_error: "Calidad de la cocina es requerida",
  //   }
  // ),
  // bsmtQual: z.object(
  //   {
  //     value: z.string({
  //       invalid_type_error: "Calidad del sótano debe ser una cadena de texto",
  //       required_error: "Calidad del sótano es requerida",
  //     }),
  //     label: z.string(),
  //   },
  //   {
  //     required_error: "Calidad del sótano es requerida",
  //   }
  // ),
  // garageFinish: z.object(
  //   {
  //     value: z.string({
  //       invalid_type_error:
  //         "Acabado del interior del garaje debe ser una cadena de texto",
  //       required_error: "Acabado del interior del garaje es requerido",
  //     }),
  //     label: z.string(),
  //   },
  //   {
  //     required_error: "Acabado del interior del garaje es requerido",
  //   }
  // ),
});

export type HousePricePredictionForm = z.infer<
  typeof housePricePredictionSchema
>;
