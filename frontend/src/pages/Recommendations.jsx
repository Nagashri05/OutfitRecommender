import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Recommendations = () => {
    const location = useLocation();
    const [outfits, setOutfits] = useState([]);
    const [weather, setWeather] = useState('');
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (!location.state) return;
        
        axios.post('http://localhost:5000/api/recommend', location.state)
            .then(res => {
                setOutfits(res.data.outfits);
                setWeather(res.data.weatherCategory);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [location.state]);

    const handleSave = async (id) => {
        if (!user) return alert('Please login to save outfits');
        try {
            await axios.post(`http://localhost:5000/api/outfits/save/${id}`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert('Outfit saved!');
        } catch (err) {
            console.error(err);
        }
    };

    if (!location.state) return <div style={{ textAlign: 'center', marginTop: '2rem' }}>Please start from the <Link to="/" style={{ color: 'var(--primary-color)' }}>Home page</Link></div>;
    
    if (loading) return <div style={{ textAlign: 'center', marginTop: '4rem' }}><h2>Loading ✨ AI Recommendations...</h2></div>;

    const colorText = location.state.color ? ` ${location.state.color}` : '';

    return (
        <div>
            <h2 style={{ marginBottom: '1rem', fontSize: '2rem' }}>Your Recommended Outfits</h2>
            <p style={{ marginBottom: '2rem', opacity: 0.8 }}>We detected <strong>{weather}</strong> weather for {location.state.location}. Here are{colorText} {location.state.style} outfits for a {location.state.occasion} occasion.</p>
            
            {outfits.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '3rem', backgroundColor: 'var(--secondary-bg)', borderRadius: '1rem' }}>
                    <h3>No exact matches found</h3>
                    <p>Try adjusting your style or occasion preferences.</p>
                    <Link to="/" className="btn" style={{ display: 'inline-block', marginTop: '1rem' }}>Go Back</Link>
                </div>
            ) : (
                <div className="grid">
                    {outfits.map(outfit => (
                        <div key={outfit._id} className="card">
                            <img src={outfit.imageUrl.startsWith('http') ? outfit.imageUrl : `http://localhost:5000${outfit.imageUrl}`} alt={outfit.title} className="outfit-img" />
                            <div className="outfit-details">
                                <h3 style={{ marginBottom: '0.5rem' }}>{outfit.title}</h3>
                                <p style={{ opacity: 0.8, marginBottom: '1rem', flex: 1 }}>{outfit.description}</p>
                                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                    {outfit.color && <span className="badge" style={{ backgroundColor: 'var(--primary-color)', color: 'white' }}>{outfit.color}</span>}
                                    <span className="badge">{outfit.style.join(', ')}</span>
                                    <span className="badge">{outfit.occasion.join(', ')}</span>
                                </div>
                                <button onClick={() => handleSave(outfit._id)} className="btn-outline" style={{ marginTop: '1rem', width: '100%', padding: '0.5rem', borderRadius: '0.5rem' }}>
                                    ❤️ Save Outfit
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Recommendations;
