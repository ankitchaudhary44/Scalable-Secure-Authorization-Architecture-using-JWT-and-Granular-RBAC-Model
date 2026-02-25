const mongoose = require('mongoose');

const LogSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    username: { type: String, default: "Guest" },
    action: { type: String, required: true },
    status: { type: String, enum: ['Success', 'Failed', 'Warning'], default: 'Success' },
    ipAddress: { type: String },
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Log', LogSchema);