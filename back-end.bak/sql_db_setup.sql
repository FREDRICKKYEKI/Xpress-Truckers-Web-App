-- Prepares the server for the project
-- create database if not exists

CREATE DATABASE IF NOT EXISTS xt_dev_db;
CREATE USER IF NOT EXISTS 'xt_dev'@'localhost' IDENTIFIED BY 'xt_dev_pwd';
GRANT ALL PRIVILEGES ON xt_dev_db.* TO 'xt_dev'@'localhost';
GRANT SELECT ON performance_schema.* TO 'xt_dev'@'localhost';
