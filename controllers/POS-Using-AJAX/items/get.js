const { sequelize } = require("../../../config/database");
const path = require("path");

// 🟢 GET request to fetch all items from the database
const getItems = async (req, res) => {
  try {
    const fetchQuery = `SELECT * FROM items`;
    const [items] = await sequelize.query(fetchQuery);

    return res.status(200).json({ items });
  } catch (error) {
    console.error("Error fetching items:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// 🟢 GET request to fetch an image using its filename
const getImage = async (req, res) => {
  try {
    const filename = req.params.filename;
    const imagePath = path.join(__dirname, "../../../uploads", filename);
    res.sendFile(imagePath);
  } catch (error) {
    console.error("Error fetching image:", error);
    return res.status(404).json({ error: "Image not found" });
  }
};

module.exports = { getItems, getImage };
