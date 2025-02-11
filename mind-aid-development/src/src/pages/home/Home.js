import React, { useEffect } from "react";
// import Contact from "../contact/Contact";
import bannerImg from "../../images/mainbannerimg.png";
import Layout from "../layout/Layout";
import "./Home.css";
import Dialog from "../../components/dialogue/Dialog";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);

  const goToAboutVideos = () => {
    navigate("/about/videos");
  };

  const goToCourses = () => {
    navigate("/courses");
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
      setOpen(!open);
  }, []);

  return (
    <>
      <Layout />
      <div className="col-md-12 p-0" id="BannerMainDiv">
        <img
          className="col-md-12 p-0 mindAidImg"
          src={bannerImg}
          alt="Image"
        />
      </div>

      <div>
        <div className="col-md-10 mx-auto course-main-section bookmark-section" id="About">
          <div className="col p-0">
            <h2 className="course-title m-0" style={{ textAlign: "left" }}>
              About
            </h2>
            <hr />
          </div>
          <div className="col-md-12 p-0 mt-3 mb-3 d-flex" id="VideoActivityMainSection">
            <div className="aboutCourses col-md-12 mx-auto" style={{ textAlign: "left", textAlign: "justify" }}>
              <h5>Dear students,</h5>
              <p className="mt-4">
              Dear students,
              Welcome to Mind Enhancement, A website dedicated to adolescent mental health. Adolescence is a critical phase that has a significant impact on both the physical and social life of the individual. This is an interesting and formative time for the development of their future success. Our platform is dedicated to highlighting the importance of adolescent mental health through Life Skills Education and Psychoeducation.              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="pb-3" style={{ backgroundColor: "#f7f7f7" }}>
        <div className="col-md-10 mb-3 mx-auto course-main-section bookmark-section" id="Courses">
          <div className="col p-0">
            <h2 className="course-title m-0" style={{ textAlign: "left" }}>
              Courses
            </h2>
            <hr />
          </div>
          <div className="col-md-6 row mx-auto mt-3 mb-3 courses-div p-4">
            <button className="coursesBtn col-md-3 p-2" onClick={goToCourses}>
              Courses <i className="fa fa-arrow-right ms-2"></i>
            </button>
          </div>
        </div>
      </div>
      
      {/* <div id="Contact">
        <Contact />
      </div> */}

      {/* {open && (
        <Dialog handleClose={handleClose} open={open} title="Welcome!" content="To get started with our modules, please follow these steps:- Sign In: Ensure you are signed in to access the modules. About Page: Visit our About page to learn more about us and our mission. Courses: Explore the available courses. Happy Learning!" />
      )} */}
    </>
  );
}
