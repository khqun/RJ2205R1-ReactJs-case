const initalState = {
    loginUser: {},
    successLogin: false,
}

const accountReducer = (state = initalState, action) => {
    switch (action.type) {
        case 'LOGIN_ACCOUNT':
            return {
                ...state, loginUser: action.payload
            }
        case 'IS_SUCCESS_LOGIN':
            return {
                ...state, successLogin: action.payload
            }
        default: return state
    }
}
export default accountReducer