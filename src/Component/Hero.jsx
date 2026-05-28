
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Hero() {
   const navigate = useNavigate();
  return (
    <section
      className="relative w-full min-h-[75vh] md:min-h-screen flex items-center justify-center overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1600')",
      }}
    >
      {/* Overlay */}
     <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/50 to-black/80"></div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto animate-fadeUp">

        {/* Tag */}
        <div className="inline-block mb-5 px-4 py-1 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-sm text-blue-100 tracking-wide shadow-lg">
          ✨ Excellence • Discipline • Innovation
        </div>

        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold leading-tight text-white drop-shadow-lg">
          Welcome to
          <span className="block bg-gradient-to-r from-blue-200 via-cyan-100 to-blue-400 bg-clip-text text-transparent">
            New Sunrise Public School
          </span>
        </h1>

        {/* Paragraph */}
        <p className="mt-6 text-base sm:text-lg md:text-xl text-slate-200 max-w-2xl mx-auto leading-relaxed">
          Empowering young minds through modern education,
          creativity, leadership, and lifelong learning experiences.
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mt-10">

          <button
           onClick={() => navigate("/admission")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full text-sm md:text-base font-semibold shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer">
            Apply Now
          </button>

          <button
            onClick={() => navigate("/about")}
            className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white px-8 py-3 rounded-full text-sm md:text-base font-semibold transition-all duration-300 hover:scale-105 cursor-pointer">
            Learn More
          </button>
        </div>

        {/* Stats */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-5">

          <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-5 hover:scale-105 transition duration-300">
            <h3 className="text-2xl font-bold text-white">500+</h3>
            <p className="text-sm text-slate-200 mt-1">Students</p>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-5 hover:scale-105 transition duration-300">
            <h3 className="text-2xl font-bold text-white">40+</h3>
            <p className="text-sm text-slate-200 mt-1">Teachers</p>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-5 hover:scale-105 transition duration-300">
            <h3 className="text-2xl font-bold text-white">25+</h3>
            <p className="text-sm text-slate-200 mt-1">Awards</p>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-5 hover:scale-105 transition duration-300">
            <h3 className="text-2xl font-bold text-white">100%</h3>
            <p className="text-sm text-slate-200 mt-1">Success Rate</p>
          </div>
        </div>
      </div>

      {/* Bottom Fade */}
      {/* <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#e6f0fa] to-transparent"></div> */}

      {/* Animation */}
      <style>
        {`
          @keyframes fadeUp {
            from {
              opacity: 0;
              transform: translateY(40px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .animate-fadeUp {
            animation: fadeUp 1.2s ease forwards;
          }
        `}
      </style>
    </section>
  );
}