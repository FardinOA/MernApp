const ErrorHandeler = require("../../utils/errorHandeler");
const catchAssyncErrors = require("../../middleware/catchAssyncErrors");
const Product = require("../models/productModel");
const ApiFeatures = require("../../utils/apiFeatures");
//create product -- admin

exports.createProduct = catchAssyncErrors(async (req, res, next) => {
    req.body.user = req.user.id;

    const product = await Product.create(req.body);
    res.status(200).json({
        success: true,
        product,
    });
});

// get all product
exports.getAllProduct = catchAssyncErrors(async (req, res, next) => {
    const pageLimit = 8;
    const productsCount = await Product.countDocuments();
    const apiFeature = new ApiFeatures(Product.find(), req.query)
        .search()
        .filter()
        .pagination(pageLimit);
    const products = await apiFeature.query;

    res.status(200).json({
        success: true,
        products,
        productsCount,
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

// create new review or update the review on products
exports.createProductReview = catchAssyncErrors(async (req, res, next) => {
    const { rating, comment, productId } = req.body;
    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment,
    };
    const product = await Product.findById(productId);
    const isReviewd = product.reviews.find(
        (rev) => rev.user.toString() === req.user._id.toString()
    );
    if (isReviewd) {
        product.reviews.forEach((rev) => {
            if (rev.user.toString() === req.user._id.toString()) {
                rev.rating = rating;
                rev.comment = comment;
            }
        });
    } else {
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length;
    }
    let sum = 0;

    product.reviews.forEach((rev) => {
        sum += rev.rating;
    });
    product.ratings = sum / product.reviews.length;
    await product.save({ validateBeforeSave: false });

    res.status(200).json({ success: true });
});

// Get all reviews of a product
exports.getAllReviewsOfAProduct = catchAssyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return next(new ErrorHandeler("Product not found", 404));
    }

    res.status(200).json({ success: true, reviews: product.reviews });
});

// delete product related to a product
exports.deleteProductReview = catchAssyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.productId);
    if (!product) {
        return next(new ErrorHandeler("Product not found", 404));
    }
    const reviews = product.reviews.filter(
        (rev) => rev._id.toString() !== req.query.id.toString()
    );

    let sum = 0;

    reviews.forEach((rev) => {
        sum += rev.rating;
    });
    const ratings = sum / reviews.length;
    const numOfReviews = reviews.length;
    await Product.findByIdAndUpdate(
        {
            reviews,
            ratings,
            numOfReviews,
        },
        {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        }
    );
    res.status(200).json({ success: true });
});
