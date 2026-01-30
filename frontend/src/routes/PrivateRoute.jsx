import { useEffect, useState } from "react";
import { Navigate } from "react-router";
import api from "../api/api";

export default function PrivateRoute({ children }) {
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    api.get("/auth/me", { withCredentials: true })
      .then(res => {
        if (res.data.loggedIn) {
          setStatus("allowed");
        } else {
          setStatus("denied");
        }
      })
      .catch(() => setStatus("denied"));
  }, []);

  if (status === "loading") {
    return (
      <div className="h-screen flex items-center justify-center">
        Checking login...
      </div>
    );
  }

  if (status === "denied") {
    return <Navigate to="/" replace />;
  }

  return children;
}
