import { Navigate, useLocation, useNavigate } from "react-router-dom";
import type { PredictionResult } from "../types/prediction";
import { IoIosArrowRoundBack, IoMdPricetags } from "react-icons/io";
import Button from "../components/Button";
import {
  FaDownload,
  FaEye,
  FaFileExcel,
  FaFilePdf,
  FaFileDownload,
  FaHome,
} from "react-icons/fa";
import { averagePrice, searchNeighborhood } from "../utils/logic";
import { pdf, PDFDownloadLink } from "@react-pdf/renderer";
import PDF from "../components/PDF";

const MultiplePredictionResults = () => {
  const navigate = useNavigate();
  const {
    state: { predictions, excelName },
  }: { state: { predictions: PredictionResult[]; excelName: string } } =
    useLocation();

  if (!predictions) return <Navigate to="/multiple-prediction" />;

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

  const handleViewingPDF = async () => {
    const blob = await pdf(<PDF predictions={[...predictions]} />).toBlob();
    const blobUrl = URL.createObjectURL(blob);
    window.open(blobUrl, "_blank");
  };

  return (
    <section className="bg-ghost-white px-8 pt-8 pb-12 flex flex-col gap-5 sm:pt-12 sm:pb-16 md:px-16 lg:justify-center lg:px-20 lg:pt-20 lg:pb-28 2xl:px-36">
      <span className="text-earth-very-strong font-semibold bg-transparent cursor-pointer self-start flex items-center gap-2">
        <IoIosArrowRoundBack className="text-xl" />
        <button className="text-[13px]" onClick={back}>
          Volver
        </button>
      </span>

      <div className="w-full flex flex-col gap-2">
        <h1 className="text-2xl font-semibold text-earth-very-strong">
          Resultados de la predicción múltiple
        </h1>
        <p className="text-sm">
          Análisis completo de las predicciones de precios de sus viviendas
        </p>
      </div>

      <div className="w-full grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <div className="px-5 py-5 border shadow-md rounded-md flex flex-col gap-2 cursor-pointer">
          <div className="flex items-center gap-2">
            <FaFileExcel className="shrink-0 text-sm text-earth-very-strong" />
            <span className="text-sm text-earth-very-strong font-semibold">
              Archivo procesado
            </span>
          </div>
          <p className="text-sm">{excelName}</p>
        </div>
        <div className="px-5 py-5 border shadow-md rounded-md flex flex-col gap-2 cursor-pointer">
          <div className="flex items-center gap-2">
            <FaHome className="shrink-0 text-sm text-earth-very-strong" />
            <span className="text-sm text-earth-very-strong font-semibold">
              Total viviendas
            </span>
          </div>
          <p className="text-sm">{predictions.length}</p>
        </div>
        <div className="px-5 py-5 border shadow-md rounded-md flex flex-col gap-2 cursor-pointer">
          <div className="flex items-center gap-2">
            <IoMdPricetags className="shrink-0 text-sm text-earth-very-strong" />
            <span className="text-sm text-earth-very-strong font-semibold">
              Precio promedio
            </span>
          </div>
          <p className="text-sm">$ {averagePrice(predictions)}</p>
        </div>
        <div className="px-5 py-5 border shadow-md rounded-md flex flex-col gap-2 cursor-pointer">
          <div className="flex items-center gap-2">
            <FaFileExcel className="shrink-0 text-sm text-earth-very-strong" />
            <span className="text-sm text-earth-very-strong font-semibold">
              Procesado
            </span>
          </div>
          <p className="text-sm">{predictions[0].predictionDate}</p>
        </div>
      </div>

      <div className="w-full border shadow-md rounded-md">
        <div className="p-6 flex flex-col items-center justify-between gap-3 sm:flex-row">
          <h2 className="text-lg font-semibold text-earth-very-strong text-center">
            Resultados de las predicciones
          </h2>

          <div className="flex items-center gap-2">
            <Button
              type="button"
              styles="bg-earth-strong text-white text-xs px-3 py-2 rounded cursor-pointer transition-colors duration-300 ease-in-out hover:bg-earth-very-strong flex items-center gap-2"
              onClick={handleViewingPDF}
            >
              <FaFilePdf />
              <span>Visualizar PDF</span>
            </Button>

            <PDFDownloadLink
              document={<PDF predictions={[...predictions]} />}
              fileName={`prediccion-${predictions[0].predictionDate}-${predictions[0].predictionTime}.pdf`}
            >
              {({ loading }) => (
                <Button
                  type="button"
                  styles={`text-white text-xs px-3 py-2 rounded transition-colors duration-300 ease-in-out flex items-center gap-2 ${
                    loading
                      ? "bg-earth-strong/50 cursor-not-allowed"
                      : "bg-earth-strong hover:bg-earth-very-strong cursor-pointer"
                  }`}
                >
                  <FaFileDownload />
                  <span>Descargar PDF</span>
                </Button>
              )}
            </PDFDownloadLink>
          </div>
        </div>

        <div className="max-h-96 px-6 pb-6 overflow-x-auto">
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
                <tr key={i} className="text-center border-b">
                  <td className="px-4 py-2 text-gray-500 text-xs md:text-sm">
                    {p.predictionDate}
                  </td>
                  <td className="px-4 py-2 text-gray-500 text-xs md:text-sm">
                    {p.predictionTime}
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
  );
};

export default MultiplePredictionResults;
