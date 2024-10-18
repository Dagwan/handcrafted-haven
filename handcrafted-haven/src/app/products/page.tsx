'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link'; 


interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  stockQuantity: number;
  imageUrl?: string;
}

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://handcrafted-haven-api.onrender.com/products');
        setProducts(response.data);
      } catch (err) {
        setError('Failed to load products.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
   
      <div>
        <h1>Products</h1>
        <Link href="/products/add"> {/* Navigate to AddProductPage */} 
          <button>
            Add New Product
          </button>
        </Link>
        <ul>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            {products.map(product => (
              <div key={product._id} style={{ border: '1px solid #ccc', padding: '16px' }}>
                <h2>{product.title}</h2>
                <p>{product.description}</p>
                <p>Price: ${product.price}</p>
                <p>Stock: {product.stockQuantity}</p>
                {product.imageUrl && <img src={product.imageUrl} alt={product.title} style={{ maxWidth: '100%' }} />}
                <Link href={`/products/${product._id}`}>
                  <button style={{ marginTop: '8px' }}>View Details</button>
                </Link>
              </div>
            ))}
          </div>
        </ul>
      </div>
 
    </div>
  );
};

export default ProductsPage;
