const express = require("express");
const router = express.Router();
const {
  createProductHandler,
  getProductByIdHandler,
  updateProductHandler,
  deleteProductHandler,
} = require("../controllers/productController");
const authenticate = require("../middleware/authMiddleware");

router.post("/v1/product", authenticate, createProductHandler);
router.get("/v1/product/:id", getProductByIdHandler);
router.put("/v1/product/:id", authenticate, updateProductHandler);
router.delete("/v1/product/:id", authenticate, deleteProductHandler);

module.exports = router;
