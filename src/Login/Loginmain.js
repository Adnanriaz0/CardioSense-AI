// src/components/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginHeader from "./components/LoginHeader";
import UserTypeToggle from "./components/UserTypeToggle";
import LoginForm from "./components/LoginForm";
import ForgotPasswordModal from "./components/ForgotPasswordModal";
import AuthLinks from "./components/AuthLinks"; // For Register link


const Login = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState("patient");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showForgetModal, setShowForgetModal] = useState(false);
  const [forgetEmail, setForgetEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("User Type:", userType);
    console.log("Email:", email);
    console.log("Password:", password);

    if (userType === "doctor") {
      navigate("/doctor");
    } else {
      navigate("/patient");
    }
  };

  const handleForgetSubmit = (e) => {
    e.preventDefault();
    alert(`Password reset link sent to: ${forgetEmail}`);
    setForgetEmail("");
    setShowForgetModal(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300 p-6">
      <div className="bg-white rounded-2xl shadow-lg p-10 w-full max-w-md relative">
        <LoginHeader userType={userType} />
        <UserTypeToggle userType={userType} setUserType={setUserType} />
        <LoginForm
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          handleSubmit={handleSubmit}
        />
        <AuthLinks onForgotPasswordClick={() => setShowForgetModal(true)} />

        {showForgetModal && (
          <ForgotPasswordModal
            forgetEmail={forgetEmail}
            setForgetEmail={setForgetEmail}
            handleForgetSubmit={handleForgetSubmit}
            onClose={() => setShowForgetModal(false)}
          />
        )}
      </div>
    </div>
  );
};

export default Login;