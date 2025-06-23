import { onAuthStateChanged, signOut, type User } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../libs/firebase";
import { FirebaseError } from "firebase/app";
import type { AppUser } from "../types/user";
import type { StatusType } from "../types/status";

type AuthContextType = {
  firebaseUser: User | null;
  getIdToken: () => Promise<string | null>;
  logout: () => Promise<void>;
  appUser: AppUser | null;
  setAppUser: React.Dispatch<React.SetStateAction<AppUser | null>>;
  status: StatusType;
};

const AuthContext = createContext<AuthContextType>({
  firebaseUser: null,
  getIdToken: async () => null,
  logout: async () => {},
  appUser: null, // Esto es para los datos del usuario que devuelva el backend
  setAppUser: () => {}, // Esto es por si se desea actualizar los datos del usuario
  status: { loading: true },
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
  const [appUser, setAppUser] = useState<AppUser | null>(null);
  const [status, setStatus] = useState<StatusType>({
    loading: true,
  });

  // Obtener el ID Token actual para enviar al backend
  const getIdToken = async () => {
    if (!firebaseUser) return null;

    return await firebaseUser.getIdToken();
  };

  // Cerrar sesión (Firebase borra sesión de IndexedDB)
  const logout = async () => {
    try {
      await signOut(auth); // Aviso a Firebase para que cierre la sesión de este usuario -> Y Firebase cerrará la sesión y borrará la sesión que persistía en IndexedDB
      setFirebaseUser(null);
      setAppUser(null);

      console.log("Sesión cerrada con éxito.");
    } catch (error) {
      if (error instanceof FirebaseError) {
        throw new Error("Error al cerrar sesión. Intenta nuevamente.");
      }

      throw new Error("Ocurrió un error al cerrar sesión.");
    }
  };

  // useEffect que se activa cuando cambia el "Usuario de Firebase" -> Esto se ejecuta también después de un F5, porque Firebase restaura sesión automáticamente
  useEffect(() => {
    // El onAuthStateChanged es un observador (listener) que detecta cada vez que el estado de autenticación cambia -> Cuando este estado cambie, ejecutará su función callback (la que está como segundo argumento)
    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      // Supongo que fbUser es lo que onAuthStateChanged trae del indexesDB delnavegador , y puede tener como valor algo del tipo User o un null
      setFirebaseUser(fbUser);

      if (!fbUser) {
        setAppUser(null); // <-- Asegura
        setStatus((prev) => ({ ...prev, loading: false }));
        return;
      }

      if (fbUser) {
        try {
          const token = await fbUser.getIdToken(); // Obtiene el token actual

          // Solicitar al backend los datos del usuario

          // Cambiar esto por un POST o crear una ruta GET para traer los datos del usuario
          const res = await fetch("http://localhost:3000/user/login", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (!res.ok) {
            throw new Error(
              "Fallo al obtener datos del usuario desde el backend."
            );
          }

          const result = await res.json();

          setAppUser(result.data); // guarda los datos del backend en el estado
        } catch (error) {
          console.error("Error obteniendo usuario del backend:", error);
          setAppUser(null); // por seguridad
        } finally {
          setStatus((prev) => ({ ...prev, loading: false }));
        }
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{ firebaseUser, getIdToken, logout, appUser, setAppUser, status }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
