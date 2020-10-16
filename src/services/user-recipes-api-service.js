import TokenService from '../services/token-service'

const UserRecipesApiService = {

    //adjust to take in user_id
    getRecipes(user_id) {

        console.log(process.env.REACT_APP_API_ENDPOINT)
        return fetch(`${process.env.REACT_APP_API_ENDPOINT}/recipes/${user_id}`, {
            headers: {
                'Authorization': `bearer ${TokenService.getAuthToken()}`
            }
        })
            .then(res => res.json())
            .catch(err => console.log(err))
    },

    //adjust to take in user_id
    getFullRecipeById(id, user_id) {
        const getRecipe = fetch(`${process.env.REACT_APP_API_ENDPOINT}/recipes/${user_id}/${id}`, {
            headers: {
                'Authorization': `bearer ${TokenService.getAuthToken()}`
            }
        })
            .then(res => res.json())
        const getIngredients = fetch(`${process.env.REACT_APP_API_ENDPOINT}/recipes/${user_id}/${id}/ingredients`, {
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
    createRecipe(recipe, user_id) {

        return fetch(`${process.env.REACT_APP_API_ENDPOINT}/recipes/${user_id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${TokenService.getAuthToken()}`
            },
            body: JSON.stringify(recipe)
        })
    },
    deleteRecipe(id, user_id) {
        return fetch(`${process.env.REACT_APP_API_ENDPOINT}/recipes/${user_id}/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${TokenService.getAuthToken()}`
            }
        })
    }
}

export default UserRecipesApiService;