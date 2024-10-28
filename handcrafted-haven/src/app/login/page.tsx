'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import RootLayout from '../layout';
import styles from '../../styles/Login.module.css';
import { AiOutlineUser, AiOutlineLock, AiOutlineMail, AiOutlineKey } from 'react-icons/ai';

// Define types for errors
interface ErrorResponse {
    message: string;
}

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
    const [resetMessage, setResetMessage] = useState('');
    const [showResetForm, setShowResetForm] = useState(false);
    const [token, setToken] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const router = useRouter();

    const validateLogin = () => {
        let valid = true;
        setError('');

        if (!username.trim()) {
            setError(prev => prev + 'Username is required. ');
            valid = false;
        }
        if (password.length < 8) {
            setError(prev => prev + 'Password must be at least 8 characters long. ');
            valid = false;
        }

        return valid;
    };

    const validateForgotPassword = () => {
        let valid = true;
        setResetMessage('');

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(forgotPasswordEmail)) {
            setResetMessage('Valid email is required.');
            valid = false;
        }

        return valid;
    };

    const validateResetPassword = () => {
        let valid = true;
        setResetMessage('');

        if (newPassword.length < 8) {
            setResetMessage(prev => prev + 'New password must be at least 8 characters long. ');
            valid = false;
        }
        if (newPassword !== confirmPassword) {
            setResetMessage(prev => prev + 'Passwords do not match. ');
            valid = false;
        }

        return valid;
    };

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validateLogin()) return;

        try {
            const response = await fetch('https://handcrafted-haven-api.onrender.com/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                const data: ErrorResponse = await response.json();
                throw new Error(data.message || 'Login failed');
            }

            setError('');
            window.location.href = '/sellers/dashboard';
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            }
        }
    };

    const handleForgotPassword = async () => {
        if (!validateForgotPassword()) return;

        try {
            const response = await fetch('https://handcrafted-haven-api.onrender.com/users/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: forgotPasswordEmail }),
            });

            if (!response.ok) {
                const data: ErrorResponse = await response.json();
                throw new Error(data.message || 'Failed to send reset password email');
            }

            setResetMessage(`Password reset link sent to: ${forgotPasswordEmail}`);
            setShowForgotPassword(false);
            setShowResetForm(true);
        } catch (err) {
            if (err instanceof Error) {
                setResetMessage(err.message);
            }
        }
    };

    const handleResetPassword = async () => {
        if (!validateResetPassword()) return;

        try {
            const response = await fetch(`https://handcrafted-haven-api.onrender.com/users/reset-password/${token}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ password: newPassword, confirmPassword }),
            });

            if (!response.ok) {
                const data: ErrorResponse = await response.json();
                throw new Error(data.message || 'Failed to reset password');
            }

            // Set success message
            setResetMessage('Password changed successfully.');

            // Clear fields
            setToken('');
            setNewPassword('');
            setConfirmPassword('');

            // Redirect to login page after 3 seconds
            setTimeout(() => {
                router.push('/login');
            }, 3000); // 3 seconds
        } catch (err) {
            if (err instanceof Error) {
                setResetMessage(err.message);
            }
        }
    };

    return (
        <RootLayout pageTitle="User Login">
            <div className={styles.login}>
                <h1>User Login</h1>
                <p>Enter your username and password to log into your account.</p>
                <form onSubmit={handleLogin}>
                    <div className={styles.inputGroup}>
                        <AiOutlineUser className={styles.icon} />
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <AiOutlineLock className={styles.icon} />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && <p className={styles.error}>{error}</p>}
                    <button type="submit" className={styles.loginButton}>Login</button>
                    <p onClick={() => setShowForgotPassword(true)} className={styles.forgotPassword}>Forgot Password?</p>
                </form>
                <p className={styles.userPrompt}>Don&apos;t have an account? <span onClick={() => router.push('/user')} className={styles.userLink}>Create Account</span></p>

                {showForgotPassword && (
                    <div className={styles.popup}>
                        <div className={styles.popupContent}>
                            <h2>Reset Password</h2>
                            <p>Enter your email address to receive a password reset token.</p>
                            <div className={styles.inputGroup}>
                                <AiOutlineMail className={styles.icon} />
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    value={forgotPasswordEmail}
                                    onChange={(e) => setForgotPasswordEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <button onClick={handleForgotPassword} className={styles.popupButton}>Send Reset Link</button>
                            <p className={styles.closePopup} onClick={() => setShowForgotPassword(false)}>Close</p>
                            {resetMessage && <p className={styles.resetMessage}>{resetMessage}</p>}
                        </div>
                    </div>
                )}

                {showResetForm && (
                    <div className={styles.popup}>
                        <div className={styles.popupContent}>
                            <h2>Enter Reset Token</h2>
                            <p>Please enter the reset token and your new password.</p>
                            <div className={styles.inputGroup}>
                                <AiOutlineKey className={styles.icon} />
                                <input
                                    type="text"
                                    placeholder="Reset Token"
                                    value={token}
                                    onChange={(e) => setToken(e.target.value)}
                                    required
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <AiOutlineLock className={styles.icon} />
                                <input
                                    type="password"
                                    placeholder="New Password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <AiOutlineLock className={styles.icon} />
                                <input
                                    type="password"
                                    placeholder="Confirm Password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <button onClick={handleResetPassword} className={styles.popupButton}>Reset Password</button>
                            <p className={styles.closePopup} onClick={() => setShowResetForm(false)}>Close</p>
                            {resetMessage && <p className={styles.resetMessage}>{resetMessage}</p>}
                        </div>
                    </div>
                )}
            </div>
        </RootLayout>
    );
};

export default Login;
