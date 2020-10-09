import config from '../config';
import TokenService from '../services/token-service'

const UserRecipesApiService = {
    getRecipes() {
        return fetch(`${config.API_ENDPOINT}/recipes`, {
            headers: {
                'authorization': `bearer ${TokenService.getAuthToken()}`
            }
        })
            .then(res => res.json())
            .catch(err => console.log(err))
    },
    getFullRecipeById(id) {
        const getRecipe = fetch(`${config.API_ENDPOINT}/recipes/${id}`, {
            headers: {
                'Authorization': `bearer ${TokenService.getAuthToken()}`
            }
        })
            .then(res => res.json())
        const getIngredients = fetch(`${config.API_ENDPOINT}/recipes/${id}/ingredients`, {
            headers: {
                'Authorization': `bearer ${TokenService.getAuthToken()}`
            }
        })
            .then(res => res.json())

        return Promise.all([getRecipe, getIngredients])
            .then(res => {
                const { created, id, original_url, title } = res[0];
                const fullRecipe = { created, id, original_url, title, ingredients: res[1] }
                return fullRecipe
            })
            .catch(err => console.log(err))
    },
    createRecipe(recipe) {
        return fetch(`${config.API_ENDPOINT}/recipes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${TokenService.getAuthToken()}`
            },
            body: JSON.stringify(recipe)
        })
    },
    deleteRecipe(id) {
        return fetch(`${config.API_ENDPOINT}/recipes/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${TokenService.getAuthToken()}`
            }
        })
    }
}

export default UserRecipesApiService;