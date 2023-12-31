import langActionTypes from './langActionTypes';


const langUpdateSuccess = (lang) => ({
  type: langActionTypes.LANG_UPDATE,
  payload: lang,
});


export const langUpdate = (newlang) => (dispatch) => {
  localStorage.setItem("country", newlang);

  dispatch(langUpdateSuccess(newlang));
};

