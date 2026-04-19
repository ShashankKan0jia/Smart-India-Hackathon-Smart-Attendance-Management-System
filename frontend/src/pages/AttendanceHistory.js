import { useEffect, useState } from "react";
import axios from "axios";

export default function AttendanceHistory() {
  const teacher = JSON.parse(localStorage.getItem("teacher"));
  const [records, setRecords] = useState([]);
  const [date, setDate] = useState("");

  const fetchData = async () => {
    const res = await axios.get(
      `http://localhost:5000/api/attendance/class?className=${teacher.class}&school=${teacher.school}&date=${date}`,
    );
    setRecords(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2>History</h2>

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button onClick={fetchData}>Search</button>

        <table style={styles.table}>
          <thead style={styles.head}>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {records
              .filter((r) => r.userType === "student")
              .map((r, i) => (
                <tr key={i}>
                  <td>{r.userId}</td>
                  <td>{r.name}</td>
                  <td
                    style={{ color: r.status === "Present" ? "green" : "red" }}
                  >
                    {r.status}
                  </td>
                  <td>{r.date}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const styles = {
  page: { display: "flex", justifyContent: "center" },
  card: {
    width: "80%",
    background: "white",
    padding: "20px",
    borderRadius: "10px",
    marginTop: "20px",
  },
  table: { width: "100%", marginTop: "20px" },
  head: { background: "#007bff", color: "white" },
};
