import React from "react";
import { Link } from "react-router-dom";
import Prompts from "../Mailer/Prompts";
import Breadcrumbs from "../Components/Breadcrumbs";

const Report = () => {
  return (
    <div className="subPage">
      <Breadcrumbs child="Report your landlord" />

      <h1>Report your landlord</h1>

      <p>
        By law, the Council must ensure that all registered landlords pass the
        'fit and proper person' test, and they are meant to consider things like
        breaches of housing law and the quality of the property when doing so.
        <br />
        <br />
        If you believe your landlord doesn't meet that test, you can use this
        tool to email the Council's enforcement team, copying in your local
        councillors, to request them to get involved.
      </p>

      <Prompts
        issue="repair"
        blankTemplate={`Dear Enforcement Team, and my local councillors,

I am writing to ask for your help.

<<|userStory|>>

I am aware that I could take this matter to the Tribunal myself, but I am writing to you because I note that section 84 of The Antisocial Behaviour  etc. (Scotland) Act 2004 that a local authority must be satisfied that, in order to operate lawfully as a registered landlord, a landlord must be a ‘fit and proper’ person.

Sincerely,
<<|userName|>>
<<|postcode|>>`}
      />
    </div>
  );
};

export default Report;
