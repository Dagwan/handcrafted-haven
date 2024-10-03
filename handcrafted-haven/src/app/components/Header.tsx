'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from '../styles/Header.module.css';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [expanded, setExpanded] = useState(false);

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

    return (
        <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
            <div className={styles.headerWrapper}>
                <div className={styles.mainNav}>
                    <div className={styles.brandLogo}>
                        {/* Add the logo image here */}
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
                            <li><Link href="/gallery" onClick={handleNavClick}>Gallery</Link></li>
                            <li><Link href="/blog" onClick={handleNavClick}>Blog</Link></li>
                            <li><Link href="/contact" onClick={handleNavClick}>Contact</Link></li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;
