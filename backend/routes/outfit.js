const express = require('express');
const router = express.Router();
const Outfit = require('../models/Outfit');
const User = require('../models/User');
const { auth } = require('./auth');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

router.get('/', async (req, res) => {
    try {
        const outfits = await Outfit.find();
        res.json(outfits);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/', auth, upload.single('image'), async (req, res) => {
    try {
        if (req.user.role !== 'admin') return res.status(403).json({ message: 'Admin access required' });
        
        let imageUrl = '';
        if (req.file) {
            imageUrl = `/uploads/${req.file.filename}`;
        } else if (req.body.imageUrl) {
            imageUrl = req.body.imageUrl;
        } else {
            return res.status(400).json({ message: 'No image provided' });
        }

        const newOutfit = new Outfit({
            title: req.body.title,
            description: req.body.description,
            imageUrl,
            weatherOptions: typeof req.body.weatherOptions === 'string' ? req.body.weatherOptions.split(',') : req.body.weatherOptions || [],
            occasion: typeof req.body.occasion === 'string' ? req.body.occasion.split(',') : req.body.occasion || [],
            style: typeof req.body.style === 'string' ? req.body.style.split(',') : req.body.style || [],
            gender: req.body.gender || 'unisex'
        });

        await newOutfit.save();
        res.status(201).json(newOutfit);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/save/:id', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user.savedOutfits.includes(req.params.id)) {
            user.savedOutfits.push(req.params.id);
            await user.save();
        }
        res.json({ message: 'Outfit saved successfully' });
    } catch (err) {
         res.status(500).json({ error: err.message });
    }
});

router.post('/unsave/:id', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        user.savedOutfits = user.savedOutfits.filter(id => id.toString() !== req.params.id);
        await user.save();
        res.json({ message: 'Outfit unsaved successfully' });
    } catch (err) {
         res.status(500).json({ error: err.message });
    }
});

module.exports = router;
