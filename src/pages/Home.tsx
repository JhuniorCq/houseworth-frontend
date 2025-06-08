import Button from "../components/Button";
import Input from "../components/Input";

const Home = () => {
  return (
    <section className="w-full min-h-screen bg-gray-100 flex justify-center items-center md:px-16 md:py-12 lg:px-28 xl:px-36 2xl:px-44">
      <div className="w-full flex flex-col md:shadow md:rounded-3xl md:overflow-hidden">
        <div className="h-56 px-8 py-7 relative flex items-center after:content-[''] after:absolute after:inset-0 after:w-full after:h-full after:bg-black/50 after:z-40 md:h-60 lg-px-10">
          <div className="w-full relative flex flex-col gap-4 z-50">
            <h1 className="font-bold text-3xl text-center text-white">
              HouseWorth
            </h1>
            <p className="text-sm text-center text-white">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio
              quia cum voluptatem modi blanditiis voluptate ea itaque dolore?
            </p>
          </div>
          <img
            src="https://images.adsttc.com/media/images/65ae/d2e6/e32f/dc2f/927b/722b/newsletter/casa-lima-pietro-terlizzi-arquitetura_1.jpg?1705956085"
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        <form className="w-full bg-white px-10 py-8 flex flex-col items-center gap-8 sm:px-16 lg:gap-10 xl:px-24 2xl:px-36">
          <div className="w-full flex flex-col gap-4 lg:flex-row lg:gap-12">
            <div className="w-full flex flex-col gap-4">
              <Input label="Tamaño de lote: " type="text" name="" />
              <Input label="Año de construcción: " type="text" name="" />
              <Input label="N° de habitaciones: " type="text" name="" />
              <Input label="N° de baños: " type="text" name="" />
            </div>
            <div className="w-full flex flex-col gap-4">
              <Input label="Zona: " type="text" name="" />
              <Input label="Condiciòn y calidad: " type="text" name="" />
              <Input label="Superficie construida: " type="text" name="" />
              <Input label="Cochera: " type="text" name="" />
            </div>
          </div>

          <Button type="submit">Estimar precio</Button>
        </form>
      </div>
    </section>
  );
};

export default Home;
