export const loginAccount = (account) => {
    return {
        type: 'LOGIN_ACCOUNT',
        payload: account
    }
}
export const loginSuccess = (bool) => {
    return{
        type: 'IS_SUCCESS_LOGIN',
        payload: bool
    }
}
