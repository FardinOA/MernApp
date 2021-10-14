const express = require("express");
const {
    getAllProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    getSingleProduct,
} = require("../controller/productController");
const router = express.Router();

router.get("/products", getAllProduct);
router.get("/product/:id", getSingleProduct);
router.post("/product/new", createProduct);
router.put("/product/:id", updateProduct);
router.delete("/product/:id", deleteProduct);

module.exports = router;
