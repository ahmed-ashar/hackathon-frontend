import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Staff from "./pages/dashboardpages/admin/Staff";
import LoginForm from "./pages/auth/LoginForm";
import ReceptionstDashboard from "./pages/dashboardpages/receptionst/ReceptionstDashboard";
import DepartmentDashboard from "./pages/dashboardpages/department/DepartmentDashboard";
import AdminDashboard from "./pages/dashboardpages/admin/AdminDashboard";
import ReceptionstData from "./pages/dashboardpages/admin/ReceptionstData";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/receptionstDashboard" element={<ReceptionstDashboard />} />
        <Route path="/departmentDashboard" element={<DepartmentDashboard />} />
        <Route path="/dashboard" element={<AdminDashboard />}>
          <Route path="staff" element={<Staff />} />
          <Route path="receptionst" element={<ReceptionstData />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
