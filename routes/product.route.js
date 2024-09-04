const {
  deleteProduct,
  createProduct,
  updateProduct,
  getProducts,
  getProduct,
} = require("../controllers/product.controller");

const jwt = require("jsonwebtoken");

const express = require("express");
const router = express.Router();

function authenticationToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token)
    return res
      .status(401)
      .json({ message: "Access Forbidden: No Authorization Token" });

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err)
      return res
        .status(403)
        .json({ message: "Access Forbidden: Invalid Token" });
    req.user = user;
    next();
  });
}

router.get("/", authenticationToken, getProducts);
router.get("/:id", authenticationToken, getProduct);

router.post("/", authenticationToken, createProduct);

router.put("/:id", authenticationToken, updateProduct);

router.delete("/:id", authenticationToken, deleteProduct);

module.exports = router;
