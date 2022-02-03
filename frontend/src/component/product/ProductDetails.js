import React, { Fragment, useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import { useSelector, useDispatch } from "react-redux";
import "./productDetails.css";
import {
    getProductDetails,
    clearErrors,
    newReview,
} from "../../actions/productActions";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";

import ReviewCard from "./ReviewCard.js";
import MetaData from "../layout/MetaData";
import { addItemsToCart } from "../../actions/cartActions";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import { NEW_REVIEW_RESET } from "../../constants/productsConstants";
const ProductDetails = ({ match }) => {
    const [quantity, setQuantity] = useState(1);
    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const id = match.params.id;

    const alert = useAlert();
    const { product, loading, error } = useSelector(
        (state) => state.productDetails
    );

    const { success, error: reviewError } = useSelector(
        (state) => state.newReview
    );

    const dispatch = useDispatch();

    const increaseQuantity = () => {
        if (product.stock <= quantity) return;
        setQuantity(quantity + 1);
    };
    const decreaseQuantity = () => {
        if (quantity === 1) return;
        setQuantity(quantity - 1);
    };

    const addToCartHandeler = (e) => {
        e.preventDefault();
        dispatch(addItemsToCart(match.params.id, quantity));
        alert.success("Item Added To Cart");
    };

    const submitReviewToggel = () => {
        open ? setOpen(false) : setOpen(true);
    };

    const reviewSubmitHandler = () => {
        const myFrom = new FormData();
        myFrom.set("rating", rating);
        myFrom.set("comment", comment);
        myFrom.set("productId", match.params.id);
        dispatch(newReview(myFrom));
        setOpen(false);
    };

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
        });
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (reviewError) {
            alert.error(reviewError);
            dispatch(clearErrors());
        }
        if (success) {
            alert.success("Review Submitted successfully");
            dispatch({ type: NEW_REVIEW_RESET });
        }
        dispatch(getProductDetails(id));
    }, [dispatch, error, alert, id, success, reviewError]);

    const options = {
        size: "large",
        value: product.ratings,
        readOnly: true,
        precision: 0.5,
    };

    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <MetaData title={`${product.name}`} />{" "}
                    <div className="productDetails">
                        <div>
                            <Carousel>
                                {product &&
                                    product.images?.map((ele, ind) => (
                                        <img
                                            key={ele.url}
                                            src={ele.url}
                                            alt={`${ind + 1} Slide`}
                                            className="CarouselImage"
                                        />
                                    ))}
                            </Carousel>
                        </div>
                        <div>
                            <div className="detailsBlock-1">
                                <h2>{product?.name}</h2>
                                <p>Product # {product?._id}</p>
                            </div>
                            <div className="detailsBlock-2">
                                <Rating {...options} />
                                <span className="detailsBlock-2-span">
                                    ({product?.numOfReviews}) Reviews
                                </span>
                            </div>
                            <div className="detailsBlock-3">
                                <h1>${product?.price}</h1>
                                <div className="detailsBlock-3-1">
                                    <div className="detailsBlock-3-1-1">
                                        <button onClick={decreaseQuantity}>
                                            -
                                        </button>
                                        <input
                                            readOnly
                                            value={quantity}
                                            type="number"
                                        />
                                        <button onClick={increaseQuantity}>
                                            +
                                        </button>
                                    </div>
                                    <button
                                        disabled={
                                            product.stock < 1 ? true : false
                                        }
                                        onClick={addToCartHandeler}
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                                <p>
                                    Status:{" "}
                                    <b
                                        className={
                                            product?.stock < 1
                                                ? "redColor"
                                                : "greenColor"
                                        }
                                    >
                                        {" "}
                                        {product?.stock < 1
                                            ? "OutOfStock"
                                            : "InStock"}
                                    </b>
                                </p>
                            </div>
                            <div className="detailsBlock-4">
                                Description: <p>{product?.description}</p>
                            </div>
                            <button
                                onClick={submitReviewToggel}
                                className="submitReview"
                            >
                                Submit Review
                            </button>
                        </div>
                    </div>
                    <h3 className="reviewsHeading"> Reviews </h3>
                    <Dialog
                        aria-labelledby="simple-dialog-title"
                        open={open}
                        onClose={submitReviewToggel}
                    >
                        <DialogTitle>Submit Review</DialogTitle>
                        <DialogContent className="submitDialog">
                            <Rating
                                onChange={(e) => setRating(e.target.value)}
                                value={rating}
                                size="large"
                            />
                            <textarea
                                className="submitDialogTextArea"
                                cols="30"
                                rows="5"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            ></textarea>
                        </DialogContent>
                        <DialogActions>
                            <Button
                                onClick={submitReviewToggel}
                                color="secondary"
                            >
                                Cancle
                            </Button>
                            <Button
                                onClick={reviewSubmitHandler}
                                color="primary"
                            >
                                Submit
                            </Button>
                        </DialogActions>
                    </Dialog>
                    {product?.reviews && product?.reviews[0] ? (
                        <div className="reviews">
                            {product?.reviews &&
                                product.reviews?.map((ele, ind) => (
                                    <ReviewCard review={ele} key={ind} />
                                ))}
                        </div>
                    ) : (
                        <p className="noReciews">No Reviews Yet</p>
                    )}
                </Fragment>
            )}
        </Fragment>
    );
};

export default ProductDetails;
