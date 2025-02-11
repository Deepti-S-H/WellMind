import React, { useState, useEffect } from "react";
import ModulesMain from "../ModulesMain";
import module3Img from "../../../images/module3Img.png"
import CheckBox from "../../../components/checkbox/CheckBox";
import CustomTable from "../../../components/table/CustomTable";
import "./Module3.css";
import Feedback from "../feedback/Feedback";
import PrePostTest from "../pre-post-test/PrePostTest";
import { areAllFieldsFilled } from "../../../utils/Tools";
import toastr from "toastr";
import { apiPostRequest } from "../../../utils/Network";
import { useNavigate } from "react-router-dom";
import calculateUsedTime from "../../../utils/Tools";


export default function Module3() {
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
            const req_json = { "modulename": "module2", "modulenumber": 2 }
            const response = await apiPostRequest(api, req_json);
            if (response.data.success == true) {
                const dataToPass = response.data.message["modulestatus"];
                if (dataToPass.pretest === 'completed') {
                    setIsPreTestCompleted(true);
                }
                if (dataToPass.pretest === 'completed' && dataToPass.postTest === 'in-progress' && dataToPass.activity === "completed") {
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
        if (modulestatus[0].status === 'completed') {
            apiCall();
        } else {
            navigate('/user-home/activity')
        }
    }, []);


    const [isPreTestCompleted, setIsPreTestCompleted] = useState(false)
    const [preTestResults, setPreTestResults] = useState(
        {
            q1: "",
            q2: "",
            q3: "",
            q4: ""
        }
    )
    const [isActivityCompleted, setActivityCompleted] = useState(false)

    const testDetails = {
        q1: {
            ques: "What is academic stress?",
            data: [
                {
                    value: "The body's response to study-related demands",
                    label: "The body's response to study-related demands"
                },
                {
                    value: "Positive stress that improves performance",
                    label: "Positive stress that improves performance"
                },
                {
                    value: "Negative stress that causes fear and panic",
                    label: "Negative stress that causes fear and panic"
                },
                {
                    value: "The body's response to physical exercise",
                    label: "The body's response to physical exercise"
                }
            ]
        },
        q2: {
            ques: "What are common academic stressors?",
            data: [
                {
                    value: "A.	Parental pressure",
                    label: "A.	Parental pressure"
                },
                {
                    value: "B.	Poor time management",
                    label: "B.	Poor time management"
                },
                {
                    value: "C.	Completing homework on time",
                    label: "C.	Completing homework on time"
                },
                {
                    value: "D.	Having fun time with family",
                    label: "D.	Having fun time with family"
                }
            ]
        },
        q3: {
            ques: "True or False: Positive stress improves an individual's attitude, behavior, and performance.",
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
        q4: {
            ques: "Which of the following is NOT a strategy to deal with academic stress?",
            data: [
                {
                    value: "A.	Eating well",
                    label: "A.	Eating well"
                },
                {
                    value: "B.	Meditating or doing yoga",
                    label: "B.	Meditating or doing yoga"
                },
                {
                    value: "C.	Planning too many activities",
                    label: "C.	Planning too many activities"
                },
                {
                    value: "D.	Spending quality time with friends and family",
                    label: "D.	Spending quality time with friends and family"
                }
            ]
        }
    }
    const [selectedComAcaStress, setSelectedComAcaStress] = useState([]);
    const [selectedOptActivity2, setSelectedOptActivity2] = useState([]);
    const [selectedOptActivity3, setSelectedOptActivity3] = useState([]);
    const [selectedOptActivity4, setSelectedOptActivity4] = useState([]);
    const [activity5Results, setActivity5Results] = useState({});
    const [feedback, setFeedback] = useState(
        {
            q1: "",
            q2: "",
            q3: "",
            q4: "",
            q5: ""
        }
    )


    const activity2 = [
        {
            id: 1,
            question: 'Which of the following helps reduce academic stress?',
            options: [
                { id: 'q1_option1', label: 'Not talking with a friend who has learning difficulties' },
                { id: 'q1_option2', label: 'Asking help from teachers, friends and family' },
                { id: 'q1_option3', label: 'Eating well' },
                { id: 'q1_option4', label: 'Planning too many activities' },
            ],
        }
    ];

    const activity3 = [
        {
            id: 1,
            question: 'Pick  factors that leads to failure in exam',
            options: [
                { id: 'q1_option1', label: '1.	Fear of Failure.' },
                { id: 'q1_option2', label: '2.	Lack of adequate preparation - Preparing for exams at the last minute.' },
                { id: 'q1_option3', label: '3.	Lack of regular study habits over the year.' },
                { id: 'q1_option4', label: '4.	Preparing well for exams' },
                { id: 'q1_option5', label: '5.	Regularly study ' },
            ],
        }
    ];
    const activity4 = [
        {
            id: 1,
            question: 'The normal responses to exams stress/anxiety are :',
            options: [
                { id: 'q1_option1', label: 'Able to concentrate or remember what was read earlier' },
                { id: 'q1_option2', label: 'Difficultly in falling sleep' },
                { id: 'q1_option3', label: 'Being calm and patient' },
                { id: 'q1_option4', label: 'Not feeling hungry or eating too much' },
                { id: 'q1_option5', label: 'No Stomach pain' },
                { id: 'q1_option6', label: 'Frequent urge to urinate' },
            ],
        }
    ];
    const comAcaStress = [
        {
            id: 1,
            question: 'What are the common academic stressors?',
            options: [
                { id: 'q1_option1', label: 'Parental pressure' },
                { id: 'q1_option2', label: 'Poor time management' },
                { id: 'q1_option3', label: 'Completing homework on time' },
                { id: 'q1_option4', label: 'Having fun time with family' },
            ],
        }
    ];
    const [postTestResults, setPostTestResults] = useState(
        {
            q1: "",
            q2: "",
            q3: "",
            q4: ""
        }
    );

    const [module3, setModule3] = useState([]);

    const handlePostTestResults = (event, questionNumber) => {
        setPostTestResults((prevState) => ({
            ...prevState,
            [questionNumber]: event.target.value
        }));
        setModule3([
            {
                "What is academic stress?": preTestResults.q1,
                "What are common academic stressors?": preTestResults.q2,
                "True or False: Positive stress improves an individual's attitude, behavior, and performance.": preTestResults.q3,
                "Which of the following is NOT a strategy to deal with academic stress?": preTestResults.q4,
            },

            {
                "What are the common academic stressors?": selectedComAcaStress,
                "Which of the following helps reduce academic stress?": selectedOptActivity2,
                "Pick factors that leads to failure in exam": selectedOptActivity3,
                "The normal responses to exams stress/anxiety are": selectedOptActivity4,
                activity5Results,
                "How easy was it to go through course pages?": feedback.q1,
                "Was the module organized and structured properly?": feedback.q2,
                "Did the module increased your knowledge and skills in the subject matter?": feedback.q3,
                "How helpful did you find the module?": feedback.q4,
                "Rate your overall experience of the Module": feedback.q5,
            },

            {
                "What is academic stress?": postTestResults.q1,
                "What are common academic stressors?": postTestResults.q2,
                "True or False: Positive stress improves an individual's attitude, behavior, and performance.": postTestResults.q3,
                "Which of the following is NOT a strategy to deal with academic stress?": postTestResults.q4,
            },
        ]);

    }

    const handleFbRadioChange = (event, questionNumber) => {
        setFeedback((prevState) => ({
            ...prevState,
            [questionNumber]: event.target.value
        }));
    };

    const onModule3Submit = async () => {
        setActivityCompleted(true);
        try {
            let api = "http://127.0.0.1:7700/ModuleFunction";

            let req_json = {
                "modulename": "module2",
                "testtype": "activity",
                "moduleData": {
                    "What are the common academic stressors?": selectedComAcaStress,
                    "Which of the following helps reduce academic stress?": selectedOptActivity2,
                    "Pick factors that leads to failure in exam": selectedOptActivity3,
                    "The normal responses to exams stress/anxiety are": selectedOptActivity4,
                    activity5Results,
                    "How easy was it to go through course pages?": feedback.q1,
                    "Was the module organized and structured properly?": feedback.q2,
                    "Did the module increased your knowledge and skills in the subject matter?": feedback.q3,
                    "How helpful did you find the module?": feedback.q4,
                    "Rate your overall experience of the Module": feedback.q5,
                },
            }
            const response = await apiPostRequest(api, req_json);
        }
        catch {
            toastr.error("There is an internal error! Please logout and login.")
        }
    }

    const onModule3PostTestSubmit = async () => {
        calculateUsedTime();
        const endTime = localStorage.getItem("currentTime");
        try {
            let api = "http://127.0.0.1:7700/ModuleFunction";

            let req_json = {
                "modulename": "module2",
                "testtype": "posttest",
                "moduleData": {
                    "What is academic stress?": postTestResults.q1,
                    "What are common academic stressors?": postTestResults.q2,
                    "True or False: Positive stress improves an individual's attitude, behavior, and performance.": postTestResults.q3,
                    "Which of the following is NOT a strategy to deal with academic stress?": postTestResults.q4,
                },
                "endTime": endTime
            }
            const response = await apiPostRequest(api, req_json);
            if (response.data.success === true) {
                navigate('/user-home/activity/Module4');
            }
        }
        catch {
            toastr.error("There is an internal error! Please logout and login.")
        }
    }

    const handleOptionChange = (question, option) => {
        setActivity5Results(prevState => ({
            ...prevState,
            [question]: option
        }));
    };
    const handleActivity2Change = (optionLabel) => {
        setSelectedOptActivity2((prevAnswers) => {
            const optionIndex = prevAnswers.indexOf(optionLabel);
            if (optionIndex !== -1) {
                const updatedAnswers = [...prevAnswers];
                updatedAnswers.splice(optionIndex, 1);
                return updatedAnswers;
            } else {
                return [...prevAnswers, optionLabel];
            }
        });
    };
    const handleActivity3Change = (optionLabel) => {
        setSelectedOptActivity3((prevAnswers) => {
            const optionIndex = prevAnswers.indexOf(optionLabel);
            if (optionIndex !== -1) {
                const updatedAnswers = [...prevAnswers];
                updatedAnswers.splice(optionIndex, 1);
                return updatedAnswers;
            } else {
                return [...prevAnswers, optionLabel];
            }
        });
    };
    const handleActivity4Change = (optionLabel) => {
        setSelectedOptActivity4((prevAnswers) => {
            const optionIndex = prevAnswers.indexOf(optionLabel);
            if (optionIndex !== -1) {
                const updatedAnswers = [...prevAnswers];
                updatedAnswers.splice(optionIndex, 1);
                return updatedAnswers;
            } else {
                return [...prevAnswers, optionLabel];
            }
        });
    };

    const handleComAcaStressChange = (optionLabel) => {
        setSelectedComAcaStress((prevAnswers) => {
            const optionIndex = prevAnswers.indexOf(optionLabel);
            if (optionIndex !== -1) {
                const updatedAnswers = [...prevAnswers];
                updatedAnswers.splice(optionIndex, 1);
                return updatedAnswers;
            } else {
                return [...prevAnswers, optionLabel];
            }
        });
    };
    const handlePreTestResults = (event, questionNumber) => {
        setPreTestResults((prevState) => ({
            ...prevState,
            [questionNumber]: event.target.value
        }));

    }
    const onModule3PreTestSubmit = async () => {
        setIsPreTestCompleted(true);
        const currentTime = localStorage.getItem("currentTime");
        try {
            let api = "http://127.0.0.1:7700/ModuleFunction";

            let req_json = {
                "modulename": "module2",
                "testtype": "pretest",
                "moduleDataPretest": {
                    "What is academic stress?": preTestResults.q1,
                    "What are common academic stressors?": preTestResults.q2,
                    "True or False: Positive stress improves an individual's attitude, behavior, and performance.": preTestResults.q3,
                    "Which of the following is NOT a strategy to deal with academic stress?": preTestResults.q4,
                },
                "currentTime": currentTime
            }
            const response = await apiPostRequest(api, req_json);
        }
        catch {
            toastr.error("There is an internal error! Please logout and login.")
        }
    }

    return (
        <>
            <ModulesMain notDefault={true} />
            {
                !isPreTestCompleted && (
                    <PrePostTest
                        testType={'PRE-TEST'}
                        testDetails={testDetails}
                        selectedValue={preTestResults}
                        onOptSelect={handlePreTestResults}
                        onTestSubmit={onModule3PreTestSubmit}
                        btnClass={`col-md-1 col-sm-3 p-2 fw-bold ${areAllFieldsFilled(preTestResults)}`}
                        moduleNo={2}
                    />
                )
            }

            {
                isPreTestCompleted && !isActivityCompleted && (
                    <div className="text-start module3-main-section py-4 px-5">
                        <h1 className="fw-bold">  MODULE 3: Academic stress</h1>
                        <h4 className="fw-bold"> What is academic stress?</h4>

                        <p>Academic stress is defined as the body’s response to academic-related demands that exceed adaptive capabilities of students</p>

                        <h4 className="fw-bold">  Academic stressors </h4>

                        <p> <img src={module3Img} width="400" height="400" className="academicStsImg" /> </p>

                        <h4 className="fw-bold"> Activity: Tick mark the right answers</h4>
                        <CheckBox
                            module={3}
                            questions={comAcaStress}
                            func={handleComAcaStressChange}
                            answers={selectedComAcaStress}
                            labelclass={'col-md-3 py-2 px-4'}

                        />
                        <h4 className="fw-bold"> Effects of Academic Stress</h4>
                        <p>The effects of stress can be both positive and negative</p>
                        <h5>Positive stress:</h5>
                        <ul>
                            <li>It improves an individual’s attitude, behaviour and performance,</li>
                            <li>Creates excitement to achieve more</li>
                            <li>Motivates to do best in future</li>
                        </ul>
                        <h5 >Negative stress:</h5>
                        <ul>
                            <li>It causes anxiety   </li>
                            <li>Creates fear, panic,</li>
                            <li>Leads to poor performance in school test</li>



                        </ul>
                        <h4 className="fw-bold"> Watch videos on :</h4>
                        <ul>
                            <li >A video on stress management through Yoga practice by Dr. Hemanth Bhargav.</li>
                            <a href="https://youtu.be/Njr3MLLY5VA" target="_blank">click here for video</a>
                            <li >A demonstration of yoga for Stress Management by Dr. Hemanth Bhargav.</li>
                            <a href="https://youtu.be/kQgZMZGprPE" target="_blank">click here for video</a></ul>

                        <h4 className="fw-bold"> Strategies to deal with Academic Stress :</h4>

                        <ul >
                            <li className="font-weight-bold">Self Care</li>
                            <ul>
                                <li>Eat well.</li>
                                <li>Exercise.</li>
                                <li>Sleep well at night.</li></ul>
                        </ul>


                        <ul >
                            <li className="font-weight-bold">Relaxation techniques</li>
                            <ul >
                                <li>Meditating or doing yoga</li>
                                <li>Spending time in nature: walking, riding, swimming or even just sitting </li>
                            </ul>
                        </ul>

                        <ul >
                            <li className="font-weight-bold">Other Activities</li>
                            <ul >
                                <li> Spending quality time with friends and/or family</li>
                                <li> Do things what you love : food, art, music, crafts</li>
                                <li> Helping others (yes, helping others reduces stress for the helper!) </li>
                            </ul>
                        </ul>


                        <ul >
                            <li className="font-weight-bold">Study Plan</li>

                            <ul >

                                <li>Set short goals for yourself</li>
                                <li>Keep a timetable </li>
                                <li>Organize things accordingly</li>
                                <li>Don’t plan too many  activities</li>
                                <li>Find time to relax</li>
                                <li>Learn stress management skills, such as relaxation techniques and problem solving</li>
                                <li>Be optimistic:  learn to focus on “I CAN” </li>
                            </ul>
                        </ul>

                        <ul >
                            <li className="font-weight-bold">Take help</li>
                            <ul >
                                <li>Identify which subjects are difficult to study</li>
                                <li>Ask help from teachers, parents and friends whenever facing problems</li>
                            </ul>
                        </ul>


                        <p> </p>

                        <h4 className="fw-bold"> Activity 2: </h4>
                        <CheckBox
                            module={3}
                            questions={activity2}
                            func={handleActivity2Change}
                            answers={selectedOptActivity2}
                            labelclass={'col-md-4 py-2 px-4'}
                        />

                        <h4 className="fw-bold">Preparing For Examination</h4>
                        <h6> Success in the Exams depends on factors like </h6>
                        <ul>

                            <li>Motivation to study.</li>
                            <li>Commitment to complete education.</li>
                            <li>Time management.</li>
                            <li>Regular study habits.</li>
                            <li>Ability to handle the stress of planning, preparing and facing the examination.</li>
                            <li>Appropriate preparation for the specific examination.</li>
                            <li>Following “Good Examination” skills.</li>

                        </ul>
                        <h6>Failure in an Examination depends on factors like</h6>
                        <ul>
                            <li>Lack of motivation to study.</li>
                            <li>Lack of commitment.</li>
                            <li> Lack of regular study habits over the year.</li>
                            <li>Lack of clarity in whatever one has read - due to “Poor Reading Habits”.</li>
                            <li>Lack of adequate preparation - Preparing for exams at the last minute.</li>
                            <li>Fear of Failure.</li>
                            <li>Becoming “anxious” and “stressed” during the examination.</li>
                            <li>Following “Poor” examination preparation methods.</li>
                            <li>Not writing legibly/writing full of corrections and overwriting.</li>
                            <li>Not adjusting the size and way of answering depending on the question and the
                                marks allotted.</li>
                            <li>Difficulties in summarizing and writing in exams.</li>
                            <li>Not managing time during the three hours of exam - writing excessively for the first
                                few questions and omitting the last few questions due to lack of time.</li>

                        </ul>
                        <h4 className="fw-bold"> Activity 3:</h4>
                        <CheckBox
                            module={3}
                            questions={activity3}
                            func={handleActivity3Change}
                            answers={selectedOptActivity3}
                            labelclass={'col-md-5 py-2 px-4'}

                        />


                        <h4 className="fw-bold"> Some DON’Ts Few Days before the Exams</h4>


                        <ul>
                            <li>Collecting new notes and materials from friends </li>
                            <li>reading new things  till the last minute without time for revision</li>
                            <li>Sitting for long hours continuously to read.</li>
                            <li>Not taking breaks for bath, food, relaxation and sleep</li>
                            <li>Keeping awake whole night and reading for few days before the exams</li>
                            <li>Excessive use of Coffee or Tea or tobacco to keep awake the whole night.</li>
                            <li>Giving up studying totally as the student feels that his/her mind is “BLANK” and seems to have forgotten everything that was read</li>




                        </ul>
                        <h4 className="fw-bold"> Activity 3: Tick Mark against the statements you agree with(Some DO's on the Day of Examination) </h4>

                        <h6>Some DO’s on the Day of the Examination </h6>
                        <ul>
                            <li> Having a good night’s sleep the previous night</li>
                            <li>Having a light but adequate breakfast</li>
                            <li>Leaving for the examination hall well in advance.</li>
                            <li>Checking whether one has taken all the necessary things - pens, pencils, geometry box, hall ticket - a checklist of all items is essential. Pack all items needed for the exams</li>
                            <li>Going to the toilet before entering the examination hall</li>
                            <li>Taking deep breaths and feel relaxed</li>
                            <li>Taking a small snack like fruit with you</li>
                        </ul>


                        <h4 className="fw-bold"> Anxiety and Exams</h4>
                        <ul>
                            <li>Most students suffer from anxiety about examination and their performance</li>
                            <li>Although small amount of exam fear/anxiousness is necessary to learn before the exam, too much of tension can hinder the student’s ability to perform well in the exam</li>

                            <li>Many students do not know how to handle this stress, which results in poor performance in examination despite good preparation</li>
                        </ul>
                        <h4 className="fw-bold"> Body responses to exams stress/anxiety:</h4>
                        <ul>
                            <li>Not being able to concentrate or remember what was read earlier.</li>
                            <li>Difficultly in falling sleep or not feeling refreshed even after sleeping for many
                                hours.</li>
                            <li>Constant irritability, anger, worry or listlessness and restlessness.</li>
                            <li>Discomfort in the stomach.</li>
                            <li>Decreased appetite or increased appetite.</li>
                            <li>Vomiting sensation or feeling of nausea.</li>
                            <li>Stomach pain.</li>
                            <li>Loose stools.</li>
                            <li>Frequent urge to urinate.</li>
                            <li>Mild fever.</li>
                        </ul>
                        <h4 className="fw-bold"> Reasons for Anxiety</h4>
                        <ul>
                            <li>Inadequate preparation for examination.</li>
                            <li>High expectations from parents, teachers and oneself.</li>
                            <li>Unhealthy competition in the class to secure the highest marks.</li>
                            <li>Jealousy.</li>
                            <li>Bad experience in a previous exam that may increase the anxiety e.g. ‘I failed last
                                year. So I will probably fail this time also’.</li>
                            <li>Distraction during exams - holidays, visitors, festivals, and other events.</li>
                        </ul>
                        <h4 className="fw-bold"> Activity 4: Choose the right answer :</h4>

                        <CheckBox
                            module={3}
                            questions={activity4}
                            func={handleActivity4Change}
                            answers={selectedOptActivity4}
                            labelclass={'col-md-5 py-2 px-4'}

                        />

                        <h4 className="fw-bold"> How to Handle the Anxiety</h4>
                        <p>1: Following some specific relaxation techniques many times a day – </p>
                        <ul>
                            <li>meditation</li>
                            <li>breathing exercises</li>
                            <li>prayers and</li>
                            <li>auto-suggestion</li>
                        </ul>
                        <p> It is necessary that the student starts practicing months before the exams. </p>
                        <p> 2: Solving old examination papers within specified time - 3 hours, </p>
                        <ul><li> Doing mock exams on one’s own.</li></ul>

                        <p> 3: Restating negative thoughts, like </p>
                        <ul>
                            <li>“I have not prepared well”, to “ I will do my best” </li>
                            <li>“I may fail in this exam” to “I have 50% of passing exams” </li>
                            <li>“I have not covered all the portions” to “I have studied some portions well”.</li></ul>


                        <h4 className="fw-bold">  Activity 5: Write a personal time schedule to prepare for exams. ( blank page to edit)</h4>
                        <h4 className="fw-bold"> Self assessment : CRITICAL THINKING ASSESSMENT  (Courtesy: DPS, Gurgaon)</h4>
                        <p>Instructions: Check the category on the right that confirms to the frequency with which
                            you carry out the following acts:
                        </p>
                        <CustomTable
                            columns={[
                                { id: '1', label: 'Category' },
                                { id: '2', label: 'Never' },
                                { id: '3', label: 'Rarely' },
                                { id: '4', label: 'Sometimes' },
                                { id: '5', label: 'Often' },
                                { id: '6', label: 'Always' },
                            ]}
                            rows={[
                                {
                                    Category: "I try to understand my parents’ point of view when they scold me.",
                                    Never: <input
                                        type="radio"
                                        value="Never"
                                        checked={activity5Results['category1'] === "Never"}
                                        onChange={(e) => handleOptionChange('category1', 'Never')}
                                    />,
                                    Rarely: <input
                                        type="radio"
                                        value="Rarely"
                                        checked={activity5Results['category1'] === "Rarely"}
                                        onChange={(e) => handleOptionChange('category1', 'Rarely')}
                                    />,
                                    Sometimes: <input
                                        type="radio"
                                        value="Sometimes"
                                        checked={activity5Results['category1'] === "Sometimes"}
                                        onChange={(e) => handleOptionChange('category1', 'Sometimes')}
                                    />,
                                    Often: <input
                                        type="radio"
                                        value="Often"
                                        checked={activity5Results['category1'] === "Often"}
                                        onChange={(e) => handleOptionChange('category1', 'Often')}
                                    />,
                                    Always: <input
                                        type="radio"
                                        value="Always"
                                        checked={activity5Results['category1'] === "Always"}
                                        onChange={(e) => handleOptionChange('category1', 'Always')}
                                    />
                                },
                                {
                                    Category: "I am aware of my strengths and weaknesses and I work on them.",
                                    Never: <input
                                        type="radio"
                                        value="Never"
                                        checked={activity5Results['category2'] === "Never"}
                                        onChange={(e) => handleOptionChange('category2', 'Never')}
                                    />,
                                    Rarely: <input
                                        type="radio"
                                        value="Rarely"
                                        checked={activity5Results['category2'] === "Rarely"}
                                        onChange={(e) => handleOptionChange('category2', 'Rarely')}
                                    />,
                                    Sometimes: <input
                                        type="radio"
                                        value="Sometimes"
                                        checked={activity5Results['category2'] === "Sometimes"}
                                        onChange={(e) => handleOptionChange('category2', 'Sometimes')}
                                    />,
                                    Often: <input
                                        type="radio"
                                        value="Often"
                                        checked={activity5Results['category2'] === "Often"}
                                        onChange={(e) => handleOptionChange('category2', 'Often')}
                                    />,
                                    Always: <input
                                        type="radio"
                                        value="Always"
                                        checked={activity5Results['category2'] === "Always"}
                                        onChange={(e) => handleOptionChange('category2', 'Always')}
                                    />
                                },
                                {
                                    Category: "I learn from my mistakes and try not to repeat them.",
                                    Never: <input
                                        type="radio"
                                        value="Never"
                                        checked={activity5Results['category3'] === "Never"}
                                        onChange={(e) => handleOptionChange('category3', 'Never')}
                                    />,
                                    Rarely: <input
                                        type="radio"
                                        value="Rarely"
                                        checked={activity5Results['category3'] === "Rarely"}
                                        onChange={(e) => handleOptionChange('category3', 'Rarely')}
                                    />,
                                    Sometimes: <input
                                        type="radio"
                                        value="Sometimes"
                                        checked={activity5Results['category3'] === "Sometimes"}
                                        onChange={(e) => handleOptionChange('category3', 'Sometimes')}
                                    />,
                                    Often: <input
                                        type="radio"
                                        value="Often"
                                        checked={activity5Results['category3'] === "Often"}
                                        onChange={(e) => handleOptionChange('category3', 'Often')}
                                    />,
                                    Always: <input
                                        type="radio"
                                        value="Always"
                                        checked={activity5Results['category3'] === "Always"}
                                        onChange={(e) => handleOptionChange('category3', 'Always')}
                                    />
                                },
                                {
                                    Category: "I am learning to organize myself as I understand that this skill will help me improve overall.",
                                    Never: <input
                                        type="radio"
                                        value="Never"
                                        checked={activity5Results['category4'] === "Never"}
                                        onChange={(e) => handleOptionChange('category4', 'Never')}
                                    />,
                                    Rarely: <input
                                        type="radio"
                                        value="Rarely"
                                        checked={activity5Results['category4'] === "Rarely"}
                                        onChange={(e) => handleOptionChange('category4', 'Rarely')}
                                    />,
                                    Sometimes: <input
                                        type="radio"
                                        value="Sometimes"
                                        checked={activity5Results['category4'] === "Sometimes"}
                                        onChange={(e) => handleOptionChange('category4', 'Sometimes')}
                                    />,
                                    Often: <input
                                        type="radio"
                                        value="Often"
                                        checked={activity5Results['category4'] === "Often"}
                                        onChange={(e) => handleOptionChange('category4', 'Often')}
                                    />,
                                    Always: <input
                                        type="radio"
                                        value="Always"
                                        checked={activity5Results['category4'] === "Always"}
                                        onChange={(e) => handleOptionChange('category4', 'Always')}
                                    />
                                },
                                {
                                    Category: "I try to balance my academics with extra-curricular activities to be an all-rounder.",
                                    Never: <input
                                        type="radio"
                                        value="Never"
                                        checked={activity5Results['category5'] === "Never"}
                                        onChange={(e) => handleOptionChange('category5', 'Never')}
                                    />,
                                    Rarely: <input
                                        type="radio"
                                        value="Rarely"
                                        checked={activity5Results['category5'] === "Rarely"}
                                        onChange={(e) => handleOptionChange('category5', 'Rarely')}
                                    />,
                                    Sometimes: <input
                                        type="radio"
                                        value="Sometimes"
                                        checked={activity5Results['category5'] === "Sometimes"}
                                        onChange={(e) => handleOptionChange('category5', 'Sometimes')}
                                    />,
                                    Often: <input
                                        type="radio"
                                        value="Often"
                                        checked={activity5Results['category5'] === "Often"}
                                        onChange={(e) => handleOptionChange('category5', 'Often')}
                                    />,
                                    Always: <input
                                        type="radio"
                                        value="Always"
                                        checked={activity5Results['category5'] === "Always"}
                                        onChange={(e) => handleOptionChange('category5', 'Always')}
                                    />
                                },
                                {
                                    Category: "I maintain a positive attitude to cope with difficult situations.",
                                    Never: <input
                                        type="radio"
                                        value="Never"
                                        checked={activity5Results['category6'] === "Never"}
                                        onChange={(e) => handleOptionChange('category6', 'Never')}
                                    />,
                                    Rarely: <input
                                        type="radio"
                                        value="Rarely"
                                        checked={activity5Results['category6'] === "Rarely"}
                                        onChange={(e) => handleOptionChange('category6', 'Rarely')}
                                    />,
                                    Sometimes: <input
                                        type="radio"
                                        value="Sometimes"
                                        checked={activity5Results['category6'] === "Sometimes"}
                                        onChange={(e) => handleOptionChange('category6', 'Sometimes')}
                                    />,
                                    Often: <input
                                        type="radio"
                                        value="Often"
                                        checked={activity5Results['category6'] === "Often"}
                                        onChange={(e) => handleOptionChange('category6', 'Often')}
                                    />,
                                    Always: <input
                                        type="radio"
                                        value="Always"
                                        checked={activity5Results['category6'] === "Always"}
                                        onChange={(e) => handleOptionChange('category6', 'Always')}
                                    />
                                },
                                {
                                    Category: "I can resist negative peer pressure.",
                                    Never: <input
                                        type="radio"
                                        value="Never"
                                        checked={activity5Results['category7'] === "Never"}
                                        onChange={(e) => handleOptionChange('category7', 'Never')}
                                    />,
                                    Rarely: <input
                                        type="radio"
                                        value="Rarely"
                                        checked={activity5Results['category7'] === "Rarely"}
                                        onChange={(e) => handleOptionChange('category7', 'Rarely')}
                                    />,
                                    Sometimes: <input
                                        type="radio"
                                        value="Sometimes"
                                        checked={activity5Results['category7'] === "Sometimes"}
                                        onChange={(e) => handleOptionChange('category7', 'Sometimes')}
                                    />,
                                    Often: <input
                                        type="radio"
                                        value="Often"
                                        checked={activity5Results['category7'] === "Often"}
                                        onChange={(e) => handleOptionChange('category7', 'Often')}
                                    />,
                                    Always: <input
                                        type="radio"
                                        value="Always"
                                        checked={activity5Results['category7'] === "Always"}
                                        onChange={(e) => handleOptionChange('category7', 'Always')}
                                    />
                                },
                                {
                                    Category: "I realize that I would lose the trust of my parents and teachers if I lie.",
                                    Never: <input
                                        type="radio"
                                        value="Never"
                                        checked={activity5Results['category8'] === "Never"}
                                        onChange={(e) => handleOptionChange('category8', 'Never')}
                                    />,
                                    Rarely: <input
                                        type="radio"
                                        value="Rarely"
                                        checked={activity5Results['category8'] === "Rarely"}
                                        onChange={(e) => handleOptionChange('category8', 'Rarely')}
                                    />,
                                    Sometimes: <input
                                        type="radio"
                                        value="Sometimes"
                                        checked={activity5Results['category8'] === "Sometimes"}
                                        onChange={(e) => handleOptionChange('category8', 'Sometimes')}
                                    />,
                                    Often: <input
                                        type="radio"
                                        value="Often"
                                        checked={activity5Results['category8'] === "Often"}
                                        onChange={(e) => handleOptionChange('category8', 'Often')}
                                    />,
                                    Always: <input
                                        type="radio"
                                        value="Always"
                                        checked={activity5Results['category8'] === "Always"}
                                        onChange={(e) => handleOptionChange('category8', 'Always')}
                                    />
                                },
                                {
                                    Category: "I am focused as I know that it will help me achieve my goals.",
                                    Never: <input
                                        type="radio"
                                        value="Never"
                                        checked={activity5Results['category9'] === "Never"}
                                        onChange={(e) => handleOptionChange('category9', 'Never')}
                                    />,
                                    Rarely: <input
                                        type="radio"
                                        value="Rarely"
                                        checked={activity5Results['category9'] === "Rarely"}
                                        onChange={(e) => handleOptionChange('category9', 'Rarely')}
                                    />,
                                    Sometimes: <input
                                        type="radio"
                                        value="Sometimes"
                                        checked={activity5Results['category9'] === "Sometimes"}
                                        onChange={(e) => handleOptionChange('category9', 'Sometimes')}
                                    />,
                                    Often: <input
                                        type="radio"
                                        value="Often"
                                        checked={activity5Results['category9'] === "Often"}
                                        onChange={(e) => handleOptionChange('category9', 'Often')}
                                    />,
                                    Always: <input
                                        type="radio"
                                        value="Always"
                                        checked={activity5Results['category9'] === "Always"}
                                        onChange={(e) => handleOptionChange('category9', 'Always')}
                                    />
                                },
                                {
                                    Category: "I set realistic goals and work towards achieving them.",
                                    Never: <input
                                        type="radio"
                                        value="Never"
                                        checked={activity5Results['category10'] === "Never"}
                                        onChange={(e) => handleOptionChange('category10', 'Never')}
                                    />,
                                    Rarely: <input
                                        type="radio"
                                        value="Rarely"
                                        checked={activity5Results['category10'] === "Rarely"}
                                        onChange={(e) => handleOptionChange('category10', 'Rarely')}
                                    />,
                                    Sometimes: <input
                                        type="radio"
                                        value="Sometimes"
                                        checked={activity5Results['category10'] === "Sometimes"}
                                        onChange={(e) => handleOptionChange('category10', 'Sometimes')}
                                    />,
                                    Often: <input
                                        type="radio"
                                        value="Often"
                                        checked={activity5Results['category10'] === "Often"}
                                        onChange={(e) => handleOptionChange('category10', 'Often')}
                                    />,
                                    Always: <input
                                        type="radio"
                                        value="Always"
                                        checked={activity5Results['category10'] === "Always"}
                                        onChange={(e) => handleOptionChange('category10', 'Always')}
                                    />
                                }
                            ]}
                            className={"risk-factor mt-3 mb-3"}
                        />





                        <h4 className="fw-bold"> Feedback </h4>
                        <Feedback
                            selectedValue={feedback}
                            onOptSelect={handleFbRadioChange}
                            onSubmit={onModule3Submit}
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
                        onTestSubmit={onModule3PostTestSubmit}
                        btnClass={`col-md-1 col-sm-3 p-2 fw-bold ${areAllFieldsFilled(postTestResults)}`}
                        moduleNo={2}
                    />

                )
            }

        </>
    )
}

