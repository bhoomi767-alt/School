
import { GraduationCap, MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-r from-[#dbeafe] via-[#e0f2fe] to-[#f3e8ff] text-slate-700">

      {/* Blur Background */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-200/30 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-14">

        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 border-b border-white/40 pb-10">

          {/* School Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 text-white p-2 rounded-xl shadow-md">
                <GraduationCap size={24} />
              </div>

              <div>
                <h2 className="text-2xl font-bold text-slate-800">
                  Sunrise Public School
                </h2>
                <p className="text-sm text-slate-500">
                  Building Bright Futures
                </p>
              </div>
            </div>

            <p className="text-sm leading-relaxed text-slate-600">
              We provide quality education with modern learning methods,
              discipline, and holistic student development for a successful future.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-slate-800 mb-5">
              Quick Links
            </h3>

            <ul className="space-y-3 text-sm text-slate-600">
              <li className="hover:text-blue-600 transition cursor-pointer">
                Home
              </li>

              <li className="hover:text-blue-600 transition cursor-pointer">
                About Us
              </li>

              <li className="hover:text-blue-600 transition cursor-pointer">
                Gallery
              </li>

              <li className="hover:text-blue-600 transition cursor-pointer">
                Contact
              </li>

              <li className="hover:text-blue-600 transition cursor-pointer">
                Admissions
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-slate-800 mb-5">
              Contact Info
            </h3>

            <div className="space-y-4 text-sm text-slate-600">

              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-blue-600 mt-0.5" />
                <p>Rewa, Madhya Pradesh, India</p>
              </div>

              <div className="flex items-center gap-3">
                <Phone size={18} className="text-blue-600" />
                <p>+91 9876543210</p>
              </div>

              <div className="flex items-center gap-3">
                <Mail size={18} className="text-blue-600" />
                <p>school@email.com</p>
              </div>
            </div>
          </div>

          {/* Social + Developer */}
          <div>
            <h3 className="text-lg font-semibold text-slate-800 mb-5">
              Connect With Us
            </h3>

            <div className="flex gap-4 mb-6">

              {/* GitHub */}
              <a
                href="https://github.com/bhoomi767-alt"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/70 backdrop-blur-sm p-3 rounded-xl shadow-md hover:scale-110 hover:bg-blue-100 transition duration-300"
              >
                <svg className="size-5 fill-slate-700" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 
                  0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577
                  v-2.234c-3.338.726-4.033-1.416-4.033-1.416
                  -.546-1.387-1.333-1.756-1.333-1.756
                  -1.089-.745.083-.729.083-.729
                  1.205.084 1.839 1.237 1.839 1.237
                  1.07 1.834 2.807 1.304 3.492.997
                  .107-.775.418-1.305.762-1.604
                  -2.665-.305-5.467-1.334-5.467-5.931
                  0-1.311.469-2.381 1.236-3.221
                  -.124-.303-.535-1.524.117-3.176
                  0 0 1.008-.322 3.301 1.23
                  .957-.266 1.983-.399 3.003-.404
                  1.02.005 2.047.138 3.006.404
                  2.291-1.552 3.297-1.23 3.297-1.23
                  .653 1.653.242 2.874.118 3.176
                  .77.84 1.235 1.911 1.235 3.221
                  0 4.609-2.807 5.624-5.479 5.921
                  .43.372.823 1.102.823 2.222
                  v3.293c0 .319.192.694.801.576
                  4.765-1.589 8.199-6.086 8.199-11.386
                  0-6.627-5.373-12-12-12z" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/bhoomi-dubey-70819831a"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/70 backdrop-blur-sm p-3 rounded-xl shadow-md hover:scale-110 hover:bg-blue-100 transition duration-300"
              >
                <svg className="size-5 fill-blue-600" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 
                  2.239-5 5v14c0 2.761 2.239 5 
                  5 5h14c2.762 0 5-2.239 
                  5-5v-14c0-2.761-2.238-5-5-5zm-11 
                  19h-3v-11h3v11zm-1.5-12.268
                  c-.966 0-1.75-.79-1.75-1.764
                  s.784-1.764 1.75-1.764 
                  1.75.79 1.75 1.764-.783 
                  1.764-1.75 1.764zm13.5 
                  12.268h-3v-5.604c0-3.368-4-3.113-4 
                  0v5.604h-3v-11h3v1.765
                  c1.396-2.586 7-2.777 7 
                  2.476v6.759z" />
                </svg>
              </a>
            </div>

            <div className="bg-white/50 backdrop-blur-md rounded-2xl p-4 border border-white/40 shadow-sm">
              <p className="text-xs uppercase tracking-widest text-slate-400 mb-1">
                Developed By
              </p>

              <h4 className="font-bold text-slate-800">
                Bhoomi Dubey
              </h4>

              <p className="text-sm text-slate-500 mt-1">
                Frontend & MERN Stack Developer
              </p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6 text-sm text-slate-500">

          <p>
            © 2026 Sunrise Public School. All Rights Reserved.
          </p>

          <p className="text-center">
            Crafted with ❤️ using React & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}