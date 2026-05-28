
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminVisitors from "./adminvisitor";
import Admission from "./Admission";
import AdminAdmission from "./AdminAdmission";


export default function AdminDashboard() {
const navigate = useNavigate();
const [name, setName] = useState("");
const [number, setNumber] = useState("");
const [password, setPassword] = useState("");
const [students, setStudents]= useState([]);
const [rollNo ,setRollNo]= useState("");
const [photo ,setPhoto]= useState(null);
const [search, setSearch]=useState("");
const [editId, setEditId]=useState("");
const [notice, setNotice] = useState("");
const [notices, setNotices] = useState([]);
const [feeStatus, setFeeStatus] = useState("Pending");
const [studentClass, setStudentClass] = useState("");
const [percentage, setPercentage] = useState("");
const [attendance, setAttendance] = useState("");
const fileInputRef=useRef(null);
const formRef=useRef(null);
const [newAdminPassword, setNewAdminPassword] = useState("");
const [showChangePass, setShowChangePass] = useState(false); // Toggle ke liye
const [email, setEmail] = useState("");
const [otp, setOtp] = useState("");
const [newPass, setNewPass] = useState("");
const [step, setStep] = useState(1); // 1: Email, 2: OTP & New Password
// payment
const [pendingPayments, setPendingPayments] = useState([]);

const [visitors, setVisitors] = useState([]); // <--- Naya State
const [feedbacks, setFeedbacks] = useState([]);
const [admissions, setAdmissions] = useState([]);

const fetchAdmissions = async () => {

  try {

    const response = await fetch("https://school-m7jz.vercel.app/api/admission");

    const data = await response.json();

    setAdmissions(data);

  } catch (error) {

    console.log(error);

  }

};

useEffect(() => {

  fetchAdmissions();

}, []);

const deleteAdmission = async (id) => {

  try {

    await fetch(`https://school-m7jz.vercel.app/api/admission/${id}`, {

      method: "DELETE"

    });

    fetchAdmissions();

  } catch (error) {

    console.log(error);

  }

};

useEffect(() => {

  fetch("https://school-m7jz.vercel.app/api/enquiries")
    .then((res) => res.json())
    .then((data) => {

      // Sirf visitor data
      const visitorData = data.filter(
        (item) => item.type !== "admission"
      );

      setVisitors(visitorData);
    });

}, []);

// Payments fetch 
useEffect(() => {
    fetch("https://school-m7jz.vercel.app/api/admin/pending-payments")
        .then((res) => {
            if (!res.ok) throw new Error("Server ne data nahi diya");
            return res.json();
        })
        .then((data) => setPendingPayments(data))
        .catch((err) => console.log("Abhi backend set nahi hai:", err.message));
}, []);

// Action (Approve/Reject) handle karne ke liye function
const handlePaymentAction = async (paymentId, action) => {
    const route = action === "approve" ? "approve-payment" : "reject-payment";
    const res = await fetch(`https://school-m7jz.vercel.app/api/admin/${route}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paymentId })
    });
    const data = await res.json();
    alert(data.message);
    
    // List refresh karein
    setPendingPayments(pendingPayments.filter(p => p._id !== paymentId));
};

  useEffect(() => {
    fetch("https://school-m7jz.vercel.app/api/students")
      .then((res) => res.json())
      .then((data) => setStudents(data));
  }, []);

useEffect(() => {
  fetch("https://school-m7jz.vercel.app/api/notices")
    .then(res => res.json())
    .then(data => setNotices(data));
}, []);

// notice delete
const handleDelete = async (id) => {
    if (!id) {
        alert("Notice ID missing!");
        return;
    }

    if (window.confirm("Kya aap is notice ko delete karna chahte hain?")) {
        try {
            const res = await fetch(`https://school-m7jz.vercel.app/api/admin/notices/${id}`, {
                method: "DELETE"
            });
            
            if (res.ok) {
                alert("Deleted successfully!");
                // Sabse important line: UI se turant hatane ke liye
                setNotices(prevNotices => prevNotices.filter(n => n._id !== id));
            } else {
                const errorData = await res.json();
                alert("Server error: " + errorData.message);
            }
        } catch (error) {
            console.error("Delete failed:", error);
            alert("Network error: Backend check karein");
        }
    }
};


