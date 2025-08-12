import React from "react";
import FeatureTile from "./FeatureTile";
import Grid from "@mui/material/Grid";

const Landing = () => {
  return (
    <div
      style={{
        padding: "0 50px 20px 50px",
        width: "70%",
      }}
    >
      <h1>Rogue landlord portal</h1>
      <p>
        Edinburgh City Council has a series of legal responsibilities to enforce
        good practice in the Private Rented Sector, that they are routinely not
        fulfilling. They must ensure your home meets the{" "}
        <a
          href="https://scotland.shelter.org.uk/professional_resources/legal/housing_conditions/the_tolerable_standard"
          target="_blank"
        >
          Tolerable Standard
        </a>
        , and they must ensure that landlords pass the{" "}
        <a
          href="https://www.gov.scot/publications/landlord-registration-statutory-guidance-local-authorities-2017-statutory-guidance-local/pages/5/"
          target="_blank"
        >
          'Fit and Proper Person' test
        </a>
        . However,{" "}
        <strong>
          getting help from the Council couldn't be more difficult.
        </strong>
      </p>
      <p>
        For a tenant to make a complaint against their landlord is already
        intimidating enough, but the Council makes it about as hard as possible
        for tenants to even get in touch.{" "}
        <strong>That's why Living Rent built this site.</strong>
      </p>
      <p>
        Since the council won't tell tenants who to contact when they need
        support with their landlord, <strong>we will</strong>. And, Councillors,
        this page should be a part of your own website. We'll gladly give you
        the code. You know how to get in touch.
      </p>

      <Grid container spacing={2} justifyContent={"center"}>
        <Grid item size={{ xs: 12, sm: 6 }}>
          <FeatureTile title="Get help with repairs" link="repairs" />
        </Grid>
        <Grid item size={{ xs: 12, sm: 6 }}>
          <FeatureTile title="Report your rogue landlord" link="report" />
        </Grid>
        <Grid item size={{ xs: 12, sm: 6 }}>
          <FeatureTile
            title="Join Living Rent"
            link="https://www.livingrent.org/join"
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default Landing;
