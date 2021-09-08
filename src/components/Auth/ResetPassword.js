import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';
import { Link, useParams } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import { ApiPut } from '../../helpers/API/ApiData';

export default function ResetPassword() {

    const { token } = useParams();

    const [decoded, setDecoded] = useState({});

    const history = useHistory();

    const [passwordError, setPasswordError] = useState("")
    const [confirmPasswordError, setConfirmPasswordError] = useState("")

    useEffect(() => {
        if (token) {
            var decodedTemp = jwt_decode(token);
            setDecoded(decodedTemp)
        }
        localStorage.clear();
    }, [])

    const [userDetails, setUserDetails] = useState({
        email: decoded.email,
        password: "",
        confirmPassword: ""
    })

    const setFormValues = (e) => {
        let name = e.target.name
        let value = e.target.value
        setUserDetails({ ...userDetails, [name]: value });
    }

    const validateForm = () => {
        const passwordRegex = RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/);

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
        return true
    }

    const submitResetPassword = async (e) => {
        e.preventDefault();
        setPasswordError("")
        setConfirmPasswordError("")

        let requestBody = {
            _id: decoded.id,
            password: userDetails.password,
        }
        if (validateForm()) {
            try {
                await ApiPut("user/", requestBody)
                    .then((res) => {
                        if (res.data.status === 200) {
                            toast.success(res.data.message)
                            history.push("/")
                        } else {
                            toast.error(res.data.message)
                        }
                    })
            } catch (error) {
                toast.error("Invalid Email or Password")
            }
        }

    }

    return (
        <div>
            {console.log('decoded', decoded)}
            <div className="full-banner flex items-center">
                <div className="md:container md:mx-auto">
                    <div className="md:flex flex justify-center">
                        <div className="md:w-1/3">
                            <div className="login-box p-8">
                                <div className="md:flex">
                                    <div className="md:w-full">
                                        <h1 className="tracking-normal font-medium heading-title-text-color font-size-35 text-center mt-3">
                                            Reset Password
                                        </h1>

                                        <form onSubmit={(e) => submitResetPassword(e)}>

                                            <div className="mt-6">
                                                <label className="gray-text-color font-medium tracking-normal font-size-18">
                                                    Email <span className="text-red-500">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    name="email"
                                                    className="form-control mt-3"
                                                    value={decoded.email}
                                                    onChange={(e) => {
                                                        setFormValues(e);
                                                    }}
                                                    disabled
                                                />
                                                {/* <div className="pt-2 cursor-pointer text-blue-400">
                                                    Resend email
                                                </div> */}
                                            </div>

                                            <div className="mt-6">
                                                <label className="gray-text-color font-medium tracking-normal font-size-18">
                                                    New Password <span className="text-red-500">*</span>
                                                </label>
                                                <input
                                                    type="password"
                                                    name="password"
                                                    className="form-control mt-3"
                                                    value={userDetails.password}
                                                    onChange={(e) => {
                                                        setFormValues(e);
                                                    }}
                                                />
                                                <div>
                                                    <span className="text-red-500">{passwordError}</span>
                                                </div>
                                            </div>

                                            <div className="mt-6">
                                                <label className="gray-text-color font-medium tracking-normal font-size-18">
                                                    Confirm Password <span className="text-red-500">*</span>
                                                </label>
                                                <input
                                                    type="password"
                                                    name="confirmPassword"
                                                    className="form-control mt-3"
                                                    value={userDetails.confirmPassword}
                                                    onChange={(e) => {
                                                        setFormValues(e);
                                                    }}
                                                />
                                                <div>
                                                    <span className="text-red-500">{confirmPasswordError}</span>
                                                </div>
                                            </div>

                                            <div className="mt-6 text-center">
                                                <span className=" gray-text-color font-medium tracking-normal font-size-18">Back to Login</span>
                                                <span className="ml-2 tracking-normal text-blue-500 cursor-pointer">
                                                    <Link to="/signin">
                                                        Sign In
                                                    </Link>
                                                </span>
                                            </div>

                                            <div className="mt-6 flex justify-center">
                                                <button type="submit" className="submit-btn font-medium tracking-normal text-center cursor-pointer">
                                                    Reset Password
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
