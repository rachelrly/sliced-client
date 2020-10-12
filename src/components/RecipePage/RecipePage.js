import React, { Component } from 'react'
import UserRecipesApiService from '../../services/user-recipes-api-service'
import './RecipePage.css'
import RecipePageIngredients from './RecipePageIngredients';
import UserContext from '../../user-context';
import jwt_decode from 'jwt-decode';
import TokenService from '../../services/token-service';
import formatRecipeTitle from '../../services/capitalize-recipe-title-service'
import { VscTrash, VscReply } from 'react-icons/vsc'


class RecipePage extends Component {
    static contextType = UserContext;

    constructor(props) {
        super(props);
        this.state = {
            recipe_id: null,
            title: '',
            date_created: null,
            url: null,
            ingredients: [],
            multiplyBy: 1
        }
    }

    componentDidMount() {

        const id = this.props.match.params.id

        if (this.context.user_id) {
            this.context.getRecipes(this.context.user_id)

        }

        UserRecipesApiService.getFullRecipeById(id, this.context.user_id)
            .then(rec => {
                if (!rec.id) {
                    return null
                }
                this.setState({
                    recipe_id: rec.id,
                    title: rec.title,
                    date_created: rec.created.toString().slice(0, 10),
                    url: rec.original_url,
                    ingredients: rec.ingredients
                })
            })
            .catch(err => console.log(err))

    }

    getMultiplyBy = (e) => {
        const multiply = e.target.value
        this.setState({
            multiplyBy: multiply
        })

    }

    handleDeleteRecipe = () => {
        const token = TokenService.getAuthToken();
        const user_id = jwt_decode(token).user_id;

        UserRecipesApiService.deleteRecipe(this.state.recipe_id, user_id)
            .then(this.context.getRecipesAfterDelete(user_id, this.state.recipe_id))
            .then(() => this.props.history.push('/recipe'))
            .catch(err => console.log(err.message))

    }

    render() {
        const capitalizedTitle = this.state.title ? formatRecipeTitle(this.state.title) : this.state.title
        const originalLink = this.state.url ? <a className='link-to-original' target='_blank' href={this.state.url} rel="noopener noreferrer"><p className='url'>Original recipe</p></a> : null;
        return (
            <section className='recipe_full'>
                <div className='goBack_wrapper'>
                    <button
                        className='goBack'
                        onClick={() => this.props.history.push('/recipe')}
                        aria-label="Go back to the previous page"
                    >
                        <VscReply className='arrow' />
                    </button>

                </div>
                <h2 className='recipe_title'>{capitalizedTitle}</h2>
                <div className='slider_container'>
                    <label htmlFor='slider'></label>
                    <input
                        type="range"
                        step='0.25'
                        min='0.25'
                        max='1'
                        defaultValue='1'
                        name='slider'
                        className='slider'
                        onChange={(e) => this.getMultiplyBy(e)} />
                </div>

                <RecipePageIngredients multiplyBy={this.state.multiplyBy} ingredients={this.state.ingredients} />

                <div className='recipe_info'>
                    <p className='date'>Added {this.state.date_created}</p>
                    {originalLink}
                    <button
                        onClick={this.handleDeleteRecipe}
                        className='delete_button'
                        aria-label="Delete this Recipe">
                        <VscTrash className='trash' />
                    </button>

                </div>
            </section>
        )
    }
}
//get userId from token
//get DeleteRecipes from db
//get recipes from db
//send 

export default RecipePage
