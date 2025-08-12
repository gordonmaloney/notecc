import React, { useEffect, useState } from "react";
import useEmailClient from "./useEmailClient";
import { TextFieldStyle } from "../../MUIStyles";
import { TextField } from "@mui/material";

const EmailInput = ({ userEmail, setUserEmail, setEmailClient }) => {
  const { client, loading, error } = useEmailClient(userEmail);

  useEffect(() => {
    if (client) {
      setEmailClient(client)
    }
  }, [client]);

  return (
    <TextField
      id="user_email"
      label="Your email"
      placeholder="Your email..."
      sx={TextFieldStyle}
      fullWidth
      value={userEmail}
      onChange={(e) => setUserEmail(e.target.value)}
    />
  );
};

export default EmailInput;
