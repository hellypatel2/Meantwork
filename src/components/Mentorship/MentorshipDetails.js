import React, { useEffect, useState } from 'react'
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames'
import "./Mentorship.css"
import { getDate } from '../../helpers/utils';
import { ApiGet, ApiPost } from '../../helpers/API/ApiData';
import { useHistory, useParams } from 'react-router-dom';
import Auth from '../../helpers/Auth';
import "./MentorshipDetails.css";
import MentorshipRequestModal from './MentorshipRequestModal';
import ScheduleModal from '../Meeting/ScheduleModal';

const Mentorship = () => {

    const { id, type, status } = useParams();
    const [mentorshipPendingRequests, setMentorshipPendingRequests] = useState([]);
    const [mentorshipCompletedRequests, setMentorshipCompletedRequests] = useState([]);
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const [program, setProgram] = useState({});
    const [selectedRequest, setSelectedRequest] = useState({});

    const [mentorshipRequestModal, setMentorshipRequestModal] = useState(false);
    const toggleMentorshipRequestModal = () => setMentorshipRequestModal(!mentorshipRequestModal);

    const [scheduleMeetingDialog, setScheduleMeetingDialog] = useState(false);
    const togglescheduleMeetingDialog = () => setScheduleMeetingDialog(!scheduleMeetingDialog);

    const getMentorshipPendingRequests = async () => {
        setLoading(true);
        const body = {
            mentorId: Auth.getUserData()._id,
            programId: id,
            status: "pending"
        }
        await ApiPost(
            `mentorshipRequest/getPendingRequests`, body
        )
            .then((res) => {
                if (res.data.data) {
                    // console.log("res.data.data",res.data.data)
                    setMentorshipPendingRequests(res.data.data);
                    setProgram(res.data.data[0].programId);
                }
            })
            .catch((err) => console.log("err", err));
        setLoading(false);
    };

    const getMentorshipRequests = async () => {
        setLoading(true);
        let body;
        type == "mentor" ?
            body = {
                mentorId: Auth.getUserData()._id,
                programId: id,
                status: "completed"
            }
            :
            body = {
                menteeId: Auth.getUserData()._id,
                programId: id,
                status: "completed"
            }
        await ApiPost(
            `mentorshipRequest/getCompletedRequests`, body
        )
            .then((res) => {
                if (res.data.data) {
                    // console.log("res.data.data",res.data.data)
                    setMentorshipCompletedRequests(res.data.data);
                    setProgram(res.data.data[0].programId);
                }
            })
            .catch((err) => console.log("err", err));
        setLoading(false);
    };
    useEffect(() => {
        getMentorshipPendingRequests();
        if (id && status == "completed") {
            getMentorshipRequests();
        }
    }, []);

    const [activeTab, setActiveTab] = useState('1');

    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    }

    return (
        <div>
            {console.log('mentorshipCompletedRequests :', mentorshipCompletedRequests)}
            {console.log('program :', program)}
            <main class="s-layout__content">
                <div className="container-fluid">
                    <div className="dashboard-box mt-8 lg:p-5 md:p-3 sm:p-2 overflow-visible">

                        <div className="md:flex border-b-2 border-fuchsia-600">
                            <div className="md:w-full">
                                <h1 className="font-size-25 heading-title-text-color font-medium tracking-normal mb-0 cursor-pointer">
                                    <i
                                        class="fas fa-arrow-left cursor-pointer"
                                        onClick={() => history.goBack()}
                                    ></i>
                                    <span className="pl-3">{program?.name}</span>
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
                                        Ongoing
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
                            </Nav>
                            <TabContent activeTab={activeTab}>
                                <TabPane tabId="1">
                                    <div className="pt-3">

                                        {mentorshipCompletedRequests.length > 0 ?
                                            // <>
                                            mentorshipCompletedRequests?.map((obj) => {
                                                return (
                                                    <div className="white-banner about-banner p-5 rounded-xl mb-3">
                                                        <div className="md:flex">
                                                            <div className="md:w-3/4">
                                                                <div className="flex">
                                                                    {type === "mentor" ? (
                                                                        <div className="summary-logo w-1/4 flex-wrap justify-center">

                                                                            <div
                                                                                className="h-36 w-36 rounded-full flex items-center justify-center"
                                                                                style={{
                                                                                    backgroundColor: obj.menteeId.color,
                                                                                }}
                                                                            >
                                                                                <span className="font-size-h5 font-weight-bold text-white font-size-24">
                                                                                    {obj.menteeId && obj.menteeId.username
                                                                                        ? obj.menteeId.username[0].toUpperCase()
                                                                                        : "A"}
                                                                                </span>
                                                                            </div>
                                                                            {/* )} */}

                                                                            <p className="font-medium font-size-set tracking-normal basic-profile-text-color font-size-20 text-center lg:mt-5 md:mt-2 ">
                                                                                {obj.menteeId.username}
                                                                            </p>
                                                                            <p className="font-size-16 responsive-font-size tracking-normal font-normal basic-profile-text-color text-center mt-2">
                                                                                {obj.menteeId.designation}
                                                                            </p>
                                                                        </div>
                                                                    ) : (
                                                                        <div className="summary-logo w-1/4">
                                                                            <div
                                                                                className="h-36 w-36 rounded-full flex items-center justify-center"
                                                                                style={{
                                                                                    backgroundColor: obj.mentorId.color,
                                                                                }}
                                                                            >
                                                                                <span className="font-size-h5 font-weight-bold text-white font-size-24">
                                                                                    {obj.mentorId && obj.mentorId.username
                                                                                        ? obj.mentorId.username[0].toUpperCase()
                                                                                        : "A"}
                                                                                </span>
                                                                            </div>
                                                                            {/* )} */}
                                                                            <p className="font-medium font-size-set tracking-normal basic-profile-text-color font-size-20 text-center lg:mt-5 md:mt-2 ">
                                                                                {obj.mentorId.username}
                                                                            </p>
                                                                            <p className="font-size-16 responsive-font-size tracking-normal font-normal basic-profile-text-color text-center mt-2">
                                                                                {obj.mentorId.designation}
                                                                            </p>
                                                                        </div>
                                                                    )}

                                                                    <div className="summary-text lg:ml-5 md:pl-2 pl-2 w-3/4 ">
                                                                        <h1 className="font-medium font-size-20 tracking-normal basic-profile-text-color">
                                                                            Program Description
                                                                        </h1>
                                                                        <div className="main-life pt-3">
                                                                            {program.description}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="md:w-1/4 flex justify-end">
                                                                <div className="more-icon">
                                                                    <div className="more-box-banner p-5 text-center rounded-xl mt-6 ml-3 basic-profile-text-color">

                                                                        <button
                                                                            class="text-white text-sm flex items-center outline-none tracking-normal font-normal text-center sign-btn-padding rounded-full w-auto blue-gradient"
                                                                            onClick={() => {
                                                                                togglescheduleMeetingDialog();
                                                                                setSelectedRequest(obj)
                                                                            }}
                                                                        >
                                                                            <span class="pr-2">Schedule A Meeting</span>
                                                                        </button>

                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                            // </>
                                            :
                                            <div className="white-banner about-banner p-5 rounded-xl mb-3">
                                                <div className="md:flex">
                                                    Not part of the Program
                                                </div>
                                            </div>
                                        }
                                    </div>
                                </TabPane>
                                <TabPane tabId="2">
                                    <div className="pt-3">

                                        {mentorshipPendingRequests.length > 0 ?

                                            mentorshipPendingRequests?.map((obj) => {
                                                return (
                                                    <div className="white-banner about-banner p-5 rounded-xl mb-3">
                                                        <div className="md:flex">
                                                            <div className="md:w-3/4">
                                                                <div className="flex">
                                                                    {type === "mentee" ? (
                                                                        <div className="summary-logo w-1/4 flex-wrap justify-center">
                                                                            <div
                                                                                className="h-36 w-36 rounded-full flex items-center justify-center"
                                                                                style={{
                                                                                    backgroundColor: obj.mentorId.color,
                                                                                }}
                                                                            >
                                                                                <span className="font-size-h5 font-weight-bold text-white font-size-24">
                                                                                    {obj.mentorId && obj.mentorId.username
                                                                                        ? obj.mentorId.username[0].toUpperCase()
                                                                                        : "A"}
                                                                                </span>
                                                                            </div>

                                                                            <p className="font-medium font-size-set tracking-normal basic-profile-text-color font-size-20 text-center lg:mt-5 md:mt-2 ">
                                                                                {obj.mentorId.username}
                                                                            </p>
                                                                            <p className="font-size-16 responsive-font-size tracking-normal font-normal basic-profile-text-color text-center mt-2">
                                                                                {obj.mentorId.designation}
                                                                            </p>
                                                                        </div>
                                                                    ) : (
                                                                        <div className="summary-logo w-1/4">
                                                                            <div
                                                                                className="h-36 w-36 rounded-full flex items-center justify-center"
                                                                                style={{
                                                                                    backgroundColor: obj.menteeId.color,
                                                                                }}
                                                                            >
                                                                                <span className="font-size-h5 font-weight-bold text-white font-size-24">
                                                                                    {obj.menteeId && obj.menteeId.username
                                                                                        ? obj.menteeId.username[0].toUpperCase()
                                                                                        : "A"}
                                                                                </span>
                                                                            </div>
                                                                            {/* )} */}
                                                                            <p className="font-medium font-size-set tracking-normal basic-profile-text-color font-size-20 text-center lg:mt-5 md:mt-2 ">
                                                                                {obj.menteeId.username}
                                                                            </p>
                                                                            <p className="font-size-16 responsive-font-size tracking-normal font-normal basic-profile-text-color text-center mt-2">
                                                                                {obj.menteeId.designation}
                                                                            </p>
                                                                        </div>
                                                                    )}

                                                                    <div className="summary-text lg:ml-5 md:pl-2 pl-2 w-3/4 ">
                                                                        <h1 className="font-medium font-size-20 tracking-normal basic-profile-text-color">
                                                                            Program Description
                                                                        </h1>
                                                                        <div className="main-life pt-3">
                                                                            {program.description}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="md:w-1/4 flex justify-end">
                                                                <div className="more-icon items-center text-center">
                                                                    <button
                                                                        class="text-white text-1sm flex items-center outline-none tracking-normal font-normal text-center sign-btn-padding rounded-full w-auto blue-gradient"
                                                                        onClick={() => {
                                                                            toggleMentorshipRequestModal();
                                                                            setSelectedRequest(obj)
                                                                        }}
                                                                    >
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
                                            <div className="white-banner about-banner p-5 rounded-xl mb-3">
                                                <div className="md:flex">
                                                    No Requests Found
                                                </div>
                                            </div>
                                        }
                                    </div>
                                </TabPane>
                            </TabContent>

                        </div>

                    </div>
                </div>
            </main>
            {mentorshipRequestModal && <MentorshipRequestModal modal={mentorshipRequestModal} toggle={toggleMentorshipRequestModal} program={program} request={selectedRequest} getAll={() => { getMentorshipPendingRequests(); getMentorshipRequests(); }} />}

            {scheduleMeetingDialog && <ScheduleModal open={scheduleMeetingDialog} toggle={togglescheduleMeetingDialog} request={selectedRequest} getAll={() => { getMentorshipPendingRequests(); getMentorshipRequests(); }} />}
        </div>
    )
}

export default Mentorship
