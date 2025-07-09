import { FaCircleInfo } from "react-icons/fa6";
import { GoAlertFill } from "react-icons/go";
import PredictionBase from "../components/PredictionBase";
import ExcelForm from "../components/ExcelForm";

const MultiplePredictionView = () => {
  return (
    <PredictionBase
      title="Predicción Múltiple"
      description="Sube un archivo Excel con múltiples propiedades para obtener predicciones de precios en lote"
    >
      <div className="px-10">
        <div className="flex flex-col gap-5">
          <div className="w-full flex flex-col gap-2">
            <div className="flex gap-3">
              <FaCircleInfo className="shrink-0 mt-1 text-earth-very-strong cursor-pointer" />
              <div className="w-full flex flex-col gap-2">
                <h2 className="text-earth-very-strong font-semibold">
                  Instrucciones para el archivo Excel
                </h2>
                <p className="text-gray-500 text-sm">
                  Tu archivo Excel debe contener las siguientes columnas con
                  estos nombres exactos:
                </p>
              </div>
            </div>

            <ul className="w-fit mt-4 p-4 rounded-md shadow-md text-sm self-center flex flex-col gap-3 md:flex-row md:gap-6 lg:gap-10 xl:gap-20">
              <div className="flex flex-col gap-3 md:gap-4">
                <li>
                  <span className="bg-gray-300 px-1.5 pb-0.5 rounded text-steel-gray">
                    grLivArea
                  </span>{" "}
                  <span className="font-semibold text-steel-gray">
                    - Área habitable sobre el suelo (ft²)
                  </span>
                </li>
                <li>
                  <span className="bg-gray-300 px-1.5 pb-0.5 rounded text-steel-gray">
                    totalBsmtSF
                  </span>{" "}
                  <span className="font-semibold text-steel-gray">
                    - Área total del sótano (ft²)
                  </span>
                </li>
                <li>
                  <span className="bg-gray-300 px-1.5 pb-0.5 rounded text-steel-gray">
                    yearBuilt
                  </span>{" "}
                  <span className="font-semibold text-steel-gray">
                    - Año de construcción
                  </span>
                </li>
              </div>
              <div className="flex flex-col gap-3 md:gap-4">
                <li>
                  <span className="bg-gray-300 px-1.5 pb-0.5 rounded text-steel-gray">
                    garageCars
                  </span>{" "}
                  <span className="font-semibold text-steel-gray">
                    - Número de autos en el garaje
                  </span>
                </li>
                <li>
                  <span className="bg-gray-300 px-1.5 pb-0.5 rounded text-steel-gray">
                    overallQual
                  </span>{" "}
                  <span className="font-semibold text-steel-gray">
                    - Calidad general de la vivienda
                  </span>
                </li>
                <li>
                  <span className="bg-gray-300 px-1.5 pb-0.5 rounded text-steel-gray">
                    neighborhood
                  </span>{" "}
                  <span className="font-semibold text-steel-gray">
                    - Barrio
                  </span>
                </li>
              </div>
            </ul>

            <div className="mt-5 border border-yellow-200 bg-yellow-100 p-3 rounded-lg shadow self-center flex flex-col items-center gap-2 min-[420px]:flex-row">
              <GoAlertFill className="text-yellow-600 shrink-0" />
              <p className="text-sm text-center min-[420px]:text-left">
                <span className="font-semibold text-earth-very-strong">
                  Importante:{" "}
                </span>
                <span className="text-gray-700">
                  Los nombres de las columnas deben coincidir exactamente.
                  Asegúrate de que no haya espacios adicionales.
                </span>
              </p>
            </div>
          </div>

          {/* Contenedor para subir el excel */}
          <ExcelForm />
        </div>
        <form></form>
      </div>
    </PredictionBase>
  );
};

export default MultiplePredictionView;
