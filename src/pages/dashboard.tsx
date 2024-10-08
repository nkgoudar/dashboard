import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';

const Dashboard: React.FC = () => {
    const { logout } = useAuth();
    const router = useRouter();

    const handleLogout = () => {
        logout();
        router.push('/'); // Redirect to home after logout
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Dashboard</h1>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Dashboard;