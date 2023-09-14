import { DataTypes } from 'sequelize';
import { sequelize } from '../config/Db.js'; 

const OTP = sequelize.define('OTP_Data', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  code: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    
  },
  expiredIn: {
    type: DataTypes.BIGINT, 
    allowNull: false,
  },
}, {
  timestamps: true,
});

OTP.sync()
  .then(() => {
    console.log('OTP model synchronized with the database.');
  })
  .catch((error) => {
    console.error('Error synchronizing OTP model: ', error);
  });

export default OTP;
