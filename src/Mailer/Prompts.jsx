import React, {
  useState,
  useCallback,
  memo,
  useLayoutEffect,
  useEffect,
} from "react";
import Mailer from "./Mailer";
import {
  Button,
  TextField,
  Tooltip,
  FormControlLabel,
  Checkbox,
  FormGroup,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
} from "@mui/material";
import FetchTarget from "./FetchTarget";
import EmailInput from "./ClientHandling/EmailInput";
import {
  BtnStyle,
  TextFieldStyle,
  BtnStyleDisabled,
  CheckBoxStyle,
} from "../MUIStyles";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";

const tolerableStandardNew = [
  {
    requirement: "not **wind and water tight**",
  },
  {
    requirement: "not **reasonably fit for human habitation**",
  },
  {
    requirement:
      "supply of **water, gas, and electricity** not in a reasonable state of repair",
  },
  {
    requirement:
      "**fittings, fixtures, appliances and furnishings** not in a reasonable state of repair",
  },
  {
    requirement:
      "no satisfactory provision for **food storage and preparation**",
  },
  {
    requirement: "**common parts of the house** cannot be safely accessed",
  },
  {
    requirement: "**common tenement door** not secure",
  },
  {
    requirement: "is not **structurally stable**",
  },
  {
    requirement:
      "is not substantially **free from rising or penetrating damp**",
  },
  {
    requirement:
      "does not have satisfactory provision for **natural and artificial lighting, for ventilation and for heating**",
  },
  { requirement: "does not have satisfactory **thermal insulation**" },
  {
    requirement:
      "does not have an adequate **piped supply of wholesome water** available within the house",
  },
  {
    requirement:
      "does not have a sink provided with a satisfactory **supply of both hot and cold water** within the house",
  },
  {
    requirement:
      "does not have a **water closet, or waterless closet**, available for the exclusive use of the occupants of the house and suitably located within the house",
  },
  {
    requirement:
      "does not have a fixed **bath or shower and a wash-hand basin**, all of which must have a satisfactory supply of hot and cold water and be suitably located in the house",
  },
  {
    requirement:
      "does not have an effective system for the **drainage and disposal of foul and surface water**",
  },
  {
    requirement:
      "does not have a **supply of electricity**, where electricity is supplied to the property, that complies with the relevant requirements in relation to electrical installation for that supply and is adequate and safe to use",
  },
  {
    requirement:
      "does not have satisfactory **facilities for the cooking of food** within the house",
  },
  {
    requirement:
      "does not have satisfactory **access to all external doors** and outbuildings",
  },
  {
    requirement:
      "does not have satisfactory **equipment installed for detecting fire**, and for giving warning of fire or suspected fire",
  },
  {
    requirement:
      "does not have satisfactory **equipment installed for detecting, and for giving warning of, carbon monoxide** present in a concentration that is hazardous to health",
  },
];

const FPPCriteria = [
  {
    requirement:
      "contravention of any provision of the law relating to housing or landlord and tenant law",
  },
  {
    requirement:
      "the landlord's knowledge of private tenancy law and good practice",
  },
  {
    requirement: "any delay or attempt to avoid registration",
  },
  {
    requirement: "failure or delays in providing information",
  },
  {
    requirement: "complaints from tenants or neighbours",
  },
  {
    requirement: "information about the physical condition of the property",
  },
  {
    requirement:
      "judgements against the landlord by the Housing and Property Chamber of the First Tier Tribunal (FTT)",
  },
  {
    requirement:
      "any offence involving fraud or other dishonesty, firearms, violence, or drugs",
  },
  {
    requirement: "any sexual offense",
  },
  {
    requirement:
      "unlawful discrimination in, or in connection with, the carrying on of any business",
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
      sx={{ alignItems: "flex-start" }}
      control={
        <Checkbox style={CheckBoxStyle} checked={checked} onChange={onToggle} />
      }
      label={
        <ReactMarkdown
          components={{
            // render paragraphs as inline span so it behaves like before
            p: ({ node, ...props }) => (
              <span
                {...props}
                style={{ display: "inline-block", padding: "9px" }}
              />
            ),
          }}
        >
          {requirement}
        </ReactMarkdown>
      }
    />
  );
});

