import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

import Swal from "sweetalert2";

import { motion } from "framer-motion";

import {
  FaWallet,
  FaArrowLeft,
  FaTrash,
} from "react-icons/fa";

export default function Kas() {
  const navigate = useNavigate();

  const [keterangan, setKeterangan] =
    useState("");

  const [nominal, setNominal] =
    useState("");

  const [jenis, setJenis] =
    useState("masuk");

  const [kasList, setKasList] =
    useState([]);

  const neumorphism = {
    background: "#eef2f7",
    borderRadius: "25px",
    boxShadow:
      "12px 12px 24px rgba(0,0,0,0.12), -12px -12px 24px rgba(255,255,255,0.95)",
  };

  useEffect(() => {
    loadKas();
  }, []);

  const loadKas = async () => {
    try {
      const snapshot = await getDocs(
        collection(db, "kas")
      );

      const data = snapshot.docs.map(
        (d) => ({
          id: d.id,
          ...d.data(),
        })
      );

      setKasList(data);
    } catch (error) {
      console.log(error);
    }
  };

  const simpanKas = async (e) => {
    e.preventDefault();

    if (!keterangan || !nominal) {
      Swal.fire({
        icon: "warning",
        title: "Lengkapi Data",
      });

      return;
    }

    try {
      await addDoc(
        collection(db, "kas"),
        {
          keterangan,
          nominal: Number(nominal),
          jenis,
          createdAt: new Date(),
        }
      );

      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Data kas disimpan",
        timer: 1500,
        showConfirmButton: false,
      });

      setKeterangan("");
      setNominal("");
      setJenis("masuk");

      loadKas();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "Tidak dapat menyimpan data",
      });
    }
  };

  const hapusKas = async (id) => {
    const result = await Swal.fire({
      title: "Hapus transaksi?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya",
      cancelButtonText: "Batal",
    });

    if (!result.isConfirmed) return;

    await deleteDoc(
      doc(db, "kas", id)
    );

    loadKas();

    Swal.fire({
      icon: "success",
      title: "Terhapus",
      timer: 1200,
      showConfirmButton: false,
    });
  };

  const totalMasuk = kasList
    .filter((x) => x.jenis === "masuk")
    .reduce(
      (a, b) =>
        a + Number(b.nominal || 0),
      0
    );

  const totalKeluar = kasList
    .filter((x) => x.jenis === "keluar")
    .reduce(
      (a, b) =>
        a + Number(b.nominal || 0),
      0
    );

  const saldo =
    totalMasuk - totalKeluar;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#eef2f7",
        padding: "20px",
      }}
    >
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() =>
          navigate("/dashboard")
        }
        style={{
          ...neumorphism,
          border: "none",
          padding: "12px 18px",
          marginBottom: "15px",
        }}
      >
        <FaArrowLeft /> Dashboard
      </motion.button>

      <div
        style={{
          ...neumorphism,
          padding: "20px",
          textAlign: "center",
          marginBottom: "20px",
        }}
      >
        <FaWallet
          size={40}
          color="#6c5ce7"
        />

        <h2>Kas RT</h2>

        <h3>
          Rp
          {saldo.toLocaleString(
            "id-ID"
          )}
        </h3>

        <p>
          Saldo Saat Ini
        </p>
      </div>

      <form onSubmit={simpanKas}>
        <input
          placeholder="Keterangan"
          value={keterangan}
          onChange={(e) =>
            setKeterangan(
              e.target.value
            )
          }
          style={inputStyle}
        />

        <input
          type="number"
          placeholder="Nominal"
          value={nominal}
          onChange={(e) =>
            setNominal(
              e.target.value
            )
          }
          style={inputStyle}
        />

        <select
          value={jenis}
          onChange={(e) =>
            setJenis(e.target.value)
          }
          style={inputStyle}
        >
          <option value="masuk">
            Pemasukan
          </option>

          <option value="keluar">
            Pengeluaran
          </option>
        </select>

        <button
          type="submit"
          style={submitButton}
        >
          Simpan Transaksi
        </button>
      </form>

      {kasList.map((item) => (
        <div
          key={item.id}
          style={{
            ...neumorphism,
            padding: "18px",
            marginTop: "15px",
          }}
        >
          <h3>
            {item.keterangan}
          </h3>

          <p>
            {item.jenis === "masuk"
              ? "➕ Pemasukan"
              : "➖ Pengeluaran"}
          </p>

          <p>
            Rp
            {Number(
              item.nominal
            ).toLocaleString(
              "id-ID"
            )}
          </p>

          {!item.keterangan?.startsWith("Iuran ") && (
  <button
    onClick={() =>
      hapusKas(item.id)
    }
    style={deleteButton}
  >
    <FaTrash />
    {" "}Hapus
  </button>
)}
        </div>
      ))}
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "14px",
  marginBottom: "10px",
  border: "none",
  borderRadius: "12px",
};

const submitButton = {
  width: "100%",
  padding: "14px",
  border: "none",
  borderRadius: "15px",
  background: "#6c5ce7",
  color: "#fff",
  fontWeight: "bold",
};

const deleteButton = {
  border: "none",
  padding: "10px",
  borderRadius: "10px",
  background: "#d63031",
  color: "#fff",
};
