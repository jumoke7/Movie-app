import React from "react";
import { Link } from "react-router-dom";
import "./error.css";

export const Error = () => {
  return (
    <div className="error-container">
      <h1>404 ERROR</h1>
      <p>Page Not Found</p>
      <Link to="/">back home</Link>
    </div>
  );
};
