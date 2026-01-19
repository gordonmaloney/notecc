import React from "react";
import Breadcrumbs from "../Components/Breadcrumbs";

const TheCampaign = () => {
  return (
    <div className="page-wrapper">
      <Breadcrumbs child="The Campaign" />
      <h1>Our Council is letting landlords off the hook</h1>

      <p>
        Edinburgh is in the midst of a housing emergency, and as the home to
        Scotland’s largest private rented sector, it is the city’s tenants that
        are on the frontline of that emergency.
        <br />
        <br />
        Unaffordable rents are driving tenants to the brink of poverty and
        homelessness. Slumlike conditions, chronic disrepair, and Scotland’s
        least energy efficient housing are having a profoundly negative impact
        on the health and wellbeing of our city’s renters.
        <br />
        <br />
        The impact of Edinburgh’s rented housing crisis extends far beyond just
        private tenants alone. Conditions in the sector dramatically perpetuate
        inequalities right across society. Particularly in tenements, issues of
        disrepair affect all neighbours. And the cost is borne by everyone: from
        the amount of public money required to subsidise unaffordable rents, to
        the cost to the NHS from the detrimental health impact of poor
        conditions, to the £53 million homeless bill to the City of Edinburgh
        Council.
        <br />
        <br />
        <center>
          <b>We cannot continue like this. And we don’t have to.</b>
        </center>
        <br />
        The Council already has all the powers it needs to act. Indeed, many of
        the powers the Council has are statutory duties which they are legally
        obligated to fulfil. However, as this report outlines, these are powers
        and duties that the Council is routinely neglecting. That means letting
        rogue landlords off the hook and letting tenants down.
      </p>

      <p>
        Read our full report, exposing the lack of enforcement actions from the
        Council{" "}
        <a
          href="https://assets.nationbuilder.com/livingrent/pages/6200/attachments/original/1754591516/Letting_Landlords_Off_The_Hook_PDF.pdf?1754591516"
          target="_blank"
        >
          here
        </a>
        .
      </p>
    </div>
  );
};

export default TheCampaign;
