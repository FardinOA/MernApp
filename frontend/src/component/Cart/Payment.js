import React, { Fragment, useState, useEffect, useRef } from "react";
import CheckOutStep from "../Cart/CheckOutStep";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/MetaData";
import { Typography } from "@material-ui/core";
import { useAlert } from "react-alert";

import "./payment.css";
import axios from "axios";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import EventIcon from "@material-ui/icons/Event";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import {
    CardNumberElement,
    CardCvcElement,
    CardExpiryElement,
    useStripe,
    useElements,
} from "@stripe/react-stripe-js";
const Payment = () => {
    return (
        <Fragment>
            <MetaData title="Payment" />
            <CheckOutStep activeStep={3} />
            <div className="paymentContainer">
                <form action="" className="paymentForm">
                    <Typography>Card Info</Typography>
                    <div>
                        <CreditCardIcon />
                        <CardNumberElement className="paymentInput" />
                    </div>
                    <div>
                        <EventIcon />
                        <CardExpiryElement className="paymentInput" />
                    </div>
                    <div>
                        <VpnKeyIcon />
                        <CardNumberElement className="paymentInput" />
                    </div>
                </form>
            </div>
        </Fragment>
    );
};

export default Payment;
