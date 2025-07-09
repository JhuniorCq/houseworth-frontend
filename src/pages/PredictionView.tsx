import {
  Controller,
  useForm,
  type SubmitErrorHandler,
  type SubmitHandler,
} from "react-hook-form";
import Button from "../components/Button";
import Input from "../components/Input";
import CustomSelect from "../components/CustomSelect";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  housePricePredictionSchema,
  type HousePricePredictionForm,
} from "../schemas/predictionSchema";
import {
  neighborhoodsOptions,
  overallQualOptions,
} from "../utils/selectOptions";
import PredictionBase from "../components/PredictionBase";

const PredictionView = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<HousePricePredictionForm>({
    resolver: zodResolver(housePricePredictionSchema),
    defaultValues: {},
  });

  const onSubmit: SubmitHandler<HousePricePredictionForm> = (data) => {
    console.log("Los datos a enviar: ", data);
  };

  const onError: SubmitErrorHandler<HousePricePredictionForm> = (errors) => {
    console.error("Errores de validación: ", errors);
    // TODO: Para enviar los datos al back, ahí si actualizo el valor que enviaré de los Select
  };

  return (
    <PredictionBase
      title="Predicción Simple"
      description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio
              quia cum voluptatem modi blanditiis voluptate ea itaque dolore?"
    >
      <form
        className="w-full bg-transparent px-10 flex flex-col items-center gap-6 sm:px-16 xl:px-24 2xl:px-36"
        onSubmit={handleSubmit(onSubmit, onError)}
      >
        <div className="w-full flex flex-col gap-4 mb-4 lg:flex-row lg:gap-12">
          <div className="w-full flex flex-col gap-4">
            <Input
              label="Área habitale sobre el suelo: "
              type="number"
              name="grLivArea"
              register={register}
              errors={errors}
            />
            {/* <Input
              label="Área del garaje: "
              type="number"
              name="garageArea"
              register={register}
              errors={errors}
            /> */}
            <Input
              label="Año de construcción: "
              type="number"
              name="yearBuilt"
              register={register}
              errors={errors}
            />
            <Input
              label="Área total del sótano: "
              type="number"
              name="totalBsmtSF"
              register={register}
              errors={errors}
            />
            {/* <Input
              label="Área del primer piso: "
              type="number"
              name="firstFlrSF"
              register={register}
              errors={errors}
            />
            <Input
              label="Área del segundo piso: "
              type="number"
              name="secondFlrSF"
              register={register}
              errors={errors}
            /> */}

            {/* <Input
              label="Año de última remodelación: "
              type="number"
              name="yearRemodAdd"
              register={register}
              errors={errors}
            /> */}
          </div>
          {/* Agregar los Controller */}
          <div className="w-full flex flex-col gap-4">
            <Input
              label="Número de autos en el garaje: "
              type="number"
              name="garageCars"
              register={register}
              errors={errors}
            />
            <Controller
              name="overallQual"
              control={control}
              render={({ field, fieldState }) => (
                <CustomSelect
                  label="Calidad general de la vivienda: "
                  name={field.name}
                  options={overallQualOptions}
                  placeholder=""
                  onChange={field.onChange}
                  value={field.value}
                  errorMessage={fieldState.error?.message}
                />
              )}
            />

            <Controller
              name="neighborhood"
              control={control}
              render={({ field, fieldState }) => (
                <CustomSelect
                  label="Barrio: "
                  name={field.name}
                  options={neighborhoodsOptions}
                  placeholder=""
                  onChange={field.onChange}
                  value={field.value}
                  errorMessage={fieldState.error?.message}
                />
              )}
            />

            {/* <Controller
              name="houseStyle"
              control={control}
              render={({ field, fieldState }) => (
                <CustomSelect
                  label="Estilo de la vivienda: "
                  name={field.name}
                  options={houseStyleOptions}
                  placeholder=""
                  onChange={field.onChange}
                  value={field.value}
                  errorMessage={fieldState.error?.message}
                />
              )}
            />

            <Controller
              name="exterQual"
              control={control}
              render={({ field, fieldState }) => (
                <CustomSelect
                  label="Calidad del material exterior: "
                  name={field.name}
                  options={exterQualOptions}
                  placeholder=""
                  onChange={field.onChange}
                  value={field.value}
                  errorMessage={fieldState.error?.message}
                />
              )}
            />

            <Controller
              name="kitchenQual"
              control={control}
              render={({ field, fieldState }) => (
                <CustomSelect
                  label="Calidad de la cocina: "
                  name={field.name}
                  options={kitchenQualOptions}
                  placeholder=""
                  onChange={field.onChange}
                  value={field.value}
                  errorMessage={fieldState.error?.message}
                />
              )}
            />

            <Controller
              name="bsmtQual"
              control={control}
              render={({ field, fieldState }) => (
                <CustomSelect
                  label="Calidad del sótano: "
                  name=""
                  options={bsmtQualOptions}
                  placeholder=""
                  onChange={field.onChange}
                  value={field.value}
                  errorMessage={fieldState.error?.message}
                />
              )}
            />

            <Controller
              name="garageFinish"
              control={control}
              render={({ field, fieldState }) => (
                <CustomSelect
                  label="Acabado del interior del garaje: "
                  name=""
                  options={garageFinishOptions}
                  placeholder=""
                  onChange={field.onChange}
                  value={field.value}
                  errorMessage={fieldState.error?.message}
                />
              )}
            /> */}
          </div>
        </div>

        <Button type="submit">Estimar precio</Button>
      </form>
    </PredictionBase>
  );
};

export default PredictionView;
