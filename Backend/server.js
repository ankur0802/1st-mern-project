const app = require('./app')

const dotenv = require('dotenv')
const connectDB = require('./database/dbconnect')

// config 
dotenv.config({path:'Backend/config/config.env'})



// connecting Database
connectDB();


app.listen(process.env.PORT, ()=>{
    console.log(`server listening at port ${process.env.PORT}`);
})