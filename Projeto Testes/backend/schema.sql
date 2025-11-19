CREATE DATABASE IF NOT EXISTS plataforma_troca_materiais;
USE plataforma_troca_materiais;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    points INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS materials (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    file_path VARCHAR(255) NOT NULL,
    author_id INT,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
     FOREIGN KEY (author_id) REFERENCES users(id)
);

-- dummy data
INSERT INTO users (name, email, password) VALUES
('Alice Silva', 'alice@example.com', 'senha123'),
('Bruno Souza', 'bruno@example.com', 'senha456');