import React, { useState } from "react";

import "../css/Sign.css";

const FormModal = ({onClose}) => {
  const [title, setTitle] = useState("");
  const [explanation, setExplanation] = useState("");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  // const [selectedQuestion, setSelectedQuestion] = useState("");

  // const questions = [
  //   { id: 1, title: "Question 1" },
  //   { id: 2, title: "Question 2" },
  //   { id: 3, title: "Question 3" },
  // ];

  return (
    <div className="modal">
      <div className="log-container questions">
        <div className="log-form-container log-sign">
          <div className="log-form">
            <h1>Create Question</h1>

            {/* <select
              value={selectedQuestion}
              onChange={(e) => setSelectedQuestion(e.target.value)}
            >
              <option value="">Select a Question</option>
              {questions.map((question) => (
                <option key={question.id} value={question.title}>
                  {question.title}
                </option>
              ))}
            </select> */}
            
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <textarea
              name="explanation"
              placeholder="Explanation"
              value={explanation}
              onChange={(e) => setExplanation(e.target.value)}
              style={{ height: "300px", width: "100%" }}
            ></textarea>

            <input
              type="text"
              name="input"
              placeholder="Input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              style={{ height: "50px", width: "100%" }}
            />

            <input
              type="text"
              name="output"
              placeholder="Output"
              value={output}
              onChange={(e) => setOutput(e.target.value)}
              style={{ height: "50px", width: "100%" }}
            />

            <button onClick={onClose}>Save</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormModal;
