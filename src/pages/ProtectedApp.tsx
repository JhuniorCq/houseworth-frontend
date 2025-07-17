import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const ProtectedApp = () => {
  return (
    <section className="grid min-h-[100dvh] grid-cols-1 grid-rows-[auto_1fr_auto]">
      <Header />
      <Outlet />
      <Footer />
    </section>
  );
};

export default ProtectedApp;
