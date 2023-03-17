const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')


app.use(express.json());
app.use(cookieParser())


const errorMiddleware = require('./middleware/error')


// routes import 
const productroutes = require('./routes/productRoutes')
const userroutes = require('./routes/userRoutes')
const orderroutes = require('./routes/orderRoutes')

app.use('/api/v1', productroutes);
app.use('/api/v1', userroutes);
app.use('/api/v1', orderroutes);

// middleware for Error 
app.use(errorMiddleware)


module.exports = app