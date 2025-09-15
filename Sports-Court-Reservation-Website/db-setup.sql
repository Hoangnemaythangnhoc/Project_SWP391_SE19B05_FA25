-- Create database and user for local MySQL (no Docker)
CREATE DATABASE IF NOT EXISTS Sport_Field_Booking CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Optional: create a dedicated user (adjust password as needed)
-- CREATE USER IF NOT EXISTS 'sport_user'@'localhost' IDENTIFIED BY 'strong_password_here';
-- GRANT ALL PRIVILEGES ON Sport_Field_Booking.* TO 'sport_user'@'localhost';
-- FLUSH PRIVILEGES;

