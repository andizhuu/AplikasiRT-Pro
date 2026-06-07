import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";

import { db } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";

export default function Warga() {
  const navigate = useNavigate();

  const [nama, setNama] = useState("");
  const [nik, setNik] = useState("");
  const [alamat, setAlamat] = useState("");

  const [warga, setWarga] = useState([]);

  const loadWarga = async () => {
    const querySnapshot = await getDocs(
      collection(db, "warga")
    );

    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setWarga(data);
  };

  useEffect(() => {
    loadWarga();
  }, []);

  const tambahWarga = async (e) => {
    e.preventDefault();

    if (!nama || !nik || !alamat) {
      alert("Lengkapi data");
      return;
    }

    await addDoc(collection(db, "warga"), {
      nama,
      nik,
      alamat,
      createdAt: new Date(),
    });

    setNama("");
    setNik("");
    setAlamat("");

    loadWarga();
  };

  const hapusWarga = async (id) => {
    await deleteDoc(doc(db, "warga", id));
    loadWarga();
  };

  return (
    <div
      style={{
        padding: "20px",
        background: "#f4f6f3",
        minHeight: "100vh",
      }}
    >
      <button
        onClick={() => navigate("/dashboard")}
      >
        ← Dashboard
      </button>

      <h2>Data Warga</h2>

      <form onSubmit={tambahWarga}>
        <input
          placeholder="Nama"
          value={nama}
          onChange={(e) =>
            setNama(e.target.value)
          }
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
          }}
        />

        <input
          placeholder="NIK"
          value={nik}
          onChange={(e) =>
            setNik(e.target.value)
          }
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
          }}
        />

        <input
          placeholder="Alamat"
          value={alamat}
          onChange={(e) =>
            setAlamat(e.target.value)
          }
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
          }}
        />

        <button type="submit">
          Tambah Warga
        </button>
      </form>

      <hr />

      {warga.map((item) => (
        <div
          key={item.id}
          style={{
            background: "white",
            padding: "12px",
            borderRadius: "10px",
            marginBottom: "10px",
          }}
        >
          <b>{item.nama}</b>

          <p>NIK: {item.nik}</p>

          <p>{item.alamat}</p>

          <button
            onClick={() =>
              hapusWarga(item.id)
            }
          >
            Hapus
          </button>
        </div>
      ))}
    </div>
  );
}
