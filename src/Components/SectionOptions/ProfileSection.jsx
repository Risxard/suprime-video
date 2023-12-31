import React, { useState } from "react";

import { changeName } from "../../functions/settings/user";
import {User} from "lucide-react";

const ProfileSection = () => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleRenameClick = () => {

    if(inputValue.length < 3){
      console.log('no minimo 3 caracteres')
    } else if(inputValue.length > 12){
      console.log('maximo 12 caracteres')
    } else{

      changeName(inputValue);
    }
  };

  return (
    <section className="settings-content">
      
      <h2>Profile</h2>

      <span className="image-user-container">
        <p>Change avatar</p>
        <img
          src="https://cdn.bfe.dev/bfe/img/YRkyVwrmKWqggtRUMjPIsIhsrfhyhfOs_800x800_1619063642899.png"
          alt=""
        />
      </span>

      <form   onSubmit={handleRenameClick} className="formater">

      <div className="reg-box">
        <label htmlFor="new-name">
        <User color="black"/>
        </label>
        <input
          name="new-name"
          id="new-name"
          className="name-input"
          type="name"
          placeholder="New display name"
          required
        />
      </div>

      <div className="reg-btns-container">
        <button
          className="reg-btn"
          type="submit"
        >
          <p>Apply</p>
        </button>
      </div>

      </form>
    </section>
  );
};

export default ProfileSection;
