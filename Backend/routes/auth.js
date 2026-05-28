const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const authMiddleware = require("../middleware/authMiddleware");
// const multer = require("multer");
const upload = require("../multer");

const router = express.Router();

// const storage = multer.diskStorage({
//     destination: "./uploads",
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + "-" + file.originalname);
//     }
// });

// const upload = multer({ storage });


// REGISTER
router.post("/register", upload.single("photo"), async(req, res) => {
    console.log("BODY:", req.body)
    const { name, number, password, rollNo, role, feeStatus, studentClass, percentage, attendance } = req.body;

    if (!/^\d{10}$/.test(number)) {
        return res.status(400).json({
            message: "Mobile number must be exactly 10 digits"
        });
    }

    const isValidPassword =
        password.length >= 8 &&
        password[0] === password[0].toUpperCase() &&
        /[0-9]/.test(password) &&
        /[@$!%*?&]/.test(password);

    console.log("PASSWORD VALID:", isValidPassword);

    if (!isValidPassword) {
        return res.json({
            message: "Password must start with capital letter, contain number, special character and be at least 8 characters long"
        });
    }

    const existingUser = await User.findOne({ number });

    if (existingUser) {
        return res.json({
            message: "User already exists"
        });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
        name,
        number,
        password: hashedPassword,

        role: role || "student",

        rollNo: role === "student" ? rollNo : undefined,
        feeStatus: role === "student" ? feeStatus : undefined,
        studentClass: role === "student" ? studentClass : undefined,
        percentage: role === "student" ? percentage : undefined,
        attendance: role === "student" ? attendance : undefined,
        // photo: role === "student" ? photoFilename : undefined
        photo: role === "student" && req.file ?
            req.file.path : ""
    });

    await newUser.save();

    res.json({
        message: "Registered successfully"
    });
});

router.put("/student/:id", upload.single("photo"), async(req, res) => {
    try {
        const existingStudent = await User.findById(req.params.id);

        await User.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            number: req.body.number,
            rollNo: req.body.rollNo,
            feeStatus: req.body.feeStatus,
            studentClass: req.body.studentClass,
            percentage: req.body.percentage,
            attendance: req.body.attendance,
            photo: req.file ?
                req.file.path : existingStudent.photo
        });

        res.json({ message: "Student updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Update failed" });
    }
});

// LOGIN
router.post("/login", async(req, res) => {
    const { number, password } = req.body;

    const user = await User.findOne({ number });

    if (!user) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    const isMatch = await bcrypt.compare(
        password,
        user.password
    );

    if (!isMatch) {
        return res.status(401).json({
            message: "Wrong password"
        });
    }

    const token = jwt.sign({ id: user._id },
        process.env.DB_CONNECT_STRING, { expiresIn: "1d" }
    );

    return res.status(200).json({
        message: "Login successful",
        token,
        role: user.role,
        user: {
            _id: user._id,
            name: user.name,
            number: user.number,
            rollNo: user.rollNo,
            photo: user.photo,
            studentClass: user.studentClass,
            feeStatus: user.feeStatus,
            percentage: user.percentage,
            attendance: user.attendance
        }
    });
});


// PROTECTED ROUTE
router.get("/profile", authMiddleware, async(req, res) => {
    res.json({
        message: "Welcome to dashboard",
        userId: req.user.id
    });
});

router.get("/students", async(req, res) => {
    try {
        const students = await User.find({ role: "student" });

        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({
            message: "Error fetching students"
        });
    }
});

router.delete("/student/:id", async(req, res) => {
    try {
        const deletedStudent = await User.findByIdAndDelete(req.params.id);

        if (!deletedStudent) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        return res.status(200).json({
            message: "Student deleted successfully"
        });
    } catch (error) {
        console.log("Delete Error:", error);

        return res.status(500).json({
            message: "Delete failed"
        });
    }
});


module.exports = router;