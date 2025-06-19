import { Navigate, Route, Routes } from "react-router-dom";
import Register from "../pages/Register";
import Login from "../pages/Login";
import PredictionView from "../pages/PredictionView";

const MyRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/register" />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/prediction" element={<PredictionView />} />
    </Routes>
  );
};

export default MyRoutes;
