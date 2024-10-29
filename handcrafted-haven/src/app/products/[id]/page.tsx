'use client';

import { useEffect, useState, useContext } from 'react';
import { useParams } from 'next/navigation'; 
import axios from 'axios';
import CartContext from '../../../context/CartContext';
import styles from '../../../styles/ViewSingleProduct.module.css';

interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  stockQuantity: number;
  imageUrl?: string;
}

interface Review {
  _id: string;
  rating: number;
  comment: string;
  createdAt: string;
}

const ProductDetailsPage = () => {
  const { id } = useParams(); 
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState({ rating: 0, comment: '' });
  const { dispatch } = useContext(CartContext);
  
  useEffect(() => {
    const fetchProduct = async () => {
      if (id) {
        try {
          setLoading(true);
          setError(null); 
          const productResponse = await axios.get(`https://handcrafted-haven-api.onrender.com/products/${id}`);
          setProduct(productResponse.data);

          const reviewsResponse = await axios.get(`https://handcrafted-haven-api.onrender.com/reviews/product/${id}`);
          setReviews(reviewsResponse.data);
        } catch (err) {
          console.error('Error fetching product details:', err);
          setError('Failed to load product details. Please try again later.');
        } finally {
          setLoading(false);
        }
      }
    };

    fetchProduct();
  }, [id]);  

  const addToCart = () => {
    if (product) {
      dispatch({
        type: 'ADD_ITEM',
        payload: {
          productId: product._id,
          name: product.title,
          price: product.price,
          quantity: 1, 
          image: product.imageUrl || '', 
          description: product.description,
        },
      });
      alert(`${product.title} has been added to your cart!`);
    }
  };

  const submitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.rating || !newReview.comment) return;

    try {
      await axios.post('https://handcrafted-haven-api.onrender.com/reviews', {
        userId: '60d21b4667d0d8992e610c85',
        productId: id,
        rating: newReview.rating,
        comment: newReview.comment,
      });

      // Fetch updated reviews
      const reviewsResponse = await axios.get(`https://handcrafted-haven-api.onrender.com/reviews/product/${id}`);
      setReviews(reviewsResponse.data);
      setNewReview({ rating: 0, comment: '' }); 
    } catch (err) {
      console.error('Error submitting review:', err);
      setError('Failed to submit review. Please try again later.');
    }
  };

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={i <= rating ? styles.filledStar : styles.emptyStar}>★</span>
      );
    }
    return stars;
  };

  if (loading) return <p>Loading product details...</p>;
  if (error) return <p className={styles.error}>{error}</p>;
  if (!product) return <p>Product not found.</p>;


return (
  <div className={styles.container}>
    <h1 className={styles.title}>{product.title}</h1>
    <div className={styles.detailsContainer}>
      {product.imageUrl && (
        <img src={product.imageUrl} alt={product.title} className={styles.productImage} />
      )}
      <div className={styles.infoContainer}>
        <p className={styles.description}>{product.description}</p>
        <p className={styles.price}>Price: ${product.price.toFixed(2)}</p>
        <p className={styles.stock}>Stock: {product.stockQuantity > 0 ? product.stockQuantity : 'Out of Stock'}</p>
        <button className={styles.addToCartButton} onClick={addToCart} disabled={product.stockQuantity === 0}>
          {product.stockQuantity > 0 ? 'Add to Cart' : 'Out of Stock'}
        </button>

        {/* Review Form */}
        <h2 className={styles.reviewTitle}>Submit a Review</h2>
        <form className={styles.reviewForm} onSubmit={submitReview}>
          <label className={styles.label}>
            Rating (1-5):
            <input 
              type="number" 
              min="1" 
              max="5" 
              value={newReview.rating} 
              onChange={(e) => setNewReview({ ...newReview, rating: Number(e.target.value) })} 
              required 
              className={styles.input} 
            />
          </label>
          <label className={styles.label}>
            Comment:
            <textarea 
              value={newReview.comment} 
              onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })} 
              required 
              className={styles.textarea} 
            />
          </label>
          <button type="submit" className={styles.submitReviewButton}>Submit Review</button>
        </form>
      </div>
    </div>

    {/* Existing Reviews */}
    <h2 className={styles.existingReviewsTitle}>Existing Reviews</h2>
    <ul className={styles.reviewList}>
      {reviews.map(review => (
        <li key={review._id} className={styles.reviewItem}>
          <div className={styles.rating}>{renderStars(review.rating)}</div>
          <p>{review.comment}</p>
          <p>Reviewed on: {new Date(review.createdAt).toLocaleDateString()}</p>
        </li>
      ))}
    </ul>
  </div>
);

};

export default ProductDetailsPage;