// feedback
useEffect(() => {

  fetch("https://school-m7jz.vercel.app/api/feedback")
    .then((res) => res.json())
    .then((data) => setFeedbacks(data));

}, []);

 const registerStudent = async () => {

  if (number.toString().trim().length !== 10) {
  alert("Mobile number must be 10 digits");
  return;
}

if (!name.trim()) {
  alert("Enter valid student name");
  return;
}

if (!rollNo.trim()) {
  alert("Enter valid roll number");
  return;
}

if (!photo && !editId) {
  alert("Please select student photo");
  return;
}

const formData = new FormData();

  formData.append("name", name);
  formData.append("number", number);
  formData.append("password", password);
  formData.append("rollNo", rollNo);
  formData.append("role", "student");
  formData.append("photo", photo);
  formData.append("feeStatus", feeStatus);
  formData.append("studentClass", studentClass);
  formData.append("percentage", percentage);
  formData.append("attendance", attendance);

  const url = editId
  ? `https://school-m7jz.vercel.app/api/student/${editId}`:"https://school-m7jz.vercel.app/api/register";

const method = editId ? "PUT" : "POST";

const res = await fetch(url, {
  method,
  body: formData
});

  const data = await res.json();
  alert(data.message);

  const updatedStudents = await fetch("https://school-m7jz.vercel.app/api/students");
  const updatedData = await updatedStudents.json();
  setStudents(updatedData);

  setName("");
  setNumber(students.number?.toString() || "");
  setPassword("");
  setRollNo("");
  setPhoto(null);
  if (fileInputRef.current) {
  fileInputRef.current.value = "";
  }
  setFeeStatus("Pending");
  setEditId("");
  setStudentClass("");
  setPercentage("");
  setAttendance("");
};

const deleteStudent = async (id) => {
  const res = await fetch(
    (`https://school-m7jz.vercel.app/api/student/${id}`),
    {
      method: "DELETE"
    }
  );

  const data = await res.json();
  alert(data.message);

  setStudents(
    students.filter((student) => student._id !== id)
  );
};

const handleEdit = (student) => {
  setName(student.name);
  setNumber(student.number);
  setRollNo(student.rollNo);
  setEditId(student._id);
  setFeeStatus(student.feeStatus || "Pending");
  formRef.current?.scrollIntoView({
  behavior: "smooth",
  block: "start"
});
  setStudentClass(student.studentClass || "");
  setPercentage(student.percentage || "");
  setAttendance(student.attendance || "");
};

const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  navigate("/login");
};

// 1. Inhe yahan alag se likhein (Kisi aur function ke andar nahi)
const sendOTP = async () => {
  if (!email) {
    alert("Please enter admin email");
    return;
  }
  const res = await fetch("https://school-m7jz.vercel.app/api/admin/send-otp", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email })
  });
  const data = await res.json();
  if (res.ok) setStep(2);
  alert(data.message);
};

const resetPassword = async () => {
  const res = await fetch("https://school-m7jz.vercel.app/api/admin/verify-otp-reset", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ otp, newPassword: newPass })
  });
  const data = await res.json();
  if (res.ok) {
    setStep(1);
    setOtp("");
    setNewPass("");
  }
  alert(data.message);
};



const changeAdminPassword = async () => {
  if (!newAdminPassword) {
    alert("Please enter a new password");
    return;
  }




  const res = await fetch("https://school-m7jz.vercel.app/api/admin/change-password", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password: newAdminPassword })
  });

  const data = await res.json();
  alert(data.message);
  setNewAdminPassword("");
  setShowChangePass(false);
};

const filteredStudents = students.filter((student) =>
  student.name.toLowerCase().includes(search.toLowerCase()) ||
  student.rollNo?.toString().includes(search)
);

