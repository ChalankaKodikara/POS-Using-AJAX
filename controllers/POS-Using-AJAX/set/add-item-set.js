const { sequelize } = require("../../../config/database");
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const ItemSet = require("../../../models/ItemSet");
const ItemSetItem = require("../../../models/ItemSetItems");
const Item = require("../../../models/Items");

// Ensure "uploads" directory exists
const uploadDir = path.join(__dirname, "../../../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure Multer for file storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir); // Save images in 'uploads/' folder
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Rename file
  },
});

const upload = multer({ storage: storage });

const addItemSet = async (req, res) => {
  try {
    const { item_set_name, items } = req.body; // `items` should be a JSON string
    const parsedItems = JSON.parse(items); // Parse JSON string into array

    if (
      !item_set_name ||
      !Array.isArray(parsedItems) ||
      parsedItems.length === 0
    ) {
      return res.status(400).json({ error: "Invalid input data" });
    }

    // Check if file is uploaded
    let image_url = null;
    if (req.file) {
      image_url = `/uploads/${req.file.filename}`; // Store the file path
    }

    // Fetch item details to calculate total space & price
    let totalPrice = 0;
    let totalSpace = 0;

    for (const { item_id, quantity } of parsedItems) {
      const item = await Item.findByPk(item_id);
      if (!item) {
        return res.status(400).json({ error: `Item ID ${item_id} not found` });
      }
      totalPrice += item.price * quantity;
      totalSpace += (item.required_space || 0) * quantity;
    }

    // Create Item Set
    const newItemSet = await ItemSet.create({
      item_set_name,
      total_price: totalPrice,
      total_required_space: totalSpace,
      image_url,
    });

    // Add items to the join table
    for (const { item_id, quantity } of parsedItems) {
      await ItemSetItem.create({
        item_set_id: newItemSet.item_set_id,
        item_id,
        quantity,
      });
    }

    return res
      .status(201)
      .json({ message: "Item set created successfully", newItemSet });
  } catch (error) {
    console.error("Error adding item set:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { addItemSet, upload };
