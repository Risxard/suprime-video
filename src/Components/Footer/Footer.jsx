import React from "react";
import "./Footer.css";


const Footer = (props) => {
  return (
    <footer id="#footer">
      <div className="footer-logo">
      <h2>suprime video</h2>
      </div>

      <div className="List-container">
        <div className="footer-menu-container">
          <a href="#">
            <p>FeedBack</p>
          </a>
          <a href="#" className="Help-container">
            <p>Help</p>
          </a>
          <a href="#">
            <p>FAQ</p>
          </a>
        </div>

        <div className="footer-social-container">
          <ul>
            <h2>FOLLOW ON</h2>

            <li className="linkedin-social">
              <a
                href="https://github.com/Risxard"
                target="_blank"
                rel="noreferrer"
              >
              </a>
            </li>

            <li className="github-social">
              <a
                href="https://www.linkedin.com/in/richardson-ssouza/"
                target="_blank"
                rel="noreferrer"
              >
              </a>
            </li>
          </ul>
        </div>
      </div>

      <span className="Rights">
        <p>©2021 All rights reserved Richardson souza</p>
      </span>
    </footer>
  );
};

export default Footer;
