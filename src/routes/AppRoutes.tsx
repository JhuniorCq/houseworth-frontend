import { Navigate, Route, Routes } from "react-router-dom";
import Register from "../pages/Register";
import Login from "../pages/Login";
import PredictionView from "../pages/PredictionView";
import Home from "../pages/Home";
import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/sign-up" element={<Register />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/home" element={<Home />} />
        <Route path="/prediction" element={<PredictionView />} />
      </Route>
      <Route path="/*" element={<div>Error 404 - Not Found</div>} />
    </Routes>
  );
};

export default AppRoutes;
