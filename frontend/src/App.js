import "./App.css";
import Header from "./component/layout/Header/Header";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import webfont from "webfontloader";
import React, { useEffect } from "react";
import Footer from "./component/layout/Footer/Footer";
import Home from "./component/Home/Home";

import ProductDetails from "./component/product/ProductDetails";
function App() {
    useEffect(() => {
        webfont.load({
            google: {
                families: ["Roboto", "Droid Sans", "Chilanka"],
            },
        });
    }, []);
    return (
        <BrowserRouter>
            <Header />

            <Route exact path="/" component={Home} />
            <Route exact path="/product/:id" component={ProductDetails} />

            <Footer />
        </BrowserRouter>
    );
}

export default App;
