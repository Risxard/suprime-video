import "./styles.css";
import DropdownContainer from "../Layout/DropdownContainer/Index";
import { Categorieschildren } from "../Categories/CategoriesDropDown";
import { Link } from "react-router-dom";

const HamMenu = () => {
  return (
    <div className="hamMenu-dropdown">
      <div className="dropdown-content-layout">
        <p>Browser</p>
        <ul className="NavigationLinks" id="nav-links">
          <li>
            <Link to="/home">
              <p>Home</p>
            </Link>
          </li>

          <li>
            <Link to="/movies">
              <p>Movies</p>
            </Link>
          </li>

          <li>
            <Link to="/tv-series">
              <p>TV shows</p>
            </Link>
          </li>
          <li>
            <Link to="/tv-series">
              <p>Sports</p>
            </Link>
          </li>
          <li>
            <Link to="/tv-series">
              <p>Live TV</p>
            </Link>
          </li>
        </ul>
      </div>
      <div className="dropdown-content-layout">
        <p>Browser</p>
        <ul className="NavigationLinks" id="nav-links">
          <li>
            <Link to="/home">
              <p>Home</p>
            </Link>
          </li>

          <li>
            <Link to="/movies">
              <p>Movies</p>
            </Link>
          </li>

          <li>
            <Link to="/tv-series">
              <p>TV shows</p>
            </Link>
          </li>
          <li>
            <Link to="/tv-series">
              <p>Sports</p>
            </Link>
          </li>
          <li>
            <Link to="/tv-series">
              <p>Live TV</p>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default HamMenu;
