import StockMove from "../models/StockMove.js";
import StockLevel from "../models/StockLevel.js";
import { nextReference } from "../utils/reference.js";

// Helper: adjust a product's quantity at a location (creates the level doc if missing).
const applyDelta = async (product, location, delta) => {
  const level = await StockLevel.findOneAndUpdate(
    { product, location },
    { $inc: { quantity: delta } },
    { upsert: true, new: true }
  );
  return level;
};

// Generic creator for receipts / deliveries / transfers / adjustments (status: draft).
const createMove = (type) => async (req, res, next) => {
  try {
    const { product, quantity, fromLocation, toLocation, warehouse, partner, notes } = req.body;
    if (!product || !quantity || !warehouse) {
      return res.status(400).json({ message: "Product, quantity and warehouse are required" });
    }
    if (type === "internal" && !fromLocation) {
      return res.status(400).json({ message: "Internal transfers require a source location" });
    }
    if (type === "delivery" && !fromLocation) {
      return res.status(400).json({ message: "Deliveries require a source location" });
    }
    if (type === "receipt" && !toLocation) {
      return res.status(400).json({ message: "Receipts require a destination location" });
    }

    const reference = await nextReference(type);
    const move = await StockMove.create({
      reference,
      type,
      product,
      quantity,
      fromLocation: fromLocation || null,
      toLocation: toLocation || null,
      warehouse,
      partner,
      notes,
      createdBy: req.user._id,
      status: "draft",
    });
    res.status(201).json(move);
  } catch (err) {
    next(err);
  }
};

export const createReceipt = createMove("receipt");
export const createDelivery = createMove("delivery");
export const createTransfer = createMove("internal");

// Adjustments are entered as a counted quantity, not a delta; we compute the delta on validate.
export const createAdjustment = async (req, res, next) => {
  try {
    const { product, location, countedQuantity, warehouse, notes } = req.body;
    if (!product || countedQuantity === undefined || !location || !warehouse) {
      return res.status(400).json({ message: "Product, location, warehouse and counted quantity are required" });
    }
    const currentLevel = await StockLevel.findOne({ product, location });
    const currentQty = currentLevel ? currentLevel.quantity : 0;
    const delta = countedQuantity - currentQty;

    const reference = await nextReference("adjustment");
    const move = await StockMove.create({
      reference,
      type: "adjustment",
      product,
      quantity: Math.abs(delta),
      toLocation: delta >= 0 ? location : null,
      fromLocation: delta < 0 ? location : null,
      warehouse,
      notes: notes || `Counted ${countedQuantity}, system had ${currentQty}`,
      createdBy: req.user._id,
      status: "draft",
    });
    res.status(201).json(move);
  } catch (err) {
    next(err);
  }
};

// @route PATCH /api/stock/moves/:id/validate
// Applies the stock movement's effect and marks it done. This is the one place
// stock quantities actually change, so every operation funnels through here.
export const validateMove = async (req, res, next) => {
  try {
    const move = await StockMove.findById(req.params.id);
    if (!move) return res.status(404).json({ message: "Move not found" });
    if (move.status === "done") return res.status(400).json({ message: "This move is already validated" });

    switch (move.type) {
      case "receipt":
        await applyDelta(move.product, move.toLocation, move.quantity);
        break;
      case "delivery":
        await applyDelta(move.product, move.fromLocation, -move.quantity);
        break;
      case "internal":
        await applyDelta(move.product, move.fromLocation, -move.quantity);
        await applyDelta(move.product, move.toLocation, move.quantity);
        break;
      case "adjustment":
        if (move.toLocation) await applyDelta(move.product, move.toLocation, move.quantity);
        if (move.fromLocation) await applyDelta(move.product, move.fromLocation, -move.quantity);
        break;
      default:
        return res.status(400).json({ message: "Unknown move type" });
    }

    move.status = "done";
    move.validatedAt = new Date();
    await move.save();
    res.json(move);
  } catch (err) {
    next(err);
  }
};

// @route PATCH /api/stock/moves/:id/cancel
export const cancelMove = async (req, res, next) => {
  try {
    const move = await StockMove.findById(req.params.id);
    if (!move) return res.status(404).json({ message: "Move not found" });
    if (move.status === "done") {
      return res.status(400).json({ message: "A validated move cannot be cancelled, only reversed" });
    }
    move.status = "cancelled";
    await move.save();
    res.json(move);
  } catch (err) {
    next(err);
  }
};

// @route GET /api/stock/moves?type=&status=&warehouse=
export const getMoves = async (req, res, next) => {
  try {
    const { type, status, warehouse } = req.query;
    const filter = {};
    if (type) filter.type = type;
    if (status) filter.status = status;
    if (warehouse) filter.warehouse = warehouse;

    const moves = await StockMove.find(filter)
      .populate("product", "name sku uom")
      .populate("fromLocation", "name")
      .populate("toLocation", "name")
      .populate("warehouse", "name code")
      .populate("createdBy", "name")
      .sort({ createdAt: -1 });
    res.json(moves);
  } catch (err) {
    next(err);
  }
};

// @route GET /api/stock/levels?warehouse=
export const getStockLevels = async (req, res, next) => {
  try {
    const levels = await StockLevel.find()
      .populate("product", "name sku uom reorderMin")
      .populate({ path: "location", populate: { path: "warehouse", select: "name code" } })
      .sort({ "product.name": 1 });
    res.json(levels);
  } catch (err) {
    next(err);
  }
};
