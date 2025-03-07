const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");
const Item = require("../models/Items");
const ItemSet = require("./ItemSet");

const ItemSetItem = sequelize.define(
  "ItemSetItem",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    item_set_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: ItemSet,
        key: "item_set_id",
      },
      onDelete: "CASCADE",
    },
    item_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Item,
        key: "item_id",
      },
      onDelete: "CASCADE",
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1, // Default quantity per set
    },
  },
  {
    tableName: "item_set_items",
    timestamps: false,
  }
);

// Define Many-to-Many Relationship
Item.belongsToMany(ItemSet, { through: ItemSetItem, foreignKey: "item_id" });
ItemSet.belongsToMany(Item, {
  through: ItemSetItem,
  foreignKey: "item_set_id",
});

module.exports = ItemSetItem;
