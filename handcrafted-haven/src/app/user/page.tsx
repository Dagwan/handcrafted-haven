'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import RootLayout from '../layout';
import styles from '../../styles/CreateUser.module.css';
import { AiOutlineUser, AiOutlineMail, AiOutlineEye, AiOutlineEyeInvisible, AiOutlineLock } from 'react-icons/ai';

const CreateUser = () => {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [userType, setUserType] = useState('buyer');
    const [bio, setBio] = useState('');
    const [address, setAddress] = useState('');
    const [profilePicture, setProfilePicture] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const router = useRouter();

    const validateForm = () => {
        setError('');
        // Check for validation errors
        if (!name.trim()) {
            return 'Name is required.';
        }
        if (!username.trim()) {
            return 'Username is required.';
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            return 'Valid email is required.';
        }
        if (password.length < 8) {
            return 'Password must be at least 8 characters long.';
        }
        if (password !== confirmPassword) {
            return 'Passwords do not match.';
        }
        if (!['buyer', 'seller'].includes(userType)) {
            return 'User type must be either "buyer" or "seller".';
        }
        if (profilePicture && typeof profilePicture !== 'string') {
            return 'Profile picture must be a valid URL.';
        }
        if (bio && typeof bio !== 'string') {
            return 'Bio must be a string.';
        }
        if (address && typeof address !== 'string') {
            return 'Address must be a string.';
        }
        return null;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSuccess('');

        // Validate the form fields
        const validationError = validateForm();
        if (validationError) {
            setError(validationError);
            return;
        }

        try {
            const response = await fetch('https://handcrafted-haven-api.onrender.com/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    username,
                    email,
                    password,
                    confirmPassword,
                    userType,
                    profilePicture,
                    bio,
                    address,
                }),
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Failed to create user');
            }

            setSuccess('User created successfully! Redirecting to login...');
            setTimeout(() => {
                router.push('/login');
            }, 2000);
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unexpected error occurred');
            }
        } 
        
    };

    return (
        <RootLayout pageTitle="Create Account">
        <div className={styles.createUser}>
            <h2>Create User Profile</h2>
            <p>Please fill out the form below to create your user account. Make sure to provide a valid email address and a secure password. Once registered, you will be able to log in and access your profile.</p>
            <form onSubmit={handleSubmit}>
                <div className={styles.inputGroup}>
                    <AiOutlineUser className={styles.icon} />
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
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
                    <AiOutlineMail className={styles.icon} />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.inputGroup}>
                    <AiOutlineLock className={styles.icon} />
                    <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    {showPassword ? (
                        <AiOutlineEyeInvisible className={styles.eyeIcon} onClick={() => setShowPassword(false)} />
                    ) : (
                        <AiOutlineEye className={styles.eyeIcon} onClick={() => setShowPassword(true)} />
                    )}
                </div>
                <div className={styles.inputGroup}>
                    <AiOutlineLock className={styles.icon} />
                    <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    {showConfirmPassword ? (
                        <AiOutlineEyeInvisible className={styles.eyeIcon} onClick={() => setShowConfirmPassword(false)} />
                    ) : (
                        <AiOutlineEye className={styles.eyeIcon} onClick={() => setShowConfirmPassword(true)} />
                    )}
                </div>
                <div className={styles.inputGroup}>
                    <select value={userType} onChange={(e) => setUserType(e.target.value)}>
                        <option value="buyer">Buyer</option>
                        <option value="seller">Seller</option>
                    </select>
                </div>
                <div className={styles.inputGroup}>
                    <input
                        type="text"
                        placeholder="Profile Picture URL (Optional)"
                        value={profilePicture}
                        onChange={(e) => setProfilePicture(e.target.value)}
                    />
                </div>
                <div className={styles.inputGroup}>
                    <textarea
                        placeholder="Bio"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                    ></textarea>
                </div>
                <div className={styles.inputGroup}>
                    <input
                        type="text"
                        placeholder="Address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>
                <button className={styles.button} type="submit">Create Account</button>
                {error && <p className={styles.error}>{error}</p>}
                {success && <p className={styles.success}>{success}</p>}
            </form>
            <p className={styles.loginPrompt}>Already have an account? <span onClick={() => router.push('/login')} className={styles.loginLink}>Login</span></p>
        </div>
        </RootLayout>
    );
};

export default CreateUser;
