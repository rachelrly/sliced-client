import React from 'react'

let UserContext = React.createContext({
    currentAuthToken: null,
    user_id: null,
    recipes: [],
    onLogin: () => { },
    onLogout: () => { },
    addRecipe: () => { },
    deleteRecipe: () => { },
    getRecipes: () => { },
    getRecipesAfterDelete: () => { },
    loading: () => { }
})


export default UserContext;



