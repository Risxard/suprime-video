import React from "react";

import "./styles.css";

const DropdownContainer = ({ children, isOpen }) => {
  return (
    <div className={`dropdown-container ${isOpen ? "open" : ""}`}>
      {isOpen && (
        <>
          <div className="drop-down-safe-area"></div>
          {children}
        </>
      )}
    </div>
  );
};



export default DropdownContainer;
