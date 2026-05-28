import React from "react";
import { Award } from "lucide-react";

export default function Certificates() {

  const certificates = [
    {
      title: "Academic Excellence",
      image:
        "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800",
    },

    {
      title: "Sports Achievement",
      image:
        "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=800",
    },

    {
      title: "Cultural Event",
      image:
        "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8fbff] to-[#eef5ff] py-20 px-5">

      <div className="max-w-6xl mx-auto">

        <div className="text-center mb-16">

          <div className="flex items-center justify-center gap-3 mb-4">

            <Award className="text-blue-700" size={34} />

            <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-700 to-cyan-500 bg-clip-text text-transparent">
              Certificates
            </h1>
          </div>

          <p className="text-gray-600 text-lg">
            Our students achievements and recognitions.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">

          {certificates.map((item, index) => (

            <div
              key={index}
              className="bg-white rounded-[30px] overflow-hidden shadow-xl hover:-translate-y-2 transition duration-500"
            >

              <img
                src={item.image}
                alt={item.title}
                className="w-full h-72 object-cover hover:scale-110 transition duration-700"
              />

              <div className="p-5">

                <h2 className="text-2xl font-bold text-gray-800">
                  {item.title}
                </h2>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}