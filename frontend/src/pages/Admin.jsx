import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Admin = () => {
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        title: '', description: '', weatherOptions: '', occasion: '', style: '', gender: ''
    });
    const [image, setImage] = useState(null);

    if (!user || user.role !== 'admin') {
        return <div style={{ textAlign: 'center', padding: '3rem' }}><h2>Access Denied</h2><p>You must be an admin to view this page.</p></div>;
    }

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
    const handleFile = (e) => setImage(e.target.files[0]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        Object.keys(formData).forEach(key => data.append(key, formData[key]));
        if (image) data.append('image', image);

        try {
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:5000/api/outfits', data, {
                headers: { 
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert('Outfit added successfully!');
            setFormData({ title: '', description: '', weatherOptions: '', occasion: '', style: '', gender: '' });
            setImage(null);
            document.getElementById('file-upload').value = '';
        } catch (err) {
            alert(err.response?.data?.message || err.message);
        }
    };

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h2 style={{ marginBottom: '2rem' }}>Admin Dashboard - Add Outfit</h2>
            <form onSubmit={handleSubmit} className="recommendation-form" style={{ padding: '2rem' }}>
                <input type="text" name="title" placeholder="Outfit Title" value={formData.title} onChange={handleChange} required />
                <textarea name="description" placeholder="Description & Styling Tips" value={formData.description} onChange={handleChange} required rows="3"></textarea>
                
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Weather Options (comma separated: hot,cold,rainy)</label>
                <input type="text" name="weatherOptions" placeholder="e.g., hot,rainy" value={formData.weatherOptions} onChange={handleChange} required />
                
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Occasions (comma separated: casual,formal,party,sports)</label>
                <input type="text" name="occasion" placeholder="e.g., casual,party" value={formData.occasion} onChange={handleChange} required />
                
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Styles (comma separated: minimal,streetwear,ethnic,sporty)</label>
                <input type="text" name="style" placeholder="e.g., streetwear,minimal" value={formData.style} onChange={handleChange} required />
                
                <select name="gender" value={formData.gender} onChange={handleChange} required>
                    <option value="" disabled>Select Gender</option>
                    <option value="unisex">Unisex</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>

                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Upload Image</label>
                <input type="file" id="file-upload" accept="image/*" onChange={handleFile} required style={{ backgroundColor: 'transparent', padding: '0.5rem 0' }} />

                <button type="submit" className="btn" style={{ width: '100%', marginTop: '1rem' }}>Add Outfit</button>
            </form>
        </div>
    );
};

export default Admin;
