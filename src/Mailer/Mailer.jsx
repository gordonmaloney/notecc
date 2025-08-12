import React, { useState } from "react";
import EditableDiv from "./EditableDiv";
import FetchTarget from "./FetchTarget";
import EmailInput from "./ClientHandling/EmailInput";
import { SendModal } from "./SendModal";

const Mailer = ({ template, setTemplate, answers }) => {
  const [postcode, setPostcode] = useState("");
  const [adminDivisions, setAdminDivisions] = useState([]);

  const [emailClient, setEmailClient] = useState(undefined);
  const [userEmail, setUserEmail] = useState("");
  const [noClient, setNoClient] = useState(false);

  const [sent, setSent] = useState(false);

  const Mobile = /Mobi|Android|iPhone/i.test(navigator.userAgent);

  //TO DO:

  const [messaging, setMessaging] = useState([]);

  let SL = "test";
  let bcc = "test";
  let copyIn = true;
  let title = "test";



  if (template.includes('<<|')) {
    return <>Loading...</>
  }

  return (
    <div>
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

      <EditableDiv
        label="test"
        body={template}
        substrings={answers}
        onBodyChange={(e) => console.log(e)}
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
