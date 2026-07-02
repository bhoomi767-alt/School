import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config.js";

export default function Login() {
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");


  const navigate = useNavigate();


const handleLogin = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ number, password })
      });

      const data = await res.json();

      if (res.status === 200) {
      alert("Login successful");
      console.log("Backend Data:", data.user);

      // Sara data localStorage mein save karein
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      localStorage.setItem("studentName", data.user.name);
      localStorage.setItem("studentNumber", data.user.number);
      localStorage.setItem("studentRoll", data.user.rollNo);
      localStorage.setItem("studentPhoto", data.user.photo);
      localStorage.setItem("feesStatus", data.user.feesStatus);
      localStorage.setItem("studentClass", data.user.class || data.user.studentClass || "Not Assigned");
      localStorage.setItem("studentId", data.user._id); // Ye line zaroor dalein payment history ke liye
      localStorage.setItem("studentAttendance", data.user.attendance || "0");
      localStorage.setItem("studentPercentage", data.user.percentage || "0");

      // Role ke hisab se navigate karein
      if (data.role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/profile");
      }
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Unable to reach the server. Please make sure the backend is running on port 3000.");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-blue-50">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-[400px]">
        <h1 className="text-3xl font-bold text-center text-blue-900 mb-6">
          Student Login
        </h1>

        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          placeholder="Enter Number"
          className="w-full border p-3 rounded-lg mb-4"
          value={number}
          onChange={(e) => {
            const sanitized = e.target.value.replace(/\D/g, "").slice(0, 10);
            setNumber(sanitized);
          }}
        />

        <input
          type="password"
          placeholder="Enter Password"
          className="w-full border p-3 rounded-lg mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin} className="w-full cursor-pointer bg-yellow-400 py-3 rounded-lg font-semibold">
          Login
        </button>
      </div>
    </div>
  );
}


// "build": "parcel build src/index.html",