import { useNavigate } from "react-router-dom";
import axios from "axios";

function Dashboard() {
  const navigate = useNavigate();
  const teacher = JSON.parse(localStorage.getItem("teacher"));

  const markMyAttendance = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/mark-teacher-attendance",
        {
          teacherId: teacher.teacherId,
          name: teacher.name,
          school: teacher.school,
          class: teacher.class,
        },
      );

      alert(res.data.message);
    } catch (err) {
      alert(err.response?.data?.message || "Error marking attendance");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("teacher");
    navigate("/");
  };

  if (!teacher) return <h2>Please login first</h2>;

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2>Teacher Dashboard</h2>

        <p>
          <b>Name:</b> {teacher.name}
        </p>
        <p>
          <b>ID:</b> {teacher.teacherId}
        </p>
        <p>
          <b>School:</b> {teacher.school}
        </p>
        <p>
          <b>Class:</b> {teacher.class}
        </p>

        <button style={styles.greenBtn} onClick={markMyAttendance}>
          Mark My Attendance
        </button>

        <button
          style={styles.blueBtn}
          onClick={() => navigate("/mark-student-attendance")}
        >
          Student Attendance
        </button>

        <button
          style={styles.yellowBtn}
          onClick={() => navigate("/attendance-history")}
        >
          View History
        </button>

        <button style={styles.redBtn} onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

const styles = {
  page: {
    display: "flex",
    justifyContent: "center",
    marginTop: "50px",
  },
  card: {
    background: "white",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    textAlign: "center",
    width: "350px",
  },
  greenBtn: {
    background: "#28a745",
    color: "white",
    margin: "10px",
    padding: "10px",
    borderRadius: "8px",
    border: "none",
  },
  blueBtn: {
    background: "#007bff",
    color: "white",
    margin: "10px",
    padding: "10px",
    borderRadius: "8px",
    border: "none",
  },
  yellowBtn: {
    background: "#ffc107",
    margin: "10px",
    padding: "10px",
    borderRadius: "8px",
    border: "none",
  },
  redBtn: {
    background: "#dc3545",
    color: "white",
    margin: "10px",
    padding: "10px",
    borderRadius: "8px",
    border: "none",
  },
};

export default Dashboard;
