const Product = require('../models/productModel')

// create product -- Admin
exports.createProduct = async (req, res, next)=>{
    try{
        const product = await Product.create(req.body)
        res.status(201).json({success:true, product})
    }catch{
        res.status(500).json(err);
    }
}

// get all product 
exports.getAllProducts = async (req, res)=>{
    try{
        const products = await Product.find();
        res.status(200).json({success:true, products})
    }catch{
        res.status(500).json(err)
    }
}

// update product -- Admin
exports.updateProduct = async (req, res, next)=>{

    try{
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {$set:req.body}, {new: true})
        res.status(200).json({success:true, updatedProduct})
    }catch{
        res.status(500).json(err)

    }
}

// get product details 
exports.getProductDetails = async (req, res)=>{
    try{
        const product = await Product.findById(req.params.id)
        if(!product) return res.status(400).json({success:false, message:'Product not found'})
        res.status(200).json({success:true, product})

    }catch{
        res.status(500).json(err)

    }
}



// delete product --Admin 
exports.deleteProduct = async(req, res, next)=>{
    try{
        const deletedProduct = await Product.findByIdAndDelete(req.params.id)
        res.status(200).json({success:true, message:"Product Deleted SuccessFully" })
    }catch{
        res.status(500).json(err)
    }
}