import React, { useEffect, useState } from 'react'
import "./Meeting.css"
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames'
import Auth from '../../helpers/Auth';
import { ApiGet, ApiPut } from '../../helpers/API/ApiData';
import ScheduleModal from './ScheduleModal';
import swal from "sweetalert2";
import { toast } from 'react-toastify';

export default function Meeting() {

    const [activeTab, setActiveTab] = useState('1');
    const [meetings, setMeetings] = useState([])
    const [pendingmeetings, setPendingMeetings] = useState([])
    const [cancelledmeetings, setCancelledMeetings] = useState([])
    const [meeting, setMeeting] = useState([])

    const [scheduleMeetingDialog, setScheduleMeetingDialog] = useState(false);
    const togglescheduleMeetingDialog = () => setScheduleMeetingDialog(!scheduleMeetingDialog);

    const getUserMeetings = async (e) => {
        await ApiGet("scheduleMeeting/userMeetings/" + Auth.getUserData()._id)
            .then(res => {
                setMeetings(res.data.data.filter((meeting) => meeting.status == "accept"))
                setPendingMeetings(res.data.data.filter((meeting) => meeting.status == "pending"))
                setCancelledMeetings(res.data.data.filter((meeting) => meeting.status == "cancel"))
            }).catch(err => {
                console.log("error getting Events : ", err);
            })
    }

    useEffect(() => {
        getUserMeetings()
    }, [])

    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    }

    const cancelMeeting = (id) => {
        swal
            .fire({
                title: "Are you Sure you want delete this Meeting ?",
                text: "This Meeting will be deleted !",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                showLoaderOnConfirm: true,
                confirmButtonText: "Yes, delete it!",
            })
            .then(async (result) => {
                if (result.isConfirmed) {
                    swal.showLoading();

                    const body = {
                        _id: id,
                        status: "cancel"
                    }
                    await ApiPut("scheduleMeeting/", body)
                        .then((res) => {
                            if (res.data.status === 200) {
                                toast.success(`Meeting Canceled Successfully`)
                                getUserMeetings()
                            } else {
                                toast.error("Error")
                            }

                        })
                    swal.hideLoading();

                }
            });
    };

    return (
        <div>
            <main class="s-layout__content">
                <div className="container-fluid">
                    <div className="dashboard-box mt-8 lg:p-5 md:p-3 sm:p-2 overflow-visible">

                        <div className="md:flex">
                            <div className="md:w-full">
                                <h1 className="font-size-25 heading-title-text-color font-medium tracking-normal mb-0 cursor-pointer">
                                    Meeting
                                </h1>
                            </div>
                        </div>

                        <div className="my-3">

                            <Nav tabs>
                                <NavItem>
                                    <NavLink
                                        className={classnames({ active: activeTab === '1' }) + " cursor-pointer"}
                                        onClick={() => { toggle('1'); }}
                                    >
                                        Scheduled
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        className={classnames({ active: activeTab === '2' }) + " cursor-pointer"}
                                        onClick={() => { toggle('2'); }}
                                    >
                                        Pending
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        className={classnames({ active: activeTab === '3' }) + " cursor-pointer"}
                                        onClick={() => { toggle('3'); }}
                                    >
                                        Canceled
                                    </NavLink>
                                </NavItem>
                            </Nav>
                            <TabContent activeTab={activeTab}>
                                <TabPane tabId="1">

                                    {meetings.length > 0 ?
                                        meetings.map((meeting) => {
                                            return (
                                                <div className="white-banner about-banner p-5 rounded-xl mt-4">
                                                    <div className="md:flex flex items-center cursor-pointer">
                                                        <div className="md:w-1/8">
                                                            <div class="h-20 w-20 rounded-full flex items-center justify-center" style={{ backgroundColor: meeting?.creatorId.color }}><span class="font-size-h5 font-weight-bold text-white font-size-20">{meeting?.creatorId.username[0].toUpperCase()}</span>
                                                            </div>
                                                        </div>
                                                        <div class="md:w-1/2 pr-2 pl-20">
                                                            <h1 class="basic-profile-text-color font-size-16 font-medium tracking-normal">
                                                                <b>Meeting With {Auth.getUserData()._id == meeting?.creatorId._id ? meeting?.memberId.username : meeting?.creatorId.username}</b>
                                                            </h1>
                                                            <p class="font-normal tracking-normal child-text-color font-size-12 mb-0">
                                                                Type: {meeting?.meetingType}
                                                            </p>
                                                            <p class="font-normal tracking-normal child-text-color font-size-12">
                                                                Meeting Time: {meeting?.meetingDate} {meeting?.meetingTime}
                                                            </p>
                                                            <p class="font-size-14 tracking-normal font-normal basic-profile-text-color mt-2">
                                                                Message: {meeting?.message}
                                                            </p>
                                                        </div>

                                                        <div class="md:w-1/3 pr-2 pl-2">
                                                            <div class=" flex justify-end">
                                                                <button class="text-white text-1sm flex items-center outline-none tracking-normal font-normal text-center sign-btn-padding rounded-full w-auto bg-red-500"
                                                                    onClick={() => {
                                                                        cancelMeeting(meeting._id)
                                                                    }}>
                                                                    <span class="pr-2">Cancel Meeting</span>
                                                                    <i class="fas fa-arrow-right"></i>
                                                                </button>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>

                                            )
                                        })
                                        :
                                        <div className="white-banner about-banner p-5 rounded-xl mt-4">
                                            <div className="md:flex flex items-center cursor-pointer">
                                                No Meetings found

                                            </div>
                                        </div>
                                    }

                                </TabPane>

                                <TabPane tabId="2">

                                    {pendingmeetings.length > 0 ?
                                        pendingmeetings.map((meeting) => {
                                            return (
                                                <div className="white-banner about-banner p-5 rounded-xl mt-4">
                                                    <div className="md:flex flex items-center cursor-pointer">
                                                        <div class="h-20 w-20 rounded-full flex items-center justify-center" style={{ backgroundColor: meeting?.creatorId.color }}>
                                                            <span class="font-size-h5 font-weight-bold text-white font-size-20">
                                                                {meeting?.creatorId.username[0].toUpperCase()}
                                                            </span>
                                                        </div>
                                                        <div class="md:w-1/2 pr-2 pl-20">
                                                            <h1 class="basic-profile-text-color font-size-16 font-medium tracking-normal">
                                                                <b>Meeting With {Auth.getUserData()._id == meeting?.creatorId._id ? meeting?.memberId.username : meeting?.creatorId.username}</b>
                                                            </h1>
                                                            <p class="font-normal tracking-normal child-text-color font-size-12 mb-0">
                                                                Type: {meeting?.meetingType}
                                                            </p>
                                                            <p class="font-normal tracking-normal child-text-color font-size-12">
                                                                Meeting Time: {meeting?.meetingDate} {meeting?.meetingTime}
                                                            </p>
                                                            <p class="font-size-14 tracking-normal font-normal basic-profile-text-color mt-2">
                                                                Message: {meeting?.message}
                                                            </p>
                                                        </div>

                                                        <div class="md:w-1/3 pr-2 pl-2">
                                                            <div class=" flex justify-end">
                                                                <button
                                                                    class="text-white text-sm flex items-center outline-none tracking-normal font-normal text-center sign-btn-padding rounded-full w-auto blue-gradient"
                                                                    // class="text-white text-sm flex items-center outline-none tracking-normal font-normal text-center sign-btn-padding rounded-full w-auto blue-gradient"
                                                                    onClick={() => {
                                                                        togglescheduleMeetingDialog();
                                                                        setMeeting(meeting)
                                                                    }}>
                                                                    <span class="pr-2">View details</span>
                                                                    <i class="fas fa-arrow-right"></i>
                                                                </button>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>

                                            )
                                        })
                                        :
                                        <div className="white-banner about-banner p-5 rounded-xl mt-4">
                                            <div className="md:flex flex items-center cursor-pointer">
                                                No Meetings found

                                            </div>
                                        </div>
                                    }

                                </TabPane>

                                <TabPane tabId="3">

                                    {cancelledmeetings.length > 0 ?
                                        cancelledmeetings.map((meeting) => {
                                            return (
                                                <div className="white-banner about-banner p-5 rounded-xl mt-4">
                                                    <div className="md:flex flex items-center cursor-pointer">
                                                        <div class="h-20 w-20 rounded-full flex items-center justify-center" style={{ backgroundColor: meeting?.creatorId.color }}>
                                                            <span class="font-size-h5 font-weight-bold text-white font-size-20">
                                                                {meeting?.creatorId.username[0].toUpperCase()}
                                                            </span>
                                                        </div>
                                                        <div class="md:w-1/2 pr-2 pl-20">
                                                            <h1 class="basic-profile-text-color font-size-16 font-medium tracking-normal">
                                                                <b>Meeting With {Auth.getUserData()._id == meeting?.creatorId._id ? meeting?.memberId.username : meeting?.creatorId.username}</b>
                                                            </h1>
                                                            <p class="font-normal tracking-normal child-text-color font-size-12 mb-0">
                                                                Type: {meeting?.meetingType}
                                                            </p>
                                                            <p class="font-normal tracking-normal child-text-color font-size-12">
                                                                Meeting Time: {meeting?.meetingDate} {meeting?.meetingTime}
                                                            </p>
                                                            <p class="font-size-14 tracking-normal font-normal basic-profile-text-color mt-2">
                                                                Message: {meeting?.message}
                                                            </p>
                                                        </div>

                                                    </div>
                                                </div>

                                            )
                                        })
                                        :
                                        <div className="white-banner about-banner p-5 rounded-xl mt-4">
                                            <div className="md:flex flex items-center cursor-pointer">
                                                No Meetings found

                                            </div>
                                        </div>
                                    }

                                </TabPane>

                            </TabContent>
                        </div>

                    </div>
                </div>
            </main>
            {scheduleMeetingDialog && <ScheduleModal open={scheduleMeetingDialog} toggle={togglescheduleMeetingDialog} meeting={meeting} getAll={getUserMeetings} />}

        </div >
    )
}
