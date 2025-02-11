import React, { useEffect } from "react";
import RadioOptions from "../../../components/radiogroup/RadioOptions";
import Button from "../../../components/button/Button";
import CheckBox from "../../../components/checkbox/CheckBox";
import 'toastr/build/toastr.min.css';
import "./PrePostTest.css"
import calculateUsedTime from "../../../utils/Tools";

export default function PrePostTest({
    testType,
    testDetails,
    selectedValue,
    onOptSelect,
    onTestSubmit,
    moduleNo,
    checkboxFun,
    selectedAnswers,
    btnClass
}) {


    useEffect(() => {
        if (testType == 'PRE-TEST') {
            calculateUsedTime();
        }

    }, [])

    return (
        <>

            <div className="text-start module4-pre-test-section py-4 px-5">
                <h4 className="fw-bold pre-test-title mb-3">{testType}</h4>
                {
                    Object.keys(testDetails).map((eachQue, queIndex) => (
                        <>

                            <h5>{queIndex + 1}: {testDetails[eachQue]["ques"]}</h5>
                            <ul>
                                <RadioOptions
                                    selectedValue={selectedValue[eachQue]}
                                    name={"pre-test"}
                                    onChange={onOptSelect}
                                    data={testDetails[eachQue].data}
                                    qNo={eachQue}
                                />
                            </ul>
                        </>
                    ))
                }

                {
                    moduleNo == 6 && (
                        <CheckBox
                            module={6}
                            questions={[
                                {
                                    id: 1,
                                    question: 'What are some effects of anger on the mind? Select all that apply',
                                    options: [
                                        { id: 'q1_option1', label: 'Feeling tense, nervous, or unable to relax' },
                                        { id: 'q1_option2', label: 'Feeling guilty' },
                                        { id: 'q1_option3', label: 'Feeling resentful towards other people or situations' },
                                        { id: 'q1_option4', label: 'Sweating, especially in the palms' },
                                    ],
                                }
                            ]}
                            func={checkboxFun}
                            answers={selectedAnswers}
                            labelclass={'col-md-4 py-2 px-4'}

                        />
                    )
                }
                <Button
                    id="module4-pre-test-btn-id"
                    text="Submit"
                    className={btnClass}
                    onClick={onTestSubmit}
                />
            </div>
        </>
    )
}