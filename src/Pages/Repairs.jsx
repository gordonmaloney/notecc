import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Mailer from "../Mailer/Mailer";
import Prompts from "../Mailer/Prompts";
import Breadcrumbs from "../Components/Breadcrumbs";
import { tracker } from "../tracker";

const Repairs = () => {

  tracker({
    type: "page_view",
    campaignId: "Tenant Complaints Portal",
  });

  return (
    <div className="page-wrapper">
      <Breadcrumbs child="Get help with repairs" />

      <h1>Get help with repairs</h1>

      <p>
        Despite what they may tell you, the Council has the{" "}
        <b>legal obligation</b> to ensure that all properties in the city meet
        the 'Tolerable Standard', and they have a wide range of powers and tools
        to force landlords to take action.
        <br />
        <br />
        You can use this tool to send an email to the Council's enforcement
        team, copying in your local councillors, to remind them of those
        obligations and ask for support.
      </p>

      <Prompts
        issue="repair"
        blankTemplate={`Dear Enforcement Team, and my local councillors,

I am writing to ask for your help.

<<|userStory|>>

<<|StandardsNotMet|>>

I am aware that I could take this matter to the Tribunal myself, but I am writing to you because I note that section 85(1) of The Housing (Scotland) Act 1987 states that: “It shall be the duty of every local authority to secure that all houses in their district which do not meet the tolerable standard are closed, demolished or brought up to the tolerable standard within such period as is reasonable in all the circumstances.”

Sincerely,
<<|userName|>>
<<|postcode|>>`}
      />
    </div>
  );
};

export default Repairs;
