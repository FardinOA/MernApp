import React, { Fragment } from "react";
import { Typography, Step, Stepper, StepLabel } from "@material-ui/core";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import LibraryAddCheckIcon from "@material-ui/icons/LibraryAddCheck";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import "./checkOutStep.css";
const CheckOutStep = ({ activeStep }) => {
    const step = [
        {
            label: <Typography>Shipping Details</Typography>,
            icon: <LocalShippingIcon />,
        },
        {
            label: <Typography>Confirm Order</Typography>,
            icon: <LibraryAddCheckIcon />,
        },
        {
            label: <Typography>Payment</Typography>,
            icon: <AccountBalanceIcon />,
        },
    ];

    const stepStyle = {
        boxSizing: "border-box",
    };

    return (
        <Fragment>
            <Stepper alternativeLabel activeStep={activeStep} style={stepStyle}>
                {step.map((item, index) => (
                    <Step
                        key={index}
                        active={index === activeStep ? true : false}
                        completed={activeStep >= index ? true : false}
                    >
                        <StepLabel
                            icon={item.icon}
                            style={{
                                color:
                                    activeStep >= index
                                        ? "tomato"
                                        : "rgba(0,0,0,0.650)",
                            }}
                        >
                            {item.label}
                        </StepLabel>
                    </Step>
                ))}
            </Stepper>
        </Fragment>
    );
};

export default CheckOutStep;
