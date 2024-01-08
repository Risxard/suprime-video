import React, {useState} from "react";

import { Settings, User, ChevronDown, ShieldAlert} from "lucide-react";

import LanguageSection from "../../Components/SectionOptions/LanguageSection.jsx";
import ProfileSection from '../../Components/SectionOptions/ProfileSection.jsx';
import SecuritySection from '../../Components/SectionOptions/PasswordSection.jsx';
import DeleteAccount from "../../Components/SectionOptions/DeleteAccount.jsx";

import "./Settings.css";

const Panel = () => {
    const [selectedSection, setSelectedSection] = useState('settings');

    const handleLiClick = (section) => {
      setSelectedSection(section);
    };


    const handleLiToggleClass = () => {
      const settingsLi = document.getElementById('settingsLi');
    
      if (settingsLi) {
        settingsLi.classList.toggle('active');
      }
    };



  return (
    <div className="Settings">
      <ul className="settings-menu">
        <li>
            <a href="#profile" className="profile-section" onClick={() => handleLiClick("profile")} >
              <User/>
              <p>Profile</p>
            </a>
        </li>
        <li id="settingsLi"  >
          <a href="#settings"  className="settings-section" onClick={() => { handleLiToggleClass()}}>
            <Settings/>
            <p>Account</p>
            <ChevronDown className="show"/>
          </a>

          <div className="setting-options">
            <a href="#settings"  className="settings-section" onClick={() => { handleLiClick("language")}}>
              <Settings style={{visibility: 'hidden'}}/>
              <p>Language</p>
            </a>
            <a href="#security"  className="settings-section" onClick={() => { handleLiClick("security")}}>
              <Settings style={{visibility: 'hidden'}}/>
              <p>Password</p>
            </a>

            <a href="#deleteAccount"  className="settings-section" onClick={() => { handleLiClick("deleteAccount")}}>
              <ShieldAlert color="red"/>
              <p>Delete my account</p>
            </a>
          </div>
        </li>
      </ul>

        {selectedSection == 'language' ? <LanguageSection/> 
        : selectedSection == 'profile' ? <ProfileSection/>
        : selectedSection == 'security' ? <SecuritySection/>
        : selectedSection == 'deleteAccount' ? <DeleteAccount/> : ''}

    </div>
  );
};

export default Panel;
