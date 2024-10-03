import React from 'react';
import Head from 'next/head';
import styles from './styles/Home.module.css';
import Header from './components/Header';
import Footer from './components/Footer';

const Home: React.FC = () => {
    return (
        <div className={styles.container}>
            <Head>
                <title>Handcrafted Haven</title>
                <meta name="description" content="A marketplace for artisans to showcase and sell their handcrafted items." />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />

            <main className={styles.main}>
                <section className={styles.hero}>
                    <h1>Welcome to Handcrafted Haven</h1>
                    <p>Discover unique handcrafted items made with love.</p>
                    <button className={styles.ctaButton}>Shop Now</button>
                </section>

                <section id="shop">
                    <h2>Shop Our Collection</h2>
                    <p>Discover a variety of handmade products from talented artisans.</p>

                    <div className={styles.productGrid}>
                        {/* Existing Products */}
                        <div className={styles.productCard}>
                            <img src="/images/product1.JPG" alt="Product 1" />
                            <h3>Handmade Wooden Bowl</h3>
                            <p>$45.00</p>
                            <button className={styles.ctaButton}>Add to Cart</button>
                        </div>
                        <div className={styles.productCard}>
                            <img src="/images/product2.JPG" alt="Product 2" />
                            <h3>Woven Horse</h3>
                            <p>$30.00</p>
                            <button className={styles.ctaButton}>Add to Cart</button>
                        </div>
                        <div className={styles.productCard}>
                            <img src="/images/product3.JPG" alt="Product 3" />
                            <h3>Ceramic Mug</h3>
                            <p>$15.00</p>
                            <button className={styles.ctaButton}>Add to Cart</button>
                        </div>
                        {/* New Products */}
                        <div className={styles.productCard}>
                            <img src="/images/product4.JPG" alt="Product 4" />
                            <h3>Knitted Scarf</h3>
                            <p>$25.00</p>
                            <button className={styles.ctaButton}>Add to Cart</button>
                        </div>
                        <div className={styles.productCard}>
                            <img src="/images/product5.JPG" alt="Product 5" />
                            <h3>Hand-Painted Canvas</h3>
                            <p>$75.00</p>
                            <button className={styles.ctaButton}>Add to Cart</button>
                        </div>
                        <div className={styles.productCard}>
                            <img src="/images/product6.JPG" alt="Product 6" />
                            <h3>Eco-Friendly Tote Bag</h3>
                            <p>$20.00</p>
                            <button className={styles.ctaButton}>Add to Cart</button>
                        </div>
                    </div>
                </section>

                <section className={styles.whySection}>
                    <h2>Why Choose Handcrafted Haven?</h2>
                    <ul>
                        <li>Support local artisans</li>
                        <li>Unique, one-of-a-kind products</li>
                        <li>Sustainable and eco-friendly options</li>
                    </ul>
                </section>

                <section className={styles.callToAction}>
                    <h2>Join Our Artisan Community!</h2>
                    <p>Become a part of Handcrafted Haven and showcase your unique creations.</p>
                    <button className={styles.ctaButton}>Learn More</button>
                </section>

                <section className={styles.testimonials}>
                    <h2>What Our Customers Say</h2>
                    <div className={styles.testimonialGrid}>
                        <div className={styles.testimonialCard}>
                            <p>"I love my handmade wooden bowl! It's a beautiful addition to my kitchen."</p>
                            <p>- Sarah K.</p>
                        </div>
                        <div className={styles.testimonialCard}>
                            <p>"The quality of the products is exceptional. I'll definitely be back for more!"</p>
                            <p>- John D.</p>
                        </div>
                    </div>
                </section>

                <section className={styles.blogSection}>
                    <h2>Latest Blog Posts</h2>
                    <div className={styles.blogGrid}>
                        <div className={styles.blogCard}>
                            <img src="/images/blog1.jpg" alt="Blog 1" />
                            <h3>5 Reasons to Support Local Artisans</h3>
                            <p>Discover the importance of supporting local craftspeople.</p>
                        </div>
                        <div className={styles.blogCard}>
                            <img src="/images/blog2.jpg" alt="Blog 2" />
                            <h3>How to Care for Handmade Items</h3>
                            <p>Learn how to maintain the beauty and longevity of your handcrafted products.</p>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default Home;
