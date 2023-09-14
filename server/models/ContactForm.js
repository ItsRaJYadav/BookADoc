import { DataTypes } from'sequelize';
import {sequelize} from'../config/Db.js';

const ContactForm = sequelize.define('ContactForm', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

export default ContactForm;