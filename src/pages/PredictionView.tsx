import { Controller, useForm, type SubmitHandler } from "react-hook-form";
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
import { useMakePredictionMutation } from "../slices/apiSlice";
import type { HouseData } from "../types/prediction";
import { showToast } from "../utils/sweetAlert";
import { useNavigate } from "react-router-dom";
import { isApiSuccessResponse } from "../utils/typeGuard";

const PredictionView = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<HousePricePredictionForm>({
    resolver: zodResolver(housePricePredictionSchema),
  });
  const [makePrediction, { isLoading }] = useMakePredictionMutation();

  const navigate = useNavigate();

  const handleMakePrediction = async (houseData: HouseData) => {
    try {
      const result = await makePrediction(houseData).unwrap();

      if (!isApiSuccessResponse(result)) return;

      showToast({
        title: result.message,
        icon: "success",
      });

      // Resetear el formulario
      reset();

      // Navegar a la vista de resultados
      navigate("/prediction-results/0", { state: result.data });
    } catch (error) {
      console.error("No se pudo realizar la predicción: ", error);

      showToast({
        title: "No se pudo realizar la predicción.",
        icon: "error",
      });
    }
  };

  const onSubmit: SubmitHandler<HousePricePredictionForm> = (data) => {
    const body: HouseData = {
      ...data,
      overallQual: data.overallQual.value,
      neighborhood: data.neighborhood.value,
    };

    handleMakePrediction(body);
  };

  return (
    <PredictionBase
      title="Predicción Simple"
      description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio
              quia cum voluptatem modi blanditiis voluptate ea itaque dolore?"
    >
      <form
        className="w-full bg-transparent px-10 flex flex-col items-center gap-6 sm:px-16 xl:px-24 2xl:px-36"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="w-full flex flex-col gap-4 mb-4 lg:flex-row lg:gap-12">
          <div className="w-full flex flex-col gap-4">
            <Input
              label="Área habitale sobre el suelo (ft²) "
              type="number"
              name="grLivArea"
              register={register}
              errors={errors}
            />
            <Input
              label="Año de construcción "
              type="number"
              name="yearBuilt"
              register={register}
              errors={errors}
            />
            <Input
              label="Área total del sótano (ft²) "
              type="number"
              name="totalBsmtSF"
              register={register}
              errors={errors}
            />
          </div>

          <div className="w-full flex flex-col gap-4">
            <Input
              label="Número de autos en el garaje "
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
                  label="Calidad general de la vivienda "
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
                  label="Barrio "
                  name={field.name}
                  options={neighborhoodsOptions}
                  placeholder=""
                  onChange={field.onChange}
                  value={field.value}
                  errorMessage={fieldState.error?.message}
                />
              )}
            />
          </div>
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          styles="bg-earth text-white text-sm px-6 py-2.5 rounded cursor-pointer transition-colors duration-300 ease-in-out hover:bg-earth-strong disabled:cursor-not-allowed"
        >
          {isLoading ? "Espere porfavor ..." : "Estimar precio"}
        </Button>
      </form>
    </PredictionBase>
  );
};

export default PredictionView;
