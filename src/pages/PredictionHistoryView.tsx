import { IoReloadOutline } from "react-icons/io5";
import Button from "../components/Button";
import { useGetAllPredictionsQuery } from "../slices/apiSlice";
import { isApiSuccessResponse } from "../utils/typeGuard";
import { FaFileExcel, FaHome } from "react-icons/fa";
import { MdAnalytics } from "react-icons/md";
import { searchNeighborhood } from "../utils/logic";
import { FaDownload, FaEye } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";
import type { PredictionResult } from "../types/prediction";
import Loader from "../components/Loader";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PDF from "../components/PDF";

const PredictionHistoryView = () => {
  const {
    data: predictionData,
    isLoading,
    isError,
  } = useGetAllPredictionsQuery({});
  const navigate = useNavigate();

  if (isLoading) {
    return <Loader />;
  }

  if (!isLoading && isError) {
    return (
      <p className="px-10 text-sm text-steel-gray-very-strong font-semibold text-center flex justify-center items-center">
        No se pudo obtener tus predicciones.
      </p>
    );
  }

  if (
    !isLoading &&
    !isError &&
    predictionData &&
    isApiSuccessResponse(predictionData)
  ) {
    const predictions = predictionData.data?.predictions;

    const back = () => {
      navigate(-1);
    };

    const goToPredictionDetails = ({
      id,
      prediction,
    }: {
      id: number;
      prediction: PredictionResult;
    }) => {
      navigate(`/prediction-results/${id}`, { state: prediction });
    };

    return (
      <section>
        {predictions && (
          <section className="h-full bg-ghost-white p-8 flex flex-col gap-5 md:px-8 lg:justify-center 2xl:px-36">
            <span
              className="text-earth-very-strong font-semibold bg-transparent cursor-pointer self-start flex items-center gap-2"
              onClick={back}
            >
              <IoIosArrowRoundBack className="text-xl" />
              <button className="text-[13px]">Volver</button>
            </span>

            <div className="w-full flex flex-col gap-2">
              <h1 className="text-2xl font-semibold text-earth-very-strong">
                Historial de predicciones
              </h1>
              <p className="text-sm">
                Revisa todas tus predicciones anteriores y sus resultados
              </p>
            </div>

            <div className="w-full grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
              <div className="px-5 py-5 border shadow-md rounded-md flex items-center gap-4 cursor-pointer">
                <MdAnalytics className="shrink-0 text-3xl text-earth-very-strong" />
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500">
                    Total predicciones
                  </span>
                  <span className="text-[22px] font-semibold">
                    {predictionData.data?.totalAmount}
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

            <div className="w-full border shadow-md rounded-md">
              <div className="p-6 flex flex-col items-center justify-between gap-3 sm:flex-row">
                <h2 className="text-lg font-semibold text-earth-very-strong text-center">
                  Historial de predicciones
                </h2>

                <div>
                  <Button
                    type="button"
                    styles="bg-earth-strong text-white text-xs px-3 py-2 rounded cursor-pointer transition-colors duration-300 ease-in-out hover:bg-earth-very-strong flex items-center gap-2"
                  >
                    <IoReloadOutline />
                    <span>Actualizar</span>
                  </Button>
                </div>
              </div>

              <div className="w-full max-h-96 px-6 pb-6 overflow-x-auto">
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
                        Simple / Múltiple
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
                      <tr key={p.id} className="text-center border-b">
                        <td className="px-4 py-2 text-gray-500 text-xs md:text-sm">
                          {p.predictionDate}
                        </td>
                        <td className="px-4 py-2 text-gray-500 text-xs md:text-sm">
                          {p.predictionTime}
                        </td>
                        <td className="px-4 py-2 text-gray-500 text-xs md:text-sm">
                          {p.excelId ? `Múltiple: N° ${p.excelId}` : "Simple"}
                        </td>
                        <td className="px-4 py-2 text-gray-500 text-xs md:text-sm">
                          {searchNeighborhood(p.neighborhood)}
                        </td>
                        <td className="px-4 py-2 text-gray-500 text-xs md:text-sm">
                          {p.yearBuilt}
                        </td>
                        <td className="px-4 py-2 text-gray-500 text-xs md:text-sm">
                          {p.price}
                        </td>
                        <td className="px-4 py-2 text-sm md:text-base">
                          <div className="flex justify-center items-center gap-5">
                            <FaEye
                              className="text-earth-strong transition-colors duration-300 ease-in-out hover:text-earth-very-strong cursor-pointer"
                              onClick={() =>
                                goToPredictionDetails({
                                  id: i + 1,
                                  prediction: p,
                                })
                              }
                              title="Ver detalles"
                            />
                            <PDFDownloadLink
                              document={<PDF predictions={[{ ...p }]} />}
                              fileName={`prediccion-${p.predictionDate}-${p.predictionTime}.pdf`}
                            >
                              {({ loading }) => (
                                <FaDownload
                                  className={`transition-colors duration-300 ease-in-out ${
                                    loading
                                      ? "text-earth-strong/50 cursor-not-allowed"
                                      : "text-earth-strong hover:text-earth-very-strong cursor-pointer"
                                  }`}
                                  title="Descargar PDF"
                                />
                              )}
                            </PDFDownloadLink>
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
  }
};

export default PredictionHistoryView;
