// components/PaginationControls.tsx
'use client';

import React from 'react';

interface PaginationControlsProps {
  totalPages: number;
  currentPage: number;
  handlePageChange: (pageNumber: number) => void;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({ totalPages, currentPage, handlePageChange }) => {
  return (
    <div>
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index + 1}
          onClick={() => handlePageChange(index + 1)}
          disabled={currentPage === index + 1}
          style={{
            margin: '4px',
            padding: '8px',
            backgroundColor: currentPage === index + 1 ? '#007bff' : '#e0e0e0',
            color: currentPage === index + 1 ? '#fff' : '#000',
            border: 'none',
            borderRadius: '4px',
          }}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};

export default PaginationControls;
