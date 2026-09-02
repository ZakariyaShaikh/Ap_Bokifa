import db from "../config/db.js"


export const findUserByEmail = async ({email}) => {
    const [rows] = await db.query(
        `CALL sp_find_user_by_email(?)`,
        [email]
    );
    return rows[0][0];
}

export const createUser = async ({name , email , password , role = "customer"}) => {
    const [rows] = await db.query(
        `CALL sp_create_user(? , ? , ? , ?)`,
        [name , email  , password , role]
    ) ;
    return rows[0][0]
};

export const saveVerificationOtp = async ({userId , otp , expiresAt}) => {
    const [rows] = await db.query(
        `CALL sp_save_verification_otp(? , ? , ?)`,
        [userId , otp , expiresAt]
    );
    return rows[0][0];
}

export const updateOtpVerificationStatus = async (email) => {
    await db.query(
        `CALL sp_update_otp_verification_status(?)` , 
        [email]
    );
};

export const changePassword = async (email , password) => {
    const [rows] = await db.query(
        `CALL sp_change_password(? , ?)` ,
        [email , password]
    );
    return rows[0][0];
}