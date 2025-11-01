// routes/accountRoutes.js
import express from "express";
import { addAccount,getAccounts,updateAccount } from "../controllers/accountController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();
router.get("/test", (req, res) => {
  res.send("Account route working!");
});
// POST /api/accounts/add
router.post("/add", verifyToken, addAccount);
router.get("/get",verifyToken,getAccounts);
router.put("/update/:id",verifyToken,updateAccount);
// router.delete("/delete/:id",verifyToken,deleteAccount);
export default router;
