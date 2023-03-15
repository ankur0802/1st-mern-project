const express = require('express')
const app = express()
app.use(express.json());
const errorMiddleware = require('./middleware/error')


// routes import 
const productroutes = require('./routes/productRoutes')
const userroutes = require('./routes/userRoutes')

app.use('/api/v1', productroutes);
app.use('/api/v1', userroutes);

// middleware for Error 
app.use(errorMiddleware)


module.exports = app