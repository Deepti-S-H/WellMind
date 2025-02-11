import React from "react";
import "./DynamicLayout.css";

export default function DynamicLayout(props) {
  return (
    <>
      <h2
        style={{
          color:props.color?props.color: "rgb(254, 136, 117)",
          fontWeight: "bold",
          position: "relative",
          display: "flex",
          textAlign: "center",
          justifyContent: "center", 
        }}
        className="mb-4 mt-3"
      >
        {props.header}
      </h2>

      <div
        style={{
          margin: "0px",
          padding: "0px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
        className="forsignup"
      >
        <br />
        <card
          class={props.layout?"loginmainlayout col-md-8":"loginmainlayout col-md-4"}
          style={{
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
            display: "flex",
          }}
        >
          {props.children}
        </card>
      </div>
      <br/>
    </>
  );
}
