import React, { useState } from "react";
import EditableDiv from "./EditableDiv";
import FetchTarget from "./FetchTarget";
import EmailInput from "./ClientHandling/EmailInput";

const Mailer = () => {
  const [template, setTemplate] = useState("test test2 test");

  const [postcode, setPostcode] = useState("");
  const [adminDivisions, setAdminDivisions] = useState([]);

  const [emailClient, setEmailClient] = useState(undefined);

  const [userEmail, setUserEmail] = useState('');



    console.log("Ward: ", adminDivisions.ward)
    console.log("Client: ", emailClient);

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
        substrings={["test2"]}
        onBodyChange={(e) => console.log(e)}
        promptsChanged={true}
      />
    </div>
  );
};

export default Mailer;
