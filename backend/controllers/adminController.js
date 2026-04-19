const Teacher = require("../models/Teacher");
const Student = require("../models/Student");

// ================= ADMIN LOGIN =================
exports.adminLogin = (req, res) => {
  const { adminId, password } = req.body;

  if (adminId === "admin" && password === "admin123") {
    return res.json({
      message: "Login successful",
      admin: { adminId },
    });
  }

  res.status(401).json({ message: "Invalid credentials" });
};

// ================= GET ALL TEACHERS =================
exports.getAllTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find();
    res.json(teachers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= GET STUDENTS =================
exports.getStudentsByClassAdmin = async (req, res) => {
  try {
    const { className, school } = req.query;

    if (!className || !school) {
      return res.status(400).json({ message: "className and school required" });
    }

    const students = await Student.find({
      class: className,
      school,
    });

    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= DELETE STUDENT =================
exports.deleteStudent = async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: "Student deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= UPDATE STUDENT =================
exports.updateStudent = async (req, res) => {
  try {
    const updated = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
