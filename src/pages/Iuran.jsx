import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  getDoc,
} from "firebase/firestore";

import { db } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";

import Swal from "sweetalert2";
import { motion } from "framer-motion";

import {
  FaMoneyBillWave,
  FaEdit,
  FaTrash,
  FaArrowLeft,
} from "react-icons/fa";

export default function Iuran() {
  const navigate = useNavigate();

  const [kepalaKeluarga, setKepalaKeluarga] =
    useState("");

  const [bulan, setBulan] =
    useState("");

  const [tahun, setTahun] =
    useState("");

  const [nominal, setNominal] =
    useState("");

  const [search, setSearch] =
    useState("");

  const [editId, setEditId] =
    useState(null);

  const [iuranList, setIuranList] =
    useState([]);

  const [kkList, setKkList] =
    useState([]);

  const neumorphism = {
    background: "#eef2f7",
    borderRadius: "25px",
    boxShadow:
      "12px 12px 24px rgba(0,0,0,0.12), -12px -12px 24px rgba(255,255,255,0.95)",
  };

  useEffect(() => {
    loadIuran();
    loadKK();
  }, []);

  const loadKK = async () => {
    const snapshot = await getDocs(
      collection(db, "kk")
    );

    const data = snapshot.docs.map(
      (d) => ({
        id: d.id,
        ...d.data(),
      })
    );

    setKkList(data);
  };

  const loadIuran = async () => {
    const snapshot = await getDocs(
      collection(db, "iuran")
    );

    const data = snapshot.docs.map(
      (d) => ({
        id: d.id,
        ...d.data(),
      })
    );

    setIuranList(data);
  };

  const simpanIuran = async (e) => {
    e.preventDefault();

    if (
      !kepalaKeluarga ||
      !bulan ||
      !tahun ||
      !nominal
    ) {
      Swal.fire({
        icon: "warning",
        title: "Lengkapi Data",
      });

      return;
    }

    try {
      if (editId) {
        await updateDoc(
          doc(db, "iuran", editId),
          {
            kepalaKeluarga,
            bulan,
            tahun,
            nominal:
              Number(nominal),
          }
        );

        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text:
            "Iuran berhasil diperbarui",
          timer: 1500,
          showConfirmButton: false,
        });
      } else {
        const kasRef = await addDoc(
          collection(db, "kas"),
          {
            keterangan:
              "Iuran " +
              kepalaKeluarga,
            nominal:
              Number(nominal),
            jenis: "masuk",
            createdAt:
              new Date(),
          }
        );

        await addDoc(
          collection(db, "iuran"),
          {
            kepalaKeluarga,
            bulan,
            tahun,
            nominal:
              Number(nominal),
            kasId: kasRef.id,
            createdAt:
              new Date(),
          }
        );

        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text:
            "Iuran berhasil ditambahkan",
          timer: 1500,
          showConfirmButton: false,
        });
      }

      setKepalaKeluarga("");
      setBulan("");
      setTahun("");
      setNominal("");
      setEditId(null);

      loadIuran();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text:
          "Terjadi kesalahan",
      });
    }
  };

  const editIuran = (item) => {
    setKepalaKeluarga(
      item.kepalaKeluarga
    );

    setBulan(item.bulan);
    setTahun(item.tahun);

    setNominal(
      item.nominal
    );

    setEditId(item.id);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const hapusIuran = async (id) => {
    const result =
      await Swal.fire({
        title:
          "Hapus Iuran?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText:
          "Ya",
        cancelButtonText:
          "Batal",
      });

    if (!result.isConfirmed)
      return;

    try {
      const iuranRef =
        doc(db, "iuran", id);

      const iuranSnap =
        await getDoc(iuranRef);

      if (iuranSnap.exists()) {
        const data =
          iuranSnap.data();

        if (data.kasId) {
          await deleteDoc(
            doc(
              db,
              "kas",
              data.kasId
            )
          );
        }
      }

      await deleteDoc(iuranRef);

      await loadIuran();

      Swal.fire({
        icon: "success",
        title: "Terhapus",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text:
          "Tidak dapat menghapus data",
      });
    }
  };

  const totalIuran =
    iuranList.reduce(
      (a, b) =>
        a +
        Number(
          b.nominal || 0
        ),
      0
    );

  const filtered =
    iuranList.filter(
      (item) =>
        item.kepalaKeluarga
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#eef2f7",
        padding: "20px",
      }}
    >
      <motion.button
        whileTap={{
          scale: 0.95,
        }}
        onClick={() =>
          navigate(
            "/dashboard"
          )
        }
        style={{
          ...neumorphism,
          border: "none",
          padding:
            "12px 18px",
          marginBottom:
            "15px",
        }}
      >
        <FaArrowLeft />
        {" "}
        Dashboard
      </motion.button>

      <div
        style={{
          ...neumorphism,
          padding: "20px",
          textAlign:
            "center",
          marginBottom:
            "20px",
        }}
      >
        <FaMoneyBillWave
          size={40}
          color="#00b894"
        />

        <h2>
          Iuran Warga
        </h2>

        <h3>
          Rp
          {totalIuran.toLocaleString(
            "id-ID"
          )}
        </h3>
      </div>

      <form
        onSubmit={
          simpanIuran
        }
      >
        <select
          value={
            kepalaKeluarga
          }
          onChange={(e) =>
            setKepalaKeluarga(
              e.target.value
            )
          }
          style={
            inputStyle
          }
        >
          <option value="">
            Pilih KK
          </option>

          {kkList.map(
            (item) => (
              <option
                key={
                  item.id
                }
                value={
                  item.kepalaKeluarga
                }
              >
                {
                  item.kepalaKeluarga
                }
              </option>
            )
          )}
        </select>

        <input
          placeholder="Bulan"
          value={bulan}
          onChange={(e) =>
            setBulan(
              e.target.value
            )
          }
          style={
            inputStyle
          }
        />

        <input
          placeholder="Tahun"
          value={tahun}
          onChange={(e) =>
            setTahun(
              e.target.value
            )
          }
          style={
            inputStyle
          }
        />

        <input
          type="number"
          placeholder="Nominal"
          value={
            nominal
          }
          onChange={(e) =>
            setNominal(
              e.target.value
            )
          }
          style={
            inputStyle
          }
        />

        <button
          type="submit"
          style={
            submitButton
          }
        >
          {editId
            ? "✏️ Update Iuran"
            : "➕ Tambah Iuran"}
        </button>
      </form>

      <input
        placeholder="Cari KK..."
        value={search}
        onChange={(e) =>
          setSearch(
            e.target.value
          )
        }
        style={
          inputStyle
        }
      />

      {filtered.map(
        (item) => (
          <div
            key={
              item.id
            }
            style={{
              ...neumorphism,
              padding:
                "18px",
              marginTop:
                "15px",
            }}
          >
            <h3>
              {
                item.kepalaKeluarga
              }
            </h3>

            <p>
              {
                item.bulan
              }{" "}
              {
                item.tahun
              }
            </p>

            <p>
              Rp
              {Number(
                item.nominal
              ).toLocaleString(
                "id-ID"
              )}
            </p>

            <div
              style={{
                display:
                  "flex",
                gap:
                  "10px",
              }}
            >
              <button
                onClick={() =>
                  editIuran(
                    item
                  )
                }
                type="button"
                style={
                  editButton
                }
              >
                <FaEdit />
                {" "}
                Edit
              </button>

              <button
                onClick={() =>
                  hapusIuran(
                    item.id
                  )
                }
                type="button"
                style={
                  deleteButton
                }
              >
                <FaTrash />
                {" "}
                Hapus
              </button>
            </div>
          </div>
        )
      )}
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
  background: "#00b894",
  color: "#fff",
  fontWeight: "bold",
};

const editButton = {
  flex: 1,
  border: "none",
  padding: "10px",
  borderRadius: "10px",
  background: "#0984e3",
  color: "#fff",
};

const deleteButton = {
  flex: 1,
  border: "none",
  padding: "10px",
  borderRadius: "10px",
  background: "#d63031",
  color: "#fff",
};
