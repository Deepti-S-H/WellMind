import React from "react";
import RadioOptions from "../../../components/radiogroup/RadioOptions";
import Button from "../../../components/button/Button";

export default function Feedback(
    {
        selectedValue,
        onOptSelect,
        onSubmit
    }
) {
    const feedbackInfo = {
        q1: {
            ques: "How easy  was it to go through course pages?",
            data: [
                {
                    value: "Very Easy",
                    label: "Very Easy "
                },
                {
                    value: "Easy",
                    label: "Easy"
                },
                {
                    value: "Neutral",
                    label: "Neutral"
                },
                {
                    value: "Difficult",
                    label: "Difficult"
                },
                {
                    value: "Very difficult",
                    label: "Very difficult"
                }

            ]
        },
        q2: {
            ques: "Was the module organized and structured properly?",
            data: [
                {
                    value: "Strongly agree",
                    label: "Strongly agree"
                },
                {
                    value: "Agree",
                    label: "Agree"
                },
                {
                    value: "Neither agree or disagree",
                    label: "Neither agree or disagree"
                },
                {
                    value: "Disagree",
                    label: "Disagree"
                },
                {
                    value: "Strongly disagree",
                    label: "Strongly disagree"
                }

            ]
        },
        q3: {
            ques: "Did the module increased your knowledge and skills in the subject matter?",
            data: [
                {
                    value: "Strongly agree",
                    label: "Strongly agree"
                },
                {
                    value: "Agree",
                    label: "Agree"
                },
                {
                    value: "Neither agree or disagree",
                    label: "Neither agree or disagree"
                },
                {
                    value: "Disagree",
                    label: "Disagree"
                },
                {
                    value: "Strongly disagree",
                    label: "Strongly disagree"
                }

            ]
        },
        q4: {
            ques: "How helpful did you find the module?",
            data: [
                {
                    value: "Very helpful",
                    label: "Very helpful"
                },
                {
                    value: "Helpful",
                    label: "Helpful"
                },
                {
                    value: "Undecided",
                    label: "Undecided"
                },
                {
                    value: "Not helpful",
                    label: "Not helpful"
                }
            ]
        },
        q5: {
            ques: "Rate your overall experience of the Module",
            data: [
                {
                    value: "Very Good ",
                    label: "Very Good "
                },
                {
                    value: "Good",
                    label: "Good"
                },
                {
                    value: "Acceptable",
                    label: "Acceptable"
                },
                {
                    value: "Poor",
                    label: "Poor"
                },
                {
                    value: "Needs improvement",
                    label: "Needs improvement"
                }
            ]
        }
    }
    return(
        <>
 {
                            Object.keys(feedbackInfo).map((eachQue, queIndex) => (
                                <>

                                    <h5>{queIndex + 1}: {feedbackInfo[eachQue]["ques"]}</h5>
                                    <ul className="col-md-3">
                                        <RadioOptions
                                            selectedValue={selectedValue[eachQue]}
                                            name={"feedback"}
                                            onChange={onOptSelect}
                                            data={feedbackInfo[eachQue].data}
                                            qNo={eachQue}
                                        />
                                    </ul>
                                </>
                            ))
                        }
                        <Button
                            style={{
                                background: " #ff8776",
                                color: "White",
                                cursor: "pointer",
                                border: "1px solid #ff8776"
                            }}
                            id="module4-submit-id"
                            text="Submit"
                            className="col-md-1 col-sm-3 p-2 fw-bold submit-btn"
                            onClick={onSubmit}
                        />
        </>
    )
}