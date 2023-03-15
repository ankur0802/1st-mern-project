const Product = require("../models/productModel");
const Errorhandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apiFeatures");

// create product -- Admin
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.create(req.body);
  res.status(201).json({ success: true, product });
});

// get all product
exports.getAllProducts = catchAsyncErrors(async (req, res, next) => {
  const resultPerPage = 5;
  const productCount = await Product.countDocuments()
  

  const apifeatures = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);

  const products = await apifeatures.query;

  res.status(200).json({ success: true, products, productCount });
});

// update product -- Admin
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new Errorhandler("Product not Found", 404));
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

  const deletedProduct = await Product.findByIdAndDelete(req.params.id);
  res
    .status(200)
    .json({ success: true, message: "Product Deleted SuccessFully" });
});
