import Doctor from '../models/DoctorModel.js';
import Review from '../models/Review.js';
import Appointment from '../models/Appointment.js';
import { Op } from "sequelize";
import { ApproveByAdminTeam, verifyEmailForDoctor } from '../helper/OTPhandler.js';
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";
import { getDataUri } from "../helper/dataUri.js";

import { cloudinary } from '../helper/Cloudinary.js';

export const doctorRegistration = async (req, res) => {
  // console.log(req.body);
  try {

    const {
      username,
      Name,
      password,
      phone,
      email,
      website,
      address,
      specialization,
      experience,
      feesPerConsultation,
      timings,
      gender,
      qualifications,
      registrationNumber,
      hospitalAffiliation,
      languagesSpoken,
      about
    } = req.body;

    
    const existingUser = await Doctor.findOne({
      where: {
        [Op.or]: [{ email }, { username }],
      },
    });

    if (existingUser) {
      return res.status(409).json({ message: "Doctor already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = uuidv4();
    //mail to the doctor email address
    const emailSent = await verifyEmailForDoctor(Name, email, verificationToken, process.env.BASE_URL);
    if (!emailSent) {
      return res.status(500).json({ message: "Failed to send verification email" });
    }
    // Create a new doctor 
    const doctor = await Doctor.create({
      username,
      Name,
      password: hashedPassword,
      phone,
      email,
      website,
      address,
      specialization,
      experience,
      feesPerConsultation,
      timings,
      gender,
      qualifications,
      registrationNumber,
      hospitalAffiliation,
      languagesSpoken,
      about,
      verificationToken
    });


    return res.status(201).json({
      success: true,
      message: "Hey Doctor your registration successful. Check your email.",
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while registering the doctor.' });
  }
};



export const getAllVerifiedDoctors = async (req, res) => {
  try {
    const verifiedDoctors = await Doctor.findAll({
      where: {
        isVerifiedByAdmin: true,
      },
    });

    if (!verifiedDoctors || verifiedDoctors.length === 0) {
      return res.status(404).json({ message: 'No verified doctors found.' });
    }

    return res.status(200).json({
      success: true,
      message: 'Verified doctors found.',
      doctors: verifiedDoctors,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'An error occurred while fetching verified doctors.' });
  }
};

export const getAllVideoConsultant = async (req, res) => {
  try {
    const verifiedDoctors = await Doctor.findAll({
      where: {
        isVerifiedByAdmin: true,
        isVideoConsultant: true
      },
    });

    if (!verifiedDoctors || verifiedDoctors.length === 0) {
      return res.status(404).json({ message: 'No verified VideoConsultant found.' });
    }

    return res.status(200).json({
      success: true,
      message: 'Verified VideoConsultant found.',
      doctors: verifiedDoctors,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'An error occurred while fetching verified doctors.' });
  }
};





export const getDoctorById = async (req, res) => {
  const { doctorId } = req.params;

  try {
    const doctor = await Doctor.findByPk(doctorId);

    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found.' });
    }

    return res.status(200).json({
      success: true,
      message: 'Doctor found.',
      doctor,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'An error occurred while fetching the doctor.' });
  }
};


export const getAllDoctors = async (req, res) => {
  try {
    const Doctors = await Doctor.findAll();

    // Return the list of all doctors
    return res.status(200).json({
      success: true,
      message: 'Doctors found.',
      Doctors,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'An error occurred while fetching  doctors.' });
  }
};




export const ApproveDoctorsProfile = async (req, res) => {
  try {
    const doctorId = req.params.doctorId;
    const doctorEmail = req.body.doctorEmail;
    const doctorName = req.body.doctorName;

    const doctor = await Doctor.findByPk(doctorId);

    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    // Send approval email
    const emailSent = await ApproveByAdminTeam(doctorName, doctorEmail);

    if (!emailSent) {
      return res.status(500).json({ message: "Failed to send approval email" });
    }

    doctor.isVerifiedByAdmin = true;
    await doctor.save();

    res.status(200).json({ message: 'Doctor approved successfully', data: doctor });
  } catch (error) {
    console.error('Error approving doctor:', error);
    res.status(500).json({ message: 'Error approving doctor', error });
  }
}


export const doctorReviews = async (req, res) => {
  try {
    const { userId, doctorId, userName, rating, comments } = req.body;

    const hasAppointment = await Appointment.findOne({
      where: { userId, doctorId },
    });

    if (!hasAppointment) {
      return res.status(400).json({ error: 'You have not booked an appointment with this doctor.' });
    }

    const existingReview = await Review.findOne({
      where: { userId, doctorId },
    });

    if (existingReview) {
      return res.status(409).json({ error: 'You have already reviewed this doctor.' });
    }

    // Create a new review
    const newReview = await Review.create({
      userId,
      doctorId,
      userName,
      rating,
      comments,
    });

    res.status(201).json(newReview);
  } catch (error) {
    console.error('Error creating review:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



export const showAllReviewsByDocId = async (req, res) => {
  try {
    const { doctorId } = req.params;


    const reviews = await Review.findAll({
      where: { doctorId },
    });

    return res.status(200).json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return res.status(500).json({ error: 'Error fetching reviews.' });
  }
}


export const verifyDoctorController = async (req, res) => {
  const token = req.params.token;
  // console.log('Verifying user token', token);

  try {
    const doctor = await Doctor.findOne({
      where: {
        [Op.or]: [{ verificationToken: token }],
      },
    });

    if (doctor) {
      if (doctor.isVerified) {
        res.status(200).json({ success: true, message: 'Email is already verified' });
      } else {
        doctor.isVerified = true;
        doctor.verificationToken = null;
        await doctor.save();
        res.status(200).json({ success: true, message: 'Email verified successfully' });
      }
    } else {
      res.status(404).json({ success: false, message: 'Invalid verification token' });
    }
  } catch (error) {
    console.error('Error verifying email:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};


export const updateDoctorProfile = async (req, res) => {
  const doctorId = req.params.doctorId;
  const { name, username, timings ,feesPerConsultation} = req.body;

  try {
    const doctor = await Doctor.findOne({ where: { id: doctorId } });

    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    const file = req.file;

    if (file) {
      const fileUri = getDataUri(file);
      const uploadResponse = await cloudinary.v2.uploader.upload(fileUri.content);
      doctor.avatar = uploadResponse.secure_url;
    }

    if (name) {
      doctor.Name = name;
    }

    if (username) {
      doctor.username = username;
    }
    if (timings) {
      doctor.timings = timings;
    }
    if (feesPerConsultation) {
      doctor.feesPerConsultation = feesPerConsultation;
    }

    await doctor.save();

    return res.status(200).json({ message: 'Profile updated successfully', doctor });
  } catch (error) {
    console.error('Error updating doctor profile with avatar:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};



export const updateAvailabilityStatus = async (req, res) => {
  const { doctorId } = req.params;
  const { status } = req.body;

  try {
    const doctor = await Doctor.findByPk(doctorId);

    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    await doctor.update({ status });

    return res.status(200).json({ message: 'Availability status updated successfully', doctor });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};