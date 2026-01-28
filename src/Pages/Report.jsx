import React from "react";
import { Link } from "react-router-dom";
import Prompts from "../Mailer/Prompts";
import Breadcrumbs from "../Components/Breadcrumbs";
import { tracker } from "../tracker";

const Report = () => {
  tracker({
    type: "page_view",
    campaignId: "Tenant Complaints Portal",
  });

  return (
		<div className="page-wrapper">
			<Breadcrumbs child="Report your landlord" />

			<h1>Report your landlord</h1>

<h3>Notify the Council if your landlord is in breach of their obligations under housing law.
</h3>
			<p>
				By law, the Council must ensure that all registered landlords pass the 'fit and proper person test. They are obliged to consider past breaches of housing law and the quality of the property when evaluating landlords, but our research shows that they simply don’t bother. Even when a landlord has been found guilty of a housing offense, the Council won’t strike them from the landlord register.
<br/><br/>
If you believe your landlord doesn't meet one of the requirements below, complete the form to request the Council's enforcement team, as well as your local councillors, get involved.
			</p>

			<Prompts
				issue="report"
				blankTemplate={`Dear Enforcement Team, and my local councillors,

I am writing to ask for your help.

<<|userStory|>>

<<|FPPissues|>>

I am aware that I could take this matter to the Tribunal myself, but I am writing to you because I note that section 84 of The Antisocial Behaviour  etc. (Scotland) Act 2004 that a local authority must be satisfied that, in order to operate lawfully as a registered landlord, a landlord must be a ‘fit and proper’ person.

Sincerely,
<<|userName|>>
<<|postcode|>>`}
			/>
		</div>
	);
};

export default Report;
