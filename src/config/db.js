  const mongoose = require('mongoose');

  const connectDB = async () => {
    try {
      const uri = "mongodb+srv://juravoyevfirdavs_db_user:Firdavs2026@cluster0.rbort9z.mongodb.net/?retryWrites=true&w=majority";      
      const conn = await mongoose.connect(uri);
      console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (err) {
      console.error('MongoDB connection error:', err.message);
      process.exit(1);
    }
  };

  module.exports = connectDB;