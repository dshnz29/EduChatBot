CREATE DATABASE IF NOT EXISTS edugenie;

USE edugenie;

CREATE TABLE careers (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100),
    field VARCHAR(100),
    description TEXT
);

INSERT INTO careers (name, field, description) VALUES
('Software Developer', 'IT', 'Builds and maintains software applications.'),
('Data Analyst', 'Business', 'Analyzes data to help decision making.'),
('Mechanical Engineer', 'Engineering', 'Designs and builds machines.');
