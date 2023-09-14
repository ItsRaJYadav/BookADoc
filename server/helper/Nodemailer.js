import nodemailer from "nodemailer";
import smtpTransport from "nodemailer-smtp-transport";
import dotenv from 'dotenv';

dotenv.config();


export const transporter = nodemailer.createTransport(
  smtpTransport({
    service: "gmail",
    host: process.env.SMPT_HOST,
    port: parseInt(process.env.SMPT_PORT),
    secure: true,
    auth: {
      user: process.env.SMPT_MAIL,
      pass: process.env.SMPT_PASSWORD,
    },
  })
);





