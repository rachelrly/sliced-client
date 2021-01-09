import TokenService from '../services/token-service'

const UserRecipesApiService = {
    createRecipe(recipe) {
        return fetch(`${process.env.REACT_APP_API_ENDPOINT}/recipes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${TokenService.getAuthToken()}`
            },
            body: JSON.stringify(recipe)
        })
    },
    deleteRecipe(id) {
        return fetch(`${process.env.REACT_APP_API_ENDPOINT}/recipes/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${TokenService.getAuthToken()}`
            }
        })
    }
}

export default UserRecipesApiService;