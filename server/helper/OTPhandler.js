
import OTP from '../models/OTPModel.js';
import { transporter } from './Nodemailer.js';
import dotenv from 'dotenv';
dotenv.config();

export const generateOTP = async (email) => {
  // console.log(email);
  try {
    const otpCode = Math.floor(100000 + Math.random() * 900000);
    const otpData = new OTP({
      email,
      code: otpCode,
      expiredIn: new Date().getTime() + 300 * 1000,
    });
    // console.log(otpData);
    await otpData.save();

    return otpCode;
  } catch (error) {
    throw new Error("Failed to generate OTP");
  }
};

export const generateOTPforPassword = async (email, role) => {
  console.log(email,role);
  try {
    const otpCode = Math.floor(100000 + Math.random() * 900000);
    const otpData = new OTP({
      email,
      role,
      code: otpCode,
      expiredIn: new Date().getTime() + 300 * 1000,
    });
    // console.log(otpData);
    await otpData.save();

    return otpCode;
  } catch (error) {
    throw new Error("Failed to generate OTP");
  }
};

export const sendOTPByEmail = async (email, otpCode) => {
  console.log(email, otpCode);
  console.log(process.env.SMPT_MAIL);

  try {
    const mailOptions = {
      from: process.env.SMPT_MAIL,
      to: email,
      subject: "Login OTP",
      html: `
        <div style="font-family: Arial, sans-serif; text-align: center;">
          <h3>Your OTP for login: ${otpCode}</h3>
          <p>This OTP will expire in 5 minutes.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw new Error("Failed to send OTP email");
  }
};


export const ApproveByAdminTeam = async (doctorName, email) => {
  console.log(email);
  // console.log(process.env.SMPT_MAIL);
  console.log(email);
  console.log(doctorName);

  try {
    const mailOptions = {
      from: process.env.SMPT_MAIL,
      to: email,
      subject: "Account Approve by Admin",
      html: `
          <div style="font-family: Arial, sans-serif; text-align: center;">
          <div style="background-color: #ffffff; border-radius: 10px; box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2); padding: 20px;">
            <h2>Account Approved</h2>
            <p>Dear ${doctorName},</p>
            <p>Your account has been approved by the admin team. You now have access to all platform features.</p>
            <p>Thank you for joining our community!</p>
          </div>
        </div>
        
    `,
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    throw new Error("Failed to send OTP email");

  }
};


export const registrationEmail = async (username, email, verificationToken, baseUrl) => {
  try {
    const mailOptions = {
      from: process.env.SMPT_MAIL,
      to: email,
      subject: 'Email Verification',
      html: `
        <div style="background-color: #f7f7f7; padding: 20px; border-radius: 5px; font-family: Arial, sans-serif; color: #333; font-size: 16px;">
          <h2 style="color: #4caf50;">Welcome to Our Website</h2>
          <p>Dear ${username},</p>
          <p>Thank you for registering with us. Please verify your email address to complete your registration:</p>
          <div style="text-align: center; margin-top: 30px;">
            <a href="${baseUrl}/verify-email/${verificationToken}" style="background-color: #4caf50; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block; cursor: pointer;">Verify Email</a>
          </div>
          <p>If the button above does not work, you can also copy and paste the following URL into your web browser:</p>
          <p style="font-size: 14px; color: #555; padding: 10px 0;">${baseUrl}/verify-email/${verificationToken}</p>
          <p style="font-size: 14px; color: #555;">Thank you for choosing our platform. We look forward to serving you!</p>
        </div>
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    return true;
  } catch (error) {
    console.error('Error sending registration email:', error);
    return false;
  }
};


export const sendtApprovalEmail = async (email, doctorName, appointmentDetails) => {
  // console.log(email, doctorName, appointmentDetails);
  // console.log(process.env.SMPT_MAIL);

  try {
    const mailOptions = {
      from: process.env.SMPT_MAIL,
      to: email,
      subject: "Appointment Approval",
      html: `
        <div style="font-family: Arial, sans-serif; text-align: center;">
          <h3>Appointment Approved</h3>
          <p>Your appointment with Dr. ${doctorName} has been approved.</p>
          <p>Appointment Details:</p>
          <ul>
            <li>Date: ${appointmentDetails.date}</li>
            <li>Time: ${appointmentDetails.time}</li>
            
          </ul>
          <h3>Thanks</h3>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to send appointment approval email");
  }
};


export const sendAppointEmail = async (DoctorEmail, patientName, doctorName, date, time) => {
  // console.log(process.env.SMPT_MAIL);

  try {
    const mailOptions = {
      from: process.env.SMPT_MAIL,
      to: DoctorEmail,
      subject: "Appointment Approval",
      html: `
      <div style="font-family: Arial, sans-serif; text-align: center;">
        <h3>Appointment Created </h3>
        <p>Hey ${doctorName} You got a new Appointment by ${patientName}</p>
        <p>Appointment Details:</p>
        <ul>
          <li>Date: ${date}</li>
          <li>Time: ${time}</li>
            
          </ul>
        <h3>Thanks</h3>
      </div>
    `,
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to send appointment approval email");
  }
};