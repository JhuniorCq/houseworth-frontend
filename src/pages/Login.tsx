import { zodResolver } from "@hookform/resolvers/zod";
import {
  useForm,
  type SubmitErrorHandler,
  type SubmitHandler,
} from "react-hook-form";
import { loginSchema, type LoginForm } from "../schemas/loginSchema";
import { Link } from "react-router-dom";
import imageBackground from "/img/initialBgImage.jpeg";
import Input from "../components/Input";
import Button from "../components/Button";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginForm> = (data) => {};

  const onError: SubmitErrorHandler<LoginForm> = (errors) => {};

  return (
    <section className="w-full min-h-screen px-8 flex justify-center items-center relative after:content-[''] after:absolute after:inset-0 after:w-full after:h-full after:bg-black/60">
      <div className="relative z-50">
        <form
          className="w-[350px] flex flex-col gap-7 px-7 py-8 rounded-lg sm:px-0 sm:w-[400px] xl:gap-8 transition-all duration-300 ease-in-out"
          onSubmit={handleSubmit(onSubmit, onError)}
        >
          <h1 className="text-3xl font-bold text-center text-white xl:text-4xl xl:mb-4">
            Inicia Sesión
          </h1>
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
            Iniciar Sesión
          </Button>

          <div className="self-center text-center flex flex-col gap-2">
            <p className="text-sm text-white xl:text-base">
              ¿No tienes una cuenta aún?
            </p>
            <Link
              to="/register"
              className="text-sm underline transition-colors duration-300 ease-in-out text-earth hover:text-earth-strong cursor-pointer xl:text-base"
            >
              Regístrate aquí
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

export default Login;
