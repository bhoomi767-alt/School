import React from "react";
import { Images, PlayCircle } from "lucide-react";

export default function Gallery() {

  const galleryImages = [

    "https://res.cloudinary.com/dypimplt2/image/upload/v1779963123/img8_ayfpuq.jpg",

    "https://res.cloudinary.com/dypimplt2/image/upload/v1779963121/img7_rbsnuy.jpg",

    "https://res.cloudinary.com/dypimplt2/image/upload/v1779963118/img13_yb6hap.jpg",

    "https://res.cloudinary.com/dypimplt2/image/upload/v1779963120/img4_fvkvgx.jpg",

    "https://res.cloudinary.com/dypimplt2/image/upload/v1779963118/img1_kfp1ql.jpg",

    "https://res.cloudinary.com/dypimplt2/image/upload/v1779963120/img4_fvkvgx.jpg",
  ];

    // VIDEOS
  const galleryVideos = [

    "https://res.cloudinary.com/dypimplt2/video/upload/v1779963189/WhatsApp_Video_2026-05-21_at_7.01.47_PM_yjgcuo.mp4",

    "https://res.cloudinary.com/dypimplt2/video/upload/v1779963969/WhatsApp_Video_2026-05-21_at_7.00.44_PM_vmufql.mp4",

  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#eef5ff] to-[#f8fbff] py-20 px-5">

      <div className="max-w-7xl mx-auto">

        {/* HEADING */}
        <div className="text-center mb-16">

          <div className="flex items-center justify-center gap-3 mb-4">

            <Images className="text-purple-600" size={34} />

            <h1 className="text-5xl font-extrabold bg-gradient-to-r from-purple-700 to-pink-500 bg-clip-text text-transparent">
              School Gallery
            </h1>
          </div>

          <p className="text-gray-600 text-lg">
            Beautiful memories and moments from our school.
          </p>
        </div>

        {/* IMAGE SECTION */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-7">

          {galleryImages.map((image, index) => (

            <div
              key={index}
              className="group relative overflow-hidden rounded-[30px] shadow-2xl"
            >

              <img
                src={image}
                alt=""
                className="w-full h-80 object-cover group-hover:scale-110 transition duration-700"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition duration-500"></div>

              <div className="absolute bottom-5 left-5 opacity-0 group-hover:opacity-100 transition duration-500">

                <p className="text-white font-semibold text-lg">
                  School Memories
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* VIDEO SECTION */}
        <div className="mt-24">

          <div className="flex items-center justify-center gap-3 mb-10">

            <PlayCircle className="text-blue-600" size={34} />

            <h2 className="text-4xl font-extrabold bg-gradient-to-r from-blue-700 to-cyan-500 bg-clip-text text-transparent">
              School Videos
            </h2>
          </div>

          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8">

            {galleryVideos.map((video, index) => (

              <div
                key={index}
                className="bg-white rounded-[30px] overflow-hidden shadow-2xl"
              >

                <video
                  controls
                  className="w-full h-[350px] object-cover"
                >
                  <source src={video} type="video/mp4" />
                </video>

                <div className="p-5">

                  <h3 className="text-xl font-bold text-gray-800">
                    School Event Video
                  </h3>

                  <p className="text-gray-500 mt-2">
                    Watch beautiful school activities and memories.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}