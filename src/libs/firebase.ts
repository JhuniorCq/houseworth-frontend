// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  VITE_API_KEY,
  VITE_AUTH_DOMAIN,
  VITE_PROJECT_ID,
  VITE_STORAGE_BUCKET,
  VITE_MESSAGING_SENDER_ID,
  VITE_APP_ID,
} from "../config/config";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: VITE_API_KEY,
  authDomain: VITE_AUTH_DOMAIN,
  projectId: VITE_PROJECT_ID,
  storageBucket: VITE_STORAGE_BUCKET,
  messagingSenderId: VITE_MESSAGING_SENDER_ID,
  appId: VITE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

// Dato sobre: const auth = getAuth(app)

/*
  - Todos los usuarios que visitan la página usan el mismo código de inicialización de Firebase -> Incluido: const auth = getAuth(app)
  - Pero, cada uno tiene su propia SESIÓN DE USUARIO aislada en su navegador
  - Firebase guarda esa SESIÓN en IndexedDB del navegador del usuario (por seguridad, no es accesible desde JS directamente)
  - Por eso, cuando haces F5, Firebase puede recordar automáticametne si ese navegador ya estaba autenticado -> Ya que Firebase carga automáticamente la sesión persistida desde IndexedDB y actualiza el estado del objeto `auth` con el usuario autenticado. (Todo esto último será así si es que se está usando en el código a -> onAuthStateChanged -> Para actualizar el `auth`)

  - El auth del código maneja la sesión local en el dispositivo del usuario
*/
