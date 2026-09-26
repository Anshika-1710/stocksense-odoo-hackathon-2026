import express from "express";
import Warehouse from "../models/Warehouse.js";
import Location from "../models/Location.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();
router.use(protect);

router.get("/", async (req, res, next) => {
  try {
    res.json(await Warehouse.find().sort({ name: 1 }));
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { name, code } = req.body;
    if (!name || !code) return res.status(400).json({ message: "Name and code are required" });
    res.status(201).json(await Warehouse.create({ name, code }));
  } catch (err) {
    next(err);
  }
});

router.get("/locations/all", async (req, res, next) => {
  try {
    const { warehouse } = req.query;
    const filter = warehouse ? { warehouse } : {};
    res.json(await Location.find(filter).populate("warehouse", "name code").sort({ name: 1 }));
  } catch (err) {
    next(err);
  }
});

router.post("/locations", async (req, res, next) => {
  try {
    const { name, warehouse } = req.body;
    if (!name || !warehouse) return res.status(400).json({ message: "Name and warehouse are required" });
    res.status(201).json(await Location.create({ name, warehouse }));
  } catch (err) {
    next(err);
  }
});

export default router;
