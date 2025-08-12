import React, { useState } from "react";
import EditableDiv from "./EditableDiv";

import { SendModal } from "./SendModal";

const Mailer = ({
  template,
  setTemplate,
  answers,
  noClient,
  setNoClient,
  emailClient,
  issue,
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

  return (
    <div>
      <EditableDiv
        label="test"
        body={template}
        substrings={answers}
        onBodyChange={(e) => setTemplate(e)}
        promptsChanged={true}
      />

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
