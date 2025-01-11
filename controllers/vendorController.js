const {Vendor} = require("../models/vendorModel");

// get all vendors
exports.getVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find();

    return res.status(200).json({ vendors });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// get a single vendor
exports.getVendor = async (req, res) => {
  const { vendorId } = req.params;

  try {
    const vendor = await Vendor.findById(vendorId);

    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    return res.status(200).json({ vendor });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
 


