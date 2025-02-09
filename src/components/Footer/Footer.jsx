import React from "react";
import "./Footer.css";
import suprimevideologo from "../../assets/suprimevideologo.png";

const Footer = (props) => {
  return (
    <footer id="#footer">
      <span className="footer-logo">
        <img src={suprimevideologo} alt="suprime video logo" />
      </span>

      <div className="footer-container">
        <ul>
          <li>
            <a href="">Terms and Privacy Notice</a>
          </li>
          <li>
            <a href="">Send us feedback</a>
          </li>
          <li>
            <a href="">Help</a>
          </li>
        </ul>
        <span className="Rights">
          © 2024-2025, Richardson souza, Inc. or its affiliates
        </span>
      </div>
    </footer>
  );
};

export default Footer;
