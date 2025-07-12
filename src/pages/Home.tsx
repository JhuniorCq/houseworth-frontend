import FuncionalityCard from "../components/FuncionalityCard";
import { useAuth } from "../context/AuthProvider";
import { LIST_OF_FEATURES } from "../utils/constants";

const Home = () => {
  const { firebaseUser, appUser, logout } = useAuth();
  return (
    <section className="min-h-screen px-8 py-12 bg-ghost-white">
      <div>
        <p>Estás en el Home, tu UID es: {firebaseUser?.uid}</p>
        <p>Hola: {appUser?.username ?? "Falta traer los datos del back"}</p>

        <button onClick={logout}>Cerrar sesión</button>
      </div>

      <div className="flex flex-col gap-10">
        <h1 className="text-center text-2xl font-semibold">HouseWorth</h1>

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
