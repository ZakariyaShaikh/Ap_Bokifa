USE ap_bokifa;

CREATE TABLE blogs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    created_by INT NOT NULL,
    status ENUM('draft', 'published') NOT NULL DEFAULT 'draft',
    featured_image VARCHAR(500),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    published_at TIMESTAMP NULL,

    CONSTRAINT fk_blogs_created_by
        FOREIGN KEY (created_by)
        REFERENCES users(id)
);