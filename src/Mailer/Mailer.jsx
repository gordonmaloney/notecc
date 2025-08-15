import React, { useState } from "react";
import EditableDiv from "./EditableDiv";
import { Button } from "@mui/material";
import { SendModal } from "./SendModal";
import { BtnStyle } from "../MUIStyles";

const Mailer = ({
  template,
  setTemplate,
  answers,
  noClient,
  setNoClient,
  emailClient,
  setStage
}) => {
  const [sent, setSent] = useState(false);

  const Mobile = /Mobi|Android|iPhone/i.test(navigator.userAgent);

  //TO DO:

  const [messaging, setMessaging] = useState([]);

  let SL = "test";
  let bcc = "test";
  let copyIn = true;
  let title = "test";

  if (template.includes("<<|")) {
    return <>Loading...</>;
  }


  let promptsChanged = answers


  return (
    <div>
      <EditableDiv
        label="Your message"
        body={template}
        substrings={answers}
        onBodyChange={(e) => setTemplate(e)}
        promptsChanged={promptsChanged}
      />

      <Button sx={BtnStyle} onClick={() => setStage("prompts")}>
        Back
      </Button>

      <SendModal
        noClient={noClient}
        setNoClient={setNoClient}
        messaging={messaging}
        bcc={bcc}
        SL={SL}
        body={template}
        Mobile={Mobile}
        sent={sent}
        title={title}
        setSent={setSent}
        copyIn={copyIn}
        emailClient={emailClient}
      />
    </div>
  );
};

export default Mailer;
