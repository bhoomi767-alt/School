

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Home, Info, BookOpen, Users, GraduationCap, 
  Trophy, Image, MessageSquare, ChevronDown, CheckCircle,
  LogIn, LogOut, Calendar, BarChart3, Wallet, Bell,
  Phone, UserPlus, School, Briefcase, Search, Hash, 
  ShieldCheck
} from "lucide-react";

export default function Profile() {
  const navigate = useNavigate();
  const [trxId, setTrxId] = useState("");
  const [amount, setAmount] = useState("");
  const [history, setHistory] = useState([]);
  const [msg, setMsg] = useState("");
  const [notices, setNotices] = useState([]);

  // Data retrieval from LocalStorage
  const studentId = localStorage.getItem("studentId");
  const studentName = localStorage.getItem("studentName") || "Unknown Student";
  const studentNumber = localStorage.getItem("studentNumber");
  const studentRoll = localStorage.getItem("studentRoll") || "N/A";
  const studentPhoto = localStorage.getItem("studentPhoto");
  const studentClass = localStorage.getItem("studentClass") || "Not Assigned";
  const studentPercentage = localStorage.getItem("studentPercentage") || "0";
  const studentAttendance = localStorage.getItem("studentAttendance") || "0";

  // 1. Payment History Fetch
  const fetchHistory = async () => {
    try {
      const res = await fetch(`https://school-s6ur.vercel.app/api/payment/history/${studentId}`);
      const data = await res.json();
      setHistory(data);
    } catch (err) {
      console.error("Payment history error:", err);
    }
  };

  // 2. Database se notice lane ka function (ISSE BAHAR NIKAL DIYA HAI)
  const fetchNotices = async () => {
    try {
      const res = await fetch("https://school-s6ur.vercel.app/api/notices");
      const data = await res.json();
      // Ensure karein ki data array hai
      setNotices(Array.isArray(data) ? data : []); 
    } catch (err) {
      console.log("Error fetching notices:", err);
    }
  };

  // 3. Page load hote hi dono data fetch karein
  useEffect(() => {
    if (studentId) {
      fetchHistory();
      fetchNotices();
    }
  }, [studentId]);

  const handlePaymentSubmit = async () => {
    if (!trxId || !amount) {
      alert("Please fill all details (Amount and UTR Number)");
      return;
    }

    const paymentPayload = {
      studentId,
      studentName,
      studentRoll,
      studentClass,
      amount: Number(amount),
      transactionId: trxId,
      paymentMethod: "UPI/QR Scan"
    };

    try {
      const response = await fetch("https://school-s6ur.vercel.app/api/payment/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(paymentPayload)
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setMsg("✅ Payment Submitted! Waiting for Admin approval.");
        setTrxId("");
        setAmount("");
        fetchHistory();
      } else {
        setMsg(`❌ ${data.message || "Error submitting payment"}`);
      }
    } catch (error) {
      console.error("Payment Error:", error);
      alert("Server connection failed!");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="relative z-0 min-h-screen bg-gradient-to-br from-[#e0f2fe] to-[#d6d1cc] text-slate-700 font-sans antialiased">
      <nav className="bg-white/80 backdrop-blur-sm border-b border-slate-200/50 px-6 py-3 flex justify-between items-center sticky top-0 z-[9999] w-full">
        <div className="flex items-center gap-2">
          <CheckCircle className="text-blue-600" size={22} />
          <span className="text-lg font-semibold tracking-tight text-blue-900">
            Sunrise <span className="text-slate-400 font-light">Academy</span>
          </span>
        </div>
        <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-1.5 rounded-md text-slate-500 hover:text-red-500 hover:bg-red-50 transition-all text-sm font-medium">
          <LogOut size={16} /> Logout
        </button>
      </nav>

      <main className="max-w-7xl mx-auto p-4 md:p-10 relative">
        {/* Profile Card */}
        <div className="bg-white/90 rounded-2xl p-6 mb-8 flex flex-col md:flex-row items-center gap-6 shadow-sm border border-white">
          <img src={`https://school-s6ur.vercel.app/upload/${studentPhoto}`} className="w-24 h-24 rounded-full object-cover border-2 border-blue-100 shadow-sm" alt="profile" />
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-semibold text-blue-900">{studentName}</h2>
            <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-2">
              <span className="flex items-center gap-1.5 text-xs text-slate-500 bg-slate-100 px-3 py-1 rounded-full"><Hash size={12}/>Roll number: {studentRoll}</span>
              <span className="flex items-center gap-1.5 text-xs text-slate-500 bg-slate-100 px-3 py-1 rounded-full"><Phone size={12}/> {studentNumber}</span>
              <span className="flex items-center gap-1.5 text-xs text-slate-500 bg-slate-100 px-3 py-1 rounded-full"><Calendar size={12}/> Class: {studentClass}</span>
              <span className="flex items-center gap-1.5 text-xs text-slate-500 bg-slate-100 px-3 py-1 rounded-full"><BarChart3 size={12}/>Attendance: {studentAttendance}%</span>
              <span className="flex items-center gap-1.5 text-xs text-slate-500 bg-slate-100 px-3 py-1 rounded-full"><GraduationCap size={12}/>Percentage: {studentPercentage}%</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8">
              <h3 className="text-lg font-semibold text-blue-900 mb-6 flex items-center gap-2">
                <Wallet className="text-blue-500" size={20} /> Fee Submission Form
              </h3>

              {/* Student Details Section */}
              <div className="grid md:grid-cols-3 gap-4 mb-6 bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div>
                  <label className="text-[10px] uppercase font-bold text-slate-400">Name</label>
                  <p className="text-sm font-medium">{studentName}</p>
                </div>
                <div>
                  <label className="text-[10px] uppercase font-bold text-slate-400">Roll No</label>
                  <p className="text-sm font-medium">{studentRoll}</p>
                </div>
                <div>
                  <label className="text-[10px] uppercase font-bold text-slate-400">Class</label>
                  <p className="text-sm font-medium">{studentClass}</p>
                </div>
              
              </div>

              {/* QR Code */}
              <div className="flex flex-col md:flex-row items-center gap-6 p-5 mb-8 bg-blue-50/50 rounded-2xl border border-blue-100/50">
                <div className="bg-white p-3 rounded-xl shadow-sm border border-blue-100">
                  <img 
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=upi://pay?pa=9981046357@ibl&pn=Sunrise%20Academy${amount ? `&am=${amount}` : ""}`}
                    alt="Payment QR" className="w-28 h-28" 
                  />
                </div>
                <div>
                  <p className="text-sm font-bold text-blue-900">Scan to Pay</p>
                  <p className="text-sm text-blue-900">UPI ID: 9981046357@ibl</p>
                  <p className="text-[11px] text-slate-500 mt-1">GPay/PhonePe se scan karein aur UTR number niche fill karein.</p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-500">Amount (₹)</label>
                  <input type="number" placeholder="0.00" className="w-full bg-white border border-slate-200 rounded-lg p-3 text-sm outline-none" value={amount} onChange={(e) => setAmount(e.target.value)} />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-weight-medium text-blue-600 font-bold">Transaction ID / UTR</label>
                  <input type="text" placeholder="12-digit number" className="w-full bg-white border border-blue-400 rounded-lg p-3 text-sm outline-none" value={trxId} onChange={(e) => setTrxId(e.target.value)} />
                </div>
              </div>
              
              <button onClick={handlePaymentSubmit} className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700 text-white py-3.5 rounded-xl font-semibold transition-all">
                Submit Payment for Approval
              </button>
              {msg && <p className="text-center text-xs mt-4 font-bold">{msg}</p>}
            </div>

            {/* History Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
              <h3 className="text-base font-semibold text-blue-900 mb-4">Payment History</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-slate-400 border-b">
                      <th className="pb-3 text-left">Date</th>
                      <th className="pb-3 text-left">Class</th>
                      <th className="pb-3 text-left">Amount</th>
                      <th className="pb-3 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {history.map((pay) => (
                      <tr key={pay._id} className="border-b border-slate-50">
                        <td className="py-4 text-slate-500">{new Date(pay.date).toLocaleDateString()}</td>
                        <td className="py-4 font-medium">{pay.studentClass || studentClass}</td>
                        <td className="py-4 font-bold text-slate-700">₹{pay.amount}</td>
                        <td className="py-4 text-right">
                          <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${pay.status === "Approved" ? "bg-emerald-50 text-emerald-600" : "bg-orange-50 text-orange-600"}`}>
                            {pay.status.toUpperCase()}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Notice Board Side */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
              <h3 className="text-base font-semibold text-blue-900 mb-5 flex items-center gap-2">
                <Bell className="text-blue-500" size={18} /> Notice Board
              </h3>
              <div className="space-y-4">
                {notices.length > 0 ? (
                  notices.map((item, index) => (
                    <div key={index} className="flex gap-3">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-1.5 shrink-0"></div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {typeof item === 'object' ? item.text : item}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-slate-400 text-xs italic text-center">No new notices</p>
                )}
              </div>
            </div>

            <div className="bg-blue-600 rounded-2xl p-6 text-white shadow-md">
              <h4 className="text-sm font-semibold mb-2 flex items-center gap-2"><ShieldCheck size={16} /> Need Help?</h4>
              <p className="text-[11px] mb-4">Contact office for support.</p>
              <div className="flex items-center gap-2 text-[11px] bg-white/10 p-2 rounded-lg">
                <Phone size={12} /> +91 98765 43210
              </div>
            </div>
            {/* --- MOTIVATIONAL THOUGHT CARD --- */}
<div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-100 shadow-sm mt-6">
  <div className="flex items-center gap-2 mb-3 text-amber-600">
    <Trophy size={18} />
    <span className="text-[10px] font-bold uppercase tracking-wider">Thought of the Day</span>
  </div>
  
  <p className="text-sm font-medium text-slate-700 leading-relaxed italic">
    "Success is not final, failure is not fatal: it is the courage to continue that counts."
  </p>
  
  <div className="mt-4 flex items-center justify-between border-t border-amber-200/50 pt-3">
    <span className="text-[10px] font-bold text-amber-700/60">— Winston Churchill</span>
    <div className="flex gap-1">
      <div className="w-1 h-1 rounded-full bg-amber-300"></div>
      <div className="w-1 h-1 rounded-full bg-amber-300"></div>
      <div className="w-1 h-1 rounded-full bg-amber-300"></div>
    </div>
  </div>
</div>
          </div>
          
        </div>
      </main>
    </div>
  );
}