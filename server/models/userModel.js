import { DataTypes } from 'sequelize';
import { sequelize } from '../config/Db.js'; 

// Define the User model
const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  avatar: {
    type: DataTypes.STRING,
    defaultValue:"https://img.freepik.com/premium-vector/business-global-economy_24877-41082.jpg"
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
  isAdmin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  isVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  verificationToken: {
    type: DataTypes.STRING, 
    allowNull: true, 
  },
  

});


sequelize.sync()
  .then(() => {
    console.log('User model synchronized with database.');
  })
  .catch((error) => {
    console.error('Error synchronizing User model: ', error);
  });

export default User;
