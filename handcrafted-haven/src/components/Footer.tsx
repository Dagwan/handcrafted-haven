'use client';

import React from 'react';
import styles from '../styles/Footer.module.css'

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <hr></hr>
            <div className={styles.footerContent}>
                <div className={styles.footerTop}>
                    <div className={styles.footerSection}>
                        <h3>Contact Handcrafted Haven</h3>
                        <ul>
                            <li><a href="#">Call or Text: +123 (0) 456 7890</a></li>
                            <li><a href="mailto:info@handcraftedhaven.com">Email: info@handcraftedhaven.com</a></li>
                            <li><a href="http://www.handcraftedhaven.com">Website: www.handcraftedhaven.com</a></li>
                            <li><a href="#">123 Artisans Lane, Creative City, CA, USA</a></li>
                        </ul>
                    </div>

                    <div className={styles.footerSection}>
                        <h3>Resources</h3>
                        <ul>
                            <li><a href="#">A-Z Index</a></li>
                            <li><a href="#">Mobile App (Android)</a></li>
                            <li><a href="#">Mobile App (iOS)</a></li>
                            <li><a href="#">Community Events</a></li>
                            <li><a href="#">Careers at Handcrafted Haven</a></li>
                            <li><a href="#">Support Artisans</a></li>
                            <li><a href="#">Workshops & Classes</a></li>
                            <li><a href="#">Library</a></li>
                            <li><a href="#">Customer Support</a></li>
                            <li><a href="#">Policies & Safety</a></li>
                            <li><a href="#">Contact Us</a></li>
                        </ul>
                    </div>

                    <div className={styles.footerSection}>
                        <h3>Other Handcrafted Centers</h3>
                        <ul>
                            <li><a href="#">Handcrafted Haven Los Angeles</a></li>
                            <li><a href="#">Handcrafted Haven New York</a></li>
                            <li><a href="#">Handcrafted Haven Chicago</a></li>
                            <li><a href="#">Handcrafted Haven Dallas</a></li>
                        </ul>
                    </div>

                    <div className={styles.footerSection}>
                        <div className={styles.socialColumn}>
                            <h3>Connect</h3>
                            <ul>
                                <li><a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer"><img src="/images/fb.PNG" alt="facebook" className={styles.social} /></a></li>
                                <li><a href="https://instagram.com/" target="_blank" rel="noopener noreferrer"><img src="/images/instagram.PNG" alt="instagram" className={styles.social} /></a></li>
                                <li><a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer"><img src="/images/linkIn.JPG" alt="linkedin" className={styles.social} /></a></li>
                                <li><a href="https://x.com/" target="_blank" rel="noopener noreferrer"><img src="/images/x.PNG" alt="x" className={styles.social} /></a></li>
                            </ul>
                        </div>
                        <ul className={styles.connectList}>
                            <li><a href="#">Haven Alumni</a></li>
                            <li><a href="#">Haven Gallery</a></li>
                            <li><a href="#">Haven News</a></li>
                            <li><a href="#">Haven Store</a></li>
                            <li><a href="#">Haven TV</a></li>
                        </ul>
                    </div>
                </div>

                <div className={styles.footerBottom}>
                    <article className={styles.copyright}>
                        <p className={styles.copyDate}>_____-:- &copy; {new Date().getFullYear()} All rights reserved. Handcrafted Haven.</p>
                    </article>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
