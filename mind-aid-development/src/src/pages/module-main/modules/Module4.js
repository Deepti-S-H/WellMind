import React, { useState, useEffect } from "react";
import ModulesMain from "../ModulesMain";
import RadioOptions from "../../../components/radiogroup/RadioOptions";
import CustomTable from "../../../components/table/CustomTable";
import "./Module4.css";
import Feedback from "../feedback/Feedback";
import PrePostTest from "../pre-post-test/PrePostTest";
import { areAllFieldsFilled } from "../../../utils/Tools";
import { apiPostRequest } from "../../../utils/Network";
import { useNavigate } from "react-router-dom";
import calculateUsedTime from "../../../utils/Tools";

import toastr from "toastr";

export default function Module4() {
    const navigate = useNavigate();
    toastr.options = {
        closeButton: true,
        positionClass: 'toast-top-right',
        preventDuplicates: true,
        timeOut: 3000,
    };

    const apiCall = async () => {
        try {
            const api = "http://127.0.0.1:7700/eachmodulestatus";
            const req_json = { "modulename": "module3", "modulenumber": 3 }
            const response = await apiPostRequest(api, req_json);
            if (response.data.success == true) {
                const dataToPass = response.data.message["modulestatus"];
                if (dataToPass.pretest === 'completed') {
                    setIsPreTestCompleted(true);
                }
                if (dataToPass.pretest === 'completed' && dataToPass.activity === 'completed' && dataToPass.postTest === 'in-progress') {
                    setActivityCompleted(true);
                }
                if (dataToPass.pretest === 'completed' && dataToPass.activity === 'completed') {
                    setIsPreTestCompleted(true);
                    setActivityCompleted(true);
                }
                if (dataToPass.pretest === "completed" && dataToPass.activity === "completed" && dataToPass.posttest === "completed") {
                    navigate("/user-home/activity");
                }
            } else {
                toastr.error(response);
            }
        }
        catch {
            toastr.error("There is an internal error! Please logout and login.")
        }
    }

    useEffect(() => {
        const modulestatus = JSON.parse(localStorage.getItem("all_module_status"))
        if (modulestatus[1].status === 'completed') {
            apiCall();
        } else {
            navigate('/user-home/activity')
        }
    }, []);

    const [anxietyDisAns, setAnxietyDisAns] = useState(
        {
            Q1: "",
            Q2: "",
            Q3: ""
        }
    )
    const [feedback, setFeedback] = useState(
        {
            q1: "",
            q2: "",
            q3: "",
            q4: "",
            q5: ""
        }
    )
    const [preTestResults, setPreTestResults] = useState(
        {
            q1: "",
            q2: "",
            q3: "",
            q4: "",
            q5: ""
        }
    )
    const [postTestResults, setPostTestResults] = useState(
        {
            q1: "",
            q2: "",
            q3: "",
            q4: "",
            q5: ""
        }
    )
    const [isPreTestCompleted, setIsPreTestCompleted] = useState(false)
    const [isActivityCompleted, setActivityCompleted] = useState(false)
    const [depressionActivity, setSelectedDepActivity] = useState(
        {
            "Meaning of depression": '',
            "Need of identifying emotional disorders": '',
            "Types of depression disorders": '',
            "How to deal with depression?": ''
        }
    )
    const [riskFactorsActivity, setRiskFactorActivity] = useState(
        {
            "Biological risk factors": "",
            "Child (individual) characteristics": "",
            "Parenting and family factors": "",
            "Social factors": "",
            "Stressors/Negative life events": "",
            "Stick/draw photo": "",
        }

    );



    const [selectedFile, setSelectedFile] = useState(null);

    const [module4, setModule4] = useState([]);

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleInputChange = (question, ans) => {
        setRiskFactorActivity(prevState => ({
            ...prevState,
            [question]: ans
        }))
    }
    const handleOptionChange = (question, option) => {
        setSelectedDepActivity(prevState => ({
            ...prevState,
            [question]: option
        }));
    };
    const handleAnxietyRadioChange = (event, questionNumber) => {
        setAnxietyDisAns((prevState) => ({
            ...prevState,
            [questionNumber]: event.target.value
        }));
    };

    const handleFbRadioChange = (event, questionNumber) => {
        setFeedback((prevState) => ({
            ...prevState,
            [questionNumber]: event.target.value
        }));
    };
    const handlePreTestResults = (event, questionNumber) => {
        setPreTestResults((prevState) => ({
            ...prevState,
            [questionNumber]: event.target.value
        }));
    }

    const handlePostTestResults = (event, questionNumber) => {
        setPostTestResults((prevState) => ({
            ...prevState,
            [questionNumber]: event.target.value
        }));
        setModule4(
            [

                {

                    "Which of the following is a subgroup of emotional disorders?": preTestResults.q1,
                    "What percentage of children are estimated to be affected by anxiety disorders at any given point in time?": preTestResults.q2,
                    "What is a risk factor associated with the occurrence of emotional disorders?": preTestResults.q3,
                    "True or False: Around 80% of emotional disorders in children go unrecognized due to lack of clinical services": preTestResults.q4,
                    "What are the major symptoms of depression in children?": preTestResults.q5,

                },
                {
                    riskFactorsActivity,
                    depressionActivity,
                    "Repeated nightmares involving the theme of separation": anxietyDisAns.Q1,
                    "Example of social anxiety symptom": anxietyDisAns.Q2,
                    "Which is not a symptom of Generalized anxiety disorder": anxietyDisAns.Q3,
                    "How easy was it to go through course pages?": feedback.q1,
                    "Was the module organized and structured properly?": feedback.q2,
                    "Did the module increased your knowledge and skills in the subject matter?": feedback.q3,
                    "How helpful did you find the module?": feedback.q4,
                    "Rate your overall experience of the Module": feedback.q5
                },
                {
                    "Which of the following is a subgroup of emotional disorders?": postTestResults.q1,
                    "What percentage of children are estimated to be affected by anxiety disorders at any given point in time?": postTestResults.q2,
                    "What is a risk factor associated with the occurrence of emotional disorders?": postTestResults.q3,
                    "True or False: Around 80% of emotional disorders in children go unrecognized due to lack of clinical services.": postTestResults.q4,
                    "What are the major symptoms of depression in children?": postTestResults.q5,
                }
            ]
        );
    }

    const anxietyDisorderQues = {
        "Repeated nightmares involving the theme of separation": {
            selectedValue: anxietyDisAns.Q1,
            qNo: "Q1",
            name: "anxiety-disorder",
            onChange: handleAnxietyRadioChange,
            data: [
                {
                    value: "Feature of anxiety disorder",
                    label: "Feature of anxiety disorder"
                },
                {
                    value: "Social anxiety disorder",
                    label: "Social anxiety disorder"
                },
                {
                    value: "Generalized anxiety disorder",
                    label: "Generalized anxiety disorder"
                }

            ]
        },
        "Example of social anxiety symptom ": {
            selectedValue: anxietyDisAns.Q2,
            qNo: "Q2",
            name: "anxiety-disorder",
            onChange: handleAnxietyRadioChange,
            data: [
                {
                    value: "Meets new people ",
                    label: "Meets new people "
                },
                {
                    value: "Can talk easily with new friends",
                    label: "Can talk easily with new friends"
                },
                {
                    value: "Fear and avoidance of social interactions/situations ",
                    label: "Fear and avoidance of social interactions/situations "
                }

            ]
        },
        "Which is not a symptom of Generalized anxiety disorder": {
            selectedValue: anxietyDisAns.Q3,
            qNo: "Q3",
            name: "anxiety-disorder",
            onChange: handleAnxietyRadioChange,
            data: [
                {
                    value: "Negative news and worries of making mistakes",
                    label: "Negative news and worries of making mistakes"
                },
                {
                    value: "Not worried about life ",
                    label: "Not worried about life "
                },
                {
                    value: "Having  Physical symptoms like muscle aches/tiredness",
                    label: "Having  Physical symptoms like muscle aches/tiredness"
                }

            ]
        }
    }
    const testDetails = {
        q1: {
            ques: "Which of the following is a subgroup of emotional disorders?",
            data: [
                {
                    value: "Schizophrenia",
                    label: "Schizophrenia"
                },
                {
                    value: "Bipolar disorder",
                    label: "Bipolar disorder"
                },
                {
                    value: "Depression",
                    label: "Depression"
                },
                {
                    value: "Obsessive-compulsive disorder",
                    label: "Obsessive-compulsive disorder"
                }
            ]
        },
        q2: {
            ques: "What percentage of children are estimated to be affected by anxiety disorders at any given point in time?",
            data: [
                {
                    value: "13%",
                    label: "13%"
                },
                {
                    value: "5%",
                    label: "5%"
                },
                {
                    value: "80%",
                    label: "80%"
                },
                {
                    value: "100%",
                    label: "100%"
                }
            ]
        },
        q3: {
            ques: "What is a risk factor associated with the occurrence of emotional disorders?",
            data: [
                {
                    value: "Positive family history of anxiety or depression",
                    label: "Positive family history of anxiety or depression"
                },
                {
                    value: "Positive family history of schizophrenia",
                    label: "Positive family history of schizophrenia"
                },
                {
                    value: "Lack of social interaction",
                    label: "Lack of social interaction"
                },
                {
                    value: "Excessive social and academic demands and expectations",
                    label: "Excessive social and academic demands and expectations"
                }
            ]
        },
        q4: {
            ques: "True or False: Around 80% of emotional disorders in children go unrecognized due to lack of clinical services.",
            data: [
                {
                    value: "True",
                    label: "True"
                },
                {
                    value: "False",
                    label: "False"
                }
            ]
        },
        q5: {
            ques: "What are the major symptoms of depression in children?",
            data: [
                {
                    value: "Loss of interest in pleasurable activities",
                    label: "Loss of interest in pleasurable activities"
                },
                {
                    value: "Increased sleep duration",
                    label: "Increased sleep duration"
                },
                {
                    value: "Poor concentration and attention",
                    label: "Poor concentration and attention"
                },
                {
                    value: "All of the above",
                    label: "All of the above"
                }
            ]
        }
    }

    const onModule4Submit = async () => {
        setActivityCompleted(true);
        try {
            let api = "http://127.0.0.1:7700/ModuleFunction";

            let req_json = {
                "modulename": "module3",
                "testtype": "activity",
                "moduleData": {
                    riskFactorsActivity,
                    depressionActivity,
                    "Repeated nightmares involving the theme of separation": anxietyDisAns.Q1,
                    "Example of social anxiety symptom": anxietyDisAns.Q2,
                    "Which is not a symptom of Generalized anxiety disorder": anxietyDisAns.Q3,
                    "How easy was it to go through course pages?": feedback.q1,
                    "Was the module organized and structured properly?": feedback.q2,
                    "Did the module increased your knowledge and skills in the subject matter?": feedback.q3,
                    "How helpful did you find the module?": feedback.q4,
                    "Rate your overall experience of the Module": feedback.q5
                },
            }
            const response = await apiPostRequest(api, req_json);
        }
        catch {
            toastr.error("There is an internal error! Please logout and login.")
        }
    }

    const onModule4PreTestSubmit = async () => {
        setIsPreTestCompleted(true);
        const currentTime = localStorage.getItem("currentTime");
        try {
            let api = "http://127.0.0.1:7700/ModuleFunction";

            let req_json = {
                "modulename": "module3",
                "testtype": "pretest",
                "moduleDataPretest": {
                    "Which of the following is a subgroup of emotional disorders?": preTestResults.q1,
                    "What percentage of children are estimated to be affected by anxiety disorders at any given point in time?": preTestResults.q2,
                    "What is a risk factor associated with the occurrence of emotional disorders?": preTestResults.q3,
                    "True or False: Around 80% of emotional disorders in children go unrecognized due to lack of clinical services": preTestResults.q4,
                    "What are the major symptoms of depression in children?": preTestResults.q5,
                },
                "currentTime": currentTime
            }
            const response = await apiPostRequest(api, req_json);
        }
        catch {
            toastr.error("There is an internal error! Please logout and login.")
        }
    }

    const onModule4PostTestSubmit = async () => {
        calculateUsedTime();
        const endTime = localStorage.getItem("currentTime");
        try {
            let api = "http://127.0.0.1:7700/ModuleFunction";

            let req_json = {
                "modulename": "module3",
                "testtype": "posttest",
                "moduleData": {
                    "Which of the following is a subgroup of emotional disorders?": postTestResults.q1,
                    "What percentage of children are estimated to be affected by anxiety disorders at any given point in time?": postTestResults.q2,
                    "What is a risk factor associated with the occurrence of emotional disorders?": postTestResults.q3,
                    "True or False: Around 80% of emotional disorders in children go unrecognized due to lack of clinical services.": postTestResults.q4,
                    "What are the major symptoms of depression in children?": postTestResults.q5,
                },
                "endTime": endTime
            }
            const response = await apiPostRequest(api, req_json);
            if (response.data.success === true) {
                navigate('/user-home/activity/Module5');
            }
        }
        catch {
            toastr.error("There is an internal error! Please logout and login.")
        }
    }

    return (
        <>
            {/* <TrackedScreen /> */}
            <ModulesMain notDefault={true} />
            {
                !isPreTestCompleted && (
                    <PrePostTest
                        testType={'PRE-TEST'}
                        testDetails={testDetails}
                        selectedValue={preTestResults}
                        onOptSelect={handlePreTestResults}
                        onTestSubmit={onModule4PreTestSubmit}
                        btnClass={`col-md-1 col-sm-3 p-2 fw-bold ${areAllFieldsFilled(preTestResults)}`}
                        moduleNo={3}
                    />
                )
            }

            {
                isPreTestCompleted && !isActivityCompleted && (
                    <div className="text-start module4-main-secton py-4 px-5">
                        <h1 className="mb-3 fw-bold">MODULE 4: Depression and Anxiety</h1>
                        <h4 className="fw-bold"> Introduction</h4>
                        <p>Emotional disorders (EDs) are the most common group of mental health disorders prevalent among children and adolescents.
                            Depression, anxiety disorder and stress-related disorders are the subgroups of Emotional Disorders. </p>
                        <h5>An overview of types of emotional disorders: </h5>
                        <ul>
                            <li>Depression</li>
                            <li>Anxiety Disorders</li>
                            <li>Stress Related Disorders</li>
                            <li>Somatoform Disorders</li>
                        </ul>
                        <h4 className="fw-bold"> Epidemiology</h4>
                        <p>Most of the  studies roughly estimate that all anxiety disorders affect around 13% of children followed by depression which
                            affects around 5% of children at any given point in time. </p>
                        <h5>The need to identify and treat Emotional Disorders</h5>
                        <p>Due to lack of clinical services, around eighty percent of EDs in children go un-recognized. </p>
                        <h5>Causes</h5>
                        <p>The complex interplay of biological, individual, environmental factors and negative life events leads to development of
                            EDs in children. </p>
                        <h5>Risk factors that have an association with occurrence of emotional disorders. </h5>
                        <ul>
                            <li><b>Biological risk factors:</b> History of Depressive disorder/anxiety disorder in one or both parents</li>
                            <li><b>Child (individual) characteristics:</b> low self-esteem, perfectionistic thinking, difficulty in  managing emotions
                            </li>
                            <li><b>Parenting and family factors: </b>Harsh and over-controlling parenting, critical nature of communication,
                                physical disciplining, excessive social and academic demands and expectations</li>
                            <li><b>Social factors: </b>peer rejection, bullying experiences </li>
                            <li><b>Stressors/Negative life events: </b>loss of significant others, parental divorce, parental job loss, negative
                                events in school, academic setback. </li>
                        </ul>
                        <h4 className="fw-bold"> Activity 1: Identify and write the correct answer for the following risk factors </h4>
                        <CustomTable
                            columns={[
                                { id: '1', label: 'No:' },
                                { id: '2', label: 'Factors' },
                                { id: '3', label: 'Examples' },
                                { id: '4', label: 'Answer' },
                            ]}
                            rows={[
                                {
                                    "No:": 1,
                                    Factors: "Biological risk factors",
                                    Examples: "loss of significant others, parental divorce, parental job loss, parental discord, negative events in school, academic setback.",
                                    Answer: <input
                                        type="text"
                                        value={riskFactorsActivity['Biological risk factors']}
                                        onChange={(e) => handleInputChange('Biological risk factors', e.target.value)}
                                    />
                                },
                                {
                                    "No:": 2,
                                    Factors: "Child (individual) characteristics",
                                    Examples: "Harsh and over-controlling parenting, critical nature of communication, physical disciplining, excessive social and academic demands and expectations",
                                    Answer: <input
                                        type="text"
                                        value={riskFactorsActivity['Child (individual) characteristics']}
                                        onChange={(e) => handleInputChange('Child (individual) characteristics', e.target.value)}
                                    />
                                },
                                {
                                    "No:": 3,
                                    Factors: "Parenting and family factors",
                                    Examples: "Peer rejection, bullying experiences",
                                    Answer: <input
                                        type="text"
                                        value={riskFactorsActivity['Parenting and family factors']}
                                        onChange={(e) => handleInputChange('Parenting and family factors', e.target.value)}
                                    />
                                },
                                {
                                    "No:": 4,
                                    Factors: "Social factors",
                                    Examples: "History of Depressive disorder/anxiety disorder in one or both parents ",
                                    Answer: <input
                                        type="text"
                                        value={riskFactorsActivity['Social factors']}
                                        onChange={(e) => handleInputChange('Social factors', e.target.value)}
                                    />
                                },
                                {
                                    "No:": 5,
                                    Factors: "Stressors/Negative life events",
                                    Examples: "Low self-esteem, perfectionistic thinking, difficulty in emotions",
                                    Answer: <input
                                        type="text"
                                        value={riskFactorsActivity['Stressors/Negative life events']}
                                        onChange={(e) => handleInputChange('Stressors/Negative life events', e.target.value)}
                                    />
                                }
                            ]}
                            className={"risk-factor mt-3 mb-3"}
                        />
                        <h4 className="fw-bold"> Depression</h4>
                        <p>Video 1: <a href="https://www.youtube.com/watch?v=z-IR48Mb3W0" target="blank">click here</a></p>
                        <h5>What is depression?</h5>
                        <p>When a child is experiencing sadness/irritability for most time of the day and/or has loss of interest in pleasurable
                            activities for two weeks or more, we need to consider the possibility of depression. </p>
                        <h4 className="fw-bold">The symptoms of children can be divided as follows:</h4>
                        <ol type="i">
                            <li>
                                <b>Low mood/sadness</b>
                                <br />
                                Example: crying, appearing dull at most times, poor frustration tolerance, irritability
                                and tendency for emotional outbursts
                            </li>
                            <li>
                                <b>Loss of interests in previously pleasurable activities </b>
                                <br />
                                Example:  being disconnected, withdrawn and spending time alone
                            </li>
                            <li>
                                <b>Lack of drive, Easily tired</b>
                                <br />
                                <ul>
                                    <li>Poor concentration/ attention</li>
                                    <li>Low self-confidence, worthlessness</li>
                                    <li>Feelings of guilt, self-reproach</li>
                                    <li>No hope</li>
                                    <li>Disrupted sleep: decreased sleep duration/ sleeping for more time, even in daytime</li>
                                    <li>Not feeling hungry or eating too much </li>
                                </ul>
                            </li>
                        </ol>
                        <h4 className="fw-bold">
                            Activity :Today what did you learn about depression?  Tick mark yes or no:
                        </h4>
                        <CustomTable
                            columns={[
                                { id: 'q', label: 'Questions' },
                                { id: 'yes', label: 'Yes' },
                                { id: 'yes', label: 'No' },
                            ]}
                            rows={[
                                {
                                    q: '1. Meaning of depression ',
                                    yes: <input
                                        type="radio"
                                        value="yes"
                                        checked={depressionActivity['Meaning of depression'] == "yes"}
                                        onChange={(e) => handleOptionChange('Meaning of depression', 'yes')}
                                    />,
                                    no: <input
                                        type="radio"
                                        value="no"
                                        checked={depressionActivity['Meaning of depression'] == "no"}
                                        onChange={(e) => handleOptionChange('Meaning of depression', 'no')}
                                    />
                                },
                                {
                                    q: '2. Need of identifying emotional disorders',
                                    yes: <input
                                        type="radio"
                                        value="yes"
                                        checked={depressionActivity['Need of identifying emotional disorders'] == "yes"}
                                        onChange={(e) => handleOptionChange('Need of identifying emotional disorders', 'yes')}
                                    />,
                                    no: <input
                                        type="radio"
                                        value="no"
                                        checked={depressionActivity['Need of identifying emotional disorders'] == "no"}
                                        onChange={(e) => handleOptionChange('Need of identifying emotional disorders', 'no')}
                                    />
                                },
                                {
                                    q: "3. Types of depression disorders",
                                    yes: <input
                                        type="radio"
                                        value="yes"
                                        checked={depressionActivity['Types of depression disorders'] == "yes"}
                                        onChange={(e) => handleOptionChange('Types of depression disorders', 'yes')}
                                    />,
                                    no: <input
                                        type="radio"
                                        value="no"
                                        checked={depressionActivity['Types of depression disorders'] == "no"}
                                        onChange={(e) => handleOptionChange('Types of depression disorders', 'no')}
                                    />
                                },
                                {
                                    q: "4. How to deal with depression?",
                                    yes: <input
                                        type="radio"
                                        value="yes"
                                        checked={depressionActivity['How to deal with depression'] == "yes"}
                                        onChange={(e) => handleOptionChange('How to deal with depression', 'yes')}
                                    />,
                                    no: <input
                                        type="radio"
                                        value="no"
                                        checked={depressionActivity['How to deal with depression'] == "no"}
                                        onChange={(e) => handleOptionChange('How to deal with depression', 'no')}
                                    />
                                }
                            ]}
                            className={"custom-table mt-3 mb-3"}
                        />
                        <h4 className="fw-bold">
                            Anxiety disorders
                        </h4>
                        <p>When a child is experiencing excessive fear/anxiety in general for most of the time, or in specific situations for four
                            weeks or more we need to consider the possibility of anxiety disorders</p>
                        <h5>Features</h5>
                        <ul>
                            <li>Fear that something bad will happen to him/her or to the attachment figure when separated.</li>
                            <li>Reluctant to be alone or without major attachment figures.</li>
                            <li>Repeated nightmares involving the theme of separation.</li>
                            <li>Refusal for sleeping alone, for going to school.</li>
                            <li>Worries about the consequences of separation; fear of being kidnapped/hurt while apart, fear of possible harm to/losing the attachment figure (hurt/injured/killed).</li>
                            <li>Physical symptoms - headaches, stomachaches, nausea, or vomiting.</li>
                        </ul>
                        <h4 className="fw-bold">
                            Generalized anxiety disorder
                        </h4>
                        <p>
                            Repeated and excessive worries about a variety of topics, events, or activities These worries are uncontrollable
                        </p>
                        <h5>
                            Duration of 6 months or more
                        </h5>
                        <ul>
                            <li>Excessive worries regarding various domains of life; such as school work, academic performance,
                                self and family health/finances, and minor day-to-day issues.</li>
                            <li>Tendency to seek reassurance from parents or others about worries.</li>
                            <li>Negative news and worries of making mistakes.</li>
                            <li>Physical symptoms (muscle aches/tiredness), sleeplessness, and irritability.</li>
                        </ul>
                        <h4 className="fw-bold">
                            Social Anxiety Disorder
                        </h4>
                        <h5>
                            Duration of 4 weeks or more
                        </h5>
                        <ul>
                            <li>Fear and avoidance of social interactions/situations</li>
                            <li>Strong belief that others will negatively judge/evaluate him/her</li>
                            <li>Avoidance of social activities or situations like speaking or performing in front of others</li>
                            <li>Avoid meeting new people</li>
                            <li>Fear of talking to authority figures such as teachers</li>
                            <li>Fear of being the center of attention in any way</li>
                            <li>Difficulty in making new friends</li>
                        </ul>
                        <h4 className="fw-bold">
                            Handling stress and anxiety
                        </h4>
                        <ul>
                            <li><a href="https://youtu.be/SA-sefgdRq4" target="blank">Handling Emotional Stress and Anxiety</a></li>
                            <li><a href="https://youtu.be/XWjmiYwlw8k" target="blank">Handling Stress and Anxiety</a></li>
                        </ul>
                        <h4 className="fw-bold">
                            Some common fears in children include:
                        </h4>
                        <ul>
                            <li>Animals such as dogs</li>
                            <li>Insects or spiders</li>
                            <li>Darkness</li>
                            <li>Loud noises like thunder</li>
                            <li>Blood, illness, injections</li>
                        </ul>
                        <h4 className="fw-bold">
                            Activity : Choose the right  symptoms of anxiety disorder:
                        </h4>

                        {
                            Object.keys(anxietyDisorderQues).map((eachQue, queIndex) => (
                                <>
                                    <h5>{queIndex + 1}: {eachQue}</h5>
                                    <ul>
                                        <RadioOptions
                                            selectedValue={anxietyDisorderQues[eachQue]["selectedValue"]}
                                            name={anxietyDisorderQues[eachQue].name}
                                            onChange={anxietyDisorderQues[eachQue].onChange}
                                            data={anxietyDisorderQues[eachQue].data}
                                            qNo={anxietyDisorderQues[eachQue].qNo}
                                        />
                                    </ul>
                                </>
                            ))
                        }

                        <h4 className="fw-bold">Other disorders</h4>
                        <h5>Somatoform disorders:</h5>
                        <p>Somatoform disorders are characterized by recurrent physical symptoms (gastrointestinal, pain related, neurological) that
                            cannot be explained by a medical condition. </p>
                        <h5>The most common somatic symptoms: </h5>
                        <ul>
                            <li>Head-aches</li>
                            <li>Recurrent abdominal pain</li>
                            <li>Musculo-skeletal pain</li>
                        </ul>

                        <h4 className="fw-bold">
                            Assignment :  Activity : Stick/ draw a photo and a message on topic: depression and anxiety among adolescents
                        </h4>
                        <div className="row">
                            <div className="col">
                                <input class="form-control mb-3" type="file" id="formFile" onChange={handleFileChange} />
                            </div>
                            <div className="col">
                                <input
                                    placeholder="Please enter the message"
                                    class="form-control mb-3"
                                    type="text"
                                    value={riskFactorsActivity['Stick/draw photo']}
                                    onChange={(e) => handleInputChange('Stick/draw photo', e.target.value)}
                                />
                            </div>

                        </div>


                        <h4 className="fw-bold"> Feedback :</h4>
                        <Feedback
                            selectedValue={feedback}
                            onOptSelect={handleFbRadioChange}
                            onSubmit={onModule4Submit}
                        />
                    </div>
                )
            }
            {
                isPreTestCompleted && isActivityCompleted && (
                    <PrePostTest
                        testType={'POST-TEST'}
                        testDetails={testDetails}
                        selectedValue={postTestResults}
                        onOptSelect={handlePostTestResults}
                        onTestSubmit={onModule4PostTestSubmit}
                        btnClass={`col-md-1 col-sm-3 p-2 fw-bold ${areAllFieldsFilled(postTestResults)}`}
                        moduleNo={3}
                    />
                )
            }
        </>
    )
}