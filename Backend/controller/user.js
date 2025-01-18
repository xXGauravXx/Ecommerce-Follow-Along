const express = require('express');
const path = require('path');
const User = require('../model/user');
const router = express.Router();
const { upload } = require("../middleware/multer");
const ErrorHandler = require("../utils/ErrorHandler");
const fs = require("fs");
const bcrypt = require('bcryptjs');

// Create User Route
router.post("/create-user", upload.single('file'), async (req, res, next) => {
    try {
        console.log("create user");
        const { name, email, password } = req.body;

        // Check if the user already exists
        const userEmail = await User.findOne({ email });
        if (userEmail) {
            // Delete the uploaded file if it exists
            if (req.file) {
                const filepath = path.join(__dirname, '../uploads', req.file.filename);
                try {
                    fs.unlinkSync(filepath);
                } catch (err) {
                    console.error("Error removing file", err);
                    return res.status(500).json({ message: "Error removing file" });
                }
            }
            return next(new ErrorHandler("User already exists", 400));
        }

        // Handle file upload
        let fileURL = "";
        if (req.file) {
            fileURL = path.join("uploads", req.file.filename);
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the user
        const user = await User.create({
            name,
            email,
            password: hashedPassword, // Save the hashed password
            avatar: {
                public_id: req.file?.filename || "",
                url: fileURL,
            }
        });

        res.status(201).json({
            success: true,
            message: "User created successfully",
            user,
        });

    } catch (error) {
        console.error("Error creating user:", error);
        next(new ErrorHandler(error.message, 500));
    }
});

module.exports = router;
