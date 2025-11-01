// routes/transactionRoutes.js
import express from "express";
import {addTransaction,getTransactions, updateTransaction,deleteTransaction} from "../controllers/transactionController.js"
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();
router.get("/test", (req, res) => {
  res.send("Account route working!");
});
// POST /api/accounts/add
router.post("/add", verifyToken, addTransaction);
router.get("/get",verifyToken,getTransactions);
router.put("/update/:id",verifyToken,updateTransaction);
router.delete("/delete/:id",verifyToken,deleteTransaction);

export default router;
