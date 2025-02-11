import React, { useEffect } from "react";
import * as imports from "./../../Imports";
import "./InputField.css";

export default function InputField(props) {
  return (
    <>
      <label
        className={
          props.title == "Login"
            ? "LoginFormLabels mb-2 d-block"
            : "LoginFormLabels m-0 d-block"
        }
      >
        {props.label}
      </label>
      <imports.TextField
        variant="outlined"
        type={props.type}
        margin="normal"
        fullWidth={props.fullWidth}
        id={props.id}
        autoComplete="off"
        size="small"
        autofill
        disabled={props.disabled}
        value={props.value}
        className={
          props.id == "browseFile"
            ? "BrowseFieldStyle m-0"
            : "LoginFieldStyle m-0"
        }
        onClick={!props.readOnly && props.onClick}
        onChange={props.onChange}
        onFocus={props.onFocus}
        onBlur={props.onBlur}
        name={props.name}
        placeholder={props.placeholder}
        height="0.4em"
        InputProps={{
          readOnly: props.readonly,
          startAdornment: (
            <imports.InputAdornment
              className={"p-2 m-0 ChooseFileText"}
              position="start"
              onClick={props.startAdornOnClick}
            >
              {props.startAdornIcon}
            </imports.InputAdornment>
          ),
          endAdornment: (
            <imports.InputAdornment
              className={"p-2 m-0"}
              position="start"
              onClick={props.endAdornOnClick}
            >
              {props.endAdornIcon}
            </imports.InputAdornment>
          ),
        }}
      />
    </>
  );
}
