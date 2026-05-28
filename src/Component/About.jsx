// export default function About(){
//     return(
//         <div className="w-full relative bg-[#93c5fd] py-16 px-5 overflow-hidden">

//             {/* 🔝 CONTENT (UPPER LAYER) */}
//             <div className="relative z-10 max-w-6xl mx-auto grid md:grid-cols-2 gap-5">

//                 {/* LEFT SIDE */}
//                 <div>
//                     <h1 className="text-3xl font-bold mb-4 text-black">
//                         About Our School
//                     </h1>

//                     <p className="text-gray-600 mb-5">
//                         Our school focuses on quality education, discipline, and overall development of students. 
//                         We aim to build a strong foundation for a bright future.
//                     </p>

//                     <button className="bg-blue-600 text-white px-5 py-2 cursor-pointer rounded hover:bg-blue-800">
//                         Learn More
//                     </button>
//                 </div>

//                 {/* RIGHT SIDE - EVENTS */}
//                 <div className="bg-gray-200 p-5 rounded-xl shadow-md md:ml-60 cursor-pointer">
//                     <h2 className="text-xl font-bold mb-4">
//                         Upcoming Events
//                     </h2>

//                     <div className="mb-3 p-3 bg-white rounded">
//                         <p className="font-semibold">Science Exhibition</p>
//                         <p className="text-sm text-gray-500">June 5, 2024</p>
//                     </div>

//                     <div className="mb-3 p-3 bg-white rounded">
//                         <p className="font-semibold">Sports Day</p>
//                         <p className="text-sm text-gray-500">July 15, 2024</p>
//                     </div>

//                     <div className="p-3 bg-white rounded">
//                         <p className="font-semibold">Annual Function</p>
//                         <p className="text-sm text-gray-500">August 20, 2024</p>
//                     </div>
//                 </div>

//             </div>

//             {/* 🌊 WAVE (BACKGROUND - LOWER LAYER) */}
//             <svg 
//                 className="absolute bottom-0 left-0 w-full h-40 z-0"
//                 viewBox="0 0 100 100"
//                 preserveAspectRatio="none"
//             >
//                 <defs>
//                     <linearGradient id="waveGradient" x1="0" y1="0" x2="0" y2="1">
//                         <stop offset="0%" stopColor="#93c5fd" />
//                         <stop offset="100%" stopColor="#fef9c3" />
//                     </linearGradient>
//                 </defs>

//                 <path 
//                     d="M0,0 L100,0 C35,100 65,0 100,100 L0,100 Z" 
//                     fill="url(#waveGradient)"
//                 />
//             </svg>

//         </div>
//     )
// }

import React from "react";
import { motion } from "framer-motion";

export default function About() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-sky-100 to-cyan-50 py-20 px-6">
      
      {/* Background Blur */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-200 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-cyan-200 rounded-full blur-3xl opacity-30"></div>

      <div className="relative z-10 max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">

        {/* LEFT SIDE */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <span className="bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm font-semibold">
            About Us
          </span>

          <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-700 via-sky-500 to-cyan-500 bg-clip-text text-transparent mt-5  leading-tight">
            Building Bright Futures Through Quality Education
          </h1>

          <p className="text-slate-600 mt-6 text-lg leading-relaxed">
            Our school focuses on academic excellence, discipline, creativity,
            and overall personality development. We provide modern learning
            facilities and a supportive environment to help every student
            achieve success.
          </p>

          <button className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-7 py-3 rounded-2xl shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer">
            Learn More
          </button>
        </motion.div>

        {/* RIGHT SIDE */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-xl border border-white/50"
        >
          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 bg-clip-text text-transparent mb-6">
            Upcoming Events
          </h2>

          <div className="space-y-4">

            <div className="bg-blue-50 hover:bg-blue-100 transition p-5 rounded-2xl border border-blue-100">
              <p className="font-bold text-gray-800">
                Science Exhibition
              </p>
              <p className="text-sm text-gray-500 mt-1">
                June 5, 2024
              </p>
            </div>

            <div className="bg-green-50 hover:bg-green-100 transition p-5 rounded-2xl border border-green-100">
              <p className="font-bold text-gray-800">
                Sports Day
              </p>
              <p className="text-sm text-gray-500 mt-1">
                July 15, 2024
              </p>
            </div>

            <div className="bg-purple-50 hover:bg-purple-100 transition p-5 rounded-2xl border border-purple-100">
              <p className="font-bold text-gray-800">
                Annual Function
              </p>
              <p className="text-sm text-gray-500 mt-1">
                August 20, 2024
              </p>
            </div>

          </div>
        </motion.div>
      </div>

      {/* Bottom Wave
      <svg
        className="absolute bottom-0 left-0 w-full h-32"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <path
          fill="#ffffff"
          fillOpacity="0.7"
          d="M0,192L60,197.3C120,203,240,213,360,202.7C480,192,600,160,720,165.3C840,171,960,213,1080,218.7C1200,224,1320,192,1380,176L1440,160L1440,320L0,320Z"
        ></path>
      </svg> */}
    </section>
  );
}