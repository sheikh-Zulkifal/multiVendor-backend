const { Product } = require("../models/productModel");

// get all products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    return res.status(200).json({ products });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// get a single product
exports.getProduct = async (req, res) => {
  const { productId } = req.params;

  try {
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json({ product });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// get products by vendor
exports.getProductsByVendor = async (req, res) => {
  const vendorId = req.vendorId;

  try {
    const products = await Product.find({ vendor: vendorId });

    return res.status(200).json({ products });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};



// Add a product
exports.addProduct = async (req, res) => {
  const { name, description, price, countInStock } = req.body;
  const vendorId = req.vendorId;

  try {
    const product = await Product.create({
      name,
      description,
      price,
      countInStock,
      vendor: vendorId, // Associate product with the logged-in vendor
    });

    return res.status(201).json({ product });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Update a product
exports.updateProduct = async (req, res) => {
  const { productId } = req.params;
  const { name, description, price, countInStock } = req.body;
  const vendorId = req.vendorId;

  try {
    const product = await Product.findOne({ _id: productId, vendor: vendorId });

    if (!product) {
      return res
        .status(404)
        .json({
          message: "Product not found or you do not have permission to edit it",
        });
    }

    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.countInStock = countInStock || product.countInStock;

    await product.save();

    return res.status(200).json({ product });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
  const { productId } = req.params;
  const vendorId = req.vendorId;

  try {
    const product = await Product.findOne({ _id: productId, vendor: vendorId });

    if (!product) {
      return res
        .status(404)
        .json({
          message:
            "Product not found or you do not have permission to delete it",
        });
    }

    await product.remove();

    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
