import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div
        className={`transition-all duration-300 ${sidebarOpen ? "ml-52" : "ml-16"
          } flex-grow p-6`}
      >
        <h2 className="text-3xl font-bold mb-6">Dashboard</h2>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;
