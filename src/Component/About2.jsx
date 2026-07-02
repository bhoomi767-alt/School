import { useEffect, useState } from "react";

function Counter({ target }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const speed = 55;

    const interval = setInterval(() => {
      start += Math.ceil(target / 50);
      if (start >= target) {
        setCount(target);
        clearInterval(interval);
      } else {
        setCount(start);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [target]);

  return <span>{count}</span>;
}

export default function AboutSection() {
  const localImg3 = new URL('https://res.cloudinary.com/dypimplt2/image/upload/v1779963120/img3_gsrv6s.jpg', import.meta.url).href;

  return (
    <>
      {/* ABOUT SECTION */}
      <section className="w-full bg-[#fefce8] py-12 px-4 md:px-16 animate-fadeIn">
        
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          
          {/* LEFT TEXT */}
          <div>
            <h2 className="text-3xl md:text-6xl font-bold text-yellow-600 mb-4">
              About Us
            </h2>

            <p className="text-gray-700 text-base md:text-2xl leading-relaxed mb-4">
              Established in 2011, Sunrise Education Network has always been driven 
              by values of honesty, integrity and service.
            </p>

            <p className="text-gray-700 text-base md:text-2xl leading-relaxed mb-4">
              Our school has been proudly serving the community for over 15 years. 
              With a team of highly experienced teachers, we shape a bright future.
            </p>

            <p className="text-gray-700 text-base md:text-2xl leading-relaxed">
              Our focus is on holistic development and innovative learning methods.
            </p>

            <button className="mt-6 px-6 py-2 bg-yellow-500 text-white rounded-lg shadow hover:bg-yellow-600 transition">
              Read More
            </button>
          </div>

          {/* RIGHT IMAGE */}
          <div className="flex justify-center">
            <img
              src={localImg3}
              className="w-64 h-64 md:w-96 md:h-96 object-cover rounded-lg shadow-md border-2 border-white"
              alt="img3"
            />
          </div>

        </div>
      </section>

      {/* EXPERIENCE SECTION */}
      <div className="w-full bg-gradient-to-r from-[#e0f2fe] to-[#d6d1cc] py-16 px-4">

        <div className="max-w-6xl mx-auto flex flex-col md:flex-row flex-wrap justify-center items-center gap-6 text-center">

          {/* Item */}
          <div className="flex items-center gap-3">
            <div>
              <h1 className="text-4xl md:text-5xl font-semibold text-[#4b5563]">15+</h1>
              <p className="text-[#4b5563] mt-1">Years Of Experience</p>
            </div>
            <span className="hidden md:block text-2xl bg-gradient-to-r from-[#60a5fa] to-[#a78bfa] text-transparent bg-clip-text">✦</span>
          </div>

          <div className="flex items-center gap-3">
            <div>
              <h1 className="text-4xl md:text-5xl font-semibold text-[#4b5563]">15+</h1>
              <p className="text-[#4b5563] mt-1">Qualified Teachers</p>
            </div>
            <span className="hidden md:block text-2xl bg-gradient-to-r from-[#60a5fa] to-[#a78bfa] text-transparent bg-clip-text">✦</span>
          </div>

          <div className="flex items-center gap-3">
            <div>
              <h1 className="text-4xl md:text-4xl font-semibold text-[#4b5563]">Smart Classes</h1>
            </div>
            <span className="hidden md:block text-2xl bg-gradient-to-r from-[#60a5fa] to-[#a78bfa] text-transparent bg-clip-text">✦</span>
          </div>

          <div className="flex items-center gap-3">
            <div>
              {/* <h1 className="text-4xl md:text-5xl font-semibold text-[#4b5563]">150+</h1> */}
              <h1 className="text-4xl md:text-5xl font-semibold text-[#4b5563]">
              <Counter target={300} />+
              </h1>
              <p className="text-[#4b5563] mt-1">Students</p>
            </div>
            <span className="hidden md:block text-2xl bg-gradient-to-r from-[#60a5fa] to-[#a78bfa] text-transparent bg-clip-text">✦</span>
          </div>

          <div className="flex items-center gap-3">
            <div>
             <h1 className="text-4xl md:text-5xl font-semibold text-[#4b5563]">
             <Counter target={100}/>%
             </h1>
              <p className="text-[#4b5563] mt-1">Success rate</p>
            </div>
          </div>

        </div>
      </div>

      {/* VISION PURPOSE */}
      <div className="w-full py-20 px-4 bg-gradient-to-r from-[#e6f0fa] to-[#f3ebe5]">

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">

          {/* Vision */}
          <div className="relative p-6 md:p-10 bg-white/40 backdrop-blur-sm">
            <div className="absolute -inset-1 md:-inset-2 border border-[#93c5fd]"></div>

            <div className="relative z-10 text-center absolute-inset-2 border border-[#93c5fd]">
              <h2 className="text-2xl md:text-4xl text-[#1e3a8a] mb-4 font-semibold">
                Our Vision
              </h2>
              <p className="text-[#374151] text-sm md:text-base leading-relaxed">
                To provide quality education and create a bright future for students.
              </p>
            </div>
          </div>

          {/* Purpose */}
          <div className="relative p-6 md:p-10 bg-white/40 backdrop-blur-sm">
            <div className="absolute -inset-1 md:-inset-2 border border-[#93c5fd]"></div>

            <div className="relative z-10 text-center absolute-inset-2 border border-[#93c5fd]">
              <h2 className="text-2xl md:text-4xl text-[#1e3a8a] mb-4 font-semibold">
                Our Purpose
              </h2>
              <p className="text-[#374151] text-sm md:text-base leading-relaxed">
                To nurture creative and responsible individuals.
              </p>
            </div>
          </div>

        </div>

      </div>
    </>
  );
}