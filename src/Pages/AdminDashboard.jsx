
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config.js";
import AdminVisitors from "./adminvisitor";
import Admission from "./Admission";
import AdminAdmission from "./AdminAdmission";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const [students, setStudents] = useState([]);
  const [rollNo, setRollNo] = useState("");
  const [photo, setPhoto] = useState(null);
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState("");
  const [notice, setNotice] = useState("");
  const [notices, setNotices] = useState([]);
  const [feeStatus, setFeeStatus] = useState("Pending");
  const [totalFees, setTotalFees] = useState("");
  const [paidFees, setPaidFees] = useState("");
  const [activeFeeTab, setActiveFeeTab] = useState("All"); 
  const [studentClass, setStudentClass] = useState("");
  const [percentage, setPercentage] = useState("");
  const [attendance, setAttendance] = useState("");
  const fileInputRef = useRef(null);
  const formRef = useRef(null);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  // const [newPass, setNewPass] = useState("");
  const [step, setStep] = useState(1);
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [searchPayment, setSearchPayment] = useState("");
  const [selectedClass, setSelectedClass] = useState("All");
  const [pendingPayments, setPendingPayments] = useState([]);
  const [visitors, setVisitors] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [admissions, setAdmissions] = useState([]);
  const [fatherName, setFatherName] = useState("");
  const [dob, setDob] = useState("");
  const [aadharPhoto, setAadharPhoto] = useState(null);
  const aadharInputRef = useRef(null);

  const fetchAdmissions = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/admission`);
      const data = await response.json();
      setAdmissions(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchStudents = () => {
    fetch(`${API_BASE_URL}/api/students`)
      .then((res) => res.json())
      .then((data) => setStudents(data))
      .catch((err) => console.log("Students fetch error:", err));
  };

  const fetchPendingPayments = () => {
    fetch(`${API_BASE_URL}/api/admin/pending-payments`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setPendingPayments(Array.isArray(data) ? data : []))
      .catch((err) => console.log("Pending payments fetch error:", err.message));
  };

  const fetchFeedbacks = () => {
    fetch(`${API_BASE_URL}/api/feedback`)
      .then((res) => res.json())
      .then((data) => setFeedbacks(data))
      .catch((err) => console.log("Feedback fetch error:", err));
  };

  useEffect(() => {
    fetchAdmissions();
    fetchStudents();
    fetchPendingPayments();
    fetchFeedbacks();

    fetch(`${API_BASE_URL}/api/notices`)
      .then((res) => res.json())
      .then((data) => setNotices(data));

    fetch(`${API_BASE_URL}/api/enquiries`)
      .then((res) => res.json())
      .then((data) => {
        const visitorData = data.filter((item) => item.type !== "admission");
        setVisitors(visitorData);
      });

    fetch(`${API_BASE_URL}/api/admin/payment-history`)
      .then(async (res) => {
        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
          setPaymentHistory([]);
          return;
        }
        setPaymentHistory(Array.isArray(data) ? data : []);
      })
      .catch(() => {
        setPaymentHistory([]);
      });
  }, []);

  const deleteAdmission = async (id) => {
    try {
      await fetch(`${API_BASE_URL}/api/admission/${id}`, {
        method: "DELETE",
      });
      fetchAdmissions();
    } catch (error) {
      console.log(error);
    }
  };

  const handlePaymentAction = async (paymentId, action) => {
    const route = action === "approve" ? "approve-payment" : "reject-payment";
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/${route}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ paymentId }),
      });

      const data = await res.json();
      alert(data.message);

      fetchPendingPayments();
      fetchStudents();
    } catch (error) {
      console.error("Payment action error:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!id) {
      alert("Notice ID missing!");
      return;
    }

    if (window.confirm("Kya aap is notice ko delete karna chahte hain?")) {
      try {
        const res = await fetch(`${API_BASE_URL}/api/admin/notices/${id}`, {
          method: "DELETE",
        });

        if (res.ok) {
          alert("Deleted successfully!");
          setNotices((prevNotices) => prevNotices.filter((n) => n._id !== id));
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

  const registerStudent = async () => {
    const selectedPhoto = photo || fileInputRef.current?.files?.[0] || null;

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

    if (!selectedPhoto && !editId) {
      alert("Please select student photo");
      return;
    }

    const formData = new FormData();
    formData.append("name", name.trim());
    formData.append("number", String(number).trim());
    formData.append("password", password);
    formData.append("rollNo", rollNo.trim());
    formData.append("fatherName", fatherName);
    formData.append("dob", dob);
    if (aadharPhoto) {
    formData.append("aadharPhoto", aadharPhoto);}
    formData.append("role", "student");
    formData.append("feeStatus", feeStatus);
    formData.append("studentClass", studentClass);
    formData.append("percentage", percentage || "0");
    formData.append("attendance", attendance || "0");
    formData.append("totalFees", totalFees || 0);
    formData.append("paidFees", paidFees || 0);

    if (selectedPhoto) {
      formData.append("photo", selectedPhoto);
    }

    const url = editId
      ? `${API_BASE_URL}/api/student/${editId}`
      : `${API_BASE_URL}/api/register`;

    const method = editId ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        body: formData,
      });

      const text = await res.text();
      if (!res.ok) {
        alert("Server Error");
        return;
      }

      const data = JSON.parse(text);
      alert(data.message);

      fetchStudents();
      fetchPendingPayments();

      setName("");
      setNumber("");
      setPassword("");
      setRollNo("");
      setFatherName("");
      setDob("");
      setAadharPhoto(null);
      if (aadharInputRef.current) {
      aadharInputRef.current.value = "";}
      setPhoto(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      setFeeStatus("Pending");
      setEditId("");
      setStudentClass("");
      setPercentage("");
      setAttendance("");
      setTotalFees("");
      setPaidFees("");
    } catch (err) {
      console.log(err);
    }
  };

  const deleteStudent = async (id) => {
    if (!window.confirm("Kya aap is student ko delete karna chahte hain?")) return;
    const res = await fetch(`${API_BASE_URL}/api/student/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();
    alert(data.message);
    setStudents(students.filter((student) => student._id !== id));
  };

  const handleEdit = (student) => {
    setName(student.name);
    setNumber(student.number);
    setRollNo(student.rollNo);
    setFatherName(student.fatherName || "");
    setDob(student.dob || "");
    setEditId(student._id);
    setFeeStatus(student.feeStatus || "Pending");
    setStudentClass(student.studentClass || "");
    setPercentage(student.percentage || "");
    setAttendance(student.attendance || "");
    setTotalFees(student.totalFees || "");
    setPaidFees(student.paidFees || "");
    formRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  // const sendOTP = async () => {
  //   if (!email) {
  //     alert("Please enter admin email");
  //     return;
  //   }
  //   const res = await fetch(`${API_BASE_URL}/api/admin/send-otp`, {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ email }),
  //   });
  //   const data = await res.json();
  //   if (res.ok) setStep(2);
  //   alert(data.message);
  // };

  // const resetPassword = async () => {
  //   const res = await fetch(`${API_BASE_URL}/api/admin/verify-otp-reset`, {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ otp, newPassword: newPass }),
  //   });
  //   const data = await res.json();
  //   if (res.ok) {
  //     setStep(1);
  //     setOtp("");
  //     setNewPass("");
  //   }
  //   alert(data.message);
  // };

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name?.toLowerCase().includes(search.toLowerCase()) ||
      student.rollNo?.toString().includes(search);

    const matchesTab =
      activeFeeTab === "All" || student.feeStatus === activeFeeTab;

    return matchesSearch && matchesTab;
  });

  const paymentRows = Array.isArray(paymentHistory) ? paymentHistory : [];

  const filteredPaymentRows = paymentRows.filter((pay) => {
    const matchesSearch =
      pay.studentName?.toLowerCase().includes(searchPayment.toLowerCase()) ||
      pay.studentRoll?.toLowerCase().includes(searchPayment.toLowerCase()) ||
      pay.transactionId?.toLowerCase().includes(searchPayment.toLowerCase());

    const matchesClass =
      selectedClass === "All" || pay.studentClass === selectedClass;

    return matchesSearch && matchesClass;
  });

  return (
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
            <p className="text-slate-500 font-medium">Total Students</p>
            <h2 className="text-5xl font-black text-blue-700 mt-3">{students.length}</h2>
          </div>
          <div className="bg-white/80 backdrop-blur-xl border border-white/40 rounded-3xl p-6 shadow-xl hover:-translate-y-2 transition-all duration-500">
            <p className="text-slate-500 font-medium">Total Teachers</p>
            <h2 className="text-5xl font-black text-emerald-600 mt-3">12</h2>
          </div>
          <div className="bg-white/80 backdrop-blur-xl border border-white/40 rounded-3xl p-6 shadow-xl hover:-translate-y-2 transition-all duration-500">
            <p className="text-slate-500 font-medium">Fees Pending Verification</p>
            <h2 className="text-5xl font-black text-rose-500 mt-3">{pendingPayments.length}</h2>
          </div>
        </div>

        {/* REGISTER STUDENT */}
        <div ref={formRef} className="bg-white/80 backdrop-blur-xl border border-white/40 shadow-2xl rounded-[2rem] p-8 mb-10">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-700 via-sky-500 to-cyan-500 bg-clip-text text-transparent mb-8">
            {editId ? "Update Student Details" : "Register Student"}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <input
              type="text"
              placeholder="Student Name"
              value={name}
              onChange={(e) => setName(e.target.value.replace(/[^A-Za-z\s]/g, ""))}
              className="bg-blue-50 border border-blue-100 rounded-2xl p-4 outline-none focus:ring-4 focus:ring-blue-200"
            />
            <input
              type="text"
              placeholder="Mobile Number"
              value={number}
              maxLength="10"
              onChange={(e) => setNumber(e.target.value.replace(/[^0-9]/g, ""))}
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
              onChange={(e) => setRollNo(e.target.value.replace(/[^0-9]/g, ""))}
              className="bg-blue-50 border border-blue-100 rounded-2xl p-4 outline-none focus:ring-4 focus:ring-blue-200"
            />
            <input
              type="text"
              placeholder="Father Name"
              value={fatherName}
              onChange={(e) =>
              setFatherName(e.target.value.replace(/[^A-Za-z\s]/g, ""))}
              className="bg-blue-50 border border-blue-100 rounded-2xl p-4 outline-none focus:ring-4 focus:ring-blue-200"/>
              <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="bg-blue-50 border border-blue-100 rounded-2xl p-4 outline-none focus:ring-4 focus:ring-blue-200"/>
              <div>
             {/* <input
             ref={aadharInputRef}
             type="file"
             accept="image/*"
             onChange={(e) => setAadharPhoto(e.target.files[0])}
             className="w-full bg-blue-50 border border-blue-100 rounded-2xl p-4"/> */}
             <label className="cursor-pointer bg-blue-50 border border-blue-100 rounded-2xl p-4 flex items-center justify-between">
  <span>
    {aadharPhoto ? aadharPhoto.name : "Upload Aadhaar Card"}
  </span>

  <input
    type="file"
    accept="image/*"
    onChange={(e) => setAadharPhoto(e.target.files[0])}
    className="hidden"
  />
</label>
</div>
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
              onChange={(e) => setPercentage(e.target.value.replace(/[^0-9.]/g, ""))}
              className="bg-blue-50 border border-blue-100 rounded-2xl p-4 outline-none focus:ring-4 focus:ring-blue-200"
            />
            <input
              type="text"
              placeholder="Attendance %"
              value={attendance}
              onChange={(e) => setAttendance(e.target.value.replace(/[^0-9]/g, ""))}
              className="bg-blue-50 border border-blue-100 rounded-2xl p-4 outline-none focus:ring-4 focus:ring-blue-200"
            />
            <input
              type="number"
              placeholder="Total Course Fees"
              value={totalFees}
              onChange={(e) => setTotalFees(e.target.value)}
              className="bg-blue-50 border border-blue-100 rounded-2xl p-4 outline-none focus:ring-4 focus:ring-blue-200"
            />
            <input
              type="number"
              placeholder="Initial Paid Amount"
              value={paidFees}
              onChange={(e) => setPaidFees(e.target.value)}
              className="bg-blue-50 border border-blue-100 rounded-2xl p-4 outline-none focus:ring-4 focus:ring-blue-200"
            />
            <div>
              <input
                ref={fileInputRef}
                type="file"
                name="photo"
                accept="image/*"
                onChange={(e) => setPhoto(e.target.files[0])}
                className="w-full bg-blue-50 border border-blue-100 rounded-2xl p-4"
              />
            </div>
            <select
              value={feeStatus}
              onChange={(e) => setFeeStatus(e.target.value)}
              className="bg-blue-50 border border-blue-100 rounded-2xl p-4 outline-none focus:ring-4 focus:ring-blue-200 font-semibold text-slate-700 col-span-1 md:col-span-2"
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
        {/* <div className="bg-white/80 backdrop-blur-xl border border-white/40 shadow-2xl rounded-[2rem] p-8 mb-10">
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
        </div> */}

        {/* FEE VERIFICATION REQUESTS */}
        <div className="bg-white/80 backdrop-blur-xl border border-white/40 shadow-2xl rounded-[2rem] p-8 mb-10">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-700 via-sky-500 to-cyan-500 bg-clip-text text-transparent mb-8">
            Fee Verification Requests
          </h2>
          {pendingPayments.filter((p) => p.status === "Pending" || p.status === "pending").length === 0 ? (
            <p className="text-slate-500">No pending payments.</p>
          ) : (
            <div className="space-y-5">
              {pendingPayments
                .filter((p) => p.status === "Pending" || p.status === "pending")
                .map((p) => (
                  <div
                    key={p._id}
                    className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-100 rounded-3xl p-6 flex flex-col lg:flex-row justify-between lg:items-center gap-5 hover:shadow-xl transition-all duration-300"
                  >
                    <div>
                      <h3 className="text-xl font-bold text-slate-800">{p.studentName}</h3>
                      <p className="text-slate-500">Roll No: {p.studentRoll}</p>
                      <p className="text-slate-500">Class: {p.studentClass}</p>
                      <p className="text-slate-500 mt-1">Transaction ID: {p.transactionId}</p>
                      <p className="text-green-600 font-bold mt-2">₹{p.amount}</p>
                    </div>
                    <div className="flex gap-4">
                      <button
                        onClick={() => handlePaymentAction(p._id, "approve")}
                        className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-2xl shadow-md transition-all cursor-pointer font-semibold"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handlePaymentAction(p._id, "reject")}
                        className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-2xl shadow-md transition-all cursor-pointer font-semibold"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>

        {/* PAYMENT HISTORY */}
        <div className="mt-10 bg-white/80 backdrop-blur-xl border border-white/40 shadow-2xl rounded-[2rem] p-8 mb-10">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-700 via-sky-500 to-cyan-500 bg-clip-text text-transparent mb-8">
            Payment History
          </h2>

          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <input
              type="text"
              placeholder="Search by Name / Roll No / Transaction ID"
              value={searchPayment}
              onChange={(e) => setSearchPayment(e.target.value)}
              className="flex-1 border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />

            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="All">All Classes</option>
              <option value="Nursery">Nursery</option>
              <option value="LKG">LKG</option>
              <option value="UKG">UKG</option>
              {[...Array(12)].map((_, i) => (
                <option key={i + 1} value={String(i + 1)}>
                  Class {i + 1}
                </option>
              ))}
            </select>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b text-left text-slate-600 font-semibold">
                  <th className="p-3">Student</th>
                  <th className="p-3">Roll No</th>
                  <th className="p-3">Class</th>
                  <th className="p-3">Amount</th>
                  <th className="p-3">Transaction ID</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPaymentRows.map((pay) => (
                  <tr key={pay._id} className="border-b hover:bg-blue-50">
                    <td className="p-3">{pay.studentName}</td>
                    <td className="p-3">{pay.studentRoll}</td>
                    <td className="p-3">Class {pay.studentClass}</td>
                    <td className="p-3 font-semibold text-green-600">₹{pay.amount}</td>
                    <td className="p-3">{pay.transactionId}</td>
                    <td className="p-3">{new Date(pay.date).toLocaleDateString()}</td>
                    <td className="p-3">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          pay.status?.toLowerCase() === "approved"
                            ? "bg-green-100 text-green-700"
                            : pay.status?.toLowerCase() === "rejected"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {pay.status}
                      </span>
                    </td>
                    <td className="p-3">
                      <button
                        onClick={async () => {
                          if (!window.confirm("Delete this payment record?")) return;
                          const res = await fetch(
                            `${API_BASE_URL}/api/admin/payment-history/${pay._id}`,
                            { method: "DELETE" }
                          );
                          const data = await res.json().catch(() => ({}));
                          alert(data.message || "Payment record deleted");
                          setPaymentHistory((prev) => prev.filter((item) => item._id !== pay._id));
                        }}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm cursor-pointer transition-colors"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
              if (!notice.trim()) return alert("Notice cannot be empty");
              fetch(`${API_BASE_URL}/api/notices`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text: notice.trim() }),
              })
                .then((res) => res.json())
                .then((data) => {
                  alert(data.message);
                  setNotice("");
                  fetch(`${API_BASE_URL}/api/notices`)
                    .then((res) => res.json())
                    .then((d) => setNotices(d));
                });
            }}
            className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-8 py-4 rounded-2xl shadow-lg hover:scale-105 transition-all"
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
                  <p className="font-semibold text-slate-700">{n.text}</p>
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

        {/* STUDENTS LIST (MOVED IMAGE LAYOUT HERE) */}
        <div className="bg-white/80 backdrop-blur-xl border border-white/40 shadow-2xl rounded-[2rem] p-8 mb-10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-700 via-sky-500 to-cyan-500 bg-clip-text text-transparent">
              Students List
            </h2>
            
            <div className="flex bg-blue-50 p-1.5 rounded-2xl border border-blue-100 self-start lg:self-center">
              {["All", "Paid", "Pending"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveFeeTab(tab)}
                  className={`px-5 py-2 rounded-xl font-semibold text-sm transition-all cursor-pointer ${
                    activeFeeTab === tab
                      ? "bg-white text-blue-700 shadow-md"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <input
            type="text"
            placeholder="Search by name or roll no..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-blue-50 border border-blue-100 rounded-2xl p-4 outline-none mb-8"
          />

          <div className="space-y-10">
            {[...new Set(filteredStudents.map((s) => s.studentClass))].map((className) => (
              <div key={className}>
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-2xl font-bold text-blue-700">Class {className}</h3>
                  <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-xl text-sm font-semibold">
                    {filteredStudents.filter((s) => s.studentClass === className).length} Students
                  </span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {filteredStudents
                    .filter((student) => student.studentClass === className)
                    .map((student) => {
                      // Student wise calculation
                      const sTotal = Number(student.totalFees || 0);
                      const sPaid = Number(student.paidFees || 0);
                      const sRemaining = sTotal - sPaid;

                      return (
                        <div
                          key={student._id}
                          className="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-100 rounded-[2rem] p-6 hover:-translate-y-2 transition-all duration-500 shadow-lg flex flex-col justify-between"
                        >
                          <div className="flex items-center gap-5">
                            <img
                              src={
                                student.photo
                                  ? /^https?:\/\//i.test(student.photo)
                                    ? student.photo
                                    : student.photo.startsWith("uploads/")
                                    ? `${API_BASE_URL}/${student.photo}`
                                    : `${API_BASE_URL}/uploads/${student.photo}`
                                  : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                      student.name || "Student"
                                    )}&background=2563eb&color=fff`
                              }
                              alt={student.name}
                              className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                            />
                            <div>
                              <h3 className="text-2xl font-bold text-slate-800">{student.name}</h3>
                              <p className="text-slate-500 mt-1">Roll No: {student.rollNo}</p>
                              <p className="text-slate-500">Class: {student.studentClass}</p>
                              <p className="text-slate-500">Attendance: {student.attendance || 0}%</p>
                              
                              <div className="flex items-center gap-3 mt-2">
                                <span
                                  className={`inline-block px-4 py-1 rounded-full text-sm font-semibold ${
                                    student.feeStatus === "Paid"
                                      ? "bg-green-100 text-green-700"
                                      : "bg-red-100 text-red-600"
                                  }`}
                                >
                                  {student.feeStatus}
                                </span>
                                <span className="text-xs text-slate-400 font-medium">Total: ₹{sTotal}</span>
                              </div>
                            </div>
                          </div>

                          {/* SCREENSHOT CARD STRIP IMPLEMENTED EXACTLY HERE */}
                          <div className="bg-white/90 border border-blue-100 rounded-2xl p-3 flex justify-around items-center mt-5 shadow-sm">
                            <div className="text-center">
                              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Fees Paid</p>
                              <p className="text-md font-extrabold text-green-600">₹{sPaid}</p>
                            </div>
                            <div className="h-6 w-px bg-slate-200"></div>
                            <div className="text-center">
                              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Fees Unpaid (Remaining)</p>
                              <p className={`text-md font-extrabold ${sRemaining > 0 ? "text-rose-500" : "text-slate-600"}`}>
                                ₹{sRemaining >= 0 ? sRemaining : 0}
                              </p>
                            </div>
                          </div>

                          <div className="flex gap-4 mt-5">
                            <button
                              onClick={() => handleEdit(student)}
                              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-xl cursor-pointer font-semibold transition-all text-sm text-center"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => deleteStudent(student._id)}
                              className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2.5 rounded-xl cursor-pointer font-semibold transition-all text-sm text-center"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      );
                    })}
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
          <AdminAdmission admissions={admissions} deleteAdmission={deleteAdmission} />
        </div>

        {/* STUDENT FEEDBACKS */}
        <div className="bg-white mt-10 shadow-lg rounded-2xl p-6 mb-8 border-l-4 border-cyan-500">
          <h2 className="text-2xl font-bold text-gray-800 mb-5">💬 Student Feedbacks</h2>
          <div className="space-y-4">
            {feedbacks.length > 0 ? (
              feedbacks.map((f) => (
                <div key={f._id} className="bg-slate-50 border rounded-2xl p-4 flex justify-between items-start gap-4">
                  <div>
                    <h3 className="font-bold text-blue-700">{f.name || "Anonymous"}</h3>
                    <p className="text-slate-600 mt-1">{f.message || f.feedback}</p>
                  </div>
                  <button
                    onClick={async () => {
                      if (!window.confirm("Delete this feedback?")) return;
                      try {
                        const res = await fetch(`${API_BASE_URL}/api/feedback/${f._id}`, {
                          method: "DELETE",
                        });
                        if (res.ok) {
                          alert("Feedback deleted successfully");
                          setFeedbacks((prev) => prev.filter((item) => item._id !== f._id));
                        }
                      } catch (err) {
                        console.log("Delete feedback error:", err);
                      }
                    }}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl text-sm transition-colors cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
              ))
            ) : (
              <p className="text-slate-500">No feedbacks submitted yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}