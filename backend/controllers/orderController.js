const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const Errorhandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

// Create new order
exports.newOrder = catchAsyncErrors(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });

  res.status(201).json({
    success: true,
    order,
  });
});





// Get Single order 
exports.getSingleOrder = catchAsyncErrors (async (req, res, next)=>{

    const order = await Order.findById(req.params.id).populate('user', 'name email')

    if(!order){
        return next(new Errorhandler('Order not found with this id', 404))
    }

    res.status(200).json({
        success:true,
        order
    })

})

// Get logged in user Orders 
exports.myOrder = catchAsyncErrors (async (req, res, next)=>{

    const orders = await Order.find({user: req.user._id})

    res.status(200).json({
        success:true,
        orders 
    })


})


// Get All order -- Admin 
exports.getAllOrder = catchAsyncErrors (async (req, res, next)=>{

    const orders = await Order.find();

    let totalAmount = 0;

    orders.forEach((order)=>{
        totalAmount+=order.totalPrice;
    })

    res.status(200).json({
        success:true,
        orders ,
        totalAmount
    })

})


// Update order Status -- Admin 
exports.updateOrder = catchAsyncErrors (async (req, res, next)=>{

    const order = await Order.findById(req.params.id);

    if(!order){
        return next(new Errorhandler('Order not found with this id', 404))
    }

    

    if(order.orderStatus === 'Delivered'){
        return next(new Errorhandler('You have already delivered this Order', 400))
    }

    order.orderItems.forEach(async (ord)=>{
        await updateStock(ord.product, ord.quantity)
       
    })

    order.orderStatus = req.body.status;

    if(req.body.status === 'Delivered'){
        order.deliveredAt = Date.now();
    }
    await order.save({validateBeforeSave:false})

    res.status(200).json({
        success:true,
       
    })

})

async function updateStock(id, quantity){
  
    const product = await Product.findById(id);

    product.stock-=quantity;

    await product.save({ validateBeforeSave: false });}



//delete order -- Admin 
exports.deleteOrder = catchAsyncErrors (async (req, res, next)=>{

    const order = await Order.findb(req.params.id);

    if(!order){
        return next(new Errorhandler('Order not found with this id', 404))
    }

   await order.remove();

    res.status(200).json({
        success:true,
        
    })

})