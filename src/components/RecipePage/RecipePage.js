import React, { Component } from 'react'
import UserRecipesApiService from '../../services/user-recipes-api-service'
import RecipePageIngredients from './RecipePageIngredients'
import './RecipePage.css'

class RecipePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            recipe_id: null,
            title: null,
            date_created: null,
            url: null,
            ingredients: [],
            multiplyBy: 0
        }
    }

    componentDidMount() {
        const id = Number(this.props.match.params.id)
        UserRecipesApiService.getFullRecipeById(id)
            .then(rec => {
                if (!rec.id) {
                    (console.log('should return nothing'))
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


        this.setState({
            multiplyBy: e.target.value
        })

    }

    render() {
        return (
            <section className='recipe_full'>
                <h2 className='recipe_title'>{this.state.title}</h2>

                <h3>Ingredients</h3>
                <div className='slider_container'>
                    <label htmlFor='slider'></label>
                    <input
                        type="range"
                        step='0.25'
                        min='0.25'
                        max='1'
                        defaultValue='100'
                        name='slider'
                        className='slider'
                        onChange={(e) => this.getMultiplyBy(e)} />
                </div>
                <ul className='ingredients_wrapper'>
                    <RecipePageIngredients ingredients={this.state.ingredients} />
                </ul>
                <div className='recipe_info'>
                    <p className='date'>Added {this.state.date_created}</p>
                    <a target='_blank' href={this.state.url} rel="noopener noreferrer"><p className='url'>Original recipe</p></a>
                    <button onClick={
                        (id) => this.props.deleteRecipe(this.state.recipe_id)
                            .then(this.props.history.push('/recipe'))
                    }>Delete</button>

                </div>
            </section>
        )
    }
}

export default RecipePage
