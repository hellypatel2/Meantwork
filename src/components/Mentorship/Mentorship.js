import React, { useEffect, useState } from 'react'
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames'
import "./Mentorship.css"
import { getDate } from '../../helpers/utils';
import { ApiGet } from '../../helpers/API/ApiData';
import MentorshipRequestModal from './MentorshipRequestModal';
import { useHistory } from 'react-router-dom';

const Mentorship = () => {

    const [activeTab, setActiveTab] = useState('1');
    const history = useHistory();

    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    }

    const [myMentorPrograms, setMyMentorPrograms] = useState([]);
    const [myMenteePrograms, setMyMenteePrograms] = useState([]);
    const [explorePrograms, setExplorePrograms] = useState([]);
    const [pendingRequestProgram, setPendingRequestProgram] = useState([]);

    const [selectedProgram, setSelectedProgram] = useState({});

    const [mentorshipRequestModal, setMentorshipRequestModal] = useState(false);

    const toggleMentorshipRequestModal = () => setMentorshipRequestModal(!mentorshipRequestModal);

    const getMyMentorPrograms = async (e) => {
        await ApiGet("mentorshipProgram/getMentorProgramsByUserId")
            .then(res => {
                setMyMentorPrograms(res.data.data)
            }).catch(err => {
                console.log("error getting Events : ", err);
            })
    }

    const getMyMenteePrograms = async (e) => {
        await ApiGet("mentorshipProgram/getMenteeProgramsByUserId")
            .then(res => {
                setMyMenteePrograms(res.data.data)
            }).catch(err => {
                console.log("error getting Events : ", err);
            })
    }

    const getExplorePrograms = async (e) => {
        await ApiGet("mentorshipProgram/getExploreProgram")
            .then(res => {
                setExplorePrograms(res.data.data)
            }).catch(err => {
                console.log("error getting Events : ", err);
            })
    }

    const getPendingPrograms = async (e) => {
        await ApiGet("mentorshipProgram/getPendingProgramsByUser")
            .then(res => {
                setPendingRequestProgram(res.data.data)
            }).catch(err => {
                console.log("error getting Events : ", err);
            })
    }

    useEffect(() => {
        getMyMentorPrograms();
        getMyMenteePrograms();
        getExplorePrograms();
        getPendingPrograms();
    }, [mentorshipRequestModal]);

    return (
        <div>
            <main class="s-layout__content">
                <div className="container-fluid">
                    <div className="dashboard-box mt-8 lg:p-5 md:p-3 sm:p-2 overflow-visible">

                        <div className="md:flex">
                            <div className="md:w-full">
                                <h1 className="font-size-25 heading-title-text-color font-medium tracking-normal mb-0 cursor-pointer">
                                    Mentorship Programs
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
                                        My Programs
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        className={classnames({ active: activeTab === '2' }) + " cursor-pointer"}
                                        onClick={() => { toggle('2'); }}
                                    >
                                        Explore
                                    </NavLink>
                                </NavItem>
                            </Nav>
                            <TabContent activeTab={activeTab}>
                                <TabPane tabId="1">
                                    {/* <Row> */}

                                    <div className="font-size-16 font-bold mt-3">
                                        My Mentor Programs
                                    </div>
                                    {myMentorPrograms.length > 0 ? myMentorPrograms?.map((program) => {
                                        return (
                                            <>
                                                <div className="white-banner about-banner p-5 rounded-xl mt-4">
                                                    <div className="md:flex flex items-center cursor-pointer">
                                                        <div class="md:w-1/3 pr-2">
                                                            <h1 class="basic-profile-text-color font-size-16 font-medium tracking-normal">
                                                                <b>{program.name}</b>
                                                            </h1>
                                                            <p class="font-normal tracking-normal child-text-color font-size-12 mt-2">
                                                                Started on {getDate(program.startDate)}
                                                            </p>
                                                            <p class="font-size-14 tracking-normal font-normal basic-profile-text-color mt-2">
                                                                Welcome back, Mentor!
                                                            </p>
                                                        </div>

                                                        <div class="md:w-1/3 pr-2 pl-2">
                                                            <div class="flex justify-around">
                                                                <div class="text-center">
                                                                    <div class="flex justify-center">
                                                                        <p class="font-size-14 mt-2 tracking-normal font-normal basic-profile-text-color ">
                                                                            {program.mentorId.length}
                                                                            <span class="child-text-color"> Mentors </span>
                                                                        </p>
                                                                    </div>
                                                                    <div class="text-center">
                                                                        <div class="flex justify-center">
                                                                            <p class="font-size-14 mt-2 tracking-normal font-normal basic-profile-text-color ">
                                                                                {program.menteeId.length}
                                                                                <span class="child-text-color">
                                                                                    Mentees
                                                                                </span>
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div class="md:w-1/3 pr-2 pl-2">
                                                            <div class=" flex justify-end">
                                                                <button class="text-white text-1sm flex items-center outline-none tracking-normal font-normal text-center sign-btn-padding rounded-full w-auto blue-gradient"
                                                                    onClick={() => {
                                                                        history.push("/mentorshipDetails/" + program._id + "/mentor/completed");
                                                                    }}
                                                                >
                                                                    <span class="pr-2">View details</span>
                                                                    <i class="fas fa-arrow-right"></i>
                                                                </button>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </>
                                        )
                                    })
                                        :
                                        <div className="white-banner about-banner p-5 rounded-xl mt-4">
                                            No Programs
                                        </div>
                                    }


                                    <div className="font-size-16 font-bold mt-3">
                                        My Mentee Programs
                                    </div>
                                    {myMenteePrograms.length > 0 ? myMenteePrograms.map((program) => {
                                        return (
                                            <>
                                                <div className="white-banner about-banner p-5 rounded-xl mt-4">
                                                    <div className="md:flex flex items-center cursor-pointer">
                                                        <div class="md:w-1/3 pr-2">
                                                            <h1 class="basic-profile-text-color font-size-16 font-medium tracking-normal">
                                                                <b>{program.name}</b>
                                                            </h1>
                                                            <p class="font-normal tracking-normal child-text-color font-size-12 mt-2">
                                                                Started on {getDate(program.startDate)}
                                                            </p>
                                                            <p class="font-size-14 tracking-normal font-normal basic-profile-text-color mt-2">
                                                                Welcome back, Mentee!
                                                            </p>
                                                        </div>

                                                        <div class="md:w-1/3 pr-2 pl-2">
                                                            <div class="flex justify-around">
                                                                <div class="text-center">
                                                                    <div class="flex justify-center">
                                                                        <p class="font-size-14 mt-2 tracking-normal font-normal basic-profile-text-color ">
                                                                            {program.mentorId.length}
                                                                            <span class="child-text-color"> Mentors </span>
                                                                        </p>
                                                                    </div>
                                                                    <div class="text-center">
                                                                        <div class="flex justify-center">
                                                                            <p class="font-size-14 mt-2 tracking-normal font-normal basic-profile-text-color ">
                                                                                {program.menteeId.length}
                                                                                <span class="child-text-color">
                                                                                    Mentees
                                                                                </span>
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div class="md:w-1/3 pr-2 pl-2">
                                                            <div class=" flex justify-end">
                                                                <button class="text-white text-1sm flex items-center outline-none tracking-normal font-normal text-center sign-btn-padding rounded-full w-auto blue-gradient"
                                                                    onClick={() => {
                                                                        history.push("/mentorshipDetails/" + program._id + "/mentee/completed");
                                                                    }}
                                                                >
                                                                    <span class="pr-2">View details</span>
                                                                    <i class="fas fa-arrow-right"></i>
                                                                </button>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </>
                                        )
                                    })
                                        :
                                        <div className="white-banner about-banner p-5 rounded-xl mt-4">
                                            No Programs
                                        </div>
                                    }

                                    <div className="font-size-16 font-bold mt-3">
                                        My Pending Request Programs
                                    </div>
                                    {pendingRequestProgram.length > 0 ? pendingRequestProgram.map((program) => {
                                        return (
                                            <>
                                                <div className="white-banner about-banner p-5 rounded-xl mt-4">
                                                    <div className="md:flex flex items-center cursor-pointer">
                                                        <div class="md:w-1/3 pr-2">
                                                            <h1 class="basic-profile-text-color font-size-16 font-medium tracking-normal">
                                                                <b>{program.name}</b>
                                                            </h1>
                                                            <p class="font-normal tracking-normal child-text-color font-size-12 mt-2">
                                                                Started on {getDate(program.startDate)}
                                                            </p>
                                                        </div>

                                                        <div class="md:w-1/3 pr-2 pl-2">
                                                            <div class="flex justify-around">
                                                                <div class="text-center">
                                                                    <div class="flex justify-center">
                                                                        <p class="font-size-14 mt-2 tracking-normal font-normal basic-profile-text-color ">
                                                                            {program.mentorId.length}
                                                                            <span class="child-text-color"> Mentors </span>
                                                                        </p>
                                                                    </div>
                                                                    <div class="text-center">
                                                                        <div class="flex justify-center">
                                                                            <p class="font-size-14 mt-2 tracking-normal font-normal basic-profile-text-color ">
                                                                                {program.menteeId.length}
                                                                                <span class="child-text-color">
                                                                                    Mentees
                                                                                </span>
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/* <div class="md:w-1/3 pr-2 pl-2">
                                                            <div class=" flex justify-end">
                                                                <button class="text-white text-1sm flex items-center outline-none tracking-normal font-normal text-center sign-btn-padding rounded-full w-auto blue-gradient"
                                                                    onClick={() => {
                                                                        history.push("/mentorshipDetails/" + program._id + "/mentor/pending");
                                                                    }}
                                                                >
                                                                    <span class="pr-2">View Mentee Application</span>
                                                                    <i class="fas fa-arrow-right"></i>
                                                                </button>
                                                            </div>
                                                        </div> */}

                                                    </div>
                                                </div>
                                            </>
                                        )
                                    })
                                        :
                                        <div className="white-banner about-banner p-5 rounded-xl mt-4">
                                            No Pending Programs
                                        </div>
                                    }

                                    {/* </Row> */}
                                </TabPane>
                                <TabPane tabId="2">

                                    <div className="font-size-16 font-bold mt-3">
                                        New Mentor Programs
                                    </div>
                                    {console.log('explorePrograms :', explorePrograms)}

                                    {explorePrograms.length > 0 ? explorePrograms.map((program) => {
                                        return (
                                            <>
                                                <div className="white-banner about-banner p-5 rounded-xl mt-4">
                                                    <div className="md:flex flex items-center cursor-pointer">
                                                        <div class="md:w-1/3 pr-2">
                                                            <h1 class="basic-profile-text-color font-size-16 font-medium tracking-normal">
                                                                <b>{program.name}</b>
                                                            </h1>
                                                            <p class="font-normal tracking-normal child-text-color font-size-12 mt-2">
                                                                Started on {getDate(program.startDate)}
                                                            </p>
                                                        </div>

                                                        <div class="md:w-1/3 pr-2 pl-2">
                                                            <div class="flex justify-around">
                                                                <div class="text-center">
                                                                    <div class="flex justify-center">
                                                                        <p class="font-size-14 mt-2 tracking-normal font-normal basic-profile-text-color ">
                                                                            {program.mentorId.length}
                                                                            <span class="child-text-color"> Mentors </span>
                                                                        </p>
                                                                    </div>
                                                                    <div class="text-center">
                                                                        <div class="flex justify-center">
                                                                            <p class="font-size-14 mt-2 tracking-normal font-normal basic-profile-text-color ">
                                                                                {program.menteeId.length}
                                                                                <span class="child-text-color">
                                                                                    Mentees
                                                                                </span>
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div class="md:w-1/3 pr-2 pl-2">
                                                            <div class=" flex justify-end">
                                                                <button
                                                                    class="text-white text-1sm flex items-center outline-none tracking-normal font-normal text-center sign-btn-padding rounded-full w-auto blue-gradient"
                                                                    onClick={() => {
                                                                        toggleMentorshipRequestModal();
                                                                        setSelectedProgram(program)
                                                                    }}
                                                                >
                                                                    <span class="pr-2">View details</span>
                                                                    <i class="fas fa-arrow-right"></i>
                                                                </button>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </>
                                        )
                                    })
                                        :
                                        <div className="white-banner about-banner p-5 rounded-xl mt-4">
                                            No New Programs
                                        </div>
                                    }

                                </TabPane>
                            </TabContent>
                        </div>

                    </div>
                </div>
            </main>

            {mentorshipRequestModal && <MentorshipRequestModal modal={mentorshipRequestModal} toggle={toggleMentorshipRequestModal} program={selectedProgram} />}

        </div>
    )
}

export default Mentorship
