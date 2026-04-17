import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
    const { user } = useAuth();
    const [savedOutfits, setSavedOutfits] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get('http://localhost:5000/api/auth/me', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setSavedOutfits(res.data.savedOutfits || []);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        };
        fetchDashboard();
    }, []);

    const handleUnsave = async (id) => {
        try {
            const token = localStorage.getItem('token');
            await axios.post(`http://localhost:5000/api/outfits/unsave/${id}`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setSavedOutfits(savedOutfits.filter(o => o._id !== id));
        } catch (err) {
            console.error(err);
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <h2>Welcome back, {user?.username}!</h2>
            <h3 style={{ marginTop: '2rem', marginBottom: '1rem' }}>Your Saved Outfits</h3>
            
            {savedOutfits.length === 0 ? (
                <p>You haven't saved any outfits yet.</p>
            ) : (
                <div className="grid">
                    {savedOutfits.map(outfit => (
                        <div key={outfit._id} className="card">
                            <img src={outfit.imageUrl.startsWith('http') ? outfit.imageUrl : `http://localhost:5000${outfit.imageUrl}`} alt={outfit.title} className="outfit-img" />
                            <div className="outfit-details">
                                <h3 style={{ marginBottom: '0.5rem' }}>{outfit.title}</h3>
                                <p style={{ opacity: 0.8, marginBottom: '1rem', flex: 1 }}>{outfit.description}</p>
                                <button onClick={() => handleUnsave(outfit._id)} className="btn" style={{ backgroundColor: 'var(--danger-color)', width: '100%', padding: '0.5rem', borderRadius: '0.5rem' }}>
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Dashboard;
