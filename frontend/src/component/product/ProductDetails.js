import React, { Fragment, useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import { useSelector, useDispatch } from "react-redux";
import "./productDetails.css";
import { getProductDetails, clearErrors } from "../../actions/productActions";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import ReactStars from "react-rating-stars-component";
import ReviewCard from "./ReviewCard.js";
import MetaData from "../layout/MetaData";
import { addItemsToCart } from "../../actions/cartActions";
const ProductDetails = ({ match }) => {
    const [quantity, setQuantity] = useState(1);
    const id = match.params.id;

    const alert = useAlert();
    const { product, loading, error } = useSelector(
        (state) => state.productDetails
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
        dispatch(getProductDetails(id));
    }, [dispatch, error, alert, id]);

    const options = {
        edit: false,
        color: "rgb(20,20,20,0.1)",
        activeColor: "tomato",
        size: window.innerWidth < 600 ? 20 : 30,
        value: product.ratings,
        isHalf: true,
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
                                <ReactStars {...options} />
                                <span>({product?.numOfReviews}) Reviews</span>
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
                                    <button onClick={addToCartHandeler}>
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
                            <button className="submitReview">
                                Submit Review
                            </button>
                        </div>
                    </div>
                    <h3 className="reviewsHeading"> Reviews </h3>
                    {product?.reviews && product?.reviews[0] ? (
                        <div className="reviews">
                            {product?.reviews &&
                                product.reviews?.map((ele, ind) => (
                                    <ReviewCard review={ele} />
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
