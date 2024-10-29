import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../styles/Categories.module.css';

interface Category {
  _id: string;
  name: string;
  description?: string;
}

interface CategorySidebarProps {
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
}

const CategorySidebar: React.FC<CategorySidebarProps> = ({ selectedCategory, setSelectedCategory }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://handcrafted-haven-api.onrender.com/categories');
        setCategories(response.data);
      } catch (err) {
        console.error('Error fetching categories:', err);
        setError('Failed to load categories.');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) return <p>Loading categories...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className={styles.categoryContainer}>
      <h3>Categories</h3>
      <ul className={styles.categoryList}>
        <li
          onClick={() => setSelectedCategory(null)}
          className={`${styles.categoryItem} ${selectedCategory === null ? styles.selected : ''}`}
        >
          All Products
        </li>
        {categories.map(category => (
          <li
            key={category._id}
            onClick={() => setSelectedCategory(category.name)} // Change to set category name
            className={`${styles.categoryItem} ${selectedCategory === category.name ? styles.selected : ''}`} // Update to match category name
          >
            {category.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategorySidebar;
