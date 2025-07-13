import { IoReloadOutline } from "react-icons/io5";
import Button from "../components/Button";
import { useGetAllPredictionsQuery } from "../slices/apiSlice";
import { isApiSuccessResponse } from "../utils/typeGuard";
import { FaFileExcel, FaHome } from "react-icons/fa";
import { MdAnalytics } from "react-icons/md";
import { searchNeighborhood } from "../utils/logic";
import { FaDownload, FaEye } from "react-icons/fa6";

const PredictionHistoryView = () => {
  const {
    data: predictionData,
    isLoading,
    isError,
  } = useGetAllPredictionsQuery();

  if (!predictionData || !isApiSuccessResponse(predictionData)) return;

  const predictions = predictionData.data?.predictions;

  return (
    <section>
      {isLoading && <p>Cargando predicciones ...</p>}

      {!isLoading && isError && <p>No se pudo obtener tus predicciones.</p>}

      {!isLoading && !isError && predictions && (
        // <pre>{JSON.stringify(predictions, null, 2)}</pre>
        <section className="min-h-screen bg-ghost-white p-8 flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-semibold text-earth-very-strong">
              Historial de predicciones
            </h1>
            <p className="text-sm">
              Revisa todas tus predicciones anteriores y sus resultados
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
            <div className="px-5 py-5 border shadow-md rounded-md flex items-center gap-4 cursor-pointer">
              <MdAnalytics className="shrink-0 text-3xl text-earth-very-strong" />
              <div className="flex flex-col">
                <span className="text-sm text-gray-500">
                  Total predicciones
                </span>
                <span className="text-[22px] font-semibold">
                  {predictions.length}
                </span>
              </div>
            </div>
            <div className="px-5 py-5 border shadow-md rounded-md flex items-center gap-4 cursor-pointer">
              <FaHome className="shrink-0 text-3xl text-earth-very-strong" />
              <div className="flex flex-col">
                <span className="text-sm text-gray-500">
                  Predicciones simples
                </span>
                <span className="text-[22px] font-semibold">
                  {predictionData.data?.simpleAmount}
                </span>
              </div>
            </div>
            <div className="px-5  py-5 border shadow-md rounded-md flex items-center gap-4 cursor-pointer">
              <FaFileExcel className="shrink-0 text-3xl text-earth-very-strong" />
              <div className="flex flex-col">
                <span className="text-sm text-gray-500">
                  Predicciones múltiples
                </span>
                <span className="text-[22px] font-semibold">
                  {predictionData.data?.multipleAmount}
                </span>
              </div>
            </div>
          </div>

          <div className="border shadow-md rounded-md">
            <div className="p-6 flex flex-col items-center justify-between gap-3 sm:flex-row">
              <h2 className="text-lg font-semibold text-earth-very-strong text-center">
                Historial de predicciones
              </h2>

              <div>
                {/* <Button type="button">
                  <span>Exportar</span>
                </Button> */}
                <Button
                  type="button"
                  styles="bg-earth-strong text-white text-xs px-3 py-2 rounded cursor-pointer transition-colors duration-300 ease-in-out hover:bg-earth-very-strong flex items-center gap-2"
                >
                  <IoReloadOutline />
                  <span>Actualizar</span>
                </Button>
              </div>
            </div>

            <div className="max-h-96 px-6 overflow-x-auto">
              <table className="w-full table-auto border-collapse border">
                <thead>
                  <tr className="bg-gray-200 text-sm">
                    <th className="px-4 py-2 font-semibold min-w-44 text-earth-very-strong">
                      Fecha
                    </th>
                    <th className="px-4 py-2 font-semibold min-w-44 text-earth-very-strong">
                      Hora
                    </th>
                    <th className="px-4 py-2 font-semibold min-w-44 text-earth-very-strong">
                      Barrio
                    </th>
                    <th className="px-4 py-2 font-semibold min-w-44 text-earth-very-strong">
                      Año de construcción
                    </th>
                    <th className="px-4 py-2 font-semibold min-w-44 text-earth-very-strong">
                      Precio predicho
                    </th>
                    <th className="px-4 py-2 font-semibold min-w-44 text-earth-very-strong">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {predictions.map((p, i) => (
                    <tr
                      key={i}
                      className="text-center text-xs border-b md:text-base"
                    >
                      <td className="px-4 py-2 text-gray-500">
                        {p.predictionDate}
                      </td>
                      <td className="px-4 py-2 text-gray-500">
                        {p.predictionTime}
                      </td>
                      <td className="px-4 py-2 text-gray-500">
                        {searchNeighborhood(p.neighborhood)}
                      </td>
                      <td className="px-4 py-2 text-gray-500">{p.yearBuilt}</td>
                      <td className="px-4 py-2 text-gray-500">{p.price}</td>
                      <td className="px-4 py-2">
                        <div className="flex justify-center items-center gap-2">
                          <FaEye className="text-earth-strong transition-colors duration-300 ease-in-out hover:text-earth-very-strong cursor-pointer" />
                          <FaDownload className="text-earth-strong transition-colors duration-300 ease-in-out hover:text-earth-very-strong cursor-pointer" />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}
    </section>
  );
};

export default PredictionHistoryView;
