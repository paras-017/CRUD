const mongoose = require('mongoose');
const connectToDb = async() => {
   try { 
    await mongoose.connect(process.env.DB_URL)
    console.log('connected to database')
    
   } catch (error) {
    console.log('db connection error', error)
   }
}