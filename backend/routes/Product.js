const express = require("express");
const router = express.Router();
const multer = require("multer");

const storage = multer.memoryStorage(); // Store the image in memory
const upload = multer({ storage: storage });

const {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getImage,
} = require("../controllers/Product");
const requireAuth = require("../middleware/requireAuth");

router.use(requireAuth);

router.get("/", getAllProducts);
router.get("/:id", getProduct);
router.post("/", upload.single("image"), createProduct);
router.put("/:id", upload.single("image"), updateProduct);
router.delete("/:id", deleteProduct);
router.get("/image/:id", getImage);

module.exports = router;
