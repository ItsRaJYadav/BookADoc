import express from 'express';
import { ForgotPassword, OTPLoginController, RegisterUserController, allUsersController, contactFormController, deleteUserController, loginController, updatePassword, verifyUserController } from '../controllers/authController.js';
import { isAdmin, isAuthenticate } from '../helper/middleware.js';
import { ApproveDoctorsProfile, getAllDoctors } from '../controllers/doctorController.js';
import { handleFileUpload } from '../helper/Cloudinary.js';
import multer from 'multer';
const router = express.Router();


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// const upload = multer({ storage: storage, limits: { files: 5 } }); 

// router.post('/upload-multiple', upload.array('files', 5), handleFileUpload); 

// router.post('/upload', upload.single('file'), handleFileUpload);


router.get('/test', isAuthenticate, (req, res) => {
    res.json({ message: "test message" })
})


router.post('/register', RegisterUserController);
router.post('/login', loginController);
router.post('/login_via_otp', OTPLoginController);
router.post('/forgot_password', ForgotPassword);
router.patch('/update_password', updatePassword);

router.get("/user-auth", isAuthenticate, (req, res) => {
    res.status(200).send({ ok: true });
});
router.get("/verify-email/:token", verifyUserController)



// admin routes
router.get("/admin-auth", isAuthenticate, isAdmin, (req, res) => {
    res.status(200).send({ ok: true });
});

router.get("/admin/alluser", isAuthenticate, isAdmin, allUsersController);
router.get("/admin/alldoctors", isAuthenticate, isAdmin, getAllDoctors);
router.delete("/admin/deleteuser/:userId", isAuthenticate, isAdmin, deleteUserController);
router.patch("/admin/approveuser/:doctorId", isAuthenticate, isAdmin, ApproveDoctorsProfile);

router.post('/contactforms', contactFormController);


export default router;