'use client'; 

import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useSearch } from '../../context/SearchContext';
import SearchFilter from '../../components/SearchFilter';
import PaginationControls from '../../components/PaginationControls';
import CategorySidebar from '../../components/CategorySidebar';
import { sortProducts } from '../../utils/SortProducts';
import RootLayout from '../layout';
import styles from "../../styles/ProductsPage.module.css";

interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  stockQuantity: number;
  imageUrl?: string;
  categoryId?: string;
  reviews?: { rating: number }[];
}

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState<string>('newest');
  const { searchQuery } = useSearch();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 12;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          selectedCategory
            ? `https://handcrafted-haven-api.onrender.com/products?categoryId=${selectedCategory}`
            : 'https://handcrafted-haven-api.onrender.com/products'
        );
        setProducts(response.data);
      } catch (err) {
        console.error(err);
        setError('Failed to load products.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory]);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>{error}</p>;

  const filteredProducts = sortProducts(products, sortOption).filter(product =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.price.toString().includes(searchQuery)
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const currentProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <RootLayout pageTitle="Products">
    <div className={styles.container}>
      <div className={styles.categorySidebar}>
        <CategorySidebar selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
      </div>

      <div className={styles.content}>
        <h1>Products</h1>

        <div className={styles.buttonSearchContainer}>
          <Link href="/products/add">
            <button className={styles.button}>Add New Product</button>
          </Link>
          <SearchFilter sortOption={sortOption} setSortOption={setSortOption} />
        </div>

        {/* Change ul to div */}
        <div className={styles.gridContainer}>
          {currentProducts.map(product => (
            <div key={product._id} className={styles.productCard}>
              {product.imageUrl && (
                <img src={product.imageUrl} alt={product.title} className={styles.productImage} />
              )}
              <h2>{product.title}</h2>
              <p>{product.description}</p>
              <p>Price: ${product.price}</p>
              <p>Stock: {product.stockQuantity}</p>
              <div className={styles.buttonContainer}>
                <Link href={`/products/${product._id}`}>
                  <button className={`${styles.button} ${styles.viewButton}`}>View Details</button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <PaginationControls
          totalPages={totalPages}
          currentPage={currentPage}
          handlePageChange={handlePageChange}
        />
      </div>
    </div>
    </RootLayout>
  );
};

export default ProductsPage;
