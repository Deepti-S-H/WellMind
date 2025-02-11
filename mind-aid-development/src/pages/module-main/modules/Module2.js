import React, { useState, useEffect } from "react";
import "./Module.css";
import RadioOptions from "../../../components/radiogroup/RadioOptions";
import ModulesMain from "../ModulesMain";
import OSLPP from "../../../images/Module2-Stress-level-peak-performance.png";
import CheckBox from "../../../components/checkbox/CheckBox";
import Button from "../../../components/button/Button";
import InputField from "../../../components/input/InputField";
import CustomTable from "../../../components/table/CustomTable";
import { areAllFieldsFilled } from "../../../utils/Tools";
import PrePostTest from "../pre-post-test/PrePostTest";
import toastr from "toastr";
import { useNavigate } from "react-router-dom";
import { apiPostRequest } from "../../../utils/Network";
import calculateUsedTime from "../../../utils/Tools";

export default function Module2() {
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
      const req_json = { "modulename": "module1", "modulenumber": 1 }
      const response = await apiPostRequest(api, req_json);
      if (response.data.success == true) {
        const dataToPass = response.data.message["modulestatus"];
        if (dataToPass.pretest === 'Yet to start') {
          navigate("/user-home/activity");
        } else {
          if (dataToPass.pretest === 'completed') {
            setIsPreTestCompleted(true);
          }
          if (dataToPass.pretest === 'completed' && dataToPass.activity === 'in-progress') {
            setIsPreTestCompleted(true);
            setIsPostTestEnabled(false);
          }
          if (dataToPass.pretest === 'completed' && dataToPass.activity === 'completed') {
            setIsPostTestEnabled(true);
          }
          if (dataToPass.pretest === "completed" && dataToPass.activity === "completed" && dataToPass.posttest === "completed") {
            navigate("/user-home/activity");
          }
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
    // if (modulestatus[0].status === 'completed') {
      apiCall();
    // } else {
      // navigate('/user-home/activity')
    // }
  }, []);


  const [pretest, setPretest] = useState({
    q1: "",
    q2: "",
    q3: "",
    q4: "",
    q5: "",
  });

  const [worksheet, setWorkSheet] = useState({
    A1: "",
    A2: "",
    A3: "",
    A4: "",
    A5: "",
    A6: "",
    A7: "",
    A8: "",
    A9: "",
    A10: "",
    A11: "",
    A12: "",
    A13: "",
    A14: "",
    A15: "",
  });
  const [page3data, setPage3Data] = useState({
    Q1: "",
    Q2: "",
  });

  const [caseStudyQuestion, setCaseStudyQuestion] = useState({
    Q1: "",
    Q2: "",
  });

  const [courseFeedback, setCourseFeedback] = useState({
    Q1: "",
    Q2: "",
    Q3: "",
    Q4: "",
    Q5: "",
  });
  const [isPostTestEnabled, setIsPostTestEnabled] = useState(false);

  const [stress, setStress] = useState({
    q1: "",
    q2: "",
    q3: "",
    q4: "",
    q5: "",
  });
  const [isPreTestCompleted, setIsPreTestCompleted] = useState(false);
  const [makesYouStressed, setMakesYouStressed] = useState([]);
  const [arithmeticTest, setArithmeticTest] = useState([
    "1) 8 + 4",
    "2) 12/3",
    "3) 12 - 4",
    "4) 9 + 4",
    "5) 12/5",
    "6) 7 x 6",
    "7) 14 - 2",
    "8) 5/2",
    "9) 17 x 2",
    "10) 4 + 5",
    "11) 7 x 2",
    "12) 16 - 8",
    "13) 13 x 3",
    "14) 40/5",
    "15) 2 + 17",
    "16) 20 - 10",
    "17) 2 x 1",
    "18) 10 - 2",
    "19) 8 + 2",
    "20) 9/3",
  ]);


  const [reduceYourStress, setReduceYourStress] = useState([]);

  const post_test_data = {
    q1: {
      ques: "What is stress?",
      data: [
        {
          value: "A state of relaxation and calmness",
          label: "A state of relaxation and calmness",
        },
        {
          value: "Any type of change that causes strain",
          label: "Any type of change that causes strain",
        },
        {
          value: "Physical strain on the body",
          label: "Physical strain on the body",
        },
        {
          value: "Emotional strain on the mind",
          label: "Emotional strain on the mind",
        },
      ],
    },

    q2: {
      ques: "True or False: Stress only has a negative impact on the body and mind.",
      data: [
        {
          value: "True",
          label: "True",
        },
        {
          value: "False",
          label: "False",
        },
      ],
    },

    q3: {
      ques: "Which of the following is a type of positive stress?",
      data: [
        {
          value: "Eustress",
          label: "Eustress",
        },
        {
          value: "Distress",
          label: "Distress",
        },
        {
          value: "High stress",
          label: "High stress",
        },
        {
          value: "Low stress",
          label: "Low stress",
        },
      ],
    },

    q4: {
      ques: "What are some common sources of stress for students?",
      data: [
        {
          value: "Demands of parents",
          label: "Demands of parents",
        },
        {
          value: "Peer pressure",
          label: "Peer pressure",
        },
        {
          value: "Examinations",
          label: "Examinations",
        },
        {
          value: "All of the above",
          label: "All of the above",
        },
      ],
    },

    q5: {
      ques: "Which of the following is NOT a symptom of stress in adolescents?",
      data: [
        {
          value: "Fatigue and low energy level",
          label: "Fatigue and low energy level",
        },
        {
          value: "Lack of concentration",
          label: "Lack of concentration",
        },
        {
          value: "Nervous habits such as blinking or stuttering",
          label: "Nervous habits such as blinking or stuttering",
        },
        {
          value: "Sense of humor and enjoyment in school activities",
          label: "Sense of humor and enjoyment in school activities",
        },
      ],
    },
  };

  const page3activity = [
    {
      id: "page3",
      feedback_title: "What makes you feel stressed?",
      selectedValue: page3data.Q1,
      qNo: "Q1",
      radioLabels: {
        labels: [
          {
            value: "Not been prepared for exam",
            label: "Not been prepared for exam",
          },
          {
            value: "Playing games",
            label: "Playing games",
          },
          {
            value: "Doing an activity you like",
            label: "Doing an activity you like",
          },
        ],
      },
      name: "pa3",
    },
    {
      id: "page3",
      feedback_title: "Do you need positive stress?",
      selectedValue: page3data.Q2,
      qNo: "Q2",
      radioLabels: {
        labels: [
          {
            value: "No",
            label: "No",
          },
          {
            value: "Yes",
            label: "Yes",
          },
          {
            value: "Don't know",
            label: "Don't know",
          },
        ],
      },
      name: "pa3",
    },
  ];

  const caseStudyQuestions = [
    {
      id: "casestudy",
      feedback_title: "What happened between Virat and Saurab?",
      selectedValue: caseStudyQuestion.Q1,
      qNo: "Q1",
      radioLabels: {
        labels: [
          {
            value: "Discussion over class notes",
            label: "Discussion over class notes",
          },
          {
            value: "Sharing of class notes",
            label: "Sharing of class notes",
          },
          {
            value: "Quarrel over class notes",
            label: "Quarrel over class notes",
          },
        ],
      },
      name: "csq",
    },
    {
      id: "casestudy",
      feedback_title: "What did Virat do with Saurabh?",
      selectedValue: caseStudyQuestion.Q2,
      qNo: "Q2",
      radioLabels: {
        labels: [
          {
            value: "Virat asked all other friends to help Saurabh",
            label: "Virat asked all other friends to help Saurabh",
          },
          {
            value: "Virat asked all other friends not to talk with Saurabh",
            label: "Virat asked all other friends not to talk with Saurabh",
          },
          {
            value: "Virat asked all other friends to be away from Saurabh",
            label: "Don't know",
          },
        ],
      },
      name: "csq",
    },
  ];

  const arithmetic_test = [
    "1) 8 + 4",
    "2) 12/3",
    "3) 12 - 4",
    "4) 9 + 4",
    "5) 12/5",
    "6) 7 x 6",
    "7) 14 - 2",
    "8) 5/2",
    "9) 17 x 2",
    "10) 4 + 5",
    "11) 7 x 2",
    "12) 16 - 8",
    "13) 13 x 3",
    "14) 40/5",
    "15) 2 + 17",
    "16) 20 - 10",
    "17) 2 x 1",
    "18) 10 - 2",
    "19) 8 + 2",
    "20) 9/3",
  ];

  const studentStressSources = [
    "Demands of Parents",
    "Intense competition",
    "The need to be better than other students",
    "Peer pressure",
    "Examinations",
    "Society's expectations",
    "Heavy Curriculum",
  ];

  const stressSymptomsInAdolescents = [
    "No longer happy about school activities",
    "Exhibits boredom",
    "Sleeplessness",
    "Overreacts to normal concerns or events",
    "Fatigue, extreme tiredness, low energy level",
    "Unhappiness with self and accomplishments",
    "Nervous habits such as blinking, head shaking, or stuttering",
    "Physical ailments such as frequent stomach aches or headaches",
    "Dependence i.e. demanding constant support and reassurance",
    "Engages in attention-getting behaviors such as aggressive or acting-out behaviors",
    "Inability to make decisions",
    "No sense of humor",
    "Lack of concentration",
  ];

  const copingTheStress = [
    {
      title: "1. Take a Break",
      values: [
        "Breathe deeply",
        "Sit back and relax",
        "Do something you love",
        "Read a good book",
        "Change your surroundings",
      ],
    },
    {
      title: "2. Organize Your Life",
      values: [
        "Manage your time",
        "Make 'To Do' lists",
        "Plan ahead",
        "Set mini goals",
        "Learn to plan",
      ],
    },
    {
      title: "3. Communicate",
      values: [
        "Express your emotions that you're stressed, angry, depressed, or what you feel",
        "Talk to a friend",
        "Eliminate negative talk",
        "Cry",
        "Laugh",
      ],
    },
    {
      title: "4. Stretch",
      values: [
        "Stand up and reach up",
        "Neck stretch: roll your head in a half circle, starting at one side, and then dropping your chin to your chest, then to the other side",
        "Watch a cat stretch and do the same",
      ],
    },
    {
      title: "5. Practice Relaxation",
      values: [
        "Meditation",
        "Deep Breathing",
        "Get a Massage",
        "Visualization",
        "Take a Bath",
        "Try saying a Prayer",
      ],
    },
  ];

  const Therapeutic_writing1 = [
    {
      id: "whatMakesYouStressed",
      question: "What makes you stressed?",

      options: [
        { id: "q1_option1", label: "Demands of parents" },
        { id: "q1_option2", label: "Taking a break" },
        { id: "q1_option3", label: "Intense competition" },
        { id: "q1_option4", label: "Peer pressure" },
        { id: "q1_option5", label: "Relaxing in a garden" },
        { id: "q1_option6", label: "Examinations" },
        { id: "q1_option7", label: "Society's expectations" },
        { id: "q1_option8", label: "Talking to a friend" },
      ],
    },
  ];

  const Therapeutic_writing2 = [
    {
      id: "howToReduceStress",
      question: "Which of the following helps you reduce your stress?",
      options: [
        { id: "q2_option1", label: "Worrying about failure" },
        { id: "q2_option2", label: "Thinking too much about grades" },
        { id: "q2_option3", label: "Yoga" },
        { id: "q2_option4", label: "Listening to music" },
        { id: "q2_option5", label: "Laughing" },
        { id: "q2_option6", label: "Negative thinking: I can’t do it" },
        { id: "q2_option7", label: "Not Exercising" },
        { id: "q2_option8", label: "Managing your time for studying" },
      ],
    },
  ];

  const courseFeedbackData = [
    {
      title: "How easy was it to go through course pages?",
      selectedValue: courseFeedback.Q1,
      qNo: "Q1",
      radioLabels: {
        labels: [
          { value: "Very Easy", label: "1. Very Easy" },
          { value: "Easy", label: "2. Easy" },
          { value: "Neutral", label: "3. Neutral" },
          { value: "Difficult", label: "4. Difficult" },
          { value: "Very difficult", label: "5. Very difficult" },
        ],
      },
      name: "cf1",
    },
    {
      title: "Was the module organized and structured properly?",
      selectedValue: courseFeedback.Q2,
      qNo: "Q2",
      radioLabels: {
        labels: [
          { value: "Strongly agree", label: "1. Strongly agree" },
          { value: "Agree", label: "2. Agree" },
          {
            value: "Neither agree or disagree",
            label: "3. Neither agree or disagree",
          },
          { value: "Disagree", label: "4. Disagree" },
          { value: "Strongly disagree", label: "5. Strongly disagree" },
        ],
      },
      name: "cf2",
    },
    {
      title:
        "Did the module increase your knowledge and skills in the subject matter?",
      selectedValue: courseFeedback.Q3,
      qNo: "Q3",
      radioLabels: {
        labels: [
          { value: "Strongly agree", label: "1. Strongly agree" },
          { value: "Agree", label: "2. Agree" },
          {
            value: "Neither agree or disagree",
            label: "3. Neither agree or disagree",
          },
          { value: "Disagree", label: "4. Disagree" },
          { value: "Strongly disagree", label: "5. Strongly disagree" },
        ],
      },
      name: "cf3",
    },
    {
      title: "How helpful did you find the module?",
      selectedValue: courseFeedback.Q4,
      qNo: "Q4",
      radioLabels: {
        labels: [
          { value: "Very helpful", label: "1. Very helpful" },
          { value: "Helpful", label: "2. Helpful" },
          { value: "Undecided", label: "3. Undecided" },
          { value: "Not helpful", label: "4. Not helpful" },
        ],
      },
      name: "cf4",
    },
    {
      title: "Rate your overall experience of the Module",
      selectedValue: courseFeedback.Q5,
      qNo: "Q5",
      radioLabels: {
        labels: [
          { value: "Very Good", label: "Very Good" },
          { value: "Good", label: "Good" },
          { value: "Acceptable", label: "Acceptable" },
          { value: "Poor", label: "Poor" },
          { value: "Needs improvement", label: "Needs improvement" },
        ],
      },
      name: "cf5",
    },
  ];

  const handleComAcaStressChange = (optionLabel) => {
    setMakesYouStressed((prevAnswers) => {
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
  const handleComAcaStressChange1 = (optionLabel) => {
    setReduceYourStress((prevAnswers) => {
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
  const handleAdolescentRadioChange = (e, questionNumber) => {
    const name = e.target.name;
    const startsWithPT = /^pt/i.test(name);
    const startWithPA = /^pa/i.test(name);
    const startWithCS = /^cs/i.test(name);
    const startWithCF = /^cf/i.test(name);
    const startWithST = /^st/i.test(name);

    if (startsWithPT) {
      setPretest((prevState) => ({
        ...prevState,
        [questionNumber]: e.target.value,
      }));
    }

    if (startWithPA) {
      setPage3Data((prevState) => ({
        ...prevState,
        [questionNumber]: e.target.value,
      }));
    }
    if (startWithCS) {
      setCaseStudyQuestion((prevState) => ({
        ...prevState,
        [questionNumber]: e.target.value,
      }));
    }
    if (startWithCF) {
      setCourseFeedback((prevState) => ({
        ...prevState,
        [questionNumber]: e.target.value,
      }));
    }
    if (startWithST) {
      setStress((prevState) => ({
        ...prevState,
        [questionNumber]: e.target.value,
      }));
    }
  };

  const handleArithmeticTest = (index, newValue) => {
    const updatedValues = [...arithmeticTest];
    updatedValues[index] = newValue;

    setArithmeticTest(updatedValues);
  };

  const enablePostTest = async () => {
    calculateUsedTime();

    setIsPostTestEnabled(true);

    const endTime = localStorage.getItem("currentTime");
    try {


      let api = "http://127.0.0.1:7700/ModuleFunction";

      let req_json = {
        "modulename": "module1",
        "testtype": "posttest",
        "moduleData": {
          "What is stress?": stress.q1,
          "True or False: Stress only has a negative impact on the body and mind.": stress.q2,
          "Which of the following is a type of positive stress?": stress.q3,
          "What are some common sources of stress for students?": stress.q4,
          "Which of the following is NOT a symptom of stress in adolescents?": stress.q5,
        },
        "endTime": endTime
      }
      const response = await apiPostRequest(api, req_json);
      if (response.data.success === true) {
        navigate('/user-home/activity/Module3');
      } else {
        toastr.error(response.data.message)
      }
    }
    catch {
      toastr.error("There is an internal error! Please logout and login.")
    }
  };

  const [depressionActivity, setSelectedDepActivity] = useState({
    "Intense competition": "",
    "Demands of parents": "",
    "The need to excel": "",
    "Inability to make decisions": "",

    "No sense of humor": "",
    "Lack of concentration": "",
    "Peer pressure": "",
    Examinations: "",

    "No longer happy about school activities": "",
    "Exhibits boredom": "",
    Sleeplessness: "",
    "Overreacts to normal concerns or events": "",

    "Fatigue, extreme tiredness, low energy level": "",
    "Living up to society's expectations": "",
    "Heavy Curriculum": "",
  });

  const [module2, setModule2] = useState([]);

  const handleOptionChange = (question, option) => {
    setSelectedDepActivity((prevState) => ({
      ...prevState,
      [question]: option,
    }));
  };

  const worksheetTracker = (e, optionId) => {
    const id = e.target.id;
    const val = e.target.value;
    if (id === "ws1") {
      setWorkSheet((prevState) => ({
        ...prevState,
        A1: val,
      }));
    }
    if (id === "ws2") {
      setWorkSheet((prevState) => ({
        ...prevState,
        A2: val,
      }));
    }
    if (id === "ws3") {
      setWorkSheet((prevState) => ({
        ...prevState,
        A3: val,
      }));
    }
    if (id === "ws4") {
      setWorkSheet((prevState) => ({
        ...prevState,
        A4: val,
      }));
    }
    if (id === "ws5") {
      setWorkSheet((prevState) => ({
        ...prevState,
        A5: val,
      }));
    }
    if (id === "ws6") {
      setWorkSheet((prevState) => ({
        ...prevState,
        A6: val,
      }));
    }
    if (id === "ws7") {
      setWorkSheet((prevState) => ({
        ...prevState,
        A7: val,
      }));
    }
    if (id === "ws8") {
      setWorkSheet((prevState) => ({
        ...prevState,
        A8: val,
      }));
    }
    if (id === "ws9") {
      setWorkSheet((prevState) => ({
        ...prevState,
        A9: val,
      }));
    }
    if (id === "ws10") {
      setWorkSheet((prevState) => ({
        ...prevState,
        A10: val,
      }));
    }
    if (id === "ws11") {
      setWorkSheet((prevState) => ({
        ...prevState,
        A11: val,
      }));
    }
    if (id === "ws12") {
      setWorkSheet((prevState) => ({
        ...prevState,
        A12: val,
      }));
    }
    if (id === "ws13") {
      setWorkSheet((prevState) => ({
        ...prevState,
        A13: val,
      }));
    }
    if (id === "ws14") {
      setWorkSheet((prevState) => ({
        ...prevState,
        A14: val,
      }));
    }
    if (id === "ws15") {
      setWorkSheet((prevState) => ({
        ...prevState,
        A15: val,
      }));
    }
  };
  const handlePreTestResults = (event, questionNumber) => {
    setPretest((prevState) => ({
      ...prevState,
      [questionNumber]: event.target.value,
    }));
  };

  const handlePostTestResults = (event, questionNumber) => {
    setStress((prevState) => ({
      ...prevState,
      [questionNumber]: event.target.value,
    }));
    setModule2([{
      "What is stress?": pretest.q1,
      "True or False: Stress only has a negative impact on the body and mind.": pretest.q2,
      "Which of the following is a type of positive stress?": pretest.q3,
      "What are some common sources of stress for students?": pretest.q4,
      "Which of the following is NOT a symptom of stress in adolescents?": pretest.q5,
    },


    {

      "What makes you feel stressed?": page3data.Q1,
      "Do you need positive stress?": page3data.Q2,
      "Arithmentic Test": [arithmeticTest[0], arithmeticTest[1], arithmeticTest[2], arithmeticTest[3], arithmeticTest[4],
      arithmeticTest[5],
      arithmeticTest[6],
      arithmeticTest[7],
      arithmeticTest[8],
      arithmeticTest[9],
      arithmeticTest[10],
      arithmeticTest[11],
      arithmeticTest[12],
      arithmeticTest[13],
      arithmeticTest[14],
      arithmeticTest[15],
      arithmeticTest[16],
      arithmeticTest[17],
      arithmeticTest[18],
      arithmeticTest[19],
      ],
      "What happened between Virat and Saurab?": caseStudyQuestion.Q1,

      "What did Virat do with Saurabh?": caseStudyQuestion.Q2,
      "depressionActivity": ":",
      "Intense competition": depressionActivity["Intense competition"],
      "Demands of parents": depressionActivity["Demands of parents"],
      "The need to excel": depressionActivity["The need to excel"],
      "Inability to make decisions": depressionActivity["Inability to make decisions"],

      "No sense of humor": depressionActivity["No sense of humor"],
      "Lack of concentration": depressionActivity["Lack of concentration"],
      "Peer pressure": depressionActivity["Peer pressure"],
      Examinations: depressionActivity.Examinations,

      "No longer happy about school activities": depressionActivity["No longer happy about school activities"],
      "Exhibits boredom": depressionActivity["Exhibits boredom"],
      Sleeplessness: depressionActivity.Sleeplessness,
      "Overreacts to normal concerns or events": depressionActivity["Overreacts to normal concerns or events"],

      "Fatigue, extreme tiredness, low energy level": depressionActivity["Fatigue, extreme tiredness, low energy level"],
      "Living up to society's expectations": depressionActivity["Living up to society's expectations"],
      "Heavy Curriculum": depressionActivity["Heavy Curriculum"],
      "Three common situations in which I feel stressed are": [worksheet.A1, worksheet.A2, worksheet.A3],
      "When I am stressed, my feelings are": [worksheet.A4, worksheet.A5, worksheet.A6],
      "When I am stressed changes in my body are": [worksheet.A7, worksheet.A8, worksheet.A9],
      "Stress affects my health in the following ways": [worksheet.A10, worksheet.A11, worksheet.A12],
      "When I am stressed, what I normally do to make myself feel better": [worksheet.A13, worksheet.A14, worksheet.A15],
      "What makes you stressed?": makesYouStressed,
      "Which of the following helps you reduce your stress?": reduceYourStress,
      "How easy was it to go through course pages?": courseFeedback.Q1,
      "Was the module organized and structured properly?": courseFeedback.Q2,
      "Did the module increase your knowledge and skills in the subject matter?": courseFeedback.Q3,
      "How helpful did you find the module?": courseFeedback.Q4,
      "Rate your overall experience of the Module": courseFeedback.Q5


    },

    {
      "What is stress?": stress.q1,
      "True or False: Stress only has a negative impact on the body and mind.": stress.q2,
      "Which of the following is a type of positive stress?": stress.q3,
      "What are some common sources of stress for students?": stress.q4,
      "Which of the following is NOT a symptom of stress in adolescents?": stress.q5,
    },


    ]);
  };

  const onModule2PreTestSubmit = async () => {
    setIsPreTestCompleted(true);
    const currentTime = localStorage.getItem("currentTime");
    try {


      let api = "http://127.0.0.1:7700/ModuleFunction";

      let req_json = {
        "modulename": "module1",
        "testtype": "pretest",
        "moduleDataPretest": {
          "What is stress?": pretest.q1,
          "True or False: Stress only has a negative impact on the body and mind.": pretest.q2,
          "Which of the following is a type of positive stress?": pretest.q3,
          "What are some common sources of stress for students?": pretest.q4,
          "Which of the following is NOT a symptom of stress in adolescents?": pretest.q5,
        },
        "currentTime": currentTime
      }
      const response = await apiPostRequest(api, req_json);
    }
    catch {
      toastr.error("There is an internal error! Please logout and login.")
    }
  };
  const handleSubmit = async () => {
    setIsPostTestEnabled(true);
    try {


      let api = "http://127.0.0.1:7700/ModuleFunction";

      let req_json = {
        "modulename": "module1",
        "testtype": "activity",
        "moduleData": {

          "What makes you feel stressed?": page3data.Q1,
          "Do you need positive stress?": page3data.Q2,
          "Arithmentic Test":
            [arithmeticTest[0],
            arithmeticTest[1],
            arithmeticTest[2],
            arithmeticTest[3],
            arithmeticTest[4],
            arithmeticTest[5],
            arithmeticTest[6],
            arithmeticTest[7],
            arithmeticTest[8],
            arithmeticTest[9],
            arithmeticTest[10],
            arithmeticTest[11],
            arithmeticTest[12],
            arithmeticTest[13],
            arithmeticTest[14],
            arithmeticTest[15],
            arithmeticTest[16],
            arithmeticTest[17],
            arithmeticTest[18],
            arithmeticTest[19],
            ],
          "What happened between Virat and Saurab?": caseStudyQuestion.Q1,
          "What did Virat do with Saurabh?": caseStudyQuestion.Q2,
          "depressionActivity": ":",
          "Intense competition": depressionActivity["Intense competition"],
          "Demands of parents": depressionActivity["Demands of parents"],
          "The need to excel": depressionActivity["The need to excel"],
          "Inability to make decisions": depressionActivity["Inability to make decisions"],
          "No sense of humor": depressionActivity["No sense of humor"],
          "Lack of concentration": depressionActivity["Lack of concentration"],
          "Peer pressure": depressionActivity["Peer pressure"],
          Examinations: depressionActivity.Examinations,
          "No longer happy about school activities": depressionActivity["No longer happy about school activities"],
          "Exhibits boredom": depressionActivity["Exhibits boredom"],
          Sleeplessness: depressionActivity.Sleeplessness,
          "Overreacts to normal concerns or events": depressionActivity["Overreacts to normal concerns or events"],
          "Fatigue, extreme tiredness, low energy level": depressionActivity["Fatigue, extreme tiredness, low energy level"],
          "Living up to society's expectations": depressionActivity["Living up to society's expectations"],
          "Heavy Curriculum": depressionActivity["Heavy Curriculum"],
          "Three common situations in which I feel stressed are": [worksheet.A1, worksheet.A2, worksheet.A3],
          "When I am stressed, my feelings are": [worksheet.A4, worksheet.A5, worksheet.A6],
          "When I am stressed changes in my body are": [worksheet.A7, worksheet.A8, worksheet.A9],
          "Stress affects my health in the following ways": [worksheet.A10, worksheet.A11, worksheet.A12],
          "When I am stressed, what I normally do to make myself feel better": [worksheet.A13, worksheet.A14, worksheet.A15],
          "What makes you stressed?": makesYouStressed,
          "Which of the following helps you reduce your stress?": reduceYourStress,
          "I often share my experiences with my parents and siblings": depressionActivity["I often share my experiences with my parents and siblings"],
          "I generally get satisfactory marks in my examinations": depressionActivity["I generally get satisfactory marks in my examinations"],
          "Students of higher classes often bully me": depressionActivity["Students of higher classes often bully me"],
          "I feel difficulty in controlling my anger": depressionActivity["I feel difficulty in controlling my anger"],
          "I easily break down in tears": depressionActivity["I easily break down in tears"],
          "I get upset when things do not go my way": depressionActivity["I get upset when things do not go my way"],
          "I take help of relaxation techniques when stressed": depressionActivity["I take help of relaxation techniques when stressed"],
          "I react without considering consequence when upset": depressionActivity["I react without considering consequence when upset"],
          "I have a regular plan for things and I follow it": depressionActivity["I have a regular plan for things and I follow it"],
          "I work keeping the priority of the task in mind": depressionActivity["I work keeping the priority of the task in mind"],

          "How easy was it to go through course pages?": courseFeedback.Q1,
          "Was the module organized and structured properly?": courseFeedback.Q2,
          "Did the module increase your knowledge and skills in the subject matter?": courseFeedback.Q3,
          "How helpful did you find the module?": courseFeedback.Q4,
          "Rate your overall experience of the Module": courseFeedback.Q5
        },
      }
      const response = await apiPostRequest(api, req_json);
    }
    catch {
      toastr.error("There is an internal error! Please logout and login.")
    }
  };
  return (
    <>
      <ModulesMain notDefault={true} />
      {!isPreTestCompleted && (
        <form>
          <PrePostTest
            testType={"PRE-TEST"}
            testDetails={post_test_data}
            selectedValue={pretest}
            onOptSelect={handlePreTestResults}
            onTestSubmit={onModule2PreTestSubmit}
            btnClass={`col-md-1 col-sm-3 p-2 fw-bold ${areAllFieldsFilled(
              pretest
            )}`}
            moduleNo={1}
          />
        </form>
      )}
      {!isPostTestEnabled && isPreTestCompleted && (
        <div className="text-start  module4-main-secton py-4 px-5">
          <form>
            <h1>MODULE 2: Stress</h1>
            <h4 className="mt-4 fw-bold"> Introduction</h4>
            <p className="mt-3">
              We often complain about trivial pains and problems we face in life
              and forget about the bigger problems and feel stressed. We are
              after the glitter of this world and forget the actual purpose and
              goals in our life. Take a minute or two to think about which is
              more important to you-the water or the cup. So let us stop
              complaining and enjoy our life by acknowledging that stress is
              part of our daily life
            </p>

            <h4 className="mt-3">What is stress?</h4>
            <ul className="mt-3">
              <li>
                WHO defines stress as any type of change that causes physical,
                emotional or psychological strain.
              </li>
              <li>
                Stress is your body's response to anything that requires
                attention or action.
              </li>
              <li>
                Stress affects the body and mind. Its impact can be positive and
                negative.
              </li>
            </ul>

            <h4>Video:</h4>
            <p className="mt-3">
              1. How stress affects your brain - Madhumita Murgia.
            </p>
            <a href="https://youtu.be/WuyPuH9ojCE" target="blank">
              Source: TED-Ed
            </a>

            <h4 className="mt-3 mb-3 fw-bold"> Types and sources</h4>
            <h5>
              <b>Two kinds of stress</b>
            </h5>
            <p className="mt-3">
              1.<b>Eustress or negative stress</b> occurs when your level of
              stress is high enough to motivate you to move into action to
              accomplish things.
            </p>

            <p>
              2. <b>Distress or nagative stress</b> occurs when your level of
              stress is either too high or too low and your body and mind begin
              to respond negatively to the stressors. It impairs your
              performance.
            </p>

            <h4 className="mt-3 fw-bold">
              Activity 1: write down: (2 points) (choose the right
              answer)
            </h4>
            {page3activity.map((data, i) => (
              <>
                <h5 className="mt-3">{data.feedback_title}</h5>
                <RadioOptions
                  selectedValue={data.selectedValue}
                  name={data.name}
                  data={data.radioLabels.labels}
                  onChange={handleAdolescentRadioChange}
                  qNo={data.qNo}
                />
              </>
            ))}

            <h4 className="mt-3 fw-bold">
              Image Source:{" "}
              <a href="https://youtu.be/WuyPuH9ojCE" target="blank">
                stress performance management curve
              </a>
            </h4>
            <br />
            <img
              src={OSLPP}
              alt="Optimise Stress Levels For Peak Performance"
              style={{ width: "fit-content", height: "fit-content" }}
            />

            <h5 className="mt-3">
              Video Source: Yerkes-Dodson Law - It also works between pay and
              performance
            </h5>
            <a
              href="https://www.youtube.com/watch?v=NIKXLFBz8o8"
              target="blank"
            >
              Short Story that help to change
            </a>

            <h4 className="mt-3 fw-bold"> Activities:</h4>
            <h5 className="mt-3">Time based game, Sums to solve:</h5>
            <p className="mt-3">
              <b>Theme:</b>Any situation, even a game can cause stress. The
              situation can become competitive and result in a race! How can you
              cope positively in such situations?
            </p>
            <p>
              <b>Worksheet: Arithmentic Test</b> <br />
              Directions: In the following simple arithmetic problems, a plus
              (+) sign means to multiply; a minus (-) sign means to divide; a
              multiplication (x) sign means to subtract and a divide (/) sign
              means to add. Complete the problems following these directions.
            </p>
            {arithmetic_test.map((value, index) => (
              <div className="mt-4">
                {value}
                <InputField
                  type="number"
                  id="commonissue1"
                  onChange={(e) => handleArithmeticTest(index, e.target.value)}
                />
              </div>
            ))}

            <h4 className="mt-3 fw-bold"> Activity:</h4>
            <p className="mt-3">
              <b>Theme:</b>People have their own stress coping strategies. This
              activity helps students to gain skills to deal with stressful
              conditions by using the case study method.
            </p>
            <p>
              <b>Objective:</b>Students will be able to learn about stress and
              ways of coping with it.
            </p>

            <b>Instructions:</b>
            <br />
            <u className="mt-3">
              <li>Analyse the situation given in the case study.</li>
              <li>Answer the following questions:</li>
            </u>
            <br />
            <b>Case study:</b>
            <p>
              Saurabh is thirteen years old studying in class VIII. Last week he
              had a quarrel with his friend, Virat over class notes. Virat
              stopped talking to Saurabh and even persuaded some of his other
              classmates not to talk to him. This has made Saurabh very sad and
              depressed and he is not able to concentrate on his studies. He
              often cries at home but does not share his feelings with parents
              or anyone else. He is under lot of stress.{" "}
            </p>

            {caseStudyQuestions.map((data, i) => (
              <>
                <h5 className="mt-3">{data.feedback_title}</h5>
                <RadioOptions
                  selectedValue={data.selectedValue}
                  name={data.name}
                  data={data.radioLabels.labels}
                  onChange={handleAdolescentRadioChange}
                  qNo={data.qNo}
                />
              </>
            ))}

            <h4 className="mt-3 fw-bold">
              Sources of stress for students
            </h4>
            <ul>
              {studentStressSources.map((data, i) => (
                <li>{data}</li>
              ))}
            </ul>
            <h4 className="mt-3 fw-bold">
              symptoms of stress in adolescents
            </h4>
            <ul>
              {stressSymptomsInAdolescents.map((data, i) => (
                <li>{data}</li>
              ))}
            </ul>

            <h4 className="mt-3 fw-bold">
              Game 1: Differentiate the source and symptoms of stress
              total score:
            </h4>
            <p>Type 1: for source of stress</p>
            <p>Type 2: for symptoms of stress:</p>

            <CustomTable
              columns={[
                { id: "yes", label: "Source or symptom of stress" },
                { id: "yes", label: "Option: 1 " },
                { id: "yes", label: "Option: 2" },
              ]}
              rows={[
                {
                  q: "Intense competition",
                  yes: (
                    <input
                      type="radio"
                      value="yes"
                      style={{ cursor: "pointer" }}
                      checked={
                        depressionActivity["Intense competition"] ===
                        "Option: 1"
                      }
                      onChange={(e) =>
                        handleOptionChange("Intense competition", "Option: 1")
                      }
                    />
                  ),
                  no: (
                    <input
                      type="radio"
                      value="no"
                      style={{ cursor: "pointer" }}
                      checked={
                        depressionActivity["Intense competition"] ===
                        "Option: 2"
                      }
                      onChange={(e) =>
                        handleOptionChange("Intense competition", "Option: 2")
                      }
                    />
                  ),
                },
                {
                  q: "Demands of parents",
                  yes: (
                    <input
                      type="radio"
                      style={{ cursor: "pointer" }}
                      value="yes"
                      checked={
                        depressionActivity["Demands of parents"] === "Option: 1"
                      }
                      onChange={(e) =>
                        handleOptionChange("Demands of parents", "Option: 1")
                      }
                    />
                  ),
                  no: (
                    <input
                      type="radio"
                      value="no"
                      style={{ cursor: "pointer" }}
                      checked={
                        depressionActivity["Demands of parents"] === "Option: 2"
                      }
                      onChange={(e) =>
                        handleOptionChange("Demands of parents", "Option: 2")
                      }
                    />
                  ),
                },
                {
                  q: "The need to excel",
                  yes: (
                    <input
                      type="radio"
                      style={{ cursor: "pointer" }}
                      value="yes"
                      checked={
                        depressionActivity["The need to excel"] === "Option: 1"
                      }
                      onChange={(e) =>
                        handleOptionChange("The need to excel", "Option: 1")
                      }
                    />
                  ),
                  no: (
                    <input
                      type="radio"
                      value="no"
                      style={{ cursor: "pointer" }}
                      checked={
                        depressionActivity["The need to excel"] === "Option: 2"
                      }
                      onChange={(e) =>
                        handleOptionChange("The need to excel", "Option: 2")
                      }
                    />
                  ),
                },
                {
                  q: "Inability to make decisions",
                  yes: (
                    <input
                      type="radio"
                      style={{ cursor: "pointer" }}
                      value="yes"
                      checked={
                        depressionActivity["Inability to make decisions"] ===
                        "Option: 1"
                      }
                      onChange={(e) =>
                        handleOptionChange(
                          "Inability to make decisions",
                          "Option: 1"
                        )
                      }
                    />
                  ),
                  no: (
                    <input
                      type="radio"
                      style={{ cursor: "pointer" }}
                      value="no"
                      checked={
                        depressionActivity["Inability to make decisions"] ===
                        "Option: 2"
                      }
                      onChange={(e) =>
                        handleOptionChange(
                          "Inability to make decisions",
                          "Option: 2"
                        )
                      }
                    />
                  ),
                },
                {
                  q: "No sense of humor",
                  yes: (
                    <input
                      type="radio"
                      style={{ cursor: "pointer" }}
                      value="yes"
                      checked={
                        depressionActivity["No sense of humor"] === "Option: 1"
                      }
                      onChange={(e) =>
                        handleOptionChange("No sense of humor", "Option: 1")
                      }
                    />
                  ),
                  no: (
                    <input
                      type="radio"
                      value="no"
                      style={{ cursor: "pointer" }}
                      checked={
                        depressionActivity["No sense of humor"] === "Option: 2"
                      }
                      onChange={(e) =>
                        handleOptionChange("No sense of humor", "Option: 2")
                      }
                    />
                  ),
                },
                {
                  q: "Lack of concentration",
                  yes: (
                    <input
                      type="radio"
                      style={{ cursor: "pointer" }}
                      value="yes"
                      checked={
                        depressionActivity["Lack of concentration"] ===
                        "Option: 1"
                      }
                      onChange={(e) =>
                        handleOptionChange("Lack of concentration", "Option: 1")
                      }
                    />
                  ),
                  no: (
                    <input
                      type="radio"
                      value="no"
                      style={{ cursor: "pointer" }}
                      checked={
                        depressionActivity["Lack of concentration"] ===
                        "Option: 2"
                      }
                      onChange={(e) =>
                        handleOptionChange("Lack of concentration", "Option: 2")
                      }
                    />
                  ),
                },
                {
                  q: "Peer pressure",
                  yes: (
                    <input
                      type="radio"
                      value="yes"
                      style={{ cursor: "pointer" }}
                      checked={
                        depressionActivity["Peer pressure"] === "Option: 1"
                      }
                      onChange={(e) =>
                        handleOptionChange("Peer pressure", "Option: 1")
                      }
                    />
                  ),
                  no: (
                    <input
                      type="radio"
                      value="no"
                      style={{ cursor: "pointer" }}
                      checked={
                        depressionActivity["Peer pressure"] === "Option: 2"
                      }
                      onChange={(e) =>
                        handleOptionChange("Peer pressure", "Option: 2")
                      }
                    />
                  ),
                },
                {
                  q: "Examinations",
                  yes: (
                    <input
                      type="radio"
                      style={{ cursor: "pointer" }}
                      value="yes"
                      checked={
                        depressionActivity["Examinations"] === "Option: 1"
                      }
                      onChange={(e) =>
                        handleOptionChange("Examinations", "Option: 1")
                      }
                    />
                  ),
                  no: (
                    <input
                      type="radio"
                      style={{ cursor: "pointer" }}
                      value="no"
                      checked={
                        depressionActivity["Examinations"] === "Option: 2"
                      }
                      onChange={(e) =>
                        handleOptionChange("Examinations", "Option: 2")
                      }
                    />
                  ),
                },
                {
                  q: "No longer happy about school activities",
                  yes: (
                    <input
                      type="radio"
                      value="yes"
                      style={{ cursor: "pointer" }}
                      checked={
                        depressionActivity[
                        "No longer happy about school activities"
                        ] === "Option: 1"
                      }
                      onChange={(e) =>
                        handleOptionChange(
                          "No longer happy about school activities",
                          "Option: 1"
                        )
                      }
                    />
                  ),
                  no: (
                    <input
                      type="radio"
                      value="no"
                      style={{ cursor: "pointer" }}
                      checked={
                        depressionActivity[
                        "No longer happy about school activities"
                        ] === "Option: 2"
                      }
                      onChange={(e) =>
                        handleOptionChange(
                          "No longer happy about school activities",
                          "Option: 2"
                        )
                      }
                    />
                  ),
                },
                {
                  q: "Exhibits boredom",
                  yes: (
                    <input
                      type="radio"
                      style={{ cursor: "pointer" }}
                      value="yes"
                      checked={
                        depressionActivity["Exhibits boredom"] === "Option: 1"
                      }
                      onChange={(e) =>
                        handleOptionChange("Exhibits boredom", "Option: 1")
                      }
                    />
                  ),
                  no: (
                    <input
                      type="radio"
                      value="no"
                      style={{ cursor: "pointer" }}
                      checked={
                        depressionActivity["Exhibits boredom"] === "Option: 2"
                      }
                      onChange={(e) =>
                        handleOptionChange("Exhibits boredom", "Option: 2")
                      }
                    />
                  ),
                },
                {
                  q: "Sleeplessness",
                  yes: (
                    <input
                      type="radio"
                      style={{ cursor: "pointer" }}
                      value="yes"
                      checked={
                        depressionActivity["Sleeplessness"] === "Option: 1"
                      }
                      onChange={(e) =>
                        handleOptionChange("Sleeplessness", "Option: 1")
                      }
                    />
                  ),
                  no: (
                    <input
                      type="radio"
                      style={{ cursor: "pointer" }}
                      value="no"
                      checked={
                        depressionActivity["Sleeplessness"] === "Option: 2"
                      }
                      onChange={(e) =>
                        handleOptionChange("Sleeplessness", "Option: 2")
                      }
                    />
                  ),
                },
                {
                  q: "Overreacts to normal concerns or events",
                  yes: (
                    <input
                      type="radio"
                      style={{ cursor: "pointer" }}
                      value="yes"
                      checked={
                        depressionActivity[
                        "Overreacts to normal concerns or events"
                        ] === "Option: 1"
                      }
                      onChange={(e) =>
                        handleOptionChange(
                          "Overreacts to normal concerns or events",
                          "Option: 1"
                        )
                      }
                    />
                  ),
                  no: (
                    <input
                      type="radio"
                      style={{ cursor: "pointer" }}
                      value="no"
                      checked={
                        depressionActivity[
                        "Overreacts to normal concerns or events"
                        ] === "Option: 2"
                      }
                      onChange={(e) =>
                        handleOptionChange(
                          "Overreacts to normal concerns or events",
                          "Option: 2"
                        )
                      }
                    />
                  ),
                },
                {
                  q: "Fatigue, extreme tiredness, low energy level",
                  yes: (
                    <input
                      type="radio"
                      value="yes"
                      style={{ cursor: "pointer" }}
                      checked={
                        depressionActivity[
                        "Fatigue, extreme tiredness, low energy level"
                        ] === "Option: 1"
                      }
                      onChange={(e) =>
                        handleOptionChange(
                          "Fatigue, extreme tiredness, low energy level",
                          "Option: 1"
                        )
                      }
                    />
                  ),
                  no: (
                    <input
                      type="radio"
                      style={{ cursor: "pointer" }}
                      value="no"
                      checked={
                        depressionActivity[
                        "Fatigue, extreme tiredness, low energy level"
                        ] === "Option: 2"
                      }
                      onChange={(e) =>
                        handleOptionChange(
                          "Fatigue, extreme tiredness, low energy level",
                          "Option: 2"
                        )
                      }
                    />
                  ),
                },
                {
                  q: "Living up to society's expectations",
                  yes: (
                    <input
                      type="radio"
                      value="yes"
                      style={{ cursor: "pointer" }}
                      checked={
                        depressionActivity[
                        "Living up to society's expectations"
                        ] === "Option: 1"
                      }
                      onChange={(e) =>
                        handleOptionChange(
                          "Living up to society's expectations",
                          "Option: 1"
                        )
                      }
                    />
                  ),
                  no: (
                    <input
                      type="radio"
                      style={{ cursor: "pointer" }}
                      value="no"
                      checked={
                        depressionActivity[
                        "Living up to society's expectations"
                        ] === "Option: 2"
                      }
                      onChange={(e) =>
                        handleOptionChange(
                          "Living up to society's expectations",
                          "Option: 2"
                        )
                      }
                    />
                  ),
                },
                {
                  q: "Heavy Curriculum",
                  yes: (
                    <input
                      type="radio"
                      style={{ cursor: "pointer" }}
                      value="yes"
                      checked={
                        depressionActivity["Heavy Curriculum"] === "Option: 1"
                      }
                      onChange={(e) =>
                        handleOptionChange("Heavy Curriculum", "Option: 1")
                      }
                    />
                  ),
                  no: (
                    <input
                      type="radio"
                      value="no"
                      style={{ cursor: "pointer" }}
                      checked={
                        depressionActivity["Heavy Curriculum"] === "Option: 2"
                      }
                      onChange={(e) =>
                        handleOptionChange("Heavy Curriculum", "Option: 2")
                      }
                    />
                  ),
                },
              ]}
              className={"custom-table mt-3 mb-3"}
            />
            <h4 className="mt-3 fw-bold">
              Activity: How stress affects my life
            </h4>
            <p>
              <b>Theme:</b>Since everyone has a unique response to stress, there
              is no “one size fits all” solution to manage it. No single method
              works for everyone or in every situation. This activity is
              designed to recognize common causes of stress, how it affects us
              and to learn about ways to control it.
            </p>

            <p>
              <b>Objectives:</b>Students will be able to: identify common causes
              of stress and its effects; enhance their skills for coping with
              stress.
            </p>
            <h5>Activity 3: Worksheet:</h5>
            <h5 className="mt-4">
              1.Three common situations in which I feel stressed are
            </h5>
            <div className="mt-4">
              <InputField
                type="text"
                id="ws1"
                value={worksheet.A1}
                onChange={worksheetTracker}
              />
            </div>
            <div className="mt-4 ">
              <InputField
                type="text"
                id="ws2"
                value={worksheet.A2}
                onChange={worksheetTracker}
              />
            </div>
            <div className="mt-4 ">
              <InputField
                type="text"
                id="ws3"
                value={worksheet.A3}
                onChange={worksheetTracker}
              />
            </div>
            <h5 className="mt-4">2. When I am stressed, my feelings are</h5>
            <div className="mt-4 ">
              <InputField
                type="text"
                id="ws4"
                value={worksheet.A4}
                onChange={worksheetTracker}
              />
            </div>
            <div className="mt-4 ">
              <InputField
                type="text"
                id="ws5"
                value={worksheet.A5}
                onChange={worksheetTracker}
              />
            </div>
            <div className="mt-4 ">
              <InputField
                type="text"
                id="ws6"
                value={worksheet.A6}
                onChange={worksheetTracker}
              />
            </div>
            <h5 className="mt-4">
              3. When I am stressed changes in my body are{" "}
            </h5>
            <div className="mt-4 ">
              <InputField
                type="text"
                id="ws7"
                value={worksheet.A7}
                onChange={worksheetTracker}
              />
            </div>
            <div className="mt-4 ">
              <InputField
                type="text"
                id="ws8"
                value={worksheet.A8}
                onChange={worksheetTracker}
              />
            </div>
            <div className="mt-4 ">
              <InputField
                type="text"
                id="ws9"
                value={worksheet.A9}
                onChange={worksheetTracker}
              />
            </div>
            <h5 className="mt-4">
              4. Stress affects my health in the following ways
            </h5>
            <div className="mt-4 ">
              <InputField
                type="text"
                id="ws10"
                value={worksheet.A10}
                onChange={worksheetTracker}
              />
            </div>
            <div className="mt-4 ">
              <InputField
                type="text"
                id="ws11"
                value={worksheet.A11}
                onChange={worksheetTracker}
              />
            </div>
            <div className="mt-4 ">
              <InputField
                type="text"
                id="ws12"
                value={worksheet.A12}
                onChange={worksheetTracker}
              />
            </div>
            <h5 className="mt-4">
              5. When I am stressed, what I normally do to make myself feel
              better
            </h5>
            <div className="mt-4 ">
              <InputField
                type="text"
                id="ws13"
                value={worksheet.A13}
                onChange={worksheetTracker}
              />
            </div>
            <div className="mt-4 ">
              <InputField
                type="text"
                id="ws14"
                value={worksheet.A14}
                onChange={worksheetTracker}
              />
            </div>
            <div className="mt-4 ">
              <InputField
                type="text"
                id="ws15"
                value={worksheet.A15}
                onChange={worksheetTracker}
              />
            </div>

            <h4 className="mt-4 mb-3 fw-bold"> Coping with stress</h4>
            {copingTheStress.map((data, i) => (
              <>
                <b className="mt-3">{data.title}</b>
                <ul>
                  {data.values.map((val, i) => (
                    <li>{val}</li>
                  ))}
                </ul>
              </>
            ))}

            <h4 className="mt-3 fw-bold"> Recall Videos:</h4>
            <ul>
              <li>
                How stress affects your body - Sharon Horesh Bergquist:{" "}
                <a href="https://youtu.be/v-t1Z5-oPtU" target="blank">
                  TED-Ed
                </a>
              </li>
              <li>
                How stress affects your body and mind:{" "}
                <a href="https://youtu.be/CZTc8_FwHGM" target="blank">
                  Braive.com
                </a>
              </li>
            </ul>

            <h4 className="mt-3 mb-3 fw-bold">
              Therapeutic writing(mandate option): Tick mark the right
              answer:
            </h4>
            <CheckBox
              module={3}
              questions={Therapeutic_writing1}
              func={handleComAcaStressChange}
              answers={makesYouStressed}
              labelclass={"col-md-3 py-2 px-4"}
            />
            <CheckBox
              module={3}
              questions={Therapeutic_writing2}
              func={handleComAcaStressChange1}
              answers={reduceYourStress}
              labelclass={"col-md-3 py-2 px-4"}
            />

            <h4 className="mt-3 mb-3 fw-bold"> Self assessment:</h4>
            <p>
              (source: Courtesy - Kulachi Hasraj Model School, Ashok Vihar, New
              Delhi
            </p>
            <p>
              COPING WITH STRESS ASSESSMENT: (option to type an answer) to get
              their own scores:
            </p>

            <CustomTable
              columns={[
                { id: "yes", label: "SELF ASSESSMENT" },
                { id: "non", label: "Mostly" },
                { id: "yes", label: "Sometimes" },
                { id: "yes", label: "Rarely" },
              ]}
              rows={[
                {
                  q: "I often share my experiences with my  parents and siblings",
                  yes: (
                    <input
                      type="radio"
                      value="yes"
                      style={{ cursor: "pointer" }}
                      checked={
                        depressionActivity[
                        "I often share my experiences with my  parents and siblings"
                        ] === "Mostly"
                      }
                      onChange={(e) =>
                        handleOptionChange(
                          "I often share my experiences with my  parents and siblings",
                          "Mostly"
                        )
                      }
                    />
                  ),
                  no: (
                    <input
                      type="radio"
                      value="no"
                      style={{ cursor: "pointer" }}
                      checked={
                        depressionActivity[
                        "I often share my experiences with my  parents and siblings"
                        ] === "Sometimes"
                      }
                      onChange={(e) =>
                        handleOptionChange(
                          "I often share my experiences with my  parents and siblings",
                          "Sometimes"
                        )
                      }
                    />
                  ),
                  noo: (
                    <input
                      type="radio"
                      value="no"
                      style={{ cursor: "pointer" }}
                      checked={
                        depressionActivity[
                        "I often share my experiences with my  parents and siblings"
                        ] === "Rarely"
                      }
                      onChange={(e) =>
                        handleOptionChange(
                          "I often share my experiences with my  parents and siblings",
                          "Rarely"
                        )
                      }
                    />
                  ),
                },
                {
                  q: "I generally get satisfactory marks in my examinations",
                  yes: (
                    <input
                      type="radio"
                      value="yes"
                      style={{ cursor: "pointer" }}
                      checked={
                        depressionActivity[
                        "I generally get satisfactory marks in my examinations"
                        ] === "Mostly"
                      }
                      onChange={(e) =>
                        handleOptionChange(
                          "I generally get satisfactory marks in my examinations",
                          "Mostly"
                        )
                      }
                    />
                  ),
                  no: (
                    <input
                      type="radio"
                      value="no"
                      style={{ cursor: "pointer" }}
                      checked={
                        depressionActivity[
                        "I generally get satisfactory marks in my examinations"
                        ] === "Sometimes"
                      }
                      onChange={(e) =>
                        handleOptionChange(
                          "I generally get satisfactory marks in my examinations",
                          "Sometimes"
                        )
                      }
                    />
                  ),
                  noo: (
                    <input
                      type="radio"
                      value="no"
                      style={{ cursor: "pointer" }}
                      checked={
                        depressionActivity[
                        "I generally get satisfactory marks in my examinations"
                        ] === "Rarely"
                      }
                      onChange={(e) =>
                        handleOptionChange(
                          "I generally get satisfactory marks in my examinations",
                          "Rarely"
                        )
                      }
                    />
                  ),
                },

                {
                  q: "Students of higher classes often bully me",
                  yes: (
                    <input
                      type="radio"
                      value="yes"
                      style={{ cursor: "pointer" }}
                      checked={
                        depressionActivity[
                        "Students of higher classes often bully me"
                        ] === "Mostly"
                      }
                      onChange={(e) =>
                        handleOptionChange(
                          "Students of higher classes often bully me",
                          "Mostly"
                        )
                      }
                    />
                  ),
                  no: (
                    <input
                      type="radio"
                      value="no"
                      style={{ cursor: "pointer" }}
                      checked={
                        depressionActivity[
                        "Students of higher classes often bully me"
                        ] === "Sometimes"
                      }
                      onChange={(e) =>
                        handleOptionChange(
                          "Students of higher classes often bully me",
                          "Sometimes"
                        )
                      }
                    />
                  ),
                  noo: (
                    <input
                      type="radio"
                      value="no"
                      style={{ cursor: "pointer" }}
                      checked={
                        depressionActivity[
                        "Students of higher classes often bully me"
                        ] === "Rarely"
                      }
                      onChange={(e) =>
                        handleOptionChange(
                          "Students of higher classes often bully me",
                          "Rarely"
                        )
                      }
                    />
                  ),
                },

                {
                  q: "I feel difficulty in controlling my anger",
                  yes: (
                    <input
                      type="radio"
                      value="yes"
                      style={{ cursor: "pointer" }}
                      checked={
                        depressionActivity[
                        "I feel difficulty in controlling my anger"
                        ] === "Mostly"
                      }
                      onChange={(e) =>
                        handleOptionChange(
                          "I feel difficulty in controlling my anger",
                          "Mostly"
                        )
                      }
                    />
                  ),
                  no: (
                    <input
                      type="radio"
                      value="no"
                      style={{ cursor: "pointer" }}
                      checked={
                        depressionActivity[
                        "I feel difficulty in controlling my anger"
                        ] === "Sometimes"
                      }
                      onChange={(e) =>
                        handleOptionChange(
                          "I feel difficulty in controlling my anger",
                          "Sometimes"
                        )
                      }
                    />
                  ),
                  noo: (
                    <input
                      type="radio"
                      value="no"
                      style={{ cursor: "pointer" }}
                      checked={
                        depressionActivity[
                        "I feel difficulty in controlling my anger"
                        ] === "Rarely"
                      }
                      onChange={(e) =>
                        handleOptionChange(
                          "I feel difficulty in controlling my anger",
                          "Rarely"
                        )
                      }
                    />
                  ),
                },

                {
                  q: "I easily break down in tears",
                  yes: (
                    <input
                      type="radio"
                      value="yes"
                      style={{ cursor: "pointer" }}
                      checked={
                        depressionActivity["I easily break down in tears"] ===
                        "Mostly"
                      }
                      onChange={(e) =>
                        handleOptionChange(
                          "I easily break down in tears",
                          "Mostly"
                        )
                      }
                    />
                  ),
                  no: (
                    <input
                      type="radio"
                      value="no"
                      style={{ cursor: "pointer" }}
                      checked={
                        depressionActivity["I easily break down in tears"] ===
                        "Sometimes"
                      }
                      onChange={(e) =>
                        handleOptionChange(
                          "I easily break down in tears",
                          "Sometimes"
                        )
                      }
                    />
                  ),
                  noo: (
                    <input
                      type="radio"
                      value="no"
                      style={{ cursor: "pointer" }}
                      checked={
                        depressionActivity["I easily break down in tears"] ===
                        "Rarely"
                      }
                      onChange={(e) =>
                        handleOptionChange(
                          "I easily break down in tears",
                          "Rarely"
                        )
                      }
                    />
                  ),
                },

                {
                  q: "I get upset when things do not go my way",
                  yes: (
                    <input
                      type="radio"
                      value="yes"
                      style={{ cursor: "pointer" }}
                      checked={
                        depressionActivity[
                        "I get upset when things do not go my way"
                        ] === "Mostly"
                      }
                      onChange={(e) =>
                        handleOptionChange(
                          "I get upset when things do not go my way",
                          "Mostly"
                        )
                      }
                    />
                  ),
                  no: (
                    <input
                      type="radio"
                      value="no"
                      style={{ cursor: "pointer" }}
                      checked={
                        depressionActivity[
                        "I get upset when things do not go my way"
                        ] === "Sometimes"
                      }
                      onChange={(e) =>
                        handleOptionChange(
                          "I get upset when things do not go my way",
                          "Sometimes"
                        )
                      }
                    />
                  ),
                  noo: (
                    <input
                      type="radio"
                      value="no"
                      style={{ cursor: "pointer" }}
                      checked={
                        depressionActivity[
                        "I get upset when things do not go my way"
                        ] === "Rarely"
                      }
                      onChange={(e) =>
                        handleOptionChange(
                          "I get upset when things do not go my way",
                          "Rarely"
                        )
                      }
                    />
                  ),
                },

                {
                  q: "I take help of relaxation techniques when stressed",
                  yes: (
                    <input
                      type="radio"
                      value="yes"
                      style={{ cursor: "pointer" }}
                      checked={
                        depressionActivity[
                        "I take help of relaxation techniques when stressed"
                        ] === "Mostly"
                      }
                      onChange={(e) =>
                        handleOptionChange(
                          "I take help of relaxation techniques when stressed",
                          "Mostly"
                        )
                      }
                    />
                  ),
                  no: (
                    <input
                      type="radio"
                      value="no"
                      style={{ cursor: "pointer" }}
                      checked={
                        depressionActivity[
                        "I take help of relaxation techniques when stressed"
                        ] === "Sometimes"
                      }
                      onChange={(e) =>
                        handleOptionChange(
                          "I take help of relaxation techniques when stressed",
                          "Sometimes"
                        )
                      }
                    />
                  ),
                  noo: (
                    <input
                      type="radio"
                      value="no"
                      style={{ cursor: "pointer" }}
                      checked={
                        depressionActivity[
                        "I take help of relaxation techniques when stressed"
                        ] === "Rarely"
                      }
                      onChange={(e) =>
                        handleOptionChange(
                          "I take help of relaxation techniques when stressed",
                          "Rarely"
                        )
                      }
                    />
                  ),
                },

                {
                  q: "I react without considering consequence when upset",
                  yes: (
                    <input
                      type="radio"
                      value="yes"
                      style={{ cursor: "pointer" }}
                      checked={
                        depressionActivity[
                        "I react without considering consequence when upset"
                        ] === "Mostly"
                      }
                      onChange={(e) =>
                        handleOptionChange(
                          "I react without considering consequence when upset",
                          "Mostly"
                        )
                      }
                    />
                  ),
                  no: (
                    <input
                      type="radio"
                      value="no"
                      style={{ cursor: "pointer" }}
                      checked={
                        depressionActivity[
                        "I react without considering consequence when upset"
                        ] === "Sometimes"
                      }
                      onChange={(e) =>
                        handleOptionChange(
                          "I react without considering consequence when upset",
                          "Sometimes"
                        )
                      }
                    />
                  ),
                  noo: (
                    <input
                      type="radio"
                      value="no"
                      style={{ cursor: "pointer" }}
                      checked={
                        depressionActivity[
                        "I react without considering consequence when upset"
                        ] === "Rarely"
                      }
                      onChange={(e) =>
                        handleOptionChange(
                          "I react without considering consequence when upset",
                          "Rarely"
                        )
                      }
                    />
                  ),
                },

                {
                  q: "I have a regular plan for things and I follow it",
                  yes: (
                    <input
                      type="radio"
                      value="yes"
                      style={{ cursor: "pointer" }}
                      checked={
                        depressionActivity[
                        "I have a regular plan for things and I follow it"
                        ] === "Mostly"
                      }
                      onChange={(e) =>
                        handleOptionChange(
                          "I have a regular plan for things and I follow it",
                          "Mostly"
                        )
                      }
                    />
                  ),
                  no: (
                    <input
                      type="radio"
                      value="no"
                      style={{ cursor: "pointer" }}
                      checked={
                        depressionActivity[
                        "I have a regular plan for things and I follow it"
                        ] === "Sometimes"
                      }
                      onChange={(e) =>
                        handleOptionChange(
                          "I have a regular plan for things and I follow it",
                          "Sometimes"
                        )
                      }
                    />
                  ),
                  noo: (
                    <input
                      type="radio"
                      value="no"
                      style={{ cursor: "pointer" }}
                      checked={
                        depressionActivity[
                        "I have a regular plan for things and I follow it"
                        ] === "Rarely"
                      }
                      onChange={(e) =>
                        handleOptionChange(
                          "I have a regular plan for things and I follow it",
                          "Rarely"
                        )
                      }
                    />
                  ),
                },

                {
                  q: "I work keeping the priority of the task in mind",
                  yes: (
                    <input
                      type="radio"
                      value="yes"
                      style={{ cursor: "pointer" }}
                      checked={
                        depressionActivity[
                        "I work keeping the priority of the task in mind"
                        ] === "Mostly"
                      }
                      onChange={(e) =>
                        handleOptionChange(
                          "I work keeping the priority of the task in mind",
                          "Mostly"
                        )
                      }
                    />
                  ),
                  no: (
                    <input
                      type="radio"
                      value="no"
                      style={{ cursor: "pointer" }}
                      checked={
                        depressionActivity[
                        "I work keeping the priority of the task in mind"
                        ] === "Sometimes"
                      }
                      onChange={(e) =>
                        handleOptionChange(
                          "I work keeping the priority of the task in mind",
                          "Sometimes"
                        )
                      }
                    />
                  ),
                  noo: (
                    <input
                      type="radio"
                      value="no"
                      style={{ cursor: "pointer" }}
                      checked={
                        depressionActivity[
                        "I work keeping the priority of the task in mind"
                        ] === "Rarely"
                      }
                      onChange={(e) =>
                        handleOptionChange(
                          "I work keeping the priority of the task in mind",
                          "Rarely"
                        )
                      }
                    />
                  ),
                },
              ]}
              className={"custom-table mt-3 mb-3"}
            />

            <p>
              <b>Note:</b>This is a self assessment scale, meant to be used only
              as an indicator. It can be administered to your self or to a peer
              to establish areas for further enhancement.{" "}
            </p>
            <p>
              <b>Note:</b>Your score in each column gives you an indication of
              your strengths as well as areas you can improve on. This scale
              will help you reflect and introspect so that you can work on
              enhancing your skill of Coping with Stress.
            </p>

            <h4 className="mt-3 mb-3 fw-bold"> Feedback</h4>
            {courseFeedbackData.map((data, i) => (
              <>
                <h5 className="mt-3">{data.title}</h5>
                <RadioOptions
                  selectedValue={data.selectedValue}
                  name={data.name}
                  data={data.radioLabels.labels}
                  onChange={handleAdolescentRadioChange}
                  qNo={data.qNo}
                />
              </>
            ))}
            <Button
              style={{
                backgroundColor: "rgb(255, 135, 118)",
                color: "white",
                border: "none",
                marginTop: "15px",
                padding: "9px 22px 9px 22px",
                width: "fit-content",
              }}
              id="submit"
              text="Submit"
              onClick={handleSubmit}
            />
          </form>
        </div>
      )}
      {isPostTestEnabled && (
        <>
          <PrePostTest
            testType={"POST-TEST"}
            testDetails={post_test_data}
            selectedValue={stress}
            onOptSelect={handlePostTestResults}
            onTestSubmit={enablePostTest}


            btnClass={`col-md-1 col-sm-3 p-2 fw-bold ${areAllFieldsFilled(
              stress
            )}`}
            moduleNo={1}
          />
        </>
      )}
    </>
  );
}
