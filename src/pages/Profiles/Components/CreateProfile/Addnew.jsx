import { NavLink } from "react-router-dom";

const AddNew = () => {
  return (
    <NavLink to={"/profiles/create"} className="profile-picture-container">
      <div className="picture-container">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20">
          <g
            stroke="#F2F4F6"
            strokeWidth="2"
            fill="none"
            fillRule="evenodd"
            strokeLinecap="round"
          >
            <path d="M1 10h18M10 19V1" />
          </g>
        </svg>
      </div>
      <p>{"add new"}</p>
    </NavLink>
  );
};

export default AddNew;
