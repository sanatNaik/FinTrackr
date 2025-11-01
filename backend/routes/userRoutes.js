// routes/userRoutes.js
import express from "express";
import { updateTeleId } from "../controllers/userController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();
router.get("/test", (req, res) => {
  res.send("Account route working!");
});
// POST /api/user/updateId
router.put("/update",verifyToken,updateTeleId);
export default router;
