import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        logout();
        const timeout = setTimeout(() => {
            navigate('/');
        }, 1500);
        return () => clearTimeout(timeout);
    }, [logout, navigate]);

    return (
        <div style={{ textAlign: 'center', marginTop: '5rem', minHeight: '50vh' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Logging you out...</h2>
            <p style={{ opacity: 0.8 }}>You have been safely logged out. Redirecting to home...</p>
        </div>
    );
};

export default Logout;
