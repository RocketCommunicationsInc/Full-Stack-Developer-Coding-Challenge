/** @format */

import React from "react";

const Spinner = ({ colorClass, size }) => (
  <div className={`spinner-border ${size} ${colorClass}`} role="status">
    <span>Loading...</span>
  </div>
);

export const SpinnerGrow = () => (
  <>
    <div role="status">
      <span>Loading...</span>
    </div>
  </>
);
export default Spinner;
