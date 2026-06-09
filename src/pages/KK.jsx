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

import { motion } from "framer-motion";
import Swal from "sweetalert2";

import {
  FaHome,
  FaEdit,
  FaTrash,
  FaArrowLeft,
} from "react-icons/fa";

export default function KK() {
  const navigate = useNavigate();

  const [noKK, setNoKK] = useState("");
  const [kepalaKeluarga, setKepalaKeluarga] =
    useState("");

  const [jumlahAnggota, setJumlahAnggota] =
    useState("");

  const [noHp, setNoHp] =
    useState("");

  const [search, setSearch] = useState("");
  const [kkList, setKkList] = useState([]);
  const [editId, setEditId] = useState(null);

  const neumorphism = {
    background: "#eef2f7",
    borderRadius: "25px",
    boxShadow:
      "12px 12px 24px rgba(0,0,0,0.12), -12px -12px 24px rgba(255,255,255,0.95)",
  };

  useEffect(() => {
    loadKK();
  }, []);

  const loadKK = async () => {
    try {
      const snapshot = await getDocs(
        collection(db, "kk")
      );

      const data = snapshot.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }));

      setKkList(data);
    } catch (err) {
      console.log(err);
    }
  };

  const simpanKK = async (e) => {
    e.preventDefault();

    if (
      !noKK ||
      !kepalaKeluarga ||
      !jumlahAnggota ||
      !noHp
    ) {
      Swal.fire({
        icon: "warning",
        title: "Data Belum Lengkap",
        text: "Silakan isi semua form",
      });
      return;
    }

    try {
      if (editId) {
        await updateDoc(
          doc(db, "kk", editId),
          {
            noKK,
            kepalaKeluarga,
            jumlahAnggota:
              Number(jumlahAnggota),
            noHp,
          }
        );

        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text:
            "Data KK berhasil diperbarui",
          timer: 1500,
          showConfirmButton: false,
        });
      } else {
        await addDoc(
          collection(db, "kk"),
          {
            noKK,
            kepalaKeluarga,
            jumlahAnggota:
              Number(jumlahAnggota),
            noHp,
            createdAt: new Date(),
          }
        );

        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text:
            "Data KK berhasil ditambahkan",
          timer: 1500,
          showConfirmButton: false,
        });
      }

      setNoKK("");
      setKepalaKeluarga("");
      setJumlahAnggota("");
      setNoHp("");
      setEditId(null);

      loadKK();
    } catch (err) {
      console.log(err);

      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "Terjadi kesalahan",
      });
    }
  };

  const editKK = (item) => {
    setNoKK(item.noKK);
    setKepalaKeluarga(
      item.kepalaKeluarga
    );

    setJumlahAnggota(
      item.jumlahAnggota || ""
    );

    setNoHp(
      item.noHp || ""
    );

    setEditId(item.id);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const hapusKK = async (id) => {
    const result = await Swal.fire({
      title: "Hapus Data?",
      text:
        "Data KK akan dihapus permanen",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, Hapus",
      cancelButtonText: "Batal",
    });

    if (!result.isConfirmed) return;

    try {
      await deleteDoc(
        doc(db, "kk", id)
      );

      await loadKK();

      Swal.fire({
        icon: "success",
        title: "Terhapus",
        text: "Data berhasil dihapus",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text:
          "Tidak bisa menghapus data",
      });
    }
  };

  const filteredKK = kkList.filter(
    (item) =>
      item.kepalaKeluarga
        ?.toLowerCase()
        .includes(search.toLowerCase())
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

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{
          ...neumorphism,
          padding: "20px",
          marginBottom: "20px",
          textAlign: "center",
        }}
      >
        <FaHome
          size={40}
          color="#0984e3"
        />

        <h2>Data KK</h2>

        <p>
          Total KK: {kkList.length}
        </p>
      </motion.div>

      <form onSubmit={simpanKK}>
        <input
          placeholder="Nomor KK"
          value={noKK}
          onChange={(e) =>
            setNoKK(e.target.value)
          }
          style={inputStyle}
        />

        <input
          placeholder="Kepala Keluarga"
          value={kepalaKeluarga}
          onChange={(e) =>
            setKepalaKeluarga(
              e.target.value
            )
          }
          style={inputStyle}
        />

        <input
          type="number"
          placeholder="Jumlah Anggota Keluarga"
          value={jumlahAnggota}
          onChange={(e) =>
            setJumlahAnggota(
              e.target.value
            )
          }
          style={inputStyle}
        />

        <input
          type="tel"
          placeholder="Nomor HP Kepala Keluarga"
          value={noHp}
          onChange={(e) =>
            setNoHp(
              e.target.value
            )
          }
          style={inputStyle}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "14px",
            border: "none",
            borderRadius: "15px",
            background: editId
              ? "#fdcb6e"
              : "#0984e3",
            color: "#fff",
            fontWeight: "bold",
            fontSize: "16px",
          }}
        >
          {editId
            ? "✏️ Update KK"
            : "➕ Tambah KK"}
        </button>
      </form>

      <input
        placeholder="Cari Kepala Keluarga..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        style={{
          ...inputStyle,
          marginTop: "20px",
        }}
      />

      {filteredKK.map((item) => (
        <motion.div
          key={item.id}
          whileHover={{
            y: -3,
          }}
          style={{
            ...neumorphism,
            padding: "18px",
            marginBottom: "15px",
          }}
        >
          <h3>
            {item.kepalaKeluarga}
          </h3>

          <p>
            <b>No KK:</b> {item.noKK}
          </p>

          <p>
            <b>
              Jumlah Anggota
              Keluarga:
            </b>{" "}
            {item.jumlahAnggota || 0}
          </p>

          <p>
            <b>
              No HP Kepala Keluarga:
            </b>{" "}
            {item.noHp || "-"}
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
                editKK(item)
              }
              style={editButton}
            >
              <FaEdit /> Edit
            </button>

            <button
              type="button"
              onClick={() =>
                hapusKK(item.id)
              }
              style={deleteButton}
            >
              <FaTrash /> Hapus
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "14px",
  marginBottom: "10px",
  borderRadius: "12px",
  border: "none",
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
