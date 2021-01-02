import React, { createContext, useState } from 'react'
import TokenService from '../services/token-service';
import UserRecipesApiService from '../services/user-recipes-api-service';

export const UserContext = createContext();

function UserContextProvider({ children }) {
    const [authToken, setAuthToken] = useState(null);
    const [userId, setUserId] = useState(null);
    const [loading, setLoading] = useState(null);
    const [recipes, setRecipes] = useState(null);


    const onLogin = async (user_id) => {
        const currentAuthToken = TokenService.getAuthToken();
        setAuthToken(currentAuthToken);
        setUserId(user_id);

        const rec = await UserRecipesApiService.getRecipes(userId)
        setRecipes(rec);
        setLoading(false)
    }

    const onContinuingLogin = async (user_id) => {
        const currentAuthToken = TokenService.getAuthToken();
        setAuthToken(currentAuthToken);
        setUserId(user_id);

        const rec = await UserRecipesApiService.getRecipes(userId)
        setRecipes(rec);
        setLoading(false)

    }

    const onLogout = () => {
        TokenService.clearAuthToken()
        setAuthToken(null);
        setUserId(null);
        setRecipes([])
    }


    const value = { authToken, userId, loading, onLogin, onLogout }
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>

}

export default UserContextProvider;



