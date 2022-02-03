import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "./component/layout/Header/Header";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import webfont from "webfontloader";
import Footer from "./component/layout/Footer/Footer";
import Home from "./component/Home/Home";
import Products from "./component/product/Products";
import ProductDetails from "./component/product/ProductDetails";
import Search from "./component/product/Search.js";
import LoginSignUp from "./component/user/LoginSignUp";
import store from "./store";
import { loadUser } from "./actions/userActions";
import UserOptions from "./component/layout/Header/UserOptions";
import Profile from "./component/user/Profile";
import { useSelector } from "react-redux";
import ProtectedRoute from "./component/Route/ProtectedRoute";
import UpdateProfile from "./component/user/UpdateProfile";
import UpdatePassword from "./component/user/UpdatePassword";
import ForgotPassword from "./component/user/ForgotPassword";
import ResetPassword from "./component/user/ResetPassword";
import Shipping from "./component/Cart/Shipping.js";
import Cart from "./component/Cart/Cart";
import ConfirmOrder from "./component/Cart/ConfirmOrder";
import Payment from "./component/Cart/Payment.js";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./component/Cart/OrderSuccess.js";
import MyOrders from "./component/Cart/MyOrders.js";
import OrderDetails from "./component/Cart/OrderDetails.js";
import Dashboard from "./component/admin/Dashboard.js";
import ProductsList from "./component/admin/ProductsList.js";
import NewProduct from "./component/admin/NewProduct";
import UpdateProduct from "./component/admin/UpdateProduct";
import OrderList from "./component/admin/OrderList";
import ProcessOrder from "./component/admin/ProcessOrder";
import UsersList from "./component/admin/UsersList";
import UpdateUser from "./component/admin/UpdateUser";
import ProductReviews from "./component/admin/ProductReviews";
import About from "./component/layout/About/About";
import Contact from "./component/layout/Contact/Contact";
import NotFound from "./component/layout/Not Found/NotFound";
function App() {
    const { isAuthenticated, user } = useSelector((state) => state.user);
    const [stripeApiKey, setStripeApiKey] = useState("");

    const getStripeApiKey = async () => {
        const data = await axios.get("/api/v1/stripeapikey");

        setStripeApiKey(data.data.stripeApiKey);
    };

    useEffect(() => {
        webfont.load({
            google: {
                families: ["Roboto", "Droid Sans", "Chilanka"],
            },
        });
        store.dispatch(loadUser());
        getStripeApiKey();
    }, []);

    window.addEventListener("contextmenu", (e) => e.preventDefault());
    return (
        <BrowserRouter>
            <Header />
            {isAuthenticated && <UserOptions user={user} />}
            {stripeApiKey && (
                <Elements stripe={loadStripe(stripeApiKey)}>
                    <ProtectedRoute
                        exact
                        path="/process/payment"
                        component={Payment}
                    />
                </Elements>
            )}

            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/product/:id" component={ProductDetails} />
                <Route exact path="/products" component={Products} />
                <Route path="/products/:keyword" component={Products} />
                <Route exact path="/search" component={Search} />
                <Route exact path="/contact" component={Contact} />
                <Route exact path="/about" component={About} />
                <ProtectedRoute exact path="/account" component={Profile} />
                <ProtectedRoute
                    exact
                    path="/me/update"
                    component={UpdateProfile}
                />
                <ProtectedRoute
                    exact
                    path="/password/update"
                    component={UpdatePassword}
                />
                <Route
                    exact
                    path="/password/forgot"
                    component={ForgotPassword}
                />
                <Route
                    exact
                    path="/password/reset/:token"
                    component={ResetPassword}
                />
                <Route exact path="/login" component={LoginSignUp} />
                <Route exact path="/cart" component={Cart} />
                <ProtectedRoute exact path="/shipping" component={Shipping} />
                <ProtectedRoute
                    exact
                    path="/success"
                    component={OrderSuccess}
                />
                <ProtectedRoute exact path="/orders" component={MyOrders} />{" "}
                <ProtectedRoute
                    exact
                    path="/order/confirm"
                    component={ConfirmOrder}
                />
                <ProtectedRoute
                    exact
                    path="/order/:id"
                    component={OrderDetails}
                />
                <ProtectedRoute
                    exact
                    isAdmin={true}
                    path="/admin/dashboard"
                    component={Dashboard}
                />
                <ProtectedRoute
                    exact
                    isAdmin={true}
                    path="/admin/products"
                    component={ProductsList}
                />
                <ProtectedRoute
                    exact
                    isAdmin={true}
                    path="/admin/product"
                    component={NewProduct}
                />
                <ProtectedRoute
                    exact
                    isAdmin={true}
                    path="/admin/product/:id"
                    component={UpdateProduct}
                />
                <ProtectedRoute
                    exact
                    isAdmin={true}
                    path="/admin/orders"
                    component={OrderList}
                />
                <ProtectedRoute
                    exact
                    isAdmin={true}
                    path="/admin/order/:id"
                    component={ProcessOrder}
                />
                <ProtectedRoute
                    exact
                    isAdmin={true}
                    path="/admin/users"
                    component={UsersList}
                />
                <ProtectedRoute
                    exact
                    isAdmin={true}
                    path="/admin/user/:id"
                    component={UpdateUser}
                />
                <ProtectedRoute
                    exact
                    isAdmin={true}
                    path="/admin/reviews"
                    component={ProductReviews}
                />
                <Route
                    component={
                        window.location.pathname === "/process/payment"
                            ? null
                            : NotFound
                    }
                />
            </Switch>

            <Footer />
        </BrowserRouter>
    );
}

export default App;
