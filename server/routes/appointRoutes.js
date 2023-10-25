import express from 'express';
import { approveAppointment, createAppointment, deleteAppointment, getAllAppointments, getAppointmentsByDocId, getRoomIdById, getUserAppointmentsByUserId, updateAppointment, webhookSession } from '../controllers/appointController.js';
import { isAdmin, isAuthenticate, isDoctor } from '../helper/middleware.js';
const router = express.Router();

router.get('/', (req, res) => {
    res.send("Welcome to the Appointments")
})

router.post('/stripepay', createAppointment)

router.get('/getAllAppoints', isAuthenticate, isAdmin, getAllAppointments)
router.get('/userAppointsById/:userId', isAuthenticate, getUserAppointmentsByUserId)
router.get('/AllAppointsByDocId/:doctorId', isAuthenticate, isDoctor, getAppointmentsByDocId)
router.delete('/delete/:appointId', isAuthenticate, deleteAppointment)
router.patch('/approve/:appointmentId', isAuthenticate, isDoctor, approveAppointment)


router.get('/getRoomId/:Id', isAuthenticate, getRoomIdById)
router.patch('/update/:appointmentId', isAuthenticate, updateAppointment)

import Stripe from 'stripe';




router.post('/webhook', express.raw({ type: 'application/json' }),webhookSession);

export default router;