import React, { Fragment, useEffect } from "react";
import { CgMouse } from "react-icons/all";
import "./Home.css";
import ProductCard from "./ProductCard";
import MetaData from "../layout/MetaData";
import { useSelector, useDispatch } from "react-redux";
import { getProduct, clearErrors } from "../../actions/productActions";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";

const Home = () => {
    const { loading, error, products } = useSelector((state) => state.products);
    const alert = useAlert();
    const dispatch = useDispatch();
    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(getProduct());
    }, [dispatch, error, alert]);

    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <MetaData title="Home Page" />
                    <div className="banner">
                        <p>Welcome To Ecommerce</p>
                        <h1>FIND AMAZING PRODUCTS BELOW</h1>
                        <a href="#container">
                            <button>
                                Scroll <CgMouse />
                            </button>
                        </a>
                    </div>
                    <h2 className="homeHeading">Featured Products</h2>
                    <div className="container" id="container">
                        {products &&
                            products.map((product, ind) => (
                                <ProductCard product={product} key={ind} />
                            ))}
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
};

export default Home;
