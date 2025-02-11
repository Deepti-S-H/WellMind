import React, { useEffect, useState } from "react";
import ModulesMain from "../ModulesMain";
import RadioOptions from "./../../../components/radiogroup/RadioOptions";
import CustomTable from "../../../components/table/CustomTable";
import InputField from "./../../../components/input/InputField";
import CheckBox from "../../../components/checkbox/CheckBox";
import Feedback from "./../feedback/Feedback";
import PrePostTest from "../pre-post-test/PrePostTest";
import { areAllFieldsFilled } from "../../../utils/Tools";
import { useNavigate } from "react-router-dom";
import toastr from "toastr";
import { apiPostRequest } from "../../../utils/Network";
import "./Module.css";
import calculateUsedTime from "../../../utils/Tools";

export default function Module5() {
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
      const req_json = { "modulename": "module4", "modulenumber": 4 }
      const response = await apiPostRequest(api, req_json);
      if (response.data.success == true) {
        const dataToPass = response.data.message["modulestatus"];
        if (dataToPass.pretest === 'completed') {
          setActiveStep(2);
        }
        if (dataToPass.pretest === 'completed' && dataToPass.postTest === 'in-progress') {
          setActiveStep(3);
        }
        if (dataToPass.pretest === 'completed' && dataToPass.activity === 'completed') {
          setActiveStep(3)
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
    if (modulestatus[2].status === 'completed') {
      apiCall();
    } else {
      navigate('/user-home/activity')
    }
  }, []);


  const [preTestQnAnswers, setPreTestQnAnswers] = useState({
    q1: {
      ques: "Which of the following are commonly used portals for accessing digital media?",
      data: [
        {
          value: "Televisions and laptops",
          label: "Televisions and laptops",
        },
        {
          value: "Tablets and computers",
          label: "Tablets and computers",
        },
        {
          value: "Mobile phones, tablets, laptops, and computers",
          label: "Mobile phones, tablets, laptops, and computers",
        },
        {
          value: "Televisions, laptops, and mobile phones",
          label: "Televisions, laptops, and mobile phones",
        },
      ],
    },
    q2: {
      ques: "What percentage of mobile users in India use smartphones?",
      data: [
        {
          value: "36%",
          label: "36%",
        },
        {
          value: "60%",
          label: "60%",
        },
        {
          value: "76%",
          label: "76%",
        },
        {
          value: "95%",
          label: "95%",
        },
      ],
    },
    q3: {
      ques: "True or False: In developed countries, children have access to mobile phones by the age of 10",
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
    q4: {
      ques: "How many hours per day do adolescents spend on their phones?",
      data: [
        {
          value: "1-2 hours",
          label: "1-2 hours",
        },
        {
          value: "2-3 hours",
          label: "2-3 hours",
        },
        {
          value: "3-4 hours",
          label: "3-4 hours",
        },
        {
          value: "4-5 hours",
          label: "4-5 hours",
        },
      ],
    },
  });
  const [feedback, setFeedback] = useState({
    q1: "",
    q2: "",
    q3: "",
    q4: "",
    q5: "",
  });
  const [preTestResults, setPreTestResults] = useState({
    q1: "",
    q2: "",
    q3: "",
    q4: "",
  });
  const [postTestResults, setPostTestResults] = useState({
    q1: "",
    q2: "",
    q3: "",
    q4: "",
  });
  const [activeStep, setActiveStep] = useState(1);
  const [pageContent, setPageContent] = useState({
    page2: {
      title: "INTRODUCTION",
      subtitle: "Healthy use of digital technology for children and adolescent",
      content: [
        "Digital technology use is spread far and wide.",
        "The commonly used portals for accessing digital media are hand-held mobile devices (mobile phones, tablets), laptops and computers, & televisions.",
        "Of these, mobile phones are now a common commodity in most households owing to their easy portability and affordable costs.",
        "In India, there are at least 800 million mobile users of which 36% use smart-phones.",
      ],
    },
    page3: {
      title: "Current trends of mobile phone usage in adolescents",
      content: [
        "In developed countries, children have access to mobile phones by 10 years age and about 60% own a mobile phone handset by 13 years.",
        "Adolescents spend 3-4 hours per day on their phone, of which at least 2 hours is spent on social media apps.",
        "In India, 95% of Indian children live in a household with mobile phones and at least 76% of children in the range of 7-11 years have access to mobile phones.",
      ],
    },
    page4: {
      title: "Activity : agree / disagree",
      content: [
        {
          title: "Does T.V./computer/Internet affect studies of students?",
          options: [
            {
              value: "Agree",
              label: "Agree",
            },
            {
              value: "Disagree",
              label: "Disagree",
            },
          ],
          selectedValue: "",
        },
        {
          title:
            "Do you think that T.V./computer/Internet should be watched at a specified time only by students?",
          options: [
            {
              value: "Agree",
              label: "Agree",
            },
            {
              value: "Disagree",
              label: "Disagree",
            },
          ],
          selectedValue: "",
        },
        {
          title:
            "Is it important to watch T.V./computer or browse Internet every day?",
          options: [
            {
              value: "Agree",
              label: "Agree",
            },
            {
              value: "Disagree",
              label: "Disagree",
            },
          ],
          selectedValue: "",
        },
        {
          title:
            "Should T.V./computer/Internet be used only for information and knowledge, example news?",
          options: [
            {
              value: "Agree",
              label: "Agree",
            },
            {
              value: "Disagree",
              label: "Disagree",
            },
          ],
          selectedValue: "",
        },
        {
          title: "T.V./computer/Internet promote violence",
          options: [
            {
              value: "Agree",
              label: "Agree",
            },
            {
              value: "Disagree",
              label: "Disagree",
            },
          ],
          selectedValue: "",
        },
        {
          title:
            "Students watch anything and everything that is available on the T.V./computer/Internet",
          options: [
            {
              value: "Agree",
              label: "Agree",
            },
            {
              value: "Disagree",
              label: "Disagree",
            },
          ],
          selectedValue: "",
        },
        {
          title:
            "T.V. and Internet websites like Facebook, Twitter, Games have spoiled youngsters, especially students",
          options: [
            {
              value: "Agree",
              label: "Agree",
            },
            {
              value: "Disagree",
              label: "Disagree",
            },
          ],
          selectedValue: "",
        },
        {
          title: "T.V./computer/Internet should be banned",
          options: [
            {
              value: "Agree",
              label: "Agree",
            },
            {
              value: "Disagree",
              label: "Disagree",
            },
          ],
          selectedValue: "",
        },
        {
          title: "T.V./computer/Internet improve knowledge/information",
          options: [
            {
              value: "Agree",
              label: "Agree",
            },
            {
              value: "Disagree",
              label: "Disagree",
            },
          ],
          selectedValue: "",
        },
        {
          title:
            "T.V./computer/Internet is able to provide entertainment/information at low cost",
          options: [
            {
              value: "Agree",
              label: "Agree",
            },
            {
              value: "Disagree",
              label: "Disagree",
            },
          ],
          selectedValue: "",
        },
        {
          title: "T.V./computer/Internet improve motivation and creativity",
          options: [
            {
              value: "Agree",
              label: "Agree",
            },
            {
              value: "Disagree",
              label: "Disagree",
            },
          ],
          selectedValue: "",
        },
        {
          title:
            "T.V./computer can change outlook towards an event, product, person, act by repeatedly showing it",
          options: [
            {
              value: "Agree",
              label: "Agree",
            },
            {
              value: "Disagree",
              label: "Disagree",
            },
          ],
          selectedValue: "",
        },
      ],
    },
    page5: {
      title: "Negative and positive impact of digital technology",
      subtitle: "Comparison table",
      content: {
        rowContent: [
          {
            "sl.no": "1",
            posImp:
              "Tool for communication: Easy to talk with family, friends. Helps in social interaction",
            negImp:
              "Higher risk for negative effects of overuse or unsupervised use of TV, internet and mobile phone",
          },
          {
            "sl.no": "2",
            posImp:
              "A platform to make new friends, overcome social rejection and anxiety related to interacting with strangers.",
            negImp:
              "It can affect both physical and mental health of children: a): cause problems in relations with family members (frequent fights, isolation) b): peers (lack of real friends, poor socialization in real world), C) :  school (lack of concentration, poor grade).",
          },
          {
            "sl.no": "3",
            posImp:
              "It can increase confidence in some individuals due to the perceived anonymity of their identities",
            negImp:
              "Digital technology has also led to new styles of crime, like kidnapping, online theft through online banking etc.",
          },
          {
            "sl.no": "4",
            posImp:
              "Many educational apps and videos have made it simpler for students to understand basic concepts and find useful information especially for practical work and projects",
            negImp: "Affects reading and writing habits ",
          },
        ],
        columnContent: [
          { id: "sl.no", label: "SL.NO" },
          { id: "posImp", label: "Positive impacts of digital technology" },
          { id: "negImp", label: "Negative impact of digital technology " },
        ],
        activity: {
          5.1: {
            content: [
              {
                id: 1,
                question:
                  "Activity :  Tick mark answers that reflect positive impact of technology:",
                options: [
                  {
                    id: "High risk of overuse of mobile phone/ internet addiction",
                    label:
                      "High risk of overuse of mobile phone/ internet addiction",
                  },
                  { id: "Can make new friends", label: "Can make new friends" },
                  {
                    id: "Educational apps provides basic information",
                    label: "Educational apps provides basic information",
                  },
                  {
                    id: "Online crimes: bank theft",
                    label: "Online crimes: bank theft",
                  },
                ],
              },
            ],
            selectedValue: [],
          },
          options: [
            {
              label:
                "1.High risk of overuse of mobile phone/ internet addiction",
              selected: false,
            },
            {
              label: "2.Can make new friends",
              selected: false,
            },
            {
              label: "3.Educational apps provides basic information",
              selected: false,
            },
            {
              label: "4.Online crimes: bank theft",
              selected: false,
            },
          ],
        },
      },
    },
    page6: {
      title: "Physical  health related risks",
      content: [
        "Back and neck stiffness due to constant stooping position",
        "Wrist and finger pain due to constant usage",
        "Eye problems: pain, feeling of heaviness, dry eyes",
        "Hearing problems- mild to moderate hearing impairment if used continuously for more than 2 hours for voice calls, music",
        "Lack of physical activities, obesity",
        "Sleep disturbances - late to bed",
      ],
    },
    page8: {
      title: "My HERO",
      content: {
        activity: {
          1: "Movie( mandate to fill):",
          options: [
            {
              title: "Name your favourite movie : ",
              value: "",
            },
            {
              title: "What you liked about it ?",
              value: "",
            },
            {
              title: "What did you learn from that movie ?",
              value: "",
            },
          ],
        },
      },
    },
    page9: {
      title: "Assignment : Reflect on following Questions. Answer: yes or no",
      content: {
        columnContent: [
          { id: "sl.no", label: "Sl.No" },
          { id: "questions", label: "Questions" },
          { id: "answers", label: "Answers" },
        ],
        rowContent: [
          {
            "sl.no": 1,
            questions: "Do movies reflect real life?",
            answers: "",
          },
          {
            "sl.no": 2,
            questions: "Are movies socially needed?",
            answers: "",
          },
          {
            "sl.no": 3,
            questions: "Is  there any negative effects of movies in society?",
            answers: "",
          },
          {
            "sl.no": 4,
            questions: "Is there any positive effects of movies in society? ",
            answers: "",
          },
          {
            "sl.no": 5,
            questions:
              "Do you think that adolescents understand that movies are only fantasy?",
            answers: "",
          },
          {
            "sl.no": 6,
            questions: "Do movies influence the viewers?",
            answers: "",
          },
        ],
      },
    },
  });

  const [radioOptions, setRadioOptions] = useState([]);
  const [module5, setModule5] = useState([]);


  const onAgreeDisagreePage4 = (event, itemIndex) => {
    const updatedPageContent = { ...pageContent };
    const updatedContent = [...updatedPageContent.page4.content];
    const updatedItemData = {
      ...radioOptions,
      [event.target.name]: event.target.defaultValue,
    };

    setRadioOptions(updatedItemData);
    updatedContent[itemIndex - 1].selectedValue = event.target.value;

    updatedPageContent.page4.content = updatedContent;
    setPageContent(updatedPageContent);
  };


  const onMovieActivityChange = (event) => {
    const updatedPageContent = { ...pageContent };
    const updatedContent = { ...updatedPageContent.page8.content.activity };
    updatedContent.options[event.target.id].value = event.target.value;
    updatedPageContent.page8.content.activity = updatedContent;
    const movieActivityChange = {
      ...radioOptions,
      [updatedPageContent.page8.content.activity.options[0].title]: updatedPageContent.page8.content.activity.options[0].value,
      [updatedPageContent.page8.content.activity.options[1].title]: updatedPageContent.page8.content.activity.options[1].value,
      [updatedPageContent.page8.content.activity.options[2].title]: updatedPageContent.page8.content.activity.options[2].value

    }
    setRadioOptions(movieActivityChange);
    setPageContent(updatedPageContent);
  };

  const onPosImpSelection = (selectedOption) => {
    const updatedPageContent = { ...pageContent };

    const updatedContent = [
      ...updatedPageContent.page5.content.activity["5.1"].selectedValue,
    ];
    if (updatedContent.length) {
      let optionIndex = updatedContent.indexOf(selectedOption);
      optionIndex >= 0
        ? updatedContent.splice(optionIndex, 1)
        : updatedContent.push(selectedOption);
    } else {
      updatedContent.push(selectedOption);
    }
    updatedPageContent.page5.content.activity["5.1"].selectedValue =
      updatedContent;

    const updatedSelectedOption = {
      ...radioOptions,
      "Positive Impact of Technology": updatedContent
    }
    setRadioOptions(updatedSelectedOption);
    setPageContent(updatedPageContent);
  };

  const onPg9ActivityAssessChange = (event, index) => {
    const updatedPageContent = { ...pageContent };
    const updatedContent = updatedPageContent["page9"].content.rowContent;
    updatedContent[index - 1].answers = event.target.value;
    updatedPageContent["page9"].content.rowContent = updatedContent;
    const activityAssessChange = {
      ...radioOptions,
      [updatedContent[0].questions]: updatedContent[0].answers,
      [updatedContent[1].questions]: updatedContent[1].answers,
      [updatedContent[2].questions]: updatedContent[2].answers,
      [updatedContent[3].questions]: updatedContent[3].answers,
      [updatedContent[4].questions]: updatedContent[4].answers,
      [updatedContent[5].questions]: updatedContent[5].answers,
    };
    setRadioOptions(activityAssessChange);
    setPageContent(updatedPageContent);
  };

  const onModuleFeedbackChange = (event, questionNumber) => {
    setFeedback((prevState) => ({
      ...prevState,
      [questionNumber]: event.target.value,
    }));


  };




  const onModule5Submit = async () => {
    setActiveStep(3);
    try {
      let api = "http://127.0.0.1:7700/ModuleFunction";

      let req_json = {
        "modulename": "module4",
        "testtype": "activity",
        "moduleData": {
          radioOptions,
          "How easy was it to go through course pages?": feedback.q1,
          "Was the module organized and structured properly?": feedback.q2,
          "Did the module increased your knowledge and skills in the subject matter?": feedback.q3,
          "How helpful did you find the module?": feedback.q4,
          "Rate your overall experience of the Module": feedback.q5

        }
      }
      const response = await apiPostRequest(api, req_json);
    }
    catch {
      toastr.error("There is an internal error! Please logout and login.")
    }
  };

  const handlePreTestResults = (event, questionNumber) => {
    setPreTestResults((prevState) => ({
      ...prevState,
      [questionNumber]: event.target.value,
    }));
  };

  const onModule5PreTestSubmit = async () => {
    setActiveStep(2);
    const currentTime = localStorage.getItem("currentTime");
    try {
      let api = "http://127.0.0.1:7700/ModuleFunction";

      let req_json = {
        "modulename": "module4",
        "testtype": "pretest",
        "moduleDataPretest": {
          "Which of the following are commonly used portals for accessing digital media?": preTestResults.q1,
          "What percentage of mobile users in India use smartphones?": preTestResults.q2,
          "True or False: In developed countries, children have access to mobile phones by the age of 10": preTestResults.q3,
          "How many hours per day do adolescents spend on their phones?": preTestResults.q4,

        },
        "currentTime": currentTime
      }
      const response = await apiPostRequest(api, req_json);
    }
    catch {
      toastr.error("There is an internal error! Please logout and login.")
    }
  };

  const handlePostTestResults = (event, questionNumber) => {
    setPostTestResults((prevState) => ({
      ...prevState,
      [questionNumber]: event.target.value,
    }));
    setModule5([
      {
        "Which of the following are commonly used portals for accessing digital media?": preTestResults.q1,
        "What percentage of mobile users in India use smartphones?": preTestResults.q2,
        "True or False: In developed countries, children have access to mobile phones by the age of 10": preTestResults.q3,
        "How many hours per day do adolescents spend on their phones?": preTestResults.q4,

      },

      {
        "Which of the following are commonly used portals for accessing digital media?": postTestResults.q1,
        "What percentage of mobile users in India use smartphones?": postTestResults.q2,
        "True or False: In developed countries, children have access to mobile phones by the age of 10": postTestResults.q3,
        "How many hours per day do adolescents spend on their phones?": postTestResults.q4,
      }
    ]);
  };

  const onModule5PostTestSubmit = async () => {
    calculateUsedTime();
    const endTime = localStorage.getItem("currentTime");
    setActiveStep(1);
    try {

      let api = "http://127.0.0.1:7700/ModuleFunction";

      let req_json = {
        "modulename": "module4",
        "testtype": "posttest",
        "moduleData": {
          "Which of the following are commonly used portals for accessing digital media?": postTestResults.q1,
          "What percentage of mobile users in India use smartphones?": postTestResults.q2,
          "True or False: In developed countries, children have access to mobile phones by the age of 10": postTestResults.q3,
          "How many hours per day do adolescents spend on their phones?": postTestResults.q4,
        },
        "endTime": endTime
      }
      const response = await apiPostRequest(api, req_json);
      if (response.data.success === true) {
        navigate('/activity-results');
      }
    }
    catch {
      toastr.error("There is an internal error! Please logout and login.")
    }
  };

  return (
    <>
      <ModulesMain notDefault={true} />
      {activeStep == 1 && (
        <PrePostTest
          testType={"PRE-TEST"}
          testDetails={preTestQnAnswers}
          selectedValue={preTestResults}
          onOptSelect={handlePreTestResults}
          onTestSubmit={onModule5PreTestSubmit}
          btnClass={`col-md-1 col-sm-3 p-2 fw-bold ${areAllFieldsFilled(
            preTestResults
          )}`}
          moduleNo={5}
        />
      )}
      {activeStep == 2 && (
        <div className="text-start module4-main-secton py-4 px-5">
          <h1 className="mb-3">
            MODULE 5: Screen Use/Social Media And Addiction
          </h1>
          <div className="mt-3">
            <h4>
              <b> Is binge watching bad for you?</b>
            </h4>
            <p>
              Video:{" "}
              <a href="https://www.youtube.com/watch?v=KJRzgl0FuMA" target="blank">
                click here to watch
              </a>
            </p>
            <h4>
              <b> {pageContent["page2"].title}</b>
            </h4>
            <h5 className="mt-2">{pageContent["page2"].subtitle + ":"}</h5>
            <ul>
              {pageContent["page2"].content.map((item, itemIndex) => (
                <li key={itemIndex}>{item}</li>
              ))}
            </ul>
            <h4>
              <b> {pageContent["page3"].title}</b>
            </h4>
            <ul>
              {pageContent["page3"].content.map((item, itemIndex) => (
                <li key={itemIndex}>{item}</li>
              ))}
            </ul>
            <h4>
              <b> {pageContent["page4"].title}</b>
            </h4>
            <ol>
              {pageContent["page4"].content.map((item, itemIndex) => (
                <>
                  <li key={itemIndex}>{item.title}</li>
                  <RadioOptions
                    selectedValue={item.selectedValue}
                    name={item.title}
                    onChange={onAgreeDisagreePage4}
                    data={item.options}
                    qNo={itemIndex + 1}
                  />
                </>
              ))}
            </ol>
            <h4>
              <b> {pageContent["page5"].title}</b>
            </h4>
            <h5>{pageContent["page5"].subtitle}</h5>
            <CustomTable
              columns={pageContent["page5"].content.columnContent}
              rows={pageContent["page5"].content.rowContent}
              className={"w-100 customtable"}
            />
            <CheckBox
              module={5}
              qnNumber={"5.1"}
              questions={pageContent["page5"].content.activity["5.1"].content}
              func={onPosImpSelection}
              answers={
                pageContent["page5"].content.activity["5.1"].selectedValue
              }
              labelclass={"py-2 px-4"}
            />
            <h4 className="mt-3">
              <b> {pageContent["page6"].title}</b>
            </h4>
            <ul>
              {pageContent["page6"].content.map((item, itemIndex) => (
                <li key={itemIndex}>{item}</li>
              ))}
            </ul>
            <h4>
              <b>
                Video watching : 1.What causes insomnia? - Dan Kwartler
              </b>
            </h4>
            <p>
              Video:{" "}
              <a href="https://www.youtube.com/watch?v=j5Sl8LyI7k8" target="blank">
                click here to watch
              </a>
            </p>
            <h4>
              <b> {pageContent["page8"].title}</b>
            </h4>
            <h5>{pageContent["page8"].content.activity[1]}</h5>
            <ol>
              {pageContent["page8"].content.activity.options.map(
                (item, itemIndex) => (
                  <span className="d-flex col-md-12 mb-1">
                    <li className="col-md-3" key={itemIndex}>
                      {item.title}
                    </li>
                    <InputField
                      type="text"
                      id={itemIndex}
                      value={item.value}
                      onChange={onMovieActivityChange}
                    />
                  </span>
                )
              )}
            </ol>
            <h4>
              <b> {pageContent["page9"].title}</b>
            </h4>
            <CustomTable
              columns={pageContent["page9"].content.columnContent}
              rows={pageContent["page9"].content.rowContent}
              className={"customtablem5 w-50 mt-3"}
              RadioOpt={[
                {
                  value: "Yes",
                  label: "Yes",
                },
                {
                  value: "No",
                  label: "No",
                },
              ]}
              onselectionchange={onPg9ActivityAssessChange}
              RadioCol={"answers"}
            />
            <h4>
              <b> Feedback</b>
            </h4>
            <Feedback
              selectedValue={feedback}
              onOptSelect={onModuleFeedbackChange}
              onSubmit={onModule5Submit}
            />
          </div>
        </div>
      )}
      {activeStep == 3 && (
        <PrePostTest
          testType={"POST-TEST"}
          testDetails={preTestQnAnswers}
          selectedValue={postTestResults}
          onOptSelect={handlePostTestResults}
          onTestSubmit={onModule5PostTestSubmit}
          btnClass={`col-md-1 col-sm-3 p-2 fw-bold ${areAllFieldsFilled(
            postTestResults
          )}`}
          moduleNo={4}
        />
      )}
    </>
  );
}
