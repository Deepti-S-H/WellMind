import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Layout.css";

export default function Layout(props) {
  const navigate = useNavigate();
  const [loginStatus, setLoginStatus] = useState(
    JSON.parse(localStorage.getItem("isUserLoggedIn"))
  );
  const urlPath = window.location.pathname;
  const pages = !(urlPath=="/login")? loginStatus
    ? urlPath == "/home" || urlPath == "/"
      ? [
        {
          title: "About",
          path: "About",
        },
        {
          title: "Modules",
          path: "/user-home",
        },
        
        {
          title:"Resources",
          path:"/user-home/additional-resources"
        },
      
    
        {
          title: "Logout",
          path: "/",
        },
      ]
      : [
        {
          title: "Home",
          path: "/home",
        },
        {
          title: "Activity Result",
          path: "/activity-results",
        },
        {
          title: "Logout",
          path: "/",
        },
      ]
    : [
      {
        title: "Home",
        path: "/",
      },
      {
        title: "Courses",
        path: "/user-home",
      },
      {
          title: "Activity Result",
          path: "/activity-results",
        },
     
    ]
    :
    [
      {
        title:"Home",
        path:"/"
      },
     
      {
        title: "Signup",
        path: "/signup",
      },
     
    ];


  useEffect(() => {
    if (JSON.parse(localStorage.getItem("isUserLoggedIn")) == false) {
      if (urlPath != "/" && urlPath != "/home") {
        navigate("/login");
      } else {
        navigate("/home");
      }
    }
  }, []);

  return (
    <>
      <nav
        class="navbar justify-content-right py-0 px-3"
        style={{
          backgroundColor: "#FFF",
          boxShadow: "0 0.5rem 1rem rgba(0,0,0,0.1",
          position: "sticky",
          top: 0,
          transition: "0.5s",
          zIndex: "1020",
        }}
      >
        <div
          class="navbar-brand"
          style={{ fontWeight: "bold", fontSize: "5vh", color: "rgb(254, 136, 117);" }}
        >
   Mind Enhancement
        </div>
        <div
          className={
            loginStatus == true
              ? urlPath == "/home" || urlPath == "/"
                ? "form-inline col-md-5 p-0"
                : "form-inline col-md-3 p-0"
              : "form-inline col-md-5 p-0"
          }
          style={{ justifyContent:urlPath=="/login"?"flex-end": "right", display: "flex" }}
        >
          <>
          {pages.map((element, i) =>
  ["About", "Courses"].indexOf(element.title) < 0 ? (
    <a
      onClick={() => {
        if (element.title === "Logout") {
          // Clear authentication-related data
          localStorage.clear();
          document.cookie.split(";").forEach(function (c) {
            document.cookie = c
              .replace(/^ +/, "")
              .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
          });
          // Redirect to the logout path
          navigate(element.path);
          
          // Reload the page if the current path is "/" or "/home"
          if (urlPath === "/" || urlPath === "/home") {
            window.location.reload();
          }
        } else {
          // For other links, just navigate to the specified path
          navigate(element.path);
        }
      }}
      style={{
        marginLeft: urlPath == "/login" ? "10px" : "0px"
      }}
      className={urlPath == "/login" ? "loginNavbardata" : "navbarData"}
    >
      {element.title}
    </a>
  ) : (
    // Use Link component here instead of <a>
    <Link to={element.path} className="navbarData" key={i}>
      {element.title}
    </Link>
  )
)}


          </>
        </div>
      </nav>
    </>
  );
}