import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.APP_EMAIL,
        pass: process.env.APP_PASSWORD,
    },
})

export const sendMail = async (to: string, subject: string, html: string) => {
    const mailOptions = {
        from: `"DriveFlowBD" <${process.env.APP_EMAIL}>`,
        to,
        subject,
        html,
    };

    await transporter.sendMail(mailOptions);
};

export default sendMail;