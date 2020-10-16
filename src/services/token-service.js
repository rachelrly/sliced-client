

const TokenService = {

    saveAuthToken(token) {
        window.localStorage.setItem(process.env.REACT_APP_TOKEN_KEY, token)
    },

    getAuthToken() {
        return window.localStorage.getItem(process.env.REACT_APP_TOKEN_KEY)
    },

    clearAuthToken() {
        return window.localStorage.removeItem(process.env.REACT_APP_TOKEN_KEY)
    },

    hasAuthToken() {
        return !!TokenService.getAuthToken()
    }
}

export default TokenService
