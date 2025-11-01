// controllers/transactionController.js
import Transaction from "../models/Transaction.js";
import Account from "../models/Account.js";

export const addTransaction = async (req, res) => {
  try {
    const { selectedAccountId,type,amount,date,label } = req.body;
    const userId = req.userId; 

    if (!selectedAccountId || !type || amount === undefined || date===undefined) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const account = await Account.findOne({ _id: selectedAccountId, userId});
    if(!account){
      return res.status(404).json({ message: "Account not found" });
    }

    if (type === "expense" && account.balance < amount) {
      return res.status(400).json({ message: "Insufficient balance" });
    }

    const newTransaction = new Transaction({
      userId,
      accountId: selectedAccountId,
      type,
      amount,
      date,
      label
    });

    await newTransaction.save();

    if (type === "income") {
        account.balance = Number(account.balance) + Number(amount);
    } else {
      
      account.balance = Number(account.balance) - Number(amount);;
    }

    await account.save();

    res.status(201).json({
      message: "Transaction added successfully",
      newTransaction,  
      updatedBalance: account.balance,
    });
  } catch (err) {
    console.error("Error adding account:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getTransactions = async(req, res) => {
    try {
        const userId = req.userId;
        const transactions = await Transaction.find({ userId })
        .sort({ date: -1 })
        .populate("accountId","account");
        res.status(200).json({ transactions });
    } catch (err) {
        console.error("Error fetching transactions:", err);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const { date, type, amount, accountId, label } = req.body;

    const updatedTx = await Transaction.findByIdAndUpdate(
      id,
      { date, type, amount, accountId, label },
      { new: true }
    );

    res.json({ message: "Transaction updated successfully", transaction: updatedTx });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update transaction" });
  }
};

export const deleteTransaction = async (req,res) => {
  try{
    const { id } = req.params;
    const deletedTx = await Transaction.findByIdAndDelete(
      id,
    );
    res.json({ message: "Transaction deleted successfully", transaction: deletedTx });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete transaction" });
  }
}