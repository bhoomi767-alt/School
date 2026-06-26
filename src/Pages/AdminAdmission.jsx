import React, { useEffect, useState } from "react";
import { Phone, BookOpen } from "lucide-react";
import { API_BASE_URL } from "../config.js";

export default function AdminAdmission() {

  const [admissions, setAdmissions] = useState([]);

  useEffect(() => {

    fetch(`${API_BASE_URL}/api/admission`)
      .then((res) => res.json())
      .then((data) => {

        // Sirf admission wale data
        setAdmissions(data);
      });

  }, []);

  const handleSubmit = async (e) => {

  e.preventDefault();

  await fetch(`${API_BASE_URL}/api/admission`, {

    method: "POST",

    headers: {
      "Content-Type": "application/json"
    },

    body: JSON.stringify({

      name: formData.name,

      mobile: formData.mobile,

      className: formData.className,

      message: formData.message

    })

  });

};

  return (
    <div className="bg-white/80 backdrop-blur-xl border border-white/40 shadow-2xl rounded-[2rem] p-8 mt-10">

      <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-700 via-sky-500 to-cyan-500 bg-clip-text text-transparent mb-8">
        Admission Requests
      </h2>

      {
        admissions.length === 0 ? (

          <p className="text-gray-500">
            No admission requests found
          </p>

        ) : (

          <div className="space-y-5">

            {admissions.map((item) => (

              <div
                key={item._id}
                className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-100 rounded-3xl p-6"
              >

                <h3 className="text-2xl font-bold text-slate-800">
                  {item.name}
                </h3>

                <div className="mt-3 space-y-2">

                  <p className="flex items-center gap-2 text-slate-600">
                    <Phone size={18} />
                    {item.mobile}
                  </p>

                  <p className="flex items-center gap-2 text-slate-600">
                    <BookOpen size={18} />
                    Class: {item.className}
                  </p>

                  <p className="text-slate-500 mt-3">
                    {item.message}
                  </p>

                  <button
  onClick={async () => {

    await fetch(`${API_BASE_URL}/api/admission/${item._id}`, {
      method: "DELETE"
    });

    setAdmissions(admissions.filter((a) => a._id !== item._id));

  }}
  className="mt-4 bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-xl font-semibold transition"
>
  Delete
</button>

              </div>
              </div>
            ))}

          </div>
        )
      }

    </div>
  );
}