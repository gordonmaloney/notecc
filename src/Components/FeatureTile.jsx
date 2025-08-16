import React from "react";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import { Link } from "react-router-dom";

export const FeatureTile = ({ title, link }) => {
  return (
    <Link
      to={link}
      target={link.includes("http") ? "_blank" : ""}
      className="tileLink"
    >
      <div className="featureTile">
        <h2 className="featureTitle" style={{ margin: 0 }}>
          {title}
        </h2>

        <ArrowForwardIosRoundedIcon
          className="featureArrow"
          sx={{
            fontSize: "3.5em",
            fontWeight: "300",
            lineHeight: "2em",
            margin: "0px",
            padding: "0px",
            float: "right",
          }}
        />
      </div>
    </Link>
  );
};


export const FeatureTileReverse = ({ title, link }) => {
  return (
    <Link
      to={link}
      target={link.includes("http") ? "_blank" : ""}
      className="tileLink"
    >
      <div className="featureTileReverse">
        <h2 className="featureTitleReverse" style={{ margin: 0 }}>
          {title}
        </h2>

        <ArrowForwardIosRoundedIcon
          className="featureArrowReverse"
          sx={{
            fontSize: "3.5em",
            fontWeight: "300",
            lineHeight: "2em",
            margin: "0px",
            padding: "0px",
            float: "right",
          }}
        />
      </div>
    </Link>
  );
};