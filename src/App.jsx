import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Warga from "./pages/Warga";
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
      </Routes>
    </BrowserRouter>
  );
}
