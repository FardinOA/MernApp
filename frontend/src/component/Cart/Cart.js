import React, { Fragment } from "react";
import "./cart.css";
import CartItemCard from "./CartItemCard";
import { useSelector, useDispatch } from "react-redux";
import { addItemsToCart, removeItemsFromCart } from "../../actions/cartActions";
import { Typography } from "@material-ui/core";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import { Link } from "react-router-dom";
import MetaData from "../layout/MetaData";
const Cart = ({ history }) => {
    const { cartItems } = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const increaseQuantity = (id, quantity, stock) => {
        const newQty = quantity + 1;
        if (stock <= quantity) {
            return;
        }

        dispatch(addItemsToCart(id, newQty));
    };

    const decreaseQuantity = (id, quantity) => {
        const newQty = quantity - 1;

        if (1 >= quantity) {
            return;
        }

        dispatch(addItemsToCart(id, newQty));
    };

    const deleteCartItems = (id) => {
        dispatch(removeItemsFromCart(id));
    };
    const checkoutHandler = () => {
        history.push("/login?redirect=shipping");
    };
    return (
        <Fragment>
            <MetaData title={`Cart`} />
            {cartItems.length === 0 ? (
                <div className="emptyCart">
                    <RemoveShoppingCartIcon />
                    <Typography>No Product in Your Cart</Typography>
                    <Link to="/products">View Product</Link>
                </div>
            ) : (
                <Fragment>
                    <div className="cartPage">
                        <div className="cartHeader">
                            <p>Product</p>
                            <p>Quantity</p>
                            <p>Subtotal</p>
                        </div>
                        <div className="cartContainer">
                            {cartItems &&
                                cartItems.map((item) => (
                                    <Fragment key={item.product}>
                                        <CartItemCard
                                            item={item}
                                            deleteCartItems={deleteCartItems}
                                        />
                                        <div className="cartInput">
                                            <button
                                                onClick={() =>
                                                    decreaseQuantity(
                                                        item.product,
                                                        item.quantity
                                                    )
                                                }
                                            >
                                                -
                                            </button>
                                            <input
                                                type="number"
                                                readOnly
                                                value={item.quantity}
                                            />
                                            <button
                                                onClick={() =>
                                                    increaseQuantity(
                                                        item.product,
                                                        item.quantity,
                                                        item.stock
                                                    )
                                                }
                                            >
                                                +
                                            </button>
                                        </div>
                                        <p className="subtotal">
                                            {item.quantity * item.price}
                                        </p>
                                    </Fragment>
                                ))}
                        </div>
                        <div className="cartGross">
                            <div></div>
                            <div className="cartGrossBox">
                                <p>Gross Total</p>
                                <p>
                                    {cartItems?.reduce(
                                        (acc, item) =>
                                            acc + item.quantity * item.price,
                                        0
                                    )}
                                </p>
                            </div>
                            <div></div>
                            <div className="checkOutButton">
                                <button onClick={checkoutHandler}>
                                    Check Out
                                </button>
                            </div>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
};

export default Cart;
