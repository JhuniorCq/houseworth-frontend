import { useAuth } from "../context/AuthProvider";

const Home = () => {
  const { firebaseUser, appUser, logout } = useAuth();
  return (
    <section>
      <p>Estás en el Home, tu UID es: {firebaseUser?.uid}</p>
      <p>Hola: {appUser?.username}</p>

      <button onClick={logout}>Cerrar sesión</button>
    </section>
  );
};

export default Home;
