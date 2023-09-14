import ChatData  from '../models/Chat.js'; 



export const getMessagesByRoomId=async(req,res) =>{
    const { roomId } = req.params;
    console.log(`this is your roomId: ${roomId}`);

    try {
      const chatData = await ChatData.findOne({
        where: { roomId },
      });
  
      if (chatData) {
        const messages = chatData.messages;
        res.json({ messages });
      } else {
        res.json({ messages: [] }); 
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error retrieving messages' });
    }
}