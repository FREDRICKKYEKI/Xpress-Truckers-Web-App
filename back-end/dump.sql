-- Prepares the server for the project
-- create database if not exists

DROP DATABASE IF EXISTS xt_dev_db;

CREATE DATABASE IF NOT EXISTS xt_dev_db;
CREATE USER IF NOT EXISTS 'xt_dev'@'localhost' IDENTIFIED BY 'xt_dev_pwd';
GRANT ALL PRIVILEGES ON xt_dev_db.* TO 'xt_dev'@'localhost';
GRANT SELECT ON performance_schema.* TO 'xt_dev'@'localhost';

USE xt_dev_db;

-- Create 'users' table
CREATE TABLE users (
    id CHAR(36) NOT NULL,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL,
    first_name VARCHAR(128),
    last_name VARCHAR(128),
    email VARCHAR(128) NOT NULL,
    password CHAR(32) NOT NULL,
    phonenumber VARCHAR(128) NOT NULL,
    role ENUM('user', 'driver', 'admin') NOT NULL DEFAULT 'user',
    ratings VARCHAR(128),
    PRIMARY KEY (id)
);

-- Create 'services' table
CREATE TABLE services (
    id CHAR(36) NOT NULL,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL,
    name VARCHAR(128) NOT NULL,
    type ENUM('A', 'B', 'C', 'D') NOT NULL,
    description VARCHAR(128) NOT NULL,
    PRIMARY KEY (id)
);

-- Create 'vehicles' table
CREATE TABLE vehicles (
    id CHAR(36) NOT NULL,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL,
    driver_id CHAR(36) NOT NULL,
    make VARCHAR(128) NOT NULL,
    vehicle_type ENUM('A', 'B', 'C') NOT NULL,
    vehicle_registration VARCHAR(128) NOT NULL,
    longitude VARCHAR(128) NOT NULL,
    latitude VARCHAR(128) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (driver_id) REFERENCES users (id)
);

-- Create 'driver_services' table
CREATE TABLE driver_services (
    id CHAR(36) NOT NULL,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL,
    driver_id CHAR(36) NOT NULL,
    service_id CHAR(36) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (driver_id) REFERENCES users (id),
    FOREIGN KEY (service_id) REFERENCES services (id)
);

-- Create 'images' table
CREATE TABLE images (
    id CHAR(36) NOT NULL,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL,
    owner_id CHAR(36) NOT NULL,
    role ENUM('profile', 'vehicle', 'license', 'user-id') NOT NULL,
    url VARCHAR(128) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (owner_id) REFERENCES users (id)
);


-- Create 'trips' table
CREATE TABLE trips (
    id CHAR(36) NOT NULL,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL,
    client_id CHAR(36) NOT NULL,
    driver_id CHAR(36),
    vehicle_id CHAR(36),
    service_id CHAR(36) NOT NULL,
    origin VARCHAR(128) NOT NULL,
    destination VARCHAR(128) NOT NULL,
    start_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    end_at DATETIME,
    status ENUM('pending', 'ongoing', 'finished', 'cancelled') NOT NULL DEFAULT 'pending',
    PRIMARY KEY (id),
    FOREIGN KEY (client_id) REFERENCES users (id),
    FOREIGN KEY (driver_id) REFERENCES users (id),
    FOREIGN KEY (vehicle_id) REFERENCES vehicles (id),
    FOREIGN KEY (service_id) REFERENCES services (id)
);


-- Insert sample data into the 'users' table
INSERT INTO users (id, created_at, updated_at, first_name, last_name, email, password, phonenumber, role, ratings)
VALUES
    ('f47ac10b-58cc-4372-a567-0e02b2c3d479', '2023-02-28 09:00:00', '2023-02-28 12:15:00', 'John', 'Doe', 'johndoe@example.com', '7c6a180b36896a0a8c02787eeafb0e4c', '+123456789', 'user', '4.8'),
    ('4b48aca8-887f-4cf1-9a1e-0db71194dd73', '2023-02-28 09:00:00', '2023-02-28 12:15:00', 'Alice', 'Smith', 'alicesmith@example.com', '6cb75f652a9b52798eb6cf2201057c73', '+987654321', 'driver', '4.5'),
    ('50254c03-e92c-49f7-9819-4a5d2b455d09', '2023-02-28 09:00:00', '2023-02-28 12:15:00', 'Eve', 'Johnson', 'evejohnson@example.com', '819b0643d6b89dc9b579fdfc9094f28e', '+111222333', 'user', '4.2'),
    ('98cb9d33-1262-4c69-883a-86aa2d613640', '2023-02-28 09:00:00', '2023-02-28 12:15:00', 'Bob', 'Brown', 'bobbrown@example.com', '34cc93ece0ba9e3f6f235d4af979b16c', '+444555666', 'admin', NULL),
    ('122f8541-5223-4d4a-853d-722d7f69e1f4', '2023-02-28 09:00:00', '2023-02-28 12:15:00', 'Chris', 'Wilson', 'chriswilson@example.com', 'db0edd04aaac4506f7edab03ac855d56', '+777888999', 'user', '4.9');

