import React, { Fragment, useEffect } from "react";
import Carousel from "react-material-ui-carousel";
import { useSelector, useDispatch } from "react-redux";
import "./productDetails.css";
import { getProductDetails } from "../../actions/productActions";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
const ProductDetails = ({ match }) => {
    const id = match.params.id;
    console.log(id);
    const alert = useAlert();
    const { product, loading, error } = useSelector(
        (state) => state.productDetails
    );
    const dispatch = useDispatch();
    useEffect(() => {
        if (error) {
            return alert.error(error);
        }
        dispatch(getProductDetails(id));
    }, [dispatch, error, alert, id]);
    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    {" "}
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
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
};

export default ProductDetails;
