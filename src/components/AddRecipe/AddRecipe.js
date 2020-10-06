import React from 'react';
import UserRecipesApiService from '../../services/user-recipes-api-service';
import '../Form.css';

function AddRecipe(props) {

    const handleAddRecipe = (e) => {
        e.preventDefault();

        const ingredients = [
            {
                title: e.target.ingredients.value,
                description: 'this is a description',
                amount_str: '1 TBSP'
            },
            {
                title: e.target.ingredients.value,
                description: 'this is a second description',
                amount_str: '1 tsp'
            },
            {
                title: e.target.ingredients.value,
                description: 'this is a third description',
                amount_str: '1/2 Cup'
            },
        ]

        const recipe = {
            url: e.target.url.value,
            title: e.target.title.value,
            ingredients
        }

        UserRecipesApiService.createRecipe(recipe)
            .then(props.history.push('/recipes'))
    }

    return (
        <section className='AddRecipe_section'>
            <form className='AddRecipe_form' onSubmit={handleAddRecipe}>
                <label htmlFor='title'>Title</label>
                <input name='title' type='text' />

                <label htmlFor='url'>Url (optional)</label>
                <input name='url' type='text' />

                <label htmlFor='ingredients'>Ingredients</label>
                <textarea name='ingredients' />
                <button type='submit' className='form_button'>Submit</button>
            </form>
        </section>
    )
}

export default AddRecipe
