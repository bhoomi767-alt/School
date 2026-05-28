
import React from "react";
import {
  User,
  GraduationCap,
  Images,
  Sparkles,
} from "lucide-react";

export default function PrincipalTeachers() {

  const galleryImages = [
    new URL("https://res.cloudinary.com/dypimplt2/image/upload/v1779963118/duo_ixuhsz.jpg").href,
    new URL("https://res.cloudinary.com/dypimplt2/image/upload/v1779963125/science_wu8ha3.png", import.meta.url).href,
    new URL("https://res.cloudinary.com/dypimplt2/image/upload/v1779963122/mam_rahkgc.png", import.meta.url).href,
  ];
  const newGalleryImages = [
  new URL("https://res.cloudinary.com/dypimplt2/image/upload/v1779963123/papa_pibujp.jpg", import.meta.url).href,
  new URL("https://res.cloudinary.com/dypimplt2/image/upload/v1779963123/papa2_awvypi.jpg", import.meta.url).href,
  new URL("https://res.cloudinary.com/dypimplt2/image/upload/v1779963122/img9_yvygyg.jpg", import.meta.url).href,
  new URL("https://res.cloudinary.com/dypimplt2/image/upload/v1779963120/img5_cknrrs.jpg", import.meta.url).href,
   new URL("https://res.cloudinary.com/dypimplt2/image/upload/v1779963121/img7_rbsnuy.jpg", import.meta.url).href,
    new URL("https://res.cloudinary.com/dypimplt2/image/upload/v1779963118/img12_tsxhte.jpg", import.meta.url).href,
];

  const principal = {
    name: "श्री संतोष सिंह एवं श्रीमती सिंह",
    role: "संस्थापक",
    image: galleryImages[0],
    description:
      "लगभग 15 वर्ष पूर्व श्री संतोष सिंह एवं श्रीमती सिंह ने शिक्षा के क्षेत्र में एक दृढ़ संकल्प और उज्ज्वल दृष्टि के साथ न्यू सनराइज पब्लिक स्कूल की स्थापना की। प्रारम्भ में यह एक छोटे प्रयास के रूप में शुरू हुआ, लेकिन समय के साथ उनकी मेहनत, समर्पण और दूरदर्शिता ने इसे एक बड़े और प्रतिष्ठित शैक्षणिक संस्थान का रूप दे दिया। उन्होंने केवल एक विद्यालय की स्थापना नहीं की, बल्कि ऐसे वातावरण का निर्माण किया जहाँ शिक्षा के साथ संस्कार, अनुशासन और व्यक्तित्व विकास को भी समान महत्व दिया जाता है। आज न्यू सनराइज पब्लिक स्कूल समाज में अपनी अलग पहचान बना चुका है, जो उनके वर्षों के संघर्ष, त्याग और शिक्षा के प्रति अटूट समर्पण का परिणाम है।",
  };

  const teachers = [
    {
      name: "अर्चना शुक्ला",
      subject: "विज्ञान विभागाध्यक्ष",
      image: galleryImages[2],
      description:
        "मिस अर्चना शुक्ला, विज्ञान विभाग की विभागाध्यक्ष के रूप में पिछले 6 वर्षों से विद्यालय की शैक्षणिक प्रगति में महत्वपूर्ण योगदान दे रही हैं। उन्होंने अपने ज्ञान, परिश्रम और समर्पण के माध्यम से विज्ञान शिक्षा को प्रभावशाली और प्रेरणादायक बनाया है। विद्यालय को प्रत्येक क्षेत्र में बेहतर बनाने के लिए उनका निरंतर प्रयास, समय और ऊर्जा अत्यंत सराहनीय रही है। उनके मार्गदर्शन में विद्यार्थियों ने न केवल विज्ञान विषय में रुचि विकसित की, बल्कि अनुशासन, तार्किक सोच और आत्मविश्वास भी सीखा। उनका कार्य निस्वार्थ समर्पण, जिम्मेदारी और शिक्षण के प्रति गहरी प्रतिबद्धता का उत्कृष्ट उदाहरण है।",
    },

    {
      name: "कुमुद सिंह",
      subject: "प्रधानाचार्य",
      image: galleryImages[1],
      description:
        "विद्यालय की स्थापना से लेकर आज तक मिस कुमुद सिंह, जिन्हें सभी विद्यार्थी प्रेमपूर्वक बड़ी मैम के नाम से जानते हैं, विद्यालय की व्यवस्था, अनुशासन और संचालन की प्रमुख शक्ति रही हैं। उन्होंने हर छोटे और बड़े कार्य को अत्यंत जिम्मेदारी, धैर्य और समर्पण के साथ संभाला है। विद्यालय के विकास में उनका योगदान केवल प्रशासनिक नहीं, बल्कि मातृत्व भाव से जुड़ा हुआ है, क्योंकि विद्यार्थी उन्हें अपनी माँ के समान स्नेह और सम्मान देते हैं। उनकी सरलता, अनुशासनप्रियता और विद्यार्थियों के प्रति अपनापन विद्यालय के वातावरण को विशेष बनाता है। बड़ी मैम का व्यक्तित्व प्रेरणा, सेवा और शिक्षा के प्रति समर्पण का सुंदर उदाहरण है।",
    },
  ];

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-[#eef6ff] via-[#dbeafe] to-[#f8fbff] py-16 px-5 overflow-hidden relative">

      {/* Blur Background */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl"></div>

      <div className="absolute bottom-10 right-10 w-72 h-72 bg-cyan-200/30 rounded-full blur-3xl"></div>

      {/* Heading */}
      <div className="relative z-10 text-center mb-16">

        <div className="flex items-center justify-center gap-3 mb-4">
          <Sparkles className="text-blue-600" />

          <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-700 via-cyan-600 to-blue-500 bg-clip-text text-transparent">
            हमारे प्रेरणादायक मार्गदर्शक
          </h1>
        </div>

        <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-8">
          हमारे विद्यालय के संस्थापक और शिक्षक विद्यार्थियों को शिक्षा,
          संस्कार और सफलता की दिशा में प्रेरित करते हैं।
        </p>
      </div>

      {/* Founder Section */}
      <div className="relative z-10 max-w-6xl mx-auto mb-20">

        <h2 className="text-4xl font-extrabold text-center mb-10 bg-gradient-to-r from-blue-700 to-cyan-500 bg-clip-text text-transparent">
          संस्थापक
        </h2>

        <div className="bg-white/80 backdrop-blur-xl border border-white/40 rounded-[35px] shadow-2xl overflow-hidden grid md:grid-cols-2 hover:-translate-y-2 transition-all duration-500">

          {/* Image */}
          <div className="overflow-hidden group">
            <img
              src={principal.image}
              alt={principal.name}
              className="w-full h-full md:h-[500px] object-contain group-hover:scale-105 transition duration-700"
            />
          </div>

          {/* Content */}
          <div className="p-8 md:p-10 flex flex-col justify-center">

            <div className="flex items-center gap-3 mb-4">

              <div className="bg-blue-100 p-3 rounded-2xl">
                <User className="text-blue-700" size={28} />
              </div>

              <div>
                <h3 className="text-3xl font-bold text-gray-800">
                  {principal.name}
                </h3>

                <p className="text-blue-600 font-semibold text-lg">
                  {principal.role}
                </p>
              </div>
            </div>

            <p className="text-gray-600 leading-8 text-[15px]">
              {principal.description}
            </p>

            

          </div>
        </div>
      </div>

      {/* Teachers */}
      <div className="relative z-10 max-w-6xl mx-auto mb-20">

        <h2 className="text-4xl font-extrabold text-center mb-10 bg-gradient-to-r from-cyan-700 to-blue-500 bg-clip-text text-transparent">
          हमारे शिक्षक
        </h2>

        <div className="grid md:grid-cols-2 gap-8">

          {teachers.map((teacher, index) => (

            <div
              key={index}
              className="group bg-white/80 backdrop-blur-xl border border-white/40 rounded-[30px] overflow-hidden shadow-xl hover:-translate-y-3 hover:shadow-2xl transition-all duration-500"
            >

              {/* Image */}
              <div className="overflow-hidden">
                <img
                  src={teacher.image}
                  alt={teacher.name}
                  className="w-full h-72 object-contain group-hover:scale-105 transition duration-700"
                />
              </div>

              {/* Content */}
              <div className="p-6">

                <div className="flex items-center gap-3 mb-3">

                  <div className="bg-cyan-100 p-2 rounded-xl">
                    <GraduationCap
                      className="text-cyan-700"
                      size={22}
                    />
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">
                      {teacher.name}
                    </h3>

                    <p className="text-cyan-600 font-semibold text-sm">
                      {teacher.subject}
                    </p>
                  </div>
                </div>

                <p className="text-gray-600 leading-7 text-sm">
                  {teacher.description}
                </p>

               

              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Gallery */}
      <div className="relative z-10 max-w-6xl mx-auto">

        <div className="text-center mb-10">

          <div className="flex items-center justify-center gap-3 mb-3">

            <Images className="text-purple-600" size={30} />

            <h2 className="text-4xl font-extrabold bg-gradient-to-r from-purple-700 to-pink-500 bg-clip-text text-transparent">
              हमारी सुंदर गैलरी
            </h2>
          </div>

          <p className="text-gray-600">
            विद्यालय की यादगार झलकियाँ और खूबसूरत पल।
          </p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">

          {newGalleryImages.map((image, index) => (

            <div
              key={index}
              className="group relative overflow-hidden rounded-[28px] shadow-xl bg-white border border-white/40"
            >

              <img
                src={image}
                alt={`Gallery ${index + 1}`}
                className="w-full h-72 object-contain group-hover:scale-110 transition duration-700"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition duration-500"></div>

              {/* Hover Text */}
              <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition duration-500">
                <p className="font-semibold text-lg">
                  स्कूल की यादें
                </p>
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}