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

      <Prompts
        issue="repair"
        blankTemplate={`Dear Enforcement Team, and my local councillors,

I am writing to ask for your help.

<<|userStory|>>

I am aware that I could take this matter to the Tribunal myself, but I am writing to you because I note that section 85(1) of The Housing (Scotland) Act 1987 states that: “It shall be the duty of every local authority to secure that all houses in their district which do not meet the tolerable standard are closed, demolished or brought up to the tolerable standard within such period as is reasonable in all the circumstances.”

Sincerely,
<<|userName|>>
<<|postcode|>>`}
      />
    </div>
  );
};

export default Repairs;
