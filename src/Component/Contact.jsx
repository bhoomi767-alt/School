// export default function Contact() {
//   return (
//     <div className="w-full py-20 px-4 bg-gradient-to-r from-[#e6f0fa] to-[#f3ebe5]">

//       <div className="max-w-5xl mx-auto text-center">
        
//         <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a8a]">
//           Contact Us
//         </h2>
//         <p className="text-[#374151] mt-3">
//           Get in touch with us for admissions and inquiries
//         </p>

//       </div>

//       <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 mt-12">

//         {/* Contact Info */}
//         <div className="space-y-6 text-[#374151]">

//           <p><span className="font-semibold text-[#1f2937]">📍 Address:</span> Rewa , MP</p>

//           <p><span className="font-semibold text-[#1f2937]">📞 Phone:</span> +91 9876543210</p>

//           <p><span className="font-semibold text-[#1f2937]">📧 Email:</span> school@email.com</p>

//         </div>

//         {/* Contact Form */}
//         <form className="space-y-4">

//           <input 
//             type="text" 
//             placeholder="Your Name" 
//             className="w-full p-3 border border-gray-300 rounded-md outline-none focus:border-blue-400"
//           />

//           <input 
//             type="email" 
//             placeholder="Your Email" 
//             className="w-full p-3 border border-gray-300 rounded-md outline-none focus:border-blue-400"
//           />

//           <textarea 
//             placeholder="Your Message" 
//             rows="4"
//             className="w-full p-3 border border-gray-300 rounded-md outline-none focus:border-blue-400"
//           ></textarea>

//           <button 
//             className="w-full bg-[#1e3a8a] text-white py-3 rounded-md hover:bg-blue-700 transition"
//           >
//             Send Message
//           </button>

//         </form>

//       </div>

//     </div>
//   );
// }

import React, { useEffect, useRef, useState } from "react";

export default function Contact() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  // Scroll Animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-20 px-5 bg-gradient-to-br from-blue-50 via-sky-100 to-cyan-50"
    >
      {/* Background Blur */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-cyan-200/30 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* Heading */}
        <div
          className={`text-center transition-all duration-1000 ${
            visible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <span className="bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm font-semibold">
            Get In Touch
          </span>

          <h2 className="mt-5 text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-fuchsia-600 via-pink-500 to-orange-400 bg-clip-text text-transparent">
            Contact Us
          </h2>

          <p className="text-slate-600 mt-4 text-lg">
            Get in touch with us for admissions and inquiries
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid md:grid-cols-2 gap-10 mt-16">

          {/* Contact Info */}
          <div
            className={`bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-white/60 transition-all duration-1000 ${
              visible
                ? "opacity-100 -translate-x-0"
                : "opacity-0 -translate-x-16"
            }`}
          >
            <h3 className="text-2xl font-bold text-slate-800 mb-8">
              Contact Information
            </h3>

            <div className="space-y-6">

              <div className="flex items-center gap-4 group">
                <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center text-2xl group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                  📍
                </div>

                <div>
                  <p className="font-semibold text-slate-800">Address</p>
                  <p className="text-slate-500">Rewa, MP</p>
                </div>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="w-14 h-14 rounded-2xl bg-cyan-100 flex items-center justify-center text-2xl group-hover:bg-cyan-600 group-hover:text-white transition-all duration-300">
                  📞
                </div>

                <div>
                  <p className="font-semibold text-slate-800">Phone</p>
                  <p className="text-slate-500">+91 9876543210</p>
                </div>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="w-14 h-14 rounded-2xl bg-pink-100 flex items-center justify-center text-2xl group-hover:bg-pink-600 group-hover:text-white transition-all duration-300">
                  📧
                </div>

                <div>
                  <p className="font-semibold text-slate-800">Email</p>
                  <p className="text-slate-500">school@email.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div
            className={`bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-white/60 transition-all duration-1000 delay-300 ${
              visible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-16"
            }`}
          >
            <h3 className="text-2xl font-bold text-slate-800 mb-8">
              Send Message
            </h3>

            <form className="space-y-5">

              <input
                type="text"
                placeholder="Your Name"
                className="w-full p-4 rounded-2xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-300 transition-all"
              />

              <input
                type="email"
                placeholder="Your Email"
                className="w-full p-4 rounded-2xl border border-slate-200 outline-none focus:ring-2 focus:ring-cyan-300 transition-all"
              />

              <textarea
                rows="5"
                placeholder="Your Message"
                className="w-full p-4 rounded-2xl border border-slate-200 outline-none focus:ring-2 focus:ring-pink-300 transition-all"
              ></textarea>

              <button
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-500 text-white font-semibold shadow-lg hover:scale-[1.02] hover:shadow-cyan-300/40 transition-all duration-300 cursor-pointer"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}