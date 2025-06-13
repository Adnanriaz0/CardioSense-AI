import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [userType, setUserType] = useState("patient");
  const [gender, setGender] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate(); // 👈 React Router hook for navigation

  const handleSubmit = (e) => {
    e.preventDefault();

    // Yahan aap backend API call laga sakte ho
    // Success hone ke baad redirect:
    console.log("User registered successfully!");
    navigate("/login"); // 👈 Redirect to login page
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300 p-6">
      <div className="bg-white rounded-2xl shadow-lg p-10 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-blue-800 mb-6">
          Register as {userType === "doctor" ? "Doctor" : "Patient"}
        </h2>

        {/* Toggle Buttons */}
        <div className="flex justify-center space-x-4 mb-6">
          <button
            onClick={() => setUserType("patient")}
            className={`px-6 py-2 rounded-full font-semibold transition ${
              userType === "patient"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Patient
          </button>
          <button
            onClick={() => setUserType("doctor")}
            className={`px-6 py-2 rounded-full font-semibold transition ${
              userType === "doctor"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Doctor
          </button>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          {/* Conditional rendering for Doctor-specific field */}
          {userType === "doctor" ? (
            <input
              type="text"
              placeholder="Specialization" // Changed from Age to Specialization
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          ) : (
            <input
              type="number"
              placeholder="Age"
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          )}

          {/* Gender Input Styled Like Other Inputs with Radio Buttons Inline */}
          <div className="w-full px-4 py-2 border rounded-lg focus-within:ring-2 focus-within:ring-blue-400">
            <div className="flex items-center justify-between">
              <label className="text-gray-700 font-medium">Gender</label>
              <div className="flex space-x-4">
                <label className="flex items-center space-x-1 text-gray-700">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={gender === "male"}
                    onChange={(e) => setGender(e.target.value)}
                    required
                  />
                  <span>Male</span>
                </label>
                <label className="flex items-center space-x-1 text-gray-700">
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={gender === "female"}
                    onChange={(e) => setGender(e.target.value)}
                  />
                  <span>Female</span>
                </label>
                <label className="flex items-center space-x-1 text-gray-700">
                  <input
                    type="radio"
                    name="gender"
                    value="other"
                    checked={gender === "other"}
                    onChange={(e) => setGender(e.target.value)}
                  />
                  <span>Other</span>
                </label>
              </div>
            </div>
          </div>

          <input
            type="tel"
            placeholder="Phone Number"
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="email"
            placeholder="Email Address"
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-gray-600"
            >
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <span
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-gray-600"
            >
              {showConfirmPassword ? "🙈" : "👁️"}
            </span>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Register
          </button>
        </form>

        {/* Already have aaccount? */}
        <p className="text-center text-gray-600 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;