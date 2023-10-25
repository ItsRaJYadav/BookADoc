import { DataTypes } from 'sequelize';
import { sequelize } from '../config/Db.js';

const ChatData = sequelize.define('ChatData', {
  roomId: {
    type: DataTypes.STRING,
    unique: true,
  },
  messages: 
  {
    type: DataTypes.TEXT, 
    defaultValue: '[]',
    allowNull: false,
    get() {
      const messages = this.getDataValue('messages');
      return messages ? JSON.parse(messages) : [];
    },
    set(messages) {
      this.setDataValue('messages', JSON.stringify(messages));
    },
  },
});

sequelize.sync();
export default ChatData;
