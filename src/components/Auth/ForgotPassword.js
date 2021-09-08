import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import { ApiPost } from '../../helpers/API/ApiData';

export default function ForgotPassword() {

    const [userDetails, setUserDetails] = useState({
        email: "",
    })

    const history = useHistory();

    const [emailError, setEmailError] = useState("")

    const setFormValues = (e) => {
        let name = e.target.name
        let value = e.target.value
        setUserDetails({ ...userDetails, [name]: value });
    }

    const validateForm = () => {
        const emailRegex = RegExp(/^(([^<>()\\[\]\\.,;:\s@\\"]+(\.[^<>()\\[\]\\.,;:\s@\\"]+)*)|(\\".+\\"))@(([^<>()[\]\\.,;:\s@\\"]+\.)+[^<>()[\]\\.,;:\s@\\"]{2,})$/i);
        if (userDetails.email === "") {
            setEmailError("*Required")
            return false
        } else if (!emailRegex.test(userDetails.email)) {
            setEmailError("Invalid Email")
            return false
        }
        return true
    }

    const sendResetLink = async (e) => {
        e.preventDefault();
        setEmailError("")
        let requestBody = {
            email: userDetails.email,
        }
        if (validateForm()) {
            try {
                await ApiPost("user/forgotPassword", requestBody)
                    .then((res) => {
                        if (res.data.status === 200) {
                            toast.success(res.data.message)
                            history.push("/")
                        } else {
                            toast.error(res.data.message)
                        }
                    })
            } catch (error) {
                toast.error("Invalid Email")
            }
        }
    }

    return (
        <div>
            <ToastContainer />
            <div className="full-banner flex items-center">
                <div className="md:container md:mx-auto">
                    <div className="md:flex flex justify-center">
                        <div className="md:w-1/3">
                            <div className="login-box p-8">
                                <div className="md:flex">
                                    <div className="md:w-full">
                                        <h1 className="tracking-normal font-medium heading-title-text-color font-size-35 text-center mt-3">
                                            Forgot Password
                                        </h1>

                                        <form onSubmit={(e) => sendResetLink(e)}>

                                            <div className="mt-6">
                                                <label className="gray-text-color font-medium tracking-normal font-size-18">
                                                    Email <span className="text-red-500">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    name="email"
                                                    className="form-control mt-3"
                                                    value={userDetails.email}
                                                    onChange={(e) => {
                                                        setFormValues(e);
                                                    }}
                                                />
                                                <div>
                                                    <span className="text-red-500">{emailError}</span>
                                                </div>
                                            </div>

                                            <div className="mt-6 flex justify-center">
                                                <button type="submit" className="submit-btn font-medium tracking-normal text-center cursor-pointer">
                                                    Reset Password
                                                </button>
                                            </div>

                                            <div className="mt-6 text-center">
                                                <span className=" gray-text-color font-medium tracking-normal font-size-18">Back to Login</span>
                                                <span className="ml-2 tracking-normal text-blue-500 cursor-pointer">
                                                    <Link to="/signin">
                                                        Sign In
                                                    </Link>
                                                </span>
                                            </div>

                                        </form>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
