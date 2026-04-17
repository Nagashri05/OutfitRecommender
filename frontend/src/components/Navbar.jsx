import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { theme, toggleTheme } = useTheme();
    const { user, logout } = useAuth();
    const navigate = useNavigate();



    return (
        <nav className="navbar">
            <Link to="/" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary-color)' }}>
                Outfit Recommender
            </Link>
            <div className="nav-links">
                <button onClick={toggleTheme} className="btn-outline" style={{ padding: '0.25rem 0.5rem' }}>
                    {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
                </button>
                {user ? (
                    <>
                        <Link to="/dashboard" className="btn btn-outline">Dashboard</Link>
                        {user.role === 'admin' && <Link to="/admin" className="btn btn-outline">Admin</Link>}
                        <Link to="/logout" className="btn">Logout</Link>
                    </>
                ) : (
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <Link to="/login" className="btn btn-outline">Login</Link>
                        <Link to="/register" className="btn">Sign Up</Link>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
