'use client';

import React, { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';


const Home: React.FC = () => {
    // Counter state for sold handcrafted items
    const [soldItems, setSoldItems] = useState(0);

    useEffect(() => {
        // Simulate the sold items counter (for demonstration)
        const interval = setInterval(() => {
            setSoldItems((prev) => Math.min(prev + 1, 100));
        }, 100); // Increment every 100 ms

        return () => clearInterval(interval);
    }, []);

    return (
        <div className={styles.container}>
          

            <main className={styles.main}>
                <section className={styles.hero}>
                    <h1>Welcome to Handcrafted Haven</h1>
                    <p>Discover unique handcrafted items made with love.</p>
                    <p>Join our community of artisans and find one-of-a-kind treasures!</p>
                    <p>Support local craftspeople and bring home a piece of their passion.</p>
                    <p>Explore our curated selection and find the perfect gift for yourself or a loved one.</p>
                    <button className={styles.ctaButton}>Shop Now</button>
                </section>

                <section className={styles.collectionSection}>
                    <h2>Shop Our Collection</h2>
                    <p>Discover a variety of handmade products from talented artisans.</p>
                    <p className={styles.counter}>Handcrafted Items Sold: {soldItems}</p>
                    <div className={styles.grid}>
                        <div className={styles.row}>
                            <p>Explore unique jewelry, art pieces, and home decor.</p>
                            <p>Support local artisans by purchasing one-of-a-kind products.</p>
                            <p>Find the perfect gift for yourself or a loved one.</p>
                        </div>
                        <div className={styles.row}>
                            <p>Each purchase helps sustain the craft community.</p>
                            <p>Join us in celebrating creativity and craftsmanship.</p>
                            <p>Every item tells a story—find yours today!</p>
                        </div>
                    </div>

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
                        <li>Support local artisans by choosing handmade products that reflect their craftsmanship and dedication.</li>
                        <li>Discover unique, one-of-a-kind products that are not only beautiful but also tell a story of creativity and passion.</li>
                        <li>Explore sustainable and eco-friendly options that promote environmentally responsible practices and materials.</li>
                        <li>Each purchase helps preserve traditional crafts, ensuring that these valuable skills are passed down to future generations.</li>
                        <li>Enjoy customizable items designed to suit your personal style and preferences, making your purchase truly unique.</li>
                        <li>A portion of every sale goes to community projects, contributing to the betterment of local neighborhoods and initiatives.</li>
                    </ul>

                </section>

                <section className={styles.callToActionContainer}>
                    <div className={styles.callToAction1}>
                        <h2>Join Our Artisan Community!</h2>
                        <p>Become a part of Handcrafted Haven and showcase your unique creations.</p>
                        <p>As a member, you'll enjoy:</p>
                        <ul>
                            <li>Access to a vibrant marketplace for your handmade products.</li>
                            <li>Networking opportunities with fellow artisans and creators.</li>
                            <li>Promotion through our marketing channels to reach a wider audience.</li>
                            <li>Support and resources to help you grow your craft.</li>
                            <li>Regular workshops and events to hone your skills.</li>
                        </ul>
                        <button className={styles.ctaButton}>Learn More</button>
                    </div>

                    <div className={styles.callToAction2}>
                        <h2>Why Join Us?</h2>
                        <p>Our community is dedicated to supporting artisans by providing:</p>
                        <ul>
                            <li>Exclusive access to artisan fairs and exhibitions.</li>
                            <li>Online tools for managing sales and inventory.</li>
                            <li>A supportive community that celebrates creativity.</li>
                            <li>Workshops to enhance your skills and business acumen.</li>
                            <li>Marketing support to increase your visibility.</li>
                        </ul>
                        <button className={styles.ctaButton}>Become a Member</button>
                    </div>
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
                        <div className={styles.testimonialCard}>
                            <p>"Each piece I've bought tells a unique story. I'm proud to support local artisans!"</p>
                            <p>- Emily R.</p>
                        </div>
                        <div className={styles.testimonialCard}>
                            <p>"I purchased a beautiful handwoven rug, and it's perfect for my living room."</p>
                            <p>- Michael B.</p>
                        </div>
                        <div className={styles.testimonialCard}>
                            <p>"The customer service was fantastic, and my order arrived quickly!"</p>
                            <p>- Jessica L.</p>
                        </div>
                        <div className={styles.testimonialCard}>
                            <p>"I can't get enough of the handcrafted jewelry. Each piece is stunning!"</p>
                            <p>- David M.</p>
                        </div>
                    </div>
                </section>


                <section className={styles.blogSection}>
                    <h2>Latest Blog Posts</h2>
                    <div className={styles.blogGrid}>
                        <div className={styles.blogCard}>
                            <img src="/images/blog1.jpg" alt="Blog 1" className={styles.blogImage} />
                            <h3>5 Reasons to Support Local Artisans</h3>
                            <p>Discover the importance of supporting local craftspeople and how your purchases can make a significant difference in their lives. Supporting local artisans helps preserve traditional skills, boosts the local economy, and fosters a sense of community. By choosing handmade products, you not only acquire unique items but also contribute to the sustainability of local craftsmanship.</p>
                            <button className={styles.readMoreButton}>Read More</button>
                        </div>
                        <span className={styles.separator}></span>
                        <div className={styles.blogCard}>
                            <img src="/images/blog2.jpg" alt="Blog 2" className={styles.blogImage} />
                            <h3>How to Care for Handmade Items</h3>
                            <p>Learn how to maintain the beauty and longevity of your handcrafted products with our expert tips. From proper cleaning techniques to storage solutions, we cover everything you need to know to ensure your handmade items remain in pristine condition. Understand the materials used in your products and how best to preserve their unique qualities, so you can enjoy them for years to come.</p>
                            <button className={styles.readMoreButton}>Read More</button>
                        </div>
                    </div>
                </section>


            </main>

            
        </div>
    );
};

export default Home;
