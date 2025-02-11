import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import "./RadioOptions.css";

export default function RadioOptions({
  selectedValue,
  name,
  onChange,
  data,
  qNo,
  style = {}
}) {

  return (
    <RadioGroup
    className="RadioGroup"
    style={style}
      name={name}
      value={selectedValue}
      onChange={(e) => onChange(e, qNo)}
    >
      {data.map((eachOpt, optIndex) => (
        <FormControlLabel
          value={eachOpt.value}
          key={optIndex}
          control={<Radio size="small" />}
          label={eachOpt.label}
        />
      ))}
    </RadioGroup>
  );
}
