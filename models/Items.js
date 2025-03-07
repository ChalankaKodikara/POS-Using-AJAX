const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Item = sequelize.define(
  "Item",
  {
    item_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true, // Auto-increment primary key
      primaryKey: true,
      allowNull: false,
    },
    item_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    material: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2), // Allows up to 10 digits with 2 decimal places
      allowNull: false,
    },
    item_size: {
      type: DataTypes.STRING(100),
      allowNull: true, // Can be defined in different formats (e.g., "Large", "10x20cm")
    },
    required_space: {
      type: DataTypes.FLOAT, // Assuming it's in square meters or cubic meters
      allowNull: true,
    },
    image_url: {
      type: DataTypes.STRING(500), // URL to store the image path
      allowNull: true,
    },
    active_status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true, // Active by default
    },
  },
  {
    tableName: "items",
    timestamps: false, // Disable timestamps if not needed
  }
);

module.exports = Item;
