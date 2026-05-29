const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path")
const bcrypt = require('bcrypt');
const Student = require("./models/user.js");
const nodemailer = require("nodemailer");
let tempOTP = ""; // Temporary storage for OTP
const { GoogleSpreadsheet } = require('google-spreadsheet');
const { JWT } = require('google-auth-library');
const feedbackRoutes = require("./routes/feedback");
const Admission = require("./models/Admission");
// const Enquiry = require("./models/Enquiry");



dotenv.config();

const authRoutes = require("./routes/auth");

const app = express();

// app.use(cors());
// ✅ Ise badalkar upar line 26 ke paas ye likh dijiye:
app.use(cors({
    origin: "https://school-s6ur.vercel.app",
    credentials: true
}));

app.use(express.json());
app.use("/api/feedback", feedbackRoutes);
app.use("/api", authRoutes);
app.use("/upload", express.static(path.join(__dirname, "uploads")));

const visitorSchema = new mongoose.Schema({

    name: String,

    mobile: String,

    message: String,

    interest: String,

    type: String

}, {
    timestamps: true
});

const Visitor = mongoose.models.Visitor || mongoose.model(
    "Visitor",
    visitorSchema
);

// VISITOR FORM
app.post("/api/visitor", async(req, res) => {

    const newVisitor = new Visitor({
        name: req.body.name,
        mobile: req.body.mobile,
        message: req.body.message,
        type: "visitor"
    });

    await newVisitor.save();

    res.json({
        message: "Visitor Saved"
    });
});

app.delete("/api/visitor/:id", async(req, res) => {

    try {

        await Visitor.findByIdAndDelete(req.params.id);

        res.json({
            message: "Visitor deleted successfully"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Delete failed"
        });

    }

});

// GET ALL ENQUIRIES


const enquirySchema = new mongoose.Schema({

    name: {
        type: String
    },

    phone: {
        type: String
    },

    className: {
        type: String
    },

    message: {
        type: String
    },

    interest: {
        type: String
    }

}, {
    timestamps: true
});

// ADMISSION FORM
app.post("/api/admission", async(req, res) => {

    try {

        const newAdmission = new Admission({

            name: req.body.name,

            mobile: req.body.mobile,

            className: req.body.className,

            message: req.body.message

        });

        await newAdmission.save();

        res.json({
            success: true,
            message: "Admission submitted successfully"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }

});

app.get("/api/admission", async(req, res) => {

    try {

        const data = await Admission.find().sort({
            createdAt: -1
        });

        res.json(data);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Error fetching admissions"
        });

    }

});

app.delete("/api/admission/:id", async(req, res) => {

    try {

        await Admission.findByIdAndDelete(req.params.id);

        res.json({
            message: "Admission deleted successfully"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Delete failed"
        });

    }

});

app.get("/api/enquiries", async(req, res) => {

    try {

        const data = await Admission.find()
            .sort({ createdAt: -1 });

        res.json(data);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Error fetching admissions"
        });

    }

});

app.get("/api/visitor", async(req, res) => {

    const data = await Visitor.find();

    res.json(data);
});

// --- 1. PAYMENT MODEL (Schema) ---
const paymentSchema = new mongoose.Schema({
    studentId: {
        type: String,
        required: true
    },

    studentName: {
        type: String,
        required: true
    },

    studentRoll: {
        type: String,
        required: true
    },

    studentClass: {
        type: String,
        required: true
    },

    amount: {
        type: Number,
        required: true
    },

    transactionId: {
        type: String,
        required: true,
        unique: true
    },

    status: {
        type: String,
        default: "Pending"
    },

    date: {
        type: Date,
        default: Date.now
    }

}, {
    timestamps: true
});

// DELETE PROTECTION
paymentSchema.pre("findOneAndDelete", function(next) {
    next(new Error("Payment history cannot be deleted"));
});

paymentSchema.pre("deleteOne", function(next) {
    next(new Error("Payment history cannot be deleted"));
});

