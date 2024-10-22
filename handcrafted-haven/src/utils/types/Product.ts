// types/Product.ts

export interface Review {
    rating: number;
  }
  
  export interface Product {
    _id: string;
    title: string;
    description: string;
    price: number;
    stockQuantity: number;
    imageUrl?: string;
    createdAt?: string; // Optional if some products don't have a createdAt field
    reviews?: Review[]; // Optional if some products don't have reviews
  }
  