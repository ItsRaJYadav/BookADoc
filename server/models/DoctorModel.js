import { DataTypes } from 'sequelize';
import { sequelize } from '../config/Db.js';

const DoctorModel = sequelize.define('Doctor', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
  },
  Name: {
    type: DataTypes.TEXT,
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
    defaultValue: 'https://img.freepik.com/premium-vector/avatar-bearded-doctor-doctor-with-stethoscope-vector-illustrationxa_276184-31.jpg',
  },
  website: {
    type: DataTypes.TEXT,
  },
  address: {
    type: DataTypes.TEXT,
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
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  timings: {
    type: DataTypes.TEXT,
    defaultValue: '[]',
    allowNull: false,
    get() {
      const timings = this.getDataValue('timings');
      return timings ? JSON.parse(timings) : [];
    },
    set(timings) {
      this.setDataValue('timings', JSON.stringify(timings));
    },
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
  isVideoConsultant: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  isDoctor: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  verificationToken: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  isVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  timestamps: true,
});

sequelize.sync()
  .then(() => {
    console.log('Doctor model synchronized with the database.');
  })
  .catch((error) => {
    console.error('Error synchronizing Doctor model:', error);
  });

export default DoctorModel;
