'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from '../styles/Header.module.css';

const Header = () => {
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

    return (
        <>
            {/* Top Header only for larger screens */}
            <div className={styles.topHeader}>
                <Link href="/gallery">Gallery</Link>
                <Link href="/faq">FAQ</Link>
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
                <Link href="/cart" className={styles.cartIcon}>🛒</Link>
            </div>

            <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
                <div className={styles.headerWrapper}>
                    <div className={styles.brandLogo}>
                        <img src="/images/hand-logo.jpg" alt="Handcrafted Haven Logo" className={styles.logo} />
                        <h1 className={styles.companyName}>Handcrafted Haven</h1>
                    </div>

                    <div className={styles.hamburger} onClick={() => setExpanded(!expanded)}>
                        <span className={expanded ? styles.active : ''}></span>
                        <span className={expanded ? styles.active : ''}></span>
                        <span className={expanded ? styles.active : ''}></span>
                    </div>

                    <nav className={`${styles.nav} ${expanded ? styles.open : ''}`}>
                        <ul>
                            <li><Link href="/" onClick={handleNavClick}>Home</Link></li>
                            <li><Link href="/about" onClick={handleNavClick}>About Us</Link></li>
                            <li><Link href="/shop" onClick={handleNavClick}>Shop</Link></li>
                            <li><Link href="/blog" onClick={handleNavClick}>Blog</Link></li>
                            <li><Link href="/contact" onClick={handleNavClick}>Contact</Link></li>
                            <li><Link href="/sellers" onClick={handleNavClick}>Sellers</Link></li>
                        </ul>
                    </nav>
                </div>
            </header>

            {expanded && (
                <div className={styles.popup}>
                    <div className={styles.popupContent}>
                        <button className={styles.closeButton} onClick={() => setExpanded(false)}>✖</button>
                        <div className={styles.popupTopHeader}>
                            <Link href="/gallery">Gallery</Link>
                            <Link href="/faq">FAQ</Link>
                            <Link href="/login">Login</Link>
                            <Link href="/register">Register</Link>
                        </div>
                        <nav className={styles.popupNav}>
                            <ul>
                                <li><Link href="/" onClick={handleNavClick}>Home</Link></li>
                                <li><Link href="/about" onClick={handleNavClick}>About Us</Link></li>
                                <li><Link href="/shop" onClick={handleNavClick}>Shop</Link></li>
                                <li><Link href="/blog" onClick={handleNavClick}>Blog</Link></li>
                                <li><Link href="/contact" onClick={handleNavClick}>Contact</Link></li>
                                <li><Link href="/sellers" onClick={handleNavClick}>Sellers</Link></li>
                            </ul>
                        </nav>
                    </div>
                </div>
            )}
        </>
    );
};

export default Header;
