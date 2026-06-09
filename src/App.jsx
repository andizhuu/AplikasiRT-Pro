import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Warga from "./pages/Warga";
import KK from "./pages/KK";

import ProtectedRoute from "./routes/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/warga"
          element={
            <ProtectedRoute>
              <Warga />
            </ProtectedRoute>
          }
        />

        <Route
          path="/kk"
          element={
            <ProtectedRoute>
              <KK />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
