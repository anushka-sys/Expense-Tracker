const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require("../Models/User");

// Environment variable check
if (!process.env.JWT_SECRET) {
    throw new Error('Missing JWT_SECRET environment variable');
}

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Validate request body
        if (!name || !email || !password) {
            return res.status(400).json({ 
                message: "All fields (name, email, password) are required", 
                success: false 
            });
        }

        // Check if the user already exists
        const user = await UserModel.findOne({ email });
        if (user) {
            return res.status(409).json({ 
                message: 'User already exists, please login', 
                success: false 
            });
        }

        // Hash password and save the new user
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new UserModel({ name, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({
            message: "Signup successful",
            success: true,
        });
    } catch (err) {
        console.error("Error during signup:", err); // Log the error for debugging
        res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate request body
        if (!email || !password) {
            return res.status(400).json({ 
                message: "Email and password are required", 
                success: false 
            });
        }

        // Find user by email
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(403).json({ 
                message: "Authentication failed: email or password is incorrect", 
                success: false 
            });
        }

        // Compare passwords
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(403).json({ 
                message: "Authentication failed: email or password is incorrect", 
                success: false 
            });
        }

        // Generate JWT token
        const jwtToken = jwt.sign(
            { email: user.email, _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(200).json({
            message: "Login successful",
            success: true,
            jwtToken,
            email: user.email,
            name: user.name,
        });
    } catch (err) {
        console.error("Error during login:", err); // Log the error for debugging
        res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
};

module.exports = {
    signup,
    login,
};
