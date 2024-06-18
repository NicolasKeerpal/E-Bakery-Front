# E-Bakery Online Delivery Service

## Project Overview

Welcome to E-Bakery, an online bakery platform that allows customers to have delicious baked goods delivered right to their doorsteps. This README will guide you through the installation, setup, and usage of the project.

## Installation

### 1. Setting Up the Database

First, you need to create a database for the project. Using phpMyAdmin or a similar tool, create a new database named `e-bakery`.

### 2. Starting the API

The backend API for this project is provided to you via Teams. Follow these steps to set it up:

1. Navigate to the API directory.
2. Run the command:
    ```bash
    npm install
    ```
3. Start the server:
    ```bash
    node server.js
    ```

### 3. Cloning and Running the Frontend

Clone this repository for the frontend. Once cloned, navigate to the project directory and run:

```bash
ng serve
```
After the server is up, log in as an admin using the following credentials:

- **Email:** yacowan.keedrady@gmail.com
- **Password:** mdp

Navigate to the `Populate DB` tab and click on `Populate DB` to fill the database with initial data.

## How to Start

To run the project, follow these steps in order:

1. Start the API server:
    ```
    node server.js
    ```
2. Start the frontend server:
    ```
    ng serve
    ```

## Site Functionality

The site has three main roles: **Admin**, **Customer**, and **Deliveryman**.

### Admin

- **Manage Ingredients and Products:** Admins can add, modify, or delete ingredients and products.
- **Populate Database:** Admins can populate the database with initial data via the `Populate DB` tab.

### Customer

- **Browse Products:** Customers can view the product catalog and add items to their cart.
- **Place Orders:** Customers can proceed to checkout, pay for their orders, and have them delivered.
- **Track Orders:** Customers can see their ongoing orders in the `Orders` tab and confirm delivery upon receiving their order.

### Deliveryman

- **View Deliveries:** Deliverymen can see their assigned deliveries in the `Deliveries` tab.
- **Complete Deliveries:** They can mark deliveries as finished by clicking the `Finish` button.
- **Customer Confirmation:** After a delivery is marked as finished, customers can validate the delivery in the `Orders` tab by clicking `Validate`.

## Known Bugs

- **Update Product:** The update product functionality is partially non-functional due to a bug in the API.
- **Add to Cart:** Adding a product to the cart currently adds the subsequent product instead, which is a known API issue.