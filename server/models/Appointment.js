import { DataTypes } from 'sequelize';
import {sequelize} from '../config/Db.js';

const Appointment = sequelize.define('Appointment', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  doctorId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'pending',
  },
  time: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  doctorName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  subject: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING, 
    allowNull: false, 
  },
  age: {
    type: DataTypes.INTEGER, 
    allowNull: false, 
  },
  patientName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  patientEmail: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  DoctorEmail: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  appointmentFee: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  paymentStatus: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

sequelize.sync()
  .then(() => {
    console.log('Appointment model synchronized with database.');
  })
  .catch((error) => {
    console.error('Error synchronizing Appointment model: ', error);
  });

export default Appointment;
