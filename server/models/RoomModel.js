import { DataTypes } from 'sequelize';
import { sequelize } from '../config/Db.js';

const Room = sequelize.define('Room', {
  roomId: {
    type: DataTypes.STRING,
  },
  userId: {
    type: DataTypes.STRING,
  },
  doctorId: {
    type: DataTypes.STRING,
  },
  doctorName: {
    type: DataTypes.STRING,
  },
  userName: {
    type: DataTypes.STRING,
  },
  lastSeenByUserId: {
    type: DataTypes.DATE, 
  },
  lastSeenByDoctorId: {
    type: DataTypes.DATE, 
  },
});

sequelize
  .sync()
  .then(() => {
    console.log('Room model synchronized with the database.');
  })
  .catch((error) => {
    console.error('Error synchronizing Room model: ', error);
  });

export default Room;