const currentStudent = students.find(
  (student) => student._id === editId
);
  return(
<div className="min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-[#eaf4ff] via-[#f4f9ff] to-[#dbeafe] py-10 px-4 md:px-8">

  <div className="max-w-7xl mx-auto">

    {/* HEADER */}
    <div className="flex flex-col md:flex-row justify-between md:items-center gap-5 mb-10">
      <div>
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-700 to-cyan-500 bg-clip-text text-transparent">
          Admin Dashboard
        </h1>

        <p className="text-slate-500 mt-2">
          Manage students, payments, notices & website activity
        </p>
      </div>

      <button
        onClick={handleLogout}
        className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-3 rounded-2xl shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer"
      >
        Logout
      </button>
    </div>

    {/* TOP CARDS */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">

      <div className="bg-white/80 backdrop-blur-xl border border-white/40 rounded-3xl p-6 shadow-xl hover:-translate-y-2 transition-all duration-500">
        <p className="text-slate-500 font-medium">
          Total Students
        </p>

        <h2 className="text-5xl font-black text-blue-700 mt-3">
          {students.length}
        </h2>
      </div>

      <div className="bg-white/80 backdrop-blur-xl border border-white/40 rounded-3xl p-6 shadow-xl hover:-translate-y-2 transition-all duration-500">
        <p className="text-slate-500 font-medium">
          Total Teachers
        </p>

        <h2 className="text-5xl font-black text-emerald-600 mt-3">
          12
        </h2>
      </div>

      <div className="bg-white/80 backdrop-blur-xl border border-white/40 rounded-3xl p-6 shadow-xl hover:-translate-y-2 transition-all duration-500">
        <p className="text-slate-500 font-medium">
          Fees Pending
        </p>

        <h2 className="text-5xl font-black text-rose-500 mt-3">
          {pendingPayments.length}
        </h2>
      </div>
    </div>

    {/* REGISTER STUDENT */}
    <div
      ref={formRef}
      className="bg-white/80 backdrop-blur-xl border border-white/40 shadow-2xl rounded-[2rem] p-8 mb-10"
    >
      <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-700 via-sky-500 to-cyan-500 bg-clip-text text-transparent mb-8">
        Register Student
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

        <input
          type="text"
          placeholder="Student Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value.replace(/[^A-Za-z\s]/g, ""))
          }
          className="bg-blue-50 border border-blue-100 rounded-2xl p-4 outline-none focus:ring-4 focus:ring-blue-200"
        />

        <input
          type="text"
          placeholder="Mobile Number"
          value={number}
          maxLength="10"
          onChange={(e) =>
            setNumber(e.target.value.replace(/[^0-9]/g, ""))
          }
          className="bg-blue-50 border border-blue-100 rounded-2xl p-4 outline-none focus:ring-4 focus:ring-blue-200"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="bg-blue-50 border border-blue-100 rounded-2xl p-4 outline-none focus:ring-4 focus:ring-blue-200"
        />

        <input
          type="text"
          placeholder="Roll Number"
          value={rollNo}
          onChange={(e) =>
            setRollNo(e.target.value.replace(/[^0-9]/g, ""))
          }
          className="bg-blue-50 border border-blue-100 rounded-2xl p-4 outline-none focus:ring-4 focus:ring-blue-200"
        />

        <input
          type="text"
          placeholder="Class"
          value={studentClass}
          onChange={(e) => setStudentClass(e.target.value)}
          className="bg-blue-50 border border-blue-100 rounded-2xl p-4 outline-none focus:ring-4 focus:ring-blue-200"
        />

        <input
          type="text"
          placeholder="Percentage"
          value={percentage}
          onChange={(e) =>
            setPercentage(e.target.value.replace(/[^0-9.]/g, ""))
          }
          className="bg-blue-50 border border-blue-100 rounded-2xl p-4 outline-none focus:ring-4 focus:ring-blue-200"
        />

        <input
            type="text"
            placeholder="Attendance %"
            value={attendance}
            onChange={(e) =>
            setAttendance(e.target.value.replace(/[^0-9]/g, ""))
              }
           className="bg-blue-50 border border-blue-100 rounded-2xl p-4 outline-none focus:ring-4 focus:ring-blue-200"
         />

        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={(e) => setPhoto(e.target.files[0])}
            className="w-full bg-blue-50 border border-blue-100 rounded-2xl p-4"
          />
        </div>

        <select
          value={feeStatus}
          onChange={(e) => setFeeStatus(e.target.value)}
          className="bg-blue-50 border border-blue-100 rounded-2xl p-4 outline-none"
        >
          <option value="Pending">Pending</option>
          <option value="Paid">Paid</option>
        </select>
      </div>

      <button
        onClick={registerStudent}
        className="mt-8 bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-8 py-4 rounded-2xl shadow-lg hover:scale-105 transition-all duration-300 font-semibold cursor-pointer"
      >
        {editId ? "Update Student" : "Register Student"}
      </button>
    </div>

    {/* PASSWORD RESET */}
    <div className="bg-white/80 backdrop-blur-xl border border-white/40 shadow-2xl rounded-[2rem] p-8 mb-10">
      <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-700 via-sky-500 to-cyan-500 bg-clip-text text-transparent mb-6">
        Email OTP Password Reset
      </h2>

      {step === 1 ? (
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="email"
            placeholder="Enter Admin Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 bg-blue-50 border border-blue-100 rounded-2xl p-4 outline-none"
          />

          <button
            onClick={sendOTP}
            className="bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white px-8 py-4 rounded-2xl cursor-pointer"
          >
            Send OTP
          </button>
        </div>
      ) : (
        <div className="space-y-4">

          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full bg-blue-50 border border-blue-100 rounded-2xl p-4 outline-none"
          />

          <input
            type="password"
            placeholder="Enter New Password"
            value={newPass}
            onChange={(e) => setNewPass(e.target.value)}
            className="w-full bg-blue-50 border border-blue-100 rounded-2xl p-4 outline-none"
          />

          <button
            onClick={resetPassword}
            className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-8 py-4 rounded-2xl"
          >
            Verify & Update Password
          </button>
        </div>
      )}
    </div>

    {/* PAYMENT SECTION */}
    <div className="bg-white/80 backdrop-blur-xl border border-white/40 shadow-2xl rounded-[2rem] p-8 mb-10">
      <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-700 via-sky-500 to-cyan-500 bg-clip-text text-transparent mb-8">
        Fee Verification Requests
      </h2>

      {pendingPayments.length === 0 ? (
        <p className="text-slate-500">
          No pending payments.
        </p>
      ) : (
        <div className="space-y-5">

          {pendingPayments.map((p) => (
            <div
              key={p._id}
              className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-100 rounded-3xl p-6 flex flex-col lg:flex-row justify-between lg:items-center gap-5 hover:shadow-xl transition-all duration-300"
            >

              <div>
                <h3 className="text-xl font-bold text-slate-800">
                  {p.studentName}
                </h3>

                <p className="text-slate-500 mt-1">
                  Transaction ID: {p.transactionId}
                </p>

                <p className="text-green-600 font-bold mt-2">
                  ₹{p.amount}
                </p>
              </div>

              <div className="flex gap-4">

                <button
                  onClick={() =>
                    handlePaymentAction(p._id, "approve")
                  }
                  className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-2xl shadow-md transition-all cursor-pointer"
                >
                  Approve
                </button>

                <button
                  onClick={() =>
                    handlePaymentAction(p._id, "reject")
                  }
                  className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-2xl shadow-md transition-all cursor-pointer"
                >
                  Reject
                </button>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>

    {/* ADD NOTICE */}
    <div className="bg-white/80 backdrop-blur-xl border border-white/40 shadow-2xl rounded-[2rem] p-8 mb-10">
      <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-700 via-sky-500 to-cyan-500 bg-clip-text text-transparent mb-6">
        Add Notice
      </h2>

      <input
        type="text"
        placeholder="Enter notice..."
        value={notice}
        onChange={(e) => setNotice(e.target.value)}
        className="w-full bg-blue-50 border border-blue-100 rounded-2xl p-4 outline-none mb-5"
      />

      <button
        onClick={() => {
          fetch("http://localhost:3000/api/notices", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ text: notice })
          })
            .then((res) => res.json())
            .then((data) => {
              alert(data.message);
              setNotice("");
            });
        }}
        className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-8 py-4 rounded-2xl shadow-lg"
      >
        Add Notice
      </button>
    </div>

    {/* MANAGE NOTICES */}
    <div className="bg-white/80 backdrop-blur-xl border border-white/40 shadow-2xl rounded-[2rem] p-8 mb-10">
      <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-700 via-sky-500 to-cyan-500 bg-clip-text text-transparent mb-6">
        Active Notices
      </h2>

      <div className="space-y-4">
        {notices.map((n) => (
          <div
            key={n._id}
            className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-100 rounded-2xl p-5 flex justify-between items-center"
          >

            <div>
              <p className="font-semibold text-slate-700">
                {n.text}
              </p>
            </div>

            <button
              onClick={() => handleDelete(n._id)}
              className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-xl cursor-pointer"
            >
              Delete
            </button>

          </div>
        ))}
      </div>
    </div>

    {/* STUDENTS */}
    <div className="bg-white/80 backdrop-blur-xl border border-white/40 shadow-2xl rounded-[2rem] p-8 mb-10">

      <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-700 via-sky-500 to-cyan-500 bg-clip-text text-transparent mb-6">
        Students List
      </h2>

      <input
        type="text"
        placeholder="Search by name or roll no..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full bg-blue-50 border border-blue-100 rounded-2xl p-4 outline-none mb-8"
      />

      {/* CLASS WISE STUDENTS */}
<div className="space-y-10">

  {[...new Set(filteredStudents.map((s) => s.studentClass))].map((className) => (

    <div key={className}>

      {/* Class Heading */}
      <div className="flex items-center justify-between mb-5">

        <h3 className="text-2xl font-bold text-blue-700">
          Class {className}
        </h3>

        <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-xl text-sm font-semibold">
          {
            filteredStudents.filter(
              (s) => s.studentClass === className
            ).length
          } Students
        </span>

      </div>

      {/* Students Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {filteredStudents
          .filter((student) => student.studentClass === className)
          .map((student) => (

            <div
              key={student._id}
              className="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-100 rounded-[2rem] p-6 hover:-translate-y-2 transition-all duration-500 shadow-lg"
            >

              <div className="flex items-center gap-5">

                <img
                  src={`http://localhost:3000/upload/${student.photo}`}
                  alt={student.name}
                  className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                />

                <div>

                  <h3 className="text-2xl font-bold text-slate-800">
                    {student.name}
                  </h3>

                  <p className="text-slate-500 mt-1">
                    Roll No: {student.rollNo}
                  </p>

                  <p className="text-slate-500">
                    Number: {student.number}
                  </p>

                  <p className="text-slate-500">
                    Class: {student.studentClass}
                  </p>

                  <p className="text-slate-500">
                    Percentage: {student.percentage}%
                  </p>

                  <p className="text-slate-500">
                      Attendance: {student.attendance || 0}%
                  </p>

                  <span
                    className={`inline-block mt-3 px-4 py-1 rounded-full text-sm font-semibold ${
                      student.feeStatus === "Paid"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {student.feeStatus}
                  </span>

                </div>
              </div>

              <div className="flex gap-4 mt-6">

                <button
                  onClick={() => handleEdit(student)}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-2xl cursor-pointer"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteStudent(student._id)}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-2xl cursor-pointer"
                >
                  Delete
                </button>

              </div>

            </div>
          ))}
      </div>
    </div>
  ))}
</div>
    </div>

    {/* VISITORS SECTION */}
<div className="mt-10">
   <AdminVisitors visitors={visitors} />
</div>

{/* ADMISSION SECTION */}
<div className="mt-10">

  <AdminAdmission
  />

</div>

    {/* feedback */}
<div className="bg-white mt-10 shadow-lg rounded-2xl p-6 mb-8 border-l-4 border-cyan-500">

  <h2 className="text-2xl font-bold text-gray-800 mb-5">
    💬 Student Feedbacks
  </h2>

  <div className="space-y-4">

    {feedbacks.length > 0 ? (

      feedbacks.map((f) => (

        <div
          key={f._id}
          className="bg-slate-50 border rounded-2xl p-4"
        >

          <div className="flex justify-between items-center mb-2">

            <h3 className="font-bold text-blue-700">
              {f.name}
            </h3>

            <button
              onClick={async () => {

                await fetch(
                  `http://localhost:3000/api/feedback/${f._id}`,
                  {
                    method: "DELETE",
                  }
                );

                setFeedbacks(
                  feedbacks.filter(
                    (item) => item._id !== f._id
                  )
                );
              }}

              className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm"
            >
              Delete
            </button>

          </div>

          <p className="text-gray-600">
            {f.message}
          </p>

        </div>
      ))

    ) : (
      <p className="text-gray-400">
        No feedbacks found
      </p>
    )}

  </div>
</div>

</div>
</div>
  )
}