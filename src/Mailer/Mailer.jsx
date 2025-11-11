import React, { useState, useEffect } from "react";
import EditableDiv from "./EditableDiv";
import {
  Chip,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { SendModal } from "./SendModal";
import { BtnStyle, CheckBoxStyle, TextFieldStyle } from "../MUIStyles";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ScrollToTop from "../Components/ScrollToTop";

const Mailer = ({
  template,
  setTemplate,
  answers,
  noClient,
  setNoClient,
  emailClient,
  setStage,
  adminDivisions,
  standardsNotMet,
  contactDetails,
}) => {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [sent, setSent] = useState(false);

  const Mobile = /Mobi|Android|iPhone/i.test(navigator.userAgent);

  let SL = "Requesting support with my housing issue";

  let title = "Demand Edinburgh Council stand up for tenants";

  let bcc = "edinburgh@livingrent.org";

  const [copyIn, setCopyIn] = useState(false);

  const [messaging, setMessaging] = useState([]);
  const [notMessaging, setNotMessaging] = useState([]);

  useEffect(() => {
    setLoading(true);
    let cancelled = false;

    fetch(
      `https://raw.githubusercontent.com/gordonmaloney/rep-data/main/edinburgh-councillors.json`
    )
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch councillors");
        return res.json();
      })
      .then((data) => {
        setMessaging([
          {
            name: "PRS Enforcement team",
            email: "prsenforcement@edinburgh.gov.uk",
          },
          ...data.filter((c) => c.ward == adminDivisions.ward),
        ]);
        setLoading(false);
        if (data.filter((c) => c.ward == adminDivisions.ward).length == 0) {
          setErrorMsg("Could not load councillors");
        }
      })
      .catch((err) => setErrorMsg("Could not load councillors:", err));

    return () => {
      cancelled = true;
    };
  }, [adminDivisions.ward]);

  if (template.includes("<<|")) {
    return <>Loading...</>;
  }

  return (
    <div>
      <ScrollToTop />
      <Box
        sx={{
          position: "relative",
          marginTop: 2,
          marginBottom: "14px",

          width: "100%",
          "&:focus-within .paperBorder": {
            outline: "2px solid #3f51b5", // Color for focus state
            outlineOffset: "-2px",
          },
        }}
      >
        <label
          style={{
            position: "absolute",
            top: "-9px",
            left: "8px",
            fontSize: "0.78rem",
            fontWeight: "320",
            color: "rgba(0,0,0,0.3)",
            backgroundColor: "white",
            padding: "0 5px",
            transition: "top 0.2s, font-size 0.2s, color 0.2s",
          }}
        >
          To
        </label>

        <Paper
          sx={{
            ...TextFieldStyle,
            margin: "1px 0 7px 0",
            padding: "5px",
            paddingY: "15px",
            border: "1px solid lightgray",
          }}
        >
          {messaging.map((msp) => (
            <Chip
              key={msp.name}
              label={`${msp.name} ${msp.party ? `- ${msp.party}` : ""}`}
              variant="outlined"
              sx={{ margin: "2px" }}
              onClick={() => {
                setMessaging((prev) =>
                  prev.filter((prevTarget) => prevTarget.name !== msp.name)
                );
                setNotMessaging((prev) => [...prev, msp]);
              }}
              onDelete={() => {
                setMessaging((prev) =>
                  prev.filter((prevTarget) => prevTarget.name !== msp.name)
                );
                setNotMessaging((prev) => [...prev, msp]);
              }}
            ></Chip>
          ))}

          {messaging.length == 0 && (
            <div style={{ color: "red", marginLeft: "10px" }}>
              You need to pick at least one recipient!
            </div>
          )}
        </Paper>

        {notMessaging.length > 0 && (
          <>
            <div
              style={{
                marginBottom: "5px",
              }}
            >
              <Accordion
                className="notMessaging"
                sx={{
                  backgroundColor: "rgba(246, 243, 246, 1)",
                  borderRadius: "5px !important",
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="details"
                  sx={{
                    backgroundColor: "rgba(246, 243, 246, 1)",
                    borderRadius: "5px 5px 0 0",
                    border: "1px solid lightgray",
                    borderBottom: "0",
                  }}
                >
                  <div
                    style={{
                      color: "black",
                    }}
                  >
                    You aren't messaging:
                  </div>
                </AccordionSummary>
                <AccordionDetails
                  sx={{
                    paddingY: "10px",
                    paddingX: "10px",
                    marginTop: "-10px",
                    backgroundColor: "rgba(246, 243, 246, 1)",
                    borderRadius: "0 0 5px 5px",
                    border: "1px solid lightgray",
                  }}
                >
                  <div style={{ marginLeft: "5px" }}>
                    These are the recipients not included in your message. If
                    you'd like to include them, just tap their name.
                  </div>
                  <br />
                  {notMessaging.map((msp) => (
                    <Chip
                      key={msp.name}
                      size="small"
                      label={`${msp.name} ${msp.party ? `- ${msp.party}` : ""}`}
                      variant="outlined"
                      sx={{ backgroundColor: "white", margin: "2px" }}
                      deleteIcon={
                        <AddCircleIcon style={{ fontSize: "large" }} />
                      }
                      onDelete={() => {
                        setNotMessaging((prev) =>
                          prev.filter(
                            (prevTarget) => prevTarget.name !== msp.name
                          )
                        );
                        setMessaging((prev) => [...prev, msp]);
                      }}
                      onClick={() => {
                        setNotMessaging((prev) =>
                          prev.filter(
                            (prevTarget) => prevTarget.name !== msp.name
                          )
                        );
                        setMessaging((prev) => [...prev, msp]);
                      }}
                    ></Chip>
                  ))}
                </AccordionDetails>
              </Accordion>
            </div>
          </>
        )}
      </Box>

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
        contactDetails={contactDetails}
      />
    </div>
  );
};

export default Mailer;
