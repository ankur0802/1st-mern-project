const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const dotenv = require("dotenv");
const fileUpload = require('express-fileupload')
const path = require('path')


const errorMiddleware = require('./middleware/error')

// config
dotenv.config({ path: "backend/config/config.env" });


// app.use(express.json({limit: '50mb'}));
// app.use(express.urlencoded({limit: '50mb'}));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(cookieParser())
// app.use(bodyParser.urlencoded({extended:true}))
app.use(fileUpload())

// static files 

app.use(express.static(path.join(__dirname, '../frontend/build')))

app.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname, '../frontend/build/index.html'))

})




// routes import 
const productroutes = require('./routes/productRoutes')
const userroutes = require('./routes/userRoutes')
const orderroutes = require('./routes/orderRoutes')
const paymentroutes = require('./routes/paymentRoutes')

app.use('/api/v1', productroutes);
app.use('/api/v1', userroutes);
app.use('/api/v1', orderroutes);
app.use('/api/v1', paymentroutes);



// middleware for Error 
app.use(errorMiddleware)


module.exports = app