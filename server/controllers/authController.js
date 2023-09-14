import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
import Doctor from "../models/DoctorModel.js";
import Contact from "../models/ContactForm.js";
import { Op } from "sequelize";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { generateOTP, sendOTPByEmail, registrationEmail, generateOTPforPassword } from '../helper/OTPhandler.js';
import OTP from "../models/OTPModel.js";



export const RegisterUserController = async (req, res) => {
  console.log(req.body);
  try {
    const { username, email, password, name } = req.body;

    const existingUser = await User.findOne({
      where: {
        [Op.or]: [{ email }, { username }],
      },
    });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = uuidv4();

    // Send the registration email for verification
    const emailSent = await registrationEmail(name, email, verificationToken, process.env.BASE_URL);

    if (!emailSent) {
      return res.status(500).json({ message: "Failed to send verification email" });
    }

    // Create a new user
    const newUser = await User.create({
      username,
      name,
      email,
      password: hashedPassword,
      verificationToken,
    });

    return res.status(200).json({
      success: true,
      message: "Registration successful. Check your email for verification.",
    });
  } catch (error) {
    console.error("Error registering user: ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};




export const loginController = async (req, res) => {
  const { usernameOrEmail, password, role } = req.body;

  console.log(req.body);
  try {
    let user;

    if (role === 'user') {
      user = await User.findOne({
        where: {
          [Op.or]: [
            { username: usernameOrEmail },
            { email: usernameOrEmail },
          ],
        },
      });
    } else if (role === 'doctor') {
      user = await Doctor.findOne({
        where: {
          [Op.or]: [
            { username: usernameOrEmail },
            { email: usernameOrEmail },
          ],
        },
      });
    } else {
      return res.status(401).json({ message: "Invalid role" });
    }

    if (!user) {
      return res.status(401).json({ message: "Invalid username or email or password" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid username or email or password" });
    }

    // Generate OTP
    const otpCode = await generateOTP(user.email);

    // Sending OTP to the user's email
    await sendOTPByEmail(user.email, otpCode);

    return res.status(200).json({ success: true, message: "OTP sent to your email" });

  } catch (error) {
    console.error("Error during login: ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};



export const OTPLoginController = async (req, res) => {
  const { emailOrUsername, otpCode, role } = req.body;

  try {
    let user;
    if (role === 'user') {
      user = await User.findOne({
        where: {
          [Op.or]: [{ email: emailOrUsername }, { username: emailOrUsername }],
        },
      });
    } else if (role === 'doctor') {
      user = await Doctor.findOne({
        where: {
          [Op.or]: [{ email: emailOrUsername }, { username: emailOrUsername }],
        },
      });
    } else {
      return res.status(401).json({ success: false, message: 'Invalid role' });
    }

    if (!user) {
      return res.status(401).json({ success: false, message: 'User not found' });
    }

    const validOtpData = await OTP.findOne({
      where: {
        email: user.email,
        code: otpCode,
        expiredIn: { [Op.gte]: new Date() },
      },
    });

    if (!validOtpData) {
      return res.status(401).json({ success: false, message: 'Invalid or expired OTP code' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    await validOtpData.destroy();

    return res.status(200).json({
      success: true,
      message: 'Email verified and logged in successfully',
      user,
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};


export const verifyUserController = async (req, res) => {
  const token = req.params.token;
  // console.log('Verifying user token`', token);

  try {
    const user = await User.findOne({
      where: {
        [Op.or]: [{ verificationToken: token }],
      },
    });

    if (user) {
      user.isVerified = true;
      user.verificationToken = null;
      await user.save();
      res.status(200).json({ success: true, message: 'Email verified successfully' });
    } else {
      res.status(404).json({ success: false, message: 'Invalid verification token' });
    }
  } catch (error) {
    console.error('Error verifying email:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};


export const contactFormController = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const contactForm = await Contact.create({
      name,
      email,
      message,
    });

    res.status(200).json({ message: 'Form submitted successfully' });
  } catch (error) {
    console.error('Error submitting form:', error);
    res.status(500).json({ error: 'Error submitting form' });
  }
};



export const deleteUserController = async (req, res) => {
  try {
    const userId = req.params.userId;
    const deletedUser = await User.destroy({
      where: { id: userId },
    });

    if (deletedUser === 1) {
      res.status(200).json({ message: "User deleted successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Failed to delete user" });
  }
};

export const allUsersController = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
};


export const ForgotPassword = async (req, res) => {
  const { email, role } = req.body;

  try {
    let user;

    if (role === 'user') {
      user = await User.findOne({
        where: {
          email: email,
        },
      });
    } else if (role === 'doctor') {
      user = await Doctor.findOne({
        where: {
          email: email,
        },
      });
    }

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const otpCode = await generateOTPforPassword(email, role);
    await sendOTPByEmail(email, otpCode);

    res.status(200).json({ message: 'OTP sent to the email.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error.' });
  }
};


export const updatePassword = async (req, res) => {
  const { email, otpCode, password, role } = req.body;

  try {
    // Find the OTP record
    const otpRecord = await OTP.findOne({
      where: {
        email: email,
        code: otpCode,
        role: role,
      },
    });

    if (!otpRecord) {
      return res.status(404).json({ message: 'Invalid OTP or user not found.' });
    }

    // Check if the OTP has expired (assuming you have an 'expiresAt' field in your OTP model)
    const currentTime = new Date();
    if (otpRecord.expiresAt < currentTime) {
      return res.status(400).json({ message: 'OTP has expired.' });
    }

    // Find the user based on role
    let user;
    if (role === 'user') {
      user = await User.findOne({
        where: {
          email: email,
        },
      });
    } else if (role === 'doctor') {
      user = await Doctor.findOne({
        where: {
          email: email,
        },
      });
    }

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.otp = null;
    await user.save();

    
    await otpRecord.destroy();

    res.status(200).json({ message: 'Password updated successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};