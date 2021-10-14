const ErrorHandeler = require("../../utils/errorHandeler");
const catchAssyncErrors = require("../../middleware/catchAssyncErrors");
const Product = require("../models/productModel");
const ApiFeatures = require("../../utils/apiFeatures");
//create product -- admin

exports.createProduct = catchAssyncErrors(async (req, res, next) => {
    const product = await Product.create(req.body);
    res.status(200).json({
        success: true,
        product,
    });
});

// get all product
exports.getAllProduct = catchAssyncErrors(async (req, res, next) => {
    const pageLimit = 5;
    const productCount = await Product.countDocuments();
    const apiFeature = new ApiFeatures(Product.find(), req.query)
        .search()
        .filter()
        .pagination(pageLimit);
    const products = await apiFeature.query;
    res.status(200).json({
        success: true,
        products,
        productCount,
    });
});

// update product --- admin
exports.updateProduct = catchAssyncErrors(async (req, res, next) => {
    const _id = req.params.id;
    let product = await Product.findById({ _id });
    if (!product) {
        return next(new ErrorHandeler("Product not found", 404));
    }
    const updatedProduct = await Product.findByIdAndUpdate(
        { _id },
        {
            $set: req.body,
            updatedAt: new Date(),
        },
        {
            multi: true,
            new: true,
            runValidators: true,
            useFindAndModify: true,
        }
    );

    res.status(200).json({
        success: true,
        product: updatedProduct,
    });
});

//delete product -- admin only

exports.deleteProduct = catchAssyncErrors(async (req, res, next) => {
    const _id = req.params.id;
    let product = await Product.findById(_id);
    if (!product) {
        return next(new ErrorHandeler("Product not found", 404));
    }

    await Product.findByIdAndDelete({ _id });
    res.status(200).json({
        success: true,
        message: "product delete successfully",
    });
});
// get single product
exports.getSingleProduct = catchAssyncErrors(async (req, res, next) => {
    const _id = req.params.id;
    let product = await Product.findById(_id);
    if (!product) {
        return next(new ErrorHandeler("Product not found", 404));
    }

    res.status(200).json({
        success: true,
        product,
    });
});
