import express from "express";
import { getKpis, getLowStockItems } from "../controllers/dashboardController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.use(protect);
router.get("/kpis", getKpis);
router.get("/low-stock", getLowStockItems);

export default router;
