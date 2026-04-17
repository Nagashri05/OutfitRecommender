import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const { login, register } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isLogin) {
                await login(formData.email, formData.password);
                navigate('/dashboard');
            } else {
                await register(formData.username, formData.email, formData.password);
                setIsLogin(true);
                alert('Registration successful. Please login.');
            }
        } catch (err) {
            alert(err.response?.data?.message || err.message);
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
            <div className="card" style={{ width: '100%', maxWidth: '400px', padding: '2rem' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>{isLogin ? 'Login to your Account' : 'Create an Account'}</h2>
                <form onSubmit={handleSubmit}>
                    {!isLogin && (
                        <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} required />
                    )}
                    <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required />
                    <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
                    <button type="submit" className="btn" style={{ width: '100%', marginTop: '1rem' }}>
                        {isLogin ? 'Login' : 'Sign Up'}
                    </button>
                </form>
                <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                    <button onClick={() => setIsLogin(!isLogin)} style={{ background: 'none', color: 'var(--primary-color)', textDecoration: 'underline' }}>
                        {isLogin ? "Don't have an account? Sign up" : "Already have an account? Login"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Auth;
