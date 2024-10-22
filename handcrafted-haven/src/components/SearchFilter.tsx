// components/SearchFilter.tsx
'use client';

import React from 'react';

interface SearchFilterProps {
  sortOption: string;
  setSortOption: (value: string) => void;
}

const SearchFilter: React.FC<SearchFilterProps> = ({ sortOption, setSortOption }) => {
  return (
    <div>
      <label>
        Sort by:
        <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
          <option value="newest">Newest Arrivals</option>
          <option value="price">Price</option>
          <option value="highest-rated">Highest Rated</option>
        </select>
      </label>
    </div>
  );
};

export default SearchFilter;
