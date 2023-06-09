const Product = require("../models/productModel");
const Errorhandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apiFeatures");
const cloudinary = require('cloudinary')


// create product -- Admin
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
 
  let images = [];

  if(typeof req.body.images === 'string'){
    images.push(req.body.images)
  }else{
    images = req.body.images;
  }


  let imagesLink = [];

  for(let i = 0; i < images.length; i++){
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: 'products'
    });
    imagesLink.push({
      public_id : result.public_id,
      url : result.secure_url,
    })
   

  }



  req.body.images = imagesLink;

  req.body.user = req.user.id;

  const product = await Product.create(req.body);
  res.status(201).json({ success: true, product });
});

// get all product
exports.getAllProducts = catchAsyncErrors(async (req, res, next) => {
  
 
  const resultPerPage = 8;
  const productCount = await Product.countDocuments()
  

  const apifeatures = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
   let products = await apifeatures.query.clone();
   let filteredProductsCount = products.length;
   apifeatures.pagination(resultPerPage);

   products = await apifeatures.query;

  res.status(200).json({ success: true, products, productCount, resultPerPage , filteredProductsCount});
});


// get all product --(ADMIN)
exports.getAdminProducts = catchAsyncErrors(async (req, res, next) => {
  
 
 const products = await Product.find()

  res.status(200).json({ success: true, products});
});

// update product -- Admin
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new Errorhandler("Product not Found", 404));
  }

  // Images start here 
  let images = [];

  if(typeof req.body.images === 'string'){
    images.push(req.body.images);
  }else{
    images = req.body.images;
  }

  if(images != undefined){

    // Deleting Images from cloudinary 
    for(let i = 0; i < product.images.length ; i++){
      await cloudinary.v2.uploader.destroy(product.images[i].public_id)
    }

    const imagesLink = [];

    for(let i = 0; i< images.length; i++){
      const result = await cloudinary.v2.uploader.upload(images[i],{
        folder: 'products',
      })

      imagesLink.push({
        public_id: result.public_id,
        url: result.url
      })

      req.body.images = imagesLink;

    }


  }

  

  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true }
  );
  res.status(200).json({ success: true, updatedProduct });
});

// get product details
exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new Errorhandler("Product not Found", 404));
  }
  res.status(200).json({ success: true, product });
});

// delete product --Admin
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new Errorhandler("Product not Found", 404));
  }

  //  Deleting images from cloudinary 
  for (let i = 0; i < product.images.length; i++) {
   await cloudinary.v2.uploader.destroy(product.images[i].public_id)
    
  }

  const deletedProduct = await Product.findByIdAndDelete(req.params.id);
  res
    .status(200)
    .json({ success: true, message: "Product Deleted SuccessFully" });
});


// Create new review or update the review 

exports.createProductReview = catchAsyncErrors (async (req, res, next)=>{

  const {rating, comment, productId} = req.body;


  const review = {
    user:req.user._id,
    name:req.user.name,
    rating:Number(rating),
    comment
  }

  const product = await Product.findById(productId);

  const isReviewed = product.reviews.find(rev=>rev.user.toString()===req.user._id.toString());


  if(isReviewed){
    product.reviews.forEach((rev)=>{
      if(rev.user.toString()===req.user._id.toString()){
        rev.rating = rating,
        rev.comment = comment
      }
    })


  }else{
    product.reviews.push(review)
    product.numOfReviews = product.reviews.length
  }

  let avg = 0;
  product.reviews.forEach((rev)=>{
    avg+=rev.rating;
  })

  product.ratings = avg/product.reviews.length;
  

  product.save({validateBeforeSave:false})
  

  res.status(200).json({
    success:true
  })

})


// Get all reviews of a single product 
exports.getProsuctReviews = catchAsyncErrors (async (req, res, next)=>{

  const product = await Product.findById(req.query.id);

  if(!product){
    return next(new Errorhandler('Product Not Found', 404))
  }

  res.status(200).json({
    success:true,
    reviews:product.reviews
  })

})


// Delete review 

exports.deleteReview = catchAsyncErrors (async (req, res, next)=>{

  const product = await Product.findById(req.query.productId);
  if(!product){
    return next (new Errorhandler ('Product not found', 404))
  }

  const reviews = product.reviews.filter((rev)=>rev._id.toString() !== req.query.id.toString());

  let avg = 0;
  reviews.forEach((rev)=>{
    avg+=rev.rating;
  })

  let ratings = 0;

  if (reviews.length === 0) {
    ratings = 0;
  } else {
    ratings = avg / reviews.length;
  }


  const numOfReviews =reviews.length;

  await Product.findByIdAndUpdate(req.query.productId, {reviews, ratings, numOfReviews}, {new:true, runValidators:true})
  

  res.status(200).json({
    success:true
  })

})


