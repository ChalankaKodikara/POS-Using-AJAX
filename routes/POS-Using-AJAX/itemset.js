const express = require("express");
const {
  addItemSet,
  upload,
} = require("../../controllers/POS-Using-AJAX/set/add-item-set");
const {
  getItemSets,
  getImage,
  getItemSetsBySpace,
} = require("../../controllers/POS-Using-AJAX/set/get-item-set");

const router = express.Router();

// Add new item set with multiple items (Supports file upload)
router.post("/add-item-set", upload.single("image"), addItemSet);
router.get("/get-item-sets", getItemSets);
router.get("/get-image/:filename", getImage);
router.get("/get-item-sets-by-space", getItemSetsBySpace);

module.exports = router;
