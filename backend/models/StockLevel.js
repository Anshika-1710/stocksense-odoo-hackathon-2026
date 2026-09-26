import mongoose from "mongoose";

// Running quantity of a product at a specific location.
const stockLevelSchema = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    location: { type: mongoose.Schema.Types.ObjectId, ref: "Location", required: true },
    quantity: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);

stockLevelSchema.index({ product: 1, location: 1 }, { unique: true });

export default mongoose.model("StockLevel", stockLevelSchema);
