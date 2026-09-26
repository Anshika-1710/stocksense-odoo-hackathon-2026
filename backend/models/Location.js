import mongoose from "mongoose";

const locationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    warehouse: { type: mongoose.Schema.Types.ObjectId, ref: "Warehouse", required: true },
  },
  { timestamps: true }
);

locationSchema.index({ name: 1, warehouse: 1 }, { unique: true });

export default mongoose.model("Location", locationSchema);
