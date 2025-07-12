import { useGetAllPredictionsQuery } from "../slices/apiSlice";
import { isApiSuccessResponse } from "../utils/typeGuard";

const PredictionHistoryView = () => {
  const {
    data: predictionData,
    isLoading,
    isError,
  } = useGetAllPredictionsQuery();

  if (!predictionData || !isApiSuccessResponse(predictionData)) return;

  const predictions = predictionData.data;

  return (
    <section>
      {isLoading && <p>Cargando predicciones ...</p>}

      {!isLoading && isError && <p>No se pudo obtener tus predicciones.</p>}

      {!isLoading && !isError && (
        <pre>{JSON.stringify(predictions, null, 2)}</pre>
      )}
    </section>
  );
};

export default PredictionHistoryView;
