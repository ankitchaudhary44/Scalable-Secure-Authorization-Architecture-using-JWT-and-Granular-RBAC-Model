const express = require('express');
const router = express.Router();
const Log = require('../models/Log');
const User = require('../models/User');
const { verifyTokenAndAdmin } = require('../middleware/verifyToken');

router.get('/', verifyTokenAndAdmin, async (req, res) => {
    try {
        const logs = await Log.find().sort({ timestamp: -1 }).limit(20);
        res.status(200).json(logs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/stats', verifyTokenAndAdmin, async (req, res) => {
    try {
        const totalLogs = await Log.countDocuments();
        
        const startOfToday = new Date();
        startOfToday.setHours(0, 0, 0, 0);

        const failedAttempts = await Log.countDocuments({ 
            status: { $in: ['Failed', 'Warning'] },
            timestamp: { $gte: startOfToday }
        });
        
        res.status(200).json({ 
            totalLogs, 
            failedAttempts 
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;