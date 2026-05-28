import { useEffect } from "react";

function Dashboard() {
  const fetchProfile = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch(
      "https://school-m7jz.vercel.app/api/profile",
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    const data = await res.json();
    console.log(data);
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
  <>
  <h1>Dashboard</h1>
  <button
  onClick={() => {
    localStorage.removeItem("role");
    navigate("/login");
  }}
  className="bg-red-500 text-white px-4 py-2 cursor-pointer rounded-lg"
>
  Logout
</button>
</>
);
}

export default Dashboard;