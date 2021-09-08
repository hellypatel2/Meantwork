import React, { useEffect, useState } from 'react'
import "./UserDirectory.css"
import { toast } from 'react-toastify';
import { ApiGet, ApiPut } from '../../helpers/API/ApiData'
import { useHistory } from 'react-router-dom';



export default function UserDirectory() {

    const history = useHistory()
    const [userData, setuserData] = useState()
    useEffect(() => {
        getDirectoryData()
    }, [])

    const getDirectoryData = async () => {
        try {
            await ApiGet("user/")
                .then((res) => {
                    if (res.data.data) {
                        setuserData(res.data.data)
                        console.log("userr daata:", res.data.data)

                    } else {
                        toast.error(`Encountered Error `)
                    }

                })
        } catch (error) {
            toast.error("Invalid Email or Password")
        }
    }
    return (

        <div>
            <main class="s-layout__content">
                <div className="container-fluid">
                    <div className="dashboard-box mt-8 lg:p-5 md:p-3 sm:p-2 overflow-visible">

                        <div className="md:flex">
                            <div className="md:w-full">
                                <h1 className="font-size-25 heading-title-text-color font-medium tracking-normal mb-0 ">
                                    User Directory
                                </h1>
                            </div>
                        </div>

                        <div className="md:flex lg:flex lg:flex-wrap md:flex-wrap pt-3">
                            {userData?.filter(obj => obj.userRole === "user").map((user, index) => {
                                return (
                                    <>
                                        <div className="lg:w-3/12 md:w-1/2 p-3" key={index}>
                                            <div className="white-banner  about-banner p-4 rounded-xl overflow-hidden text-center profile-box-height">
                                                <div className="project-box">
                                                    <div className="flex justify-center profile-img-top">
                                                        <div className="h-20 w-20 rounded-full flex items-center justify-center" style={{ background: 'rgb(163, 35, 219)' }}>
                                                            {/* <span className="font-size-h5 font-weight-bold text-white font-size-20">A</span>    */}
                                                            <div
                                                                className="h-20 w-20 rounded-full flex items-center justify-center"
                                                                style={{ backgroundColor: user.color }}
                                                            >
                                                                <span className="font-size-h5 font-weight-bold text-white font-size-20">
                                                                    {user && user.username
                                                                        ? user.username[0].toUpperCase()
                                                                        : "A"}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <p className="blue-text-color font-size-14 font-normal tracking-normal text-center pt-4">{user?.username}</p>
                                                    <div className="h-6 w-full font-size-12 overflow-hidden text-center font-normal tracking-normal child-text-color mt-1">
                                                        {user?.designation}
                                                    </div>

                                                    <div>
                                                        <div className="flex justify-center mt-5 pt-2">
                                                            <button className="text-center flex items-center font-normal tracking-normal font-size-16 edit-profile-btn blue-text-color rounded-full " onClick={() => { history.push(`/profile/` + user._id) }}>
                                                                <b>View Profile</b>
                                                            </button>
                                                        </div>
                                                    </div>

                                                    {/* <button class="text-white text-1sm flex items-center outline-none tracking-normal font-normal text-center sign-btn-padding rounded-full w-auto blue-gradient">
                                                <span class="pr-2">View details</span>
                                                <i class="fas fa-arrow-right"></i>
                                                </button> */}
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )
                            })

                            }
                        </div>



                    </div>
                </div>
            </main>
        </div>
    )
}
