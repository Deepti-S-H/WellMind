import React from "react";
import "./Loader.css";
import Backdrop from "@mui/material/Backdrop";

function Loader(props) {
  return (
    <Backdrop
      sx={{
        color: "#fff",
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: "rgb(255 255 255 / 20%)",
      }}
      open={true}
    >
      <div class="overlay">
        <div class="loader">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </Backdrop>
  );
}

export default Loader;
