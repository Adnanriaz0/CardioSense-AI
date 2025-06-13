// src/components/Register.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import RegisterHeader from "./RegisterHeader";
import UserTypeToggle from "./UserTypeToggle"; // Reusable from Login components
import RegistrationForm from "./RegistrationForm";
import AuthNavigationLink from "./AuthNavigationLink"; // For "Already have an account?" link

const Register = () => {
  const [userType, setUserType] = useState("patient");
  const [gender, setGender] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // New states for form inputs
  const [fullName, setFullName] = useState("");
  const [specificField, setSpecificField] = useState(""); // For specialization/age
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Yahan aap backend API call laga sakte ho
    // Example:
    console.log("Registering user:", {
      userType,
      fullName,
      specificField,
      gender,
      phoneNumber,
      email,
      password,
      confirmPassword,
    });

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Success hone ke baad redirect:
    console.log("User registered successfully!");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300 p-6">
      <div className="bg-white rounded-2xl shadow-lg p-10 w-full max-w-md">
        <RegisterHeader userType={userType} />
        <UserTypeToggle userType={userType} setUserType={setUserType} />
        <RegistrationForm
          userType={userType}
          gender={gender}
          setGender={setGender}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          showConfirmPassword={showConfirmPassword}
          setShowConfirmPassword={setShowConfirmPassword}
          onSubmit={handleSubmit}
          // Pass input states and setters
          fullName={fullName}
          setFullName={setFullName}
          specificField={specificField}
          setSpecificField={setSpecificField}
          phoneNumber={phoneNumber}
          setPhoneNumber={setPhoneNumber}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
        />
        <AuthNavigationLink
          text="Already have an account?"
          linkText="Login here"
          to="/login"
        />
      </div>
    </div>
  );
};

export default Register;