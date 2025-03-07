const { sequelize } = require("../../../config/database");
const path = require("path");
const multer = require("multer");
const fs = require("fs");

// Ensure "uploads" directory exists
const uploadDir = path.join(__dirname, "../../../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true }); // Create folder if not exists
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

const addItem = async (req, res) => {
  try {
    const { item_name, material, price, item_size, required_space } = req.body;

    if (!item_name || !material || !price) {
      return res.status(400).json({ error: "Required fields are missing" });
    }

    // Check if file is uploaded
    let image_url = null;
    if (req.file) {
      image_url = `/uploads/${req.file.filename}`; // Store the file path
    }

    // Insert item into database
    const insertQuery = `
      INSERT INTO items (item_name, material, price, item_size, required_space, image_url, active_status)
      VALUES (?, ?, ?, ?, ?, ?, ?)`;

    await sequelize.query(insertQuery, {
      replacements: [
        item_name,
        material,
        price,
        item_size,
        required_space,
        image_url,
        true,
      ],
    });

    return res
      .status(201)
      .json({ message: "Item added successfully", image_url });
  } catch (error) {
    console.error("Error adding item:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { addItem, upload };
