import React from "react";

import "./reviewCard.css";
import profilePng from "../../images/profilePng.png";
import { Rating } from "@material-ui/lab";
const ReviewCard = ({ review }) => {
    const options = {
        size: "large",

        readOnly: true,
        precision: 0.5,
        value: review?.rating,
    };
    return (
        <div key={review._id} className="reviewCard">
            <img src={profilePng} alt="User" />
            <p>{review?.name}</p>
            <Rating {...options} />
            <span>{review?.comment}</span>
        </div>
    );
};

export default ReviewCard;
