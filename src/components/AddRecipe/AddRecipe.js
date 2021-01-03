import React, { useState, useEffect, Fragment } from 'react';
import { parseInput } from '../../services/parse-input-service'
import UserRecipesApiService from '../../services/user-recipes-api-service'
import jwt_decode from 'jwt-decode'
import cuid from 'cuid'
import TokenService from '../../services/token-service'
import '../../css/AddRecipe.css';
import { VscReply } from 'react-icons/vsc';


function AddRecipe(props) {

    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [error, setError] = useState(null);
    const [preview, setPreview] = useState(false);

    const placeholder = `
    1 1/2 cups all-purpose flour
    1/2 teaspoon baking soda
    1/2 teaspoon salt
    10 Tablespoons unsalted butter
    1/2 cup granulated sugar
    1/4 cup packed light or dark brown sugar
    2 Tablespoons honey or light corn syrup`

    useEffect(() => { }, [preview])

    const parseTextAreaInput = (e) => {
        if (!preview) {
            setPreview()
        }
        if (error) {
            setError(null)
        }
        const textAreaInput = e.target.value;



        const splitLine = String.fromCharCode(13, 10);
        const formattedInput = textAreaInput
            .replaceAll('\\n', splitLine)
            .replaceAll('-', ' ')
            .split('\n')
            .map(ing => {
                return parseInput(ing)
            })

        setIngredients(formattedInput)

        if (!textAreaInput) {
            setPreview(false)
        }

    }

    const handleFormSubmit = (e, recipe) => {
        e.preventDefault();

        const token = TokenService.getAuthToken();
        const user_id = jwt_decode(token).user_id;

        if (!title.length || !ingredients.length) {
            setError(null)
            return true;
        }

        if (!ingredients.find(ing => ing.amount_str && ing.title)) {
            setError('invalid')
            return true;
        }

        UserRecipesApiService.createRecipe(recipe, user_id)
            .then(this.context.addRecipe(recipe))
            .then(this.props.history.push('/recipe'))
            .catch(err => console.log(err.message))


    }



    const recipe = {
        url: url,
        title: title,
        ingredients: ingredients,
        id: cuid()
    }


    const previewItem = !preview ? null : ingredients.map(ing => {
        let title = ing.title ? ing.title : ' ';
        let amt = ing.amount_str ? ing.amount_str : ' ';

        return (
            <li key={cuid()} className='preview_item'>
                <div className='col-wrapper-left'><p className='col-left'>{amt}</p></div>
                <div className='col-wrapper-right'><p className='col-right'>{title}</p></div>
            </li>
        )
    })

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
                    <label htmlFor='url'>Url (optional)</label>
                    <input
                        name='url'
                        type='text'
                        onChange={(e) => this.setState({
                            url: e.target.value
                        })}
                        placeholder='https://sallysbakingaddiction.com/crispy-chocolate-chip-cookies/' />
                </fieldset>
                <fieldset>
                    <label htmlFor='ingredients'>Ingredients</label>
                    <textarea
                        name='ingredients'
                        onChange={(e) => parseTextAreaInput(e)}
                        placeholder={placeholder} />
                </fieldset>
                <div className='prev_wrapper'>
                    {!preview
                        ? null
                        : <Fragment>
                            <div className='preview_wrapper'>
                                <div class='preview-title-wrapper preview-item'>
                                    <h3 className='col-left'>Amount</h3>
                                    <h3 className='col-right'>Ingredient</h3>
                                </div>
                                <ul>
                                    {previewItem}
                                </ul>
                            </div>
                        </Fragment>}
                </div>
                <button type='submit'>Submit</button>
            </form>
        </section >
    )
}


export default AddRecipe
