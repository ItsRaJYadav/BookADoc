import express from 'express';
import { getMessagesByRoomId } from '../controllers/messageController.js';

const router=express.Router();

router.get('/getall/:roomId', getMessagesByRoomId)


export default router;