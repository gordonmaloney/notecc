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
  FormControl,
  FormGroup,
  FormLabel,
  RadioGroup,
  Radio,
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
  complaintDeets,
}) => {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [gdprPrompt, setGdprPrompt] = useState(false);

  const [sent, setSent] = useState(false);

  const Mobile = /Mobi|Android|iPhone/i.test(navigator.userAgent);

  let SL = "Requesting support with my housing issue";

  let title = "Demand Edinburgh Council stand up for tenants";

  let bcc = "edinburgh@livingrent.org";

  const [copyIn, setCopyIn] = useState(true);
  const [optIn, setOptIn] = useState(undefined);

  const [messaging, setMessaging] = useState([]);
  const [notMessaging, setNotMessaging] = useState([]);

  useEffect(() => {
    setLoading(true);
    let cancelled = false;

    fetch(
      `https://raw.githubusercontent.com/gordonmaloney/rep-data/main/edinburgh-councillors.json`,
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

  const handleUnBcc = () => {
    setCopyIn(false);
  };

  const handleSendClicked = () => {
    setGdprPrompt(true);
  };

  const paperShadow = {
    ...TextFieldStyle,
    margin: "1px 0 7px 0",
    padding: "5px",
    paddingY: "15px",
    border: "1px solid rgba(0, 0, 0, 0.65)",
    borderRadius: 0,
    boxShadow: "none",
  };

  return (
    <div>
      <ScrollToTop />

      {/* Messaging */}
      <Box
        sx={{
          position: "relative",
          marginTop: 4,
          marginBottom: 4,

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
            top: "-8px",
            left: "8px",
            fontSize: "0.75rem",
            fontWeight: "500",
            color: "rgba(0,0,0,0.65)",
            backgroundColor: "white",
            padding: "0 5px",
            transition: "top 0.2s, font-size 0.2s, color 0.2s",
          }}
        >
          To
        </label>

        <Paper sx={paperShadow}>
          {messaging.map((msp) => (
            <Chip
              key={msp.name}
              label={`${msp.name} ${msp.party ? `- ${msp.party}` : ""}`}
              variant="outlined"
              sx={{ margin: "2px" }}
              onClick={() => {
                setMessaging((prev) =>
                  prev.filter((prevTarget) => prevTarget.name !== msp.name),
                );
                setNotMessaging((prev) => [...prev, msp]);
              }}
              onDelete={() => {
                setMessaging((prev) =>
                  prev.filter((prevTarget) => prevTarget.name !== msp.name),
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
                            (prevTarget) => prevTarget.name !== msp.name,
                          ),
                        );
                        setMessaging((prev) => [...prev, msp]);
                      }}
                      onClick={() => {
                        setNotMessaging((prev) =>
                          prev.filter(
                            (prevTarget) => prevTarget.name !== msp.name,
                          ),
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

      {/* BCCing */}
      <Box
        sx={{
          position: "relative",
          marginTop: 4,
          marginBottom: 4,

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
            top: "-8px",
            left: "8px",
            fontSize: "0.75rem",
            fontWeight: "500",
            color: "rgba(0,0,0,0.65)",
            backgroundColor: "white",
            padding: "0 5px",
            transition: "top 0.2s, font-size 0.2s, color 0.2s",
          }}
        >
          BCC
        </label>

        <Paper sx={paperShadow}>
          {copyIn ? (
            <Chip
              key={"livingrent"}
              label={`Living Rent`}
              variant="outlined"
              sx={{ margin: "2px" }}
              onClick={() => {
                handleUnBcc();
              }}
              onDelete={() => {
                handleUnBcc();
              }}
            />
          ) : (
            <span style={{ marginLeft: "10px", fontStyle: "italic" }}>
              Are you sure? By copying Living Rent in, your story can help shape
              our campaign.{" "}
              <span
                onClick={() => setCopyIn(true)}
                style={{ cursor: "pointer" }}
              >
                <u>Add Living Rent back into BCC.</u>
              </span>
            </span>
          )}
        </Paper>
      </Box>

      <EditableDiv
        label="Your message"
        body={template}
        substrings={answers}
        onBodyChange={(e) => setTemplate(e)}
        promptsChanged={answers}
      />
      <div style={{ fontSize: "small", margin: "0.5rem 0 1rem" }}>
        <em>
          Your answers have been incorporated into the template message,
          highlighted for you in <span className="highlightText">yellow</span> -
          check to make sure they still look okay!{" "}
        </em>
      </div>

      <Box
        sx={{
          position: "relative",
          fontSize: "small",
          marginBottom: 4,
          border: optIn == undefined && gdprPrompt && "1px solid red",
          padding: optIn == undefined && gdprPrompt ? "4px" : 0,
          width: "100%",
          "&:focus-within .paperBorder": {
            outline: "2px solid #3f51b5", // Color for focus state
            outlineOffset: "-2px",
          },
        }}
      >
        <div>
          <FormControl component="fieldset">
            <legend style={{ padding: 0, fontWeight: "bold" }}>
              Stay in touch?
            </legend>
            <RadioGroup
              row
              value={optIn ? "yes" : optIn == false && "no"}
              onChange={(e) => setOptIn(e.target.value === "yes")}
            >
              <FormControlLabel
                value="yes"
                sx={{ alignItems: "flex-start" }}
                control={<Radio style={CheckBoxStyle} />}
                label={
                  <span
                    style={{
                      display: "inline-block",
                      paddingTop: "0.9em",
                      fontSize: "small",
                    }}
                  >
                    Yes (optional) — Living Rent can store my name, email, phone
                    number, postcode, and a copy of the message I’m sending, and
                    contact me by email or phone to offer support with my case.
                    Please don’t include medical or other sensitive personal
                    details unless it’s necessary. We aim to delete this
                    information after 12 months but you can ask us to delete it
                    sooner at any time by emailing privacy@livingrent.org.{" "}
                    <a
                      href="https://www.livingrent.org/privacy"
                      target="_blank"
                    >
                      Privacy Policy
                    </a>
                  </span>
                }
              />
              <FormControlLabel
                value="no"
                sx={{ alignItems: "flex-start" }}
                control={<Radio style={CheckBoxStyle} />}
                label={
                  <span
                    style={{
                      display: "inline-block",
                      paddingTop: "0.9em",
                      fontSize: "small",
                    }}
                  >
                    No - I don't want to be contacted by Living Rent.
                  </span>
                }
              />
            </RadioGroup>
          </FormControl>
        </div>
        {optIn == undefined && gdprPrompt && (
          <div
            style={{
              marginTop: "-10px",
              fontSize: "small",
              //textAlign: "center",
              color: "red",
            }}
          >
            You must select 'yes' or 'no' here.
          </div>
        )}
      </Box>

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
        optIn={optIn}
        handleSendClicked={handleSendClicked}
        emailClient={emailClient}
        contactDetails={contactDetails}
        complaintDeets={complaintDeets}
      />
    </div>
  );
};

export default Mailer;
