import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/layout/Layout";
import Home from "./pages/home/Home";
// import Contact from "./pages/contact/Contact";
import Courses from "./pages/courses/Courses";
import Modules from "./pages/module-main/ModulesMain";
import Module2 from "./pages/module-main/modules/Module2";
import Module3 from "./pages/module-main/modules/Module3";
import Module4 from "./pages/module-main/modules/Module4";
import Module5 from "./pages/module-main/modules/Module5";
import "./App.css";
import UserHome from "./pages/user-home/UserHome";
import NotFound from "./pages/not-found/NotFound";
import ActivityResults from "./pages/activity-results/ActivityResults";

function App() {
  const pages = [
    { path: "/user-home", component: <UserHome /> },
    { path: "/user-home/activity", component: <Modules /> },
    { path: "/", component: <Home /> },
    { path: "/Courses", component: <Courses /> },
    // { path: "/Contact", component: <Contact /> },
    { path: "/user-home/home", component: <Layout /> },
    { path: "/user-home/activity/Module2", component: <Module2 /> },
    { path: "/user-home/activity/Module3", component: <Module3 /> },
    { path: "/user-home/activity/Module4", component: <Module4 /> },
    { path: "/user-home/activity/Module5", component: <Module5 /> },
    { path: "/activity-results", component: <ActivityResults /> },
  ];
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {pages.map((page, index) => (
            <Route path={page.path} key={index} element={page.component} />
          ))}

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
