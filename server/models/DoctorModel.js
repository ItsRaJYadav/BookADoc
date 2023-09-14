import { DataTypes } from 'sequelize';
import { sequelize } from '../config/Db.js';

const DoctorModel = sequelize.define('Doctor', {
  
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  Name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  avatar: {
    type: DataTypes.STRING,
    defaultValue:"https://img.freepik.com/premium-vector/avatar-bearded-doctor-doctor-with-stethoscope-vector-illustrationxa_276184-31.jpg"
  },
  website: {
    type: DataTypes.STRING,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  specialization: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  experience: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  feesPerConsultation: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'Not Available',
  },
  timings: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  gender: {
    type: DataTypes.STRING,
  },
  qualifications: {
    type: DataTypes.STRING,
  },
  about: {
    type: DataTypes.TEXT,
  },
  registrationNumber: {
    type: DataTypes.STRING,
  },
  hospitalAffiliation: {
    type: DataTypes.STRING,
  },
  languagesSpoken: {
    type: DataTypes.STRING, 
  },
  isVerifiedByAdmin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  isDoctor: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
}, {
  timestamps: true,
});

sequelize.sync()
  .then(() => {
    console.log('Doctor model synchronized with database.');
  })
  .catch((error) => {
    console.error('Error synchronizing Doctor model: ', error);
  });

export default DoctorModel;
