import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { ApiPost } from '../../helpers/API/ApiData';
import Auth from '../../helpers/Auth';

export default function SignIn() {

    const [userDetails, setUserDetails] = useState({
        email: "",
        password: "",
    })

    const history = useHistory();

    const [loading, setLoading] = useState(false);
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")

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
        if (userDetails.password === "") {
            setPasswordError("*Required")
            return false
        }
        return true
    }

    const loginUser = async (e) => {
        e.preventDefault();
        setEmailError("")
        setPasswordError("")
        setLoading(true)

        let requestBody = {
            email: userDetails.email,
            password: userDetails.password
        }
        if (validateForm()) {
            try {
                await ApiPost("user/login", requestBody)
                    .then((res) => {
                        if (res.data.status === 200) {
                            res.data.data.userRole === "user" ? Auth.setUserData(res.data.data) : Auth.setAuthData(res.data.data)
                            Auth.setAuthToken(res.data.data.token)

                            toast.success(`Welcome back! ` + res.data.data.username)
                            history.push("/")
                        } else {
                            toast.error(res.data.message)
                        }
                        setLoading(false)
                    })
            } catch (error) {
                toast.error("Invalid Email or Password")
                setLoading(false)
            }
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

                                        <div className="text-center mt-3 mb-5 select-none">
                                            <p className="font-bold text-xl font-size-35 font-medium text-blue-600">
                                                M
                                                <span className="text-blue-500 italic">eant</span>
                                                <span className="text-blue-400 italic">work</span>
                                            </p>
                                        </div>

                                        <h1 className="tracking-normal text-xl heading-title-text-color text-center mt-3">
                                            Sign In
                                        </h1>

                                        <form onSubmit={(e) => loginUser(e)}>

                                            <div className="mt-6">
                                                <label className="gray-text-color font-medium tracking-normal font-size-15">
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

                                            <div className="mt-6">
                                                <label className="gray-text-color font-medium tracking-normal font-size-15">
                                                    Password <span className="text-red-500">*</span>
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

                                            <div className="mt-6 text-center">
                                                <span className="ml-2 tracking-normal text-blue-500 cursor-pointer">
                                                    <Link to="/forgotPassword">
                                                        Forgot your Password ?
                                                    </Link>
                                                </span>
                                            </div>

                                            <div className="mt-6 text-center">
                                                <span className=" gray-text-color font-medium tracking-normal font-size-18">New User?</span>
                                                <span className="ml-2 tracking-normal text-blue-500 cursor-pointer">
                                                    <Link to="/signup">
                                                        Sign Up
                                                    </Link>
                                                </span>
                                            </div>

                                            <div className="mt-6 flex justify-center">
                                                <button type="submit" className="submit-btn font-medium tracking-normal text-center cursor-pointer">
                                                    Login {loading ? <span className="fa fa-spinner fa-spin loader"></span> : ""}
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
