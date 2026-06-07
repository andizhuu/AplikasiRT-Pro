import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const logout = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Dashboard RT Pro</h1>

      <p>Firebase Login Berhasil 🎉</p>

      <button
        onClick={logout}
      >
        Logout
      </button>
    </div>
  );
}
