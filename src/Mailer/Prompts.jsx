import React, { useState, useEffect } from "react";
import Mailer from "./Mailer";

const Prompts = () => {


    
  const [template, setTemplate] = useState(`test1,

<<|test2|>>

<<|test3|>>`);



  const [answers, setAnswers] = useState(['testAnswer1', 'testAnswer2']);



  useEffect(() => {
    setTemplate(
      template
        .replace("<<|test2|>>", answers[0])
        .replace("<<|test3|>>", answers[1])
    );
  }, []);

  return (
    <div>
      test
      <Mailer template={template} setTemplate={setTemplate} answers={answers} />
    </div>
  );
};

export default Prompts;
