const express = require("express");
const router = express.Router();

const {
  login,
  addTeacher,
  addStudent,
  markTeacherAttendance,
  getStudentsByClassAndSchool,
  markStudentAttendanceBulk,
  getAttendanceByClass, // ✅ ADD THIS LINE
} = require("../controllers/authController");

// ================= AUTH =================
router.post("/login", login);

// ================= ADMIN =================
router.post("/add-teacher", addTeacher);
router.post("/add-student", addStudent);

// ================= TEACHER =================
router.post("/mark-teacher-attendance", markTeacherAttendance);

// ================= STUDENT =================
router.get("/students", getStudentsByClassAndSchool);
router.post("/mark-student-attendance-bulk", markStudentAttendanceBulk);

// ================= HISTORY =================
router.get("/attendance/class", getAttendanceByClass);

module.exports = router;

const {
  adminLogin,
  getAllTeachers,
  getStudentsByClass,
  updateStudent,
  deleteStudent,
  updateAttendance,
} = require("../controllers/authController");

// ADMIN
router.post("/admin/login", adminLogin);
router.get("/admin/teachers", getAllTeachers);
router.get("/admin/students", getStudentsByClass);
router.put("/admin/student/:id", updateStudent);
router.delete("/admin/student/:id", deleteStudent);
router.put("/admin/attendance/:id", updateAttendance);
