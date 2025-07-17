import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaHouse } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-earth-strong px-8 sm:px-12 md:px-16">
      <div className="py-7 border-b border-b-earth flex flex-col items-center gap-4">
        <div className="flex items-center gap-2 cursor-pointer text-center text-lg">
          <FaHouse className="shrink-0 text-ghost-white" />
          <span className="font-semibold text-ghost-white">HouseWorth</span>
        </div>
        <p className="text-center text-sm text-ghost-white">
          Predicción inteligente de precios inmobiliarios con tecnología
          avanzada.
        </p>
        <div className="flex items-center gap-4 text-ghost-white text-xl">
          <a
            href="https://www.linkedin.com/in/holiver-ccora-quispe-0a0642258/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://github.com/JhuniorCq"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub />
          </a>
        </div>
      </div>
      <div>
        <p className="py-8 text-sm text-center text-ghost-white">
          © 2024 PredictHome. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
