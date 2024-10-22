// pages/products/ProductsPage.tsx
'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link'; 
import { useSearch } from '../../context/SearchContext';
import SearchFilter from '../../components/SearchFilter';
import PaginationControls from '../../components/PaginationControls';
import CategorySidebar from '../../components/CategorySidebar'; 
import { sortProducts } from '../../utils/SortProducts'; 

interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  stockQuantity: number;
  imageUrl?: string;
  categoryId?: string; // Optional categoryId field
  reviews?: { rating: number }[]; // Optional reviews field
}

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState<string>('newest');
  const { searchQuery } = useSearch();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null); 

  // Pagination state
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 12;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // If a category is selected, filter products by category ID
        const response = await axios.get(
          selectedCategory 
            ? `https://handcrafted-haven-api.onrender.com/products?categoryId=${selectedCategory}` 
            : 'https://handcrafted-haven-api.onrender.com/products'
        );
        setProducts(response.data);
      } catch (err) {
        setError('Failed to load products.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory]); // Refetch products whenever the selected category changes

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>{error}</p>;

  // Filter products based on search query
  const filteredProducts = sortProducts(products, sortOption).filter(product => 
    product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.price.toString().includes(searchQuery)
  );

  // Calculate total pages
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  // Slice products for the current page
  const currentProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div style={{ display: 'flex' }}>
      {/* Category Sidebar */}
      <CategorySidebar selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />

      <div style={{ flexGrow: 1, marginLeft: '20px' }}>
        <h1>Products</h1>
        <Link href="/products/add">
          <button>
            Add New Product
          </button>
        </Link>

        {/* Search and Filter Component */}
        <SearchFilter sortOption={sortOption} setSortOption={setSortOption} />

        <ul>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            {currentProducts.map(product => (
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

        {/* Pagination Controls */}
        <PaginationControls 
          totalPages={totalPages} 
          currentPage={currentPage} 
          handlePageChange={handlePageChange} 
        />
      </div>
    </div>
  );
};

export default ProductsPage;
