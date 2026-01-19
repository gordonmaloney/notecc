import React, { useState, useEffect, useRef } from "react";

//LOOK I KNOW THIS WHOLE COMPONENT IS BANANAS BUT IT WORKS SO DON'T CHANGE IT WITHOUT BEING VERY CAREFUL

const EditableDiv = ({
  substrings,
  label,
  body,
  onBodyChange,
  promptsChanged,
}) => {
  const textFieldRef = useRef();

  useEffect(() => {
    const textField = textFieldRef.current;
    let textContent = textField.innerHTML;

    // Find and highlight prompt answers
    const highlightedContent = substrings.reduce((content, answer) => {


      // Skip highlighting for certain terms or short answers
      if (
        answer === "span" ||
        answer === "class" ||
        answer === "name" ||
        answer.length < 1
      ) {
        return content;
      }

      const regex = new RegExp(`(?<!\\w)${answer}(?!\\w)`, "gis");

      return content.replaceAll(
        regex,
        `<span class="highlightText">${answer}</span>`
      );
    }, textContent);

    textField.innerHTML = highlightedContent;
  }, [substrings, promptsChanged]); // Include promptsChanged in dependencies

  const [length, setLength] = useState(body?.length);
  useEffect(() => {
    setLength(body?.length);
  }, [body]);



  return (
    <div style={{ width: "100%" }}>
      <div
        style={{
          marginTop: "10px",
          padding: "10px",
          position: "relative",
          borderRadius: "0",
          marginBottom: "12px",
          border: "1px solid rgba(0, 0, 0, 0.65)",
          outline: "none",
        }}
        className="editableDivBox"
      >
        <label
          htmlFor="editableDiv"
          style={{
            position: "absolute",
            top: "-8px",
            left: "8px",
            fontSize: "0.75rem",
            fontWeight: "500",
            color: "rgba(0,0,0,0.65)",
            backgroundColor: "white",
            padding: "0 5px",
          }}
          className="editableDivBoxLabel"
        >
          {label}
        </label>
        <div
          style={{
            outline: "0px solid transparent",
            color: "black",
            fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
            padding: "5px",
            minHeight: "200px",
            height: "auto",
            whiteSpace: "pre-wrap",
          }}
          ref={textFieldRef}
          contentEditable
          suppressContentEditableWarning={true}
          autoFocus
          onInput={(e) => setLength(e.target?.innerText.length)}
          onBlur={() => onBodyChange(textFieldRef.current.innerText)}
        >
          {body}
        </div>
      </div>

    </div>
  );
};

export default React.memo(EditableDiv);
