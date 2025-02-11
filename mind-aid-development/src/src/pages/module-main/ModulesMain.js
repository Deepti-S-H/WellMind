import React, { useEffect, useState, useRef } from "react";
import "./ModulesMain.css";
import ModuleHeader from "./modules-header/ModuleHeader";
import Layout from "../layout/Layout";
import Button from "../../components/button/Button";
import module2Img from "../../images/module2.png";
import module3Img from "../../images/module3.png";
import module4Img from "../../images/module4.png";
import module5Img from "../../images/module5.png";
import module6Img from "../../images/module6.png";
import module7Img from "../../images/module7.png";
import module8Img from "../../images/module8.png";
import module9Img from "../../images/module9.png";
import toastr from "toastr";
import { apiGetRequest } from "../../utils/Network";
import Dialog from "../../components/dialogue/Dialog";

export default function Modules(props) {
  toastr.options = {
    closeButton: true,
    positionClass: 'toast-top-right',
    preventDuplicates: true,
    timeOut: 3000,
  };

  const [open, setOpen] = React.useState(false);
  const [moduleStatus, setModuleStatus] = useState({
    message: [
      {
        name: "Module1",
        status: "in-progress",
      },
      {
        name: "Module2",
        status: "in-progress",
      },
      {
        name: "Module3",
        status: "in-progress",
      },
      {
        name: "Module4",
        status: "in-progress",
      },
      {
        name: "Module5",
        status: "in-progress",
      },
      {
        name: "Module6",
        status: "in-progress",
      },
      {
        name: "Module7",
        status: "in-progress",
      },
      {
        name: "Module8",
        status: "in-progress",
      },
      {
        name: "Module9",
        status: "in-progress",
      },
    ]
  });
  const count = useRef(0);


  const modules = [
    {
      id: "Module2",
      icon: module2Img,
    },
    {
      id: "Module3",
      icon: module3Img,
    },
    {
      id: "Module4",
      icon: module4Img,
    },
    {
      id: "Module5",
      icon: module5Img,
    },

  ]


  const apiCall = async () => {
    try {
      const api = "http://127.0.0.1:7700/all_module_status";

      const response = await apiGetRequest(api);
      if (response.data.allmodulestatus == true) {
        const moduleStatus = response.data;
        localStorage.setItem("all_module_status", JSON.stringify(moduleStatus.message))
        setModuleStatus(moduleStatus)

      }
      else {
        toastr.error(response.msg);
      }
    }
    catch {
      toastr.error("There is an internal error! Please logout and login.")
    }
  }


  const handleClose = () => {
    setOpen(false);
  };


  useEffect(() => {
    if (count.current === 0) {
      apiCall();
      count.current = count.current + 1;
    }
    setOpen(!open);

  }, [])

  const handleModuleSelection = async (routeTo) => {
    window.location.href = window.location.href + "/" + routeTo;
  };

  return (
    <>
      <Layout login={true} />
      <ModuleHeader />
      <div className="col-md-12 p-0">
        {!props.notDefault && (
          <div className="col-md-10 row mx-auto p-0 m-0">
            {modules.map((elements, i) => (
              <div className="col-md-4 py-4" style={{ textAlign: "center" }}>
                <div className="p-2 module-cards">
                  {moduleStatus.message[i]["status"] == "pending"
                    ?
                    <div
                      className="card-content-pending p-3"
                    >
                      <img
                        src={elements.icon}
                        alt="module 1"
                        className="img-fluid border border-black"
                        style={{ height: "250px" }}
                      />
                      <Button
                        onClick={handleModuleSelection}

                        id={elements.id}
                        text="Pending"
                        className={
                          "view-details-pending-btn mt-4 border border-dark"
                        }
                        style={{
                          border: "1px solid #198754",
                          padding: "7px 20px 7px 20px",
                          fontSize: "1.2 rem",
                          margin: "6px 0px 0px 0px",
                        }}
                      />
                    </div>
                    :
                    <div
                      className={
                        moduleStatus.message[i]["status"] ==
                          "completed"
                          ? "card-content-completed p-3"
                          : moduleStatus.message[i]["status"] ==
                            "in-progress"
                            ? "card-content-in-progress p-3"
                            : "card-content-yetToStart p-3"
                      }
                    >
                      <img
                        src={elements.icon}
                        alt="module 1"
                        className="img-fluid border border-black"
                        style={{ height: "250px" }}
                      />
                      <Button
                        onClick={handleModuleSelection}

                        id={elements.id}
                        text={
                          moduleStatus.message[i]["status"] ==
                            "completed"
                            ? "Completed"
                            : moduleStatus.message[i]["status"] ==
                              "in-progress"
                              ? "In-Progress"
                              : "Yet to start"
                        }
                        className={
                          moduleStatus.message[i]["status"] ==
                            "completed"
                            ? "view-details-completed-btn mt-4 border border-dark"
                            : moduleStatus.message[i]["status"] ==
                              "in-progress"
                              ? "view-details-in-progress-btn mt-4 border border-dark"
                              : "view-details-yetToStart-btn mt-4 border border-dark"
                        }
                        style={{
                          border: "1px solid #198754",
                          padding: "7px 20px 7px 20px",
                          fontSize: "1.2 rem",
                          margin: "6px 0px 0px 0px",
                        }}
                      />
                    </div>
                  }


                </div>
              </div>
            ))}
          </div>
          
        )
        
        }
        {/* {open &&!props.notDefault
          ?
          <Dialog handleClose={handleClose} open={open} title={'Dear Students,'} content={'There are 4 states for each module they are:- pending: it means you need to begin with the module. yet to start:  waiting for pervious module to be completed. in progress: it means you are exploring the module. completed: you can take up the next module. After completion of all the modules You can download the certificate!!'} />
          :
          (<></>)
        } */}

      </div>
    </>
  );
}
