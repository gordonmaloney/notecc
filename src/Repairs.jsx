import React from "react";
import { Link } from "react-router-dom";
import Mailer from "./Mailer/Mailer";

const Repairs = () => {
  return (
    <div
      style={{
        padding: "0 50px 20px 50px",
        width: "70%",
      }}
    >
      <div className="breadcrumbs">
        <Link to="../">Home</Link>
        <span style={{ margin: "0 12px" }}>/</span>
        Get help with repairs{" "}
      </div>

      <h1>Get help with repairs</h1>


      <Mailer />
    </div>
  );
};

export default Repairs;
