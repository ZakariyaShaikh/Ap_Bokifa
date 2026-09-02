USE ap_bokifa;

DROP PROCEDURE IF EXISTS sp_save_verification_otp;

DELIMITER $$

CREATE PROCEDURE sp_save_verification_otp(
    IN p_user_id INT,
    IN p_otp VARCHAR(10),
    IN p_expires_at DATETIME
)
BEGIN

    UPDATE users
    SET
        verification_otp = p_otp,
        verification_otp_expires_at = p_expires_at
    WHERE id = p_user_id;

END $$

DELIMITER ;