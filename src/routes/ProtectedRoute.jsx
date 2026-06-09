import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

import { auth } from "../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function ProtectedRoute({
  children,
}) {
  const [user, setUser] =
    useState(undefined);

  useEffect(() => {
    const unsubscribe =
      onAuthStateChanged(
        auth,
        (currentUser) => {
          setUser(
            currentUser
          );
        }
      );

    return () =>
      unsubscribe();
  }, []);

  if (
    user === undefined
  ) {
    return (
      <div
        style={{
          minHeight:
            "100vh",
          display:
            "flex",
          justifyContent:
            "center",
          alignItems:
            "center",
          fontSize:
            "20px",
          fontWeight:
            "bold",
          background:
            "#eef2f7",
        }}
      >
        Loading...
      </div>
    );
  }

  return user ? (
    children
  ) : (
    <Navigate
      to="/"
      replace
    />
  );
}
