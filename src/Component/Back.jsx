
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Home, Info, School, Briefcase, MessageSquare, BookOpen, Trophy,
  GraduationCap, Image, Users, LogIn, UserPlus, Activity, X, ChevronRight,
} from "lucide-react";

export default function Back({ open, setOpen }) {
  const navigate = useNavigate();

  if (!open) return null;

  const handleNavigation = (path) => {
    navigate(path);
    setOpen(false);
  };

  return (
    <>
      {/* BACKDROP */}
      <div
        className="xl:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-all"
        onClick={() => setOpen(false)}
      />

      {/* SIDEBAR */}
      <div className="xl:hidden fixed top-0 right-0 h-screen w-[90%] max-w-[360px]
        bg-gradient-to-b from-white/90 to-slate-50/90 backdrop-blur-2xl
        z-50 shadow-2xl border-l border-white/30 overflow-y-auto animate-slideIn">

        {/* TOP */}
        <div className="sticky top-0 bg-white/70 backdrop-blur-xl border-b border-slate-200 px-5 py-5 flex items-center justify-between">

          <div>
            <h2 className="text-2xl font-extrabold bg-gradient-to-r from-indigo-600 to-cyan-500 bg-clip-text text-transparent">
              Menu
            </h2>

            <p className="text-xs text-slate-500 mt-1">
              Sunrise Public School
            </p>
          </div>

          <button
            onClick={() => setOpen(false)}
            className="w-10 h-10 rounded-full bg-slate-100 hover:bg-red-100 flex items-center justify-center transition"
          >
            <X size={22} className="text-slate-600" />
          </button>
        </div>

        {/* MENU */}
        <div className="p-5 space-y-6">

          {/* HOME */}
          <div className="bg-gradient-to-r from-indigo-50 to-cyan-50 rounded-2xl p-2 border border-indigo-100 shadow-sm">

            <button
              onClick={() => handleNavigation("/")}
              className="w-full flex items-center justify-between px-4 py-4 rounded-2xl hover:bg-white transition group"
            >
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-2xl bg-indigo-100 flex items-center justify-center group-hover:scale-110 transition">
                  <Home className="text-indigo-700" size={22} />
                </div>

                <span className="font-bold text-slate-700">
                  Home
                </span>
              </div>

              <ChevronRight size={18} className="text-slate-400 group-hover:text-indigo-600" />
            </button>
          </div>

          {/* SECTIONS */}
          <MenuSection title="About" icon={Info} items={[
            { icon: School, label: "About School", action: () => handleNavigation("/about") },
            { icon: Briefcase, label: "Principal & Teachers", action: () => handleNavigation("/principal") },
            { icon: MessageSquare, label: "Feedbacks", action: () => handleNavigation("/feedback") },
          ]} />

          <MenuSection title="Activities" icon={BookOpen} items={[
            { icon: Trophy, label: "Achievements", action: () => handleNavigation("/achievements") },
            { icon: GraduationCap, label: "Certificates", action: () => handleNavigation("/certificates") },
            { icon: Image, label: "Gallery", action: () => handleNavigation("/gallery") },
          ]} />

          <MenuSection title="Students" icon={Users} items={[
            { icon: LogIn, label: "Login", action: () => handleNavigation("/login") },
            { icon: UserPlus, label: "Admin Login", action: () => handleNavigation("/adminlog") },
            { icon: Activity, label: "Admission", action: () => handleNavigation("/admission") },
          ]} />

        </div>
      </div>

      {/* ANIMATION */}
      <style>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        .animate-slideIn {
          animation: slideIn 0.35s ease;
        }
      `}</style>
    </>
  );
}

/* SECTION */
const MenuSection = ({ title, icon: Icon, items }) => {
  return (
    <div className="bg-white/80 backdrop-blur-xl border border-slate-200 rounded-3xl shadow-md overflow-hidden">

      {/* HEADER */}
      <div className="flex items-center gap-3 px-5 py-4 bg-gradient-to-r from-slate-50 to-indigo-50 border-b border-slate-200">

        <div className="w-10 h-10 rounded-2xl bg-indigo-100 flex items-center justify-center">
          <Icon size={20} className="text-indigo-700" />
        </div>

        <h3 className="font-bold text-slate-700 text-lg">
          {title}
        </h3>
      </div>

      {/* ITEMS */}
      <div className="p-3 space-y-1">

        {items.map((item, index) => (
          <button
            key={index}
            onClick={item.action}
            className="w-full flex items-center justify-between px-4 py-3 rounded-2xl hover:bg-indigo-50 transition group"
          >
            <div className="flex items-center gap-4">

              <div className="w-10 h-10 rounded-xl bg-slate-100 group-hover:bg-indigo-100 flex items-center justify-center transition">
                <item.icon size={18} className="text-slate-600 group-hover:text-indigo-700" />
              </div>

              <span className="font-medium text-slate-600 group-hover:text-indigo-700">
                {item.label}
              </span>
            </div>

            <ChevronRight size={16} className="text-slate-300 group-hover:text-indigo-500" />
          </button>
        ))}

      </div>
    </div>
  );
};