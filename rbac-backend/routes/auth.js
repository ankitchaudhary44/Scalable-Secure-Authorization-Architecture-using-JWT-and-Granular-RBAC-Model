const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');


router.post('/register', async (req, res) => {
    try {
        const { username, email, password, role } = req.body;

        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            role
        });

        const savedUser = await newUser.save();
        res.status(201).json({ message: "User Registered!", user: savedUser });
    } catch (err) {
        res.status(500).json(err);
    }
});
const jwt = require('jsonwebtoken'); 


router.post('/login', async (req, res) => {
    try {
        
        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(404).json("User not found!");

        
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) return res.status(400).json("Wrong password!");

        
        const token = jwt.sign(
            { id: user._id, role: user.role }, 
            process.env.JWT_SECRET, 
            { expiresIn: "1h" }
        );

        
        const { password, ...others } = user._doc;
        res.status(200).json({ ...others, token });

    } catch (err) {
        res.status(500).json(err);
    }
});
module.exports = router;