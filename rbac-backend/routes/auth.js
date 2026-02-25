const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Log = require('../models/Log'); 
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken');

const getClientIp = (req) => {
    const forwarded = req.headers['x-forwarded-for'];
    const ip = forwarded ? forwarded.split(',')[0] : req.socket.remoteAddress;
    if (ip === '::1' || ip === '::ffff:127.0.0.1') return '127.0.0.1 (Localhost)';
    return ip;
};

router.post('/register', async (req, res) => {
    try {
        const { username, email, password, role } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            role: role || "User"
        });

        const savedUser = await newUser.save();

        try {
            await Log.create({
                userId: savedUser._id,
                username: savedUser.username,
                action: "New Account Registered",
                status: "Success",
                ipAddress: getClientIp(req)
            });
        } catch (logErr) {
            console.log(logErr);
        }

        res.status(201).json({ message: "User Registered!", user: savedUser });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            await Log.create({
                action: `Login Attempt: ${req.body.email}`,
                status: "Failed",
                ipAddress: getClientIp(req)
            });
            return res.status(404).json("User not found!");
        }

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            await Log.create({
                userId: user._id,
                username: user.username,
                action: "Login Attempt: Wrong Password",
                status: "Warning",
                ipAddress: getClientIp(req)
            });
            return res.status(400).json("Wrong password!");
        }

        const token = jwt.sign(
            { id: user._id, role: user.role }, 
            process.env.JWT_SECRET, 
            { expiresIn: "1h" }
        );

        await Log.create({
            userId: user._id,
            username: user.username,
            action: "User Authenticated",
            status: "Success",
            ipAddress: getClientIp(req)
        });

        const { password, ...others } = user._doc;
        res.status(200).json({ ...others, token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;