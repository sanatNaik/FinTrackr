import User from "../models/User.js";

export const updateTeleId = async (req, res) => {
  try {
    const userId = req.userId;
    const { teleId } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      { telegramId:teleId },
      { new: true }
    );
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ message: "Telegram ID updated successfully", user });
  } catch (err) {
    res.status(500).json({ message: "Failed to update Telegram ID" });
  }
};