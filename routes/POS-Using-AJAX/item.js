const express = require("express");
const {
  addItem,
  upload,
} = require("../../controllers/POS-Using-AJAX/items/add");
const {
  getItems,
  getImage,
} = require("../../controllers/POS-Using-AJAX/items/get");

const router = express.Router();

router.post("/add-item", upload.single("image"), addItem);
router.get("/get-items", getItems);
router.get("/get-image/:filename", getImage);

module.exports = router;
