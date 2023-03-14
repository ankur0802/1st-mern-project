const express = require('express')
const app = express()
app.use(express.json());


// routes import 
const productroutes = require('./routes/productRoutes')

app.use('/api/v1', productroutes);


module.exports = app