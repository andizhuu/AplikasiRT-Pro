import {
  HashRouter,
  Routes,
  Route,
} from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Warga from "./pages/Warga";
import KK from "./pages/KK";
import Iuran from "./pages/Iuran";
import Kas from "./pages/Kas";
import Pengumuman from "./pages/Pengumuman";

import ProtectedRoute from "./routes/ProtectedRoute";

export default function App() {
  return (
      <HashRouter>
      <Routes>
        <Route
          path="/"
          element={<Login />}
        />

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

        <Route
          path="/iuran"
          element={
            <ProtectedRoute>
              <Iuran />
            </ProtectedRoute>
          }
        />

        <Route
          path="/kas"
          element={
            <ProtectedRoute>
              <Kas />
            </ProtectedRoute>
          }
        />

        <Route
          path="/pengumuman"
          element={
            <ProtectedRoute>
              <Pengumuman />
            </ProtectedRoute>
          }
        />
      </Routes>
    </HashRouter>
  );
}
