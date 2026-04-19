const express = require("express");
const router = express.Router();

const {
  adminLogin,
  getAllTeachers,
  getStudentsByClassAdmin,
  deleteStudent,
  updateStudent,
} = require("../controllers/adminController");

// LOGIN
router.post("/login", adminLogin);

// DATA
router.get("/teachers", getAllTeachers);
router.get("/students", getStudentsByClassAdmin);

// CRUD
router.delete("/student/:id", deleteStudent);
router.put("/student/:id", updateStudent);

module.exports = router;
