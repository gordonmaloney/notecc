import React, { useState, useCallback, memo, useLayoutEffect, useEffect } from "react";
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
import ReactMarkdown from "react-markdown";

const tolerableStandardNew = [
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

const FPPCriteria = [
	{
		requirement:
			"any offence involving **fraud or other dishonesty, firearms, violence, or drugs**",
	},
	{
		requirement: "any **sexual offense**",
	},
	{
		requirement:
			"unlawful **discrimination** in, or in connection with, the carrying on of any business",
	},
	{
		requirement:
			"contravention of any provision of the law relating to housing or **landlord and tenant law**",
	},
	{
		requirement: "**offences** that are required to be disclosed",
	},
	{
		requirement: "intelligence provided by **Police Scotland**",
	},
	{
		requirement:
			"the **landlord's knowledge of private tenancy law** and good practice",
	},
	{
		requirement: "any **delay or attempt to avoid** registration",
	},
	{
		requirement: "failure or delays in **providing information**",
	},
	{
		requirement: "**complaints** from tenants or neighbours",
	},
	{
		requirement:
			"issues arising from registration or property management in **other local authority areas**",
	},
	{
		requirement: "information about the **physical condition** of the property",
	},
	{
		requirement:
			"adverse decisions by the Housing and Property Chamber of the **First Tier Tribunal** (FTT)",
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
				<ReactMarkdown
					style={{
						display: "inline-block",
						verticalAlign: "middle",
						fontSize: "inherit",
						lineHeight: "inherit",
						whiteSpace: "pre-wrap",
						margin: "0",
					}}
					components={{
						// render paragraphs as inline span so it behaves like before
						p: ({ node, ...props }) => <span {...props} />,
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
		const standardsText = `The following are aspects of the Tolerable Standard which my property does not meet:\n- ${standardsNotMet
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
				.replace("<<|StandardsNotMet|>>", standardsText)
				.replace("<<|FPPissues|>>", FPPtext)
		);

		const baseAnswers = [userName, userStory, postcode];


    if (issue === "repair" && standardsNotMet.length > 0)
			baseAnswers.push(standardsText);
		if (issue === "report" && standardsNotMet.length > 0)
			baseAnswers.push(FPPtext);

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
      postcode: postcode
		});
	}, [userName, userNumber, userEmail]);

	if (stage === "prompts") {
		return (
			<div>
				{issue === "repair" && (
					<>
						Your property must meet what's called the{" "}
						<a href="../tolerable" target="_blank" rel="noreferrer">
							"Tolerable Standard"
						</a>
						, and the Council is required to take action if it doesn't. To meet
						the Tolerable Standard, your home must meet all of the following
						criteria. Use the buttons below to say if any of the following apply
						to your home:
						<br />
						<div style={{ margin: "8px 20px" }}>
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
						<a href="../fpp" target="_blank" rel="noreferrer">
							"fit and proper person test"
						</a>
						. If you have concerns about any of the following in relation to
						your landlord, tick them below:
						<br />
						<div style={{ margin: "8px 20px" }}>
							<Checklist
								items={FPPCriteria}
								selected={standardsNotMet}
								onToggle={handleToggle}
							/>
						</div>
					</>
				)}

				<br />

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
          placeholder="Give as much detail about your situation as you can here"
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

				<TextField
					label="Your number"
          variant="outlined"
					value={userNumber}
					sx={TextFieldStyle}
					onChange={(e) => setUserNumber(e.target.value)}
					fullWidth
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
					contactDetails={contactDetails}
				/>
			</div>
		);
	}

	return null;
};

export default Prompts;
