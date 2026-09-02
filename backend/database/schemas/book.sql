USE ap_bokifa;

CREATE TABLE books (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    author_id INT NOT NULL,
    description TEXT NOT NULL,
    publication_date DATE NOT NULL,
    cover_image VARCHAR(500),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_books_author
        FOREIGN KEY (author_id)
        REFERENCES authors(id)
);