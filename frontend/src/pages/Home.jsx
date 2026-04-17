import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [formData, setFormData] = useState({
        location: '',
        occasion: '',
        style: '',
        color: '',
        gender: 'unisex'
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/recommendations', { state: formData });
    };

    return (
        <div>
            <section className="hero">
                <h1>What Should I Wear?</h1>
                <p>Get AI-powered outfit recommendations based on your location's weather, occasion, and personal style.</p>
            </section>

            <form className="recommendation-form" onSubmit={handleSubmit}>
                <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Location (City, Country)</label>
                    <input 
                        type="text" 
                        name="location" 
                        placeholder="e.g., New York, USA or Mumbai, India" 
                        value={formData.location} 
                        onChange={handleChange} 
                        required 
                    />
                </div>

                <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Occasion</label>
                    <select name="occasion" value={formData.occasion} onChange={handleChange} required>
                        <option value="" disabled>Select Occasion</option>
                        <option value="casual">Casual</option>
                        <option value="formal">Formal</option>
                        <option value="party">Party</option>
                        <option value="sports">Sports</option>
                        <option value="festival">Festival</option>
                        <option value="wedding">Wedding</option>
                    </select>
                </div>

                <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Style Preference</label>
                    <select name="style" value={formData.style} onChange={handleChange} required>
                        <option value="" disabled>Select Style</option>
                        <option value="indian">Indian Wear</option>
                        <option value="minimal">Minimal</option>
                        <option value="streetwear">Streetwear</option>
                        <option value="ethnic">Classic Ethnic</option>
                        <option value="sporty">Sporty</option>
                    </select>
                </div>

                <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Color Highlight (Optional)</label>
                    <select name="color" value={formData.color} onChange={handleChange}>
                        <option value="">Any Color</option>
                        <option value="Black">Black</option>
                        <option value="White">White</option>
                        <option value="Blue">Blue</option>
                        <option value="Red">Red</option>
                        <option value="Gold">Gold</option>
                        <option value="Pastel">Pastel</option>
                        <option value="Bright">Bright</option>
                    </select>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Gender (Optional)</label>
                    <select name="gender" value={formData.gender} onChange={handleChange}>
                        <option value="unisex">Unisex / Any</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>

                <button type="submit" className="btn" style={{ width: '100%', padding: '1rem', fontSize: '1.1rem' }}>
                    Get Recommendations ✨
                </button>
            </form>
        </div>
    );
};

export default Home;
