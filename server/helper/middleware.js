import jwt from 'jsonwebtoken';
import User from "../models/userModel.js";
import Doctor from "../models/DoctorModel.js";


export const isAuthenticate = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized Access' });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodedToken;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token is invalid' });
  }
};


export const isAdmin = async (req, res, next) => {
  try {
    
  const user = await User.findOne(req.user.id);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized Access',
      });
    }

    if (user.isadmin === false) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized Access Administrator',
      });
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: error.message,
      message: 'Error in admin middleware',
    });
  }
};

  

export const isDoctor = async (req, res, next) => {
  try {
    
  const user = await Doctor.findOne(req.user.id);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'NOt Unauthorized Access',
      });
    }

    if (user.isDoctor !== true) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized Access  for Doctor routes',
      });
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: error.message,
      message: 'Error in admin middleware',
    });
  }
};

