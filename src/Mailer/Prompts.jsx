import React, { useState, useCallback, memo, useLayoutEffect } from "react";
import Mailer from "./Mailer";
import {
  Button,
  TextField,
  Tooltip,
  FormControlLabel,
  Checkbox,
  FormGroup,
} from "@mui/material";
import FetchTarget from "./FetchTarget";
import EmailInput from "./ClientHandling/EmailInput";
import {
  BtnStyle,
  TextFieldStyle,
  BtnStyleDisabled,
  CheckBoxStyle,
} from "../MUIStyles";

const tolerableStandard = [
  {
    requirement: "be structurally stable",
    explanation: "this provision is mainly aimed at problems of subsidence",
  },
  {
    requirement: "be substantially free from rising or penetrating damp",
    explanation:
      "it is important to note the use of the term 'substantially free', not 'completely free', and to note also that the standard does not extend to condensation dampness, although that may be covered by the next point",
  },
  {
    requirement:
      "have satisfactory provision for natural and artificial lighting, for ventilation and for heating",
    explanation:
      "Adequate natural lighting under good weather conditions should be available in rooms intended for sleeping, sitting or eating meals. A test for this is whether normal domestic activities can be undertaken without the aid of artificial light. Ventilation is thought to mean that fresh air can circulate easily to all rooms",
  },
  { requirement: "have satisfactory thermal insulation", explanation: "" },
  {
    requirement:
      "have an adequate piped supply of wholesome water available within the house",
    explanation: "The water supply is for domestic use",
  },
  {
    requirement:
      "have a sink provided with a satisfactory supply of both hot and cold water within the house",
    explanation: "",
  },
  {
    requirement:
      "have a water closet, or waterless closet, available for the exclusive use of the occupants of the house and suitably located within the house",
    explanation:
      "The toilet should be accessible to occupants without compromising their privacy and should be adequately lit and ventilated",
  },
  {
    requirement:
      "have a fixed bath or shower and a wash-hand basin, all of which must have a satisfactory supply of hot and cold water and be suitably located in the house",
    explanation: "",
  },
  {
    requirement:
      "have an effective system for the drainage and disposal of foul and surface water",
    explanation:
      "Factors taken into account are the capacity of the system, susceptibility to leakages or blockages and whether foul air from sewage can enter the building",
  },
  {
    requirement:
      "have a supply of electricity, where electricity is supplied to the property, that complies with the relevant requirements in relation to electrical installation for that supply and is adequate and safe to use",
    explanation: "",
  },
  {
    requirement:
      "have satisfactory facilities for the cooking of food within the house",
    explanation:
      "This does not necessarily mean that a cooker is actually installed, but as a minimum that there is the means of installing a gas or electric appliance",
  },
  {
    requirement:
      "have satisfactory access to all external doors and outbuildings",
    explanation:
      "If there is no adequate means of access to a house then there may be a breach of the landlord's repairing obligation.",
  },
  {
    requirement:
      "satisfactory equipment installed for detecting fire, and for giving warning of fire or suspected fire",
    explanation: "",
  },
  {
    requirement:
      "satisfactory equipment installed for detecting, and for giving warning of, carbon monoxide present in a concentration that is hazardous to health",
    explanation: "",
  },
];

/** Single checkbox row */
const ChecklistItem = memo(function ChecklistItem({
  requirement,
  checked,
  onToggle,
}) {
  return (
    <FormControlLabel
      sx={{ alignItems: "center" }}
      control={
        <Checkbox style={CheckBoxStyle} checked={checked} onChange={onToggle} />
      }
      label={
        <span
          style={{
            fontSize: "1rem",
            display: "inline-block",
            verticalAlign: "middle",
          }}
        >
          {requirement}
        </span>
      }
    />
  );
});

/** The full checklist */
const Checklist = memo(function Checklist({ items, selected, onToggle }) {
  return (
    <FormGroup>
      {items.map((it) => (
        <ChecklistItem
          key={it.requirement}
          requirement={it.requirement}
          checked={selected.includes(it.requirement)}
          onToggle={onToggle(it.requirement)}
        />
      ))}
    </FormGroup>
  );
});

const Prompts = ({ issue, blankTemplate }) => {
  const [stage, setStage] = useState("prompts");

  // postcode and divisions
  const [postcode, setPostcode] = useState("");
  const [adminDivisions, setAdminDivisions] = useState([]);

  // email handling
  const [emailClient, setEmailClient] = useState(undefined);
  const [userEmail, setUserEmail] = useState("");
  const [noClient, setNoClient] = useState(false);

  // template assembly and answers for highlighting
  const [template, setTemplate] = useState(blankTemplate);
  const [answers, setAnswers] = useState([]);

  // user inputs
  const [userName, setUserName] = useState("");
  const [userStory, setUserStory] = useState("");

  // tolerable standard selections
  const [standardsNotMet, setStandardsNotMet] = useState([]);

  const handleToggle = useCallback(
    (requirement) => (e) => {
      const checked = e.target.checked;
      setStandardsNotMet((prev) =>
        checked ? [...prev, requirement] : prev.filter((r) => r !== requirement)
      );
    },
    []
  );

  const handlePrompts = useCallback(() => {
    const standardsText = `The following are aspects of the Tolerable Standard which my property does not meet:\n- ${standardsNotMet.join(
      "\n- "
    )}`;

    setTemplate(
      blankTemplate
        .replace("<<|userStory|>>", userStory)
        .replace("<<|userName|>>", userName)
        .replace("<<|postcode|>>", postcode)
        .replace("<<|StandardsNotMet|>>", standardsText)
    );

    const baseAnswers = [userName, userStory, postcode];
    if (issue === "repair") baseAnswers.push(standardsText);
    setAnswers(baseAnswers);
  }, [blankTemplate, issue, postcode, standardsNotMet, userName, userStory]);

  const fieldsIncomplete =
    userName === "" ||
    userStory === "" ||
    userEmail === "" ||
    postcode === "" ||
    adminDivisions.ward == undefined;

  const [tooltipOpen, setTooltipOpen] = useState(false);
  const handleButtonClick = useCallback(() => {
    if (fieldsIncomplete) {
      setTooltipOpen(true);
      setTimeout(() => setTooltipOpen(false), 3000);
    }
  }, [fieldsIncomplete]);

  // ensure initial render does not jank inputs (optional micro-optim)
  useLayoutEffect(() => {}, []);

  if (stage === "prompts") {
    return (
      <div>
        {issue === "repair" && (
          <>
            Your property must meet what's called the{" "}
            <a href="../tolerable" target="_blank" rel="noreferrer">
              "Tolerable Standard"
            </a>
            , and the Council is required to take action if it doesn't. Use the
            buttons below to say which aspects of the Tolerable Standard your
            flat <em>doesn't</em> meet:
            <br />
            <Checklist
              items={tolerableStandard}
              selected={standardsNotMet}
              onToggle={handleToggle}
            />
          </>
        )}

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
                if (!fieldsIncomplete) {
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

  if (stage === "message") {
    return (
      <div>
        <Mailer
          template={template}
          setTemplate={setTemplate}
          standardsNotMet={standardsNotMet}
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

  return null;
};

export default Prompts;
