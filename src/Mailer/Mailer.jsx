import React, { useState } from "react";
import EditableDiv from "./EditableDiv";
import { Button, FormControlLabel, Checkbox } from "@mui/material";
import { SendModal } from "./SendModal";
import { BtnStyle, CheckBoxStyle } from "../MUIStyles";

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

  const [copyIn, setCopyIn] = useState(false);

  //TO DO:

  const [messaging, setMessaging] = useState([]);

  if (template.includes("<<|")) {
    return <>Loading...</>;
  }


  console.log(copyIn)
  return (
    <div>
      <EditableDiv
        label="Your message"
        body={template}
        substrings={answers}
        onBodyChange={(e) => setTemplate(e)}
        promptsChanged={answers}
      />
      <div
        style={{ marginTop: "-10px", fontSize: "small", textAlign: "center" }}
      >
        <em>
          Your answers have been incorporated into the template message,
          highlighted for you in yellow - check to make sure they still look
          okay!{" "}
        </em>
      </div>

      <div style={{ margin: "10px 0" }}>
        <FormControlLabel
          sx={{
            alignItems: "center", // force vertical centering
          }}
          control={
            <Checkbox
              style={CheckBoxStyle}
              onChange={(e) => setCopyIn(e.target.checked)}
            />
          }
          label={
            <span
              style={{
                fontSize: "0.9rem",
                lineHeight: "1.2", // slightly taller line height for readability
                display: "inline-block", // keeps alignment consistent
                verticalAlign: "middle",
              }}
            >
              Tick here to copy in Living Rent to your email if you are happy to
              share your contact details and message with us.
            </span>
          }
        />
      </div>

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
