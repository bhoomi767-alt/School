

import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "../config.js";

export default function AdminVisitors() {

  const [visitors, setVisitors] = useState([]);
  const [loading, setLoading] = useState(true);

 const fetchData = async () => {

  try {

    const res = await fetch(
      `${API_BASE_URL}/api/visitor`
    );

    if (!res.ok) {
      throw new Error("Server error");
    }

    const data = await res.json();

    setVisitors(data);

  } catch (error) {

    console.log(error);

  } finally {

    setLoading(false);

  }
};

  useEffect(() => {

    fetchData();

  }, []);

  return (
    <div className="bg-white mt-10 shadow-lg rounded-2xl p-6 border-l-4 border-blue-500">

      <h2 className="text-2xl font-bold mb-5 text-gray-800">
        Visitors
      </h2>

      {loading ? (

        <p>Loading...</p>

      ) : visitors.length === 0 ? (

        <p>No Visitors Found</p>

      ) : (

        <div className="space-y-4">

          {visitors.map((v) => (

            <div
              key={v._id}
              className="bg-slate-50 border rounded-2xl p-4"
            >

              <h3 className="font-bold text-blue-700">
                {v.name}
              </h3>

              <p>Mobile: {v.mobile}</p>

              <p>Interest: {v.interest}</p>

              <button
  onClick={async () => {

    await fetch(
      `${API_BASE_URL}/api/visitor/${v._id}`,
      {
        method: "DELETE"
      }
    );

    setVisitors(
      visitors.filter(
        (item) => item._id !== v._id
      )
    );

  }}

  className="mt-4 bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-xl font-semibold transition cursor-pointer"
>
  Delete
</button>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}