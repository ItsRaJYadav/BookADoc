import express from 'express';
import { doctorRegistration, doctorReviews, getAllVerifiedDoctors, getDoctorById, showAllReviewsByDocId } from '../controllers/doctorController.js';
import { isAuthenticate, isDoctor } from '../helper/middleware.js';
const router = express.Router();

router.get('/',(req,res)=>{
    res.json({message:"Hello from Doctor Server"})
})

router.get("/doctor-auth",isAuthenticate ,isDoctor , (req, res) => {
    res.status(200).send({ ok: true });
});
router.post('/doctor-registration',doctorRegistration)
router.get('/getVerifiedDoctors',getAllVerifiedDoctors)
router.get('/doctorInfo/:doctorId', getDoctorById)
router.post('/feedback', doctorReviews)
router.get('/show-all-reviews/:doctorId', showAllReviewsByDocId)

export default router;