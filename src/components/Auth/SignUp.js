import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { ApiPost } from '../../helpers/API/ApiData';
import { toast } from 'react-toastify';
import Auth from '../../helpers/Auth';

export default function SignUp() {

    const [userDetails, setUserDetails] = useState({
        username: "",
        phoneNo: "",
        email: "",
        password: "",
        confirmPassword: "",
        designation: "",
        userRole: "user"
    })

    const history = useHistory();

    const [usernameError, setusernameError] = useState("")
    const [phoneNoError, setphoneNoError] = useState("")
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [confirmPasswordError, setConfirmPasswordError] = useState("")
    const [designationError, setdesignationError] = useState("")

    const setFormValues = (e) => {
        let name = e.target.name
        let value = e.target.value
        const regex = RegExp(/^[a-zA-Z0-9]+$/);
        const passwordRegex = RegExp(/^[ A-Za-z0-9_@./#&+-]*$/);

        if (name === "username") {
            if (!regex.test(value)) {
                e.preventDefault();
            } else {
                setUserDetails({ ...userDetails, [name]: value });
            }
        } if (name === "password") {
            if (!passwordRegex.test(value)) {
                e.preventDefault();
            } else {
                setUserDetails({ ...userDetails, [name]: value });
            }
        } else {
            setUserDetails({ ...userDetails, [name]: value });
        }
    }

    const validateForm = () => {
        const emailRegex = RegExp(/^(([^<>()\\[\]\\.,;:\s@\\"]+(\.[^<>()\\[\]\\.,;:\s@\\"]+)*)|(\\".+\\"))@(([^<>()[\]\\.,;:\s@\\"]+\.)+[^<>()[\]\\.,;:\s@\\"]{2,})$/i);
        const passwordRegex = RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/);

        if (userDetails.username === "") {
            setusernameError("*Required")
            return false
        }
        if (userDetails.phoneNo === "") {
            setphoneNoError("*Required")
            return false
        }
        if (userDetails.email === "") {
            setEmailError("*Required")
            return false
        } else if (!emailRegex.test(userDetails.email)) {
            setEmailError("Invalid Email")
            return false
        }
        if (userDetails.password === "") {
            setPasswordError("*Required")
            return false
        } else {
            if (userDetails.password.length < 8) {
                setPasswordError("*Password length should be 8")
                return false
            }
            if (!passwordRegex.test(userDetails.password)) {
                setPasswordError("*Password should have alphanumeric characters")
                return false
            }
        }
        if (userDetails.confirmPassword === "") {
            setConfirmPasswordError("*Required")
            return false
        } else if (userDetails.password !== userDetails.confirmPassword) {
            setConfirmPasswordError("*Passwords should match!")
            return false
        }
        if (userDetails.designation === "") {
            setdesignationError("*Required")
            return false
        }
        return true
    }

    const registerUser = async (e) => {
        e.preventDefault();
        setusernameError("")
        setphoneNoError("")
        setEmailError("")
        setPasswordError("")
        setConfirmPasswordError("")
        if (validateForm()) {
            await ApiPost("user/signup", userDetails)
                .then((res) => {
                    debugger
                    if (res.data.status === 200) {
                        res.data.data.userRole === "user" ? Auth.setUserData(res.data.data) : Auth.setAuthData(res.data.data)
                        Auth.setAuthToken(res.data.data.token)
                        toast.success(`Welcome ` + res.data.data.username)
                        history.push("/dashboard")
                    } else {
                        toast.error("error to signup")
                    }
                })
        }

    }

    return (
        <div>
            <div className="full-banner flex items-center">
                <div className="md:container md:mx-auto">
                    <div className="md:flex flex justify-center">
                        <div className="md:w-1/3">
                            <div className="login-box p-8">
                                <div className="md:flex">
                                    <div className="md:w-full">
                                        <h1 className="tracking-normal font-medium heading-title-text-color font-size-35 text-center mt-3">
                                            Registration Form
                                        </h1>

                                        <form onSubmit={(e) => registerUser(e)}>
                                            <div className="mt-4">
                                                <label className="gray-text-color font-medium tracking-normal font-size-15">
                                                    Username <span className="text-red-500">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    name="username"
                                                    className="form-control mt-1"
                                                    value={userDetails.username}
                                                    onChange={(e) => {
                                                        setFormValues(e);
                                                    }}
                                                />
                                                <div>
                                                    <span className="text-red-500">{usernameError}</span>
                                                </div>
                                            </div>

                                            {/*  */}

                                            <div className="mt-2">
                                                <label className="gray-text-color font-medium tracking-normal font-size-15">
                                                    Email <span className="text-red-500">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    name="email"
                                                    className="form-control mt-1"
                                                    value={userDetails.email}
                                                    onChange={(e) => {
                                                        setFormValues(e);
                                                    }}
                                                />
                                                <div>
                                                    <span className="text-red-500">{emailError}</span>
                                                </div>
                                            </div>

                                            <div className="mt-2">
                                                <label className="gray-text-color font-medium tracking-normal font-size-15">
                                                    Contact <span className="text-red-500">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    name="phoneNo"
                                                    className="form-control mt-1"
                                                    value={userDetails.phoneNo}
                                                    onChange={(e) => {
                                                        setFormValues(e);
                                                    }}
                                                />
                                                <div>
                                                    <span className="text-red-500">{phoneNoError}</span>
                                                </div>
                                            </div>

                                            <div className="mt-2">
                                                <label className="gray-text-color font-medium tracking-normal font-size-15">
                                                    Designation <span className="text-red-500">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    name="designation"
                                                    className="form-control mt-1"
                                                    value={userDetails.designation}
                                                    onChange={(e) => {
                                                        setFormValues(e);
                                                    }}
                                                />
                                                <div>
                                                    <span className="text-red-500">{designationError}</span>
                                                </div>
                                            </div>

                                            <div className="mt-2">
                                                <label className="gray-text-color font-medium tracking-normal font-size-15">
                                                    Password <span className="text-red-500">*</span>
                                                </label>
                                                <input
                                                    type="password"
                                                    name="password"
                                                    className="form-control mt-1"
                                                    value={userDetails.password}
                                                    onChange={(e) => {
                                                        setFormValues(e);
                                                    }}
                                                />
                                                <div>
                                                    <span className="text-red-500">{passwordError}</span>
                                                </div>
                                            </div>

                                            <div className="mt-2">
                                                <label className="gray-text-color font-medium tracking-normal font-size-15">
                                                    Confirm Password <span className="text-red-500">*</span>
                                                </label>
                                                <input
                                                    type="password"
                                                    name="confirmPassword"
                                                    className="form-control mt-1"
                                                    value={userDetails.confirmPassword}
                                                    onChange={(e) => {
                                                        setFormValues(e);
                                                    }}
                                                />
                                                <div>
                                                    <span className="text-red-500">{confirmPasswordError}</span>
                                                </div>
                                            </div>

                                            <div className="mt-2 text-center">
                                                <span className=" gray-text-color font-medium tracking-normal font-size-15">Already a User?</span>
                                                <span className="ml-2 tracking-normal text-blue-500 cursor-pointer">
                                                    <Link to="/signin">
                                                        Sign In
                                                    </Link>
                                                </span>
                                            </div>

                                            <div className="mt-2 flex justify-center">
                                                <button type="submit" className="submit-btn font-medium tracking-normal text-center cursor-pointer">
                                                    Register
                                                </button>
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
