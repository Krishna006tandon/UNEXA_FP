require("dotenv").config();
const mongoose = require("mongoose");
const { Chat } = require("../models/Chat");
const { connectDB } = require("../config/db");

const cleanChats = async () => {
  try {
    await connectDB();
    
    console.log('Finding chats with null or invalid members...');
    const chats = await Chat.find({});
    
    let cleanedCount = 0;
    let deletedCount = 0;
    
    for (const chat of chats) {
      const originalMembers = [...chat.members];
      
      // Filter out null, undefined, and empty string values
      const validMembers = chat.members.filter(
        member => member && member !== null && member !== undefined && member !== ''
      );
      
      // Delete chats with less than 2 valid members
      if (validMembers.length < 2) {
        console.log(`Deleting chat ${chat._id}: Only ${validMembers.length} valid member(s)`);
        await Chat.deleteOne({ _id: chat._id });
        deletedCount++;
        continue;
      }
      
      // Update chats that had null members
      if (validMembers.length !== originalMembers.length) {
        console.log(`Cleaning chat ${chat._id}: ${originalMembers.length} -> ${validMembers.length} members`);
        chat.members = validMembers;
        await chat.save();
        cleanedCount++;
      }
    }
    
    console.log(`\nResults:`);
    console.log(`- Cleaned ${cleanedCount} chats with null/invalid members`);
    console.log(`- Deleted ${deletedCount} chats with insufficient members`);
    process.exit(0);
  } catch (error) {
    console.error('Error cleaning chats:', error);
    process.exit(1);
  }
};

cleanChats();
