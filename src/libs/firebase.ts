// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBrE0EZOfr2i_pdX0T6Uk4jMSPTu3fZdKw",
  authDomain: "houseworth-115cd.firebaseapp.com",
  projectId: "houseworth-115cd",
  storageBucket: "houseworth-115cd.firebasestorage.app",
  messagingSenderId: "530296202401",
  appId: "1:530296202401:web:0b6d87a9e9d0b668cb7ce0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

// Dato sobre: const auth = getAuth(app)

/*
  - Todos los usuarios que visitan tu página usan el mismo código de inicialización de Firebase -> Incluido: const auth = getAuth(app)
  - Pero, cada uno tiene su propia SESIÓN DE USUARIO aislada en su navegador
  - Firebase guarda esa SESIÓN en IndexedDB del navegador del usuario (por seguridad, no es accesible desde JS directamente)
  - Por eso, cuando haces F5, Firebase puede recordar automáticametne si ese navegador ya estaba autenticado -> Ya que Firebase carga automáticamente la sesión persistida desde IndexedDB y actualiza el estado del objeto `auth` con el usuario autenticado. (Todo esto será así si es que se está usando en el código a -> onAuthStateChanged -> Para actualizar el `auth`)

  - El auth del código maneja la sesión local en el dispositivo del usuario
*/
