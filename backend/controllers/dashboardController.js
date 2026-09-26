import Product from "../models/Product.js";
import StockLevel from "../models/StockLevel.js";
import StockMove from "../models/StockMove.js";

// @route GET /api/dashboard/kpis
export const getKpis = async (req, res, next) => {
  try {
    const totalProducts = await Product.countDocuments();

    const levels = await StockLevel.find().populate("product", "reorderMin");
    const totals = {};
    levels.forEach((l) => {
      const id = String(l.product._id);
      totals[id] = (totals[id] || 0) + l.quantity;
    });
    let lowStock = 0;
    let outOfStock = 0;
    Object.entries(totals).forEach(([id, qty]) => {
      const product = levels.find((l) => String(l.product._id) === id)?.product;
      if (qty <= 0) outOfStock += 1;
      else if (product && qty <= product.reorderMin) lowStock += 1;
    });

    const [pendingReceipts, pendingDeliveries, scheduledTransfers] = await Promise.all([
      StockMove.countDocuments({ type: "receipt", status: { $in: ["draft", "waiting", "ready"] } }),
      StockMove.countDocuments({ type: "delivery", status: { $in: ["draft", "waiting", "ready"] } }),
      StockMove.countDocuments({ type: "internal", status: { $in: ["draft", "waiting", "ready"] } }),
    ]);

    res.json({
      totalProducts,
      lowStockItems: lowStock,
      outOfStockItems: outOfStock,
      pendingReceipts,
      pendingDeliveries,
      scheduledTransfers,
    });
  } catch (err) {
    next(err);
  }
};

// @route GET /api/dashboard/low-stock
export const getLowStockItems = async (req, res, next) => {
  try {
    const levels = await StockLevel.find().populate("product", "name sku reorderMin uom");
    const totals = {};
    levels.forEach((l) => {
      const id = String(l.product._id);
      if (!totals[id]) totals[id] = { product: l.product, quantity: 0 };
      totals[id].quantity += l.quantity;
    });
    const lowStock = Object.values(totals).filter(
      (t) => t.product && t.quantity <= t.product.reorderMin
    );
    res.json(lowStock);
  } catch (err) {
    next(err);
  }
};
