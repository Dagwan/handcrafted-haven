// components/CategorySidebar.tsx
import { useEffect, useState } from 'react';
import axios from 'axios';

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
    <div>
      <h3>Categories</h3>
      <ul>
        <li 
          onClick={() => setSelectedCategory(null)} 
          style={{ cursor: 'pointer', fontWeight: selectedCategory === null ? 'bold' : 'normal' }}
        >
          All Products
        </li>
        {categories.map(category => (
          <li 
            key={category._id} 
            onClick={() => setSelectedCategory(category._id)} 
            style={{ cursor: 'pointer', fontWeight: selectedCategory === category._id ? 'bold' : 'normal' }}
          >
            {category.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategorySidebar;
