import { createTransport } from "nodemailer";
import dotenv from 'dotenv';
dotenv.config();

const transporter = createTransport({
    service: 'gmail',
    host:'smtp.gmail.com',
    port:587,
    secure:false,
    auth: {
        user: process.env.MAILER_EMAIL, 
        pass: process.env.MAILER_PASSWORD,
    },
});

export const sendMail = async (email,message,subject) => {
    try {
        const mailOptions = ({
            from: `"SEMI-Blogs 👻" <${process.env.MAILER_EMAIL}>`,
            to: email,
            subject: subject,
            html: message
        });
        await transporter.sendMail(mailOptions);
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
};
