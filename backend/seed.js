const mongoose = require('mongoose');
const Outfit = require('./models/Outfit');

// Use matching connection string from server.js
const MONGO_URI = 'mongodb://localhost:27017/outfit_recommender';

mongoose.connect(MONGO_URI)
    .then(() => console.log('MongoDB Connected to seed data'))
    .catch(err => console.log(err));

const indianOutfits = [
    {
        title: "Summer Kurta Set",
        description: "A breathable cotton kurta perfect for the hot Indian summer. Maintains style and comfort.",
        imageUrl: "https://images.unsplash.com/photo-1596455607563-ad6193f76b11?auto=format&fit=crop&w=500&q=80",
        weatherOptions: ["hot"],
        occasion: ["casual", "festival"],
        style: ["indian", "ethnic"],
        color: "White",
        gender: "unisex"
    },
    {
        title: "Lightweight Streetwear Tee & Cargos",
        description: "An airy oversized tee with comfortable cargo pants. Perfect for hot weather streetwear.",
        imageUrl: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=500&q=80",
        weatherOptions: ["hot"],
        occasion: ["casual"],
        style: ["streetwear"],
        color: "Black",
        gender: "unisex"
    },
    {
        title: "Breezy Casual Polo & Chinos",
        description: "Light polo t-shirt with cotton chinos, suitable for formal or smart casual events in India.",
        imageUrl: "https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=500&q=80",
        weatherOptions: ["hot"],
        occasion: ["formal", "casual"],
        style: ["minimal"],
        color: "Blue",
        gender: "male"
    },
    {
        title: "Monsoon Waterproof Jacket & Denim",
        description: "A stylish water-resistant windbreaker combined with dark denim for rainy Indian days.",
        imageUrl: "https://images.unsplash.com/photo-1502251347671-a48e7514f686?auto=format&fit=crop&w=500&q=80",
        weatherOptions: ["rainy"],
        occasion: ["casual"],
        style: ["streetwear", "minimal"],
        color: "Blue",
        gender: "unisex"
    },
    {
        title: "Designer Saree for Receptions",
        description: "An elegant and vibrant Saree perfect for Indian weddings and festive receptions.",
        imageUrl: "https://images.unsplash.com/photo-1583391733958-65004746f333?auto=format&fit=crop&w=500&q=80",
        weatherOptions: ["hot", "cold"],
        occasion: ["party", "wedding"],
        style: ["indian"],
        color: "Red",
        gender: "female"
    },
    {
        title: "Classic Sherwani Suit",
        description: "A richly embroidered Sherwani suit designed for groom or groomsmen at royal Indian weddings.",
        imageUrl: "https://images.unsplash.com/photo-1595304910408-db20a32e18b8?auto=format&fit=crop&w=500&q=80",
        weatherOptions: ["hot", "cold", "rainy"],
        occasion: ["wedding"],
        style: ["indian"],
        color: "Gold",
        gender: "male"
    },
    {
        title: "Breathable Activewear Set",
        description: "Moisture-wicking activewear perfect for hitting the gym or outdoor sports in Indian heat.",
        imageUrl: "https://images.unsplash.com/photo-1518459031867-a89b944bffe4?auto=format&fit=crop&w=500&q=80",
        weatherOptions: ["hot"],
        occasion: ["sports"],
        style: ["sporty"],
        color: "Black",
        gender: "unisex"
    },
    {
        title: "Festive Lehenga Choli",
        description: "A beautiful pastel colored Lehenga Choli suitable for Diwali and other grand festivals.",
        imageUrl: "https://images.unsplash.com/photo-1610030469983-98e550d615ef?auto=format&fit=crop&w=500&q=80",
        weatherOptions: ["hot", "cold"],
        occasion: ["festival", "party"],
        style: ["indian"],
        color: "Pastel",
        gender: "female"
    },
    {
        title: "Nehru Jacket with Kurta",
        description: "A smart-casual mix of a bright Nehru jacket paired with a subtle kurta, perfect for daytime gatherings.",
        imageUrl: "https://images.unsplash.com/photo-1583391733958-65004746f333?auto=format&fit=crop&w=500&q=80", 
        weatherOptions: ["hot", "cold"],
        occasion: ["festival", "formal"],
        style: ["indian", "minimal"],
        color: "Bright",
        gender: "male"
    }
];

const seedDB = async () => {
    try {
        await Outfit.insertMany(indianOutfits);
        console.log("Successfully seeded Indian weather database outfits!");
    } catch (err) {
        console.error("Error seeding:", err);
    } finally {
        mongoose.disconnect();
    }
}

seedDB();
