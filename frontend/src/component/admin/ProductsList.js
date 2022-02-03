import React, { Fragment, useEffect } from "react";

import { DataGrid } from "@material-ui/data-grid";
import "./productsList.css";
import { useSelector, useDispatch } from "react-redux";
import {
    clearErrors,
    getAdminProducts,
    deleteProduct,
} from "../../actions/productActions";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Sidebar from "./Sidebar";
import { DELETE_PRODUCT_RESET } from "../../constants/productsConstants.js";
const ProductsList = ({ history }) => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const { error, products } = useSelector((state) => state.products);
    const { error: deleteError, isDeleted } = useSelector(
        (state) => state.product
    );
    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (deleteError) {
            alert.error(deleteError);
            dispatch(clearErrors());
        }
        if (isDeleted) {
            alert.success("Product Deleted successfully");
            history.push("/admin/dashboard");
            dispatch({ type: DELETE_PRODUCT_RESET });
        }

        dispatch(getAdminProducts());
    }, [dispatch, error, alert, deleteError, isDeleted, history]);

    const deleteProductHandeler = (id) => {
        dispatch(deleteProduct(id));
    };

    const columns = [
        {
            field: "id",
            headerName: "Product ID",
            minWidth: 200,
            flex: 0.5,
        },
        {
            field: "name",
            headerName: "Name",
            minWidth: 350,
            flex: 0.7,
        },
        {
            field: "stock",
            headerName: "Stock",
            type: "number",
            minWidth: 150,
            flex: 0.3,
            //    cellClassName: (params) => {
            //        return params.getValue(params.id, "status") === "Delivered"
            //            ? "greenColor"
            //            : "redColor";
            //    },
        },
        {
            field: "price",
            headerName: "Price",
            type: "number",
            minWidth: 270,
            flex: 0.5,
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
                        <Link
                            to={`/admin/product/${params.getValue(
                                params.id,
                                "id"
                            )}`}
                        >
                            <EditIcon />
                        </Link>

                        <Button
                            onClick={() =>
                                deleteProductHandeler(
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
    products &&
        products.forEach((item, ind) => {
            rows.push({
                id: item._id,
                stock: item.stock,
                price: item.price,
                name: item.name,
            });
        });

    return (
        <Fragment>
            <MetaData title="All Products-Admin " />
            <div className="dashboard">
                <Sidebar />
                <div className="productsListContainer">
                    <h1 id="productsListHeading">All Products</h1>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        disableSelectionOnClick
                        autoHeight
                        className="productsListTable"
                        pageSize={10}
                    />
                </div>
            </div>
        </Fragment>
    );
};

export default ProductsList;
