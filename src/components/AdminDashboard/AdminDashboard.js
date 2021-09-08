import React from 'react';
import './AdminDashboard.scss'

const Dashboard = () => {
    return (
        <>

            <main class="s-layout__content">
                <div className="container-fluid">
                    <div className="dashboard-box mt-8 lg:p-5 md:p-3 sm:p-2 overflow-visible">
                        <div className="md:flex">
                            <div className="md:w-full">
                                <h1 className="font-size-25 heading-title-text-color font-medium tracking-normal mb-0 cursor-pointer">
                                    Latest News
                                </h1>
                            </div>
                        </div>
                        <div className="lg:flex lg:flex-wrap md:flex md:flex-wrap">
                            <div className="lg:w-8/12 md:w-1/2 pr-4 dashboard-right-border">
                                <div className="md:flex pt-8">
                                    <div className="md:w-full">

                                        {/* new */}
                                        <div className="flex items-center">
                                            <div className="profile-img">
                                                <img src={require("../../Assets/Images/user.jpeg").default} />
                                            </div>
                                            <div className="pl-5">
                                                <p className="font-size-16 heading-title-text-color font-medium tracking-normal mb-0">
                                                    Vivek
                                                </p>
                                                <p className="gray-text-color font-size-14 font-normal tracking-normal mb-0">
                                                    {/* Tue May 11 2021 12:44:44 GMT+0530 (India Standard Time) */}
                                                    {/* Tue May 11 2021  */}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="pt-8">
                                            <textarea className="textarea-style" id="w3review" name="w3review" rows="4" cols="50" placeholder="What's on your mind?"></textarea>
                                        </div>
                                        <div className="pt-8">
                                            <button className="comment-btn-style font-size-16 font-medium tracking-normal rounded-full  cursor-pointer">Create a post</button>
                                        </div>

                                        {/* new */}
                                        <div className="flex items-center pt-8">
                                            <div className="profile-img">
                                                <img src={require("../../Assets/Images/user.jpeg").default} />
                                            </div>
                                            <div className="pl-5">
                                                <p className="font-size-16 heading-title-text-color font-medium tracking-normal mb-0">
                                                    XYZ
                                                </p>
                                                <p className="gray-text-color font-size-14 font-normal tracking-normal mb-0">
                                                    Tue May 11 2021
                                                </p>
                                            </div>
                                        </div>
                                        <div className="pt-8">
                                            <span>Hello Everyone! Thank You For Attending my show. I would always be happy to help everyone. If you want this show in your city please comment.</span>
                                            {/* <textarea className="textarea-style" id="w3review" name="w3review" rows="2" cols="50" placeholder="Would Love to share more information to this community."></textarea> */}
                                        </div>
                                        <div className="flex items-center justify-between pt-5">
                                            <div>
                                                <div className="flex items-center">
                                                    <i className="far fa-thumbs-up icon-color"></i>
                                                    <span className="font-size-14 text-black font-medium tracking-normal pl-2 cursor-pointer">
                                                        Like
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex items-center">
                                                <div className="flex items-center pr-4">
                                                    <p className="font-size-14 text-black font-medium tracking-normal cursor-pointer">
                                                        2
                                                        <span className="pl-1">likes</span>
                                                    </p>
                                                </div>
                                                <div className="flex items-center">
                                                    <p className="font-size-14 text-black font-medium tracking-normal cursor-pointer">
                                                        4
                                                        <span className="pl-1">Comments</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="md:flex md:flex-wrap lg:flex lg:flex-wrap pt-8">
                                            <div className="lg:w-4/6 md:w-full">
                                                <div className="flex items-center">
                                                    <div className="chat-logo pr-3">
                                                        <img src={require("../../Assets/Images/user.jpeg").default} />
                                                    </div>
                                                    <div className="chat-input w-full pr-3">
                                                        <input type="search" className="search-style rounded-full" placeholder="Write a comment..." />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="md:w-2/6 pl-3 flex justify-end">
                                                <button className="comment-btn-style font-size-16 font-medium tracking-normal rounded-full  cursor-pointer">Comment</button>
                                            </div>
                                        </div>
                                        <div className="pl-10 pt-10">
                                            <div className="md:w-full mb-8">
                                                <div className="user-box-com p-4">
                                                    <div className="flex">
                                                        <div className="lim-logo">
                                                            <img src={require("../../Assets/Images/user.jpeg").default} />
                                                        </div>
                                                        <div className="pl-4">
                                                            <p className="font-size-14 heading-title-text-color font-medium tracking-normal">
                                                                Vivek
                                                            </p>
                                                            <p className="font-size-14 text-black font-normal tracking-normal">
                                                                this is first trial comment
                                                            </p>
                                                            <div className="flex items-center">
                                                                <p className="cursor-pointer font-size-12 text-black cursor-pointer font-normal tracking-normal mb-0 pr-3">
                                                                    Like
                                                                </p>
                                                                <p className="cursor-pointer font-size-12 text-black cursor-pointer font-normal tracking-normal mb-0 pr-3">
                                                                    Reply
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="md:w-full mb-8">
                                                <div className="user-box-com p-4">
                                                    <div className="flex">
                                                        <div className="lim-logo">
                                                            <img src={require("../../Assets/Images/user.jpeg").default} />
                                                        </div>
                                                        <div className="pl-4">
                                                            <p className="font-size-14 heading-title-text-color font-medium tracking-normal">
                                                                Dishant
                                                            </p>
                                                            <p className="font-size-14 text-black font-normal tracking-normal">
                                                                this is 2nd comment
                                                            </p>
                                                            <div className="flex items-center">
                                                                <p className="cursor-pointer font-size-12 text-black cursor-pointer font-normal tracking-normal mb-0 pr-3">
                                                                    Like
                                                                </p>
                                                                <p className="cursor-pointer font-size-12 text-black cursor-pointer font-normal tracking-normal mb-0 pr-3">
                                                                    Reply
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="lg:w-4/12 md:w-1/2 pl-5">
                                <p className="font-size-25 heading-title-text-color font-medium tracking-normal mb-0 cursor-pointer">
                                    Upcoming Group Events
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default Dashboard
