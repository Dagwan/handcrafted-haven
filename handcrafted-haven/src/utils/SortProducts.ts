// utils/SortProducts.ts

import { Product } from '../utils/types/Product'; 
import { calculateAverageRating } from './ReviewUtils';

export const sortProducts = (products: Product[], sortOption: string): Product[] => {
  switch (sortOption) {
    case 'price':
      return [...products].sort((a, b) => a.price - b.price);
    case 'highest-rated':
      return [...products].sort((a, b) => {
        const aRating = calculateAverageRating(a.reviews || []);
        const bRating = calculateAverageRating(b.reviews || []);
        return bRating - aRating; 
      });
    case 'newest':
    default:
      return [...products].sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime());
  }
};
