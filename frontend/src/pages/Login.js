import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [teacherId, setTeacherId] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const getLocation = () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) reject("Geolocation not supported");

      navigator.geolocation.getCurrentPosition(
        (position) => resolve(position),
        (error) => reject(error.message),
      );
    });
  };

  const handleLogin = async () => {
    try {
      setLoading(true);
      await getLocation();

      alert("📍 Location verified successfully");

      const res = await axios.post("http://localhost:5000/api/login", {
        teacherId,
        password,
      });

      localStorage.setItem("teacher", JSON.stringify(res.data.teacher));
      alert("Login successful");
      navigate("/dashboard");
    } catch (error) {
      alert(error?.response?.data?.message || error || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2>Teacher Login</h2>

        <input
          style={styles.input}
          placeholder="Teacher ID"
          value={teacherId}
          onChange={(e) => setTeacherId(e.target.value)}
        />

        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          style={styles.primaryBtn}
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Checking location..." : "Login"}
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
  primaryBtn: {
    background: "#007bff",
    color: "white",
    padding: "10px",
    borderRadius: "8px",
    border: "none",
    width: "100%",
    cursor: "pointer",
  },
};

export default Login;
