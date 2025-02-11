import React, { useEffect, useState } from "react";
import Layout from "../layout/Layout";
import ModuleHeader from "../module-main/modules-header/ModuleHeader";
// import Contact from "../contact/Contact";
import "./UserHome.css";
import { useNavigate } from "react-router-dom";
import Dialog from "../../components/dialogue/Dialog";
import { apiGetRequest } from "../../utils/Network";
import toastr from "toastr";

export default function UserHome() {
  const navigate = useNavigate();
  const userHomeCardDetails = [
    {
      title: "Modules",
      desc: "Contemparory issues identification : The Pre-test and Post-Test in all the modules are compulsary to attend",
      icon: "fa-solid fa-3x fa-list-check user-home-card-icon",
      className: "user-home-card-section",
      titleClass: "user-home-card-title mt-3 font-weight-bold fs-4",
      descClass: "user-home-card-desc",
      routeTo: "/activity",
    },
  ];

  const [authStatus, setAuthStatus] = useState(JSON.parse(localStorage.getItem("isUserLoggedIn")));
  const [open, setOpen] = React.useState(false);

  const routePage = (routeTo) => {
    window.location.href = window.location.href + routeTo;
  };


  const handleClose = () => {
    setOpen(false);
  };

  const apiCall = async () => {
    try {
      const api = "http://127.0.0.1:7700/all_module_status";

      const response = await apiGetRequest(api);
      if (response.data.allmodulestatus == true) {
        const moduleStatus = response.data;
        localStorage.setItem("all_module_status", JSON.stringify(moduleStatus.message))
        
      }
      else {
        toastr.error(response.msg);
      }
    }
    catch {
      toastr.error("There is an internal error! Please logout and login.")
    }
  }


  useEffect(() => {
    apiCall();
    if (authStatus == false) {
      navigate("/login");

    }

    if (!localStorage.getItem('popupShown')) {
      setOpen(!open);
      localStorage.setItem('popupShown', 'true');
    }
  }, []);

  return (
    <>
      <Layout />
      <ModuleHeader />
      <div className="col-md-12 user-home-main-content">
        <div className="col-md-5 user-home-main-content-section row p-4">
          {userHomeCardDetails.map((eachEle, eleId) => (
            <div
              key={eleId}
              className="col ms-3 user-home-card-section"
              style={{
                animation: `slideUp 1s ease forwards ${eleId * 0.3}s`,
              }}
              onClick={(ele) => routePage(eachEle.routeTo)}
            >
              <i class={eachEle.icon}></i>
              <p className={eachEle.titleClass}>{eachEle.title}</p>
              <p className={eachEle.descClass}>{eachEle.desc}</p>
            </div>
          ))}
        </div>
      </div>
      {/* <Contact /> */}
      {/* {open
        ?
        <Dialog handleClose={handleClose} open={open} title={'Dear Students,'} content={'Explore the about and introduction to courses page in "home tab" to have basic understanding of the modules. Go to Module page: complete the pre-test, other activities  and post test. On completion of all 9 modules you will receive a certificate of completion. For any doubts kindly contact: Shivani Haritay , 8618385095.'} />
        :
        (<></>)
      } */}
    </>
  );
}
