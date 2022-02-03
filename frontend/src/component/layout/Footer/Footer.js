import React from "react";
import "./Footer.css";
import playStore from "../../../images/playStore.png";
import appStore from "../../../images/appStore.png";
function Footer() {
    return (
        <footer id="footer">
            <div className="leftFooter">
                <h4>DOWNLOAD OUR APP</h4>
                <p>Download App for Android and IOS mobile phone</p>
                <img src={playStore} alt="Play Store" />
                <img src={appStore} alt="App Store" />
            </div>
            <div className="midFooter">
                <h1>LOGO</h1>
                <p>High Quality is our first Priority</p>
                <p>
                    Copyright 2021 &copy; <span> Fardin Omor Afnan</span>{" "}
                </p>
            </div>
            <div className="rightFooter">
                <h4>Follow Us</h4>
                <a href="http://youtube.com">Youtube</a>
                <a href="http://youtube.com">Youtube</a>
                <a href="http://youtube.com">Youtube</a>
            </div>
        </footer>
    );
}

export default Footer;
