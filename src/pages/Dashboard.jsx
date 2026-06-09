import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";

import { auth, db } from "../firebase/firebase";

import {
  collection,
  getDocs,
} from "firebase/firestore";

import { motion } from "framer-motion";

import {
  FaUsers,
  FaHome,
  FaMoneyBillWave,
  FaWallet,
  FaBullhorn,
  FaSignOutAlt,
} from "react-icons/fa";

export default function Dashboard() {
  const navigate = useNavigate();

  const [totalWarga, setTotalWarga] =
    useState(0);

  const [totalKK, setTotalKK] =
    useState(0);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const wargaSnapshot = await getDocs(
        collection(db, "warga")
      );

      const kkSnapshot = await getDocs(
        collection(db, "kk")
      );

      setTotalWarga(
        wargaSnapshot.size
      );

      setTotalKK(
        kkSnapshot.size
      );
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    await signOut(auth);
    navigate("/");
  };

  const neumorphism = {
    background: "#eef2f7",
    borderRadius: "28px",
    boxShadow:
      "12px 12px 24px rgba(0,0,0,0.12), -12px -12px 24px rgba(255,255,255,0.95)",
  };

  const menuCard = {
    ...neumorphism,
    padding: "25px",
    textAlign: "center",
    cursor: "pointer",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#eef2f7",
        padding: "20px",
      }}
    >
      <motion.div
        initial={{
          y: -20,
          opacity: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        style={{
          ...neumorphism,
          padding: "24px",
          marginBottom: "24px",
        }}
      >
        <h2
          style={{
            margin: 0,
          }}
        >
          👋 Halo Admin
        </h2>

        <p
          style={{
            color: "#636e72",
          }}
        >
          Selamat datang di RT Pro
        </p>
      </motion.div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(2,1fr)",
          gap: "15px",
          marginBottom: "25px",
        }}
      >
        <motion.div
          whileTap={{
            scale: 0.95,
          }}
          style={{
            ...neumorphism,
            padding: "20px",
            textAlign: "center",
          }}
        >
          <FaUsers
            size={35}
            color="#00b894"
          />

          <h2>{totalWarga}</h2>

          <p>Total Warga</p>
        </motion.div>

        <motion.div
          whileTap={{
            scale: 0.95,
          }}
          style={{
            ...neumorphism,
            padding: "20px",
            textAlign: "center",
          }}
        >
          <FaHome
            size={35}
            color="#0984e3"
          />

          <h2>{totalKK}</h2>

          <p>Total KK</p>
        </motion.div>

        <motion.div
          whileTap={{
            scale: 0.95,
          }}
          style={{
            ...neumorphism,
            padding: "20px",
            textAlign: "center",
          }}
        >
          <FaMoneyBillWave
            size={35}
            color="#fdcb6e"
          />

          <h2>Rp0</h2>

          <p>Iuran</p>
        </motion.div>

        <motion.div
          whileTap={{
            scale: 0.95,
          }}
          style={{
            ...neumorphism,
            padding: "20px",
            textAlign: "center",
          }}
        >
          <FaWallet
            size={35}
            color="#6c5ce7"
          />

          <h2>Rp0</h2>

          <p>Kas</p>
        </motion.div>
      </div>

      <h3>
        Menu Utama
      </h3>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(2,1fr)",
          gap: "15px",
        }}
      >
        <motion.div
          whileTap={{
            scale: 0.95,
          }}
          style={menuCard}
          onClick={() =>
            navigate("/warga")
          }
        >
          <FaUsers
            size={40}
            color="#00b894"
          />

          <h4>Data Warga</h4>
        </motion.div>

        <motion.div
          whileTap={{
            scale: 0.95,
          }}
          style={menuCard}
          onClick={() =>
            navigate("/kk")
          }
        >
          <FaHome
            size={40}
            color="#0984e3"
          />

          <h4>Data KK</h4>
        </motion.div>

        <motion.div
          whileTap={{
            scale: 0.95,
          }}
          style={menuCard}
        >
          <FaMoneyBillWave
            size={40}
            color="#fdcb6e"
          />

          <h4>Iuran</h4>
        </motion.div>

        <motion.div
          whileTap={{
            scale: 0.95,
          }}
          style={menuCard}
        >
          <FaWallet
            size={40}
            color="#6c5ce7"
          />

          <h4>Kas</h4>
        </motion.div>

        <motion.div
          whileTap={{
            scale: 0.95,
          }}
          style={menuCard}
        >
          <FaBullhorn
            size={40}
            color="#e17055"
          />

          <h4>Pengumuman</h4>
        </motion.div>
      </div>

      <motion.button
        whileTap={{
          scale: 0.95,
        }}
        onClick={logout}
        style={{
          width: "100%",
          marginTop: "25px",
          padding: "16px",
          border: "none",
          borderRadius: "20px",
          background:
            "#ff5252",
          color: "#fff",
          fontSize: "16px",
          fontWeight: "bold",
        }}
      >
        <FaSignOutAlt />
        {" "}Logout
      </motion.button>
    </div>
  );
}
