import { sendAppointEmail, sendtApprovalEmail } from '../helper/OTPhandler.js';
import Appointment from '../models/Appointment.js';
import Room from '../models/RoomModel.js';
import { v4 as uuidv4 } from "uuid";
import Stripe from 'stripe';

const stripe = new Stripe(process.env.Stripe_Key);


export const createAppointment = async (req, res) => {
  try {
    const { AppointmentDetails } = req.body;

    console.log(AppointmentDetails);

    const firstAppointment = AppointmentDetails[0]; 

    const userId = firstAppointment.userId;
    const doctorId = firstAppointment.doctorId;
    const date = firstAppointment.date;
    const time = firstAppointment.time;
    const subject = firstAppointment.subject;
    const doctorName = firstAppointment.doctorName;
    const patientName = firstAppointment.patientName;
    const phone = firstAppointment.phone;
    const age = firstAppointment.age;
    const patientEmail = firstAppointment.patientEmail;
    const DoctorEmail = firstAppointment.DoctorEmail;
    const appointmentFee = firstAppointment.price;

    const lineItems = AppointmentDetails.map((product) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: product.name,
          images: [product.imgdata]
        },
        unit_amount: product.price * 100,
      },
      quantity: 1,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.BASE_URL}/success`,
      cancel_url: `${process.env.BASE_URL}/cancel`,
    });

    

    const appointment = await Appointment.create({
      userId,
      doctorId,
      date,
      time,
      subject,
      doctorName,
      patientName,
      phone,
      age,
      patientEmail,
      DoctorEmail,
      appointmentFee
    });


    const emailSent = await sendAppointEmail(DoctorEmail, patientName, doctorName, date, time);

    if (!emailSent) {
      return res.status(500).json({ message: "Failed to send approval email" });
    }

    // Check if a room already exists 
    let room = await Room.findOne({
      where: {
        userId,
        doctorId,
      },
    });
    const roomId = uuidv4();
    if (!room) {
      room = await Room.create({
        roomId,
        userId,
        doctorId,
        doctorName,
        userName: patientName,
      });
    }
    return res.status(201).json({
      success: true,
      message: 'Your Appointment created successfully!',
      id: session.id

    });
    
  } catch (error) {
    console.error("Error creating session:", error);
    res.status(500).json({ error: "Failed to create session" });
  }
}






export const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.findAll();

    return res.status(200).json({ success: true, message: "The list of all appointments are fetched ", data: appointments });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Unable to fetch appointments' });
  }
};

export const getUserAppointmentsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    const appointments = await Appointment.findAll({
      where: { userId },
    });

    if (!appointments || appointments.length === 0) {
      return res.status(404).json({ error: 'No appointments found for this user' });
    }

    return res.status(200).json({ success: true, data: appointments });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Unable to fetch appointments' });
  }
};

export const getAppointmentsByDocId = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const appointments = await Appointment.findAll({
      where: { doctorId },
    });

    if (!appointments || appointments.length === 0) {
      return res.status(404).json({ error: 'No appointments found for this user' });
    }

    return res.status(200).json({ success: true, data: appointments });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Unable to fetch appointments' });
  }
};


export const updateAppointment = async (req, res) => {
  const { appointmentId } = req.params;
  const { date, time, subject } = req.body; 

  try {
    
    const appointment = await Appointment.findByPk(appointmentId);

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    appointment.date = date;
    appointment.time = time;
    appointment.subject = subject;
    await appointment.save();

    return res.status(200).json({ message: 'Appointment updated successfully' });
  } catch (error) {
    console.error('Error updating appointment:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const deleteAppointment = async (req, res) => {
  try {
    const { appointId } = req.params;

    const appointment = await Appointment.findOne({
      where: { id: appointId },
    });

    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    await appointment.destroy();

    return res.status(204).json({
      success: true, message: "Your Appointment deleted successfully !"
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Unable to delete appointment' });
  }
};


export const approveAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.params;

    const appointment = await Appointment.findByPk(appointmentId);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found',
      });
    }

    if (appointment.status !== 'pending') {
      return res.status(400).json({
        success: false,
        message: 'Appointment cannot be approved as it is not in a pending state',
      });
    }


    const appointmentDetails = {
      date: appointment.date,
      time: appointment.time,

    };

    const emailSent = await sendtApprovalEmail(appointment.patientEmail, appointment.doctorName, appointmentDetails);

    if (!emailSent) {
      return res.status(500).json({ message: "Failed to send approval email" });
    }

    appointment.status = 'approved';
    await appointment.save();

    res.status(200).json({
      success: true,
      message: 'Appointment approved successfully',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: error.message,
      message: 'Error approving appointment',
    });
  }
};



export const getRoomIdById = async (req, res) => {
  try {
    const { Id } = req.params;
    const { role } = req.query;

    let whereClause;

    if (role === 'doctor') {
      whereClause = {
        doctorId: Id,
      };
    } else {
      whereClause = {
        userId: Id,
      };
    }

    const rooms = await Room.findAll({
      where: whereClause,
    });

    if (!rooms || rooms.length === 0) {
      return res.status(404).json({ message: 'Rooms not found' });
    }

    // const roomIds = rooms.map((room) => room.roomId);

    return res.status(200).json(rooms);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Unable to retrieve roomIds' });
  }
};


