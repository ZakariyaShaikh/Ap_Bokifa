import { saveVerificationOtp } from "../model/user.model.js";
import { sendVerificationOtpEmail } from "../services/email.services.js";
import { changeTemporaryPassword, getUserByEmail, loginUser, registerUser, verifyOTP } from "../services/user.services.js";
import { generateOtp } from "../utils/crypto.js";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt.js";
import getOtpExpiration from "../utils/otpExpiretion.js";


export const register = async (req, res) => {
    try {
        const {name , email} = req.body;

        if(!name || !email) {
            return res.status(400).json({
                success : false , 
                message : "Name and Email both are mandatory fields."
            })
        }
        const isUserExists = await getUserByEmail({email})

        if(isUserExists) {
            return res.status(409).json({
                success : false , 
                message : "User already exists."
            })
        }

        await registerUser({name , email});

        res.status(201).json({
            success : true ,
            message : "A temporary password is sent on user email"
        })
    } catch (error) {
        console.log(`Error in register user : ${error.message}`)
        return res.status(500).json({
            success : false, 
            message : `Error : ${error.message}`
        })
    }
};

export const login = async (req, res) => {
    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email & Password both are mandatory."
            });
        }

        const user = await getUserByEmail({ email });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password."
            });
        }


        await loginUser(password, user);


        if (!user.is_verified) {

            const otp = generateOtp();
            const expiresAt = getOtpExpiration();

            await saveVerificationOtp({
                userId: user.id,
                otp,
                expiresAt
            });

            await sendVerificationOtpEmail({
                email: user.email,
                name: user.name,
                otp
            });

            return res.status(200).json({
                success: true,
                requiresVerification: true,
                message:
                    "Your account is not verified. An OTP has been sent to your email."
            });
        }


        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);


        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.status(200).json({
            success: true,
            message: "User logged in successfully.",
            user: {
                id: user.id,
                email: user.email,
                profile_image: user.profile_image,
                role: user.role
            },
            accessToken
        });

    } catch (error) {

        console.log("Login error:", error);

        return res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || "Internal server error."
        });
    }
};

export const verify =  async (req , res) => {
    try {
        const {email , otp } = req.body ;

        await verifyOTP(email , otp) ;

        res.status(200).json({
            success : true ,
            message : "OTP is verified"
        })
    } catch (error) {
        console.log("OTP verification error :" , error.message)
        res.status(error.statusCode || 500 ).json({
            success : false ,
            message : error.message || "Internal server error"
        })
    }
}

export const changeTemPassword = async (req , res) => {
    try {
        const {email ,newPassword} = req.body;
        await changeTemporaryPassword(email , newPassword);

         return res.status(200).json({
            success : true ,
            message : "Temporary password changed successfully. Now you can login with your own password."
        })
    } catch (error) {
        console.log("Temporary password change error :" , error.message);
        return res.status(error.statusCode || 500).json({
            success : false , 
            message : error.message || "Internal server error."
        });
    };
};