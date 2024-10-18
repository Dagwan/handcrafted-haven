'use client'; // Keep this line to use client-side rendering features

import { useEffect, useState, useContext } from 'react';
import { useParams } from 'next/navigation'; // Use this to get route parameters
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

const ProductDetailsPage = () => {
  const { id } = useParams(); // Get the product ID from the URL
  console.log("Product ID from URL:", id);

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { dispatch } = useContext(CartContext);
  
  useEffect(() => {
    const fetchProduct = async () => {
      if (id) {
        try {
          setLoading(true);
          setError(null); // Clear any previous errors
          const response = await axios.get(`https://handcrafted-haven-api.onrender.com/products/${id}`);
          setProduct(response.data);
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
          quantity: 1, // Default quantity to add
          image: product.imageUrl, // Include image URL
          description: product.description, // Include description
        },
      });
      alert(`${product.title} has been added to your cart!`);
    }
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
    </div>
  );
};

export default ProductDetailsPage;
