import transporter from "../config/nodemailer.js";

export const sendTemporaryPassword = async ({
  name,
  email,
  temporaryPassword,
}) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your AP Bokifa temporary password",
    text: `Hello ${name},

    Your AP Bokifa account has been created.

    Your temporary password is:

    ${temporaryPassword}

    Please use this temporary password to log in.

    After verification, you will be required to change your password.

    Regards,
    AP Bokifa Team`,
  });
};

export const sendVerificationOtpEmail = async ({ email, name, otp }) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "AP Bokifa verification OTP",
    text: `Hello ${name},

    Your AP Bokifa verification OTP is:

    ${otp}

    This OTP is valid for 10 minutes.

    If you did not request this verification, please ignore this email.

    Regards,
    AP Bokifa Team`,
  });
};
