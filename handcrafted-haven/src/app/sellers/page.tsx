'use client'; 

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../../styles/CreateUser.module.css';
import RootLayout from '../layout';

const CreateSellerProfile = () => {
    const [phone, setPhone] = useState('');
    const [dob, setDob] = useState('');
    const [gender, setGender] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const router = useRouter();

    const validateForm = () => {
        setError('');
        if (!phone.trim()) return 'Phone number is required.';
        if (!dob.trim()) return 'Date of birth is required.';
        if (!gender) return 'Gender is required.';
        return null;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSuccess('');

        const validationError = validateForm();
        if (validationError) {
            setError(validationError);
            return;
        }

        const token = localStorage.getItem('accessToken'); 

        try {
            const response = await fetch('https://handcrafted-haven-api.onrender.com/sellers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, 
                },
                body: JSON.stringify({
                    phone,
                    dob,
                    gender,
                }),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || 'Failed to create seller profile');
            }

            setSuccess('Seller profile created successfully! Redirecting to add products...');
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
        <RootLayout pageTitle="Seller's Profile">
        <div className={styles.createUser}>
            <h2>Create Seller Profile</h2>
            <form onSubmit={handleSubmit}>
                <div className={styles.inputGroup}>
                    <input
                        type="text"
                        placeholder="Phone Number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.inputGroup}>
                    <input
                        type="date"
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.inputGroup}>
                    <select value={gender} onChange={(e) => setGender(e.target.value)} required>
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <button className={styles.button} type="submit">Create Profile</button>
                {error && <p className={styles.error}>{error}</p>}
                {success && <p className={styles.success}>{success}</p>}
                
            </form>
            
        </div>
        </RootLayout>
    );
};

export default CreateSellerProfile;