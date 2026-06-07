import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";

export default function Dashboard() {
  const navigate = useNavigate();

  const logout = async () => {
    await signOut(auth);
    navigate("/");
  };

  const cardStyle = {
    background: "#fff",
    borderRadius: "16px",
    padding: "16px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
    textAlign: "center",
  };

  const menuStyle = {
    background: "#fff",
    borderRadius: "16px",
    padding: "18px",
    textAlign: "center",
    cursor: "pointer",
    boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f4f6f3",
        padding: "20px",
      }}
    >
      <div
        style={{
          background: "#1D9E75",
          color: "white",
          padding: "20px",
          borderRadius: "20px",
          marginBottom: "20px",
        }}
      >
        <h2>Aplikasi RT Pro</h2>
        <p>Selamat Datang Admin 👋</p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2,1fr)",
          gap: "12px",
          marginBottom: "20px",
        }}
      >
        <div style={cardStyle}>
          <h3>0</h3>
          <p>Total Warga</p>
        </div>

        <div style={cardStyle}>
          <h3>0</h3>
          <p>Total KK</p>
        </div>

        <div style={cardStyle}>
          <h3>Rp0</h3>
          <p>Iuran</p>
        </div>

        <div style={cardStyle}>
          <h3>Rp0</h3>
          <p>Saldo Kas</p>
        </div>
      </div>

      <h3 style={{ marginBottom: "12px" }}>
        Menu Utama
      </h3>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2,1fr)",
          gap: "12px",
        }}
      >
        <div
          style={menuStyle}
          onClick={() => navigate("/warga")}
        >
          👥
          <br />
          Data Warga
        </div>

        <div
          style={menuStyle}
          onClick={() => navigate("/iuran")}
        >
          💰
          <br />
          Iuran
        </div>

        <div
          style={menuStyle}
          onClick={() => navigate("/kas")}
        >
          🏦
          <br />
          Kas
        </div>

        <div
          style={menuStyle}
          onClick={() => navigate("/pengumuman")}
        >
          📢
          <br />
          Pengumuman
        </div>
      </div>

      <button
        onClick={logout}
        style={{
          width: "100%",
          marginTop: "24px",
          padding: "14px",
          border: "none",
          borderRadius: "12px",
          background: "#d63031",
          color: "#fff",
          fontSize: "16px",
        }}
      >
        Logout
      </button>
    </div>
  );
}
