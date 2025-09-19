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
import { toast } from "react-toastify";

const LoginPage = () => {
  const [username, setUsername] = useState("emilys");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) navigate("/home");
  }, [navigate]);

  const validate = () => {
    const newErrors = {};
    if (username !== "emilys") newErrors.username = "Invalid username.";
    if (email && !/\S+@\S+\.\S+/.test(email))
      newErrors.email = "Invalid email format.";
    if (password.length < 8)
      newErrors.password = "Password must be at least 8 characters.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validate()) return;
    try {
      setLoading(true);
      const data = await loginUser({
        username,
        password,
        ...(email && { email }),
        expiresInMins: 30,
      });
      localStorage.setItem("user", JSON.stringify(data));
      toast.success("Login successful");
      navigate("/home");
    } catch (err) {
      toast.error("Invalid credentials. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-[color:var(--surface-2)] flex items-center">
      {loading && (
        <div className="fixed inset-0 z-50 bg-white/60 backdrop-blur-sm flex items-center justify-center">
          <div className="flex items-center gap-3 text-[#6358DC]">
            <svg
              className="animate-spin h-7 w-7"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              ></path>
            </svg>
            <span className="text-sm font-medium">Signing in...</span>
          </div>
        </div>
      )}
      <div className="mx-auto max-w-[1200px] px-6 py-0 flex items-center">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-8 lg:gap-x-24 items-center">
          {/* Left Illustration */}
          <div className="md:col-span-5 flex justify-center">
            <LoginImage className="w-full max-w-[500px] h-auto" />
          </div>

          {/* Right Card */}
          <div className="md:col-span-7 flex justify-end">
            <div className="w-full max-w-[640px] bg-[color:var(--surface)] rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.07),_0_2px_6px_rgba(0,0,0,0.05)] p-6 sm:p-8">
              {/* Heading */}
              <div className="mb-5">
                <h1 className="text-[34px] leading-[40px] font-semibold text-gray-900 tracking-tight">
                  Welcome to
                </h1>
                <div className="text-[36px] leading-[40px] font-extrabold text-[#6358DC] mt-2 tracking-tight">
                  Unstop
                </div>
              </div>

              {/* Social Login */}
              <div className="space-y-3">
                <SocialLoginButton
                  icon={GoogleImage}
                  text="Login with Google"
                />
                <SocialLoginButton icon={FbImage} text="Login with Facebook" />
              </div>

              {/* Divider */}
              <div className="flex items-center my-6">
                <span className="flex-1 h-px bg-gray-200" />
                <span className="mx-4 text-gray-500 text-sm">OR</span>
                <span className="flex-1 h-px bg-gray-200" />
              </div>

              {/* Inputs */}
              <div className="space-y-3">
                <InputField
                  type="text"
                  placeholder="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  icon={UserNameIcon}
                  label="User name"
                  disabled={loading}
                />
                <ErrorMessage message={errors.username} />

                <InputField
                  type="email"
                  placeholder="username@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  icon={EmailIcon}
                  label="Email (Optional)"
                  disabled={loading}
                />
                <ErrorMessage message={errors.email} />

                <InputField
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  icon={PasswordIcon}
                  label="Password"
                  disabled={loading}
                />
                <ErrorMessage message={errors.password} />
              </div>

              {/* Options */}
              <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-gray-600 mt-4 gap-2">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input type="checkbox" className="size-4 accent-[#6358DC]" />
                  <span>Remember me</span>
                </label>
                <button className="text-[#6358DC] hover:underline">
                  Forgot Password?
                </button>
              </div>

              {/* Login Button */}
              <button
                onClick={handleLogin}
                disabled={loading}
                className={`w-full mt-6 bg-[#6358DC] hover:bg-[#564cd1] transition text-white py-3 rounded-2xl text-[15px] font-medium ${
                  loading ? "opacity-80 cursor-wait" : "cursor-pointer"
                }`}
              >
                Login
              </button>

              {/* Register Link */}
              <p className="text-center text-sm text-gray-600 mt-4">
                Don’t have an account?{" "}
                <button className="text-[#6358DC] hover:underline font-medium">
                  Register
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
