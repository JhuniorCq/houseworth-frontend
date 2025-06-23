import { onAuthStateChanged, signOut, type User } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../libs/firebase";
import { FirebaseError } from "firebase/app";

type AuthContextType = {
  firebaseUser: User | null;
  getIdToken: () => Promise<string | null>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  firebaseUser: null,
  getIdToken: async () => null,
  logout: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);

  const getIdToken = async () => {
    if (!firebaseUser) return null;

    return await firebaseUser.getIdToken();
  };

  const logout = async () => {
    try {
      await signOut(auth); // Aviso a Firebase para que cierre la sesión de este usuario -> Y Firebase cerrará la sesión y borrará la sesión que persistía en IndexedDB
      setFirebaseUser(null);
      console.log("Sesión cerrada con éxito.");
    } catch (error) {
      if (error instanceof FirebaseError) {
        throw new Error("Error al cerrar sesión. Intenta nuevamente.");
      }

      throw new Error("Ocurrió un error al cerrar sesión.");
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      // Supongo que fbUser es lo que onAuthStateChanged trae del indexesDB delnavegador , y puede tener como valor algo del tipo User o un null
      setFirebaseUser(fbUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ firebaseUser, getIdToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
