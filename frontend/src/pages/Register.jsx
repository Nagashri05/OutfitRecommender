import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(formData.username, formData.email, formData.password);
            alert('Registration successful. Please login.');
            navigate('/login');
        } catch (err) {
            alert(err.response?.data?.message || err.message);
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
            <div className="card" style={{ width: '100%', maxWidth: '400px', padding: '2rem' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Create an Account</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} required />
                    <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required />
                    <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
                    <button type="submit" className="btn" style={{ width: '100%', marginTop: '1rem' }}>Sign Up</button>
                </form>
                <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                    <Link to="/login" style={{ color: 'var(--primary-color)', textDecoration: 'underline' }}>
                        Already have an account? Login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Register;
