import React, { useState, useEffect } from "react";
import axios from "axios";

const Staff = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "Receptionist",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [users, setUsers] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("https://hackathon-backend-six-kappa.vercel.app/api/auth/getAllUsers");
        setUsers(response.data.users);
      } catch (error) {
        setErrorMessage("Error fetching users");
      }
    };
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://hackathon-backend-six-kappa.vercel.app/api/auth/register", formData);
      setSuccessMessage(response.data.message);
      setErrorMessage("");
      setFormData({ name: "", email: "", password: "", role: "Receptionist" });
      const newUsers = await axios.get("https://hackathon-backend-six-kappa.vercel.app/api/auth/getAllUsers");
      setUsers(newUsers.data.users);
      setShowForm(false);
    } catch (error) {
      setErrorMessage(error.response?.data?.error || "Something went wrong.");
      setSuccessMessage("");
    }
  };



  return (
    <div className="min-h-screen bg-gray-100">
      <div className="p-6 bg-blue-500 text-white text-2xl font-bold">Staff Dashboard</div>

      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            {showForm ? "Cancel" : "Add User"}
          </button>
        </div>

        {showForm && (
          <div className="bg-white p-6 rounded shadow-md mb-6">
            <h2 className="text-xl font-bold mb-4">Register New User</h2>
            {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
            {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}

            <form onSubmit={handleSubmit} className="grid gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium">Name:</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter Name"
                  className="w-full mt-1 p-2 border rounded"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium">Email:</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter Email"
                  className="w-full mt-1 p-2 border rounded"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium">Password:</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter Password"
                  className="w-full mt-1 p-2 border rounded"
                  required
                />
              </div>

              <div>
                <label htmlFor="role" className="block text-sm font-medium">Role:</label>
                <select
                  name="role"
                  id="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full mt-1 p-2 border rounded"
                  required
                >
                  <option value="Receptionist">Receptionist</option>
                  <option value="Finance Department">Finance Department</option>
                  <option value="Health Department">Health Department</option>
                  <option value="Education Department">Education Department</option>
                </select>
              </div>

              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Register
              </button>
            </form>
          </div>
        )}

        <div className="bg-white p-6 rounded shadow-md">
          <h2 className="text-xl font-bold mb-4">User List</h2>

          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 border">Name</th>
                <th className="py-2 px-4 border">Email</th>
                <th className="py-2 px-4 border">Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td className="py-2 px-4 border">{user.name}</td>
                  <td className="py-2 px-4 border">{user.email}</td>
                  <td className="py-2 px-4 border">{user.role}</td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Staff;
