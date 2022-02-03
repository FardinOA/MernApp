import React, { Fragment, useState, useEffect } from "react";

import MetaData from "../layout/MetaData";

import Loader from "../layout/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import "./resetPassword.css";
import { resetPassword, clearErrors } from "../../actions/userActions";

import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";

const ResetPassword = ({ history, match }) => {
    const dispatch = useDispatch();
    const alert = useAlert();

    const { error, success, loading } = useSelector(
        (state) => state.forgotPassword
    );

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const resetPasswordSubmit = (e) => {
        e.preventDefault();

        const myForm = {
            password,
            confirmPassword,
        };

        dispatch(resetPassword(match.params.token, myForm));
    };

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (success) {
            alert.success("Password Updated Successfully");

            history.push("/login");
        }
    }, [dispatch, error, alert, history, success]);
    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <MetaData title="Reset Password" />
                    <div className="resetPasswordContainer">
                        <div className="resetPasswordBox">
                            <h2 className="resetPasswordHeading">
                                Reset Password
                            </h2>
                            <form
                                className="resetPasswordForm"
                                onSubmit={resetPasswordSubmit}
                            >
                                <div>
                                    <LockOpenIcon />
                                    <input
                                        type={"password"}
                                        value={password}
                                        required
                                        placeholder="New Password"
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                    />
                                </div>

                                <div>
                                    <LockIcon />
                                    <input
                                        type={"password"}
                                        value={confirmPassword}
                                        required
                                        placeholder="Confirm Password"
                                        onChange={(e) =>
                                            setConfirmPassword(e.target.value)
                                        }
                                    />
                                </div>
                                <input
                                    type="submit"
                                    value="Update"
                                    className="resetPasswordBtn"
                                />
                            </form>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
};

export default ResetPassword;
