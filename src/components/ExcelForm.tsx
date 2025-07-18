import { useForm, type SubmitHandler } from "react-hook-form";
import {
  multipleHomePricePrediction,
  type MultipleHomePricePrediction,
} from "../schemas/predictionSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import ExcelField from "./ExcelField";
import { usePerformMultiplePredictionMutation } from "../slices/apiSlice";
import { showToast } from "../utils/sweetAlert";
import { MdAnalytics } from "react-icons/md";
import { isApiSuccessResponse } from "../utils/typeGuard";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

const ExcelForm = () => {
  const {
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<MultipleHomePricePrediction>({
    resolver: zodResolver(multipleHomePricePrediction),
  });
  const [makePredictions, { isLoading }] =
    usePerformMultiplePredictionMutation();
  const navigate = useNavigate();

  const handleMakePredictions = async (excelFile: File) => {
    try {
      const result = await makePredictions(excelFile).unwrap();

      if (!isApiSuccessResponse(result)) return;

      const excelId = result.data?.[0].excelId;

      showToast({
        title: result.message,
        icon: "success",
      });

      // Resetear el formulario
      reset();
      // Navegar a la vista de resultados
      navigate(`/multiple-prediction-results/${excelId}`, {
        state: {
          predictions: result.data,
          excelName: excelFile.name,
        },
      });
    } catch (error) {
      console.error("No se pudieron realizar las predicciones: ", error);

      showToast({
        title: "No se pudieron realizar las predicciones.",
        icon: "error",
      });
    }
  };

  const onSubmit: SubmitHandler<MultipleHomePricePrediction> = (data) => {
    handleMakePredictions(data.excelFile);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
      <ExcelField setValue={setValue} errors={errors} />

      <Button
        type="submit"
        styles="w-fit px-4 py-3 rounded-md text-white text-sm bg-earth-strong transition-colors duration-300 ease-in-out hover:bg-earth-very-strong flex items-center gap-2 self-center disabled:cursor-not-allowed"
        disabled={isLoading}
      >
        <MdAnalytics className="shrink-0 xl:text-base" />
        <span>{isLoading ? "Generando ..." : "Generar predicciones"}</span>
      </Button>
    </form>
  );
};

export default ExcelForm;
