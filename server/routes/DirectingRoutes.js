import express from "express";
import checkAuth from "../utils/checkAuth.js";
import {
  createDirecting,
  getAllOrganizers,
} from "../controllers/DirectingController.js";

const router = express.Router();

router.post("/create", checkAuth, createDirecting);
router.get("/get-organizers", checkAuth, getAllOrganizers);

export default router;
