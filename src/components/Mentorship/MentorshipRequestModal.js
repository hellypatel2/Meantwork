import React, { useEffect, useState } from 'react'
import { Col, Input, Row } from 'reactstrap'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { ApiGet, ApiPost } from '../../helpers/API/ApiData';
import Auth from '../../helpers/Auth';
import { toast } from 'react-toastify';

const MentorshipRequestModal = ({ modal, toggle, program, request, getAll }) => {

    const [mentorId, setMentorId] = useState(false);
    const [selectedProgram, setSelectedProgram] = useState(program)
    const [loading, setLoading] = useState(false);
    const [rejectloading, setRejectLoading] = useState(false);

    const [questionanswers, setQuestionanswers] = useState(new Array(program.questionId.length).fill({
        questionId: "",
        answer: "",
    }))

    const getProgram = async (e) => {
        await ApiGet("mentorshipProgram/" + program._id)
            .then(res => {
                setSelectedProgram(res.data.data)
            }).catch(err => {
                console.log("error getting Events : ", err);
            })
    }

    useEffect(() => {
        if (request) {
            setMentorId(request.mentorId._id)
            getProgram()
            setQuestionanswers(request.answers)
        }
    }, [])

    const sendRequest = async () => {
        setLoading(true);

        const body = {
            mentorId: mentorId,
            menteeId: Auth.getUserData()._id,
            programId: program._id,
            questionanswers: questionanswers
        }
        await ApiPost("mentorshipRequest/", body)
            .then((res) => {
                if (res.data.status === 200) {
                    toggle()
                    toast.success("Request sent successfully!")
                } else {
                    toast.error("Error")
                }

            })
        setLoading(false);
    }

    const acceptRejectRequest = async (type) => {
        type == "completed" ? setLoading(true) : setRejectLoading(true);

        const body = {
            _id: request._id,
            programId: program._id,
            menteeId: request.menteeId._id,
            status: type
        }
        await ApiPost("mentorshipRequest/acceptRejectMenteeRequest", body)
            .then((res) => {
                if (res.data.status === 200) {
                    getAll && getAll()
                    toggle()
                    toast.success(`Request ${type}ed successfully!`)
                } else {
                    toast.error("Error")
                }

            })
        type == "completed" ? setLoading(false) : setRejectLoading(false);
    }

    return (
        <div>
            {console.log('program', program)}
            {console.log('selectedProgram :', selectedProgram)}
            <Modal isOpen={modal} size="lg" centered toggle={toggle}>
                <ModalHeader toggle={toggle}> Mentorship Details </ModalHeader>
                <ModalBody>
                    <Row className="pt-4">
                        <Col md={6} className="font-bold">
                            Name
                        </Col>
                        <Col md={6}>
                            {selectedProgram.name}
                        </Col>
                    </Row>
                    <Row className="pt-4">
                        <Col md={6} className="font-bold">
                            Description
                        </Col>
                        <Col md={6}>
                            {selectedProgram.description}
                        </Col>
                    </Row>
                    {!request && <Row className="pt-4">
                        <Col md={6} className="font-bold">
                            Select Mentor
                        </Col>
                        <Col md={6}>
                            <Input type="select" name="select" id="exampleSelect" onChange={(e) => { setMentorId(e.target.value) }}>
                                <option>Select Option</option>
                                {program?.mentorId.map((mentor) => {
                                    return (
                                        <option value={mentor._id}>{mentor.username}</option>
                                    )
                                })}
                            </Input>
                        </Col>
                    </Row>}
                </ModalBody>


                <ModalHeader> Questions: </ModalHeader>
                <ModalBody>

                    <Row className="pt-4">
                        <Col md={6} className="font-bold">
                            {selectedProgram?.questionId.map((question) => {
                                return (
                                    <p>{question.question}</p>
                                )
                            })}
                        </Col>
                        <Col md={6}>
                            {selectedProgram?.questionId.map((question, index) => {
                                return (
                                    <textarea
                                        rows="2"
                                        cols="50"
                                        className="w-full rounded-xl w-full outline-none form-control basic-profile-text-color mt-2"
                                        name={"answer" + index}
                                        id={"answer" + index}
                                        value={questionanswers[index]?.answer}
                                        onChange={(e) => {
                                            console.log("index :", index)
                                            setQuestionanswers([
                                                ...questionanswers.slice(0, index),
                                                {
                                                    ...questionanswers[index],
                                                    questionId: question._id,
                                                    answer: e.target.value
                                                },
                                                ...questionanswers.slice(index + 1),
                                            ])
                                        }}
                                        disabled={request}
                                    ></textarea>
                                )
                            })}
                        </Col>
                    </Row>

                </ModalBody>
                <ModalFooter>
                    {request ?
                        request.mentorId._id == Auth.getUserData()._id &&
                        <>
                            <Button color="success" onClick={() => acceptRejectRequest("completed")}>
                                Accept Request {loading ? <span className="fa fa-spinner fa-spin loader"></span> : ""}
                            </Button>{' '}
                            <Button color="danger" onClick={() => acceptRejectRequest("rejected")}>
                                Reject Request {rejectloading ? <span className="fa fa-spinner fa-spin loader"></span> : ""}
                            </Button>
                        </>
                        :
                        <>
                            <Button color="primary" onClick={() => sendRequest()}>
                                Send Request {loading ? <span className="fa fa-spinner fa-spin loader"></span> : ""}
                            </Button>{' '}
                            <Button color="secondary" onClick={() => toggle()}>
                                Cancel
                            </Button>
                        </>
                    }
                </ModalFooter>
            </Modal>
        </div >
    )
}

export default MentorshipRequestModal
