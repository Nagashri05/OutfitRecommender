const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    savedOutfits: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Outfit' }],
    preferences: {
        style: { type: String },
        gender: { type: String }
    }
});

module.exports = mongoose.model('User', UserSchema);
