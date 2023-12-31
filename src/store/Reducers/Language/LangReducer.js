import langActionTypes from '../../actions/Language/langActionTypes'
  const localLanguage = localStorage.getItem("country")
  const initialLanguage = localLanguage !== '' ? localLanguage : 'en-US';
  const initialState = {
    dataLang: initialLanguage,
  };
  
  export const langReducer = (state = initialState, action) => {
      switch(action.type){
        case langActionTypes.LANG_UPDATE: return{
          ...state,
          dataLang: action.payload
        }
        default: return state
      } 
  }


  export default langReducer