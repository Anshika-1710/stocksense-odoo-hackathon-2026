import Product from "../models/Product.js";
import Category from "../models/Category.js";
import StockLevel from "../models/StockLevel.js";

// @route POST /api/products
export const createProduct = async (req, res, next) => {
  try {
    const { name, sku, category, uom, reorderMin, reorderMax } = req.body;
    if (!name || !sku || !category) {
      return res.status(400).json({ message: "Name, SKU and category are required" });
    }
    const exists = await Product.findOne({ sku: sku.toUpperCase() });
    if (exists) return res.status(400).json({ message: "A product with this SKU already exists" });

    const product = await Product.create({ name, sku, category, uom, reorderMin, reorderMax });
    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
};

// @route GET /api/products?search=&category=
export const getProducts = async (req, res, next) => {
  try {
    const { search, category } = req.query;
    const filter = {};
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { sku: { $regex: search, $options: "i" } },
      ];
    }
    if (category) filter.category = category;

    const products = await Product.find(filter).populate("category", "name").sort({ createdAt: -1 });

    // Attach total stock across all locations for each product.
    const withStock = await Promise.all(
      products.map(async (p) => {
        const levels = await StockLevel.find({ product: p._id });
        const totalStock = levels.reduce((sum, l) => sum + l.quantity, 0);
        return { ...p.toObject(), totalStock };
      })
    );
    res.json(withStock);
  } catch (err) {
    next(err);
  }
};

// @route GET /api/products/:id
export const getProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).populate("category", "name");
    if (!product) return res.status(404).json({ message: "Product not found" });
    const levels = await StockLevel.find({ product: product._id }).populate("location", "name");
    res.json({ product, stockByLocation: levels });
  } catch (err) {
    next(err);
  }
};

// @route PUT /api/products/:id
export const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    next(err);
  }
};

// @route DELETE /api/products/:id
export const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product deleted" });
  } catch (err) {
    next(err);
  }
};

// @route GET /api/products/categories/all
export const getCategories = async (req, res, next) => {
  try {
    res.json(await Category.find().sort({ name: 1 }));
  } catch (err) {
    next(err);
  }
};

// @route POST /api/products/categories
export const createCategory = async (req, res, next) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: "Category name is required" });
    const category = await Category.create({ name });
    res.status(201).json(category);
  } catch (err) {
    next(err);
  }
};
