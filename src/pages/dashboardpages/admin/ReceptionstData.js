import React, { useState, useEffect } from "react";
import axios from "axios";
import QRCode from "react-qr-code";

const ReceptionstData = () => {

  const [form, setForm] = useState({
    cnic: "",
    name: "",
    phone: "",
    address: "",
    purpose: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [userDetails, setUserDetails] = useState(null);
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const fetchBeneficiaries = async () => {
      try {
        const response = await axios.get("https://hackathon-backend-six-kappa.vercel.app/api/beneficiaries/beneficiaries");
        setBeneficiaries(response.data.users || []);
      } catch (err) {
        console.error("Error fetching beneficiaries:", err);
        setError("Failed to load beneficiaries.");
        setBeneficiaries([]);
      }
    };
    fetchBeneficiaries();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.cnic || !form.name || !form.phone || !form.address || !form.purpose) {
      setError("All fields are required.");
      setSuccess("");
      return;
    }

    setError("");

    try {
      const response = await axios.post("https://hackathon-backend-six-kappa.vercel.app/api/beneficiaries/add", form);

      setSuccess(response.data.message);
      setUserDetails({
        ...response.data.user,
        token: response.data.token,
      });

      setBeneficiaries([...beneficiaries, response.data.user]);

      setForm({
        cnic: "",
        name: "",
        phone: "",
        address: "",
        purpose: "",
      });
      setDialogOpen(false);
    } catch (err) {
      console.error("Error:", err.response?.data);
      setError(err.response?.data?.error || "An error occurred. Please try again.");
      setSuccess("");
    }
  };

  

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-center text-blue-700">Receptionist Data</h1>

      </div>

      <div className="flex justify-between items-start">
        <div className="w-full bg-white p-8 rounded shadow-md">
          <button
            onClick={() => setDialogOpen(true)}
            className="bg-green-600 text-white p-2 rounded hover:bg-green-700 mb-4"
          >
            Add Beneficiary
          </button>

          {error && <p className="text-red-500 mb-4">{error}</p>}
          {success && <p className="text-green-500 mb-4">{success}</p>}

          <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 p-2">CNIC</th>
                <th className="border border-gray-300 p-2">Name</th>
                <th className="border border-gray-300 p-2">Phone</th>
              </tr>
            </thead>
            <tbody>
              {beneficiaries && beneficiaries.length > 0 ? (
                beneficiaries.map((beneficiary) => (
                  <tr key={beneficiary._id}>
                    <td className="border border-gray-300 p-2">{beneficiary.cnic}</td>
                    <td className="border border-gray-300 p-2">{beneficiary.name}</td>
                    <td className="border border-gray-300 p-2">{beneficiary.phone}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center text-red-500">No beneficiaries found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="ml-8">
          {userDetails && userDetails.token ? (
            <div className="bg-white p-4 rounded shadow-md">
              <h2 className="text-lg font-semibold mb-4">Token and QR Code</h2>
              <div className="mb-4">
                <strong>Token:</strong>
                <p className="text-gray-700">{userDetails.token}</p>
              </div>

              <div className="text-center">
                <QRCode value={userDetails.token} size={128} />
              </div>
            </div>
          ) : (
            <p className="text-gray-500">No token available</p>
          )}
        </div>
      </div>

      {dialogOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded shadow-md w-1/3">
            <h2 className="text-2xl font-bold mb-6">Beneficiary Form</h2>
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="cnic" className="block text-sm font-medium text-gray-700">
                  CNIC:
                </label>
                <input
                  type="text"
                  name="cnic"
                  id="cnic"
                  value={form.cnic}
                  onChange={handleChange}
                  placeholder="Enter CNIC"
                  required
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                />
              </div>

              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name:
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter Name"
                  required
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Phone:
                </label>
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Enter Phone"
                  required
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                />
              </div>

              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                  Address:
                </label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="Enter Address"
                  required
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                />
              </div>

              <div>
                <label htmlFor="purpose" className="block text-sm font-medium text-gray-700">
                  Purpose:
                </label>
                <input
                  type="text"
                  name="purpose"
                  id="purpose"
                  value={form.purpose}
                  onChange={handleChange}
                  placeholder="Enter Purpose"
                  required
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                />
              </div>

              <button
                type="submit"
                className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 mt-4"
              >
                Submit
              </button>
            </form>

            <button
              onClick={() => setDialogOpen(false)}
              className="text-red-600 mt-4 block"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReceptionstData;
