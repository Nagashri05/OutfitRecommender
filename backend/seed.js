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
        imageUrl: "https://image.pollinations.ai/prompt/A%20white%20breathable%20cotton%20kurta%20perfect%20for%20the%20hot%20Indian%20summer%20fashion%20photography",
        weatherOptions: ["hot"],
        occasion: ["casual", "festival"],
        style: ["indian", "ethnic"],
        color: "White",
        gender: "unisex"
    },
    {
        title: "Lightweight Streetwear Tee & Cargos",
        description: "An airy oversized tee with comfortable cargo pants. Perfect for hot weather streetwear.",
        imageUrl: "https://image.pollinations.ai/prompt/black%20airy%20oversized%20tee%20with%20comfortable%20cargo%20pants%20streetwear%20fashion%20photography",
        weatherOptions: ["hot"],
        occasion: ["casual"],
        style: ["streetwear"],
        color: "Black",
        gender: "unisex"
    },
    {
        title: "Breezy Casual Polo & Chinos",
        description: "Light polo t-shirt with cotton chinos, suitable for formal or smart casual events in India.",
        imageUrl: "https://image.pollinations.ai/prompt/blue%20light%20polo%20t-shirt%20with%20cotton%20chinos%20smart%20casual%20fashion%20photography",
        weatherOptions: ["hot"],
        occasion: ["formal", "casual"],
        style: ["minimal"],
        color: "Blue",
        gender: "male"
    },
    {
        title: "Monsoon Waterproof Jacket & Denim",
        description: "A stylish water-resistant windbreaker combined with dark denim for rainy Indian days.",
        imageUrl: "https://image.pollinations.ai/prompt/blue%20water-resistant%20windbreaker%20jacket%20with%20dark%20denim%20rainy%20day%20fashion%20photography",
        weatherOptions: ["rainy"],
        occasion: ["casual"],
        style: ["streetwear", "minimal"],
        color: "Blue",
        gender: "unisex"
    },
    {
        title: "Designer Saree for Receptions",
        description: "An elegant and vibrant Saree perfect for Indian weddings and festive receptions.",
        imageUrl: "https://image.pollinations.ai/prompt/elegant%20vibrant%20red%20saree%20for%20indian%20wedding%20fashion%20photography",
        weatherOptions: ["hot", "cold"],
        occasion: ["party", "wedding"],
        style: ["indian"],
        color: "Red",
        gender: "female"
    },
    {
        title: "Classic Sherwani Suit",
        description: "A richly embroidered Sherwani suit designed for groom or groomsmen at royal Indian weddings.",
        imageUrl: "https://image.pollinations.ai/prompt/gold%20richly%20embroidered%20sherwani%20suit%20for%20royal%20indian%20wedding%20fashion%20photography",
        weatherOptions: ["hot", "cold", "rainy"],
        occasion: ["wedding"],
        style: ["indian"],
        color: "Gold",
        gender: "male"
    },
    {
        title: "Breathable Activewear Set",
        description: "Moisture-wicking activewear perfect for hitting the gym or outdoor sports in Indian heat.",
        imageUrl: "https://image.pollinations.ai/prompt/black%20moisture-wicking%20activewear%20set%20gym%20outfit%20fashion%20photography",
        weatherOptions: ["hot"],
        occasion: ["sports"],
        style: ["sporty"],
        color: "Black",
        gender: "unisex"
    },
    {
        title: "Festive Lehenga Choli",
        description: "A beautiful pastel colored Lehenga Choli suitable for Diwali and other grand festivals.",
        imageUrl: "https://image.pollinations.ai/prompt/beautiful%20pastel%20colored%20lehenga%20choli%20for%20diwali%20festival%20fashion%20photography",
        weatherOptions: ["hot", "cold"],
        occasion: ["festival", "party"],
        style: ["indian"],
        color: "Pastel",
        gender: "female"
    },
    {
        title: "Nehru Jacket with Kurta",
        description: "A smart-casual mix of a bright Nehru jacket paired with a subtle kurta, perfect for daytime gatherings.",
        imageUrl: "https://image.pollinations.ai/prompt/bright%20nehru%20jacket%20paired%20with%20subtle%20kurta%20indian%20menswear%20fashion%20photography", 
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
