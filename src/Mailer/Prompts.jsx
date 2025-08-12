import React, { useState, useEffect } from "react";
import Mailer from "./Mailer";
import { Button, TextField } from "@mui/material";

const Prompts = () => {
  const [template, setTemplate] = useState(`test1,

<<|userStory|>>

<<|userName|>>`);

  const [answers, setAnswers] = useState([]);

  const [userName, setUserName] = useState("");
  const [userStory, setUserStory] = useState("");

  const handlePrompts = () => {
    setTemplate(
      template
        .replace("<<|userStory|>>", userName)
        .replace("<<|userName|>>", userStory)
    );
    setAnswers([userName, userStory]);
  };

  return (
    <div>
      test
      <TextField
        label="Your Name"
        variant="outlined"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        fullWidth
      />
      <TextField
        label="Your Story"
        variant="outlined"
        value={userStory}
        onChange={(e) => setUserStory(e.target.value)}
        multiline
        rows={4}
        fullWidth
      />
      <Button onClick={handlePrompts}>Next</Button>
      <Mailer template={template} setTemplate={setTemplate} answers={answers} />
    </div>
  );
};

export default Prompts;
