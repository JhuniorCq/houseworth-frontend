import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../libs/firebase";
import { FirebaseError } from "firebase/app";

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

    return userCredential.user;
  } catch (error) {
    if (error instanceof FirebaseError) {
      if (error.code === "auth/email-already-in-use") {
        throw new Error("Este correo ya está registrado.");
      }

      if (error.code === "auth/invalid-email") {
        throw new Error("El correo no es válido.");
      }

      if (error.code === "auth/weak-password") {
        throw new Error(
          "La contraseña es muy débil. Usa al menos 6 caracteres."
        );
      }
    }

    throw new Error("Error al registrar el usuario.");
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
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    if (error instanceof FirebaseError) {
      if (error.code === "auth/user-not-found") {
        throw new Error("El usuario no está registrado.");
      }

      if (error.code === "auth/wrong-password") {
        throw new Error("La contraseña es incorrecta.");
      }

      if (error.code === "auth/invalid-email") {
        throw new Error("El correo no es válido.");
      }

      if (error.code === "auth/too-many-requests") {
        throw new Error(
          "Demasiados intentos fallidos. Intenta de nuevo más tarde."
        );
      }
    }

    throw new Error("Error al iniciar sesión.");
  }
};
