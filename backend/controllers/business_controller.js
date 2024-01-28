const Business= require('../models/business')
const Users=require('../models/user')
const mongoose=require('mongoose')
module.exports.addDetails = async (req, res) => {
    try {
        const { userId, name,address,email,website,contactPerson,phoneNumber } = req.body;
        console.log(userId);

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({
              success: false,
              message: 'Invalid userId provided',
            });
          }
      
          const existingUser = await Users.findOne({ _id: new mongoose.Types.ObjectId(userId) });
      
          if (!existingUser) {
            return res.status(404).json({
              success: false,
              message: 'User not found. Business creation failed.',
            });
          }

          const existingBusinessWithWebsite = await Business.findOne({ website });

          if (existingBusinessWithWebsite) {
              return res.status(400).json({
                  success: false,
                  message: 'Website already associated with another business. Please provide a unique website.',
              });
          }
        const business = new Business({ userId, name,address,email,website,contactPerson,phoneNumber /* add other fields here */ });
        const savedBusiness = await business.save();
        res.status(201).json({
          success: true,
          message: 'Business created successfully',
          data: savedBusiness,
        });
      } catch (error) {
        console.error('Error saving business:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
      }
}

module.exports.getDetails=async(req,res)=>{
    try {
        const userId = req.params.userId;
        const businesses = await Business.find({ userId });
        res.json(businesses);
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
      }
}