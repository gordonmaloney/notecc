import React from "react";
import { Link } from "react-router-dom";

const Report = () => {
  return (
    <div
      style={{
        padding: "0 50px 20px 50px",
        width: "70%",
      }}
    >
      <div className="breadcrumbs">
        <Link to="../">Home</Link>
        <span style={{margin: '0 12px'}}>/</span>
        Report your landlord
      </div>

      <h1>Report your landlord</h1>
    </div>
  );
};

export default Report;
