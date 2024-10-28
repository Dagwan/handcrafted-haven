'use client';

import React, { useEffect, useState } from 'react';
// import { Row, Col } from 'react-bootstrap';
import axios from 'axios';
// import { MdLocationOn, MdPhone, MdEmail } from 'react-icons/md';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBullseye, faBalanceScale, faEye } from '@fortawesome/free-solid-svg-icons';
import RootLayout from '../layout';
import styles from '../../styles/About.module.css';

const AboutUs: React.FC = () => {
    const [weather, setWeather] = useState<any>(null);

    useEffect(() => {
        // Fetch weather data from OpenWeather API
        const fetchWeather = async () => {
            try {
                const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
                    params: {
                        q: 'Los Angeles, USA',
                        appid: '60e235e16fea773d9638123ad7f4420b',
                        units: 'metric'
                    }
                });
                setWeather(response.data);
            } catch (error) {
                console.error('Error fetching weather data', error);
            }
        };
        fetchWeather();
    }, []);

    return (
        <RootLayout pageTitle="About-us">
            <div className={styles.aboutPage}>
                <section id="about" className={styles.section}>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6">
                                <div className={styles.aboutContent}>
                                    <h2 className={styles.sectionTitle}>About Us</h2>
                                    <p className={styles.sectionDesc}>
                                        Welcome to Handcrafted Haven, your premier destination for unique, handcrafted products that celebrate creativity and craftsmanship. We specialize in providing high-quality artisan goods to elevate your lifestyle.
                                    </p>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className={styles.companyInfo}>
                                    <h2 className={styles.sectionTitle}>Our Location</h2>
                                    <p>
                                        Located at <a href="#">123 Artisans Lane, Creative City, CA, USA</a>. Contact us at +1 (234) 567-8901 | handcraftedhaven@gmail.com.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="team" className={`${styles.section} bg-light`}>
                    <div className={`${styles.container}`}>
                        <hr /><hr />
                        <div className="row">
                            {/* Our Vision */}
                            <div className={`${styles.col} col-md-4`}>
                                <div className={styles.teamMember}>
                                    <div className={styles.teamMemberInfo}>
                                        <FontAwesomeIcon icon={faEye} />
                                        <h3>Our Vision</h3>
                                        <p>Our mission is to inspire creativity and craftsmanship through unique, handcrafted products. We aim to support artisans and bring their creations to a broader audience.</p>
                                    </div>
                                </div>
                            </div>

                            {/* Our Core Values */}
                            <div className={`${styles.col} col-md-4`}>
                                <div className={styles.teamMember}>
                                    <div className={styles.teamMemberInfo}>
                                        <FontAwesomeIcon icon={faBalanceScale} />
                                        <h3>Our Core Values</h3>
                                        <p>At Handcrafted Haven, we are committed to quality, sustainability, and integrity. Our values are: Craftsmanship, Creativity, Community, and Customer Satisfaction.</p>
                                    </div>
                                </div>
                            </div>

                            {/* Our Mission */}
                            <div className={`${styles.col} col-md-4`}>
                                <div className={styles.teamMember}>
                                    <div className={styles.teamMemberInfo}>
                                        <FontAwesomeIcon icon={faBullseye} />
                                        <h3>Our Mission</h3>
                                        <p>To be the leading platform for artisan goods, delivering exceptional products that enrich lives and support sustainable practices.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr /><hr />
                        <h2 className={styles.sectionTitle}>Our Management Team</h2>
                        <div className="row">
                            {/* Team Members */}
                            <div className={`${styles.col} col-md-4`}>
                                <div className={styles.teamMember}>
                                    <div className={styles.teamMemberImg}>
                                        <img src="/images/asidu.PNG" alt="Asiedu Isaac" />
                                    </div>
                                    <div className={styles.teamMemberInfo}>
                                        <h3>Asiedu, Isaac</h3>
                                        <p>Full-Stack Developer</p>
                                        <ul className={styles.socialList}>
                                            <li><a href="https://www.facebook.com/"><img src="/images/fb.png" alt="Facebook" className={styles.social} /></a></li>
                                            <li><a href="https://instagram.com/"><img src="/images/instagram.png" alt="Instagram" className={styles.social} /></a></li>
                                            <li><a href="https://www.linkedin.com/"><img src="/images/linkIn.JPG" alt="LinkedIn" className={styles.social} /></a></li>
                                            <li><a href="https://x.com/" target='_blank' rel="noopener noreferrer"><img src="/images/x.png" alt="X" className={styles.social} /></a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className={`${styles.col} col-md-4`}>
                                <div className={styles.teamMember}>
                                    <div className={styles.teamMemberImg}>
                                        <img src="/images/rodri.JPG" alt="Rodriguez Hector" />
                                    </div>
                                    <div className={styles.teamMemberInfo}>
                                        <h3>Rodriguez, Hector</h3>
                                        <p>Full-Stack Developer</p>
                                        <ul className={styles.socialList}>
                                            <li><a href="https://www.facebook.com/"><img src="/images/fb.png" alt="Facebook" className={styles.social} /></a></li>
                                            <li><a href="https://instagram.com/"><img src="/images/instagram.png" alt="Instagram" className={styles.social} /></a></li>
                                            <li><a href="https://www.linkedin.com/"><img src="/images/linkIn.JPG" alt="LinkedIn" className={styles.social} /></a></li>
                                            <li><a href="https://x.com/" target='_blank' rel="noopener noreferrer"><img src="/images/x.png" alt="X" className={styles.social} /></a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className={`${styles.col} col-md-4`}>
                                <div className={styles.teamMember}>
                                    <div className={styles.teamMemberImg}>
                                        <img src="/images/dagwan.JPG" alt="Danladi Dagwan" />
                                    </div>
                                    <div className={styles.teamMemberInfo}>
                                        <h3>Danladi, Dagwan</h3>
                                        <p>Full-Stack Developer</p>
                                        <ul className={styles.socialList}>
                                            <li><a href="https://www.facebook.com/"><img src="/images/fb.png" alt="Facebook" className={styles.social} /></a></li>
                                            <li><a href="https://instagram.com/"><img src="/images/instagram.png" alt="Instagram" className={styles.social} /></a></li>
                                            <li><a href="https://www.linkedin.com/"><img src="/images/linkIn.JPG" alt="LinkedIn" className={styles.social} /></a></li>
                                            <li><a href="https://x.com/" target='_blank' rel="noopener noreferrer"><img src="/images/x.png" alt="X" className={styles.social} /></a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>


                {/* Google Map Section */}
                <section className={styles.section}>
                    <div className="container">
                        <h2 className={styles.sectionTitle}>Find Us Here</h2>
                        <div className={`${styles.mapContainer}`}>
                            <div className={styles.mapIframe}>
                                <iframe
                                    title="Google Map"
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3309.114224256919!2d-118.24821928478377!3d34.04529248060784!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2c6e0f3b70f79%3A0x2b6be3c3a6f95c38!2s123%20Artisans%20Ln%2C%20Los%20Angeles%2C%20CA%2090002%2C%20USA!5e0!3m2!1sen!2sus!4v1694545403457!5m2!1sen!2sus"
                                    width="1200"
                                    height="450"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                ></iframe>
                            </div>
                            {/* Weather Information Overlay */}
                            {weather && (
                                <div className={`${styles.weatherOverlay}`}>
                                    <h3>Current Weather in Los Angeles</h3>
                                    <p>Temperature: {weather.main.temp} °C</p>
                                    <p>Weather: {weather.weather[0].description}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            </div>
        </RootLayout>
    );
};

export default AboutUs;
