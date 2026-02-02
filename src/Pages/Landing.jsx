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

      <p class="subtitle">
        Got a rogue landlord? Flat falling to bits? Getting help from the Council couldn’t be more difficult. That’s why Living Rent built this site.
      </p>
      <p>
        The City of Edinburgh Council has long neglected its legal obligations to deal with rogue landlords in private rental housing. They are meant to ensure your home meets the {" "}
        <Link to="./repairingstandard">Tolerable Standard</Link>, and that landlords landlords pass the{" "}
        <Link to="./fpp">Fit and Proper Person</Link> test. But we have shown that <a href="https://assets.nationbuilder.com/livingrent/pages/6200/attachments/original/1754591516/Letting_Landlords_Off_The_Hook_PDF.pdf" target="_blank" rel="noopener noreferrer">the Council isn’t bothering to use these powers.</a>
      </p>
      <p>
      Making a complaint against a landlord is intimidating for tenants, and the Council makes it as hard as possible for tenants to even get in touch.
      </p>
      <p>
      But if the Council won’t help tenants report dodgy landlords, then <b>Living Rent will</b>. And, Councillors, this page should be a part of your own website. We'll gladly give you the code. You know how to get in touch.

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
