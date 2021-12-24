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
function App() {
    const { isAuthenticated, user } = useSelector((state) => state.user);
    const [stripeApiKey, setStripeApiKey] = useState("");

    const getStripeApiKey = async () => {
        const data = await axios.get("/api/v1/stripeapikey");
        setStripeApiKey(data.stripeapikey);
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
    return (
        <BrowserRouter>
            <Header />
            {isAuthenticated && <UserOptions user={user} />}
            <Route exact path="/" component={Home} />
            <Route exact path="/product/:id" component={ProductDetails} />
            <Route exact path="/products" component={Products} />
            <Route path="/products/:keyword" component={Products} />
            <Route exact path="/search" component={Search} />
            <ProtectedRoute exact path="/account" component={Profile} />
            <ProtectedRoute exact path="/me/update" component={UpdateProfile} />
            <ProtectedRoute
                exact
                path="/password/update"
                component={UpdatePassword}
            />

            <Route exact path="/password/forgot" component={ForgotPassword} />
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
                path="/order/confirm"
                component={ConfirmOrder}
            />

            <ProtectedRoute exact path="/process/payment" component={Payment} />
            <Footer />
        </BrowserRouter>
    );
}

export default App;
