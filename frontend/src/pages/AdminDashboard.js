import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminDashboard() {
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);

  const fetchTeachers = async () => {
    const res = await axios.get("http://localhost:5000/api/admin/teachers");
    setTeachers(res.data);
  };

  const loadStudents = async (teacher) => {
    const res = await axios.get(
      `http://localhost:5000/api/admin/students?className=${teacher.class}&school=${teacher.school}`,
    );
    setStudents(res.data);
  };

  const deleteStudent = async (id) => {
    await axios.delete(`http://localhost:5000/api/admin/student/${id}`);
    alert("Deleted");
    setStudents(students.filter((s) => s._id !== id));
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2>Admin Dashboard</h2>

        <h3>Teachers</h3>
        {teachers.map((t, i) => (
          <div key={i} style={styles.teacherCard}>
            {t.name} ({t.class})
            <button style={styles.blueBtn} onClick={() => loadStudents(t)}>
              View Students
            </button>
          </div>
        ))}

        <h3>Students</h3>
        <table style={styles.table}>
          <thead style={styles.head}>
            <tr>
              <th>Name</th>
              <th>Class</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {students.map((s) => (
              <tr key={s._id}>
                <td>{s.name}</td>
                <td>{s.class}</td>
                <td>
                  <button
                    style={styles.redBtn}
                    onClick={() => deleteStudent(s._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  },
  teacherCard: {
    background: "#f9f9f9",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "8px",
  },
  blueBtn: {
    marginLeft: "10px",
    background: "#007bff",
    color: "white",
    border: "none",
    padding: "6px 10px",
    borderRadius: "6px",
  },
  redBtn: {
    background: "#dc3545",
    color: "white",
    border: "none",
    padding: "6px 10px",
    borderRadius: "6px",
  },
  table: { width: "100%", marginTop: "20px" },
  head: { background: "#007bff", color: "white" },
};
