const Product = require("../models/Product");

const getImage = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id);

    if (!product || !product.image) {
      return res.status(404).json({ error: "Image not found" });
    }
    res.contentType(product.image.contentType);
    res.send(product.image.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllProducts = async (req, res) => {
  const user_id = req.user._id;
  let products;
  try {
    products = await Product.find({user_id}).sort({ createdAt: -1 });
    products = products.map((product) => {
      return {
        ...product._doc,
      };
    });
    res.status(200).json(products);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getProduct = async (req, res, next) => {
  const id = req.params.id;
  let product;
  try {
    product = await Product.findById(id);
  } catch (err) {
    return next(err);
  }
  if (!product) {
    return res.status(400).json({ message: "Product cannot be found" });
  }

  return res.status(200).json({ product });
};

const createProduct = async (req, res) => {
  const { name, description, category, price } = req.body;
  try {
    const user_id = req.user._id;
    const product = new Product({
      name,
      description,
      category,
      price,
      image: {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      },
      user_id,
    });

    await product.save();

    res.status(200).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const updateProduct = async (req, res, next) => {
  const id = req.params.id;
  let product;
  const { name, description, category, price } = req.body;
  if (!name && !description && !category && !price) {
    return res.status(400).json({ message: "Invalid Data" });
  }
  try {
    product = await Product.findByIdAndUpdate(id, {
      name,
      description,
      category,
      price,
      image: {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      },
    });
  } catch (err) {
    return next(err);
  }
  if (!product) {
    return res.status(500).json({ message: "Unable to update product" });
  }
  return res.status(200).json({ product });
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  const product = await Product.findOneAndDelete({ _id: id });

  if (!product) {
    return res.status(400).json({ error: "Product cannot be found" });
  }
  res.status(200).json(product);
};

module.exports = {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getImage,
};
