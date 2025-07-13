import FuncionalityCard from "../components/FuncionalityCard";
import { useAuth } from "../context/AuthProvider";
import { LIST_OF_FEATURES } from "../utils/constants";

const Home = () => {
  const { /*appUser,*/ logout } = useAuth();
  return (
    <section className="min-h-screen px-8 py-12 bg-ghost-white flex flex-col gap-16">
      <div className="flex items-center justify-end gap-3">
        {/* <p className="text-sm">
          Bienvenido,{" "}
          <span className="text-earth-strong font-semibold">
            {appUser?.username}
          </span>
        </p> */}

        <button
          className="bg-earth text-white text-sm px-4 py-2 rounded cursor-pointer transition-colors duration-300 ease-in-out hover:bg-earth-strong"
          onClick={logout}
        >
          Cerrar sesión
        </button>
      </div>

      <div className="self-center flex flex-col gap-10">
        <h1 className="text-center text-2xl text-earth-very-strong font-semibold xl:text-3xl">
          HouseWorth
        </h1>

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
    </section>
  );
};

export default Home;
