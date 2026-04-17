const mongoose = require('mongoose');

const OutfitSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    imageUrl: { type: String, required: true },
    color: { type: String },
    weatherOptions: [{ type: String, enum: ['hot', 'cold', 'rainy'] }],
    occasion: [{ type: String, enum: ['casual', 'formal', 'party', 'sports', 'festival', 'wedding'] }],
    style: [{ type: String, enum: ['minimal', 'streetwear', 'ethnic', 'sporty', 'indian'] }],
    gender: { type: String, enum: ['male', 'female', 'unisex'], default: 'unisex' }
});

module.exports = mongoose.model('Outfit', OutfitSchema);
