import { BrowserRouter, Routes, Route } from "react-router-dom";

import AttendanceHistory from "./pages/AttendanceHistory";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import StudentAttendance from "./pages/StudentAttendance";

import AdminLogin from "./pages/AdminLogin";
import AdminPanel from "./pages/AdminPanel";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Teacher Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route
          path="/mark-student-attendance"
          element={<StudentAttendance />}
        />

        {/* Admin Routes (FIXED) */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminPanel />} />
        <Route path="/attendance-history" element={<AttendanceHistory />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
