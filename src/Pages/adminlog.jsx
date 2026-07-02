import React, { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config";
import { Eye, EyeOff, ShieldCheck, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");
  const [forgotMode, setForgotMode] = useState(false);
const [step, setStep] = useState(1);

const [email, setEmail] = useState("");
const [otp, setOtp] = useState("");
const [newPassword, setNewPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");

const login = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch(`${API_BASE_URL}/api/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        number: mobile,   // IMPORTANT FIX
        password
      })
    });

    const data = await res.json();

    if (res.status === 200) {
      alert("Login successful");

      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);

      console.log("User:", data.user);

      // 👇 ROLE BASED NAVIGATION (MAIN FIX)
      if (data.role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/profile");
      }

    } else {
      alert(data.message || "Login failed");
    }

  } catch (err) {
    console.error(err);
    alert("Server error");
  }
};

//   forget password
const sendOTP = async () => {
  try {
    await axios.post(`${API_BASE_URL}/api/admin/send-otp`, {
      email,
    });

    alert("OTP Sent Successfully");
    setStep(2);
  } catch (err) {
    alert(err.response?.data?.message || "Failed to send OTP");
  }
};

const resetPassword = async () => {
  if (newPassword !== confirmPassword) {
    return alert("Passwords do not match");
  }

  try {
    await axios.post(`${API_BASE_URL}/api/admin/verify-otp-reset`, {
      email,
      otp,
      newPassword,
    });

    alert("Password Changed Successfully");

    setForgotMode(false);
    setStep(1);

    setEmail("");
    setOtp("");
    setNewPassword("");
    setConfirmPassword("");
  } catch (err) {
    alert(err.response?.data?.message || "Reset Failed");
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-cyan-100 flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-white rounded-[30px] shadow-2xl border border-sky-100 overflow-hidden">

        {/* Top */}

        <div className="bg-gradient-to-r from-sky-500 to-cyan-400 p-8 text-center">

          <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center mx-auto shadow-lg">

            <ShieldCheck size={42} className="text-sky-600" />

          </div>

          <h1 className="text-3xl font-bold text-white mt-5">
            Welcome Back
          </h1>

          <p className="text-sky-100 mt-2">
            Administrator Login
          </p>

        </div>

        {/* Form */}

        {!forgotMode && (
  <form onSubmit={login} className="p-8">

          {error && (

            <div className="bg-red-100 border border-red-300 text-red-700 rounded-xl p-3 mb-5 text-sm">

              {error}

            </div>

          )}

          <div className="mb-5">

            <label className="text-gray-700 font-semibold">
              Mobile Number
            </label>

            <input
              type="text"
              maxLength={10}
              value={mobile}
              onChange={(e) =>
                setMobile(e.target.value.replace(/\D/g, ""))
              }
              placeholder="Enter Mobile Number"
              className="mt-2 w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-sky-400"
              required
            />

          </div>

          <div className="mb-3">

            <label className="text-gray-700 font-semibold">
              Password
            </label>

            <div className="relative mt-2">

              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
                className="w-full border cursor-pointer border-gray-300 rounded-xl px-4 py-3 pr-12 outline-none focus:ring-2 focus:ring-sky-400"
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-3 right-4 text-gray-500 cursor-pointer"
              >
                {showPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>

            </div>

          </div>

          <div className="flex justify-between items-center mb-6">

            <label className="flex items-center gap-2 text-sm text-gray-600">

              <input
                type="checkbox"
                checked={remember}
                onChange={() => setRemember(!remember)}
              />

              Remember Me

            </label>

            <button
              type="button"
             onClick={() => {
  setForgotMode(true);
  setStep(1);
}}
              className="text-sky-600 hover:underline text-sm font-medium cursor-pointer"
            >
              Forgot Password?
            </button>

          </div>

          {/* <button
            type="submit"
            disabled={loading}
            className="w-full bg-sky-500 hover:bg-sky-600 transition text-white font-bold py-3 rounded-xl cursor-pointer"
          >
            {loading ? "Logging In..." : "Login"}
          </button> */}
         <button
  type="submit"
  className="w-full bg-sky-500 hover:bg-sky-600 transition text-white font-bold py-3 rounded-xl cursor-pointer"
>
  Login
</button>

          <button
            type="button"
            onClick={() => navigate("/")}
            className="mt-5 w-full text-sky-600"
          >
            <ArrowLeft size={18} />
            Back to Website
          </button>

          </form>
)}

{/* forgetui */}
{forgotMode && (
  <div className="p-6 sm:p-8 w-full max-w-md mx-auto">

    <h2 className="text-xl sm:text-2xl font-bold text-center mb-6">
      Forgot Password
    </h2>

    {/* STEP 1 - EMAIL */}
    {step === 1 && (
      <div className="space-y-4">

        <input
          type="email"
          placeholder="Enter Registered Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gray-300 p-3 rounded-xl 
                     focus:ring-2 focus:ring-sky-400 outline-none"
        />

        <button
          type="button"
          onClick={sendOTP}
          className="w-full bg-sky-500 hover:bg-sky-600 
                     text-white py-3 rounded-xl transition font-semibold cursor-pointer"
        >
          Send OTP
        </button>

      </div>
    )}

    {/* STEP 2 - RESET PASSWORD */}
    {step === 2 && (
      <div className="space-y-4">

        <input
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full border border-gray-300 p-3 rounded-xl 
                     focus:ring-2 focus:ring-sky-400 outline-none"
        />

        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full border border-gray-300 p-3 rounded-xl 
                     focus:ring-2 focus:ring-sky-400 outline-none"
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full border border-gray-300 p-3 rounded-xl 
                     focus:ring-2 focus:ring-sky-400 outline-none"
        />

        <button
          type="button"
          onClick={resetPassword}
          className="w-full bg-green-500 hover:bg-green-600 
                     text-white py-3 rounded-xl transition font-semibold cursor-pointer"
        >
          Reset Password
        </button>

      </div>
    )}

    {/* BACK BUTTON */}
    <button
      type="button"
      onClick={() => {
        setForgotMode(false);
        setStep(1);
      }}
      className="mt-6 w-full text-sky-600 hover:underline text-sm sm:text-base cursor-pointer"
    >
      ← Back to Login
    </button>

  </div>
)}

      </div>

    </div>
  );
}
