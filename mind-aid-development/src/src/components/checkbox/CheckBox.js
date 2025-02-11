import React, { useState } from "react";
import "./CheckBox.css";

function CheckBox({ questions, func, answers, labelclass, module, qnNumber }) {
  return (
    <>
      {questions.map((question, qIndex) => (
        <div key={question.id} className="d-grid">
          <h5>
            {qnNumber ? qnNumber : module == 6 ? qIndex + 5 : qIndex + 1}. {question.question}
          </h5>
          {question.options.map((option) => (
            <label key={option.id} className={labelclass} style={{ cursor: "pointer" }}>
              <input
                className="me-2 checkBoxStyle"
                type="checkbox"
                onChange={() => func(option.label)}
                checked={answers.includes(option.label)}
              />
              {option.label}
            </label>
          ))}
        </div>
      ))}
    </>
  );
}

export default CheckBox;
