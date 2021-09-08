import React, { useEffect, useState } from 'react'
import {
    Row, Col, FormGroup, Label, Input, Badge
} from 'reactstrap'
import { ApiGet, ApiPut } from '../../helpers/API/ApiData'
import { toast } from 'react-toastify';


import Auth from "../../helpers/Auth"
import { useParams } from 'react-router-dom';

const Profile = () => {
    
    const {id} = useParams()
    const [User, setUser] = useState(Auth.getUserData())
    const [isEdit, setisEdit] = useState(false)

    const [editUser, seteditUser] = useState(Auth.getUserData())

    const [mentorData, setmentorData] = useState()
    const [menteeData, setmenteeData] = useState()

    const [userProfile, setuserProfile] = useState()


    const getMentorProgram = async () => {
        try {
            await ApiGet("mentorshipProgram/getMentorProgramsByUserId")
                .then((res) => {
                    if (res.data.data) {
                        console.log("getmentor daata:", res.data.data)
                        setmentorData(res.data.data)
                    } else {
                        toast.error(`Encountered Error `)
                    }

                })
        } catch (error) {
            toast.error("Invalid Email or Password")
        }
    }

    const getMenteeProgram = async () => {
        try {
            await ApiGet("mentorshipProgram/getMenteeProgramsByUserId")
                .then((res) => {
                    if (res.data.data) {
                        console.log("getmenteea:", res.data.data)
                        setmenteeData(res.data.data)
                    } else {
                        toast.error(`Encountered Error `)
                    }

                })
        } catch (error) {
            toast.error("Invalid Email or Password")
        }
    }

    const getUserDetailss = async() => {
        try {
            
            const res= await ApiGet(`user/`+ id )

            setUser(res.data.data)
                // .then((res) => {
                //     if (res.data.data) {
                //         setuserProfile(res.data.data)
                //         console.log("user>>>>>",userProfile)
                //     } else {
                //         toast.error(`Encountered Error `)
                //     }

                // })
                
        } catch (error) {
            toast.error("Error fetching details")
        }

    }


    useEffect(() => {

        
        getMentorProgram()
        getMenteeProgram()

        if(id) {
            getUserDetailss()
        }
    }, [])

    const onEdit = async () => {
        setisEdit(false)
        try {
            await ApiPut("user/", editUser)
                .then((res) => {
                    if (res.data.status === 200) {
                        toast.success(`Update Successfull`)
                        setUser(res.data.data)

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
                            <div className="md:w-full flex justify-between">
                            {id? 
                                <h1 className="font-size-25 heading-title-text-color font-medium tracking-normal mb-0 cursor-pointer">
                                    User Profile
                                </h1>:
                                <h1 className="font-size-25 heading-title-text-color font-medium tracking-normal mb-0 cursor-pointer">
                                    My Profile
                                </h1>
                            }
                
                               {!id? !isEdit ?
                                    <div>
                                        <button className="font-size-16 font-medium tracking-normal rounded-full  cursor-pointer bg-blue-800 px-4 py-1" onClick={() => setisEdit(true)}> Edit</button>
                                    </div> :
                                    <div>
                                        <button className="bg-blue-800 font-size-16 font-medium tracking-normal rounded-full  cursor-pointer px-4 py-1" onClick={() => onEdit()}> Update</button>
                                    </div>:<></>} 
                                { }
                            </div>
                        </div>
                        <div className="lg:flex lg:flex-wrap md:flex md:flex-wrap">
                            <div className="w-full pt-3">
                                <Row className="py-2">
                                    <Col md={3} className="font-medium">
                                        User Name
                                    </Col>
                                    {!isEdit ?
                                        <Col md={6}>
                                            {User?.username}
                                        </Col> :
                                        <Col md={6}> <input type="text" value={editUser.username} onChange={(e) => {
                                            seteditUser({ ...editUser, ["username"]: e.target.value })
                                        }}></input>  </Col>}

                                </Row>

                                <Row className="py-2">
                                    <Col md={3} className="font-medium">
                                        Email
                                    </Col>
                                    {!isEdit ?
                                        <Col md={6}>
                                            {User?.email}
                                        </Col> :
                                        <Col md={6}> <input type="text" value={editUser.email} onChange={(e) => {
                                            seteditUser({ ...editUser, ["email"]: e.target.value })
                                        }}></input>  </Col>}
                                </Row>
                                <Row className="py-2">
                                    <Col md={3} className="font-medium">
                                        Designation
                                    </Col>
                                    {!isEdit ?
                                        <Col md={6}>
                                            {User?.designation}
                                        </Col> :
                                        <Col md={6}> <input type="text" value={editUser.designation} onChange={(e) => {
                                            seteditUser({ ...editUser, ["designation"]: e.target.value })
                                        }}></input>  </Col>}
                                </Row>
                                <Row className="py-2">
                                    <Col md={3} className="font-medium">
                                        Contact Number
                                    </Col>
                                    {!isEdit ?
                                        <Col md={6}>
                                            {User?.phoneNo}
                                        </Col> :
                                        <Col md={6}> <input type="text" value={editUser.phoneNo} onChange={(e) => {
                                            seteditUser({ ...editUser, ["phoneNo"]: e.target.value })
                                        }}></input>  </Col>}
                                </Row>
                                {!id?<> <Row className="py-2">
                                    <Col md={3} className="font-medium">
                                        My Mentor Programs
                                    </Col>
                                    <Col md={6}>
                                        {mentorData?.map((mentor) => {
                                            return (
                                                <>
                                                    <Badge className="ml-2" color="primary">{mentor?.name}</Badge>
                                                </>
                                            )
                                        })}
                                    </Col>

                                </Row>
                                <Row className="py-2">
                                    <Col md={3} className="font-medium">
                                        Enrolled Programs
                                    </Col>
                                    <Col md={6}>
                                        {menteeData?.map((mentee) => {
                                            return (
                                                <>
                                                    <Badge className="ml-2" color="primary">{mentee?.name}</Badge>
                                                </>
                                            )
                                        })}
                                    </Col>
                                </Row></>:<></>}
                               
                                {/* <Row className="py-2">
                                    <Col md={3} className="font-medium">
                                        Upcoming Meetings
                                    </Col>
                                    <Col md={6}>
                                        <Badge color="primary">Tomorrow at 1600 Hrs</Badge>
                                        <Badge className="ml-2" color="primary">June 24, 2021 at 1000 Hrs</Badge>
                                    </Col>
                                </Row> */}
                            </div>

                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Profile
