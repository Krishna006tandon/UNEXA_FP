const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { User } = require('../models/User');

dotenv.config();

const dropPhoneIndex = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');
    
    // Drop the phone index
    await User.collection.dropIndex('phone_1');
    console.log('Phone index dropped successfully');
    
    mongoose.connection.close();
  } catch (error) {
    console.error('Error dropping phone index:', error);
    process.exit(1);
  }
};

dropPhoneIndex();
