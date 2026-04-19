import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [adminId, setAdminId] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const admin = JSON.parse(localStorage.getItem("admin"));
    if (admin) {
      navigate("/admin/dashboard");
    }
  }, []);

  const login = async () => {
    if (!adminId || !password) {
      alert("Please enter Admin ID and Password");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/admin/login", {
        adminId,
        password,
      });

      localStorage.setItem("admin", JSON.stringify(res.data.admin));
      alert("Login successful");
      navigate("/admin/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2>Admin Login</h2>

        <input
          style={styles.input}
          placeholder="Admin ID"
          value={adminId}
          onChange={(e) => setAdminId(e.target.value)}
        />

        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button style={styles.btn} onClick={login}>
          Login
        </button>
      </div>
    </div>
  );
}

const styles = {
  page: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "#f4f6f9",
  },
  card: {
    background: "white",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    textAlign: "center",
    width: "300px",
  },
  input: {
    width: "90%",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },
  btn: {
    background: "#007bff",
    color: "white",
    padding: "10px",
    borderRadius: "8px",
    border: "none",
    width: "100%",
    cursor: "pointer",
  },
};
