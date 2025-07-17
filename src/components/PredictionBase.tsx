import type { ReactNode } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

type PredictionBase = {
  children: ReactNode;
  title: string;
  description: string;
};

const PredictionBase = ({ children, title, description }: PredictionBase) => {
  const navigate = useNavigate();

  const returnToHome = () => {
    navigate("/home");
  };

  return (
    <section className="w-full bg-ghost-white flex justify-center items-center md:px-16 md:py-12 lg:px-28 xl:px-36 2xl:px-44">
      <div className="w-full flex flex-col md:shadow-md md:rounded-3xl md:overflow-hidden">
        <div className="h-56 px-8 py-7 relative flex items-center after:content-[''] after:absolute after:inset-0 after:w-full after:h-full after:bg-black/50 md:h-60 lg-px-10">
          <div className="w-full relative flex flex-col gap-4 z-10">
            <h1 className="font-bold text-3xl text-center text-white">
              {title}
            </h1>
            <p className="text-sm text-center text-white">{description}</p>
          </div>
          <img
            src="https://images.adsttc.com/media/images/65ae/d2e6/e32f/dc2f/927b/722b/newsletter/casa-lima-pietro-terlizzi-arquitetura_1.jpg?1705956085"
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
        <div className="bg-white py-8 flex flex-col gap-6">
          <span
            className="px-10 text-earth-very-strong font-semibold bg-transparent cursor-pointer self-start flex items-center gap-2"
            onClick={returnToHome}
          >
            <IoIosArrowRoundBack className="text-xl" />
            <button className="text-[13px]">Volver</button>
          </span>

          {children}
        </div>
      </div>
    </section>
  );
};

export default PredictionBase;