-- Insert sample data into the 'services' table
INSERT INTO services (id, created_at, updated_at, name, type, description)
VALUES
    ('8335a810-eb0f-11ec-9f6e-354f428589c2', '2023-02-28 09:00:00', '2023-02-28 12:15:00', 'Service 1', 'A', 'Description of Service 1'),
    ('8cb380c6-eb0f-11ec-95e1-5e4c04f24894', '2023-02-28 09:00:00', '2023-02-28 12:15:00', 'Service 2', 'B', 'Description of Service 2'),
    ('9025077e-eb0f-11ec-8a44-851f2e4f31eb', '2023-02-28 09:00:00', '2023-02-28 12:15:00', 'Service 3', 'C', 'Description of Service 3'),
    ('9455f0ea-eb0f-11ec-82dd-45339f5be2c7', '2023-02-28 09:00:00', '2023-02-28 12:15:00', 'Service 4', 'D', 'Description of Service 4'),
    ('98ca8d54-eb0f-11ec-9f18-b55639f31ef5', '2023-02-28 09:00:00', '2023-02-28 12:15:00', 'Service 5', 'A', 'Description of Service 5');


-- Insert sample data into the 'vehicles' table
INSERT INTO vehicles (id, created_at, updated_at, driver_id, make, vehicle_type, vehicle_registration, longitude, latitude)
VALUES
    ('b27cc1ca-eb0f-11ec-bdca-8d8b10028f28', '2023-02-28 09:00:00', '2023-02-28 12:15:00', 'f47ac10b-58cc-4372-a567-0e02b2c3d479', 'Make 1', 'A', 'Vehicle Registration 1', '0.0', '0.0'),
    ('b6e17b88-eb0f-11ec-9e2c-952f12f918f8', '2023-02-28 09:00:00', '2023-02-28 12:15:00', '4b48aca8-887f-4cf1-9a1e-0db71194dd73', 'Make 2', 'B', 'Vehicle Registration 2', '1.0', '1.0'),
    ('bb1de10c-eb0f-11ec-9c47-099ac034f034', '2023-02-28 09:00:00', '2023-02-28 12:15:00', '50254c03-e92c-49f7-9819-4a5d2b455d09', 'Make 3', 'C', 'Vehicle Registration 3', '2.0', '2.0'),
    ('bf6d0f14-eb0f-11ec-a7ed-91cc04c97ff7', '2023-02-28 09:00:00', '2023-02-28 12:15:00', '98cb9d33-1262-4c69-883a-86aa2d613640', 'Make 4', 'A', 'Vehicle Registration 4', '3.0', '3.0'),
    ('c3c0b92c-eb0f-11ec-b11f-25d74e481978', '2023-02-28 09:00:00', '2023-02-28 12:15:00', '122f8541-5223-4d4a-853d-722d7f69e1f4', 'Make 5', 'B', 'Vehicle Registration 5', '4.0', '4.0');


-- Insert sample data into the 'driver_services' table
INSERT INTO driver_services (id, created_at, updated_at, driver_id, service_id)
VALUES
    ('90a9c6d7-6ab6-4b90-83db-47772c607179', '2023-02-28 09:00:00', '2023-02-28 12:15:00', 'f47ac10b-58cc-4372-a567-0e02b2c3d479', '8335a810-eb0f-11ec-9f6e-354f428589c2'),
    ('3b96b12f-e1df-40a6-8d3e-6e1326e48d5d', '2023-02-28 09:00:00', '2023-02-28 12:15:00', '4b48aca8-887f-4cf1-9a1e-0db71194dd73', '8cb380c6-eb0f-11ec-95e1-5e4c04f24894'),
    ('0bb049fc-ee01-4a6c-8a27-83eab0f6f90c', '2023-02-28 09:00:00', '2023-02-28 12:15:00', '50254c03-e92c-49f7-9819-4a5d2b455d09', '9025077e-eb0f-11ec-8a44-851f2e4f31eb'),
    ('11d458c5-c663-49ed-8c77-10f4e7b1ac26', '2023-02-28 09:00:00', '2023-02-28 12:15:00', '98cb9d33-1262-4c69-883a-86aa2d613640', '9455f0ea-eb0f-11ec-82dd-45339f5be2c7'),
    ('a08ce2c3-e411-41b5-9ae1-dc200e14d2a5', '2023-02-28 09:00:00', '2023-02-28 12:15:00', '122f8541-5223-4d4a-853d-722d7f69e1f4', '98ca8d54-eb0f-11ec-9f18-b55639f31ef5');

