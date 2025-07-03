import { Navigate, Route, Routes } from "react-router-dom";
import Register from "../pages/Register";
import Login from "../pages/Login";
import PredictionView from "../pages/PredictionView";
import Home from "../pages/Home";
import ProtectedRoute from "./ProtectedRoute";
import MultiplePredictionView from "../pages/MultiplePredictionView";
import PredictionHistoryView from "../pages/PredictionHistoryView";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/sign-up" element={<Register />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/home" element={<Home />} />
        <Route path="/prediction" element={<PredictionView />} />
        <Route
          path="/multiple-prediction"
          element={<MultiplePredictionView />}
        />
        <Route path="/prediction-history" element={<PredictionHistoryView />} />
      </Route>
      <Route path="/*" element={<div>Error 404 - Not Found</div>} />
    </Routes>
  );
};

export default AppRoutes;
