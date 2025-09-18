import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GoogleImage from "../SvgImages/GoogleImage";
import FbImage from "../SvgImages/FbImage";
import UserNameIcon from "../SvgImages/UserNameSvg";

import LoginImage from "../SvgImages/LoginImage";
import SocialLoginButton from "../components/SocialLoginButton";
import InputField from "../components/InputField";
import ErrorMessage from "../components/ErrorMessage";
import { loginUser } from "../services/authservice";
import EmailIcon from "../SvgImages/Email";
import PasswordIcon from "../SvgImages/Password";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) navigate("/home");
  }, [navigate]);

  const validate = () => {
    const newErrors = {};

    if (username !== "emilys") {
      newErrors.username = "Invalid username.";
    }

    if (email && !/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email format.";
    }

    if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validate()) return;

    try {
      const data = await loginUser({
        username,
        password,
        ...(email && { email }),
        expiresInMins: 30,
      });
      localStorage.setItem("user", JSON.stringify(data));
      navigate("/home");
    } catch (err) {
      alert("Invalid credentials. Try again.");
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-white">
      {/* Left Side Image */}
      <div className="flex w-full md:w-1/2 justify-center p-6 md:order-1 order-0">
        <LoginImage className="max-w-xs sm:max-w-sm md:max-w-lg w-full h-auto" />
      </div>

      {/* Right Side Form */}
      <div className="w-full md:w-1/2 flex justify-center p-4 md:order-2 order-1">
        <div className="w-full max-w-md border border-gray-200 rounded-lg shadow-md p-6 sm:p-8">
          {/* Heading */}
          <h1 className="text-4xl text-left font-bold">
            Welcome to <p className="text-[#6358DC]">Unstop</p>
          </h1>

          {/* Social Login */}
          <div className="mt-6 space-y-3">
            <SocialLoginButton icon={GoogleImage} text="Login with Google" />
            <SocialLoginButton icon={FbImage} text="Login with Facebook" />
          </div>

          {/* Divider */}
          <div className="flex items-center my-6">
            <hr className="flex-grow border-gray-300" />
            <span className="mx-3 text-gray-500 text-sm">OR</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          {/* Inputs */}
          <div className="space-y-4">
            <InputField
              type="text"
              placeholder="User name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              icon={UserNameIcon}
            />
            <ErrorMessage message={errors.username} />

            <InputField
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={EmailIcon}
            />
            <ErrorMessage message={errors.email} />

            <InputField
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={PasswordIcon}
            />
            <ErrorMessage message={errors.password} />
          </div>

          {/* Options */}
          <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-gray-600 mt-4 gap-2">
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="form-checkbox text-[#6358DC]" />
              <span>Remember me</span>
            </label>
            <div className="text-[#6358DC]  cursor-pointer">
              Forgot Password?
            </div>
          </div>

          {/* Login Button */}
          <button
            onClick={handleLogin}
            className="w-full mt-6 bg-[#6358DC] text-white py-2 rounded-xl cursor-pointer"
          >
            Login
          </button>

          {/* Register Link */}
          <p className="text-center text-sm  mt-4">
            Don’t have an account?
            <span className="text-[#6358DC] font-medium  cursor-pointer">
              Register
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
