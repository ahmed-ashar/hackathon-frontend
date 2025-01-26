import React, { useState } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post("https://hackathon-backend-six-kappa.vercel.app/api/auth/login", formData);

      const token = response.data.token;
      localStorage.setItem("authToken", token);
      Cookies.set("authToken", token, { expires: 7 });

      const decodedToken = jwtDecode(token);
      const userRole = decodedToken.role;

      setMessage("Login successful! Welcome back.");

      if (userRole === "Admin") {
        navigate("/dashboard");
      } else if (userRole === "Receptionist") {
        navigate("/receptionstDashboard");
      } else {
        navigate("/departmentDashboard");
      }
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-400 to-purple-500">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Please Log In</h1>
        <p className="text-center text-gray-500 mb-8">Please enter your credentials to log in.</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email address"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 transition duration-300 disabled:opacity-50"
          >
            {loading ? "Logging In..." : "Log In"}
          </button>
        </form>

        {message && (
          <p
            className={`mt-6 text-center ${message.includes("successful")
                ? "text-green-500"
                : "text-red-500"
              }`}
          >
            {message}
          </p>
        )}

        <p className="mt-6 text-center text-sm text-gray-500">
          Don't have an account?{" "}
          <Link to="/signup">
            <a
              href="/signup"
              className="text-purple-600 font-medium hover:underline"
            >
              Sign up here
            </a>
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginForm;
