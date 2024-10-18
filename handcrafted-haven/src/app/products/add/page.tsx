// src/app/products/add/page.tsx
'use client';

import { useState } from 'react';
import axios from 'axios';
// import { useRouter } from 'next/router';
import { useRouter } from 'next/navigation';



const AddProductPage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stockQuantity, setStockQuantity] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const router = useRouter();

  const handleAddProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('sellerId', '60d21b4667d0d8992e610c85'); // Replace with actual seller ID
    formData.append('title', title);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('stockQuantity', stockQuantity);
    formData.append('categoryId', categoryId);
    if (image) {
      formData.append('image', image); // Append the image file
    }

    try {
      const response = await fetch('https://handcrafted-haven-api.onrender.com/products', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        // Handle successful product addition (e.g., redirect)
        router.push('/products'); // Redirect to the products list page
      } else {
        // Handle errors
        console.error('Error:', data);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <div>
    

      <form onSubmit={handleAddProduct}>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description"></textarea>
      <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" required />
      <input type="number" value={stockQuantity} onChange={(e) => setStockQuantity(e.target.value)} placeholder="Stock Quantity" />
      <input type="text" value={categoryId} onChange={(e) => setCategoryId(e.target.value)} placeholder="Category ID" />
      <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files![0])} required />
      <button type="submit">Add Product</button>
    </form>

    </div>
  );
};

    
    

export default AddProductPage;

