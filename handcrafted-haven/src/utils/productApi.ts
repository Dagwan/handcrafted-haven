// src/utils/productApi.ts

const BASE_URL = 'https://handcrafted-haven-api.onrender.com/products';

// Function to create a product
export const createProduct = async (productData: FormData) => {
  try {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      body: productData,
    });
    return await response.json();
  } catch (error) {
    console.error('Error creating product:', error);
    throw error; // Re-throw the error for handling in the component
  }
};

// Function to update a product
export const updateProduct = async (id: string, productData: object) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    });
    return await response.json();
  } catch (error) {
    console.error('Error updating product:', error);
    throw error; // Re-throw the error for handling in the component
  }
};

// Function to delete a product
export const deleteProduct = async (id: string) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return await response.json();
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error; 
  }
};

// Function to fetch all products (optional)
export const getAllProducts = async () => {
  try {
    const response = await fetch(BASE_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return await response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error; 
  }
};
