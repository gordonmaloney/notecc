import React, { useState, useEffect } from "react";
import Mailer from "./Mailer";
import { Button, TextField, Tooltip } from "@mui/material";
import FetchTarget from "./FetchTarget";
import EmailInput from "./ClientHandling/EmailInput";
import { BtnStyle, TextFieldStyle, BtnStyleDisabled } from "../MUIStyles";

const Prompts = ({ issue, blankTemplate }) => {
  const [stage, setStage] = useState("prompts");

  //handle postcode
  const [postcode, setPostcode] = useState("");
  const [adminDivisions, setAdminDivisions] = useState([]);

  //handle email address
  const [emailClient, setEmailClient] = useState(undefined);
  const [userEmail, setUserEmail] = useState("");
  const [noClient, setNoClient] = useState(false);

  const [template, setTemplate] = useState(blankTemplate);

  const [answers, setAnswers] = useState([]);

  const [userName, setUserName] = useState("");
  const [userStory, setUserStory] = useState("");

  const handlePrompts = () => {
    setTemplate(
      blankTemplate
        .replace("<<|userStory|>>", userStory)
        .replace("<<|userName|>>", userName)
        .replace("<<|postcode|>>", postcode)
    );
    setAnswers([userName, userStory, postcode]);
  };

  useEffect(() => {
    handlePrompts();
  }, [userStory, userName, postcode, userEmail]);

  const fieldsIncomplete =
    userName === "" || userStory === "" || userEmail === "" || postcode === "";

  const [tooltipOpen, setTooltipOpen] = useState(false);
  const handleButtonClick = () => {
    console.log("test");
    if (fieldsIncomplete) {
      setTooltipOpen(true);
      // Automatically close tooltip after 3 seconds
      setTimeout(() => {
        setTooltipOpen(false);
      }, 3000);
    }
  };

  if (stage == "prompts") {
    return (
      <div>
        <TextField
          label="Your Name"
          variant="outlined"
          value={userName}
          sx={TextFieldStyle}
          onChange={(e) => setUserName(e.target.value)}
          fullWidth
        />
        <TextField
          label="Your Story"
          variant="outlined"
          value={userStory}
          sx={TextFieldStyle}
          onChange={(e) => setUserStory(e.target.value)}
          multiline
          rows={4}
          fullWidth
        />
        <FetchTarget
          postcode={postcode}
          setPostcode={setPostcode}
          adminDivisions={adminDivisions}
          setAdminDivisions={setAdminDivisions}
        />
        <EmailInput
          userEmail={userEmail}
          setUserEmail={setUserEmail}
          emailClient={emailClient}
          setEmailClient={setEmailClient}
        />

        <Tooltip
          title="Make sure you have filled out all the questions above"
          open={tooltipOpen}
          disableHoverListener
          disableFocusListener
          disableTouchListener
          placement="left"
        >
          <span style={{ float: "right" }}>
            <Button
              sx={fieldsIncomplete ? BtnStyleDisabled : BtnStyle}
              onClick={() => {
                if (
                  userName !== "" &&
                  userStory !== "" &&
                  userEmail !== "" &&
                  postcode !== ""
                ) {
                  handlePrompts();
                  setStage("message");
                } else {
                  handleButtonClick();
                }
              }}
            >
              Next
            </Button>
          </span>
        </Tooltip>
      </div>
    );
  }

  if (stage == "message") {
    return (
      <div>
        <Mailer
          template={template}
          setTemplate={setTemplate}
          answers={answers}
          noClient={noClient}
          setNoClient={setNoClient}
          emailClient={emailClient}
          issue={issue}
          setStage={setStage}
          adminDivisions={adminDivisions}
        />
      </div>
    );
  }
};

export default Prompts;
