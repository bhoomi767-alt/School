import React, { useState } from "react";
import { API_BASE_URL } from "../config.js";
import {
  GraduationCap,
  User,
  Phone,
  BookOpen,
  Send,
} from "lucide-react";

export default function Admission() {

  const [form, setForm] = useState({
    name: "",
    phone: "",
    className: "",
    message: "",
  });

const handleSubmit = async (e) => {

  e.preventDefault();

  const response = await fetch(
    `${API_BASE_URL}/api/admission`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({

        name: form.name,

        mobile: form.phone,

        className: form.className,

        message: form.message

      })
    }
  );

  const data = await response.json();

  alert(data.message);

  setForm({
    name: "",
    phone: "",
    className: "",
    message: ""
  });

};

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#eef6ff] to-[#f8fbff] py-20 px-5">

      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">

        {/* Left Side */}
        <div>

          <div className="flex items-center gap-4 mb-6">

            <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center shadow-xl">

              <GraduationCap className="text-white" size={34} />

            </div>

            <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-700 to-cyan-500 bg-clip-text text-transparent">
              Admission Open
            </h1>
          </div>

          <p className="text-gray-600 text-lg leading-8 mb-8">
            Join New Sunrise Public School and give your child a bright future
            with quality education, discipline and modern learning.
          </p>

          <div className="space-y-5">

            <div className="bg-white rounded-2xl shadow-lg p-5 border border-blue-50">

              <h3 className="font-bold text-xl text-gray-800 mb-2">
                Smart Classrooms
              </h3>

              <p className="text-gray-600">
                Modern education environment with advanced learning methods.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-5 border border-blue-50">

              <h3 className="font-bold text-xl text-gray-800 mb-2">
                Experienced Teachers
              </h3>

              <p className="text-gray-600">
                Dedicated teachers focused on student success.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-5 border border-blue-50">

              <h3 className="font-bold text-xl text-gray-800 mb-2">
                Sports & Activities
              </h3>

              <p className="text-gray-600">
                Overall development through sports and cultural programs.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side Form */}
        <div className="bg-white/90 backdrop-blur-xl rounded-[35px] shadow-2xl p-8 md:p-10 border border-white/40">

          <h2 className="text-3xl font-bold text-gray-800 mb-3">
            Apply For Admission
          </h2>

          <p className="text-gray-500 mb-8">
            Fill the form and our team will contact you soon.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">

            <div className="relative">

              <User
                className="absolute left-4 top-4 text-blue-500"
                size={20}
              />

              <input
                type="text"
                placeholder="Student Name"
                value={form.name}
                onChange={(e) => {

const value = e.target.value.replace(/[^A-Za-z ]/g, "");

setForm({
  ...form,
  name: value
});

}}
                className="w-full bg-[#f8fbff] border border-blue-100 rounded-2xl pl-12 pr-4 py-4 outline-none focus:ring-4 focus:ring-cyan-100"
              />
            </div>

            <div className="relative">

              <Phone
                className="absolute left-4 top-4 text-blue-500"
                size={20}
              />

              <input
                type="text"
                placeholder="Mobile Number"
                value={form.phone}
               onChange={(e) => {

const value = e.target.value.replace(/[^0-9]/g, "").slice(0, 10);

setForm({
  ...form,
  phone: value
});

}}
                className="w-full bg-[#f8fbff] border border-blue-100 rounded-2xl pl-12 pr-4 py-4 outline-none focus:ring-4 focus:ring-cyan-100"
              />
            </div>

            <div className="relative">

              <BookOpen
                className="absolute left-4 top-4 text-blue-500"
                size={20}
              />

              <input
                type="text"
                placeholder="Class"
                value={form.className}
              onChange={(e) => {

const value = e.target.value.replace(/[^0-9]/g, "");

setForm({
  ...form,
  className: value
});

}}
                className="w-full bg-[#f8fbff] border border-blue-100 rounded-2xl pl-12 pr-4 py-4 outline-none focus:ring-4 focus:ring-cyan-100"
              />
            </div>

            <textarea
              rows="5"
              placeholder="Message..."
              value={form.message}
              onChange={(e) =>
                setForm({ ...form, message: e.target.value })
              }
              className="w-full bg-[#f8fbff] border border-blue-100 rounded-2xl px-5 py-4 outline-none focus:ring-4 focus:ring-cyan-100 resize-none"
            ></textarea>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 hover:scale-[1.02] transition duration-300 shadow-xl cursor-pointer"
            >

              <Send size={20} />

              Submit Admission
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}