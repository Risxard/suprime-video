import mediaActionTypes from '../../actions/Media/mediaActionTypes'

  
  const initialState = {
    loading: true,
    data:[],
    error: ''
  };
  
  export const mediaReducer = (state = initialState, action) => {
      switch(action.type){
        case mediaActionTypes.MEDIA_DETAILS_REQUEST: return{
          ...state,
          loading: true
        }
        case mediaActionTypes.MEDIA_DETAILS_SUCCESS: return{
          loading: false,
          data: action.payload,
          error: ''
        }
        case mediaActionTypes.MEDIA_DETAILS_FAILURE: return{
          loading: false,
          data: [],
          error: action.payload
        }
        default: return state
      }
  }

  export default mediaReducer