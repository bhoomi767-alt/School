
import React, { useEffect, useRef, useState } from "react";

export default function GallerySection() {
  const schoolVideo = new URL("https://res.cloudinary.com/dypimplt2/video/upload/v1779963137/v1_k40nhd.mp4", import.meta.url).href;

  const galleryImages = [
    new URL("https://res.cloudinary.com/dypimplt2/image/upload/v1779963118/img1_kfp1ql.jpg", import.meta.url).href,
    new URL("https://res.cloudinary.com/dypimplt2/image/upload/v1779963120/img5_cknrrs.jpg", import.meta.url).href,
    new URL("https://res.cloudinary.com/dypimplt2/image/upload/v1779963120/img3_gsrv6s.jpg", import.meta.url).href,
    new URL("https://res.cloudinary.com/dypimplt2/image/upload/v1779963123/papa_pibujp.jpg", import.meta.url).href,
  ];

  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  // Scroll animation
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
      className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-sky-100 to-cyan-50 py-20 px-5 md:px-12"
    >
      {/* Background Blur */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-cyan-200/30 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Top Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          
          {/* LEFT CONTENT */}
          <div
            className={`transition-all duration-1000 ${
              visible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-16"
            }`}
          >
            <span className="bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm font-semibold">
              School Memories
            </span>

            <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-700 via-sky-500 to-cyan-500 bg-clip-text text-transparent leading-tight mt-5">
              Our Beautiful
              <span className="bg-gradient-to-r from-blue-700 via-sky-500 to-cyan-500 bg-clip-text text-transparent"> Gallery</span>
            </h2>

            <p className="text-slate-600 mt-5 text-lg leading-relaxed">
              Explore memorable moments from school events, cultural
              activities, sports competitions, and classroom experiences.
            </p>

            <button className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-7 py-3 rounded-2xl shadow-lg hover:shadow-blue-300/50 transition-all duration-300 cursor-pointer">
              View All Photos
            </button>
          </div>

          {/* RIGHT VIDEO */}
          <div
            className={`transition-all duration-1000 delay-300 ${
              visible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-16"
            }`}
          >
            <div className="relative group">
              
              {/* Glow */}
              <div className="absolute inset-0 bg-blue-300/20 rounded-3xl blur-2xl scale-105 group-hover:scale-110 transition-all duration-500"></div>

              <video
                src={schoolVideo}
                controls
                muted
                autoPlay
                loop
                className="relative w-full h-[260px] md:h-[400px] object-cover rounded-3xl shadow-2xl border border-white/60"
              />
            </div>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-16">
          {galleryImages.map((img, index) => (
            <div
              key={index}
              className={`group relative overflow-hidden rounded-3xl shadow-lg transition-all duration-1000 ${
                visible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-16"
              }`}
              style={{
                transitionDelay: `${index * 200}ms`,
              }}
            >
              {/* Glow */}
              <div className="absolute inset-0 bg-blue-300/20 opacity-0 group-hover:opacity-100 transition-all duration-500 z-10"></div>

              <img
                src={img}
                alt={`gallery-${index}`}
                className="w-full h-52 md:h-72 object-cover transform group-hover:scale-110 transition-all duration-700"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 z-20 flex items-end p-4">
                <p className="text-white font-semibold text-sm md:text-base">
                  School Event
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}