import React from "react";
import { Trophy, Star, Medal } from "lucide-react";

export default function Achievements() {

  const achievements = [
    {
      title: "State Level Science Winner",
      year: "2025",
      icon: Trophy,
      desc: "Students secured first position in state science exhibition.",
    },

    {
      title: "Best Discipline Award",
      year: "2024",
      icon: Medal,
      desc: "Awarded for excellent discipline and student behaviour.",
    },

    {
      title: "Sports Championship",
      year: "2025",
      icon: Star,
      desc: "School won district level football championship.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#eef5ff] to-[#f8fbff] py-20 px-5">

      <div className="max-w-6xl mx-auto">

        <div className="text-center mb-16">

          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-700 to-cyan-500 bg-clip-text text-transparent">
            Achievements
          </h1>

          <p className="text-gray-600 mt-4 text-lg">
            Proud moments and milestones of our school.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">

          {achievements.map((item, index) => {

            const Icon = item.icon;

            return (
              <div
                key={index}
                className="bg-white rounded-[30px] p-8 shadow-xl hover:-translate-y-2 transition duration-500 border border-blue-50"
              >

                <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center mb-6">

                  <Icon className="text-white" size={30} />

                </div>

                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  {item.title}
                </h2>

                <p className="text-cyan-600 font-semibold mb-4">
                  {item.year}
                </p>

                <p className="text-gray-600 leading-7">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}