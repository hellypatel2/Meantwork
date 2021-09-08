import React, { useEffect, useState } from 'react';
import './Dashboard.scss'
import { ApiGet, ApiPost } from '../../helpers/API/ApiData'
import { toast } from 'react-toastify';
import Auth from '../../helpers/Auth';

const Dashboard = () => {
    const [post, setpost] = useState()
    const [User, setUser] = useState(Auth.getUserData())
    const [postData, setpostData] = useState()

    const [comment, setcomment] = useState()

    let user = Auth.getUserData();

    const onComment = async (post) => {
        try {
            if (comment.length > 0) {
                await ApiPost("comment/", { "user": User._id, "post": post._id, "message": comment })
                    .then((res) => {
                        if (res.data.status === 200) {
                            getPostData()
                            setcomment("")
                            // window.location.reload()
                            toast.success("Posted comment successfully!")
                        } else {
                            toast.error("Error")
                        }

                    })

            }

        } catch (error) {
            toast.error("Please input some comment!")

        }
    }

    const onLike = async (post) => {
        try {
            console.log("postID: ", post._id)
            await ApiPost("post/likePost", { "user": User._id, "postId": post._id })
                .then((res) => {
                    if (res.data.status === 200) {
                        getPostData()
                        // window.location.reload()
                        toast.success("Post like successfully!")
                    } else {
                        toast.error("Error")
                    }

                })
        } catch (error) {
            toast.error("Something went wrong")

        }
    }

    const getPostData = async () => {
        try {
            await ApiGet("post/")
                .then((res) => {
                    if (res.data.data) {
                        setpostData(res.data.data)
                    } else {
                        toast.error(`Encountered Error `)
                    }

                })
        } catch (error) {
            toast.error("Invalid Email or Password")
        }

    }

    useEffect(async () => {
        await getPostData()

    }, [])


    const onPost = async () => {
        try {
            if (post.length > 0) {
                await ApiPost("post/", { "description": post, "user": User._id })
                    .then((res) => {
                        if (res.data.status === 200) {
                            getPostData()
                            setpost("")
                            toast.success("Post created successfully!")
                        } else {
                            toast.error("Error")
                        }

                    })
            }

        } catch (error) {
            toast.error("Cannot create post")

        }
    }
    return (
        <>
            <main class="s-layout__content">
                <div className="container-fluid">
                    <div className="dashboard-box mt-8 lg:p-5 md:p-3 sm:p-2 overflow-visible">

                        <div className="lg:flex lg:flex-wrap md:flex md:flex-wrap">
                            <div className="lg:w-8/12 md:w-1/2 pr-4 dashboard-right-border">
                                <div className="md:flex pt-0">
                                    <div className="md:w-full">

                                        {/* new */}
                                        <div className="w-full about-banner rounded-xl mt-4 p-4">
                                            <div className="flex items-center">
                                                <div className="profile-img">
                                                    <span
                                                        className="header-profile-sidebar-one flex items-center justify-center"
                                                        style={{ backgroundColor: user.color }}
                                                    >
                                                        <span className="font-size-h5 font-weight-bold text-white">
                                                            {user.username
                                                                ? user.username[0].toUpperCase()
                                                                : "A"}
                                                        </span>
                                                    </span>
                                                </div>
                                                <div className="pl-5">
                                                    <p className="font-size-16 heading-title-text-color font-medium tracking-normal mb-0">
                                                        {User?.username}
                                                    </p>
                                                    <p className="gray-text-color font-size-14 font-normal tracking-normal mb-0">
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="pt-8">
                                                <textarea className="textarea-style" id="w3review" name="w3review" rows="4" cols="50" placeholder="What's on your mind?" value={post} onChange={(e) => { setpost(e.target.value) }}></textarea>
                                            </div>

                                            <div className="pt-8">
                                                <button className="comment-btn-style font-size-16 font-medium tracking-normal rounded-full  cursor-pointer" onClick={() => onPost()}>Create a post</button>
                                            </div>
                                        </div>

                                        <div className="md:flex">
                                            <div className="md:w-full">
                                                <h1 className="font-size-25 heading-title-text-color font-medium tracking-normal mb-0 cursor-pointer pt-4">
                                                    Latest News
                                                </h1>
                                            </div>
                                        </div>

                                        {postData?.map((post) => {
                                            return (
                                                <div className="w-full about-banner rounded-xl mt-4 p-4">
                                                    <div className="flex items-center pt-8">
                                                        <div className="profile-img">
                                                            <span
                                                                className="header-profile-sidebar-one flex items-center justify-center"
                                                                style={{ backgroundColor: post && post.user && post.user.color }}
                                                            >
                                                                <span className="font-size-h5 font-weight-bold text-white">
                                                                    {post && post.user && post.user.username
                                                                        ? post && post.user && post.user.username[0].toUpperCase()
                                                                        : "A"}
                                                                </span>
                                                            </span>
                                                        </div>
                                                        <div className="pl-5">
                                                            <p className="text-lg    heading-title-text-color font-medium tracking-normal mb-0">
                                                                {post?.user?.username}
                                                            </p>
                                                            <p className="gray-text-color text-xs font-normal tracking-normal mb-0">
                                                                Tue May 11 2021
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <div className="pt-8">

                                                        <span>{post?.description}</span>

                                                    </div>

                                                    <div className="flex items-center justify-between pt-5">
                                                        <div>
                                                            <div className="flex items-center">
                                                                <i className="far fa-thumbs-up icon-color"></i>
                                                                <span className="font-size-14 text-black font-medium tracking-normal pl-2 cursor-pointer" onClick={() => onLike(post)}>
                                                                    Like
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center">
                                                            <div className="flex items-center pr-4">
                                                                <p className="font-size-14 text-black font-medium tracking-normal cursor-pointer">
                                                                    {post?.likeUserArray?.length}
                                                                    <span className="pl-1">likes</span>
                                                                </p>
                                                            </div>
                                                            <div className="flex items-center">
                                                                <p className="font-size-14 text-black font-medium tracking-normal cursor-pointer">
                                                                    {post?.commentArray?.length}
                                                                    <span className="pl-1">Comments</span>
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="md:flex md:flex-wrap lg:flex lg:flex-wrap pt-8">
                                                        <div className="lg:w-4/6 md:w-full">
                                                            <div className="flex items-center">
                                                                <div className="chat-logo pr-3">
                                                                    <span
                                                                        className="header-profile-sidebar-one flex items-center justify-center"
                                                                        style={{ backgroundColor: user.color }}
                                                                    >
                                                                        <span className="font-size-h5 font-weight-bold text-white">
                                                                            {user.username
                                                                                ? user.username[0].toUpperCase()
                                                                                : "A"}
                                                                        </span>
                                                                    </span>
                                                                </div>
                                                                <div className="chat-input w-full pr-3">
                                                                    <input type="search" id={`comment ` + post?._id} className="search-style rounded-full" placeholder="Write a comment..." onChange={(e) => { setcomment(e.target.value); }} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="md:w-2/6 pl-3 flex justify-end">
                                                            <button className="comment-btn-style font-size-16 font-medium tracking-normal rounded-full  cursor-pointer" onClick={() => { onComment(post); document.getElementById(`comment ` + post?._id).value = "" }}>Comment</button>
                                                        </div>
                                                    </div>

                                                    <div className="pl-10 pt-10">

                                                        <div className="md:w-full mb-8">


                                                            {post?.commentArray?.length > 0 && post?.commentArray?.map((comments) => {
                                                                return (
                                                                    <>
                                                                        <div className="user-box-com p-4">
                                                                            <div className="flex">
                                                                                <div className="lim-logo">
                                                                                    <span
                                                                                        className="header-profile-sidebar-one flex items-center justify-center"
                                                                                        style={{ backgroundColor: user.color }}
                                                                                    >
                                                                                        <span className="font-size-h5 font-weight-bold text-white">
                                                                                            {user.username
                                                                                                ? user.username[0].toUpperCase()
                                                                                                : "A"}
                                                                                        </span>
                                                                                    </span>
                                                                                </div>

                                                                                <div className="pl-4">
                                                                                    <p className="font-size-14 heading-title-text-color font-medium tracking-normal">
                                                                                        {comments?.user?.username}
                                                                                    </p>
                                                                                    <p className="font-size-14 text-black font-normal tracking-normal">
                                                                                        {comments?.message}
                                                                                    </p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </>
                                                                )
                                                            })}


                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })}

                                    </div>
                                </div>
                            </div>
                            <div className="lg:w-4/12 md:w-1/2 pl-5">
                                <p className="font-size-25 heading-title-text-color font-medium tracking-normal mb-0 cursor-pointer">
                                    Upcoming Events
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            {/* </div> */}
        </>
    )
}

export default Dashboard
