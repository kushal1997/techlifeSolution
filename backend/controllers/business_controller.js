const Business = require('../models/business')
const Users = require('../models/user')
const mongoose = require('mongoose')
module.exports.addDetails = async (req, res) => {
  try {
    const { userId, name, address, email, website, contactPerson, phoneNumber } = req.body;
    console.log(userId);

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(200).json({
        success: false,
        message: 'Invalid userId provided',
      });
    }

    const existingUser = await Users.findOne({ _id: new mongoose.Types.ObjectId(userId) });

    if (!existingUser) {
      return res.status(200).json({
        success: false,
        message: 'User not found. Business creation failed.',
      });
    }

    
    const business = new Business({ userId, name, address, email, website, contactPerson, phoneNumber /* add other fields here */ });
    const savedBusiness = await business.save();
    res.status(200).json({
      success: true,
      message: 'Business created successfully',
      data: savedBusiness,
    });
  } catch (error) {
    console.error('Error saving business:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}

module.exports.getDetails = async (req, res) => {
  try {
    const userId = req.params.userId;

    if (!userId) {
      return res.status(200).json({
        error: 'User ID is missing in the request parameters',
        success: false
      });
    }

    const businesses = await Business.find({ userId });

    if (!businesses || businesses.length === 0) {
      return res.status(200).json({
        error: 'No businesses found for the specified user ID',
        success: false
      });
    }

    res.status(200).json({
      data: businesses,
      success: true,
      message: "Data fetched succesfully"
    });
  } catch (error) {
    console.error('Error in getDetails:', error);

    if (error.name === 'CastError' && error.kind === 'ObjectId') {
      return res.status(400).json({
        error: 'Invalid user ID format',
        success: false
      });
    }

    res.status(200).json({
      error: 'Internal Server Error',
      success: false
    });
  }
};
