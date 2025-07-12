import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

type ProtectedRouteProps = {
  // isAllowed: boolean;
  children?: React.ReactNode;
  redirectTo?: string;
};

const ProtectedRoute = ({
  // isAllowed,
  children,
  redirectTo = "/",
}: ProtectedRouteProps) => {
  const {
    firebaseUser,
    status: { loading },
  } = useAuth();

  // Mientras se verifica la sesión -> Si no hay esión  el usuario será redirijido
  if (loading) {
    return <div>Cargando la sesión ...</div>;
  }

  // Al obtener a firebaseUser acá mismo, ya no es necesario que me pasen un valor para "isAllowed"
  if (!firebaseUser) {
    return <Navigate to={redirectTo} />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
