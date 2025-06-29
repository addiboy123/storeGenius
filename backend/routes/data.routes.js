import express from "express"
import { getEnrichedTrendingProducts, suggestItems } from "../controllers/data.controller.js";

const router=express.Router();

router.get("/get-suggestions",getEnrichedTrendingProducts);
router.get('/suggest',suggestItems);

export default router;