paymentSchema.pre("deleteMany", function(next) {
    next(new Error("Payment history cannot be deleted"));
});
const Payment = mongoose.model("Payment", paymentSchema);

// --- 2. PAYMENT ROUTES ---

// Submit Payment (Student side)

app.post("/api/payment/submit", async(req, res) => {
    try {
        // 1. Yahan studentRoll aur studentClass ko add karein (Destructuring)
        const { studentId, studentName, studentRoll, studentClass, amount, transactionId, paymentMethod } = req.body;

        // Check duplicate transaction
        const existingTxn = await Payment.findOne({ transactionId });
        if (existingTxn) {
            return res.status(400).json({ message: "This Transaction ID is already submitted!" });
        }

        // 2. new Payment object mein ye dono fields pass karein
        const newPayment = new Payment({
            studentId,
            studentName,
            studentRoll, // Add this
            studentClass, // Add this
            amount,
            transactionId,
            paymentMethod
        });

        await newPayment.save();
        res.status(201).json({ message: "Payment submitted! Waiting for Admin approval." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error during payment submission" });
    }
});

// Get Payment History (Student side)
app.get("/api/payment/history/:studentId", async(req, res) => {
    try {
        const history = await Payment.find({ studentId: req.params.studentId }).sort({ date: -1 });
        res.json(history);
    } catch (error) {
        res.status(500).json({ message: "Error fetching payment history" });
    }
});

// Update Status (Admin side - Future use)
app.put("/api/admin/payment/status", async(req, res) => {
    try {
        const { paymentId, status } = req.body;
        await Payment.findByIdAndUpdate(paymentId, { status });
        res.json({ message: "Payment status updated!" });
    } catch (error) {
        res.status(500).json({ message: "Status update failed" });
    }
});



// Yahan 'async' hona bahut zaroori hai
app.post("/api/admin/change-password", async(req, res) => {
    try {
        const { password } = req.body;

        if (!password) {
            return res.status(400).json({ message: "Password required" });
        }

        // Ab ye line error nahi degi
        const hashedPassword = await bcrypt.hash(password, 10);

        const updatedAdmin = await Student.findOneAndUpdate({ role: "admin" }, { password: hashedPassword }, { new: true });

        res.status(200).json({ message: "Password updated successfully!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

// 1. Send OTP Route
app.post("/api/admin/send-otp", async(req, res) => {
    const { email } = req.body;

    // 6-digit random OTP generate karein
    tempOTP = Math.floor(100000 + Math.random() * 900000).toString();

    // Email configuration (Yahan apna email aur password dalein)
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Admin Password Reset OTP",
        text: `Aapka OTP hai: ${tempOTP}. Ye 5 minute ke liye valid hai.`
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: "OTP sent to your email!" });
    } catch (error) {
        res.status(500).json({ message: "Email bhejte waqt error aaya" });
    }
});

// 2. Verify OTP and Change Password
app.post("/api/admin/verify-otp-reset", async(req, res) => {
    const { otp, newPassword } = req.body;

    if (otp === tempOTP) {
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await Student.findOneAndUpdate({ role: "admin" }, { password: hashedPassword });
        tempOTP = ""; // Reset OTP after use
        res.status(200).json({ message: "Password updated successfully!" });
    } else {
        res.status(400).json({ message: "Invalid OTP! Dubara koshish karein." });
    }
});

// --- ADMIN SIDE: Fetch All Pending Payments ---
app.get("/api/admin/pending-payments", async(req, res) => {
    try {
        // Sirf wo payments dhoondo jinka status 'Pending' hai
        const pendingPayments = await Payment.find({ status: "Pending" }).sort({ date: -1 });
        res.json(pendingPayments);
    } catch (error) {
        console.error("Error fetching pending payments:", error);
        res.status(500).json({ message: "Error fetching data from database" });
    }
});

// APPROVE PAYMENT
app.post("/api/admin/approve-payment", async(req, res) => {
    try {
        const { paymentId } = req.body;

        // Payment find karo
        const payment = await Payment.findById(paymentId);

        if (!payment) {
            return res.status(404).json({
                message: "Payment not found"
            });
        }

        // Payment approved
        payment.status = "Approved";
        await payment.save();

        // Student fee update
        await Student.findOneAndUpdate({ rollNo: payment.studentRoll }, { feeStatus: "Paid" });

        res.json({
            message: "Payment approved successfully!"
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Approval failed"
        });
    }
});


// REJECT PAYMENT
app.post("/api/admin/reject-payment", async(req, res) => {
    try {
        const { paymentId } = req.body;

        await Payment.findByIdAndUpdate(paymentId, {
            status: "Rejected"
        });

        res.json({
            message: "Payment rejected"
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Reject failed"
        });
    }
});

app.post("/api/admin/forgot-password", async(req, res) => {
    const { answer, newPassword } = req.body;

    const admin = await Student.findOne({ role: "admin" });

    if (admin.securityAnswer === answer) {
        admin.password = newPassword;
        await admin.save();
        res.json({ message: "Password reset successful!" });
    } else {
        res.status(401).json({ message: "Wrong answer to security question!" });
    }
});


// Search
// Search Route - Ab ye crash nahi hoga!
app.get("/api/search", async(req, res) => {
    try {
        const query = req.query.q;
        if (!query) return res.status(400).json({ message: "Search query is empty" });

        const searchRegex = { $regex: query, $options: "i" };

        // 1. Notices mein dhundo (Kyunki Notice model niche bana hua hai)
        const notices = await Notice.find({
            $or: [{ text: searchRegex }] // Aapke schema me field ka naam 'text' hai
        }).limit(5);

        // 2. Admissions mein dhundo (Kyunki Admission model upar imported hai)
        const admissions = await Admission.find({
            $or: [{ name: searchRegex }, { message: searchRegex }]
        }).limit(5);

        // Sabko ek object mein bhej do (Event aur Teacher hata diye hain taaki crash na ho)
        res.json({ notices, admissions, events: [], teachers: [] });
    } catch (error) {
        console.error("Search Error:", error);
        res.status(500).json({ message: "Server search error" });
    }
});

// --- NOTICE MODEL ---
const noticeSchema = new mongoose.Schema({
    text: { type: String, required: true },
    date: { type: Date, default: Date.now }
});
const Notice = mongoose.model("Notice", noticeSchema);

// --- GET NOTICES ROUTE ---
app.get("/api/notices", async(req, res) => {
    try {
        const notices = await Notice.find().sort({ date: -1 });
        // Frontend ko sirf text ki array chahiye toh map use karein
        res.json(notices);
    } catch (error) {
        res.status(500).json({ message: "Error fetching notices" });
    }
});

app.post("/api/notices", async(req, res) => {
    try {
        const { text } = req.body;

        if (!text) {
            return res.status(400).json({ message: "Notice text required" });
        }

        const newNotice = new Notice({ text });
        await newNotice.save();

        res.json({ message: "Notice added successfully" });
    } catch (error) {
        console.error("Notice error:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// DELETE NOTICE
app.delete("/api/admin/notices/:id", async(req, res) => {
    try {
        const deletedNotice = await Notice.findByIdAndDelete(req.params.id);

        if (!deletedNotice) {
            return res.status(404).json({
                message: "Notice not found"
            });
        }

        res.json({
            message: "Notice deleted successfully"
        });

    } catch (error) {
        console.error("Delete Notice Error:", error);

        res.status(500).json({
            message: "Server error while deleting notice"
        });
    }
});


mongoose.connect(process.env.DB_CONNECT_STRING)
    .then(() => console.log("DB connected"));

// app.listen(3000, () => {
//     console.log("Server running 3000");
// });
// ✅ Ise replace karein code ke bilkul niche:
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// ✅ Vercel serverless ke liye export
module.exports = app;