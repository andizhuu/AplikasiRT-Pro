import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import {
  createUserWithEmailAndPassword,
} from "firebase/auth";

import {
  collection,
  addDoc,
  getDocs,
} from "firebase/firestore";

import {
  auth,
  db,
} from "../firebase/firebase";

export default function Register() {
  const navigate = useNavigate();

  const [rt, setRt] =
    useState("");

  const [rw, setRw] =
    useState("");

  const [kelurahan, setKelurahan] =
    useState("");

  const [kecamatan, setKecamatan] =
    useState("");

  const [kota, setKota] =
    useState("");

  const [admin, setAdmin] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleRegister = async (
    e
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      const userCredential =
        await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

      const uid =
        userCredential.user.uid;

      const rtSnapshot =
        await getDocs(
          collection(db, "rts")
        );

      const rtId = `RT${String(
        rtSnapshot.size + 1
      ).padStart(3, "0")}`;

      await addDoc(
        collection(db, "rts"),
        {
          rtId,
          rt,
          rw,
          kelurahan,
          kecamatan,
          kota,
          admin,
          email,
          adminUid: uid,
          createdAt:
            new Date(),
        }
      );

      await addDoc(
        collection(db, "users"),
        {
          uid,
          nama: admin,
          email,
          rtId,
          role: "admin",
          createdAt:
            new Date(),
        }
      );

      Swal.fire({
        icon: "success",
        title:
          "Pendaftaran Berhasil",
      });

      navigate("/dashboard");
    } catch (error) {
      console.log(error);

      Swal.fire({
        icon: "error",
        title:
          "Pendaftaran Gagal",
        text:
          error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent:
          "center",
        alignItems:
          "center",
        background:
          "#eef2f7",
        padding: "20px",
      }}
    >
      <form
        onSubmit={
          handleRegister
        }
        style={{
          background:
            "#eef2f7",
          padding: "30px",
          borderRadius:
            "30px",
          width: "100%",
          maxWidth: "450px",
          boxShadow:
            "12px 12px 24px rgba(0,0,0,0.12), -12px -12px 24px rgba(255,255,255,0.95)",
        }}
      >
        <h2
          style={{
            textAlign:
              "center",
            marginBottom:
              "20px",
          }}
        >
          Daftar RT Baru
        </h2>

        <input
          type="text"
          placeholder="RT"
          value={rt}
          onChange={(e) =>
            setRt(
              e.target.value
            )
          }
          style={inputStyle}
        />

        <input
          type="text"
          placeholder="RW"
          value={rw}
          onChange={(e) =>
            setRw(
              e.target.value
            )
          }
          style={inputStyle}
        />

        <input
          type="text"
          placeholder="Kelurahan"
          value={kelurahan}
          onChange={(e) =>
            setKelurahan(
              e.target.value
            )
          }
          style={inputStyle}
        />

        <input
          type="text"
          placeholder="Kecamatan"
          value={kecamatan}
          onChange={(e) =>
            setKecamatan(
              e.target.value
            )
          }
          style={inputStyle}
        />

        <input
          type="text"
          placeholder="Kota"
          value={kota}
          onChange={(e) =>
            setKota(
              e.target.value
            )
          }
          style={inputStyle}
        />

        <input
          type="text"
          placeholder="Admin"
          value={admin}
          onChange={(e) =>
            setAdmin(
              e.target.value
            )
          }
          style={inputStyle}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
          style={inputStyle}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
          style={inputStyle}
        />

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "14px",
            border: "none",
            borderRadius:
              "15px",
            background:
              "#00b894",
            color: "#fff",
            fontWeight:
              "bold",
            fontSize:
              "16px",
          }}
        >
          {loading
            ? "Loading..."
            : "Daftar"}
        </button>
      </form>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "14px",
  marginBottom: "12px",
  border: "none",
  borderRadius: "12px",
};
