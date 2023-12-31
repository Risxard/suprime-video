import userActionTypes from '../../actions/User/userActionTypes'


const initialState = {
    loading: false,
    statusLog: false,
    userData:{userId: '', userName: '',country: 'en-US'},
    error: ''
};

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case userActionTypes.USER_ACCESS_REQUEST: return {
            ...state,
            loading: true
        }
        case userActionTypes.USER_ACCESS_SUCCESS: return {
            loading: false,
            statusLog: true,
            userData: action.payload,
        }
        case userActionTypes.USER_ACCESS_FAILURE: return {
            loading: false,
            statusLog: false,
            userId: '',
            userName: '',
            country: 'en-US',
            error: action.payload
        }
        default: return state
    }
}

export default userReducer