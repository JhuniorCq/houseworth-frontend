import {
  useForm,
  type SubmitErrorHandler,
  type SubmitHandler,
} from "react-hook-form";
import {
  registerSchema,
  type RegistrationForm,
} from "../schemas/registerSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import Input from "../components/Input";
import imageBackground from "/img/initialBgImage.jpeg";
import Button from "../components/Button";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationForm>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<RegistrationForm> = (data) => {};

  const onError: SubmitErrorHandler<RegistrationForm> = (errors) => {};

  return (
    <section className="w-full min-h-screen px-8 flex justify-center items-center relative after:content-[''] after:absolute after:inset-0 after:w-full after:h-full after:bg-black/60">
      <div className="relative z-50">
        <form
          className="w-[350px] flex flex-col gap-7 px-7 py-8 rounded-lg sm:px-0 sm:w-[400px] xl:gap-8 transition-all duration-300 ease-in-out"
          onSubmit={handleSubmit(onSubmit, onError)}
        >
          <h1 className="text-3xl font-bold text-center text-white xl:text-4xl xl:mb-4">
            Regístrate
          </h1>
          <Input
            name="username"
            placeholder="Ingresa tu nombre de usuario"
            inputStyles="w-full px-4 py-3 rounded-md bg-white/20 outline-none text-sm text-white placeholder:text-gray-300 xl:text-base"
            register={register}
            type="text"
            errors={errors}
          />

          <Input
            name="email"
            placeholder="Ingresa tu correo electrónico"
            inputStyles="w-full px-4 py-3 rounded-md bg-white/20 outline-none text-sm text-white placeholder:text-gray-300 xl:text-base"
            register={register}
            type="email"
            errors={errors}
          />

          <Input
            name="password"
            placeholder="Ingresa tu contraseña"
            inputStyles="w-full px-4 py-3 rounded-md bg-white/20 outline-none text-sm text-white placeholder:text-gray-300 xl:text-base"
            register={register}
            type="password"
            errors={errors}
          />

          <Button
            type="submit"
            styles="w-full transition-colors duration-300 ease-in-out bg-earth-strong/70 hover:bg-earth-very-strong/70 text-sm text-white px-4 py-3 rounded-full cursor-pointer font-semibold shadow-lg xl:text-base xl:mt-4"
          >
            Registrarse
          </Button>

          <div className="self-center text-center flex flex-col gap-2">
            <p className="text-sm text-white xl:text-base">
              ¿Ya tienes una cuenta?
            </p>
            <Link
              to="/login"
              className="text-sm underline transition-colors duration-300 ease-in-out text-earth hover:text-earth-strong cursor-pointer xl:text-base"
            >
              Inicia sesión aquí
            </Link>
          </div>
        </form>
      </div>
      <img
        className="absolute inset-0 w-full h-full object-cover"
        src={imageBackground}
      />
    </section>
  );
};

export default Register;
