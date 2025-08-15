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
  setStage,
}) => {
  const [sent, setSent] = useState(false);

  const Mobile = /Mobi|Android|iPhone/i.test(navigator.userAgent);

  let SL = "Requesting support with my housing issue";

  let title = "Demand Edinburgh Council stand up for tenants";

  let bcc = "edinburgh@livingrent.org";



  //TO DO:

  const [messaging, setMessaging] = useState([]);

  let copyIn = true;


  
  if (template.includes("<<|")) {
    return <>Loading...</>;
  }

  return (
    <div>
      <EditableDiv
        label="Your message"
        body={template}
        substrings={answers}
        onBodyChange={(e) => setTemplate(e)}
        promptsChanged={answers}
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
