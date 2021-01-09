import React, { Fragment, useState, useEffect } from 'react'
import UserRecipesApiService from '../../services/user-recipes-api-service'
import '../../css/RecipePage.css';
import { useParams } from 'react-router-dom';
import RecipePageIngredients from './RecipePageIngredients';
import UserContext from '../../contexts/user-context';
import jwt_decode from 'jwt-decode';
import TokenService from '../../services/token-service';
import { useFormatRecipeTitle } from '../../hooks/capitalize-recipe-title-service'
import { VscTrash, VscReply } from 'react-icons/vsc'
import Loading from '../Loading/Loading'
import { gql, useQuery } from '@apollo/client';

/*This component renders the 'section' data for each individual 
recipe. It holds the slider for the recipe amount. It has the button
that triggers the event to delete recipes. It toggles the loading state 
with state update in componentDidMount.*/

function RecipePage(props) {
    const { id } = useParams();
    const [multiplyBy, setMultiplyBy] = useState(1)

    useEffect(() => {

    }, [multiplyBy])


    const getMultiplyBy = (e) => {
        let multiply = e.target.value >= 0.25 ? e.target.value : 0.25;
        setMultiplyBy(multiply)
    }

    const handleDeleteRecipe = () => {
        const token = TokenService.getAuthToken();
        const user_id = jwt_decode(token).user_id;

        UserRecipesApiService.deleteRecipe(id, user_id)
            .then(this.context.getRecipesAfterDelete(user_id, id))
            .then(() => this.props.history.push('/recipe'))
            .catch(err => console.log(err.message))

    }

    const recipeQuery = gql`
    {
        recipe(id: ${id}){
            recipe_title,
            date_created,
            ingredients{
                id,
                amount,
                unit,
                ingredient_name
            }


        }
    }
    `

    const { data, loading } = useQuery(recipeQuery)
    console.log(data)
    return (
        <Fragment>
            {loading
                ? <Loading />
                : <section className='recipe_full'>
                    <div className='goBack_wrapper'>
                        <button
                            className='goBack'
                            onClick={() => props.history.push('/recipe')}
                            aria-label="Go back to the previous page"
                        >
                            <VscReply className='arrow' />
                        </button>
                        <Title title={data.recipe.recipe_title} />
                    </div>

                    <div className='slider_container'>
                        <label htmlFor='slider' />
                        <input
                            value={multiplyBy}
                            type="range"
                            step='0.25'
                            min='0'
                            max='2'
                            name='slider'
                            className='slider'
                            onChange={(e) => getMultiplyBy(e)}
                            aria-label='A range slider that scales down the recipe' />
                        <datalist id='ticks'>
                            <option>  </option>
                            <option>¼</option>
                            <option>½</option>
                            <option>¾</option>
                            <option>1</option>
                            <option>1¼</option>
                            <option>1½</option>
                            <option>1¾</option>
                            <option>2</option>
                        </datalist>
                    </div>

                    <RecipePageIngredients multiplyBy={multiplyBy} ingredients={data.recipe.ingredients} />

                    <div className='recipe_info'>

                        {data.recipe.original_url
                            ? <a className='link-to-original' target='_blank' href={data.recipe.original_url} rel="noopener noreferrer">
                                <p className='url'>Original recipe</p>
                            </a>
                            : null
                        }
                        <button
                            onClick={handleDeleteRecipe}
                            className='delete_button'
                            aria-label="Delete this Recipe">
                            <VscTrash className='trash' />
                        </button>

                    </div>
                </section>}</Fragment>
    )
}

function Title(props) {
    return (
        <h2 className='recipe_title'>{useFormatRecipeTitle(props.title)}</h2>
    )
}

export default RecipePage
