const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const ItemSet = sequelize.define(
  "ItemSet",
  {
    item_set_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    item_set_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    total_required_space: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0, // Default space
    },
    total_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0, // Default price
    },
    image_url: {
      type: DataTypes.STRING(500), // Store the image URL/path
      allowNull: true, // Image is optional
    },
  },
  {
    tableName: "item_sets",
    timestamps: false,
  }
);

module.exports = ItemSet;
