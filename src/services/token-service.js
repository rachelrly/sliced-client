import config from '../config'

const TokenService = {

    saveAuthToken(token) {
        return window.localStorage.setItem(config.TOKEN_KEY, token)
    },

    getAuthToken() {
        return window.localStorage.getItem(config.TOKEN_KEY)
    },

    clearAuthToken() {
        return window.localStorage.removeItem(config.TOKEN_KEY)
    },

    hasAuthToken() {
        return TokenService.getAuthToken()
    }
}

export default TokenService
