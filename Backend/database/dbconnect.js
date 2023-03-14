const mongoose = require("mongoose");
mongoose.set('strictQuery', false);


const connectDB = async ()=>{
    try{
        const conn = mongoose.connect(process.env.DB_URI);
        console.log('mongodb connect');
        
    }catch(err){
        console.log(err);
        process.exit(1);
    }
};

module.exports = connectDB;