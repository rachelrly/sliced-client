import React, { createContext, useState, useEffect } from 'react'
import TokenService from '../services/token-service';
import UserRecipesApiService from '../services/user-recipes-api-service';
import AuthApiService from '../services/auth-api-service';

export const UserContext = createContext();

function UserContextProvider({ children }) {
    const [userId, setUserId] = useState(null);
    const [loading, setLoading] = useState(null);
    const [recipes, setRecipes] = useState(null);
    const [update, setUpdate] = useState(false);

    const handleLogin = async (email, password) => {
        try {
            setLoading(true)
            const { authToken } = await AuthApiService.postLogin(email, password)

            if (!authToken) {
                setLoading(false);
                return;
            }
            await TokenService.saveAuthToken(authToken);
            const jwt = TokenService.parseAuthToken();
            setUserId(jwt.user_id);
        }
        catch (error) {
            setLoading(false)
            console.log('error caught', error)
        }


    }

    const onContinuingLogin = () => {
        const jwtPayload = TokenService.parseAuthToken();
        return jwtPayload ? setUserId(jwtPayload.user_id) : null;
    }

    const onLogout = () => {
        TokenService.clearAuthToken()
        setUserId(null);
        setRecipes([])
    }


    useEffect(() => {
        onContinuingLogin();
    }, [userId, loading])


    const value = { recipes, userId, update, setUpdate, loading, handleLogin, onLogout, onContinuingLogin }
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>

}

export default UserContextProvider;



