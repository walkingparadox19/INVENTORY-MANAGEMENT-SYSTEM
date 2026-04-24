-- =============================================
-- database.sql - Run this in MySQL Workbench
-- =============================================
-- This creates the database and tables for our project

-- Step 1: Create the database
CREATE DATABASE IF NOT EXISTS inventory_db;

-- Step 2: Use the database
USE inventory_db;

-- Step 3: Create users table (for login)
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Step 4: Create products table (main inventory)
CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    category VARCHAR(100) NOT NULL,
    quantity INT NOT NULL DEFAULT 0,
    price DECIMAL(10, 2) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Step 5: Insert a default admin user
-- Password is: admin123
INSERT INTO users (username, password) VALUES 
('admin', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi');

-- Step 6: Insert some sample products
INSERT INTO products (name, category, quantity, price, description) VALUES
('Laptop', 'Electronics', 10, 55000.00, 'Dell Laptop 15 inch'),
('Keyboard', 'Electronics', 25, 1500.00, 'Mechanical Keyboard'),
('Notebook', 'Stationery', 100, 50.00, 'A4 size notebook'),
('Pen', 'Stationery', 500, 10.00, 'Blue ball pen'),
('Mouse', 'Electronics', 30, 800.00, 'Wireless Mouse');
