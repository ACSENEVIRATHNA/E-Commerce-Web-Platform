const express = require("express");
const router = express.Router();
const multer = require("multer");

const storage = multer.memoryStorage(); // Store the image in memory
const upload = multer({ storage: storage });

const {
  getAllProducts,
  createProduct,
  getImage,
} = require("../controllers/Public");

router.get("/", getAllProducts);
router.post("/", upload.single("image"), createProduct);
router.get("/image/:id", getImage);

module.exports = router;
