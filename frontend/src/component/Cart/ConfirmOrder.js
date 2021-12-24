import React, { Fragment } from "react";
import "./confirmOrder.css";
import MetaData from "../layout/MetaData";
import CheckOutStep from "../Cart/CheckOutStep";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { useSelector } from "react-redux";
const ConfirmOrder = ({ history }) => {
    const { shippingInfo, cartItems } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.user);

    const subtotal = cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );
    const shippingCharges = subtotal > 1000 ? 0 : 200;
    const tax = subtotal * 0.05;
    const totalPrice = subtotal + shippingCharges + tax;
    const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;
    const proceedToPayment = () => {
        const data = {
            subtotal,
            shippingCharges,
            tax,
            totalPrice,
        };
        sessionStorage.setItem("orderInfo", JSON.stringify(data));
        history.push("/process/payment");
    };
    return (
        <Fragment>
            <MetaData title="Confirm Order" />
            <CheckOutStep activeStep={1} />
            <div className="confirmOrderPage">
                <div>
                    <div className="confirmShippingArea">
                        <Typography>Shipping Info</Typography>
                        <div className="confirmShippingAreaBox">
                            <div>
                                <p>Name:</p>
                                <span>{user.name}</span>
                            </div>

                            <div>
                                <p>Phone:</p>
                                <span>{user.phoneNo}</span>
                            </div>

                            <div>
                                <p>Address:</p>
                                <span>{address}</span>
                            </div>
                        </div>
                        <div className="confirmCartItems">
                            <Typography>Your Cart Items</Typography>
                            <div className="confirmCartItemsContainer">
                                {cartItems &&
                                    cartItems.map((item) => (
                                        <div key={item.product}>
                                            <img
                                                src={item.image}
                                                alt="Product"
                                            />
                                            <Link
                                                to={`/product/${item.product}`}
                                            >
                                                {item.name}{" "}
                                            </Link>
                                            <span>
                                                {item.quantity} x {item.price} ={" "}
                                                <p>
                                                    {item.price * item.quantity}
                                                </p>
                                            </span>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* //////////////// */}
                <div>
                    <div className="orderSummery">
                        <Typography>Order Summery</Typography>
                        <div>
                            <div>
                                <p>Subtotal:</p>
                                <span>{subtotal}</span>
                            </div>
                            <div>
                                <p>Shipping Charges:</p>
                                <span>{shippingCharges}</span>
                            </div>
                            <div>
                                <p>VAT:</p>
                                <span>{tax}</span>
                            </div>
                        </div>
                        <div className="orderSummaryTotal">
                            <p>
                                <b>Total:</b>
                            </p>
                            <span>{totalPrice}</span>
                        </div>
                        <button onClick={proceedToPayment}>
                            Proceed To Payment
                        </button>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default ConfirmOrder;
