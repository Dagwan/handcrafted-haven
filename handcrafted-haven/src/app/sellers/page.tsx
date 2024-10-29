'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../../styles/CreateUser.module.css';

const CreateSellerProfile = () => {
    const [phone, setPhone] = useState('');
    const [dob, setDob] = useState('');
    const [gender, setGender] = useState('');
    const [userId, setUserId] = useState(''); 
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const router = useRouter();

    const validateForm = () => {
        setError('');
        if (!phone.trim()) {
            return 'Phone number is required.';
        }
        if (!dob.trim()) {
            return 'Date of birth is required.';
        }
        if (!gender) {
            return 'Gender is required.';
        }
        if (!userId) {
            return 'User ID is required.';
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
            const response = await fetch('https://handcrafted-haven-api.onrender.com/sellers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer 88b46adbd509babaaddce1b50ff2140f168c1228db0d49dfabc91fadb4304d39`, // Ensure to include a valid JWT token for authentication
                },
                body: JSON.stringify({
                    phone,
                    dob,
                    gender,
                    userId, // Include the user ID for the seller profile
                }),
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Failed to create seller profile');
            }

            setSuccess('Seller profile created successfully! Redirecting...');
            setTimeout(() => {
                router.push('/login'); // Redirect to the dashboard or any other appropriate page
            }, 2000);
        } catch (err: unknown) {
            // Type narrowing to check if the error is an instance of Error
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('Failed to create seller profile');
            }
        }
    };

    return (
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
                            placeholder="Date of Birth"
                            value={dob}
                            onChange={(e) => setDob(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <select value={gender} onChange={(e) => setGender(e.target.value)} required>
                            <option value="">Select Gender</option>
                            <option value="female">Female</option>
                            <option value="male">Male</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div className={styles.inputGroup}>
                        <input
                            type="text"
                            placeholder="User ID"
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                            required
                        />
                    </div>
                    <button className={styles.button} type="submit">Create Seller Profile</button>
                    {error && <p className={styles.error}>{error}</p>}
                    {success && <p className={styles.success}>{success}</p>}
                </form>
                <p className={styles.loginPrompt}>
                    Want to return? <span onClick={() => router.push('/login')} className={styles.loginLink}>Go to Login</span>
                </p>
            </div>
        
    );
};

export default CreateSellerProfile;

// 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import RootLayout from '../layout';
// import styles from '../../styles/CreateUser.module.css';
// // import { AiOutlineUser, AiOutlineMail, AiOutlineLock, AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

// const CreateSellerProfile = () => {
//     const [phone, setPhone] = useState('');
//     const [dob, setDob] = useState('');
//     const [gender, setGender] = useState('');
//     const [userId, setUserId] = useState(''); // This will store the ID of the user who is creating the seller profile
//     const [error, setError] = useState('');
//     const [success, setSuccess] = useState('');
//     const router = useRouter();

//     const validateForm = () => {
//         setError('');
//         if (!phone.trim()) {
//             return 'Phone number is required.';
//         }
//         if (!dob.trim()) {
//             return 'Date of birth is required.';
//         }
//         if (!gender) {
//             return 'Gender is required.';
//         }
//         if (!userId) {
//             return 'User ID is required.';
//         }
//         return null;
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setSuccess('');

//         // Validate the form fields
//         const validationError = validateForm();
//         if (validationError) {
//             setError(validationError);
//             return;
//         }

//         try {
//             const response = await fetch('https://handcrafted-haven-api.onrender.com/sellers', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer 88b46adbd509babaaddce1b50ff2140f168c1228db0d49dfabc91fadb4304d39`, // Ensure to include a valid JWT token for authentication
//                 },
//                 body: JSON.stringify({
//                     phone,
//                     dob,
//                     gender,
//                     userId, // Include the user ID for the seller profile
//                 }),
//             });

//             const data = await response.json();
//             if (!response.ok) {
//                 throw new Error(data.message || 'Failed to create seller profile');
//             }

//             setSuccess('Seller profile created successfully! Redirecting...');
//             setTimeout(() => {
//                 router.push('/login'); // Redirect to the dashboard or any other appropriate page
//             }, 2000);
//         } catch (err: any) {
//             setError(err.message ? err.message : 'Failed to create seller profile');
//         }
//     };

//     return (
//         <RootLayout pageTitle="Create Seller Profile">
//             <div className={styles.createUser}>
//                 <h2>Create Seller Profile</h2>
//                 <form onSubmit={handleSubmit}>
//                     <div className={styles.inputGroup}>
//                         <input
//                             type="text"
//                             placeholder="Phone Number"
//                             value={phone}
//                             onChange={(e) => setPhone(e.target.value)}
//                             required
//                         />
//                     </div>
//                     <div className={styles.inputGroup}>
//                         <input
//                             type="date"
//                             placeholder="Date of Birth"
//                             value={dob}
//                             onChange={(e) => setDob(e.target.value)}
//                             required
//                         />
//                     </div>
//                     <div className={styles.inputGroup}>
//                         <select value={gender} onChange={(e) => setGender(e.target.value)} required>
//                             <option value="">Select Gender</option>
//                             <option value="female">Female</option>
//                             <option value="male">Male</option>
//                             <option value="other">Other</option>
//                         </select>
//                     </div>
//                     <div className={styles.inputGroup}>
//                         <input
//                             type="text"
//                             placeholder="User ID"
//                             value={userId}
//                             onChange={(e) => setUserId(e.target.value)}
//                             required
//                         />
//                     </div>
//                     <button className={styles.button} type="submit">Create Seller Profile</button>
//                     {error && <p className={styles.error}>{error}</p>}
//                     {success && <p className={styles.success}>{success}</p>}
//                 </form>
//                 <p className={styles.loginPrompt}>
//                     Want to return? <span onClick={() => router.push('/login')} className={styles.loginLink}>Go to Login</span>
//                 </p>
//             </div>
//         </RootLayout>
//     );
// };

// export default CreateSellerProfile;
