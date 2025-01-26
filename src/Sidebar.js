import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { TiHome } from "react-icons/ti"; // Change to desired icon

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const menuItems = [
    { title: "Dashboard", icon: TiHome, path: "/dashboard" },
    { title: "Students", icon: TiHome, path: "/students" },  // Placeholder link
    { title: "Courses", icon: TiHome, path: "/courses" },    // Placeholder link
  ];

  return (
    <div
      className={`bg-purple-700 h-screen fixed top-0 left-0 p-3 pt-8 hover:bg-purple-600 shadow-lg transition-all duration-300 ${sidebarOpen ? "w-52" : "w-16"}`}
    >
      {/* Sidebar Toggle */}
      <FaArrowLeft
        className={`absolute top-8 right-4 text-3xl rounded-full p-1 cursor-pointer text-white border-2 border-white`}
        onClick={() => setSidebarOpen(!sidebarOpen)} // Toggle sidebar width
      />

      {/* Sidebar Menu */}
      <div className="mt-10">
        {menuItems.map((item, index) => (
          <Link key={index} to={item.path}>
            <div
              className={`text-slate-200 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-white hover:text-black rounded-md mb-2`}
            >
              <span className="text-2xl">
                <item.icon />
              </span>
              <span className={`text-base font-medium ${!sidebarOpen && "hidden"}`}>
                {item.title}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
