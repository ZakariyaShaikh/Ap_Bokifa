import { changePassword, createUser, findUserByEmail, updateOtpVerificationStatus } from "../model/user.model.js";
import { generateTemporaryPassword } from "../utils/crypto.js";
import { sendTemporaryPassword } from "./email.services.js";
import bcrypt from "bcrypt";

export const getUserByEmail = async ({ email }) => {
  const user = await findUserByEmail({ email });

  return user;
};

export const registerUser = async ({ name, email }) => {
  const normalizeEmail = email.trim().toLowerCase();

  const temporaryPassword = generateTemporaryPassword();

  const hashedPassword = await bcrypt.hash(temporaryPassword, 10);

  const user = await createUser({
    name: name.trim(),
    email: normalizeEmail,
    password: hashedPassword,
    role: "customer",
  });

  await sendTemporaryPassword({
    name,
    email: normalizeEmail,
    temporaryPassword,
  });

  return user;
};

export const loginUser = async (password, user) => {

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    throw error;
  }
  return true ;
};

export const verifyOTP = async (email , otp ) => {

  const user = await findUserByEmail({email});

  if(!user) {
    const error = new Error ("User not found");
    error.statusCode = 400 ;
    throw error;
  };
     const currantTime = Date.now()
  if(user.verification_otp_expiration  < currantTime ) {
      const error = new Error("OTP is expired");
      error.statusCode = 400 ;
      throw error;
  };

  if(user.verification_otp !== otp) {
    const error = new Error("OTP is invalid.")
    error.statusCode = 400 ;
    throw error ;
  };

  await updateOtpVerificationStatus(email);

  return true ;
}

export const changeTemporaryPassword = async (email , newPassword) => {

  if(newPassword.length < 8) {
    const error = new Error ("Password must be 8 digits long.");
    error.statusCode = 400 ;
    throw error ;
  }

  if(newPassword.length > 12) {
    const error = new Error ("Password cannot be long more than 12 digits.");
    error.statusCode = 400 ;
    throw error ;
  }

  const password = await bcrypt.hash(newPassword , 10);

  const result = await changePassword(email , password) ;

  return result 

}