-- Insert sample data into the 'images' table
INSERT INTO images (id, created_at, updated_at, owner_id, role, url)
VALUES
    ('ebbf6e04-3e80-4e9d-8e7a-83fc12505da7', '2023-02-28 09:00:00', '2023-02-28 12:15:00', 'f47ac10b-58cc-4372-a567-0e02b2c3d479', 'profile', 'profile_image_url1'),
    ('4d0c0da3-731a-49e1-a9a5-e06e966439f7', '2023-02-28 09:00:00', '2023-02-28 12:15:00', '4b48aca8-887f-4cf1-9a1e-0db71194dd73', 'vehicle', 'vehicle_image_url2'),
    ('d85eb4d5-9646-441b-8bb0-fc7c65f1d512', '2023-02-28 09:00:00', '2023-02-28 12:15:00', '4b48aca8-887f-4cf1-9a1e-0db71194dd73', 'license', 'license_image_url3'),
    ('f8ec482a-3c7b-4ccf-8c87-b078e3625ae6', '2023-02-28 09:00:00', '2023-02-28 12:15:00', '4b48aca8-887f-4cf1-9a1e-0db71194dd73', 'user-id', 'user_id_image_url4'),
    ('993f37d2-e888-4ea7-88e0-d3b6f61b8f8a', '2023-02-28 09:00:00', '2023-02-28 12:15:00', '4b48aca8-887f-4cf1-9a1e-0db71194dd73', 'profile', 'profile_image_url5');

-- Insert sample data into the 'trips' table
INSERT INTO trips (id, created_at, updated_at, client_id, driver_id, vehicle_id, service_id, origin, destination, start_at, end_at, status)
VALUES
    ('9d18f4a8-eb0f-11ec-82b0-6532c072d76f', '2023-02-28 09:00:00', '2023-02-28 12:15:00', 'f47ac10b-58cc-4372-a567-0e02b2c3d479', '4b48aca8-887f-4cf1-9a1e-0db71194dd73', 'b6e17b88-eb0f-11ec-9e2c-952f12f918f8', '8335a810-eb0f-11ec-9f6e-354f428589c2', 'Origin 1', 'Destination 1', '2023-10-27 10:00:00', '2023-10-27 12:00:00', 'finished'),
    ('a1404606-eb0f-11ec-8b67-75a3c6f68c61', '2023-02-28 09:00:00', '2023-02-28 12:15:00', '50254c03-e92c-49f7-9819-4a5d2b455d09', '4b48aca8-887f-4cf1-9a1e-0db71194dd73', 'b6e17b88-eb0f-11ec-9e2c-952f12f918f8', '8cb380c6-eb0f-11ec-95e1-5e4c04f24894', 'Origin 2', 'Destination 2', '2023-10-27 11:00:00', '2023-10-27 13:00:00', 'ongoing'),
    ('a4ddc00e-eb0f-11ec-a0dd-b948a775421e', '2023-02-28 09:00:00', '2023-02-28 12:15:00', '50254c03-e92c-49f7-9819-4a5d2b455d09', '4b48aca8-887f-4cf1-9a1e-0db71194dd73', 'b6e17b88-eb0f-11ec-9e2c-952f12f918f8', '9025077e-eb0f-11ec-8a44-851f2e4f31eb', 'Origin 3', 'Destination 3', '2023-10-27 12:00:00', NULL, 'pending'),
    ('a9f389ac-eb0f-11ec-aecc-29f2c2c0de18', '2023-02-28 09:00:00', '2023-02-28 12:15:00', 'f47ac10b-58cc-4372-a567-0e02b2c3d479', '4b48aca8-887f-4cf1-9a1e-0db71194dd73', 'b6e17b88-eb0f-11ec-9e2c-952f12f918f8', '9455f0ea-eb0f-11ec-82dd-45339f5be2c7', 'Origin 4', 'Destination 4', '2023-10-27 13:00:00', NULL, 'pending'),
    ('ae3cf7ec-eb0f-11ec-8d3f-ebf200254452', '2023-02-28 09:00:00', '2023-02-28 12:15:00', 'f47ac10b-58cc-4372-a567-0e02b2c3d479', '4b48aca8-887f-4cf1-9a1e-0db71194dd73', 'b6e17b88-eb0f-11ec-9e2c-952f12f918f8', '98ca8d54-eb0f-11ec-9f18-b55639f31ef5', 'Origin 5', 'Destination 5', '2023-10-27 14:00:00', NULL, 'pending');

