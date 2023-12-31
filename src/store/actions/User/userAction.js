import userActionTypes from './userActionTypes.js';

const userAccessRequest = () => ({
  type: userActionTypes.USER_ACCESS_REQUEST,
});

const userAccessSuccess = (userData) => ({
  type: userActionTypes.USER_ACCESS_SUCCESS,
  payload: userData,
});

const userAccessFailure = (err) => ({
  type: userActionTypes.USER_ACCESS_FAILURE,
  payload: err,
});



export const getUserAccess = () => (dispatch) => {
  dispatch(userAccessRequest());

  if (true) {
    const userId = '6661' ;
    const userName = 'Gtpeto';
    const country = 'pt-BR' ;

    userData =
    {
      userId:  userId,
      userName: userName,
      country: country
    }

    console.log(userData)
    dispatch(userAccessSuccess(userData));
  }

  message = console.log('Falha no login');
  dispatch(userAccessFailure(err.message));
};
