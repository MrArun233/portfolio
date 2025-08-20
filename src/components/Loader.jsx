import React from "react";
import "../index.css";

export default function Loader() {
  return (
    <div className="loader-screen">
      <div className="bar-loader">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <p className="loader-text">Loading Portfolio...</p>
    </div>
  );
}