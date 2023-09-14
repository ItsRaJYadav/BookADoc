import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();


const dbPort = parseInt(process.env.DB_Port, 10); 

if (!process.env.DB_Name || !process.env.DB_User || !process.env.DB_Password || !process.env.DB_Host ) {
    console.error('Missing or invalid DB_Port environment variable.');
    process.exit(1); 
}

export const sequelize = new Sequelize(
    process.env.DB_Name,
    process.env.DB_User,
    process.env.DB_Password,
    {
        host: process.env.DB_Host,
        port: dbPort, 
        dialect: 'mysql'
    }
);

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error.message);
    }
})();
