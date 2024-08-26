import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "labxplorerx@gmail.com",
    pass: process.env.MAIL_PASSWORD,
  },
});

export const sendVerificationEmail = async (userEmail, token) => {
  const url = `http://localhost:3000/api/user/verify?token=${token}`;
  const mailOptions = {
    from: "labxplorerx@gmail.com",
    to: userEmail,
    subject: "LabXplorerX:Email Verification",
    text: `
            Click ${url} here to verify your email address.
            Thank You
            LabXplorerX Team
        `,
  };

  await transporter.sendMail(mailOptions);
};
