'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useCart } from '../context/CartContext';
import { useSearch } from '../context/SearchContext';
import styles from '../styles/Header.module.css';

const Header = () => {
  const { state } = useCart();
  const { searchQuery, setSearchQuery } = useSearch();
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

  const totalItemsInCart = state.items.reduce((total, item) => total + item.quantity, 0);

  return (
    <>
      <div className={styles.topHeader}>
        <Link href="/login">Login</Link>
        <Link href="/user">Register</Link>
        <Link href="/products">Shop Now</Link>
        <div className={`${styles.searchContainer} ${isSearchExpanded ? styles.expanded : ''}`}>
          <input
            type="text"
            placeholder="Search..."
            className={styles.searchInput}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={handleSearchFocus}
            onBlur={handleSearchBlur}
          />
          <button className={styles.searchButton}>🔍</button>
        </div>
        <Link href="/cart" className={styles.cartIcon}>
          🛒 {totalItemsInCart > 0 && <span>({totalItemsInCart})</span>}
        </Link>
      </div>

      <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
        <div className={styles.headerWrapper}>
          <div className={styles.brandLogo}>
            <Link href="/">
              <img src="/images/hand-logo.jpg" alt="Handcrafted Haven Logo" className={styles.logo} />
            </Link>
            <h1 className={styles.companyName}>Handcrafted Haven</h1>
          </div>

          <div className={styles.hamburger} onClick={() => setExpanded(!expanded)}>
            <span className={expanded ? styles.active : ''}></span>
            <span className={expanded ? styles.active : ''}></span>
            <span className={expanded ? styles.active : ''}></span>
            {/* <span className={expanded ? styles.active : ''}></span> */}
          </div>

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

      {expanded && (
        <div className={`${styles.popup} ${expanded ? styles.show : ''}`}>
          <div className={styles.popupContent}>
            <button className={styles.closeButton} onClick={() => setExpanded(false)}>✖</button>
            
            {/* Popup Top Header */}
            <div className={styles.popupTopHeader}>
              <Link href="/login" onClick={handleNavClick}>Login</Link>
              <Link href="/user" onClick={handleNavClick}>Register</Link>
              <Link href="/products" onClick={handleNavClick}>Shop Now</Link>
              <div className={styles.searchContainer}>
                <input
                  type="text"
                  placeholder="Search..."
                  className={styles.searchInput}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className={styles.searchButton}>🔍</button>
              </div>
              <Link href="/cart" className={styles.cartIcon}>
                🛒 {totalItemsInCart > 0 && <span>({totalItemsInCart})</span>}
              </Link>
            </div>

            {/* Popup Navigation */}
            <nav className={styles.popupNav}>
              <ul>
                <li><Link href="/" onClick={handleNavClick}>Home</Link></li>
                <li><Link href="/about" onClick={handleNavClick}>About Us</Link></li>
                <li><Link href="/sellers" onClick={handleNavClick}>Seller Profiles</Link></li>
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