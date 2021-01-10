import React, { useState, useEffect, useContext } from 'react';
import { parseTextInput } from '../../services/parse-text-input'
import UserRecipesApiService from '../../services/user-recipes-api-service'
import { UserContext } from '../../contexts/user-context';
import '../../css/AddRecipe.css';
import { VscReply } from 'react-icons/vsc';
import Preview from './Preview';
import ErrorText from '../ErrorText/ErrorText';


function AddRecipe(props) {
    const { update, setUpdate, setError } = useContext(UserContext);
    const [title, setTitle] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [preview, setPreview] = useState(false);

    useEffect(() => { }, [preview])

    const handleFormSubmit = async (e, recipe) => {
        e.preventDefault();
        try {
            if (!title.length) {
                setError('Please enter a title')
                return true;
            }
            if (!ingredients.length) {
                setError('Please enter ingredients')
                return true;
            }
            await UserRecipesApiService.createRecipe(recipe)
            setUpdate(!update)
            props.history.push('/recipe')
        }
        catch (error) {
            console.log(error)
        }

    }



    const recipe = {
        title: title,
        ingredients: ingredients,
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
                <ErrorText />
                {!ingredients.length
                    ? null
                    : <Preview ingredients={ingredients} />}
                <button type='submit'>Submit</button>
            </form>
        </section >
    )
}


export default AddRecipe;
