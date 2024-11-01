# Handcrafted Haven Application

The Handcrafted Haven Application is a Nextjs-Typescript web application designed to provide a user-friendly interface for a marketplace dedicated to handcrafted items. Built with Next.js and TypeScript, this frontend connects customers with artisans, allowing them to browse, search, and purchase unique handcrafted products. The application features intuitive navigation, product listings, user authentication, and seller profiles, ensuring a seamless shopping experience.

## Overview

Handcrafted Haven aims to connect talented artisans with customers by providing a platform to showcase and sell unique handcrafted products. The frontend supports essential functionalities such as user registration, product browsing, cart management, and order processing, all while maintaining an elegant and responsive design.

## Features

- **User Authentication:** Allows users to register, log in, and manage their accounts securely.
- **Product Listings:** Displays a comprehensive list of products, with filters for categories, price ranges, and artisans.
- **Seller Profiles:** Artisans can create and manage their profiles to showcase their craftsmanship and products.
- **Shopping Cart:** Users can add products to their cart, view items, and proceed to checkout.
- **Responsive Design:** Ensures optimal viewing and interaction experience across various devices.


### Installation
To run this project locally:
1. Clone the repository.
2. Install dependencies:
3. pnpm install or i
4. pnpm dev to run the application.

5. [Open](http://localhost:3000) in your browser to view the application. The application will automatically reload if you make changes to the source code.

## API Integration
The frontend communicates with the Handcrafted Haven API to manage data related to users, products, orders, and payments. Ensure the API is running before starting the frontend application. the API can be accessed through:
[Swagger UI - For Developers Guide](https://handcrafted-haven-api.onrender.com/api-docs/)


## User Guide

### User Registration and Login
- Navigate to the registration page to create a new account by providing a username, password, and email etc.
- After registration depending on your user type (Buyer or Seller). If your user type is seller, you'll need addition registration for the seller profile, then log in with your credentials to access your account.

### Browsing Products
- Use the main navigation to view all available products or filter by categories or price ranges.
- Click on a product to view detailed information, including descriptions, prices, and artisan details.

### Shopping Cart
- Add products to your shopping cart from the product listing or product detail pages.
- Access the cart to review items and proceed to checkout.

### Seller Profile Management
- Artisans can create and manage their profiles to showcase their work and products.
- Login as a seller to add product listings and update profile information.

## Error Handling
The application handles errors gracefully, providing user-friendly messages for:

- Invalid input during registration or login.
- Network issues when communicating with the API.
- Missing or unavailable products.

### License

This project is licensed under the MIT License - see the [LICENSE](/handcrafted-haven/docs/LICENSE) file for details.