import express from "express";
import checkAuth from "../utils/checkAuth.js";
import {
  addUserToApplications,
  createDirecting,
  getAdminsDirecting,
  getAllDirecting,
  getAllOrganizers,
  getDirecting,
  getUsersFromApplications,
  getUsersFromMembers,
  updateDirecting,
} from "../controllers/DirectingController.js";

const router = express.Router();

router.post("/create", checkAuth, createDirecting);
router.patch("/update/:id", checkAuth, updateDirecting);
router.get("/get-organizers", checkAuth, getAllOrganizers);
router.get("/get-all-directing", getAllDirecting);
router.get("/get-directing/:id", getDirecting);
router.get("/get-admins-directing", checkAuth, getAdminsDirecting);
router.put("/add-to-applications/:id", checkAuth, addUserToApplications);
router.get("/get-applications/:id", checkAuth, getUsersFromApplications);
router.get("/get-members/:id", checkAuth, getUsersFromMembers);

export default router;
