// import Header from '../components/Header';
// import Dashboard from '../components/Dashboard';

// const Home: React.FC = () => {
//     return (
//         <div>
//             {/* <Header /> */}
//             <Dashboard />
//         </div>
//     );
// };

// export default Home;


import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';
import styles from '../styles/Home.module.css';

const Home: React.FC = () => {
    const [showSignup, setShowSignup] = useState(false);
    const router = useRouter();
    const { isAuthenticated, login } = useAuth();
    useEffect(() => {
        if (isAuthenticated) {
            router.push('/dashboard'); // Redirect to dashboard if logged in
        }
    }, [isAuthenticated, router]);

    const handleLogin = (event: React.FormEvent) => {
        event.preventDefault();
        login(); // Simulate login
        router.push('/dashboard'); // Redirect to dashboard after login
    };

    const toggleForms = (formType: string) => {
        // Function to toggle between login and signup forms
        ;
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <img src="/logo.jpeg" alt="Company Logo" className={styles.logo} />
                <h1 className={styles.companyName}>E-Com DYI</h1>
            </header>
            <main className={styles.main}>
                {!showSignup && (<div>
                <form onSubmit={handleLogin} className={styles.form}>
                    <h2>Login</h2>
                    <input type="text" className={styles.input} placeholder="Username" required />
                    <input type="password" className={styles.input} placeholder="Password" required />
                    <button type="submit" className={styles.button}>Login</button>
                </form>
                <div className={styles.login_text}>
                    Don't have an account? <span className={styles.login_text_link} onClick={() => {setShowSignup(true)}}>signup here</span>
                </div>
                </div>)}
                {showSignup && (<div>
                <form className={styles.form}>
                    <h2>Sign Up</h2>
                    <input type="text" className={styles.input} placeholder="Username" required />
                    <input type="password" className={styles.input} placeholder="Password" required />
                    <button type="submit" className={styles.button}>Sign Up</button>
                </form>
                <div className={styles.login_text}>
                    Already have an account? <span className={styles.login_text_link} onClick={() => {setShowSignup(false)}}>login here</span>
                </div>
                </div>)}
            </main>
        </div>
    );
};

export default Home;