
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
// 1. Professional Line Icons import kiye
import { 
  Home, Info, BookOpen, Users, GraduationCap, 
  Trophy, Image, MessageSquare, ChevronDown, 
  LogIn, UserPlus, School, Briefcase , Search
} from "lucide-react";
import Back from "./Back.jsx";

// Custom Dropdown Component
const NavItem = ({ title, options, Icon }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);

    const isActive = options.some(opt => opt.path === location.pathname);

    return (
        <div 
            className="relative group"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
        >
            <button className={`flex items-center gap-2 px-2 py-1 font-bold transition-all cursor-pointer text-lg md:text-lg 
                ${isActive ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-700 hover:text-blue-600"}`}>
                {/* Header Icon */}
                <Icon size={22} strokeWidth={2.5} /> 
                {title}
                {/* Arrow Icon jo hover pe rotate hoga */}
                <ChevronDown size={16} className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
            </button>

            {/* Dropdown Menu */}
            <div className={`absolute left-0 top-full pt-2 transition-all duration-300 
                ${isOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible translate-y-2"}`}>
                <div className="bg-white border border-gray-100 shadow-xl rounded-xl py-2 min-w-[240px] z-[100]">
                    {options.map((opt) => (
                        <button
                            key={opt.path}
                            onClick={() => navigate(opt.path)}
                            className="w-full text-left px-4 py-3 text-lg font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 flex items-center gap-3 transition-colors"
                        >
                            <opt.icon size={20} strokeWidth={2} /> 
                            {opt.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default function Front({ open, setOpen }) {
    const navigate = useNavigate();
    const location = useLocation();
    const [isScrolled, setIsScrolled] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = (e) => {
    if (e.key === "Enter" && searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase().trim();

        // Agar user "about" search kare, toh seedha about page par bhej do
        if (query === "about" || query === "about us") {
            navigate("/about");
        } 
        // Agar "contact" ya "feedback" search kare
        else if (query === "contact" || query === "feedback") {
            navigate("/feedback");
        } 
         else if (query === "login" || query === "login") {
            navigate("/login");
        }
          else if (query === "home" || query === "home") {
            navigate("/");
        }
        else {
            navigate(`/search?q=${searchQuery}`);
        }
        setSearchQuery(""); // Input box khali karne ke liye
    }
};

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <div className={`w-full sticky top-0 z-50 flex flex-col md:flex-row md:items-center md:justify-between px-4 md:px-10 py-3 transition-all duration-300 ${
                isScrolled ? "backdrop-blur-xl bg-white/70 shadow-md py-2" : "bg-blue-100 py-3"}`}>

                {/* Logo Section */}
                <div className="font-bold flex justify-between items-center w-full md:w-auto">
                    <h1 className={`text-blue-900 font-bold transition-all duration-300 ${isScrolled ? "text-xl md:text-2xl" : "text-2xl md:text-4xl"}`}>
                        New Sunrise Public School
                    </h1>
                    <button className="md:hidden text-blue-900 text-3xl" onClick={() => setOpen(!open)}>
                        {open ? "✕" : "☰"}
                    </button>
                </div>

                {/* Main Navigation (Laptop View) */}
                <div className="hidden md:flex items-center gap-8 lg:gap-12">
                    {/* Home with Icon */}
                    <button 
                        onClick={() => navigate("/")} 
                        className={`flex items-center gap-2 px-3 py-2 font-bold text-lg md:text-lg transition-all 
                        ${location.pathname === "/" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-700 hover:text-blue-600"}`}
                    >
                        <Home size={22} strokeWidth={2.5} /> Home
                    </button>

                    {/* About Dropdown */}
                    <NavItem 
                        title="About" 
                        Icon={Info}
                        options={[
                            { label: "About School", path: "/about", icon: School },
                            { label: "Principal & Teachers", path: "/principal", icon: Briefcase },
                            { label: "Feedback", path: "/feedback", icon: MessageSquare }
                        ]} 
                    />

                    {/* Activities Dropdown */}
                    <NavItem 
                        title="Activities" 
                        Icon={BookOpen}
                        options={[
                            { label: "Achievements", path: "/achievements", icon: Trophy },
                            { label: "Certificates", path: "/certificates", icon: GraduationCap },
                            { label: "Gallery", path: "/gallery", icon: Image }
                        ]} 
                    />

                    {/* Students Dropdown */}
                    <NavItem 
                        title="Students" 
                        Icon={Users}
                        options={[
                            { label: "Login", path: "/login", icon: LogIn },
                            { label: "Admin Login", path: "/adminlog", icon: UserPlus },
                            { label: "Admission", path: "/admission", icon: GraduationCap }
                        ]} 
                    />
                </div>

                {/* Right Side: Search + Login */}
                <div className="flex items-center gap-4 mt-3 md:mt-0">
                    {/* Search Bar Input */}
                    <div className="relative group">
                        <input 
                            type="text" 
                            placeholder="Search..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={handleSearch}
                            className="bg-white/50 border border-blue-200 py-2 px-4 pr-10 rounded-full text-sm outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition-all w-32 md:w-48 lg:w-64"
                        />
                        <Search 
    size={18} 
    className="absolute right-3 top-2.5 text-blue-500 cursor-pointer"
    onClick={() => {
        if(searchQuery.trim() !== "") {
            navigate(`/search?q=${searchQuery.trim()}`);
        }
    }}
/>
                    </div>
                    </div>
            </div>
            <Back open={open} setOpen={setOpen} navigate={navigate} />
        </>
    );
}

