import React from 'react'
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';

const MyProfile = () => {
    const location = useLocation();
    const userDetails = location.state.userDetails

    return (
        <div>
            <div className="full-banner flex items-center">
                <div className="md:container md:mx-auto">
                    <div className="md:flex flex justify-center">
                        <div className="md:w-1/2">
                            <div className="login-box p-8">
                                <div className="md:flex">
                                    <div className="md:w-full">
                                        <h1 className="tracking-normal font-medium heading-title-text-color font-size-35 text-center mt-3">
                                            Registration Details
                                        </h1>

                                        <div className="mt-6 flex">
                                            <label className="gray-text-color font-medium tracking-normal font-size-18 w-1/2">
                                                First Name
                                                </label>
                                            <label className="font-medium tracking-normal font-size-18 w-1/2">
                                                {userDetails?.firstName}
                                            </label>
                                        </div>

                                        <div className="mt-6 flex">
                                            <label className="gray-text-color font-medium tracking-normal font-size-18 w-1/2">
                                                Last Name
                                            </label>
                                            <label className="font-medium tracking-normal font-size-18 w-1/2">
                                                {userDetails?.lastName}
                                            </label>
                                        </div>

                                        <div className="mt-6 flex">
                                            <label className="gray-text-color font-medium tracking-normal font-size-18 w-1/2">
                                                Email
                                            </label>
                                            <label className="font-medium tracking-normal font-size-18 w-1/2">
                                                {userDetails?.email}
                                            </label>
                                        </div>

                                        <div className="mt-6 flex">
                                            <label className="gray-text-color font-medium tracking-normal font-size-18 w-1/2">
                                                Password
                                            </label>
                                            <label className="font-medium tracking-normal font-size-18 w-1/2">
                                                {userDetails?.password}
                                            </label>
                                        </div>

                                        <div className="mt-6 flex justify-center">
                                            <Link to="/register">
                                                Back to Register
                                            </Link>
                                        </div>



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

export default MyProfile
