import React, { useEffect, Fragment, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { getProduct, clearErrors } from "../../actions/productActions";
import ProductCard from "../Home/ProductCard";
import Loader from "../layout/Loader/Loader";
import "./products.css";
import Pagination from "react-js-pagination";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import MetaData from "../layout/MetaData";

const categories = [
    "All Categories",
    "laptop",
    "Computer",
    "Tops",
    "Smartphone",
    "T-Shirt",
    "Pant",
    "Shirt",
    "TV",
    "Sports",
];

const Products = ({ match }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [price, setPrice] = useState([0, 10000]);
    const [category, setCategory] = useState("");
    const [ratings, setRatings] = useState(0);

    const alert = useAlert();
    const {
        loading,
        products,
        error,
        resultPerPage,
        productsCount,
        filteredProductsCount,
    } = useSelector((state) => state.products);

    const dispatch = useDispatch();

    const keyword = match.params.keyword;

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
        dispatch(getProduct(keyword, currentPage, price, category, ratings));
    }, [
        dispatch,
        keyword,
        currentPage,
        price,
        category,
        ratings,
        alert,
        error,
    ]);

    const priceHandeler = (e, newPrice) => {
        setPrice(newPrice);
    };

    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <MetaData title="PRODUCTS" />
                    <h2 className="productsHeading">Products</h2>
                    <div className="products">
                        {products?.map((ele) => (
                            <ProductCard key={ele._id} product={ele} />
                        ))}
                    </div>

                    <div className="filterBox">
                        <Typography>Price</Typography>
                        <Slider
                            value={price}
                            onChange={priceHandeler}
                            valueLabelDisplay="auto"
                            aria-labelledby="range-slider"
                            min={0}
                            max={10000}
                        />
                        <Typography>Categories</Typography>
                        <ul className="categoryBox">
                            {categories.map((ele) => (
                                <li
                                    key={ele}
                                    className={
                                        ele === category
                                            ? "category-link activeCategory"
                                            : "category-link"
                                    }
                                    onClick={() =>
                                        setCategory(
                                            ele === "All Categories" ? "" : ele
                                        )
                                    }
                                >
                                    {ele}
                                </li>
                            ))}
                        </ul>
                        <fieldset>
                            <Typography component="legend">Rating</Typography>
                            <Slider
                                value={ratings}
                                onChange={(e, newRating) =>
                                    setRatings(newRating)
                                }
                                valueLabelDisplay="auto"
                                aria-labelledby="continuous-slider"
                                min={0}
                                max={5}
                            />
                        </fieldset>
                    </div>

                    {resultPerPage < filteredProductsCount && (
                        <div className="paginationBox">
                            <Pagination
                                activePage={currentPage}
                                itemsCoutnPerPage={resultPerPage}
                                totalItemsCount={
                                    productsCount > filteredProductsCount
                                        ? filteredProductsCount
                                        : productsCount
                                }
                                nextPageText="Next"
                                prevPageText="Prev"
                                lastPageText="Last"
                                firstPageText="First"
                                itemClass="page-item"
                                linkClass="page-link"
                                activeClass="pageActive"
                                activeLinkClass="pageLinkActive"
                                onChange={(e) => setCurrentPage(e)}
                            />
                        </div>
                    )}
                </Fragment>
            )}
        </Fragment>
    );
};

export default Products;
