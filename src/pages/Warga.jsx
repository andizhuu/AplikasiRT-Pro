import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

import { db } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";

export default function Warga() {
  const navigate = useNavigate();

  const [nama, setNama] = useState("");
  const [nik, setNik] = useState("");
  const [alamat, setAlamat] = useState("");

  const [search, setSearch] = useState("");
  const [warga, setWarga] = useState([]);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    loadWarga();
  }, []);

  const loadWarga = async () => {
    try {
      const snapshot = await getDocs(
        collection(db, "warga")
      );

      const data = snapshot.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }));

      setWarga(data);
    } catch (err) {
      console.log(err);
    }
  };

  const simpanWarga = async (e) => {
    e.preventDefault();

    if (!nama || !nik || !alamat) {
      alert("Lengkapi semua data");
      return;
    }

    try {
      if (editId) {
        await updateDoc(
          doc(db, "warga", editId),
          {
            nama,
            nik,
            alamat,
          }
        );

        alert("Data berhasil diupdate");
      } else {
        await addDoc(
          collection(db, "warga"),
          {
            nama,
            nik,
            alamat,
            createdAt: new Date(),
          }
        );

        alert("Data berhasil ditambahkan");
      }

      setNama("");
      setNik("");
      setAlamat("");
      setEditId(null);

      loadWarga();
    } catch (err) {
      console.log(err);
      alert("Gagal menyimpan data");
    }
  };

  const editWarga = (item) => {
    setNama(item.nama || "");
    setNik(item.nik || "");
    setAlamat(item.alamat || "");
    setEditId(item.id);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const hapusWarga = async (id) => {
    const yakin = window.confirm(
      "Yakin hapus warga?"
    );

    if (!yakin) return;

    try {
      await deleteDoc(
        doc(db, "warga", id)
      );

      loadWarga();
    } catch (err) {
      console.log(err);
    }
  };

  const filteredWarga = warga.filter((item) =>
    item.nama
      ?.toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f4f6f3",
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

      <div
        style={{
          background: "#1D9E75",
          color: "white",
          padding: "20px",
          borderRadius: "20px",
          marginTop: "10px",
          marginBottom: "20px",
        }}
      >
        <h2>👥 Data Warga</h2>

        <p>
          Total Warga: {warga.length}
        </p>
      </div>

      <form onSubmit={simpanWarga}>
        <input
          type="text"
          placeholder="Nama Lengkap"
          value={nama}
          onChange={(e) =>
            setNama(e.target.value)
          }
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "10px",
          }}
        />

        <input
          type="text"
          placeholder="NIK"
          value={nik}
          onChange={(e) =>
            setNik(e.target.value)
          }
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "10px",
          }}
        />

        <input
          type="text"
          placeholder="Alamat"
          value={alamat}
          onChange={(e) =>
            setAlamat(e.target.value)
          }
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "10px",
          }}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "14px",
            border: "none",
            borderRadius: "10px",
            background: "#1D9E75",
            color: "white",
          }}
        >
          {editId
            ? "Update Warga"
            : "Tambah Warga"}
        </button>
      </form>

      <input
        placeholder="Cari Nama Warga..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        style={{
          width: "100%",
          padding: "12px",
          marginTop: "20px",
          marginBottom: "20px",
        }}
      />

      {filteredWarga.map((item) => (
        <div
          key={item.id}
          style={{
            background: "#fff",
            padding: "16px",
            borderRadius: "16px",
            marginBottom: "12px",
            boxShadow:
              "0 2px 10px rgba(0,0,0,0.08)",
          }}
        >
          <h3>{item.nama}</h3>

          <p>
            <b>NIK:</b> {item.nik}
          </p>

          <p>
            <b>Alamat:</b> {item.alamat}
          </p>

          <div
            style={{
              display: "flex",
              gap: "10px",
              marginTop: "10px",
            }}
          >
            <button
              type="button"
              onClick={() =>
                editWarga(item)
              }
              style={{
                flex: 1,
                border: "none",
                padding: "10px",
                borderRadius: "8px",
                background: "#0984e3",
                color: "white",
              }}
            >
              Edit
            </button>

            <button
              type="button"
              onClick={() =>
                hapusWarga(item.id)
              }
              style={{
                flex: 1,
                border: "none",
                padding: "10px",
                borderRadius: "8px",
                background: "#d63031",
                color: "white",
              }}
            >
              Hapus
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
