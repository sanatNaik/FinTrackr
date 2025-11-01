// controllers/accountController.js
import Account from "../models/Account.js";

export const addAccount = async (req, res) => {
  try {
    const { account, type, balance } = req.body;
    const userId = req.userId; 

    if (!account || !type || balance === undefined) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newAccount = new Account({
      userId,
      account,
      type,
      balance,
    });

    await newAccount.save();

    res.status(201).json({ message: "Account added successfully", account: newAccount });
  } catch (err) {
    console.error("Error adding account:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const getAccounts = async (req,res) => {
  try{
    const userId = req.userId;
    const accounts = await Account.find({userId});
    res.json(accounts);

  } catch (err) {
      res.status(500).json({message:"Failed to fetch accounts "});
  }
};

export const updateAccount = async (req, res) => {
  try {
    const { id } = req.params;
    const { account,type,balance } = req.body;
    const updatedAx = await Account.findByIdAndUpdate(
      id,
      { account, type,  balance},
      { new: true }
    );

    res.json({ message: "Account updated successfully", account: updatedAx });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update Account" });
  }
};

// export const deleteAccount = async (req,res) => {
//   try{
//     const { id } = req.params;
//     const deletedAx = await Account.findByIdAndDelete(
//       id,
//     );
//     res.json({ message: "Account deleted successfully", account: deletedAx });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Failed to delete transaction" });
//   }
// }