
import React from "react";
import { motion } from "framer-motion";

const Features = () => {
  const featureData = [
    {
      id: 1,
      title: "Smart Classes",
      description:
        "Interactive learning with smart technology for modern education.",
      icon: "💻",
      bgColor: "bg-blue-100",
      hoverBg: "group-hover:bg-blue-600",
    },
    {
      id: 2,
      title: "Sports Facilities",
      description:
        "State-of-the-art playgrounds and high-quality sports equipment.",
      icon: "⚽",
      bgColor: "bg-green-100",
      hoverBg: "group-hover:bg-green-600",
    },
    {
      id: 3,
      title: "Experienced Teachers",
      description:
        "A team of qualified and dedicated educators committed to success.",
      icon: "👨‍🏫",
      bgColor: "bg-purple-100",
      hoverBg: "group-hover:bg-purple-600",
    },
    {
      id: 4,
      title: "Computer Lab",
      description:
        "Advanced computing facilities with high-speed internet access.",
      icon: "🖥️",
      bgColor: "bg-orange-100",
      hoverBg: "group-hover:bg-orange-600",
    },
  ];

  return (
    <section className="bg-gradient-to-br from-blue-50 via-sky-100 to-cyan-50 py-20 px-6 font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-700 via-sky-500 to-cyan-500 bg-clip-text text-transparent mb-4">
            Our World-Class Facilities
          </h2>

          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            Providing the best environment and tools for the next generation
            of leaders.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featureData.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: index * 0.2,
              }}
              viewport={{ once: true }}
              className="group bg-white p-8 rounded-3xl shadow-md hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 relative overflow-hidden"
            >
              {/* Decorative Circle */}
              <div className="absolute -top-5 -right-5 w-24 h-24 bg-gray-100 rounded-full opacity-40 group-hover:scale-150 transition duration-700" />

              {/* Icon */}
              <div
                className={`w-16 h-16 ${feature.bgColor} ${feature.hoverBg}
                rounded-2xl flex items-center justify-center text-3xl mb-6
                transition-all duration-300 group-hover:scale-110 relative z-10`}
              >
                {feature.icon}
              </div>

              {/* Content */}
              <div className="relative z-10">
                <h3 className="text-xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 bg-clip-text text-transparent mb-3 group-hover:text-blue-700 transition">
                  {feature.title}
                </h3>

                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* Bottom Bar */}
              <div className="absolute left-0 bottom-0 h-1 bg-blue-600 w-0 group-hover:w-full transition-all duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;