import React, { useEffect, useState } from "react";
import Registration from "./registration/Registration";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [activeLoginType, setActiveLoginType] = useState(0);
  const loginTypes = ["User Registration"];

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("isUserLoggedIn")) === true) {
      navigate("/user-home");
    }
    if (JSON.parse(localStorage.getItem("isAdminLoggedIn")) === true) {
      navigate("/admin");
    }
  }, [navigate]);

  const handleTabEvent = (e) => {
    setActiveLoginType(loginTypes.indexOf(e.target.value));
  };

  return (
    <>
      <div style={{ fontSize: "large", textAlign: "right" }} className="col-md-12">
        <button
          style={{
            border: "none",
            backgroundColor: "white",
            color: "grey",
            textDecoration: "underline",
          }}
          onClick={() => navigate("/")}
        >
          Home
        </button>
      </div>

      <div className="col-md-6 mt-5" style={{ width: "100%", justifyContent: "center" }}>
        <ul style={{ display: "flex", justifyContent: "center" }}>
          {loginTypes.map((tabValue, tabIndex) => (
            <button
              key={tabValue}
              value={tabValue}
              onClick={handleTabEvent}
              className={tabIndex === activeLoginType ? "button-on-focus" : ""}
              style={{
                backgroundColor: activeLoginType === tabIndex ? "rgb(254, 136, 117)" : "white",
                color: activeLoginType === tabIndex ? "white" : "rgb(254, 136, 117)",
                cursor: "pointer",
                padding: "7px",
                borderRadius: "22px",
                border: "none",
                marginRight: "10px",
              }}
            >
              {tabValue}
            </button>
          ))}
        </ul>
      </div>

      <Registration type={loginTypes[activeLoginType]} />
    </>
  );
}
