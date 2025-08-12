import React from "react";
import { Link } from "react-router-dom";
import Mailer from "./Mailer/Mailer";
import Prompts from "./Mailer/Prompts";

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


<Prompts/>    </div>
  );
};

export default Repairs;
