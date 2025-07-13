import { FaCheckCircle, FaFileExcel, FaFilePdf, FaHome } from "react-icons/fa";
import { MdFileUpload } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { GrHistory } from "react-icons/gr";
import { Link, Navigate, useLocation } from "react-router-dom";
import Button from "../components/Button";
import type { PredictionResult } from "../types/prediction";
import { searchNeighborhood, searchOverallQual } from "../utils/logic";

const PredictionDetails = () => {
  const { state: predictionData }: { state: PredictionResult } = useLocation();

  if (!predictionData) return <Navigate to="/prediction" />;

  const overallQual = searchOverallQual(predictionData.overallQual);
  const neighborhood = searchNeighborhood(predictionData.neighborhood);

  return (
    <section className="min-h-screen p-8 bg-ghost-white flex flex-col gap-5 min-[520px]:px-18 sm:px-24 md:px-28 lg:justify-center xl:px-44 2xl:px-60">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold text-earth-very-strong">
          Resultado de la Predicción
        </h1>
        <p className="text-sm">
          Análisis completo de la predicción de precio para su vivienda.
        </p>
      </div>

      <div className="flex flex-col gap-5 lg:flex-row lg:items-start">
        <div className="flex flex-col gap-5 lg:grow-[2]">
          <div className="p-4 shadow-md rounded-md border flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-earth-very-strong">
                Precio predicho
              </h2>
              <p className="flex items-center gap-2">
                <FaCheckCircle className="text-xs shrink-0" />
                <span className="text-sm">Predicción exitosa</span>
              </p>
            </div>

            <div className="flex flex-col text-center gap-2">
              <p className="text-2xl font-semibold">$ {predictionData.price}</p>
              <p className="text-xs text-center text-gray-500">
                Precio estimado de la vivienda
              </p>
            </div>

            <div className="flex flex-col gap-3 md:flex-row">
              <Button
                type="button"
                styles="bg-earth-strong text-white text-sm px-6 py-2.5 rounded cursor-pointer transition-colors duration-300 ease-in-out hover:bg-earth-very-strong flex items-center justify-center gap-2 md:grow"
              >
                <MdFileUpload className="text-[19px] shrink-0" />
                <span>Descargar PDF del reporte</span>
              </Button>
              <Button
                type="button"
                styles="bg-earth-strong text-white text-sm px-6 py-2.5 rounded cursor-pointer transition-colors duration-300 ease-in-out hover:bg-earth-very-strong flex items-center justify-center gap-2  md:grow"
              >
                <FaFilePdf className="text-[13.5px] shrink-0" />
                <span>Visualizar PDF del reporte</span>
              </Button>
            </div>
          </div>

          <div className="p-4 shadow-md rounded-md border flex flex-col gap-4">
            <h2 className="text-sm font-semibold text-earth-very-strong">
              Detalles de la propiedad
            </h2>

            <ul className="flex flex-col gap-3 text-sm md:flex-row md:gap-5">
              <div className="flex flex-col gap-3 md:grow">
                <li className="pb-2 border-b border-gray-100 flex items-center justify-between gap-3">
                  <span>Área habitable (ft²)</span>
                  <span className="font-semibold text-earth-very-strong">
                    {predictionData.grLivArea}
                  </span>
                </li>
                <li className="pb-2 border-b border-gray-100 flex items-center justify-between gap-3">
                  <span>Capacidad del garaje</span>
                  <span className="font-semibold text-earth-very-strong">
                    {predictionData.garageCars}
                  </span>
                </li>
                <li className="pb-2 border-b border-gray-100 flex items-center justify-between gap-3">
                  <span>Área del sótano (ft²)</span>
                  <span className="font-semibold text-earth-very-strong">
                    {predictionData.totalBsmtSF}
                  </span>
                </li>
                <li className="pb-2 border-b border-gray-100 flex items-center justify-between gap-3">
                  <span>Año de construcción</span>
                  <span className="font-semibold text-earth-very-strong">
                    {predictionData.yearBuilt}
                  </span>
                </li>
                <li className="pb-2 border-b border-gray-100 flex items-center justify-between gap-3 md:pb-0 md:border-b-0">
                  <span>Calidad de la construcción</span>
                  <span className="font-semibold text-earth-very-strong">
                    {overallQual}
                  </span>
                </li>
              </div>

              <div className="flex flex-col gap-3 md:grow">
                <li className="pb-2 border-b border-gray-100 flex items-center justify-between gap-3">
                  <span>Vecindario</span>
                  <span className="font-semibold text-earth-very-strong">
                    {neighborhood}
                  </span>
                </li>
                <li className="pb-2 border-b border-gray-100 flex items-center justify-between gap-3">
                  <span>¿Es moderna?</span>
                  <span className="font-semibold text-earth-very-strong">
                    {predictionData.isModern ? "Sí" : "No"}
                  </span>
                </li>
                <li className="pb-2 border-b border-gray-100 flex items-center justify-between gap-3">
                  <span>¿Es lujosa?</span>
                  <span className="font-semibold text-earth-very-strong">
                    {predictionData.isLuxury ? "Sí" : "No"}
                  </span>
                </li>
                <li className="pb-2 border-b border-gray-100 flex items-center justify-between gap-3">
                  <span>Fecha de predicción</span>
                  <span className="font-semibold text-earth-very-strong">
                    {predictionData.predictionDate}
                  </span>
                </li>
                <li className="border-gray-100 flex items-center justify-between gap-3">
                  <span>Hora de predicción</span>
                  <span className="font-semibold text-earth-very-strong">
                    {predictionData.predictionTime}
                  </span>
                </li>
              </div>
            </ul>
          </div>
        </div>

        <div className="p-4 shadow-md rounded-md border flex flex-col gap-4 lg:grow-[1]">
          <h2 className="text-sm font-semibold text-earth-very-strong">
            Acciones rápidas
          </h2>

          <ul className="text-sm flex flex-col gap-3">
            <li className="transition-colors duration-300 ease-in-out hover:bg-gray-100 rounded-md">
              <Link
                to="/prediction"
                className="p-3 border rounded-md flex items-center gap-2"
              >
                <IoMdAdd className="text-earth-very-strong" />
                <span>Nueva predicción</span>
              </Link>
            </li>
            <li className="transition-colors duration-300 ease-in-out hover:bg-gray-100 rounded-md">
              <Link
                to="/multiple-prediction"
                className="p-3 border rounded-md flex items-center gap-2"
              >
                <FaFileExcel className="text-earth-very-strong" />
                <span>Predicción múltiple</span>
              </Link>
            </li>
            <li className="transition-colors duration-300 ease-in-out hover:bg-gray-100 rounded-md">
              <Link
                to="/prediction-history"
                className="p-3 border rounded-md flex items-center gap-2"
              >
                <GrHistory className="text-earth-very-strong" />
                <span>Ver historial</span>
              </Link>
            </li>
            <li className="transition-colors duration-300 ease-in-out hover:bg-gray-100 rounded-md">
              <Link
                to="/home"
                className="p-3 border rounded-md flex items-center gap-2"
              >
                <FaHome className="text-earth-very-strong" />
                <span>Volver al inicio</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      {/* <pre>{JSON.stringify(predictionData, null, 2)}</pre> */}
    </section>
  );
};

export default PredictionDetails;
