'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useCart } from '../context/CartContext';
import styles from '../styles/Header.module.css';

const Header = () => {
    const { state } = useCart(); 
    const [isScrolled, setIsScrolled] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const [isSearchExpanded, setIsSearchExpanded] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleNavClick = () => {
        setExpanded(false);
    };

    const handleSearchFocus = () => {
        setIsSearchExpanded(true);
    };

    const handleSearchBlur = () => {
        setIsSearchExpanded(false);
    };

    // Calculate the total quantity of items in the cart
    const totalItemsInCart = state.items.reduce((total, item) => total + item.quantity, 0);

    return (
        <>
            {/* Top Header for larger screens */}
            <div className={styles.topHeader}>
                <Link href="/login">Login</Link>
                <Link href="/register">Register</Link>
                <div className={`${styles.searchContainer} ${isSearchExpanded ? styles.expanded : ''}`}>
                    <input
                        type="text"
                        placeholder="Search..."
                        className={styles.searchInput}
                        onFocus={handleSearchFocus}
                        onBlur={handleSearchBlur}
                    />
                    <button className={styles.searchButton}>🔍</button>
                </div>
                {/* Display the total items in the cart */}
                <Link href="/cart" className={styles.cartIcon}>
                    🛒 {totalItemsInCart > 0 && <span>({totalItemsInCart})</span>}
                </Link>
            </div>

            {/* Main Header */}
            <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
                <div className={styles.headerWrapper}>
                    <div className={styles.brandLogo}>
                        <Link href="/">
                            <img src="/images/hand-logo.jpg" alt="Handcrafted Haven Logo" className={styles.logo} />
                        </Link>
                        <h1 className={styles.companyName}>Handcrafted Haven</h1>
                    </div>

                    {/* Hamburger menu for mobile */}
                    <div className={styles.hamburger} onClick={() => setExpanded(!expanded)}>
                        <span className={expanded ? styles.active : ''}></span>
                        <span className={expanded ? styles.active : ''}></span>
                        <span className={expanded ? styles.active : ''}></span>
                    </div>

                    {/* Navigation Menu */}
                    <nav className={`${styles.nav} ${expanded ? styles.open : ''}`}>
                        <ul>
                            <li><Link href="/" onClick={handleNavClick}>Home</Link></li>
                            <li><Link href="/about" onClick={handleNavClick}>About Us</Link></li>
                            <li><Link href="/sellers" onClick={handleNavClick}>Seller Profiles</Link></li>
                            <li><Link href="/products" onClick={handleNavClick}>Products</Link></li>
                        </ul>
                    </nav>
                </div>
            </header>

            {/* Popup Navigation for mobile when expanded */}
            {expanded && (
                <div className={styles.popup}>
                    <div className={styles.popupContent}>
                        <button className={styles.closeButton} onClick={() => setExpanded(false)}>✖</button>
                        <div className={styles.popupTopHeader}>
                            <Link href="/gallery" onClick={handleNavClick}>Gallery</Link>
                            <Link href="/faq" onClick={handleNavClick}>FAQ</Link>
                            <Link href="/login" onClick={handleNavClick}>Login</Link>
                            <Link href="/register" onClick={handleNavClick}>Register</Link>
                        </div>
                        <nav className={styles.popupNav}>
                            <ul>
                                <li><Link href="/" onClick={handleNavClick}>Home</Link></li>
                                <li><Link href="/about" onClick={handleNavClick}>About Us</Link></li>
                                <li><Link href="/sellers" onClick={handleNavClick}>Sellers</Link></li>
                                <li><Link href="/products" onClick={handleNavClick}>Products</Link></li>
                            </ul>
                        </nav>
                    </div>
                </div>
            )}
        </>
    );
};

export default Header;
