import { Navigate } from "react-router-dom";
import { auth } from "../firebase/firebase";

export default function ProtectedRoute({
  children,
}) {
  return auth.currentUser ? (
    children
  ) : (
    <Navigate to="/" />
  );
}