/** The full checklist */
const Checklist = memo(function Checklist({ items, selected, onToggle }) {
  return (
    <FormGroup
      sx={{
        display: "grid",
        gap: 1.5,
        gridTemplateColumns: {
          xs: "1fr", // 1 column on phones/tablets
          md: "1fr 1fr", // 2 columns on desktop+
        },
        alignItems: "start",
      }}
    >
      {" "}
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
  const [userNumber, setUserNumber] = useState("");
  const [contactDetails, setContactDetails] = useState({});

  // tolerable standard selections
  const [standardsNotMet, setStandardsNotMet] = useState([]);

  const [dateStart, setDateStart] = useState("");
  const [dateEnd, setDateEnd] = useState("");

  const handleDateStartChange = (event) => {
    setDateStart(event.target.value);
  };

  const handleDateEndChange = (event) => {
    setDateEnd(event.target.value);
  };

  const getDateOptions = () => {
    const currentDate = new Date();
    currentDate.setDate(1);
    const dates = [];
    while (currentDate.getFullYear() > 2021) {
      dates.push({
        value: [
          currentDate.getFullYear(),
          (currentDate.getMonth() + 1).toString().padStart(2, "0"),
        ].join("-"),
        label: [
          currentDate.toLocaleString("default", { month: "long" }),
          currentDate.getFullYear(),
        ].join(", "),
      });
      currentDate.setMonth(currentDate.getMonth() - 1);
    }
    return dates;
  };

  const dateOptions = getDateOptions();

  const handleToggle = useCallback(
    (requirement) => (e) => {
      const checked = e.target.checked;
      setStandardsNotMet((prev) =>
        checked
          ? [...prev, requirement]
          : prev.filter((r) => r !== requirement),
      );
    },
    [],
  );

  const handlePrompts = useCallback(() => {
    const standardsText = `The following are aspects of the Repairing Standard which my property does not meet:\n- ${standardsNotMet
      .map((st) => st.replaceAll("*", ""))
      .join("\n- ")}`;

    const FPPtext = `I have particular concerns about the following criteria regarding the fit and proper person test my landlord should meet:\n- ${standardsNotMet
      .map((st) => st.replaceAll("*", ""))
      .join("\n- ")}`;

    setTemplate(
      blankTemplate
        .replace("<<|userStory|>>", userStory)
        .replace("<<|userName|>>", userName)
        .replace("<<|postcode|>>", postcode)
        .replace(
          "<<|StandardsNotMet|>>",
          standardsNotMet.length > 0 ? standardsText : "",
        )
        .replace("<<|FPPissues|>>", standardsNotMet.length > 0 ? FPPtext : ""),
    );

    const baseAnswers = [userName, userStory, postcode];

    if (issue === "repair") baseAnswers.push(standardsText);
    if (issue === "report") baseAnswers.push(FPPtext);

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

  useEffect(() => {
    setContactDetails({
      name: userName,
      number: userNumber,
      email: userEmail,
      postcode: postcode,
    });
  }, [userName, userNumber, userEmail]);



  const [complaintDeets, setComplaintDeets] = useState({
    standards: "",
    startDate: "",
    endDate: "",
  });
  useEffect(() => {
    setComplaintDeets({
      standards: standardsNotMet,
      dateStart: dateStart,
      dateEnd: dateEnd,
    });
  }, [standardsNotMet, dateStart, dateEnd]);

  if (stage === "prompts") {
    return (
      <div>
        <h3 style={{ marginBottom: "0.25em" }}>Your details</h3>

        <TextField
          label="Your Name"
          variant="outlined"
          value={userName}
          sx={TextFieldStyle}
          onChange={(e) => setUserName(e.target.value)}
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

        <TextField
          label="Your number"
          variant="outlined"
          value={userNumber}
          sx={TextFieldStyle}
          onChange={(e) => setUserNumber(e.target.value)}
          fullWidth
        />

        <h3 style={{ marginBottom: "0.25em" }}>Your situation</h3>

        <TextField
          label="Your Story"
          variant="outlined"
          helperText="Give as much detail about your situation as you can here - this will be incorporated into the body of your message to the Council"
          value={userStory}
          sx={TextFieldStyle}
          onChange={(e) => setUserStory(e.target.value)}
          multiline
          rows={4}
          fullWidth
        />

        <h3 style={{ marginBottom: "0.25em" }}>Your timeline</h3>
        <p>
          Let us know when your situation occurred. If you are no longer facing
          this problem, let us know when you left the property or the situation
          was sufficiently remedied.
        </p>

        <Stack
          direction={{
            xs: "column",
            sm: "row",
          }}
          spacing={2}
          maxWidth={"60ch"}
          marginBottom={"2rem"}
        >
          <FormControl fullWidth>
            <InputLabel id="date-start">When it started</InputLabel>
            <Select
              labelId="date-start"
              id="date-start-select"
              value={dateStart}
              label="When it started"
              onChange={handleDateStartChange}
            >
              <MenuItem value="">I can't remember</MenuItem>
              {dateOptions.map((option) => {
                return <MenuItem value={option.value}>{option.label}</MenuItem>;
              })}
              <MenuItem value="<2022">Some time before 2022</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="date-start">When it ended</InputLabel>
            <Select
              labelId="date-start"
              id="date-start-select"
              value={dateEnd}
              label="When it ended"
              onChange={handleDateEndChange}
              helperText="If you left the property before the"
            >
              <MenuItem value={"ongoing"}>
                I'm still facing this problem
              </MenuItem>
              <MenuItem value={"left-property"}>
                I left the property before the problem was fixed.
              </MenuItem>
              {dateOptions.map((option) => {
                return <MenuItem value={option.value}>{option.label}</MenuItem>;
              })}
              <MenuItem value="<2022">Some time before 2022</MenuItem>
            </Select>
          </FormControl>
        </Stack>

        {issue === "repair" && (
          <>
            In addition to the above, it can help strengthen your case to show
            clearly the ways in which your home fails to meet the Government’s{" "}
            <Link to="/repairingstandard">Repairing Standard</Link>. You can
            tick any of the following boxes that apply to your situation, and
            they will be incorporated into the draft message:
            <br />
            <div style={{ margin: "1.5rem 0" }}>
              <Checklist
                items={tolerableStandardNew}
                selected={standardsNotMet}
                onToggle={handleToggle}
              />
            </div>
          </>
        )}

        {issue === "report" && (
          <>
            Your landlord must meet what's called the{" "}
            <Link to="./fpp">Fit and Proper Person</Link> test. If you have
            concerns about any of the following in relation to your landlord,
            tick them below:
            <br />
            <div style={{ margin: "1.5rem 0" }}>
              <Checklist
                items={FPPCriteria}
                selected={standardsNotMet}
                onToggle={handleToggle}
              />
            </div>
          </>
        )}

        <br />

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
          contactDetails={contactDetails}
          complaintDeets={complaintDeets}
        />
      </div>
    );
  }

  return null;
};

export default Prompts;
