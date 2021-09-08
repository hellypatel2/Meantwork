/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid,jsx-a11y/img-redundant-alt */
import { Button, TextField } from "@material-ui/core";
import React, { useState } from "react";
import swal from "sweetalert2";

export default function QuestionDetails(props) {
  const { parentQuestions, parentAddQuestions, parentUpdateQuestions, parentDeleteQuestions } = props;
  const [question, setQuestion] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [addOrUpdateQuestion, setAddOrUpdateQuestion] = useState(false);
  const [editIndex, setEditIndex] = useState();

  const addThisMentorButton = () => {
    if (!question) {
      swal.fire({
        position: "top-end",
        icon: "error",
        text: "Please Enter Questoin To Add.",
        title: "Not Added",
        timer: 2000,
        showConfirmButton: false,
      });
    } else {
      parentAddQuestions(question);
      setIsEdit(false);
      setAddOrUpdateQuestion(false);
    }
  };

  const editThisMentorButton = () => {
    parentUpdateQuestions(question, editIndex);
    setIsEdit(false);
    setAddOrUpdateQuestion(false);
  };

  return (
    <div>
      {!isEdit && parentQuestions &&
        parentQuestions.map((question, key) => {
          return (
            <div className="card card-custom shadow-lg my-3">
              <div className="card-body py-4">
                <div className="flex justify-between align-center" style={{ display: "flex" }}>
                  <div style={{ width: "90%" }}> {question}</div>
                  <div style={{ width: "10%", textAlign: "right" }}>
                    <i
                      className="fas fa-pencil-alt m-1"
                      onClick={() => {
                        setIsEdit(true);
                        setAddOrUpdateQuestion(true);
                        setQuestion(question);
                        setEditIndex(key);
                      }}
                    ></i>
                    <i
                      className="fas fa-trash m-1"
                      onClick={() => {
                        parentDeleteQuestions(key);
                        setDeleted(!deleted);
                        setIsEdit(false);
                        setAddOrUpdateQuestion(false);
                      }}
                    ></i>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

      {addOrUpdateQuestion && (
        <div className="py-4">
          <div className="w-full">
            <input
              className="shadow w-full appearance-none border rounded ml-2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-3"
              id="outlined-name"
              fullWidth
              autoComplete="off"
              label="Question"
              placeholder="Question"
              margin="normal"
              variant="outlined"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
          </div>
          <div className="flex">
            <div className="mr-2">
              {isEdit ? (
                <Button variant="contained" color="primary" style={{ "color": "#fff" }} onClick={() => editThisMentorButton()}>
                  Edit this Question
                </Button>
              ) : (
                <Button variant="contained" color="primary" style={{ "color": "#fff" }} onClick={() => addThisMentorButton()}>
                  Add this Question
                </Button>
              )}
            </div>
            <div className="">
              <Button
                className="ml-2"
                variant="contained"
                color="secondary"
                onClick={() => {
                  setIsEdit(false);
                  setAddOrUpdateQuestion(false);
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      <div
        className="card card-custom shadow-lg"
        disabled={isEdit}
        onClick={() => {
          setAddOrUpdateQuestion(true);
          setIsEdit(false);
          setQuestion("");
        }}
      >
        <div className="py-4 text-center pr-2 cursor-pointer">
          {" "}
          Add Question <i className="fas fa-plus-circle"></i>
        </div>
      </div>
    </div>
  );
}
