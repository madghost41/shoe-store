
# Capstone Project: Online Store

### Software Engineers (EDP)
Stephen Thomas  
Nate Notermann

## Overview  
The goal is to build a full-featured **online store** using **React, Node.js, and MongoDB**. The application will allow users to browse, search, and purchase products with a seamless shopping experience.  

### **Key Features**  
- **Landing Page** – Displays featured products.  
- **Search & Categories** – Users can search for products or filter by category.  
- **Product Details** – Each product has a details page with an **"Add to Cart"** button.  
- **Shopping Cart & Checkout**  
  - View selected items 
  <!-- with total price.   -->
  <!-- - Enter payment and shipping details.   -->
  - Complete checkout and store order in the database.  

---

## **Building the Application**  
### **Backend & Database**  
- Use **MongoDB** to store product and order data.  
- Build a **Node.js web service** for data handling (CRUD operations).  

### **Frontend**  
- Develop the **React-based web application** for an interactive UI.  

---

## **Data Analysis & Product Recommendations**  
- **Generate dummy data** (at least **1000 products**).  
- Train a **product recommendation model** using:  
  - `sklearn.neighbors.NearestNeighbors`  
  - Attributes: **popularity, durability, price** to improve accuracy.  
- Create a **React component** to send product data to the recommendation model and display suggested products.  
- Implement a **RESTful API** to communicate with the Python model.  
  - **Tip:** Use `python-shell` (npm package) or **Flask** for integration.  

---

This document provides a high-level roadmap for developing the **Online Store** project. 



## Project To-Do List
- **Setup boilerplate Frontend -DONE**
- **Setup boilerplate Backend -DONE**
- **Setup MongoDB -DONE**
- **Setup Data JSON -DONE**

### Python Data Predictions
- Implement data predictions in Python  -DONE
- Return Python prediction results to the app 

### React Components
- **Landing Page**  -DONE
- **Navigation Bar** (Home, Search, Cart)  -DONE
<!-- - **Login Page**  -->
- **Search Box  -DONE** 
- **List of Categories  -DONE**
  - **Shoe Card  -DONE**
    - Shoe details button  -DONE
    - Add to cart  -DONE
- **Shoe Details Page  -DONE*
- **Cart Page  -DONE**

### Optional: Cart Storage in Session Variable
- Get shoes in cart  -DONE
- Add shoe to cart  -DONE
- Clear cart -DONE
- Delete shoe from cart 

### Server CRUD Functions
- **Get one shoe API endpoint** -DONE
- **Get multiple shoes API endpoint** -DONE
- **Get multiple shoes using paging** -DONE
- **Get dynamically search shoes** -DONE

### Database - Purchases
- **Post:** Save purchased shoes in cart to the database -DONE

## Maybe's
- Jest Testing
- **Get:** Purchased shoes