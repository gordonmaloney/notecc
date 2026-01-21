import React from "react";
import { Link } from "react-router-dom";
import './Breadcrumbs.css'


const Breadcrumbs = ({ child }) => {
  return (
    <div className="breadcrumbs">
      <Link to="../">Home</Link>
      <span style={{ margin: "0 12px" }}>/</span>
      {child}
    </div>
  );
};

export default Breadcrumbs;
