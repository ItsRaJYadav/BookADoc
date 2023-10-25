import express from 'express';
import { doctorRegistration, doctorReviews, getAllVerifiedDoctors, getAllVideoConsultant, getDoctorById, showAllReviewsByDocId, updateAvailabilityStatus, updateDoctorProfile, verifyDoctorController } from '../controllers/doctorController.js';
import { isAuthenticate, isDoctor } from '../helper/middleware.js';
import singleUpload from '../helper/Cloudinary.js';

const router = express.Router();

router.get('/',(req,res)=>{
    res.json({message:"Hello from Doctor Server"})
})

router.get("/doctor-auth",isAuthenticate ,isDoctor , (req, res) => {
    res.status(200).send({ ok: true });
});
router.post('/doctor-registration',doctorRegistration)
router.get('/getVerifiedDoctors',getAllVerifiedDoctors)
router.get('/getVideoConsultant',getAllVideoConsultant)
router.get('/doctorInfo/:doctorId', getDoctorById)
router.post('/feedback', doctorReviews)
router.get('/show-all-reviews/:doctorId', showAllReviewsByDocId)

router.get("/verify-doctors-email/:token",verifyDoctorController)
router.patch("/profile_update/:doctorId",singleUpload,isAuthenticate,isDoctor, updateDoctorProfile)
router.patch("/updateAvailability/:doctorId",isAuthenticate,isDoctor, updateAvailabilityStatus)


export default router;