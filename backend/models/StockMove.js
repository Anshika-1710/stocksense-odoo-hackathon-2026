import mongoose from "mongoose";

// Unified ledger entry for receipts, deliveries, internal transfers and adjustments.
const stockMoveSchema = new mongoose.Schema(
  {
    reference: { type: String, required: true, unique: true },
    type: {
      type: String,
      enum: ["receipt", "delivery", "internal", "adjustment"],
      required: true,
    },
    status: {
      type: String,
      enum: ["draft", "waiting", "ready", "done", "cancelled"],
      default: "draft",
    },
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    quantity: { type: Number, required: true, min: 0 },
    fromLocation: { type: mongoose.Schema.Types.ObjectId, ref: "Location", default: null },
    toLocation: { type: mongoose.Schema.Types.ObjectId, ref: "Location", default: null },
    warehouse: { type: mongoose.Schema.Types.ObjectId, ref: "Warehouse", required: true },
    partner: { type: String, trim: true }, // supplier or customer name
    notes: { type: String, trim: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    validatedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

export default mongoose.model("StockMove", stockMoveSchema);
