
import React, { useState, useEffect } from "react";
import { User, Phone, Send, GraduationCap, X } from "lucide-react";

export default function VisitorGate() {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    interest: "General Enquiry"
  });

  useEffect(() => {
    const isRegistered = localStorage.getItem("visitor_registered");

    if (!isRegistered) {
      setShowModal(true);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {

      const response = await fetch(
        "https://school-s6ur.vercel.app/api/visitor",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            name: formData.name,
            mobile: formData.phone,
            interest: formData.interest
          })
        }
      );

      const data = await response.json();

      alert(data.message);

      localStorage.setItem("visitor_registered", "true");

      setShowModal(false);

    } catch (error) {

      console.log(error);

      alert("Something went wrong");

    } finally {

      setLoading(false);

    }
  };

  // DELETE / RESET
const handleDelete = () => {

  localStorage.removeItem("visitor_registered");

  setFormData({
    name: "",
    phone: "",
    interest: "General Enquiry"
  });

  setShowModal(true);

};

if (!showModal) {
  return null;
}



  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-md p-4">

      <div className="relative w-full max-w-xl overflow-hidden rounded-[35px] bg-white shadow-[0_20px_80px_rgba(0,0,0,0.25)]">

        {/* TOP DESIGN */}
        <div className="h-2 w-full bg-gradient-to-r from-blue-600 via-cyan-500 to-sky-400"></div>

        {/* CLOSE BUTTON */}
        <button
          onClick={() => setShowModal(false)}
          className="absolute top-5 right-5 w-10 h-10 rounded-full bg-slate-100 hover:bg-red-100 flex items-center justify-center transition-all duration-300"
        >
          <X size={18} className="text-slate-600" />
        </button>

        <div className="p-7 md:p-10">

          {/* LOGO */}
          <div className="flex flex-col items-center text-center">

            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center shadow-xl mb-5">

              <GraduationCap
                className="text-white"
                size={42}
              />

            </div>

            <h2 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-blue-700 to-cyan-500 bg-clip-text text-transparent">
              Student Portal
            </h2>

            <p className="text-slate-500 mt-3 text-sm md:text-base max-w-md leading-7">
              Register your details to access school
              resources, admission support and updates.
            </p>
          </div>

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="mt-10 space-y-5"
          >

            {/* NAME */}
            <div className="relative">

              <User
                className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500"
                size={20}
              />

              <input
                required
                type="text"
                value={formData.name}
                placeholder="Enter Full Name"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    name: e.target.value.replace(/[^A-Za-z\s]/g, "")
                  })
                }
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-4 py-4 outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-400 transition-all"
              />
            </div>

            {/* PHONE */}
            <div className="relative">

              <Phone
                className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500"
                size={20}
              />

              <input
                required
                type="text"
                maxLength="10"
                value={formData.phone}
                placeholder="Enter Mobile Number"
                onChange={(e) => {

                  const cleanedValue =
                    e.target.value.replace(/[^0-9]/g, "");

                  const limitedValue =
                    cleanedValue.slice(0, 10);

                  setFormData({
                    ...formData,
                    phone: limitedValue
                  });
                }}

                className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-4 py-4 outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-400 transition-all"
              />
            </div>

            {/* SELECT */}
            <div>

              <select
                value={formData.interest}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    interest: e.target.value
                  })
                }

                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-400 text-slate-700 transition-all cursor-pointer"
              >

                <option value="General Enquiry">
                  General Enquiry
                </option>

                <option value="Admission">
                  Admission Inquiry
                </option>

                <option value="Career">
                  Career Guidance
                </option>

              </select>

            </div>

            {/* BUTTON */}
            <button
              disabled={loading}
              type="submit"
              className={`w-full py-4 rounded-2xl text-white font-bold text-lg shadow-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                loading
                  ? "bg-slate-400"
                  : "bg-gradient-to-r from-blue-600 to-cyan-500 hover:scale-[1.02]"
              }`}
            >

              {loading ? (
                "Please wait..."
              ) : (
                <>
                  <Send size={19} />
                  Get Access
                </>
              )}

            </button>
          </form>

          {/* FOOTER */}
          <div className="mt-8 text-center">

            <p className="text-xs text-slate-400 leading-6">
              Your information is securely stored and
              protected by the school administration.
            </p>

          </div>

        </div>
      </div>
    </div>
  );
}