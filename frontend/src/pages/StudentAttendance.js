import { useEffect, useState } from "react";
import axios from "axios";

function StudentAttendance() {
  const teacher = JSON.parse(localStorage.getItem("teacher"));
  const [students, setStudents] = useState([]);
  const [locked, setLocked] = useState(false);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    const res = await axios.get(
      `http://localhost:5000/api/students?className=${teacher.class}&school=${teacher.school}`,
    );
    setStudents(res.data.map((s) => ({ ...s, status: "Present" })));
  };

  const changeStatus = (i, status) => {
    if (locked) return;
    const updated = [...students];
    updated[i].status = status;
    setStudents(updated);
  };

  const finalSubmit = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/mark-student-attendance-bulk",
        {
          students,
          school: teacher.school,
          className: teacher.class,
        },
      );
      alert("Submitted");
      setLocked(true);
    } catch (e) {
      alert(e.response?.data?.message);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2>Class {teacher.class}</h2>

        <table style={styles.table}>
          <thead>
            <tr style={styles.head}>
              <th>ID</th>
              <th>Name</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {students.map((s, i) => (
              <tr key={s.studentId}>
                <td>{s.studentId}</td>
                <td>{s.name}</td>
                <td style={{ color: s.status === "Present" ? "green" : "red" }}>
                  {s.status}
                </td>
                <td>
                  <button
                    disabled={locked}
                    onClick={() => changeStatus(i, "Present")}
                  >
                    ✔
                  </button>
                  <button
                    disabled={locked}
                    onClick={() => changeStatus(i, "Absent")}
                  >
                    ✖
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button onClick={finalSubmit}>Submit</button>
      </div>
    </div>
  );
}

const styles = {
  page: { display: "flex", justifyContent: "center", marginTop: "30px" },
  card: {
    width: "80%",
    background: "white",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  },
  table: { width: "100%", marginTop: "20px" },
  head: { background: "#007bff", color: "white" },
};

export default StudentAttendance;
