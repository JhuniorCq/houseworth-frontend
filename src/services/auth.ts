import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../libs/firebase";

export const registerUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log("Usuario registrado con éxito:", userCredential.user);
    return userCredential.user;
  } catch (error) {
    if (error instanceof Error) {
      console.error(
        "Ocurrió un error al registrar el usuario: ",
        error.message
      );
    } else {
      console.error(
        "Ocurrió un error al registrar el usuario: ",
        String(error)
      );
    }
    throw new Error("Error al registrar el usuario");
  }
};

export const loginUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    console.log("Usuario autenticado con éxito:", userCredential.user);
    return userCredential.user;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Ocurrió un error al iniciar sesión: ", error.message);
    } else {
      console.error("Ocurrió un error al iniciar sesión: ", String(error));
    }
    throw new Error("Error al iniciar sesión");
  }
};

export const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    if (error instanceof Error) {
      console.error("Ocurrió un error al cerrar sesión: ", error.message);
    } else {
      console.error("Ocurrió un error al cerrar sesión: ", String(error));
    }
    throw new Error("Error al cerrar sesión");
  }
};
