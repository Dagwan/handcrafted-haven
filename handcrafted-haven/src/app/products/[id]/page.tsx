'use client'; 

import { useEffect, useState, useContext } from 'react';
import { useParams } from 'next/navigation'; 
import axios from 'axios';
import CartContext from '../../../context/CartContext';

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
          image: product.imageUrl, 
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
        <span key={i} style={{ color: i <= rating ? 'gold' : 'lightgray' }}>★</span>
      );
    }
    return stars;
  };

  if (loading) return <p>Loading product details...</p>;
  if (error) return <p>{error}</p>;
  if (!product) return <p>Product not found.</p>;

  return (
    <div style={{ padding: '16px' }}>
      <h1>{product.title}</h1>
      {product.imageUrl && <img src={product.imageUrl} alt={product.title} style={{ maxWidth: '100%' }} />}
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <p>Stock: {product.stockQuantity > 0 ? product.stockQuantity : 'Out of Stock'}</p>
      <button onClick={addToCart} disabled={product.stockQuantity === 0}>
        {product.stockQuantity > 0 ? 'Add to Cart' : 'Out of Stock'}
      </button>

      <h2>Reviews</h2>
      <form onSubmit={submitReview}>
        <label>
          Rating (1-5):
          <input type="number" min="1" max="5" value={newReview.rating} onChange={(e) => setNewReview({ ...newReview, rating: Number(e.target.value) })} required />
        </label>
        <label>
          Comment:
          <textarea value={newReview.comment} onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })} required />
        </label>
        <button type="submit">Submit Review</button>
      </form>
      
      <h3>Existing Reviews</h3>
      <ul>
        {reviews.map(review => (
          <li key={review._id}>
            <p><strong>Rating:</strong> {renderStars(review.rating)}</p>
            <p>{review.comment}</p>
            <p><em>Submitted on: {new Date(review.createdAt).toLocaleDateString()}</em></p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductDetailsPage;
