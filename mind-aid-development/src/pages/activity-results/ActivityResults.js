import React, { createRef, useEffect, useState } from "react";
import { isDataArray, typeOfData } from "../../utils/Tools";
import Layout from "../layout/Layout";
import ModuleHeader from "../module-main/modules-header/ModuleHeader";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import "./ActivityResults.css";
import { useParams } from 'react-router-dom';
import * as imports from "../../Imports";
import toastr from "toastr";
import { apiGetRequest, apiPostRequest } from "../../utils/Network";
import Dialog from "../../components/dialogue/Dialog";
import { all } from "axios";
import Loader from "../../components/loader/Loader";


const modules = [
    { modulename: "Module1", num: 20 },
    { modulename: "Module2", num: 30 },
    { modulename: "Module3", num: 40 },
    { modulename: "Module4", num: 50 },
];

export default function ActivityResults() {
    const [resultData, setResultData] = useState(null);
    const [showPopup, setPopup] = useState(false);
    const [open, setOpen] = useState(false);
    const [feedback, setFeedback] = useState(false);
    const [certificate, setCertificate] = useState(false);
    const [mlResult, setMlResult] = useState(false);
    const [btnDisable, setBtnDisable] = useState(true);
    const [loader, setLoader] = React.useState(false);

    const handleClose = () => {
        setOpen(false);
        setPopup(false);
        setCertificate(false);
        setFeedback(false);
    };

    const apiCall = async () => {
        const api = "http://127.0.0.1:7700/user_list";
        setLoader(true);
        try {
            const response = await apiGetRequest(api);
            if (localStorage.getItem("feedback") === "true") {
                setFeedback(true);
            }
    
            if (response.data.success) {
                const message = response.data.message;
                const tempGuideline = message.filter((data) => data.hasOwnProperty('guideline'));
                const tempFeedback = message.filter((data) => data.hasOwnProperty('feedback'));
                const tempCertificate = message.filter((data) => data.hasOwnProperty('certificate_downloaded'));
    
                // Determine which popups to show
                if (tempGuideline.length === 0) {
                    setPopup(true);
                    setOpen(true);
                } else if (tempFeedback.length === 0) {
                    setFeedback(true);
                } else if (tempCertificate.length === 0) {
                    setCertificate(true);
                }
            } else {
                toastr.error("Failed to fetch student list");
            }
        } catch (error) {
            console.error("Error in apiCall:", error);
            toastr.error("An error occurred while fetching the student list");
        } finally {
            setLoader(false);
        }
    };
    
    
    
    
    

    
    const allStatusAPICall = async () => {
        try {
            const api = "http://127.0.0.1:7700/all_module_status";
            setLoader(true);
            const response = await apiGetRequest(api);
            if (response.data.allmodulestatus) {
                const moduleStatus = response.data;
                console.log("all module status",moduleStatus.message[3].status==="completed");
                if(moduleStatus.message[3].status==="completed"){
                    setBtnDisable(false);
                }
                localStorage.setItem("all_module_status", JSON.stringify(moduleStatus.message));
            setLoader(false);
            } else {
                toastr.error(response.msg);
            }
        } catch (error) {
            console.error("Error in allStatusAPICall:", error);
            toastr.error("There is an internal error! Please logout and login.");
        }
    };
    
    useEffect(() => {
        const fetchData = async () => {
            await allStatusAPICall();
    
            const modulestatus = JSON.parse(localStorage.getItem("all_module_status"));
            if (modulestatus && modulestatus[8].status === 'completed') {
                await apiCall();
            }
        };
    
        fetchData();
    
        // Optionally, set a timeout for the loader
        const loaderTimeout = setTimeout(() => {
            setLoader(false);
        }, 1000); // Adjust the duration as needed
    
        return () => clearTimeout(loaderTimeout); // Clean up the timeout on component unmount
    }, []);
    

    const tabList = ['moduleDataPretest', 'moduleDataactivity', 'moduleDataposttest'];
    const [selectedModule, setSelectedModule] = useState('');

    const handleChange = async (e) => {
        try {
            let api = "http://127.0.0.1:7700/resultscreen";

            setSelectedModule(e.target.value);
            const selectedModuleVal = modules.find((module) => module.num === e.target.value);
            const lowerselectedModuleVal = selectedModuleVal.modulename.toLowerCase();
            let req_json = { "selectedModule": lowerselectedModuleVal };

            const response = await apiPostRequest(api, req_json);
            if (response.data.success === true) {
                const moduleData = response.data.moduleData;
                console.log("moduleData",moduleData);
                const parsedModuleData = JSON.parse(moduleData);

                setResultData(parsedModuleData);
            } else {
                setResultData(null);
                toastr.error(response.data.moduleData);
            }

        } catch (error) {
            console.error("Error in handleChange:", error);
        }
    };

    const renderData = (data) => {
        if (typeOfData(data) === 'string') {
            return data;
        } else if (isDataArray(data)) {
            return (
                <ul>
                    {data.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            );
        } else if (typeof data === 'object') {
            return (
                <ul>
                    {Object.keys(data).map((key, index) => (
                        <li key={index}>
                            <strong>{key}:</strong> {renderData(data[key])}
                        </li>
                    ))}
                </ul>
            );
        } else {
            return null;
        }
    };

    const renderQuestions = (questions) => {
        return (
            <>
                {Object.keys(questions).map((eachQue, qIndex) => (
                    <div key={qIndex}>
                        <h5>Q{qIndex + 1}: {eachQue}</h5>
                        <p>Ans: {renderData(questions[eachQue])}</p>
                    </div>
                ))}
            </>
        );
    };

    const getTabDisplayName = (tab) => {
        switch (tab) {
            case 'moduleDataPretest':
                return 'Pre-Test';
            case 'moduleDataactivity':
                return 'Activity';
            case 'moduleDataposttest':
                return 'Post-Test';
            default:
                return tab.charAt(0).toUpperCase() + tab.slice(1);
        }
    };

    const handleMlResult = async(event)=>{
            try {
                event.preventDefault();
                const api = "http://127.0.0.1:7700/ml_trained_model_res";
                const response = await fetch(api);
                if (!response.ok) {
                    // localStorage.setItem("certificate", false)
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const blob = await response.blob();
                const url = URL.createObjectURL(blob);
                setMlResult(true);
                const imageElement = document.getElementById("image-container");
                imageElement.src = url;
                // localStorage.setItem("certificate", true);
// cerificate_state_store();

                // const link = document.createElement('a');
                // link.href = url;
                // link.download = 'edited_certificate.jpg';
                // document.body.appendChild(link);
                // link.click();
                // document.body.removeChild(link);
                // localStorage.setItem("certificate", true)
                // cerificate_state_store()
                // navigate("/activity-results");
                // handleClose();
    
    
    
            } catch (error) {
    
                console.error("Error:", error);
    
                toastr.error("An error occurred while processing your request");
    
            }

    
    
    }

    

    return (
        <>
        {loader&&<Loader/>}
            <Layout login={true} />
            <ModuleHeader />
            <imports.Grid className="col-md-5 m-5" md={12} container style={{textAlignLast:"start", alignSelf:"center"}}>
                <imports.Grid item md={6}>
                <imports.Box sx={{ minWidth: 120 }}>
                    <imports.FormControl fullWidth>
                        <imports.InputLabel id="demo-simple-select-label">Modules</imports.InputLabel>
                        <imports.Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={selectedModule}
                            label="Modules"
                            onChange={handleChange}
                        >
                            {modules.map((item, i) => (
                                <imports.MenuItem key={i} value={item.num}>{item.modulename}</imports.MenuItem>
                            ))}
                        </imports.Select>
                    </imports.FormControl>
                </imports.Box>
                </imports.Grid>
                <imports.Grid item md={6} style={{alignSelf:"center"}}>
                 {btnDisable?
                <imports.Tooltip title="The total analytics result will be available only after all module tests are completed.">
                <button 
                type="button" 
                onClick={handleMlResult}
                class="btn btn-primary btn-sm" 
                style={{marginLeft:"12px", cursor:"pointer"}} disabled={btnDisable} >Analytics Result</button>
                </imports.Tooltip>
                :
                <button 
                type="button" 
                onClick={handleMlResult}
                class="btn btn-primary btn-sm" 
                style={{marginLeft:"12px", cursor:"pointer"}} >Analytics Result</button>
                }
</imports.Grid>
            </imports.Grid>
            <div className="col-md-12 mx-auto py-4 px-5 activity-result-main-section">
                {resultData && (
                    <>
                        {tabList.map((tab, index) => (
                            <Accordion key={index} className="mb-3 accordion">
                                <AccordionSummary
                                    className="m-0"
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls={`panel${index + 1}a-content`}
                                    id={`panel${index + 1}a-header`}
                                >
                                    <h5 className="fw-bold m-0">
                                        {getTabDisplayName(tab)}
                                    </h5>
                                </AccordionSummary>
                                <AccordionDetails className="text-start">
                                    {tab === 'moduleDataactivity' && resultData[tab] ?
                                        Object.keys(resultData[tab]).map((eachActivity, activityIndex) => (
                                            <div key={activityIndex}>
                                                <h5>{eachActivity.charAt(0).toUpperCase() + eachActivity.slice(1)}</h5>
                                                {renderQuestions(resultData[tab][eachActivity])}
                                            </div>
                                        )) :
                                        tab !== 'moduleDataactivity' && resultData[tab] ?
                                            renderQuestions(resultData[tab]) :
                                            null
                                    }
                                </AccordionDetails>
                            </Accordion>
                        ))}
                    </>
                )}
                {/* {showPopup && (
                    <Dialog
                        handleClose={handleFeedback}
                        open={open}
                        title={'Congratulations!'}
                        content={'You have completed all the modules. Click "Agree" to view the feedback screen and provide your feedback. Once completed, you can successfully download the module completion certificate.'}
                    />
                )} */}
                {/* {feedback && (<FeedbackPopup handleClose={handleClose} />)}
                {certificate && (<Popup handleClose={handleClose} />)} */}
            </div>
            
            <div>
            <img id="image-container" alt="" style={{width:"100vh",height:"100%"}}/>

            </div>
            
        </>
    );
}
