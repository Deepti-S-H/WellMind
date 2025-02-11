import React from "react";
import "./Courses.css";
import course2 from "./../../images/2-stress-concept-illustration.png";
import course3 from "./../../images/3-student-stress-concept-illustration.png";
import course4 from "./../../images/4-anxiety-concept-illustration.png";
import course5 from "./../../images/5-fear-missing-out-concept-illustration.png";

export default function Courses() {
  const courseDetails = [
   
    {
      image: course2,
      title: "Stress and Adolescents",
      description:
        "Stress been a part of life, adolescents need to learn how to manage stress. This module will help the learner  in understanding the types of stress, impact of stress on health and how to cope with stress.",
    },
    {
      image: course3,
      title: "Academic Stress",
      description:
        "School is a place where adolescents spend most of their time. As identified academic learning contributes as a major source of stress among students. This module helps the learner in identifying the stressors and  coping styles that can be adopted in daily life.",
    },
    {
      image: course4,
      title: "Depression and Anxiety",
      description:
        "Depression and anxiety  are the leading cause of disability among the adolescents. They are prevalent among the age group 10-19 years. Adolescent’s  school attendance and school work are affected due to Anxiety and depressive disorders. Hence this module introduces the learner to basics of depression and anxiety, its symptoms and risk factors",
    },
    {
      image: course5,
      title: "Screen Use",
      description:
        "Social media play a vital role in adolescence phase as it helps them to connect and interact with their peers anytime. Exceeding the use of various platforms available on social media has impact on both mental and physical health of the adolescents. This module enables the learner to explore positive and negative impact of digital technology.",
    },  
    
  ];
  return (
    <div className="m-3 course-modules-main">
      <h2 className="about-videos-section-title">Courses</h2>
      <hr/>
      <div className="row" style={{ placeContent: "space-around" }}>
        {courseDetails.map((courseDetail, courseDetailIndex) => (
          <div
            className="about-videos-section p-1 col-md-5 m-2"
            key={courseDetailIndex}
          >
            <img
              src={courseDetail.image}
              className="img-fluid col-md-6"
              style={{ minHeight: "250px" }}
            />
            <div className="d-block col-md-6 p-2 moduleDetails">
            <p style={{color : "#a9311e"}}><b><u>{courseDetail.title}</u></b></p>
            <div className="col-md-12 course-description ">{courseDetail.description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
