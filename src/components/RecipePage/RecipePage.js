import React, { Component } from 'react'
import UserRecipesApiService from '../../services/user-recipes-api-service'
import '../../css/RecipePage.css'
import RecipePageIngredients from './RecipePageIngredients';
import UserContext from '../../contexts/user-context';
import jwt_decode from 'jwt-decode';
import TokenService from '../../services/token-service';
import formatRecipeTitle from '../../services/capitalize-recipe-title-service'
import { VscTrash, VscReply } from 'react-icons/vsc'
import Loading from '../Loading/Loading'

/*This component renders the 'section' data for each individual 
recipe. It holds the slider for the recipe amount. It has the button
that triggers the event to delete recipes. It toggles the loading state 
with state update in componentDidMount.*/

class RecipePage extends Component {
    static contextType = UserContext;

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            recipe_id: null,
            title: '',
            date_created: null,
            url: null,
            ingredients: [],
            multiplyBy: 1
        }
    }



    componentDidMount() {

        const id = this.props.match.params.id;

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
                    ingredients: rec.ingredients,
                    loading: false
                })
            })
            .catch(err => console.log(err))

    }

    getMultiplyBy = (e) => {
        let multiply = e.target.value >= 0.25 ? e.target.value : 0.25;
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
        const renderPage = this.state.loading
            ? <Loading />
            : <section className='recipe_full'>
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
                        value={this.state.multiplyBy}
                        type="range"
                        step='0.25'
                        min='0'
                        max='2'
                        name='slider'
                        className='slider'
                        onChange={(e) => this.getMultiplyBy(e)}
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
        return (<>{renderPage}</>)
    }
}

export default RecipePage
