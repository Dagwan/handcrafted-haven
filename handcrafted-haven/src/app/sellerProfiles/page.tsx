'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';


interface Seller {
  _id: string;
  name: string;
  bio: string;
  profilePicture?: string;
}

interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  imageUrl?: string;
}

const SellerProfilePage = () => {
  const [seller, setSeller] = useState<Seller | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const { id } = router.query; // Get seller ID from the URL

  useEffect(() => {
    if (!id) return; // Exit if no ID is provided

    const fetchSellerData = async () => {
      try {
        setLoading(true);
        const sellerResponse = await axios.get(`https://handcrafted-haven-api.onrender.com/sellers/${id}`);
        const productsResponse = await axios.get(`https://handcrafted-haven-api.onrender.com/products?sellerId=${id}`);
        
        setSeller(sellerResponse.data);
        setProducts(productsResponse.data);
      } catch (error) {
        console.error('Error fetching seller data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSellerData();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!seller) return <p>Seller not found.</p>;

  return (
    <div>
      <h1>{seller.name}</h1>
      {seller.profilePicture && <img src={seller.profilePicture} alt={`${seller.name}'s profile`} />}
      <p>{seller.bio}</p>

      <h2>Products by {seller.name}</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
        {products.map(product => (
          <div key={product._id} style={{ border: '1px solid #ccc', padding: '16px' }}>
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            {product.imageUrl && <img src={product.imageUrl} alt={product.title} style={{ maxWidth: '100%' }} />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SellerProfilePage;
