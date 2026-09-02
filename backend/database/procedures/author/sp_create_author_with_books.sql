USE ap_bokifa;

DROP PROCEDURE IF EXISTS sp_create_author_with_books;

DELIMITER $$

CREATE PROCEDURE sp_create_author_with_books(
    IN p_name VARCHAR(255),
    IN p_bio TEXT,
    IN p_email VARCHAR(255),
    IN p_image VARCHAR(255) ,
    IN p_books JSON
)
BEGIN

    DECLARE v_author_id INT;

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

    START TRANSACTION;

    INSERT INTO authors (
        name,
        bio,
        email , 
        profile_image
    )
    VALUES (
        p_name,
        p_bio,
        p_email,
        p_image
    );

    SET v_author_id = LAST_INSERT_ID();

    INSERT INTO books (
        title,
        price,
        author_id,
        description,
        publication_date,
        cover_image
    )
    SELECT
        book_data.title,
        book_data.price,
        v_author_id,
        book_data.description,
        book_data.publication_date,
        book_data.cover_image
    FROM JSON_TABLE(
        p_books,
        '$[*]' COLUMNS (
            title VARCHAR(255) PATH '$.title',
            price DECIMAL(10,2) PATH '$.price',
            description TEXT PATH '$.description',
            publication_date DATE PATH '$.publication_date',
            cover_image VARCHAR(500) PATH '$.cover_image'
        )
    ) AS book_data;

    COMMIT;

END $$

DELIMITER ;