import StockMove from "../models/StockMove.js";

const prefixes = { receipt: "REC", delivery: "DEL", internal: "INT", adjustment: "ADJ" };

// Generates a sequential, human-readable reference like REC-00001.
export const nextReference = async (type) => {
  const prefix = prefixes[type];
  const count = await StockMove.countDocuments({ type });
  return `${prefix}-${String(count + 1).padStart(5, "0")}`;
};
