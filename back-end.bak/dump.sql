-- Prepares the server for the project
-- create database if not exists

DROP DATABASE IF EXISTS xt_dev_db;

CREATE DATABASE IF NOT EXISTS xt_dev_db;
CREATE USER IF NOT EXISTS 'xt_dev'@'localhost' IDENTIFIED BY 'xt_dev_pwd';
GRANT ALL PRIVILEGES ON xt_dev_db.* TO 'xt_dev'@'localhost';
GRANT SELECT ON performance_schema.* TO 'xt_dev'@'localhost';

USE xt_dev_db;

-- Create the Users Table
CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(60) PRIMARY KEY,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL,
    first_name VARCHAR(128),
    last_name VARCHAR(128),
    email VARCHAR(128) NOT NULL,
    password VARCHAR(128) NOT NULL,
    phonenumber VARCHAR(128),
    role ENUM('user', 'driver', 'admin') NOT NULL DEFAULT 'user',
    ratings VARCHAR(128)
);

-- Create the Images Table
CREATE TABLE IF NOT EXISTS images (
    id VARCHAR(60) PRIMARY KEY,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL,
    owner_id VARCHAR(60) NOT NULL,
    role ENUM('profile', 'vehicle', 'license', 'user-id') NOT NULL,
    url VARCHAR(128) NOT NULL
);

-- Create the Driver Services Table
CREATE TABLE IF NOT EXISTS driver_services (
    id VARCHAR(60) PRIMARY KEY,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL,
    driver_id VARCHAR(60) NOT NULL,
    service_id VARCHAR(60) NOT NULL
);

-- Create the Services Table
CREATE TABLE IF NOT EXISTS services (
    id VARCHAR(60) PRIMARY KEY,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL,
    name VARCHAR(128) NOT NULL,
    description VARCHAR(128) NOT NULL
);

-- Create the Vehicles Table
CREATE TABLE IF NOT EXISTS vehicles (
    id VARCHAR(60) PRIMARY KEY,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL,
    driver_id VARCHAR(60) NOT NULL,
    make VARCHAR(128) NOT NULL,
    vehicle_type ENUM('A', 'B', 'C') NOT NULL,
    vehicle_registration VARCHAR(128) NOT NULL,
    location VARCHAR(128) NOT NULL
);

-- Create the Trips Table
CREATE TABLE IF NOT EXISTS trips (
    id VARCHAR(60) PRIMARY KEY,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL,
    client_id VARCHAR(60) NOT NULL,
    driver_id VARCHAR(60),
    vehicle_id VARCHAR(60),
    service_id VARCHAR(60) NOT NULL,
    origin VARCHAR(128) NOT NULL,
    destination VARCHAR(128) NOT NULL,
    start_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    end_at DATETIME,
    status ENUM('pending', 'ongoing', 'finished', 'cancelled') NOT NULL DEFAULT 'pending'
);

-- Insert Data into Users Table
INSERT INTO users (id, created_at, updated_at, first_name, last_name, email, password, role, ratings)
VALUES
    ('28f43756-8129-4ebc-bc60-1c55a409ea62', '2023-02-28 09:00:00', '2023-02-28 12:15:00', 'John', 'Doe', 'user1@example.com', 'password1', 'user', '4.5'),
    ('28f43756-8129-4ebc-bc60-1c55a409ea63', '2023-02-28 09:00:00', '2023-02-28 12:15:00', 'Jane', 'Smith', 'user2@example.com', 'password2', 'user', '4.0'),
    ('28f43756-8129-4ebc-bc60-1c55a409ea64', '2023-02-28 09:00:00', '2023-02-28 12:15:00', 'Mary', 'Johnson', 'user5@example.com', 'password5', 'user', '4.3'),
    ('28f43756-8129-4ebc-bc60-1c55a409ea65', '2023-02-28 09:00:00', '2023-02-28 12:15:00', 'David', 'Lee', 'user6@example.com', 'password6', 'user', '4.1');
    -- Add more user data here...

-- Insert Data into Images Table
INSERT INTO images (id, created_at, updated_at, owner_id, role, url)
VALUES
    ('94e1346f-46c4-4bda-91e3-e7f1c6642a7f', '2023-02-28 09:00:00', '2023-02-28 12:15:00', '28f43756-8129-4ebc-bc60-1c55a409ea62', 'profile', 'image_url_1'),
    ('94e1346f-46c4-4bda-91e3-e7f1c6642a80', '2023-02-28 09:00:00', '2023-02-28 12:15:00', '28f43756-8129-4ebc-bc60-1c55a409ea62', 'vehicle', 'image_url_2'),
    ('94e1346f-46c4-4bda-91e3-e7f1c6642a85', '2023-02-28 09:00:00', '2023-02-28 12:15:00', '28f43756-8129-4ebc-bc60-1c55a409ea64', 'vehicle', 'image_url_5'),
    ('94e1346f-46c4-4bda-91e3-e7f1c6642a86', '2023-02-28 09:00:00', '2023-02-28 12:15:00', '28f43756-8129-4ebc-bc60-1c55a409ea65', 'profile', 'image_url_6');
    -- Add more image data here...

