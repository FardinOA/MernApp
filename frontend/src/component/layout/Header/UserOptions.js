import React, { Fragment, useState } from "react";
import "./Header.css";
import { SpeedDial, SpeedDialAction } from "@material-ui/lab";
import BackDrop from "@material-ui/core/Backdrop";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListAltIcon from "@material-ui/icons/ListAlt";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useHistory } from "react-router-dom";
import { useAlert } from "react-alert";
import { useSelector } from "react-redux";
import { logOut } from "../../../actions/userActions";
import store from "../../../store";
const UserOptions = ({ user }) => {
    const { cartItems } = useSelector((state) => state.cart);
    const [open, setOpen] = useState(false);
    const history = useHistory();
    const alert = useAlert();
    const dashboard = () => {
        history.push("/admin/dashboard");
    };
    const account = () => {
        history.push("/account");
    };
    const orders = () => {
        history.push("/orders");
    };
    const cart = () => {
        history.push("/cart");
    };
    const logout = () => {
        store.dispatch(logOut());

        alert.success("Logout success");
        history.push("/login");
    };
    return (
        <Fragment>
            <BackDrop style={{ zIndex: "10" }} open={open} />
            <SpeedDial
                className="speedDail"
                ariaLabel="SpeedDial tooltip example"
                open={open}
                onOpen={() => setOpen(true)}
                onClose={() => setOpen(false)}
                direction="down"
                style={{ zIndex: "11" }}
                icon={
                    <img
                        className="speedDialIcon"
                        src={user.avatar.url ? user.avatar.url : "/profile.png"}
                        alt="Profile"
                    />
                }
            >
                {user.role === "admin" && (
                    <SpeedDialAction
                        icon={<DashboardIcon />}
                        tooltipTitle="Dashboard"
                        onClick={dashboard}
                        tooltipOpen={window.innerWidth <= 600 ? true : false}
                    />
                )}
                <SpeedDialAction
                    icon={<PersonIcon />}
                    tooltipTitle="Profile"
                    onClick={account}
                    tooltipOpen={window.innerWidth <= 600 ? true : false}
                />
                <SpeedDialAction
                    icon={
                        <ShoppingCartIcon
                            style={{
                                color:
                                    cartItems.length > 0 ? "tomato" : "unset",
                            }}
                        />
                    }
                    tooltipTitle={`Cart(${cartItems.length})`}
                    onClick={cart}
                    tooltipOpen={window.innerWidth <= 600 ? true : false}
                />
                <SpeedDialAction
                    icon={<ListAltIcon />}
                    tooltipTitle="Orders"
                    onClick={orders}
                    tooltipOpen={window.innerWidth <= 600 ? true : false}
                />
                <SpeedDialAction
                    icon={<ExitToAppIcon />}
                    tooltipTitle="Logout"
                    onClick={logout}
                    tooltipOpen={window.innerWidth <= 600 ? true : false}
                />
            </SpeedDial>
        </Fragment>
    );
};

export default UserOptions;
