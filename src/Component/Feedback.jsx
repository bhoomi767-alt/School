
import React, { useEffect, useRef, useState } from "react";
import {
  MessageSquare,
  Star,
  Quote,
  Send,
} from "lucide-react";

export default function Feedback() {

  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

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

  const feedbacks = [
    {
      name: "Aarav Mishra",
      role: "Student",
      text: "This school focuses not only on academics but also on discipline and personality development.",
      rating: 5,
    },

    {
      name: "Sonam Singh",
      role: "Parent",
      text: "The environment of the school is excellent and the teachers guide students like family.",
      rating: 5,
    },

    {
      name: "Rohit Shukla",
      role: "Alumni",
      text: "This school gave me confidence and the right direction towards success.",
      rating: 5,
    },
  ];

  return (
    <div
      ref={sectionRef}
      className="w-full min-h-screen bg-gradient-to-b from-[#eef6ff] via-[#dbeafe] to-[#f8fbff] py-20 px-5 overflow-hidden relative"
    >

      {/* Background Glow */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-cyan-200/20 rounded-full blur-3xl"></div>

      <div className="absolute bottom-10 right-10 w-72 h-72 bg-blue-200/20 rounded-full blur-3xl"></div>

      {/* Heading */}
      <div
        className={`relative z-10 text-center mb-16 transition-all duration-1000 ${
          visible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
      >

        <div className="flex items-center justify-center gap-3 mb-4">

          <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center shadow-xl">

            <MessageSquare className="text-white" size={28} />

          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-700 via-cyan-600 to-indigo-700 bg-clip-text text-transparent">
            Student Feedback
          </h1>

        </div>

        <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-8">
          Experiences and opinions shared by our students and parents.
        </p>
      </div>

      {/* Feedback Cards */}
      <div className="relative z-10 max-w-6xl mx-auto grid md:grid-cols-3 gap-8">

        {feedbacks.map((item, index) => (

          <div
            key={index}
            className={`group relative bg-white/80 backdrop-blur-xl border border-white/40 rounded-[32px] shadow-xl p-7 hover:-translate-y-3 hover:shadow-2xl transition-all duration-700 overflow-hidden ${
              visible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
            style={{
              transitionDelay: `${index * 200}ms`,
            }}
          >

            {/* Top Gradient */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-500"></div>

            {/* Quote */}
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center mb-5 shadow-lg">

              <Quote className="text-white" size={28} />

            </div>

            {/* Text */}
            <p className="text-gray-600 leading-8 text-sm mb-6">
              {item.text}
            </p>

            {/* Stars */}
            <div className="flex gap-1 mb-5">

              {[...Array(item.rating)].map((_, i) => (
                <Star
                  key={i}
                  size={18}
                  className="fill-yellow-400 text-yellow-400"
                />
              ))}

            </div>

            {/* User */}
            <div className="border-t border-gray-200 pt-4">

              <h3 className="text-lg font-bold text-gray-800">
                {item.name}
              </h3>

              <p className="text-cyan-600 text-sm font-medium">
                {item.role}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Feedback Form */}
      <div
        className={`relative z-10 max-w-4xl mx-auto mt-20 bg-white/80 backdrop-blur-xl border border-white/40 rounded-[35px] shadow-2xl p-8 md:p-10 transition-all duration-1000 ${
          visible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
      >

        <div className="text-center mb-8">

          <h2 className="text-3xl font-extrabold bg-gradient-to-r from-blue-700 to-cyan-500 bg-clip-text text-transparent">
            Share Your Feedback
          </h2>

          <p className="text-gray-600 mt-3">
            Your feedback helps us improve and grow better every day.
          </p>
        </div>

        <form className="grid md:grid-cols-2 gap-5">

          <input
            type="text"
            placeholder="Your Name"
            className="w-full bg-[#f8fbff] border border-blue-100 rounded-2xl px-5 py-4 outline-none focus:ring-4 focus:ring-cyan-100 focus:border-cyan-400 transition"
          />

          <input
            type="text"
            placeholder="Your Role"
            className="w-full bg-[#f8fbff] border border-blue-100 rounded-2xl px-5 py-4 outline-none focus:ring-4 focus:ring-cyan-100 focus:border-cyan-400 transition"
          />

          <textarea
            rows="5"
            placeholder="Write your feedback..."
            className="md:col-span-2 w-full bg-[#f8fbff] border border-blue-100 rounded-2xl px-5 py-4 outline-none focus:ring-4 focus:ring-cyan-100 focus:border-cyan-400 transition resize-none"
          ></textarea>

          <button
            type="submit"
            className="md:col-span-2 bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 text-white py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 hover:scale-[1.02] hover:shadow-2xl transition duration-300 shadow-lg cursor-pointer"
          >

            <Send size={20} />

            Submit Feedback
          </button>
        </form>
      </div>
    </div>
  );
}