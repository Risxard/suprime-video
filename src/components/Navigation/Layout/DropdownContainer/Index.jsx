import React from "react";

import "./styles.css";

const DropdownContainer = ({ children }) => {
  return (
    <>
      <div className="dropdown-container">
        <div className="dropdown-content">
          <div className="drop-down-safe-area" />
          {children}
        </div>
      </div>
    </>
  );
};

export default DropdownContainer;
