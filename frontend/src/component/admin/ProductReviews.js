import React, { Fragment, useEffect, useState } from "react";

import { DataGrid } from "@material-ui/data-grid";
import "./productsReview.css";
import { useSelector, useDispatch } from "react-redux";
import {
    clearErrors,
    getAllReviews,
    deleteProductReview,
} from "../../actions/productActions";

import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import Star from "@material-ui/icons/Star";
import DeleteIcon from "@material-ui/icons/Delete";
import Sidebar from "./Sidebar";
import { DELETE_REVIEW_RESET } from "../../constants/productsConstants";

const ProductReviews = ({ history }) => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const { error: deleteError, isDeleted } = useSelector(
        (state) => state.review
    );
    const { error, reviews, loading } = useSelector(
        (state) => state.productReviews
    );
    const [productId, setProductId] = useState("");
    useEffect(() => {
        if (productId.length === 24) {
            dispatch(getAllReviews(productId));
        }
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (deleteError) {
            alert.error(deleteError);
            dispatch(clearErrors());
        }
        if (isDeleted) {
            alert.success("Review Deleted successfully");
            history.push("/admin/reviews");
            dispatch({ type: DELETE_REVIEW_RESET });
        }
    }, [dispatch, error, alert, deleteError, isDeleted, history, productId]);

    const deleteReviewtHandeler = (reviewId) => {
        dispatch(deleteProductReview(reviewId, productId));
    };

    const productReviewSubmitHandler = (e) => {
        e.preventDefault();
        dispatch(getAllReviews(productId));
    };

    const columns = [
        {
            field: "id",
            headerName: "Review ID",
            minWidth: 200,
            flex: 0.5,
        },
        {
            field: "user",
            headerName: "User",
            minWidth: 200,
            flex: 0.6,
        },
        {
            field: "comment",
            headerName: "Comment",
            minWidth: 350,
            flex: 1,
        },

        {
            field: "rating",
            headerName: "Rating",
            type: "number",
            minWidth: 180,
            flex: 0.4,
            cellClassName: (params) => {
                return params.getValue(params.id, "rating") >= 3
                    ? "greenColor"
                    : "redColor";
            },
        },
        {
            field: "actions",
            headerName: "Actions",
            type: "number",
            minWidth: 150,
            flex: 0.3,
            sortable: false,
            renderCell: (params) => {
                return (
                    <Fragment>
                        <Button
                            onClick={() =>
                                deleteReviewtHandeler(
                                    params.getValue(params.id, "id")
                                )
                            }
                        >
                            <DeleteIcon />
                        </Button>
                    </Fragment>
                );
            },
        },
    ];

    const rows = [];
    reviews &&
        reviews.forEach((item, ind) => {
            rows.push({
                id: item._id,
                rating: item.rating,
                comment: item.comment,
                user: item.name,
            });
        });

    return (
        <Fragment>
            <MetaData title="All Reviews-Admin " />
            <div className="dashboard">
                <Sidebar />
                <div className="productReviewsContainer">
                    <form
                        className="productReviewsForm"
                        onSubmit={productReviewSubmitHandler}
                    >
                        <h1 className="productReviewsFormHeading">
                            All Reviews
                        </h1>
                        <div>
                            <Star />
                            <input
                                type="text"
                                placeholder="Product Id"
                                required
                                value={productId}
                                onChange={(e) => setProductId(e.target.value)}
                            />
                        </div>

                        <Button
                            id="createProductBtn"
                            type="submit"
                            disabled={
                                loading
                                    ? true
                                    : false || productId === ""
                                    ? true
                                    : false
                            }
                        >
                            Search
                        </Button>
                    </form>

                    {reviews && reviews.length > 0 ? (
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            disableSelectionOnClick
                            autoHeight
                            className="productsListTable"
                            pageSize={10}
                        />
                    ) : (
                        <h1 className="productReviewsFormHeading">
                            No Reviews Yet
                        </h1>
                    )}
                </div>
            </div>
        </Fragment>
    );
};

export default ProductReviews;
