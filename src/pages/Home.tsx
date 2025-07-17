import { FaClock } from "react-icons/fa";
import FuncionalityCard from "../components/FuncionalityCard";
import { LIST_OF_FEATURES } from "../utils/constants";
import { MdAnalytics } from "react-icons/md";
import { useGetAllPredictionsQuery } from "../slices/apiSlice";
import { isApiSuccessResponse } from "../utils/typeGuard";
import Loader from "../components/Loader";
import { FaHouse, FaHotel } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { GrFormNextLink } from "react-icons/gr";

const Home = () => {
  const {
    data: predictionData,
    isLoading,
    isError,
  } = useGetAllPredictionsQuery({ limit: 3 });

  if (isLoading) {
    return <Loader />;
  }

  if (!isLoading && isError) {
    return (
      <p className="px-10 text-sm text-steel-gray-very-strong font-semibold text-center flex justify-center items-center">
        Lo sentimos. Ha ocurrido un problema inesperado.
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

    return (
      <section className="bg-ghost-white flex flex-col">
        <div className="px-12 py-14 flex flex-col gap-5 bg-earth-very-strong sm:px-16 sm:py-20 md:px-20 xl:px-28 2xl:px-40">
          <h1 className="text-white font-bold text-3xl lg:text-4xl">
            Predicción Inteligente de Precios
          </h1>
          <p className="text-white/80 text-sm sm:text-base">
            Utiliza nuestra tecnología avanzada para obtener predicciones
            precisas del valor de propiedades inmobiliarias
          </p>
          <div className="flex flex-col gap-2 text-sm sm:text-[15px] sm:flex-row sm:gap-6">
            <div className="text-white flex items-center gap-2">
              <MdAnalytics className="shrink-0 text-lg" />
              <span>Precisión del 95%</span>
            </div>
            <div className="text-white flex items-center gap-2">
              <FaClock className="shrink-0" />
              <span>Resultados instantáneos</span>
            </div>
          </div>
        </div>

        <div className="px-10 py-16 flex flex-col gap-12">
          <div className="flex flex-col items-center gap-4">
            <h2 className="text-center text-2xl text-earth-very-strong font-semibold xl:text-3xl">
              Nuestras Funcionalidades
            </h2>
            <p className="text-center text-sm text-gray-500 md:text-base">
              Explora las herramientas que tenemos disponibles para ayudarte a
              predecir precios de viviendas
            </p>
          </div>

          <ul className="w-full flex justify-center gap-6 flex-wrap">
            {LIST_OF_FEATURES.map((f) => (
              <FuncionalityCard
                key={f.id}
                id={f.id}
                icon={f.icon}
                name={f.name}
                description={f.description}
                characteristics={f.characteristics}
                buttonName={f.buttonName}
                redirecTo={f.redirectTo}
              />
            ))}
          </ul>
        </div>

        <div className="px-10 py-12 flex justify-evenly gap-12 bg-white flex-wrap sm:gap-16">
          <div className="flex flex-col gap-2 items-center">
            <span className="font-bold text-3xl text-earth-very-strong">
              1,250+
            </span>
            <span className="text-sm text-gray-500 font-semibold">
              Predicciones realizadas
            </span>
          </div>
          <div className="flex flex-col gap-2 items-center">
            <span className="font-bold text-3xl text-earth-very-strong">
              95%
            </span>
            <span className="text-sm text-gray-500 font-semibold">
              Precisión promedio
            </span>
          </div>
          <div className="flex flex-col gap-2 items-center">
            <span className="font-bold text-3xl text-earth-very-strong">
              24/7
            </span>
            <span className="text-sm text-gray-500 font-semibold">
              Disponibilidad
            </span>
          </div>
          <div className="flex flex-col gap-2 items-center">
            <span className="font-bold text-3xl text-earth-very-strong">
              &lt; 2s
            </span>
            <span className="text-sm text-gray-500 font-semibold">
              Tiempo de respuesta
            </span>
          </div>
        </div>

        <div className="px-10 py-16 bg-ghost-white flex justify-center items-center">
          <div className="w-[95%] bg-white p-8 rounded-lg shadow-md flex flex-col gap-6 sm:w-[90%] lg:w-[80%]">
            <h2 className="font-semibold">Actividad reciente</h2>

            <ul className="w-full flex flex-col gap-4">
              {predictions?.map((p) => (
                <li
                  key={p.id}
                  className="w-full p-5 bg-ghost-white rounded-lg flex flex-col items-center justify-between gap-2 sm:flex-row sm:gap-6"
                >
                  <div className="flex flex-col items-center gap-4 sm:flex-row">
                    <span className="bg-earth/50 w-10 h-10 flex justify-center items-center rounded-full">
                      {p.excelId ? (
                        <FaHotel className="shrink-0 text-earth-strong text-base" />
                      ) : (
                        <FaHouse className="shrink-0 text-earth-strong text-[17px]" />
                      )}
                    </span>
                    <div className="text-center flex flex-col gap-1 sm:text-left">
                      <span className="text-sm font-semibold text-earth-strong">
                        {p.excelId
                          ? `Predicción múltiple: N° ${p.excelId}`
                          : "Predicción simple"}
                      </span>
                      <span className="text-xs text-gray-500">
                        {p.predictionDate} {p.predictionTime}
                      </span>
                    </div>
                  </div>

                  <span className="text-sm text-earth-very-strong font-semibold">
                    $ {p.price}
                  </span>
                </li>
              ))}
            </ul>

            <Link
              to="/prediction-history"
              className="text-center text-gray-500 font-semibold flex items-center justify-center gap-2"
            >
              <span className="text-[13px] sm:text-sm">
                Ver todo el historial
              </span>{" "}
              <GrFormNextLink className="mt-[2px] text-[15px] sm:text-base" />
            </Link>
          </div>
        </div>
      </section>
    );
  }
};

export default Home;
