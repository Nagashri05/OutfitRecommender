const express = require('express');
const router = express.Router();
const Outfit = require('../models/Outfit');

router.post('/', async (req, res) => {
    try {
        const { location, occasion, style, gender, color } = req.body;
        
        let weatherCategory = 'mild';
        
        if (location) {
            const locLower = location.toLowerCase();
            if (locLower.includes('alaska') || locLower.includes('canada') || locLower.includes('snow') || locLower.includes('cold') || locLower.includes('winter')) {
                weatherCategory = 'cold';
            } else if (
                locLower.includes('texas') || locLower.includes('dubai') || locLower.includes('hot') || locLower.includes('summer') || locLower.includes('beach') ||
                locLower.includes('india') || locLower.includes('mumbai') || locLower.includes('delhi') || locLower.includes('chennai') || locLower.includes('bangalore')
            ) {
                weatherCategory = 'hot';
            } else if (locLower.includes('london') || locLower.includes('seattle') || locLower.includes('rain') || locLower.includes('monsoon') || locLower.includes('wet')) {
                weatherCategory = 'rainy';
            } else {
                weatherCategory = 'hot'; // default fallback for arbitrary text
            }
        }
        
        const query = {};
        
        if (occasion) {
             query.occasion = occasion;
        }
        if (style) {
             query.style = style;
        }
        if (gender && gender !== 'unisex') {
             query.gender = { $in: [gender, 'unisex'] };
        }
        if (color) {
             query.color = color;
        }
        
        query.weatherOptions = weatherCategory;

        let outfits = await Outfit.find(query);
        
        if (outfits.length === 0 && color) {
            delete query.color; // relax color first
            outfits = await Outfit.find(query);
        }
        
        if (outfits.length === 0 && occasion) {
            delete query.weatherOptions; // relax weather
            outfits = await Outfit.find(query);
            if (outfits.length === 0) {
                 delete query.style; // relax style
                 outfits = await Outfit.find(query);
            }
        }

        // --- AI API Image Generation ---
        const promptParts = [
            'fashion photography of outfit',
            weatherCategory,
            style ? style : 'casual',
            occasion ? occasion : 'everyday',
            color ? color : '',
            gender && gender !== 'unisex' ? gender : ''
        ].filter(Boolean);

        const prompt = promptParts.join(' ');
        const encodedPrompt = encodeURIComponent(prompt);

        const aiGeneratedOutfit = {
            _id: "ai-" + Date.now(), 
            title: "✨ AI Custom Generated Outfit",
            description: `A completely unique outfit generated dynamically just for your preferences using AI image generation. Prompt: ${prompt}`,
            imageUrl: `https://pollinations.ai/prompt/${encodedPrompt}`,
            style: style ? [style] : ['Custom'],
            occasion: occasion ? [occasion] : ['Any'],
            weatherOptions: [weatherCategory]
        };
        if (color) aiGeneratedOutfit.color = color;

        outfits.push(aiGeneratedOutfit);
        // -------------------------------

        res.json({ weatherCategory, outfits });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
