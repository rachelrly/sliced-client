import React, { useState, useEffect, Fragment } from 'react';
import { parseTextInput } from '../../services/parse-text-input'
import UserRecipesApiService from '../../services/user-recipes-api-service'
import jwt_decode from 'jwt-decode'
import cuid from 'cuid'
import TokenService from '../../services/token-service'
import '../../css/AddRecipe.css';
import { VscReply } from 'react-icons/vsc';
import Preview from './Preview';


function AddRecipe(props) {

    const [title, setTitle] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [error, setError] = useState(null);
    const [preview, setPreview] = useState(false);

    useEffect(() => { }, [preview])

    const handleFormSubmit = async (e, recipe) => {
        e.preventDefault();
        if (!title.length || !ingredients.length) {
            setError(null)
            return true;
        }

        recipe = { ...recipe, id: cuid() };
        return await UserRecipesApiService.createRecipe(recipe)
            .then(props.history.push('/recipe'))
            .catch(err => console.log(err.message))


    }



    const recipe = {
        title: title,
        ingredients: ingredients,
        id: cuid()
    }

    return (
        <section className='add_section' >
            <div className='goBack_wrapper'>
                <button
                    className='goBack round'
                    onClick={() => props.history.goBack()}
                    aria-label="Go back to the previous page">
                    <VscReply className='arrow round-child' />
                </button>
            </div>
            <form className='add-recipe-form'
                autoComplete='off'
                onSubmit={(e) => handleFormSubmit(e, recipe)}>
                <fieldset>
                    <label htmlFor='title'>Title</label>
                    <input
                        name='title'
                        type='text'
                        onChange={(e) => {
                            setError(null)
                            setTitle(e.target.value)
                        }}
                        placeholder='Crispy chocolate chip cookies' />
                </fieldset>
                <fieldset>
                    <label htmlFor='ingredients'>Ingredients</label>
                    <textarea
                        name='ingredients'
                        onChange={(e) => setIngredients(parseTextInput(e.target.value))}
                    />
                </fieldset>

                {!ingredients.length
                    ? null
                    : <Preview ingredients={ingredients} />}
                <button type='submit'>Submit</button>
            </form>
        </section >
    )
}


export default AddRecipe
