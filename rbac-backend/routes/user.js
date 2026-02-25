const bcrypt = require('bcrypt'); 
const express = require('express');
const router = express.Router();
const User = require('../models/User'); 
const { 
    verifyToken, 
    verifyTokenAndAuthorization, 
    verifyTokenAndAdmin 
} = require('../middleware/verifyToken');

router.get('/profile', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) return res.status(404).json("User not found");
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/test', verifyToken, (req, res) => {
    res.status(200).json("Welcome! valid token");
});

router.get('/profile/:id', verifyTokenAndAuthorization, (req, res) => {
    res.status(200).json("Access Granted: either viewing profile or you're Admin");
});

router.get('/admin-dashboard', verifyTokenAndAdmin, (req, res) => {
    res.status(200).json("Welcome Admin!");
});

router.delete('/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json("User not found");
        }
        res.status(200).json("User has been deleted... 🗑️");
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put('/:id', verifyTokenAndAuthorization, async (req, res) => {
    if (req.body.password) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/', verifyTokenAndAdmin, async (req, res) => {
    try {
        const users = await User.find().select('-password').sort({ createdAt: -1 });
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;