const mongoose = require('mongoose');
const { User } = require('./models/User');
require('dotenv').config();

const testUsers = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');
    
    const users = await User.find().select('username email name');
    console.log('Users in database:', users.length);
    users.forEach(user => {
      console.log(`- ${user.username} (${user.email}) - ID: ${user._id}`);
    });
    
    mongoose.connection.close();
  } catch (error) {
    console.error('Error:', error);
  }
};

testUsers();