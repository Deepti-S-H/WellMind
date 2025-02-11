import React from "react";
import "./Dialog.css"
import * as imports from "../../Imports";

export default function Dialog({handleClose, open,title,content,}) {
    return (
      <React.Fragment>
      
      <imports.Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <imports.DialogTitle id="alert-dialog-title" style={{ color: "chocolate" }}>
          {title}
        </imports.DialogTitle>
        <imports.DialogContent>
          <imports.DialogContentText id="alert-dialog-description" style={{ color: "black" }}>
            {splitSentencesAndFormat(content)}
          </imports.DialogContentText>
        </imports.DialogContent>
        <imports.DialogActions>
          <imports.Button onClick={handleClose} style={{ backgroundColor: "#ff8776", textTransform: "math-auto", color: "white" }}>
            Agree
          </imports.Button>
        </imports.DialogActions>
      </imports.Dialog>
    </React.Fragment>);
    
    function splitSentencesAndFormat(text) {
      const sentences = text.split(/(?<=\.)|(?<=:-) /); // Split by period followed by a space
      
      return sentences.map((sentence, index) => {
        const colonIndex = sentence.indexOf(':');
        
        if (colonIndex !== -1) {
          const beforeColon = sentence.substring(0, colonIndex + 1);
          const afterColon = sentence.substring(colonIndex + 1);
          
          return (
            <React.Fragment key={index}>
              <b>{beforeColon}</b>
              {afterColon}
              {index < sentences.length - 1 && <br />}
              <br />
            </React.Fragment>
          );
        } else {
          return (
            <React.Fragment key={index}>
              {sentence}
              {index < sentences.length - 1 && <br />}
              <br />
            </React.Fragment>
          );
        }
      });
    }
    
    
    
  } 