import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { ApiGet, ApiPost, ApiPut } from "../../helpers/API/ApiData";
import swal from "sweetalert2";
import QuestionDetails from "./QuestionDetails";
import { getDate } from "../../helpers/utils";
import { Autocomplete } from "@material-ui/lab";
import { Col, Row } from "react-bootstrap";
import Checkbox from "@material-ui/core/Checkbox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import { TextField } from "@material-ui/core";
import Auth from "../../helpers/Auth";
import lodash from "lodash";

const NewProgram = () => {
  const [enteredQuestion, setQuestion] = useState("");
  const [questionList, setQuestionList] = useState([]);
  const history = useHistory();
  const { id } = useParams();
  const [questions, setQuestions] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedMentors, setSelectedMentors] = useState([]);
  const [loading, setLoading] = useState(false);
  const userData = Auth.getAuthData();

  const [program, setProgram] = React.useState({
    userId: '',
    startDate: '',
    endDate: '',
    name: '',
    maxMentees: null,
    description: '',
    mentorId: [],
    question: []
  });

  const setFormValues = (e) => {
    let { name, value } = e.target;
    setProgram({ ...program, [name]: name == "maxMentees" ? Number(value) : value });
  };

  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  const getMentorshipProgramById = async () => {
    const res = await ApiGet("mentorshipProgram/" + id);
    try {
      if (parseInt(res.data.status / 100) === 2) {
        let data = res.data.data
        data.startDate = getDate(data.startDate)
        data.endDate = getDate(data.endDate)
        setSelectedMentors(data.mentorId)
        setProgram(data)

        // setIncomingProgram(res.data.data);
        // setNameOfMentoring(res.data.data.name);
        // setStartDate(getDate(res.data.data.startDate));
        // if (res.data.data.endDate) { setEndDate(getDate(res.data.data.endDate)) } else { setNoLimitForEndDate(true) };
        // setDescriptionOfMentoring(res.data.data.description);
        // setNumberOfMentors(res.data.data.maxMentors);
        // setNumberOfMentees(res.data.data.maxMentees);
        // setNumberOfMentoring(res.data.data.numberOfSession);
        // setSessionInfo(res.data.data.sessionId);
        // setVisibility(res.data.data.privacy);
        // setSelectedMentors(res.data.data.mentorId);
        // setSelectedMentees(res.data.data.menteeId);
        // setNoLimitForMentors(res.data.data.maxMentors === null ? true : false);
        // setNoLimitForMentees(res.data.data.maxMentees === null ? true : false);
        // setNoLimitForEndDate(res.data.data.endDate ? false : true);
        setQuestions(
          res.data.data.questionId &&
          res.data.data.questionId.map((obj) => obj.question)
        );
      }
    } catch (error) {
      swal.fire({
        title: "Something Went Wrong in fetching this program",
        text: error,
        icon: "error",
      });
    }
  };

  const getAllUsers = async () => {
    const res = await ApiGet("user/getUsers");
    try {
      if (parseInt(res.data.status / 100) === 2) {
        setUsers(res.data.data)
      }
    } catch (error) {
      swal.fire({
        title: "Something Went Wrong in fetching users",
        text: error,
        icon: "error",
      });
    }

  }

  useEffect(() => {
    id && getMentorshipProgramById();
    getAllUsers();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const finishClick = async (e) => {
    e.preventDefault();

    if (program.name === "") {
      swal.fire({
        position: "top-end",
        icon: "error",
        text: "Please Fill Name of Mentorship Program.",
        title: "Form not filled",
        timer: 2000,
        showConfirmButton: false,
      });
    } else if (program.description === "") {
      swal.fire({
        position: "top-end",
        icon: "error",
        text: "Please Fill Description.",
        title: "Form not filled",
        timer: 2000,
        showConfirmButton: false,
      });
    } else if (program.startDate === "") {
      swal.fire({
        position: "top-end",
        icon: "error",
        text: "Please Fill Start Date.",
        title: "Form not filled",
        timer: 2000,
        showConfirmButton: false,
      });
    } else if (program.endDate === "") {
      swal.fire({
        position: "top-end",
        icon: "error",
        text: "Please Fill End Date.",
        title: "Form not filled",
        timer: 2000,
        showConfirmButton: false,
      });
    } else if (program.maxMentees === null) {
      swal.fire({
        position: "top-end",
        icon: "error",
        text: "Please Fill End Date.",
        title: "Form not filled",
        timer: 2000,
        showConfirmButton: false,
      });
    } else if (questions.length === 0) {
      swal.fire({
        position: "top-end",
        icon: "error",
        text: "Please Fill At Least 1 Question.",
        title: "Form not filled",
        timer: 2000,
        showConfirmButton: false,
      });
    } else {

      let questionArray = questions.map((question1) => {
        return { question: question1 };
      });
      let mentorshipData = {
        _id: id,
        userId: userData._id,
        startDate: program.startDate,
        endDate: program.endDate,
        name: program.name,
        description: program.description,
        maxMentees: program.maxMentees,
        mentorId: selectedMentors.map((obj) => obj._id),
        question: questionArray,
      };

      setLoading(true);
      let res;
      id
        ? (res = await ApiPut("mentorshipProgram/", mentorshipData))
        : (res = await ApiPost("mentorshipProgram/", mentorshipData));

      try {
        if (parseInt(res.data.status / 100) === 2) {
          if (res.data.status === 200) {
            swal.fire({
              position: "top-end",
              icon: "success",
              text: res.data.message,
              title: "Success",
              timer: 1500,
              showConfirmButton: false,
            });

            setLoading(false);
            history.push("/adminMentorship");
            // setKeyValue(0)
          } else {
            swal.fire({
              position: "top-end",
              icon: "error",
              text: res.data.message,
              title: "Failure",
              timer: 1500,
              showConfirmButton: false,
            });
            setLoading(false);
          }
        } else {
          setLoading(false);
          swal.fire({
            title: "Something Went Wrong",
            text: res.data.message,
            icon: "warning",
          });
        }
      } catch (error) {
        setLoading(false);
        swal.fire({
          title: "Something Went Wrong",
          text: res.data.message,
          icon: "error",
        });
      }
    }
  };

  const createMentorshipProgramHandler = (event) => {
    event.preventDefault();
    history.push("/adminMentorship");
  };

  const questionHandler = (event) => {
    setQuestion(event.target.value);
  };

  const addQuestionHandler = (event) => {
    event.preventDefault();
    setQuestionList((prevQuestionList) => {
      return [
        ...prevQuestionList,
        {
          question: enteredQuestion,
        },
      ];
    });
    setQuestion("");
  };
  return (
    <div>
      {console.log('users', users)}
      {console.log('program', program)}
      <div className="s-layout">
        <main className="s-layout__content">
          <div className="w-full">
            <div className="container-fluid">
              <div className="dashboard-box mt-8 lg:p-5 md:p-3 sm:p-2">
                <div className="md:flex">
                  <div className="md:w-full">
                    <form className="bg-gray-50 shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-2 ">
                      <h1 className="font-size-25 heading-title-text-color font-medium tracking-normal mb-0 cursor-pointer">
                        General
                      </h1>
                      <Row>
                        <Col md={4}>
                          <label
                            className="block text-gray-700 text-sm font-bold mb-2 mt-2"
                            for="username"
                          >
                            Program Name :
                          </label>
                        </Col>
                        <Col md={6}>
                          <input
                            className="shadow w-full appearance-none border rounded ml-2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="name"
                            type="text"
                            placeholder="program name"
                            name="name"
                            value={program.name}
                            onChange={(e) => setFormValues(e)}
                          />
                        </Col>
                      </Row>

                      <Row className="pt-2">
                        <Col md={4}>
                          <label
                            className="block text-gray-700 text-sm font-bold mb-2 mt-2"
                            for="username"
                          >
                            Max No of Mentees :
                          </label>
                        </Col>
                        <Col md={6}>
                          <input
                            className="w-full shadow appearance-none border rounded ml-2 pl-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-10 h-10"
                            type="number"
                            min={1}
                            // disabled={noLimitForMentors}
                            name="maxMentees"
                            value={program.maxMentees}
                            onChange={(e) => {
                              setFormValues(e)
                            }
                            }
                          />
                        </Col>
                      </Row>

                      <Row>
                        <Col md={4}>
                          <label
                            className="block text-gray-700 text-sm font-bold mb-2 mt-2"
                            for="username"
                          >
                            Select Mentors :
                          </label>
                        </Col>

                        <Col md={6}>
                          <>
                            <br />
                            <Autocomplete
                              // limitTags={numberOfMentors}
                              // clearText
                              multiple
                              id="checkboxes-tags-demo"
                              options={
                                lodash.differenceBy(users, selectedMentors, "_id")
                              }
                              disableCloseOnSelect
                              getOptionLabel={(option) => option?.username}
                              renderOption={(option, { selected }) => (
                                <React.Fragment>
                                  <Checkbox
                                    icon={icon}
                                    checkedIcon={checkedIcon}
                                    style={{ marginRight: 8 }}
                                    checked={selected}
                                  />
                                  {option?.username}
                                </React.Fragment>
                              )}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  variant="outlined"
                                  label="Mentors"
                                  placeholder="Mentors"
                                />
                              )}
                              value={selectedMentors}
                              onChange={(e, value) =>
                                program.maxMentees
                                  ? value.length < program.maxMentees + 1
                                    ? (e.preventDefault(), setSelectedMentors(value))
                                    : ((value.length = program.maxMentees),
                                      swal.fire({
                                        title: "Limit Exceeded",
                                        text: `Only ${program.maxMentees} Mentors can be Added`,
                                        icon: "warning",
                                      }))
                                  :
                                  // noLimitForMentors
                                  //   ? (e.preventDefault(), setSelectedMentors(value))
                                  swal.fire({
                                    title: "Enter Number of Mentors",
                                    text: `Mentors not Added`,
                                    icon: "warning",
                                  })
                              }
                            />
                            <br />
                          </>

                        </Col>
                      </Row>

                      <Row>
                        <Col md={4}>
                          <label
                            className="block text-gray-700 text-sm font-bold mb-2 mt-2"
                            for="username"
                          >
                            Program Description :
                          </label>
                        </Col>
                        <Col md={6}>
                          <textarea
                            className="shadow appearance-none w-full border rounded ml-2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="username"
                            type="text"
                            placeholder="Program Description"
                            name="description"
                            value={program.description}
                            onChange={(e) => setFormValues(e)}
                          />
                        </Col>
                      </Row>

                      <Row className="pt-2">
                        <Col md={4}>
                          <div className="mb-4 flex">
                            <label
                              className="block text-gray-700 text-sm font-bold mb-2 mt-2"
                              for="username"
                            >
                              Start Date :
                            </label>
                            <input
                              className="shadow appearance-none border rounded ml-2  text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
                              id="username"
                              type="date"
                              name="startDate"
                              value={program.startDate}
                              onChange={(e) => setFormValues(e)}
                            />
                          </div>
                        </Col>
                        <Col md={6}>
                          <div className="mb-4 flex">
                            <label
                              className="block text-gray-700 text-sm font-bold mb-2 mt-2"
                              for="username"
                            >
                              End Date :
                            </label>
                            <input
                              className="shadow appearance-none border rounded ml-2  text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
                              id="username"
                              type="date"
                              name="endDate"
                              value={program.endDate}
                              onChange={(e) => setFormValues(e)}
                            />
                          </div>
                        </Col>
                      </Row>

                      <div className="mt-4">
                        <h2 className="font-size-25 heading-title-text-color font-medium tracking-normal mb-0 cursor-pointer">
                          Request Form
                        </h2>
                        <h4 className="mt-2 font-size-16">
                          This is the questionnaire that a Mentee sees when applying to
                          be mentored by a Mentor
                        </h4>
                      </div>
                      <div>

                        <QuestionDetails
                          parentQuestions={questions}
                          parentAddQuestions={(value) => questions.push(value)}
                          parentUpdateQuestions={(value, key) => (questions[key] = value)}
                          parentDeleteQuestions={(index) => questions.splice(index, 1)}
                        />

                        <div className="">
                          <ul>
                            {questionList.map((data, key) => {
                              return (
                                <li
                                  key={key}
                                  className="text-center bg-gray-200 p-3 m-1"
                                >
                                  {data.question}
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      </div>
                      <div className="text-center">
                        <button
                          class="bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-8"
                          type="submit"
                          onClick={(e) => finishClick(e)}
                        >
                          {id ? "Update" : "Create"} Program
                          {loading && <span className="ml-3 spinner spinner-white"></span>}
                        </button>
                      </div>

                    </form>

                  </div>

                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div >
  );
};

export default NewProgram;
