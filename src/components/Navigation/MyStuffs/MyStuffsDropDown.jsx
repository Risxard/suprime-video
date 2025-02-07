import { useEffect, useState } from "react";
import DropdownContainer from "../Layout/DropdownContainer/Index";
import { Link } from "react-router-dom";

const MyStuffschildren = () => {
  return (
    <>
      <div className="dropdown-content-layout">
        <p>Your account</p>

        <ul>
          <li>
            <Link to="/settings">
              <p>All</p>
            </Link>
          </li>
          <li>
            <Link to="/settings">
              <p>Watchlist</p>
            </Link>
          </li>
          <li>
            <Link to="/settings">
              <p>Purchases & Rentals</p>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

const MyStuffsDropDown = () => {
  const [toggleBtn, setToggleBtn] = useState(false);
  const [hovered, setHovered] = useState(false);

  function handleToggleBtn() {
    setToggleBtn(true);
  }

  useEffect(() => {
    handleToggleBtn();
  }, [toggleBtn]);

  return (
    <li
      className="nav-bubble-btn"
      data-hover={hovered}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <button>
        <svg
          className="fbl-icon _30dE3d _1a_Ljt _0rfOXL"
          viewBox="0 0 24 24"
          height="24"
          width="24"
          role="img"
          aria-hidden="true"
        >
          <title>Bookmark</title>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.120 2.060 C 5.795 2.140,5.568 2.248,5.300 2.452 C 4.948 2.720,4.755 2.990,4.593 3.440 L 4.500 3.700 4.489 12.237 C 4.482 17.760,4.493 20.850,4.518 20.989 C 4.626 21.574,5.032 21.943,5.620 21.990 C 5.817 22.006,5.910 21.991,6.102 21.913 C 6.233 21.860,7.613 21.103,9.170 20.230 L 12.000 18.645 14.830 20.230 C 16.386 21.103,17.767 21.860,17.898 21.913 C 18.090 21.991,18.183 22.006,18.380 21.990 C 18.968 21.943,19.374 21.574,19.482 20.989 C 19.507 20.850,19.518 17.760,19.511 12.237 L 19.500 3.700 19.407 3.442 C 19.171 2.789,18.725 2.342,18.080 2.113 L 17.820 2.020 12.080 2.013 C 7.380 2.007,6.300 2.016,6.120 2.060 M17.120 11.560 C 17.120 15.542,17.109 18.800,17.097 18.800 C 17.084 18.800,16.071 18.239,14.847 17.553 C 13.622 16.868,12.542 16.272,12.446 16.230 C 12.208 16.125,11.789 16.126,11.547 16.233 C 11.447 16.277,10.367 16.872,9.146 17.556 C 7.926 18.240,6.916 18.800,6.903 18.800 C 6.891 18.800,6.880 15.542,6.880 11.560 L 6.880 4.320 12.000 4.320 L 17.120 4.320 17.120 11.560 "
              fill="currentColor"
              stroke="none"
              fillRule="evenodd"
            ></path>
          </svg>
        </svg>
      </button>

      <DropdownContainer isOpen={toggleBtn} children={<MyStuffschildren />} />
    </li>
  );
};

export default MyStuffsDropDown;
