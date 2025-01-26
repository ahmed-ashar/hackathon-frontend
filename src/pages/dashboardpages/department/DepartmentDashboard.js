import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DepartmentDashboard = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    token: "",
    department: "",
    action: "",
    remarks: "",
    status: "",
    solution: "",
  });

  const [beneficiaryData, setBeneficiaryData] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("https://hackathon-backend-six-kappa.vercel.app/api/beneficiaries/get-user", form);
      setSuccess(response.data.message);
      setBeneficiaryData(response.data.user);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred.");
      setSuccess("");
      setBeneficiaryData(null);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex justify-between items-center p-4 bg-blue-600 text-white">
        <h1 className="text-3xl font-bold">Department Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      <div className="container mx-auto flex p-6">
        <div className="w-full md:w-1/2 bg-white p-6 rounded shadow-md">
          <h2 className="text-2xl font-bold mb-6">Update Beneficiary</h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          {success && <p className="text-green-500 mb-4">{success}</p>}

          <form onSubmit={handleSubmit} className="grid gap-4">
            <div>
              <label htmlFor="token" className="block text-sm font-medium">
                Token:
              </label>
              <input
                type="text"
                name="token"
                id="token"
                value={form.token}
                onChange={handleChange}
                placeholder="Enter Token"
                className="w-full mt-1 p-2 border rounded"
                required
              />
            </div>
            <div>
              <label htmlFor="department" className="block text-sm font-medium">
                Department:
              </label>
              <input
                type="text"
                name="department"
                id="department"
                value={form.department}
                onChange={handleChange}
                placeholder="Enter Department"
                className="w-full mt-1 p-2 border rounded"
              />
            </div>
            <div>
              <label htmlFor="action" className="block text-sm font-medium">
                Action:
              </label>
              <input
                type="text"
                name="action"
                id="action"
                value={form.action}
                onChange={handleChange}
                placeholder="Enter Action"
                className="w-full mt-1 p-2 border rounded"
              />
            </div>
            <div>
              <label htmlFor="remarks" className="block text-sm font-medium">
                Remarks:
              </label>
              <input
                type="text"
                name="remarks"
                id="remarks"
                value={form.remarks}
                onChange={handleChange}
                placeholder="Enter Remarks"
                className="w-full mt-1 p-2 border rounded"
              />
            </div>
            <div>
              <label htmlFor="status" className="block text-sm font-medium">
                Status:
              </label>
              <input
                type="text"
                name="status"
                id="status"
                value={form.status}
                onChange={handleChange}
                placeholder="Enter Status"
                className="w-full mt-1 p-2 border rounded"
              />
            </div>
            <div>
              <label htmlFor="solution" className="block text-sm font-medium">
                Solution:
              </label>
              <input
                type="text"
                name="solution"
                id="solution"
                value={form.solution}
                onChange={handleChange}
                placeholder="Enter Solution"
                className="w-full mt-1 p-2 border rounded"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Submit
            </button>
          </form>
        </div>

        <div className="w-full md:w-1/2 bg-gray-50 p-6 rounded shadow-md ml-4">
          <h2 className="text-2xl font-bold mb-6">Beneficiary Details</h2>
          {beneficiaryData ? (
            <div>
              <p>
                <strong>Token:</strong> {beneficiaryData._id}
              </p>
              <p>
                <strong>Name:</strong> {beneficiaryData.name}
              </p>
              <p>
                <strong>CNIC:</strong> {beneficiaryData.cnic}
              </p>
              <p>
                <strong>Phone:</strong> {beneficiaryData.phone}
              </p>
              <p>
                <strong>Address:</strong> {beneficiaryData.address}
              </p>
              <p>
                <strong>Purpose:</strong> {beneficiaryData.purpose}
              </p>
              <h3 className="mt-4 font-semibold">History:</h3>
              <ul>
                {beneficiaryData.history.map((entry, index) => (
                  <li key={index} className="mt-2 border-b pb-2">
                    <p>
                      <strong>Department:</strong> {entry.department}
                    </p>
                    <p>
                      <strong>Action:</strong> {entry.action}
                    </p>
                    <p>
                      <strong>Remarks:</strong> {entry.remarks}
                    </p>
                    <p>
                      <strong>Status:</strong> {entry.status}
                    </p>
                    <p>
                      <strong>Solution:</strong> {entry.solution}
                    </p>
                    <p>
                      <strong>Timestamp:</strong>{" "}
                      {new Date(entry.timestamp).toLocaleString()}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p>No data to display. Submit a form to fetch details.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DepartmentDashboard;
