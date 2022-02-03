import React, { Fragment, useEffect } from "react";

import { DataGrid } from "@material-ui/data-grid";
import "./productsList.css";
import { useSelector, useDispatch } from "react-redux";

import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Sidebar from "./Sidebar";
import {
    deleteUser,
    getAllUsers,
    clearErrors,
    getUserDetails,
} from "../../actions/userActions";
import { DELETE_USER_RESET } from "../../constants/userConstants";
const UsersList = ({ history }) => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const { error, users } = useSelector((state) => state.allUsers);

    const {
        error: deleteError,
        isDeleted,
        message: successDeleteMessage,
    } = useSelector((state) => state.profile);
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
            alert.success(successDeleteMessage);
            history.push("/admin/users");
            dispatch({ type: DELETE_USER_RESET });
        }

        dispatch(getAllUsers());
    }, [
        dispatch,
        error,
        alert,
        deleteError,
        isDeleted,
        successDeleteMessage,
        history,
    ]);

    const deleteUserHandeler = (id) => {
        dispatch(deleteUser(id));
    };
    const loadUserDetails = (id) => {
        dispatch(getUserDetails(id));
    };

    const columns = [
        {
            field: "id",
            headerName: "User ID",
            minWidth: 180,
            flex: 0.6,
        },
        {
            field: "email",
            headerName: "Email",
            minWidth: 200,
            flex: 0.7,
        },
        {
            field: "name",
            headerName: "Name",

            minWidth: 150,
            flex: 0.5,
        },
        {
            field: "role",
            headerName: "Role",
            type: "number",
            minWidth: 150,
            flex: 0.3,
            cellClassName: (params) => {
                return params.getValue(params.id, "role") === "admin"
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
                        <Link
                            to={`/admin/user/${params.getValue(
                                params.id,
                                "id"
                            )}`}
                        >
                            <EditIcon
                                onClick={loadUserDetails(
                                    params.getValue(params.id, "id")
                                )}
                            />
                        </Link>

                        <Button
                            onClick={() =>
                                deleteUserHandeler(
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
    users &&
        users.forEach((item, ind) => {
            rows.push({
                id: item._id,
                role: item.role,
                email: item.email,
                name: item.name,
            });
        });

    return (
        <Fragment>
            <MetaData title="All Users-Admin " />
            <div className="dashboard">
                <Sidebar />
                <div className="productsListContainer">
                    <h1 id="productsListHeading">All Users</h1>
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

export default UsersList;
