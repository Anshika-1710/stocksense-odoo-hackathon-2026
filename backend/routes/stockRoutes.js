import express from "express";
import {
  createReceipt,
  createDelivery,
  createTransfer,
  createAdjustment,
  validateMove,
  cancelMove,
  getMoves,
  getStockLevels,
} from "../controllers/stockController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.use(protect);
router.get("/moves", getMoves);
router.get("/levels", getStockLevels);
router.post("/receipts", createReceipt);
router.post("/deliveries", createDelivery);
router.post("/transfers", createTransfer);
router.post("/adjustments", createAdjustment);
router.patch("/moves/:id/validate", validateMove);
router.patch("/moves/:id/cancel", cancelMove);

export default router;
