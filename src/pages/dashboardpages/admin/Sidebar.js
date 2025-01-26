import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { TiHome } from "react-icons/ti";
import { Link, useNavigate } from "react-router-dom";
import { RiDashboardFill } from "react-icons/ri";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  const teachermenu = [
    { title: "Dashboard", icon: TiHome, path: "/dashboard" },
    { title: "Staff", icon: TiHome, path: "/dashboard/staff" },
    { title: "receptionst", icon: TiHome, path: "/dashboard/receptionst" },
    { title: "Logout", icon: TiHome, path: "/", onClick: handleLogout },
  ];

  return (
    <div
      className={`bg-purple-700 h-screen fixed top-0 left-0 p-3 pt-8 shadow-lg shadow-gray-700 ${sidebarOpen ? "w-52" : "w-16"
        } transition-all duration-300`}
    >
      <FaArrowLeft
        className={`absolute top-8 right-4 text-3xl rounded-full p-1 cursor-pointer border-2 text-white border-white shadow-sm ${sidebarOpen ? "" : "rotate-180"
          }`}
        onClick={() => setSidebarOpen(!sidebarOpen)}
      />

      <div className="inline-flex items-center mb-5 ml-1">
        <TiHome
          className={`bg-slate-200 text-3xl rounded ${sidebarOpen ? "block" : "hidden"
            }`}
        />
        <h1
          className={`text-xl ml-3 font-medium ${sidebarOpen ? "scale-100" : "hidden"
            }`}
        >
          LMS
        </h1>
      </div>

      <ul>
        {teachermenu.map((menuItem, id) => (
          <div key={id}>
            <Link to={menuItem.path}>
              <li
                className={`text-slate-200 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:shadow-md hover:text-black duration-150 hover:bg-white rounded-md ${menuItem.spacing ? "mt-9" : "mt-2"
                  }`}
                onClick={menuItem.onClick}
              >
                <span className="text-2xl block float-left">
                  {<menuItem.icon /> ? <menuItem.icon /> : <RiDashboardFill />}
                </span>
                <span
                  className={`text-base font-medium flex-1 duration-300 ${!sidebarOpen && "hidden"
                    }`}
                >
                  {menuItem.title}
                </span>
              </li>
            </Link>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
