import React from "react";
import { FeatureTile, FeatureTileReverse } from "../Components/FeatureTile";
import Grid from "@mui/material/Grid";
import { Button } from "@mui/material";
import { BtnStyle } from "../MUIStyles";
import { Link } from "react-router-dom";
import { PageList } from "../PageList";

const Landing = () => {
  return (
    <div className="page-wrapper">
      <h1>Tenant Complaints Portal</h1>

           <p>
        Edinburgh City Council has a series of legal responsibilities to enforce
        good practice in the Private Rented Sector, that they are routinely not
        fulfilling. They must ensure your home meets the{" "}
        <Link to="./tolerable">Tolerable Standard</Link>, and they must ensure
        that landlords pass the{" "}
        <Link to="./fpp"> 'Fit and Proper Person' test</Link>. However,{" "}
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
        {PageList.map((page) => {
          return !page.feature ? (
            <></>
          ) : page.highlight ? (
            <Grid item size={{ xs: 12, lg: 6 }}>
              <FeatureTileReverse title={page.title} link={page.path} />
            </Grid>
          ) : (
            <Grid item size={{ xs: 12, lg: 6 }}>
              <FeatureTile title={page.title} link={page.path} />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default Landing;
