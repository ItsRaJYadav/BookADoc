import { DataTypes } from "sequelize";
import { sequelize } from "../config/Db.js";

const Review = sequelize.define("Review", {
  userName: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true, 
  },
  comments: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5,
    },
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  doctorId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
});

Review.sync()
  .then(() => {
    console.log("Review table created successfully.");
  })
  .catch((error) => {
    console.error("Error creating Review table:", error);
  });

export default Review;
