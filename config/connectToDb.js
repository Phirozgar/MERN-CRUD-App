if(process.env.NODE_ENV != "production") { // can have values development/testing/staging/production
    require("dotenv").config();
}

const mongoose = require("mongoose");

async function connectToDb() {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log('Connected to database...');
    } catch (err) {
    console.error(err);
  }
}

module.exports = connectToDb;