-- Insert Data into Driver Services Table
INSERT INTO driver_services (id, created_at, updated_at, driver_id, service_id)
VALUES
    ('d0d86f9d-0d59-4c07-af8a-02c465c3a177', '2023-02-28 09:00:00', '2023-02-28 12:15:00', '28f43756-8129-4ebc-bc60-1c55a409ea62', '36642cb9-792b-45d0-b216-ef147d1570ff'),
    ('d0d86f9d-0d59-4c07-af8a-02c465c3a178', '2023-02-28 09:00:00', '2023-02-28 12:15:00', '28f43756-8129-4ebc-bc60-1c55a409ea64', '36642cb9-792b-45d0-b216-ef147d157102'),
    ('d0d86f9d-0d59-4c07-af8a-02c465c3a179', '2023-02-28 09:00:00', '2023-02-28 12:15:00', '28f43756-8129-4ebc-bc60-1c55a409ea65', '36642cb9-792b-45d0-b216-ef147d157103');
    -- Add more driver service data here...

-- Insert Data into Services Table
INSERT INTO services (id, created_at, updated_at, name, description)
VALUES
    ('36642cb9-792b-45d0-b216-ef147d1570ff', '2023-02-28 09:00:00', '2023-02-28 12:15:00', 'Service 1', 'Description 1'),
    ('36642cb9-792b-45d0-b216-ef147d157105', '2023-02-28 09:00:00', '2023-02-28 12:15:00', 'Service 5', 'Description 5'),
    ('36642cb9-792b-45d0-b216-ef147d157106', '2023-02-28 09:00:00', '2023-02-28 12:15:00', 'Service 6', 'Description 6');
    -- Add more service data here...

-- Insert Data into Vehicles Table
INSERT INTO vehicles (id, created_at, updated_at, driver_id, make, vehicle_type, vehicle_registration, location)
VALUES
    ('f6cb075c-d5a4-44d0-9e78-57a11e3c34b6', '2023-02-28 09:00:00', '2023-02-28 12:15:00', '28f43756-8129-4ebc-bc60-1c55a409ea62', 'Make 1', 'A', 'ABC123', 'Location 1'),
    ('f6cb075c-d5a4-44d0-9e78-57a11e3c34b7', '2023-02-28 09:00:00', '2023-02-28 12:15:00', '28f43756-8129-4ebc-bc60-1c55a409ea64', 'Make 3', 'C', 'DEF456', 'Location 3'),
    ('f6cb075c-d5a4-44d0-9e78-57a11e3c34b8', '2023-02-28 09:00:00', '2023-02-28 12:15:00', '28f43756-8129-4ebc-bc60-1c55a409ea65', 'Make 4', 'B', 'GHI789', 'Location 4');
    -- Add more vehicle data here...

-- Insert Data into Trips Table
INSERT INTO trips (id, created_at, updated_at, client_id, driver_id, vehicle_id, service_id, origin, destination, start_at, end_at, status)
VALUES
    ('a50ea26d-9926-4b6a-8e5a-ea6c9d52b6e7', '2023-02-28 09:00:00', '2023-02-28 12:15:00', '28f43756-8129-4ebc-bc60-1c55a409ea62', '28f43756-8129-4ebc-bc60-1c55a409ea63', 'f6cb075c-d5a4-44d0-9e78-57a11e3c34b6', '36642cb9-792b-45d0-b216-ef147d1570ff', 'Origin 1', 'Destination 1', '2023-02-28 09:00:00', '2023-02-28 12:15:00', 'pending'),
    ('a50ea26d-9926-4b6a-8e5a-ea6c9d52b6ed', '2023-02-28 09:00:00', '2023-02-28 12:15:00', '28f43756-8129-4ebc-bc60-1c55a409ea64', '28f43756-8129-4ebc-bc60-1c55a409ea65', 'f6cb075c-d5a4-44d0-9e78-57a11e3c34b7', '36642cb9-792b-45d0-b216-ef147d157105', 'Origin 4', 'Destination 4', '2023-02-28 09:00:00', '2023-02-28 12:15:00', 'pending'),
    ('a50ea26d-9926-4b6a-8e5a-ea6c9d52b6ee', '2023-02-28 09:00:00', '2023-02-28 12:15:00', '28f43756-8129-4ebc-bc60-1c55a409ea65', NULL, 'f6cb075c-d5a4-44d0-9e78-57a11e3c34b8', '36642cb9-792b-45d0-b216-ef147d157106', 'Origin 5', 'Destination 5', '2023-03-01 08:30:00', '2023-03-01 10:45:00', 'ongoing');
    -- Add more trip data here...
