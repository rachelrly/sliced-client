
const AuthApiService = {
    postLogin(email, password) {
        return fetch(`${process.env.REACT_APP_API_ENDPOINT}/auth/login`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json())
    }
}

export default AuthApiService;