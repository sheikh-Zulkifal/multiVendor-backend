const SupportAccount = require("../models/supportAccountModel");

exports.createSupportAccount = async (req, res) => {
  const { category } = req.body;
  const userId = req.user._id;
  try {
    const existingSupportAccount = await SupportAccount.findOne({ userId });
    if (existingSupportAccount) {
      return res.status(400).json({ message: "Support account already exists" });
    }
    const supportAccount = await SupportAccount.create({
      category,
      userId,
    });


    res.status(201).json({ success: true, message: "Support account application submitted!", data: supportAccount });
} catch (error) {
    res.status(500).json({ success: false, message: error.message });
};
}

// admin approve or reject support account

exports.updateSupportAccountStatus = async (req, res) => {
  try {
      const { status } = req.body;
      const { id } = req.params;

      if (!["approved", "rejected"].includes(status)) {
          return res.status(400).json({ success: false, message: "Invalid status update." });
      }

      const supportAccount = await SupportAccount.findByIdAndUpdate(id, { status }, { new: true });

      if (!supportAccount) {
          return res.status(404).json({ success: false, message: "Support application not found." });
      }

      res.status(200).json({ success: true, message: `Support account ${status}.`, data: supportAccount });
  } catch (error) {
      res.status(500).json({ success: false, message: error.message });
  }
};

//67c9e0615ffd095c085ee767

// check status is approved or not of support account
exports.checkSupportAccountStatus = async (req, res) => {
  try {
    const userId = req.user._id;
    const supportAccount = await SupportAccount.findOne({ userId
    });
    if (!supportAccount) {
      return res.status(404).json({ success: false, message: "Support account not found." });
    }
    res.status(200).json({ success: true, data: supportAccount });
  }
  catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
  }
