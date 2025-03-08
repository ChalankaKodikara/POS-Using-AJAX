const { sequelize } = require("../../../config/database");
const path = require("path");

const getItemSets = async (req, res) => {
  try {
    // Fetch all item sets
    const itemSetsQuery = `
      SELECT 
        item_sets.item_set_id, 
        item_sets.item_set_name, 
        item_sets.total_price, 
        item_sets.total_required_space, 
        item_sets.image_url
      FROM item_sets
    `;

    const [itemSets] = await sequelize.query(itemSetsQuery);

    // Fetch items for each item set
    const itemSetItemsQuery = `
      SELECT 
        isi.item_set_id, 
        isi.item_id, 
        isi.quantity, 
        i.item_name, 
        i.price, 
        i.required_space 
      FROM item_set_items isi
      JOIN items i ON isi.item_id = i.item_id
    `;

    const [itemSetItems] = await sequelize.query(itemSetItemsQuery);

    // Map items to their respective item sets
    const itemSetsWithItems = itemSets.map((set) => {
      return {
        ...set,
        items: itemSetItems.filter(
          (item) => item.item_set_id === set.item_set_id
        ),
      };
    });

    return res.status(200).json({ itemSets: itemSetsWithItems });
  } catch (error) {
    console.error("Error fetching item sets:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const getImage = async (req, res) => {
  try {
    const filename = req.params.filename; // Get filename from request params
    const imagePath = path.join(__dirname, "../../../uploads", filename);

    // Send the file
    res.sendFile(imagePath, (err) => {
      if (err) {
        console.error("Error fetching image:", err);
        return res.status(404).json({ error: "Image not found" });
      }
    });
  } catch (error) {
    console.error("Error fetching image:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const getItemSetsBySpace = async (req, res) => {
  try {
    const { total_required_space } = req.query; // Read query parameter

    // Validate input
    if (!total_required_space || isNaN(total_required_space)) {
      return res
        .status(400)
        .json({ error: "Invalid total_required_space value" });
    }

    // Convert to float
    const spaceValue = parseFloat(total_required_space);

    // Query to fetch item sets based on total_required_space
    const itemSetsQuery = `
        SELECT 
          item_sets.item_set_id, 
          item_sets.item_set_name, 
          item_sets.total_price, 
          item_sets.total_required_space, 
          item_sets.image_url AS item_set_image
        FROM item_sets
        WHERE item_sets.total_required_space BETWEEN 0 AND ?
        ORDER BY item_sets.total_required_space ASC
      `;

    const [itemSets] = await sequelize.query(itemSetsQuery, {
      replacements: [spaceValue],
    });

    // Fetch items for each item set including their image URL
    const itemSetItemsQuery = `
        SELECT 
          isi.item_set_id, 
          isi.item_id, 
          isi.quantity, 
          i.item_name, 
          i.price, 
          i.required_space, 
          i.image_url AS item_image
        FROM item_set_items isi
        JOIN items i ON isi.item_id = i.item_id
      `;

    const [itemSetItems] = await sequelize.query(itemSetItemsQuery);

    // Map items to their respective item sets
    const itemSetsWithItems = itemSets.map((set) => {
      return {
        ...set,
        items: itemSetItems.filter(
          (item) => item.item_set_id === set.item_set_id
        ),
      };
    });

    return res.status(200).json({ itemSets: itemSetsWithItems });
  } catch (error) {
    console.error("Error fetching item sets:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const getItemSetsByExactSpace = async (req, res) => {
  try {
    const { total_required_space } = req.query; // Read query parameter

    // Validate input
    if (!total_required_space || isNaN(total_required_space)) {
      return res
        .status(400)
        .json({ error: "Invalid total_required_space value" });
    }

    // Convert to float
    const spaceValue = parseFloat(total_required_space);

    // Query to fetch item sets where total_required_space exactly matches
    const itemSetsQuery = `
      SELECT 
        item_sets.item_set_id, 
        item_sets.item_set_name, 
        item_sets.total_price, 
        item_sets.total_required_space, 
        item_sets.image_url AS item_set_image
      FROM item_sets
      WHERE item_sets.total_required_space = ?
    `;

    const [itemSets] = await sequelize.query(itemSetsQuery, {
      replacements: [spaceValue],
    });

    // Fetch items for each item set including their image URL
    const itemSetItemsQuery = `
      SELECT 
        isi.item_set_id, 
        isi.item_id, 
        isi.quantity, 
        i.item_name, 
        i.price, 
        i.required_space, 
        i.image_url AS item_image
      FROM item_set_items isi
      JOIN items i ON isi.item_id = i.item_id
    `;

    const [itemSetItems] = await sequelize.query(itemSetItemsQuery);

    // Map items to their respective item sets
    const itemSetsWithItems = itemSets.map((set) => {
      return {
        ...set,
        items: itemSetItems.filter(
          (item) => item.item_set_id === set.item_set_id
        ),
      };
    });

    return res.status(200).json({ itemSets: itemSetsWithItems });
  } catch (error) {
    console.error("Error fetching item sets:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getItemSets,
  getImage,
  getItemSetsBySpace,
  getItemSetsByExactSpace,
};
