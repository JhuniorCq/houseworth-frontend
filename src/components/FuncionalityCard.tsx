import { Link } from "react-router-dom";
import { FaCheck } from "react-icons/fa6";

type FuncionalityCardProps = {
  id: number;
  icon: React.ComponentType<{ className?: string }>; // Mejor forma de pasar un ícono, pero para usarlo pero usar -> props.icon
  name: string;
  description: string;
  characteristics: string[];
  buttonName: string;
  redirecTo: string;
};

const FuncionalityCard = ({
  id,
  name,
  description,
  characteristics,
  buttonName,
  redirecTo,
  ...props
}: FuncionalityCardProps) => {
  return (
    <li className="min-w-72 max-w-96 p-5 py-7 shadow bg-white flex flex-col items-center gap-4 rounded-lg">
      <span className="bg-earth/50 w-14 h-14 flex justify-center items-center rounded-full">
        <props.icon className="text-earth-strong text-2xl" />
      </span>

      <h2 className="text-center text-lg font-semibold">{name}</h2>

      <p className="text-center text-gray-700">{description}</p>

      <ul className="flex flex-col items-center mb-1">
        {characteristics &&
          characteristics.map((characteristic, i) => (
            <li
              key={i}
              className="flex items-center gap-2 text-center text-sm text-gray-500"
            >
              <FaCheck className="text-green-600" /> {characteristic}
            </li>
          ))}
      </ul>

      <Link
        to={redirecTo}
        className="bg-earth text-white text-sm font-semibold px-6 py-2.5 rounded cursor-pointer transition-colors duration-300 ease-in-out hover:bg-earth-strong sm:text-base"
      >
        {buttonName}
      </Link>
    </li>
  );
};

export default FuncionalityCard;
