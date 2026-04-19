import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AdminPanel() {
  const navigate = useNavigate();

  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  useEffect(() => {
    const admin = JSON.parse(localStorage.getItem("admin"));

    if (!admin) {
      navigate("/admin");
    } else {
      fetchTeachers();
    }
  }, []);

  const fetchTeachers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/teachers");
      setTeachers(res.data);
    } catch {
      alert("Error loading teachers");
    }
  };

  const loadStudents = async (teacher) => {
    setSelectedTeacher(teacher);

    try {
      const res = await axios.get(
        `http://localhost:5000/api/admin/students?className=${teacher.class}&school=${teacher.school}`,
      );
      setStudents(res.data);
    } catch {
      alert("Error loading students");
    }
  };

  const deleteStudent = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/student/${id}`);
      setStudents(students.filter((s) => s._id !== id));
      alert("Student deleted");
    } catch {
      alert("Error deleting student");
    }
  };

  const updateStudent = async (student) => {
    const newName = prompt("Enter new name", student.name);
    if (!newName) return;

    try {
      const res = await axios.put(
        `http://localhost:5000/api/admin/student/${student._id}`,
        { name: newName },
      );

      setStudents(students.map((s) => (s._id === student._id ? res.data : s)));
      alert("Student updated");
    } catch {
      alert("Error updating student");
    }
  };

  const logout = () => {
    localStorage.removeItem("admin");
    navigate("/admin");
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2>Admin Dashboard</h2>

        <button style={styles.logout} onClick={logout}>
          Logout
        </button>

        <h3>Teachers</h3>

        {teachers.map((t) => (
          <div key={t._id} style={styles.teacherCard}>
            {t.name} (Class: {t.class})
            <button style={styles.blueBtn} onClick={() => loadStudents(t)}>
              View Students
            </button>
          </div>
        ))}

        {selectedTeacher && (
          <>
            <h3>
              Students of {selectedTeacher.class} ({selectedTeacher.school})
            </h3>

            <table style={styles.table}>
              <thead style={styles.head}>
                <tr>
                  <th>Name</th>
                  <th>Class</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {students.map((s) => (
                  <tr key={s._id}>
                    <td>{s.name}</td>
                    <td>{s.class}</td>
                    <td>
                      <button
                        style={styles.editBtn}
                        onClick={() => updateStudent(s)}
                      >
                        Edit
                      </button>
                      <button
                        style={styles.deleteBtn}
                        onClick={() => deleteStudent(s._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: { display: "flex", justifyContent: "center", marginTop: "30px" },
  card: {
    width: "85%",
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
  editBtn: {
    background: "#28a745",
    color: "white",
    marginRight: "5px",
    border: "none",
    padding: "6px 10px",
    borderRadius: "6px",
  },
  deleteBtn: {
    background: "#dc3545",
    color: "white",
    border: "none",
    padding: "6px 10px",
    borderRadius: "6px",
  },
  logout: {
    background: "#dc3545",
    color: "white",
    padding: "8px 12px",
    border: "none",
    borderRadius: "6px",
    marginBottom: "10px",
  },
  table: { width: "100%", marginTop: "15px" },
  head: { background: "#007bff", color: "white" },
};
