/* This example requires Tailwind CSS v2.0+ */
import { useRef, useState } from 'react'
// import { Dialog } from '@headlessui/react'
import { Modal } from 'reactstrap';
import { toast } from 'react-toastify';

import swal from "sweetalert2";
import { Input } from 'reactstrap';
import Auth from '../../helpers/Auth';
import { ApiPost, ApiPut } from '../../helpers/API/ApiData';
import { useHistory } from 'react-router-dom';

export default function ScheduleModal(props) {

    const cancelButtonRef = useRef(null)

    const { open, toggle, request, meeting, getAll } = props;
    const [meetingType, setMeetingType] = useState(meeting?.meetingType);
    const [date, setDate] = useState(meeting?.meetingDate);
    const [time, setTime] = useState(meeting?.meetingTime);
    const [skypeId, setSkypeId] = useState(meeting?.skypeId);
    const [googleMeetLink, setGoogleMeetLink] = useState(meeting?.googleMeetLink);
    const [location, setlocation] = useState(meeting?.location);
    const [message, setmessage] = useState(meeting?.message);
    const [loading, setLoading] = useState(false);
    const history = useHistory()

    const [mentorshipProgram, setMentorshipProgram] = useState(meeting?.programId.name || request?.programId.name);

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true);
        if (time !== "" && date !== "" && message !== "" && (skypeId !== "" || googleMeetLink !== "" || location !== "")) {

            const body = {
                creatorId: Auth.getUserData()._id,
                memberId: request?.menteeId._id == Auth.getUserData()._id ? request.mentorId._id : request.menteeId._id,
                programId: request?.programId._id,
                meetingDate: date,
                meetingTime: time,
                meetingType: meetingType,
                location: location,
                googleMeetLink: googleMeetLink,
                skypeId: skypeId,
                message: message
            }
            await ApiPost("scheduleMeeting/", body)
                .then((res) => {
                    if (res.data.status === 200) {
                        toast.success("Scheduled Successfully")
                        // getAll()
                        toggle()
                        history.push("/meeting")
                    } else {
                        toast.error("Error")
                    }

                })

            toggle()
        } else {
            swal.fire({ title: "Missing Data", text: "Please Fill Missing Data", icon: "error", timer: 700, showConfirmButton: false, });
        }
        setLoading(false);
    }

    const handleAcceptCancel = async (type) => {
        setLoading(true);
        const body = {
            _id: meeting._id,
            status: type
        }
        await ApiPut("scheduleMeeting/", body)
            .then((res) => {
                if (res.data.status === 200) {
                    toast.success(`Meeting ${type}ed Successfully`)
                    getAll()
                    toggle()
                } else {
                    toast.error("Error")
                }

            })
        setLoading(false);
    }

    return (
        <Modal isOpen={open} size="lg" centered toggle={toggle}>
            {console.log("request :", request)}
            <form onSubmit={(e) => handleSubmit(e)}>

                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">

                    <div className="flex items-center justify-between pb-8">
                        <p className="font-size-25 heading-title-text-color font-medium tracking-normal mb-0">Schedule Meeting</p>
                        <i class="fas fa-times icon-color font-size-25" onClick={() => { toggle() }}></i>
                    </div>

                    <div className="md:flex md:flex-wrap">
                        <div>

                        </div>
                        <div className="md:w-7/12 mb-4">
                            <input type="text" name="mentorshipProgram" value={mentorshipProgram} onChange={(e) => { setMentorshipProgram(e.target.value) }} className={`h-11 w-full outline-none rounded-full form-control basic-profile-text-color `} placeholder="Mentorship Program" disabled />
                        </div>

                        <h1 className="md:w-full font-normal tracking-normal font-size-16 basic-profile-text-color pt-4">
                            <b> Meeting Date</b>
                        </h1>
                        <div className="md:w-7/12">
                            <Input
                                type="date"
                                className={`h-11 w-full outline-none rounded-full form-control basic-profile-text-color `}
                                name="datetime"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                id="exampleDatetime"
                                placeholder="datetime placeholder"
                                disabled={meeting ? true : false}
                            />
                        </div>

                        <h1 className="md:w-full font-normal tracking-normal font-size-16 basic-profile-text-color pt-4">
                            <b> Meeting Time</b>
                        </h1>
                        <div className="md:w-7/12">
                            <Input
                                type="time"
                                className={`h-11 w-full outline-none rounded-full form-control basic-profile-text-color `}
                                name="datetime"
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
                                disabled={meeting ? true : false}
                            />
                        </div>

                        <h1 className="md:w-full font-normal tracking-normal font-size-16 basic-profile-text-color pt-4">
                            <b> Type Of Meeting </b>
                        </h1>

                        <div className="md:w-full pt-3 flex">
                            <label check className="w-1/3">
                                <input
                                    type="radio"
                                    name="meetingtype"
                                    checked={meetingType === "GoogleMeet"}
                                    value="GoogleMeet"
                                    onChange={(e) => {
                                        setMeetingType(e.target.value);
                                        setlocation("");
                                        setSkypeId("");
                                    }}
                                    disabled={meeting ? true : false}
                                />
                                <span name="type" className="font-size-14">
                                    &nbsp;&nbsp;&nbsp;&nbsp; Google Meet
                                </span>
                            </label>
                            <input type="text" name="googleMeet" style={{ display: meetingType === "GoogleMeet" ? "flex" : "none" }} className={`border-black w-2/3 border-b `} value={googleMeetLink} onChange={(e) => setGoogleMeetLink(e.target.value)} placeholder="Google Meet Link"
                                disabled={meeting ? true : false}
                            />
                        </div>

                        <div className="md:w-full pt-2 flex">
                            <label check className="w-1/3">
                                <input
                                    type="radio"
                                    name="meetingtype"
                                    checked={meetingType === "Skype"}
                                    value="Skype"
                                    onChange={(e) => {
                                        setMeetingType(e.target.value);
                                        setlocation("");
                                        setGoogleMeetLink("");
                                    }}

                                    disabled={meeting ? true : false}
                                />
                                <span className="font-size-14">&nbsp;&nbsp;&nbsp;&nbsp; Skype</span>
                            </label>
                            <input type="text" name="skypeId" style={{ display: meetingType === "Skype" ? "flex" : "none" }} className={`border-black w-2/3 border-b `} value={skypeId} onChange={(e) => setSkypeId(e.target.value)} placeholder="Skype ID"
                                disabled={meeting ? true : false}
                            />
                        </div>

                        <div className="md:w-full pt-2 flex">
                            <label check className="w-1/3">
                                <input
                                    type="radio"
                                    name="meetingtype"
                                    checked={meetingType === "Inperson"}
                                    value="Inperson"
                                    onChange={(e) => {
                                        setMeetingType(e.target.value)
                                        setSkypeId("");
                                        setGoogleMeetLink("");
                                    }}

                                    disabled={meeting ? true : false}
                                />
                                <span className="font-size-14">&nbsp;&nbsp;&nbsp;&nbsp; In-Person</span>
                            </label>
                            <input type="text" name="location" style={{ display: meetingType === "Inperson" ? "flex" : "none" }} className={`border-black w-2/3 border-b `} value={location} onChange={(e) => setlocation(e.target.value)} placeholder="Location"
                                disabled={meeting ? true : false}
                            />
                        </div>

                        <div className="md:w-1/2 pr-4"></div>
                        <div className="md:w-full pt-4">
                            <textarea rows="2" cols="50" name="message" className={`border-2 p-1 w-full rounded-xl w-full outline-none form-control-1 basic-profile-text-color mt-3 `} value={message} onChange={(e) => setmessage(e.target.value)} placeholder="Add a message (eg. why do you want to meet. etc.)"></textarea>
                            {/* {formik.touched.message && formik.errors.message ? <span className="text-red-500 font-size-12 pl-2">{formik.errors.message}</span> : null} */}
                        </div>

                    </div>



                </div>

                {!meeting &&
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button
                            type="submit"
                            // className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-gray-700 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                        >
                            Schedule Meeting
                        </button>
                        <button
                            type="button"
                            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                            onClick={() => toggle()}
                            ref={cancelButtonRef}
                        >
                            Cancel
                        </button>
                    </div>
                }
                {meeting?.memberId._id == Auth.getUserData()._id &&
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button
                            type="submit"
                            // className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-green-400 text-base font-medium text-gray-700 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                            onClick={() => {
                                handleAcceptCancel("accept")
                            }}
                        >
                            Confirm Meeting
                        </button>
                        <button
                            type="button"
                            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 text-base font-medium text-gray-700 bg-red-400 hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                            onClick={() => {
                                handleAcceptCancel("reject")
                            }}
                        >
                            Reject Meeting
                        </button>
                    </div>
                }
            </form>
        </Modal>

        // </Transition.Root>
    )
}
