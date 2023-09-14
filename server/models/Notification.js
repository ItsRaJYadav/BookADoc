import { DataTypes } from 'sequelize';
import { sequelize } from '../config/Db.js';
const Notification = sequelize.define('Notification', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    notification: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: [],
    },
    seennotification: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: [],
    },
    userId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

sequelize.sync()
    .then(() => {
        console.log('Notification model synchronized with database.');
    })
    .catch((error) => {
        console.error('Error synchronizing Notification model: ', error);
    });


module.exports = Notification;
