import { useNavigate } from "react-router-dom";

export default function Pengumuman() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#eef2f7",
        padding: "20px",
      }}
    >
      <button
        onClick={() =>
          navigate("/dashboard")
        }
      >
        ← Dashboard
      </button>

      <h1>📢 Pengumuman RT</h1>

      <p>
        Halaman Pengumuman berhasil dibuat
      </p>
    </div>
  );
}
