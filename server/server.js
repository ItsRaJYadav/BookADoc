import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import { sequelize } from './config/Db.js';
import authRoutes from './routes/authRoutes.js';
import docRoutes from './routes/docRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import appointRoutes from './routes/appointRoutes.js';
import http from 'http';
import { configureSocket } from './socket.js';


// deployment
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const httpServer = http.createServer(app);
const PORT = process.env.PORT;
dotenv.config();


//SOME Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

if (process.env.Environment !== 'Development') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });
}
else {
  app.get('/', (req, res) => {
    res.send("Hello From the Main Server");
  })
}

//My application routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/doc', docRoutes);
app.use('/api/v1/appoint', appointRoutes);
app.use('/api/v1/message', messageRoutes);





// Start the server
httpServer.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database: ', error);
  }
  // Configure sockets
  configureSocket(httpServer);
});
