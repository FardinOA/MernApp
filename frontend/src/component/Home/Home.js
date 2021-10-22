import React, { Fragment, useState, useEffect } from "react";
import { CgMouse } from "react-icons/all";
import "./Home.css";
import Product from "./Product.js";
import MetaData from "../layout/MetaData";
import { useSelector, useDispatch } from "react-redux";
import { getProduct } from "../../actions/productActions";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
// const product = {
//     name: "Blue Tshirt",
//     price: "$3433",
//     _id: "73847384783",
//     images: [
//         {
//             url: "data:image/png;base64,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",
//         },
//     ],
// };
const Home = () => {
    const [allProduct, setAllProduct] = useState([]);
    const { loading, error, products, productsCount } = useSelector(
        (state) => state.products
    );
    const alert = useAlert();
    const dispatch = useDispatch();
    useEffect(() => {
        if (error) {
            return alert.error(error);
        }
        dispatch(getProduct());
    }, [dispatch, error]);

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
                                <Product product={product} />
                            ))}
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
};

export default Home;
